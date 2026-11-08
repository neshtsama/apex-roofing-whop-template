$body = @{
  account_id = 'biz_CmOzPzQ3H8UP1E'
  email_address = 'neshtsama45@gmail.com'
  payment_method_id = 'payt_g8LEpp2YEPgsh'
  memo = 'Final balance (test)'
  items = @(@{ quantity = 1; description = 'Final balance - test'; variant = @{ initial_price = 1; currency = 'usd'; billing_type = 'one_time' } })
} | ConvertTo-Json -Depth 6
try {
  $r = Invoke-RestMethod -Method Post -Uri 'https://api.whop.com/api/v1/invoices' -Headers @{ Authorization = "Bearer $env:WHOP_API_KEY" } -ContentType 'application/json' -Body $body
  "$($r.id) | $($r.status) | member: $($r.member_id) | pm: $($r.payment_method_id)"
} catch { $_.ErrorDetails.Message }
