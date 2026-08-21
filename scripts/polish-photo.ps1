<#
    Crops and colour-corrects a source photograph into public/images/.

        pwsh scripts/polish-photo.ps1 -In treatment-real.jpg -Out why-modern.jpg `
             -X 0 -Y 95 -W 779 -H 450 -OutW 1200

    Written for the phone photographs taken in the chamber: they arrive heavily
    oversaturated (the yellow wall fights the site's own accent colour) and a
    little flat, so the default pulls saturation back and adds a touch of
    contrast. `-Sat 1` disables the colour change and leaves a pure crop.
#>

param(
  [Parameter(Mandatory)][string]$In,
  [Parameter(Mandatory)][string]$Out,
  [Parameter(Mandatory)][int]$X,
  [Parameter(Mandatory)][int]$Y,
  [Parameter(Mandatory)][int]$W,
  [Parameter(Mandatory)][int]$H,
  [int]$OutW = 1200,
  [double]$Sat = 0.84,
  [double]$Bright = 0.03,
  [double]$Contrast = 1.06,
  [int]$Quality = 88,
  [switch]$ToScratch
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'public\images\_source' | Join-Path -ChildPath $In
$dstDir  = if ($ToScratch) { Join-Path $root '.playwright-mcp' } else { Join-Path $root 'public\images' }
$dstPath = Join-Path $dstDir $Out

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = [Math]::Min($W, $img.Width - $X)
$h = [Math]::Min($H, $img.Height - $Y)
$outH = [int]($h * $OutW / $w)

$bmp = New-Object System.Drawing.Bitmap($OutW, $outH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = 'HighQualityBicubic'
$g.SmoothingMode = 'HighQuality'
$g.PixelOffsetMode = 'HighQuality'

# Saturation, contrast and brightness folded into one colour matrix. The
# luminance weights are the standard Rec.601 coefficients.
$lr = 0.3086; $lg = 0.6094; $lb = 0.0820
$s = $Sat; $c = $Contrast
$shift = ((1.0 - $c) * 0.5) + $Bright

$m = New-Object 'single[][]' 5
for ($i = 0; $i -lt 5; $i++) { $m[$i] = New-Object 'single[]' 5 }
$m[0][0] = [single]((((1 - $s) * $lr) + $s) * $c)
$m[0][1] = [single](((1 - $s) * $lr) * $c)
$m[0][2] = [single](((1 - $s) * $lr) * $c)
$m[1][0] = [single](((1 - $s) * $lg) * $c)
$m[1][1] = [single](((((1 - $s) * $lg) + $s)) * $c)
$m[1][2] = [single](((1 - $s) * $lg) * $c)
$m[2][0] = [single](((1 - $s) * $lb) * $c)
$m[2][1] = [single](((1 - $s) * $lb) * $c)
$m[2][2] = [single](((((1 - $s) * $lb) + $s)) * $c)
$m[3][3] = [single]1.0
$m[4][0] = [single]$shift
$m[4][1] = [single]$shift
$m[4][2] = [single]$shift
$m[4][4] = [single]1.0

$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix((New-Object System.Drawing.Imaging.ColorMatrix(, $m)))

$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $OutW, $outH)), $X, $Y, $w, $h, 'Pixel', $ia)

$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
$bmp.Save($dstPath, $enc, $prm)

Write-Host ("  {0,-26} {1}x{2}  {3} KB" -f $Out, $OutW, $outH, [int]((Get-Item $dstPath).Length / 1KB))
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
