$id = 'pay_EHzcNDp8gzDZLS'
$h = @{ Authorization = "Bearer $env:WHOP_API_KEY"; 'Idempotency-Key' = 'apex-final-balance-test-3' }
if ((Read-Host "Type CHARGE to bill `$1 to the saved card") -ne 'CHARGE') { "Cancelled"; return }
try {
  $o = Invoke-RestMethod -Method Post -Uri "https://api.whop.com/api/v1/invoices/$id/charge" -Headers $h -ContentType 'application/json' -Body '{"payment_method_id":"payt_g8LEpp2YEPgsh"}'
  "charged: status=$($o.status) member=$($o.member_id) paid_at=$($o.paid_at)"
} catch { $_.ErrorDetails.Message }
