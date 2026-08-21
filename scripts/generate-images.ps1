<#
    Generates the illustrative (non-person) imagery for the site through Hugging
    Face Inference Providers, and writes it straight into public/images/.

        pwsh scripts/generate-images.ps1
        pwsh scripts/generate-images.ps1 -Only service-implants
        pwsh scripts/generate-images.ps1 -Force        # overwrite existing files

    Requires HF_TOKEN in the user environment, on a token carrying the
    "Make calls to Inference Providers" permission (the Inference preset when
    creating the token). A token with only repository read access returns 403.

    Route note: hf-inference no longer serves FLUX and returns 410. The model is
    served by nscale, fal-ai and wavespeed; this uses nscale's OpenAI-compatible
    images endpoint, which returns base64 in data[0].b64_json.

    Only non-person, non-clinical-outcome imagery is generated here. Portraits
    of Dr. Arman come from his real photographs, and before/after pairs must be
    genuine cases with patient consent — neither belongs in this file.
#>

param(
  [string]$Only,
  [switch]$Force,
  [string]$Model = 'black-forest-labs/FLUX.1-schnell',
  [string]$Endpoint = 'https://router.huggingface.co/nscale/v1/images/generations'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out  = Join-Path $root 'public\images'

$token = [Environment]::GetEnvironmentVariable('HF_TOKEN','User')
if (-not $token) { $token = $env:HF_TOKEN }
if (-not $token) { throw 'HF_TOKEN is not set. See README.md.' }

# Shared style so the set reads as one library rather than six stock photos.
$style = 'clean clinical product photography, soft natural daylight, shallow depth of field, white and pale surfaces, centered composition, minimal, no people, no text'

$jobs = @(
  @{ file = 'service-general.jpg'
     prompt = 'a dental mirror and explorer probe resting on a white ceramic tray' }

  @{ file = 'service-orthodontics.jpg'
     prompt = 'a clear orthodontic aligner tray standing upright on a white reflective surface' }

  @{ file = 'service-implants.jpg'
     prompt = 'a titanium dental implant screw and abutment model on a white surface, macro' }

  @{ file = 'service-cosmetic.jpg'
     prompt = 'a fan of porcelain veneer shade guide tabs on a white surface, macro' }

  @{ file = 'service-whitening.jpg'
     prompt = 'a professional teeth whitening tray beside a small LED curing lamp on white' }

  @{ file = 'service-surgery.jpg'
     prompt = 'sterile stainless steel oral surgery instruments laid on a folded blue surgical cloth' }
)

function Save-Jpeg([byte[]]$png, [string]$path, [int]$size, [int]$quality = 86) {
  $ms  = New-Object IO.MemoryStream(,$png)
  $img = [System.Drawing.Image]::FromStream($ms)
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $size, $size)
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($path, $enc, $prm)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose(); $ms.Dispose()
}

foreach ($job in $jobs) {
  $name = [IO.Path]::GetFileNameWithoutExtension($job.file)
  if ($Only -and $name -ne $Only) { continue }

  $path = Join-Path $out $job.file
  if ((Test-Path $path) -and -not $Force) {
    Write-Host ("  {0,-28} skipped (exists)" -f $job.file)
    continue
  }

  $body = @{ model = $Model; prompt = "$($job.prompt), $style" } | ConvertTo-Json -Compress
  try {
    $resp = Invoke-RestMethod -Uri $Endpoint -Method Post -TimeoutSec 180 `
      -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body $body
    $bytes = [Convert]::FromBase64String($resp.data[0].b64_json)
    Save-Jpeg $bytes $path 900
    Write-Host ("  {0,-28} {1} KB" -f $job.file, [int]((Get-Item $path).Length / 1KB))
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    $hint = switch ($code) {
      403 { 'token lacks the Inference Providers permission' }
      402 { 'out of inference credits' }
      410 { 'this provider no longer serves the model - check the provider mapping' }
      default { $_.Exception.Message }
    }
    Write-Host ("  {0,-28} FAILED {1} - {2}" -f $job.file, $code, $hint)
  }
}
