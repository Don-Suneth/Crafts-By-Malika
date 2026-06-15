# Roadmap — Crafts by Malika

A gradual, honest path from "credible catalogue" to "online payments". Each version
is shippable on its own. Don't build later infrastructure before it's needed.

---

## ✅ Version 1 — Professional catalogue & enquiry website (this release)

The credible storefront that earns enquiries.

- Data-driven catalogue (all 9 real products) from `products.js`.
- Responsive, accessible, warm handcrafted redesign.
- Honest CTAs: WhatsApp + email enquiry per product; custom-order form.
- Custom-order flow with a 7-step explanation.
- LKR-canonical, currency-safe price formatting (prices show when confirmed).
- SEO fundamentals: metadata, Open Graph/Twitter, Organization schema, `robots.txt`,
  `sitemap.xml`, favicon.
- Policies/information page scaffolding.

**Status: built.** Remaining for a public launch are business inputs, not code —
see [BUSINESS_SETUP.md](BUSINESS_SETUP.md).

## Version 1.1 — Confirmed details, real prices & policies

_Mostly content, little/no new code._

- Real **LKR prices** entered and switched on.
- Confirmed materials, sizes, lead times, colours, care, toy-safety notes.
- Confirmed/replaced public WhatsApp number, email, location, reply time.
- Finalised shipping, returns, privacy and terms text.
- Expanded genuine About story.
- Real domain set; submit `sitemap.xml` to Google Search Console.

## Version 1.2 — Hosted domestic payment option

_First time real money moves — kept simple and safe._

- Add **PayHere Payment Links** (or hosted checkout) for confirmed quotes.
- Optionally surface a "Pay now" link on a quote (config `payments.paymentLinkUrl`).
- Test thoroughly in the provider's **test mode** first.
- No custom card form — hosted only. No secret keys in frontend/Git.

## Version 1.3 — International display & hosted international payments

- Introduce **approximate** international price display **only** with a reliable
  rate source, cached via a backend/serverless function (key server-side), clearly
  labelled "approximate", with LKR fallback if the service is down.
- Enable international card acceptance through the hosted gateway.
- Record exchange rate + charged currency with each order.

## Version 2 — Inventory / order management (only if justified)

- Lightweight stock or order tracking, or a simple admin, **only** if manual handling
  becomes a real bottleneck. Prefer a hosted solution (e.g. PayHere + a sheet, or a
  Shopify/WooCommerce store with a Sri Lankan gateway) over custom backend code.

---

### Performance / polish backlog (any time)

- Convert PNGs to **WebP/AVIF** (keep originals) and add responsive `srcset`.
- Dedicated 1200×630 social share image.
- Per-product pages with `Product` structured data **once prices/stock are confirmed**.
