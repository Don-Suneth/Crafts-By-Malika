# Business Setup Checklist — Crafts by Malika

Information the owner needs to confirm **before promoting the site publicly**.
Until an item is confirmed, the site shows a safe placeholder, "Price on request",
or a "being finalised" note — it never invents facts, prices, policies or promises.

Most items live in **`HTML/config.js`** (business details) and
**`HTML/products.js`** (per-product details). Search the code for `TODO(business)`
and `TODO(deploy)` to find every placeholder.

---

## A. Identity & contact

- [ ] Public business/maker name to display (currently "Crafts by Malika" / "Malika").
- [ ] **Public** business email (currently `neranjasuneth@gmail.com` — confirm/replace).
- [ ] **Public WhatsApp number.** The current number `+61 480 152 146` looks like an
      Australian mobile (likely the developer's). Confirm enquiries should go there,
      or replace with the business's **Sri Lankan** WhatsApp number.
      → `config.js` → `contact.whatsapp` (digits only, full international, no `+`/`0`).
- [ ] Facebook / Instagram URLs are correct.
- [ ] Town/region to show publicly (avoid a full home address for privacy).
- [ ] Typical reply time (e.g. "within 1 business day") → `contact.responseTime`.
- [ ] Year established (optional, for the About section).

## B. Legal / registration (verify with a Sri Lankan source — do not guess)

- [ ] Whether the business is registered, and any registration number to show.
- [ ] Whether tax registration applies.
- [ ] A contact point for privacy requests.
- [ ] Any Sri Lankan consumer/data-protection obligations.

## C. Delivery & shipping

- [ ] Domestic delivery regions within Sri Lanka.
- [ ] Courier provider(s) used.
- [ ] Domestic shipping prices (or how they're quoted).
- [ ] Whether **local pickup** is offered, and from where.
- [ ] Whether **international shipping** is offered, to which regions, and how it's
      calculated.
- [ ] Any free-shipping rules.
- [ ] Confirm the customs/duties note (currently: buyer is responsible).

## D. Payments (see PAYMENTS_AND_CURRENCY.md)

- [ ] Accepted payment methods for v1 (bank transfer? cash on delivery? on quote?).
- [ ] Decision on a gateway for later (PayHere recommended; **not** Stripe/PayPal).
- [ ] Bank account for settlement (when a gateway is added).

## E. Pricing (currency is LKR)

- [ ] Real **LKR price** for each product → `products.js` `priceMinor` (in cents),
      then set that product's `priceConfirmed: true`.
- [ ] Keep `CONFIG.currency.showPrices: true` so confirmed prices appear.

## F. Per-product details (in `products.js`)

For each of the nine products, confirm:

- [ ] Name & description are accurate.
- [ ] `stockStatus`: made to order / in stock / one-of-a-kind.
- [ ] `leadTime` (e.g. "1–2 weeks").
- [ ] `materials` (exact fibre — cotton / acrylic / blend; matters for allergies & care).
- [ ] `dimensions` and `weight` (especially for throws/blankets and for shipping).
- [ ] `colours` you can offer.
- [ ] `careInstructions`.
- [ ] **Toys:** `safetyNote` — do they use safety eyes / small parts? Age suitability?
      (No safety claim is made until you confirm this.)

## G. Policies (scaffolded in `HTML/policies.html`)

- [ ] Shipping policy (regions, prices, timeframes).
- [ ] Returns/refund policy (note: custom items are often non-returnable).
- [ ] Privacy details (contact point; how enquiries are handled).
- [ ] Terms & conditions.
- [ ] Confirm the handmade-variation and currency disclaimers read correctly.

## H. Story & trust (optional but valuable)

- [ ] Expand the **About** section with Malika's genuine story (in `index.html`).
      Keep it true — don't add invented details or fake testimonials.

## I. Deployment / SEO (see README)

- [ ] Final domain → replace `crafts-by-malika.example` in `index.html`,
      `policies.html`, `robots.txt`, `sitemap.xml`.
- [ ] (Optional) a 1200×630 social share image.
- [ ] (Optional) Google Search Console verification + analytics ID (don't paste IDs
      until you have them).

---

### Do **not** publish

Fake policies · fake testimonials · fake stock quantities · fake delivery promises ·
fake business credentials · fake currency conversions · unsupported safety claims.
