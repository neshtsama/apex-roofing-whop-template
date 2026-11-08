$id = 'pay_EHzcNDp8gzDZLS'
$h = @{ Authorization = "Bearer $env:WHOP_API_KEY" }
$r = Invoke-RestMethod -Uri "https://api.whop.com/api/v1/invoices/$id" -Headers $h
"status=$($r.status) total=$($r.total.amount) member=$($r.member_id) email=$($r.email_address) pm=$($r.payment_method_id)"
if ($r.status -ne 'draft' -or $r.total.amount -ne '1.00' -or $r.payment_method_id -ne 'payt_g8LEpp2YEPgsh') { "ABORT: unexpected state"; return }
if ((Read-Host "Type CHARGE to bill `$1 to the saved card") -ne 'CHARGE') { "Cancelled"; return }
try {
  $h['Idempotency-Key'] = 'apex-final-balance-test-2'
  $o = Invoke-RestMethod -Method Post -Uri "https://api.whop.com/api/v1/invoices/$id/issue" -Headers $h -ContentType 'application/json' -Body '{"collection_method":"charge_automatically"}'
  "issued: status=$($o.status) member=$($o.member_id) paid_at=$($o.paid_at)"
} catch { $_.ErrorDetails.Message }
