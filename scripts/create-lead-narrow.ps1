$body = @{
  account_id = 'biz_CmOzPzQ3H8UP1E'
  user_id = 'user_ujqkRj3A7th8H'
  referrer = 'https://apex-roofing-v1.whop.site/'
  metadata = @{ name = 'Test Homeowner'; email = 'test@example.com'; phone = '555-0100'; service = 'repair'; message = 'narrow key test' }
} | ConvertTo-Json -Depth 4
try {
  $r = Invoke-RestMethod -Method Post -Uri 'https://api.whop.com/api/v1/leads' -Headers @{ Authorization = "Bearer $env:WHOP_API_KEY" } -ContentType 'application/json' -Body $body
  "lead: $($r.id)"
} catch { $_.ErrorDetails.Message }
