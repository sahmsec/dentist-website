<#
    Per-channel colour correction, brightening and sharpening for the chamber
    photographs. No AI, no network, no credits — this fixes the things that are
    actually wrong with a phone snap taken under warm tube light: a heavy orange
    cast, flat exposure and softness.

        pwsh scripts/colour-correct.ps1 -In chamber-real.jpg -Out chamber-interior.jpg `
             -RedGain 0.86 -BlueGain 1.24 -Bright 0.07 -Contrast 1.14

    What it cannot do is remove clutter or relight the room — that needs
    scripts/enhance-photo.ps1 and the Kontext model. Run this first: it is free
    and instant, and often it is enough.
#>

param(
  [Parameter(Mandatory)][string]$In,
  [Parameter(Mandatory)][string]$Out,
  [double]$RedGain = 1.0,
  [double]$GreenGain = 1.0,
  [double]$BlueGain = 1.0,
  [double]$Sat = 1.0,
  [double]$Bright = 0.0,
  [double]$Contrast = 1.0,
  [double]$Sharpen = 0.0,
  [int]$MaxEdge = 1600,
  [int]$Quality = 88,
  [switch]$ToScratch
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'public\images\_source' | Join-Path -ChildPath $In
$dstDir = if ($ToScratch) { Join-Path $root '.playwright-mcp' } else { Join-Path $root 'public\images' }
$dstPath = Join-Path $dstDir $Out

$img = [System.Drawing.Image]::FromFile($srcPath)
$scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($img.Width, $img.Height))
$w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)

$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = 'HighQualityBicubic'
$g.SmoothingMode = 'HighQuality'
$g.PixelOffsetMode = 'HighQuality'

# Saturation and per-channel gain folded into one matrix, then contrast and
# brightness applied as scale plus offset on the diagonal.
$lr = 0.3086; $lg = 0.6094; $lb = 0.0820
$s = $Sat; $c = $Contrast
$shift = ((1.0 - $c) * 0.5) + $Bright

$m = New-Object 'single[][]' 5
for ($i = 0; $i -lt 5; $i++) { $m[$i] = New-Object 'single[]' 5 }
$m[0][0] = [single]((((1 - $s) * $lr) + $s) * $c * $RedGain)
$m[0][1] = [single](((1 - $s) * $lr) * $c * $GreenGain)
$m[0][2] = [single](((1 - $s) * $lr) * $c * $BlueGain)
$m[1][0] = [single](((1 - $s) * $lg) * $c * $RedGain)
$m[1][1] = [single](((((1 - $s) * $lg) + $s)) * $c * $GreenGain)
$m[1][2] = [single](((1 - $s) * $lg) * $c * $BlueGain)
$m[2][0] = [single](((1 - $s) * $lb) * $c * $RedGain)
$m[2][1] = [single](((1 - $s) * $lb) * $c * $GreenGain)
$m[2][2] = [single](((((1 - $s) * $lb) + $s)) * $c * $BlueGain)
$m[3][3] = [single]1.0
$m[4][0] = [single]$shift; $m[4][1] = [single]$shift; $m[4][2] = [single]$shift; $m[4][4] = [single]1.0

$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix((New-Object System.Drawing.Imaging.ColorMatrix(, $m)))
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), 0, 0, $img.Width, $img.Height, 'Pixel', $ia)
$g.Dispose()

# Unsharp mask: blend the image against a blurred copy of itself. Downscaling
# and scaling back up is a cheap box blur that needs no convolution kernel.
if ($Sharpen -gt 0) {
  $small = New-Object System.Drawing.Bitmap([int]($w / 3), [int]($h / 3))
  $sg = [System.Drawing.Graphics]::FromImage($small)
  $sg.InterpolationMode = 'HighQualityBilinear'
  $sg.DrawImage($bmp, 0, 0, $small.Width, $small.Height)
  $sg.Dispose()

  $blur = New-Object System.Drawing.Bitmap($w, $h)
  $bg = [System.Drawing.Graphics]::FromImage($blur)
  $bg.InterpolationMode = 'HighQualityBilinear'
  $bg.DrawImage($small, 0, 0, $w, $h)
  $bg.Dispose()

  $out = New-Object System.Drawing.Bitmap($w, $h)
  for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
      $p = $bmp.GetPixel($x, $y); $q = $blur.GetPixel($x, $y)
      $r = [Math]::Max(0, [Math]::Min(255, $p.R + ($p.R - $q.R) * $Sharpen))
      $gg = [Math]::Max(0, [Math]::Min(255, $p.G + ($p.G - $q.G) * $Sharpen))
      $b = [Math]::Max(0, [Math]::Min(255, $p.B + ($p.B - $q.B) * $Sharpen))
      $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb([int]$r, [int]$gg, [int]$b))
    }
  }
  $bmp.Dispose(); $blur.Dispose(); $small.Dispose()
  $bmp = $out
}

$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
$bmp.Save($dstPath, $enc, $prm)
$bmp.Dispose(); $img.Dispose()

Write-Host ("  {0,-26} {1}x{2}  {3} KB" -f $Out, $w, $h, [int]((Get-Item $dstPath).Length / 1KB))
