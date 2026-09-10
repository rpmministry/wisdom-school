# Benchmark comparativo de modelos IA GRATUITOS para el Profesor Virtual de Wisdom School.
# Uso: .\scripts\benchmark-ai-free.ps1   (lee claves de .env.local, muestra ranking, NO imprime claves)
# Criterios: 1) respondi6 2) formato en puntos numerados 3) contenido factual fraccion 4) ejemplo 5) analogia 6) cero preguntas
# Repetir 1x/semana o tras cambios de catalogo; luego copiar el orden a AI_TIER1_MODEL en .env.local.
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
$keys = @{}
foreach ($name in 'OPENROUTER_API_KEY','OPENCODE_API_KEY','GEMINI_API_KEY') {
  $line = (Get-Content (Join-Path $root '.env.local') | Select-String ("^{0}=" -f $name)).ToString()
  if ($line) { $keys[$name] = $line.Split('=',2)[1].Trim() }
}
$or = $keys['OPENROUTER_API_KEY']; $oc = $keys['OPENCODE_API_KEY']; $gm = $keys['GEMINI_API_KEY']

$free = (Invoke-RestMethod 'https://openrouter.ai/api/v1/models' -TimeoutSec 25).data |
  Where-Object { $_.id -match ':free$' -and $_.id -notmatch 'safety|batch|preview|omni' } |
  Select-Object -ExpandProperty id | Select-Object -First 10

$prompt = 'Explica a un nino de 8 anos QUE ES UNA FRACCION exactamente en 3 puntos numerados (1. 2. 3.), con un ejemplo con numeros y una analogia de la vida real. Responde EN ESPANOL y NO hagas ninguna pregunta.'

function Score-Reply($txt) {
  if (-not $txt) { return 0 }
  $s = 0
  if ($txt.Length -gt 50) { $s++ }
  if ($txt -match '(?m)^\s*1[\.]]') { $s++ }
  if ($txt -match 'fracci' -and $txt -match '(numerador|denominador|[0-9]/[0-9]|partes? (iguales|del))') { $s++ }
  if ($txt -match '(ejemplo|por ejemplo|imagina|como cuando|como si)') { $s++ }
  if ($txt -match '(es como|parece a|analog|como si|tal como)') { $s++ }
  if ($txt.Substring([Math]::Max(0,$txt.Length-180)) -notmatch '\?') { $s++ }
  return $s
}

$results = @()
foreach ($m in $free) {
  $body = @{ model=$m; temperature=0.4; max_tokens=380; messages=@(@{role='user';content=$prompt}) } | ConvertTo-Json -Depth 5
  $sw = [Diagnostics.Stopwatch]::StartNew()
  try {
    $r = Invoke-RestMethod 'https://openrouter.ai/api/v1/chat/completions' -Method Post -Headers @{Authorization="Bearer $or"} -Body ([Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json' -TimeoutSec 15
    $txt = $r.choices[0].message.content
    $sc = Score-Reply $txt
    $results += [PSCustomObject]@{ Provider='OpenRouter'; Model=$m; Ms=[int]$sw.Elapsed.TotalMilliseconds; Score=$sc; Calidad=(if ($sc -ge 5){'ALTA'}elseif($sc-ge 4){'MEDIA'}elseif($sc-ge 2){'BAJA'}else{'DEFECTUOSA'}) } } } catch {
    $results += [PSCustomObject]@{ Provider='OpenRouter'; Model=$m; Ms=-1; Score=0; Calidad='FALLO' } }
  Start-Sleep -Milliseconds 600
}
foreach ($m in 'deepseek-v4-flash-free','mimo-v2.5-free','nemotron-3.5-lightning-free') {
  if (-not $oc) { $results += [PSCustomObject]@{ Provider='OpenCode'; Model=$m; Ms=-1; Score=0; Calidad='SIN_KEY' }; continue }
  $body = @{ model=$m; temperature=0.4; max_tokens=380; messages=@(@{role='user';content=$prompt}) } | ConvertTo-Json -Depth 5
  $sw = [Diagnostics.Stopwatch]::StartNew()
  try {
    $r = Invoke-RestMethod 'https://opencode.ai/zen/v1/chat/completions' -Method Post -Headers @{Authorization="Bearer $oc"} -Body ([Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json' -TimeoutSec 15
    $sc = Score-Reply $r.choices[0].message.content
    $q = 'BAJA'; if ($sc -ge 5) { $q='ALTA' } elseif ($sc -ge 4) { $q='MEDIA' }
    $results += [PSCustomObject]@{ Provider='OpenCode'; Model=$m; Ms=[int]$sw.Elapsed.TotalMilliseconds; Score=$sc; Calidad=$q } } catch {
    $results += [PSCustomObject]@{ Provider='OpenCode'; Model=$m; Ms=-1; Score=0; Calidad='FALLO' } }
}
if ($gm) {
  $gbody = @{ contents=@(@{role='user';parts=@(@{text=$prompt})}); generationConfig=@{temperature=0.4;maxOutputTokens=380}} | ConvertTo-Json -Depth 5
  $sw = [Diagnostics.Stopwatch]::StartNew()
  try {
    $g = Invoke-RestMethod "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent?key=$gm" -Method Post -ContentType 'application/json' -Body ([Text.Encoding]::UTF8.GetBytes($gbody)) -TimeoutSec 15
    $txt = ($g.candidates[0].content.parts | ForEach-Object { $_.text }) -join ''
    $sc = Score-Reply $txt
    $q = 'BAJA'; if ($sc -ge 5) { $q='ALTA' } elseif ($sc -ge 4) { $q='MEDIA' }
    $results += [PSCustomObject]@{ Provider='Gemini'; Model='gemini-3.7-flash'; Ms=[int]$sw.Elapsed.TotalMilliseconds; Score=$sc; Calidad=$q } } catch {
    $results += [PSCustomObject]@{ Provider='Gemini'; Model='gemini-3.7-flash'; Ms=-1; Score=0; Calidad='FALLO' } }
}

$results | Sort-Object @{E={$_.Score};Descending=$true}, @{E={ if ($_.Ms -lt 0) {999999} else {$_.Ms} }} | Format-Table -AutoSize
$w = ($results | Where-Object { $_.Provider -eq 'OpenRouter' -and $_.Score -ge 4 } | Sort-Object @{E={$_.Score};Descending=$true}, @{E={$_.Ms}} | Select-Object -ExpandProperty Model | Select-Object -First 5) -join ','
"Copiar a .env.local para priorizar medido ->  AI_TIER1_MODEL=$w"
