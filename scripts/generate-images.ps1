<#
    Generates the illustrative (non-person) imagery for the site through Hugging
    Face Inference Providers, and writes it into public/images/.

        pwsh scripts/generate-images.ps1
        pwsh scripts/generate-images.ps1 -Only titlebar-about
        pwsh scripts/generate-images.ps1 -Force          # overwrite existing

    Requires HF_TOKEN carrying the "Make calls to Inference Providers"
    permission — the Inference preset when creating the token. Repository read
    access alone returns 403.

    Route note: hf-inference returns 410 for FLUX; it no longer serves it. The
    live providers are nscale, fal-ai and wavespeed. This uses nscale's
    OpenAI-compatible images endpoint, which honours `size` and returns base64
    in data[0].b64_json.

    WHAT BELONGS IN HERE
      Environments, equipment and still life. Backgrounds that sit under a scrim
      and carry atmosphere rather than information.

    WHAT DOES NOT
      Dr. Arman. Every portrait on the site is a real photograph of him.
      Before/after pairs — those are clinical outcome claims and must be genuine
      cases with patient consent.
      Patients and staff — people we have no photograph of render a monogram.
      Faces generally: "no people" is in every prompt, both because a synthetic
      person on a real practice's site is dishonest and because this model
      renders hands and teeth badly.
#>

param(
  [string]$Only,
  [switch]$Force,
  # 'paid' bills Inference Provider credits and is fast. 'free' queues on the
  # public ZeroGPU Space — slower and it can be busy, but it costs nothing, so
  # it is the fallback when the monthly credit runs out (HTTP 402).
  [ValidateSet('paid','free')][string]$Route = 'paid',
  [string]$Model = 'black-forest-labs/FLUX.1-schnell',
  [string]$Endpoint = 'https://router.huggingface.co/nscale/v1/images/generations',
  [string]$Space = 'https://black-forest-labs-flux-1-schnell.hf.space'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out  = Join-Path $root 'public\images'

$token = [Environment]::GetEnvironmentVariable('HF_TOKEN','User')
if (-not $token) { $token = $env:HF_TOKEN }
if (-not $token) { throw 'HF_TOKEN is not set. See README.md.' }

# Shared style, so the set reads as one library rather than a pile of stock.
$style = 'clean clinical photography, soft natural daylight, white and pale surfaces with warm wood accents, shallow depth of field, calm and uncluttered, no people, no text, no logos'

$jobs = @(
  # ── Page banners. Wide, and the left third stays quiet because a large white
  #    page title sits over it.
  @{ file='titlebar-about.jpg';    size='1344x768'
     prompt='wide interior of a modern empty dental clinic, treatment chair to the right, soft daylight through a window on the left' }
  @{ file='titlebar-services.jpg'; size='1344x768'
     prompt='wide overhead view of dental instruments and a sterilisation tray arranged on a clean white counter, generous empty space on the left' }
  @{ file='titlebar-contact.jpg';  size='1344x768'
     prompt='wide view of a bright dental clinic reception, warm wood panelling and a potted plant, soft daylight, empty space on the left' }
  @{ file='titlebar-default.jpg';  size='1344x768'
     prompt='wide minimal clinical corridor interior, pale grey and white, soft neutral daylight' }

  # ── Full-bleed band behind the counters. Sits under a ~90% navy scrim, so
  #    silhouette matters far more than detail.
  @{ file='stats-band.jpg';        size='1344x768'
     prompt='wide modern dental surgery room, dental chair and overhead operating light, deep shadows, cinematic low key lighting' }

  # ── Tall panes beside the why-us copy. why-qualified stays a real photograph
  #    of Dr. Arman, because that pane is about him.
  @{ file='why-painless.jpg';      size='832x1216'
     prompt='vertical, a comfortable modern dental chair beside a window, soft morning light, calm and reassuring' }
  @{ file='why-transparent.jpg';   size='832x1216'
     prompt='vertical, a clipboard with a printed treatment plan and a pen resting on a clean clinic desk, soft daylight' }
  @{ file='why-modern.jpg';        size='832x1216'
     prompt='vertical, modern dental equipment beside a digital display screen in a clinic, clean and current' }

  # ── Small square inset on the home introduction.
  @{ file='chamber-interior.jpg';  size='1024x1024'
     prompt='corner of a modern dental treatment room, warm wood panel, a potted plant and soft daylight' }

  # ── Service cards, circular crops. Centred subject, plenty of margin.
  @{ file='service-general.jpg';      size='1024x1024'
     prompt='a dental mirror and explorer probe resting on a white ceramic tray, centred' }
  @{ file='service-orthodontics.jpg'; size='1024x1024'
     prompt='a clear orthodontic aligner tray standing upright on a white reflective surface, centred' }
  @{ file='service-implants.jpg';     size='1024x1024'
     prompt='a titanium dental implant screw and abutment model on a white surface, macro, centred' }
  @{ file='service-cosmetic.jpg';     size='1024x1024'
     prompt='a fan of porcelain veneer shade guide tabs on a white surface, macro, centred' }
  @{ file='service-whitening.jpg';    size='1024x1024'
     prompt='a professional teeth whitening tray beside a small LED curing lamp on white, centred' }
  @{ file='service-surgery.jpg';      size='1024x1024'
     prompt='sterile stainless steel oral surgery instruments laid on a folded blue surgical cloth, centred' }
)

# Free route: Gradio's two-step API — POST returns an event id, GET streams the
# result back with a URL to the rendered file.
function Invoke-Space([string]$prompt, [string]$size, [string]$space, [hashtable]$headers) {
  $w, $h = $size -split 'x'
  $payload = @{ data = @($prompt, 0, $true, [int]$w, [int]$h, 4) } | ConvertTo-Json -Compress -Depth 5
  $post = Invoke-RestMethod -Uri "$space/gradio_api/call/infer" -Method Post -Headers $headers `
            -ContentType 'application/json' -Body $payload -TimeoutSec 90
  $sse = Invoke-WebRequest -Uri "$space/gradio_api/call/infer/$($post.event_id)" -Headers $headers -TimeoutSec 300
  if ($sse.Content -notmatch '"url":\s*"([^"]+)"') { throw "space returned no image url" }
  return (Invoke-WebRequest -Uri $Matches[1] -Headers $headers -TimeoutSec 120).Content
}

function Save-Jpeg([byte[]]$png, [string]$path, [int]$maxEdge, [int]$quality = 86) {
  $ms  = New-Object IO.MemoryStream(,$png)
  $img = [System.Drawing.Image]::FromStream($ms)
  $scale = [Math]::Min(1.0, $maxEdge / [Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $w, $h)
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($path, $enc, $prm)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose(); $ms.Dispose()
  return "$w x $h"
}

foreach ($job in $jobs) {
  $name = [IO.Path]::GetFileNameWithoutExtension($job.file)
  if ($Only -and $name -ne $Only) { continue }

  $path = Join-Path $out $job.file
  if ((Test-Path $path) -and -not $Force) {
    Write-Host ("  {0,-28} skipped (exists)" -f $job.file); continue
  }

  $H = @{ Authorization = "Bearer $token" }
  $full = "$($job.prompt), $style"
  try {
    if ($Route -eq 'free') {
      $bytes = Invoke-Space $full $job.size $Space $H
    } else {
      $body = @{ model = $Model; prompt = $full; size = $job.size } | ConvertTo-Json -Compress
      $resp = Invoke-RestMethod -Uri $Endpoint -Method Post -TimeoutSec 180 `
        -Headers $H -ContentType 'application/json' -Body $body
      $bytes = [Convert]::FromBase64String($resp.data[0].b64_json)
    }
    $dims = Save-Jpeg $bytes $path 1500
    Write-Host ("  {0,-28} {1,-11} {2} KB" -f $job.file, $dims, [int]((Get-Item $path).Length / 1KB))
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    $hint = switch ($code) {
      403 { 'token lacks the Inference Providers permission' }
      402 { 'out of inference credits' }
      410 { 'provider no longer serves this model - check the provider mapping' }
      default { $_.Exception.Message }
    }
    Write-Host ("  {0,-28} FAILED {1} - {2}" -f $job.file, $code, $hint)
  }
}
