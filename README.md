# Apex Roofing: Whop Websites roofing template

A reusable website template for US roofing companies, built on **Whop Websites** (TanStack Start on Cloudflare) and deployed at a `whop.site` address. It covers the high-ticket flow: **estimate request → inspection fee → project deposit (card on file) → final-balance invoice**.

Live demo: https://apex-roofing-v1.whop.site

## Rebrand it without touching code structure

Everything customer-facing lives in `src/site.config.ts`: company name, tagline, phone, email, accent colour, service area, services, financing text, reviews, and the three plans (name, price, plan ID). Swapping company, services or pricing means editing that one file.

## Whop features used

- **Whop Websites**: scaffolded and deployed with the Whop CLI (`whop apps init`, `whop apps deploy`).
- **Payment Elements**: `Checkout` with `CheckoutElement` at `/checkout/$planKey` (card, Apple Pay, Google Pay and financing methods surface automatically for approved merchants), plus a second `Checkout` with `ExpressCheckoutElement` for one-tap wallets. The "Powered by Whop" branding is rendered by the checkout element.
- **Plans**: Roof Inspection $149, Project Deposit $500, and one flat-rate service (Roof Tune-Up & Cleaning, $399), all one-time, created with `whop products create` and `whop variants create`.
- **Card on file**: a setup-mode checkout configuration and `/card-on-file` route save a payment method without charging it.
- **Leads API**: the "Request an Estimate" form posts to `/api/estimate`, a server route that calls `POST /leads` with a leads-only API key stored as an app secret (`WHOP_LEADS_KEY`).
- **Pixel events**: `whop.track` fires `service_viewed`, `deposit_started` and `estimate_requested`. Page views and checkout events are automatic on `whop.site`.
- **Invoices API**: `scripts/` holds the final-balance flow (see below).
- **Promo codes**: used to run a low-value real test checkout.

## Final balance with the Invoices API

After the job, bill the remaining balance with the saved card or send a pay link:

- `scripts/create-invoice.ps1` creates a draft invoice with the customer's saved `payment_method_id` (auto-charge path).
- `scripts/create-invoice-manual.ps1` creates a draft with no card (manual-pay path: the customer gets an emailed pay link).
- `scripts/issue-invoice.ps1`, `scripts/charge-invoice.ps1` and `scripts/get-invoice.ps1` issue, charge and inspect an invoice. Issuing a draft with a card attached charges it immediately unless `charge_at` is set.

Note: Whop requires merchant account verification before any invoice can be issued (`invoice_account_verification_required`). The demo account is not verified, so the invoices in the demo are real drafts created through the API and are not sent.

## Known limits

- The Leads API keeps one lead per user, so every estimate is stored on the account owner's lead. `/api/estimate` keeps the last 10 requests in `req_1` to `req_10` metadata keys (metadata values are capped at 500 characters).
- Adaptive pricing is off on the three plans so prices always show in USD.

## Setup

```powershell
npm install -g @whop/cli
whop login
npm install
whop apps dev          # local dev server
whop apps secrets set --secret "WHOP_LEADS_KEY=<leads-only key>"
whop apps deploy
```

Create the leads key in Developer → API keys with: lead, member email read, member basic read, product read. For local dev, put the same key in `.dev.vars` (git-ignored).

To use the template for another company: create your own products and plans, then update `accountId`, `ownerUserId` and the plan IDs in `src/site.config.ts`.

## Security

- No secrets in source: keys live in Whop app secrets and the git-ignored `.dev.vars`.
- Estimate input is validated and length-limited on the server.
- Card details are collected only by Whop Payment Elements. No custom card forms.