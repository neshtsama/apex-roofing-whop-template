$h = @{ Authorization = "Bearer $env:WHOP_API_KEY" }
try {
  $m = Invoke-RestMethod -Uri 'https://api.whop.com/api/v1/members/mber_74o05KyJyhnRz' -Headers $h
  $uid = $m.user.id
  "user: $uid"
  if (-not $uid) { $m | ConvertTo-Json -Depth 3 | Select-String 'user' | Select-Object -First 5; return }
  $body = @{
    account_id = 'biz_CmOzPzQ3H8UP1E'
    user_id = $uid
    referrer = 'https://apex-roofing-v1.whop.site/'
    metadata = @{ name = 'Test Homeowner'; email = 'test@example.com'; phone = '555-0100'; service = 'replacement'; message = 'API test' }
  } | ConvertTo-Json -Depth 4
  $r = Invoke-RestMethod -Method Post -Uri 'https://api.whop.com/api/v1/leads' -Headers $h -ContentType 'application/json' -Body $body
  "lead: $($r.id)"
} catch { $_.ErrorDetails.Message }
