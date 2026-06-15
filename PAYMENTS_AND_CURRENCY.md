# Payments & Currency — Crafts by Malika

How money is handled on this site today, and exactly what must happen before the
business can take real online payments. **Nothing here enables live payments yet.**

---

## 1. Canonical currency decision

- The **canonical (base) currency is `LKR`** (Sri Lankan Rupee, ISO 4217), because
  the business operates in Sri Lanka.
- Every product stores its price in **LKR only**, as an integer number of **minor
  units (cents)** to avoid floating-point rounding errors.
  - Example: `LKR 2,500.00` is stored as `priceMinor: 250000`.
- There is **one** authoritative price per product. We do **not** hardcode AUD/USD/
  GBP/EUR prices into product records.

## 2. How prices are stored & formatted

- Stored in [`HTML/products.js`](HTML/products.js): `priceMinor` (integer cents),
  `currency: "LKR"`, and a `priceConfirmed` flag.
- Formatted in [`HTML/app.js`](HTML/app.js) with **`Intl.NumberFormat`**
  (`en-LK`, `style: "currency"`), so the symbol/grouping are correct and locale-aware.
- If `Intl` ever fails for a currency, the formatter falls back to `CODE 0.00` so a
  price can never crash the page.

## 3. Why you don't see converted prices (this is intentional)

The site **does not display automatic converted prices** (USD/GBP/EUR/AUD). Reasons:

- Exchange rates change constantly; a static rate would quickly be wrong.
- We won't show a number we can't stand behind.

Instead, the site shows LKR and a clear notice:

> _"Converted prices are estimates. Your payment provider or card issuer will
> confirm the final amount and may apply conversion fees."_

This honours the rule: **fall back to the canonical LKR price rather than show
stale or fabricated conversions.**

### If you add international price display later (do it safely)

1. Use a **reliable exchange-rate source**; never advertise "live prices" without one.
2. Put the rate-provider **API key in a backend / serverless function**, never in
   frontend JS, HTML, CSS or Git.
3. **Cache** rates (e.g. refresh a few times per day) — don't call the API per visit.
4. Define **fallback behaviour**: if the rate service is down, show **LKR only**.
5. Label all converted figures **"approximate"**.
6. If a real order system exists, **record the exchange rate and charged currency
   with each order.**

The current config has `currency.enableConversion: false` and a manual selector is
**not** shipped, by design — see [config.js](HTML/config.js).

## 4. Why "Price on request" right now

Real LKR prices were never confirmed (the old AUD figures were demo-only). To avoid
publishing fake prices, products show **"Price on request"** until you:

1. Set each product's `priceMinor` (integer cents) in `HTML/products.js`, and
2. Set that product's `priceConfirmed: true`.

`CONFIG.currency.showPrices` (in `config.js`) is the global on/off switch; a price
only appears when **both** the global switch is on **and** the product is confirmed.

---

## 5. Payment provider research (verified June 2026)

> This was checked against current sources. **Re-verify before acting** — provider
> rules change.

### Stripe — ❌ not currently usable for a Sri Lanka-registered business

- Sri Lanka is **not** in Stripe's list of supported countries (~46 countries).
- The only way a Sri Lankan founder uses Stripe is by **genuinely incorporating a
  company in a supported country** (e.g. UK Ltd, or US via Stripe Atlas). That is a
  real legal/tax/cost commitment — **not** a shortcut, and **out of scope** for a
  small family business right now.
- **Do not** create a Stripe account using a false/borrowed foreign location — that
  violates Stripe's terms and risks frozen funds.
- **Conclusion:** do **not** enable Stripe now. Creating a test account or seeing a
  test dashboard does **not** mean the business is eligible to accept live payments.

**Still to verify if you ever pursue Stripe via a foreign entity:** eligibility for
live payments, settlement currencies, presentment currencies, LKR support (none),
payouts to a Sri Lankan bank (not supported directly), KYC/business verification,
fees, refunds, chargebacks, Checkout/Payment Links availability, tax/shipping config.

### PayPal — ❌ cannot receive payments in Sri Lanka

- Sri Lankan PayPal accounts can **send** money but **cannot receive** it (a
  long-standing Central Bank of Sri Lanka restriction). Not usable for taking orders.

### PayHere — ✅ recommended Sri Lankan gateway (when you're ready for V1.2)

- Sri Lanka's leading gateway, **approved by the Central Bank of Sri Lanka**.
- Settles to **Sri Lankan bank accounts**; supports **LKR** plus USD/EUR/GBP/AUD.
- Accepts Visa/Mastercard/Amex and local wallets (Genie, FriMi, eZ Cash, mCash) and
  internet banking.
- Offers **hosted Checkout**, **Payment Links** (share a link, no code), and
  **Shopify/WooCommerce** plugins.
- Tiered pricing with a no-setup-fee entry tier (typical card rates ~2.5–3.9%).
- Requires business details/onboarding — see BUSINESS_SETUP.md.

### Other Sri Lankan options to compare

- **OnePay** — gateway with LankaQR/UPI; good for domestic mobile payments.
- **WebXPay** — hosted checkout and links; competitive entry pricing.
- **Bank "IPG"** (e.g. Sampath, Commercial Bank) — possible but heavier onboarding.

### Honest first-version alternatives (no gateway needed)

- **WhatsApp-assisted ordering** + manual quotation (what this site does now).
- **Bank transfer** on confirmation (manual).
- **Cash on delivery** for domestic orders (if a courier supports it).

**Recommended path:** start with catalogue + WhatsApp/email enquiry (V1) →
add **PayHere Payment Links** for confirmed quotes (V1.2) → consider PayHere hosted
checkout / international card acceptance (V1.3). See [ROADMAP.md](ROADMAP.md).

---

## 6. Secret-management rules (read before integrating anything)

Never put any of these in HTML, CSS, browser JavaScript, a committed config file,
or a public Git repo:

- Payment **secret keys** (`sk_…`), webhook signing secrets, exchange-rate API keys.

What is safe where:

| Item | Safe in frontend? | Where it belongs |
|------|-------------------|------------------|
| Publishable key (`pk_…`) | Yes (designed to be public) | frontend is OK |
| Secret key (`sk_…`) | **No** | server / serverless env var only |
| Webhook secret | **No** | server env var only |
| A **hosted Payment Link URL** | Yes | it's just a URL |

**Test vs live (Stripe terminology, similar for others):**

- **Test mode** uses test keys (`sk_test_…`, `pk_test_…`) and fake cards — use this
  for all development.
- **Live mode** uses live keys and real money — only after eligibility is confirmed.
- Distinguish them by the `test`/`live` token in the key and the dashboard's mode toggle.

`.gitignore` already excludes `.env*` files so secrets can't be committed by accident.

## 7. Steps required before accepting live payments

1. Confirm the business can legally take payments (registration if needed).
2. Choose a provider that **settles to a Sri Lankan bank** (PayHere recommended).
3. Complete the provider's KYC/business verification.
4. Confirm real **LKR prices** in `products.js` and turn on price display.
5. Test the full flow in the provider's **test mode**.
6. Add a **hosted** Payment Link / Checkout (no custom card form — never collect card
   details in our own code).
7. Write a real **refund** and **returns** policy and confirm chargeback handling.
8. Only then switch to live mode with real credentials kept out of Git.

## Sources

- [Stripe global availability](https://stripe.com/global)
- [Stripe supported countries 2026 overview (Red Stag Fulfillment)](https://redstagfulfillment.com/how-many-countries-does-stripe-operate-in/)
- [Opening Stripe from Sri Lanka — requires foreign incorporation (IncorpUK)](https://incorpuk.com/blog/open-stripe-account-in-sri-lanka/)
- [PayHere — Sri Lanka payment gateway](https://payhere.lk/)
- [Sri Lankan payment gateways 2025 comparison (Infinitude)](https://infinitude.lk/blog/online-payments/best-payment-gateways-in-sri-lanka-2025-complete-guide-with-latest-pricing-fees/)
- [OnePay](https://www.onepay.lk/)
- [PayPal Sri Lanka — can send but not receive (Lanka E News)](https://www.lankaenews.com/news/4029/en)
