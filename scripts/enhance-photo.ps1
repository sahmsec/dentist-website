<#
    Instruction-based editing of a real photograph, through FLUX.1-Kontext on
    Hugging Face Inference Providers.

        pwsh scripts/enhance-photo.ps1 -In chamber-real.jpg -Out chamber-interior.jpg `
             -Prompt "brighten the lighting and tidy the clutter"

    Unlike scripts/generate-images.ps1, which invents an image from text, this
    edits a photograph that already exists. That difference matters: the point is
    to make a real room photograph presentable — exposure, colour cast, clutter,
    sharpness — not to replace it with a nicer room. Prompts here should always
    end by naming what must stay the same, or the model redecorates.

    Requires HF_TOKEN with the Inference Providers permission. The free credit
    runs out after a handful of calls and returns 402; -Retries waits it out.
#>

param(
  [Parameter(Mandatory)][string]$In,
  [Parameter(Mandatory)][string]$Out,
  [Parameter(Mandatory)][string]$Prompt,
  [int]$Steps = 28,
  [double]$Guidance = 2.5,
  [int]$MaxEdge = 1600,
  [int]$Quality = 88,
  [int]$Retries = 10,
  [int]$WaitSeconds = 90,
  [switch]$ToScratch,
  [string]$Endpoint = 'https://router.huggingface.co/fal-ai/fal-ai/flux-kontext/dev'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'public\images\_source' | Join-Path -ChildPath $In
$dstDir = if ($ToScratch) { Join-Path $root '.playwright-mcp' } else { Join-Path $root 'public\images' }
$dstPath = Join-Path $dstDir $Out

$token = [Environment]::GetEnvironmentVariable('HF_TOKEN','User')
if (-not $token) { $token = $env:HF_TOKEN }
if (-not $token) { throw 'HF_TOKEN is not set.' }

$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($srcPath))
$body = @{
  prompt              = $Prompt
  image_url           = "data:image/jpeg;base64,$b64"
  num_inference_steps = $Steps
  guidance_scale      = $Guidance
} | ConvertTo-Json -Compress

$H = @{ Authorization = "Bearer $token" }

for ($attempt = 1; $attempt -le $Retries; $attempt++) {
  try {
    $r = Invoke-RestMethod -Uri $Endpoint -Method Post -Headers $H `
           -ContentType 'application/json' -Body $body -TimeoutSec 300

    $url = if ($r.images) { $r.images[0].url } elseif ($r.image) { $r.image.url } else { $null }
    if (-not $url) { throw "no image url in response" }

    $bytes = (Invoke-WebRequest -Uri $url -TimeoutSec 180).Content

    # Kontext returns PNG; downscale to a sane edge and store as JPEG.
    $ms = New-Object IO.MemoryStream(,$bytes)
    $im = [System.Drawing.Image]::FromStream($ms)
    $scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($im.Width, $im.Height))
    $w = [int]($im.Width * $scale); $h = [int]($im.Height * $scale)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
    $g.DrawImage($im, 0, 0, $w, $h)
    $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
    $bmp.Save($dstPath, $enc, $prm)
    $g.Dispose(); $bmp.Dispose(); $im.Dispose(); $ms.Dispose()

    Write-Host ("  {0,-26} {1}x{2}  {3} KB  (attempt {4})" -f $Out, $w, $h, [int]((Get-Item $dstPath).Length/1KB), $attempt)
    exit 0
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 402 -and $attempt -lt $Retries) {
      Write-Host ("  attempt {0}: out of credits, waiting {1}s" -f $attempt, $WaitSeconds)
      Start-Sleep -Seconds $WaitSeconds
      continue
    }
    Write-Host ("  FAILED {0} - {1}" -f $code, $_.Exception.Message)
    exit 1
  }
}
