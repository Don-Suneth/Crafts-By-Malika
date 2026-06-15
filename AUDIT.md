# Project Audit — Crafts by Malika

_Audit date: 2026-06-15. Audited by: full-stack / UX / SEO / accessibility review of the repository at commit `e893c28` (backed up on branch `backup/pre-redesign-2026-06-15`)._

This document describes the website **as it was** before the first production
redesign, the problems found, and the decisions taken. For what the site is
**now**, see [README.md](README.md). For currency/payment risk, see
[PAYMENTS_AND_CURRENCY.md](PAYMENTS_AND_CURRENCY.md).

---

## 1. Current-state assessment (original MVP)

The original project was a single-page static site in the `HTML/` folder:

| File | Purpose |
|------|---------|
| `index.html` | One page: nav, hero, hand-duplicated product cards, footer |
| `style.css` | All styling |
| `logo.svg`, `Crochet-rafiki.svg` | Brand logo and hero illustration |
| `1.png`–`9.png` | Nine **real** product photographs |

It was a genuine, decent first MVP: a working layout, a warm pink theme, a
responsive grid, real product photos, real social links, and (in the uncommitted
working tree) product descriptions and alt text had already been started.

**Photos vs. catalogue:** eight of the nine photos were shown; `9.png` was unused.
The product names/descriptions broadly matched the photos. All nine photos are
genuine handmade items and are now described and used (see `HTML/products.js`).

---

## 2. Current strengths (preserved)

- **Real product photography** of genuine handmade work — kept and reused.
- **Distinctive brand assets** (logo + crochet illustration) — kept.
- **A responsive product grid** concept — kept and improved.
- **Real social links** (Facebook/Instagram) — kept (pending owner confirmation).
- **A warm, friendly colour direction** — refined into a proper design system.

---

## 3. Weaknesses found

### Critical

1. **Misleading prices / wrong currency.**
   Prices were shown as `AUD$…` for a Sri Lankan business, and were explicitly
   demonstration values. _Why it matters:_ customers could be misled about price
   and currency. _Fix:_ canonical currency is now **LKR**; demo AUD prices were
   removed; unconfirmed prices show "Price on request" until real LKR prices are
   set. See [PAYMENTS_AND_CURRENCY.md](PAYMENTS_AND_CURRENCY.md).

2. **No real call to action / fake "Shop Now".**
   The "Shop Now" button did nothing, and there was no way to actually order.
   _Why it matters:_ visitors couldn't act, so enquiries were lost. _Fix:_ every
   product now has honest CTAs ("Enquire on WhatsApp", "Email", "Request a custom
   version"), plus a custom-order form.

3. **Broken / empty navigation.**
   Nav links pointed at `""` or `/` and went nowhere. _Why it matters:_ broken
   nav erodes trust and usability. _Fix:_ working anchor nav to all sections.

### High priority

4. **Product cards duplicated by hand in HTML.**
   Each product was copy-pasted markup. _Why it matters:_ painful and error-prone
   for a non-technical owner to maintain. _Fix:_ catalogue is now data-driven from
   `HTML/products.js`; cards render from data.

5. **Private/!ambiguous contact details presented as the business.**
   The contact was an Australian mobile labelled "Suneth" and a personal Gmail.
   _Why it matters:_ unclear whether this is the business's public contact; may be
   a privacy issue. _Fix:_ contact details centralised in `HTML/config.js` and
   flagged for confirmation in [BUSINESS_SETUP.md](BUSINESS_SETUP.md).

6. **Thin SEO.**
   No canonical URL, Open Graph/Twitter tags, structured data, `robots.txt`,
   `sitemap.xml` or favicon. _Why it matters:_ poor discoverability and weak social
   sharing. _Fix:_ all added (structured data deliberately excludes unconfirmed
   prices/stock/reviews).

7. **Exaggerated, slightly off marketing copy.**
   "exclusive… limited-time offer… elevate your home today", plus an earlier
   "crotch designs" typo. _Why it matters:_ undermines a genuine handmade brand.
   _Fix:_ rewritten to honest, warm copy.

### Medium priority

8. **Accessibility gaps.** Clickable non-buttons, missing labels, no skip link,
   no visible focus styles, decorative em/icon issues. _Fix:_ semantic landmarks,
   labels, skip link, visible focus, `prefers-reduced-motion`, alt text.

9. **Performance.** Large PNGs (up to ~820 KB) with no lazy loading and layout
   that could shift. _Fix:_ `loading="lazy"`, `decoding="async"`, fixed image
   aspect-ratio box to avoid layout shift. (WebP/AVIF conversion is a documented
   next step — see ROADMAP.)

10. **Fixed-height/viewport sections** (`height: 105vh`, `10vh`) that break on
    some screens. _Fix:_ replaced with content-driven spacing.

11. **No documentation.** No README or setup notes. _Fix:_ this audit plus README
    and setup/payment/roadmap guides.

### Optional improvements (future)

- A dedicated 1200×630 social share image.
- Per-product detail pages with `Product` structured data **once prices/stock are
  confirmed**.
- Image CDN / responsive `srcset`.

---

## 4. Assumptions made

- The nine photos are genuine Crafts by Malika products and may be shown publicly.
- Product **names/descriptions** were written from the photographs; anything the
  photo can't confirm (exact size, fibre, colours offered) is left blank with a
  `TODO(business)` note rather than guessed.
- "Made to order" is a safe default availability model for handmade crochet; some
  décor pieces are marked "one of a kind". **All flagged for owner confirmation.**
- The existing Australian phone and Gmail are kept as the current contact in
  config, but flagged for the owner to confirm or replace with a Sri Lankan number.
- Canonical currency is **LKR** (business is in Sri Lanka).

## 5. Decisions taken

- **Stay static** (HTML/CSS/vanilla JS). No framework — see README "Architecture".
- **Data-driven catalogue** via a plain `products.js` global (works over `file://`
  and over HTTP; no build step, no CORS issues).
- **No online checkout in v1.** First release is catalogue + WhatsApp/email
  enquiry + custom-order form. See [ROADMAP.md](ROADMAP.md).
- **Prices hidden until confirmed.** Avoids publishing placeholder/fake prices.

## 6. Currency & payment risks (summary)

- **Stripe is not available to a Sri Lanka-registered business** (Sri Lanka is not
  in Stripe's supported-country list). Do **not** enable Stripe by faking a foreign
  location. Full detail and the recommended Sri Lankan gateway (PayHere) are in
  [PAYMENTS_AND_CURRENCY.md](PAYMENTS_AND_CURRENCY.md).
- **PayPal in Sri Lanka can send but not receive** — not usable for taking orders.
- **No live exchange rates** are wired in, so the site never shows converted
  prices; it shows LKR and explains that the customer's bank/provider sets the
  final amount. This is deliberate to avoid showing fabricated conversions.
