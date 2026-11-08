try {
  $r = Invoke-RestMethod -Uri 'https://api.whop.com/api/v1/invoices/pay_XyyAmRoLmd5S1t' -Headers @{ Authorization = "Bearer $env:WHOP_API_KEY" }
  $r | ConvertTo-Json -Depth 4 | Select-String '"status"|payment_method|total|amount|"due' | Select-Object -First 8
} catch { $_.ErrorDetails.Message }
