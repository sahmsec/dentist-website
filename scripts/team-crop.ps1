<#
    Cuts the team portraits to centred squares and lays them out as one contact
    sheet with circular masks, so the crops can be judged the way the site
    actually renders them.

        pwsh team-crop.ps1              -> contact sheet only
        pwsh team-crop.ps1 -Commit      -> also writes public/images/team-*.jpg
#>
param([switch]$Commit)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = 'd:\Projects\dentist-website'
$src  = Join-Path $root 'public\images\_source'
$out  = Join-Path $root 'public\images'
$sheet = Join-Path $root '.playwright-mcp\team-sheet.png'

# file, X, Y, side, output name. The window is chosen so the hairline lands at
# roughly 8% from the top — the cards mask these to a circle, and a crop that
# looks fine as a square loses the top of the head to the curve.
$crops = @(
  @{ In = 'puspita-mehezabin.jpg';  X =  95; Y =  80; S = 900; Out = 'team-puspita.jpg' },
  @{ In = 'antara-fahmida.jpg';     X = 190; Y =  60; S = 900; Out = 'team-antara.jpg' },
  @{ In = 'fahmida-haque.jpg';      X = 140; Y = 190; S = 900; Out = 'team-fahmida.jpg' },
  @{ In = 'staff-assistant-2.jpg';  X = 325; Y = 140; S = 950; Out = 'staff-assistant-2.jpg' },
  @{ In = 'staff-assistant-1.jpg';  X = 186; Y = 120; S = 900; Out = 'staff-assistant-1.jpg' },
  # Narrower window: he stands right of centre, and 900px wide would run past
  # the edge of a 1086px frame and drag him back off-centre.
  @{ In = 'staff-technologist.jpg'; X = 315; Y = 138; S = 770; Out = 'staff-technologist.jpg' }
)

$SIZE = 560          # what we ship
$CELL = 240          # contact-sheet cell

$sheetBmp = New-Object System.Drawing.Bitmap(($CELL * $crops.Count), ($CELL + 26))
$sg = [System.Drawing.Graphics]::FromImage($sheetBmp)
$sg.Clear([System.Drawing.Color]::FromArgb(240, 243, 247))
$sg.SmoothingMode = 'AntiAlias'
$font = New-Object System.Drawing.Font('Segoe UI', 9)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20, 32, 54))

$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)

$i = 0
foreach ($c in $crops) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $src $c.In))

  # Clamp so a bad guess never throws — it just shifts the window.
  $x = [Math]::Max(0, [Math]::Min($c.X, $img.Width  - $c.S))
  $y = [Math]::Max(0, [Math]::Min($c.Y, $img.Height - $c.S))
  $s = [Math]::Min($c.S, [Math]::Min($img.Width, $img.Height))

  $sq = New-Object System.Drawing.Bitmap($SIZE, $SIZE)
  $g = [System.Drawing.Graphics]::FromImage($sq)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.SmoothingMode = 'HighQuality'
  $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $SIZE, $SIZE)), $x, $y, $s, $s, 'Pixel')
  $g.Dispose()

  if ($Commit) {
    $sq.Save((Join-Path $out $c.Out), $enc, $prm)
    Write-Host ("  {0,-22} {1}x{1}  from {2} @ {3},{4} {5}px" -f $c.Out, $SIZE, $c.In, $x, $y, $s)
  }

  # Circular preview, as the team cards render it.
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddEllipse(($i * $CELL + 12), 12, ($CELL - 24), ($CELL - 24))
  $sg.SetClip($path)
  $sg.DrawImage($sq, ($i * $CELL + 12), 12, ($CELL - 24), ($CELL - 24))
  $sg.ResetClip()
  $sg.DrawString($c.Out, $font, $brush, ($i * $CELL + 12), ($CELL + 2))

  $sq.Dispose(); $img.Dispose()
  $i++
}

$sg.Dispose()
$sheetBmp.Save($sheet, [System.Drawing.Imaging.ImageFormat]::Png)
$sheetBmp.Dispose()
Write-Host "contact sheet -> $sheet"
