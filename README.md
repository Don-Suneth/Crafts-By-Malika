# Crafts by Malika - https://don-suneth.github.io/Crafts-By-Malika/

A professional catalogue and enquiry website for **Crafts by Malika**, a genuine
family business in **Sri Lanka** making handmade crochet toys, accessories and home
décor.

> **Status:** Version 1 (catalogue + enquiry). **Not yet a checkout.** Prices,
> policies, contact details and some product facts are placeholders until the owner
> confirms them — see [BUSINESS_SETUP.md](BUSINESS_SETUP.md). This is **not**
> production-ready until those are filled in.

---

## What it does

- Presents an **editorial homepage** with **three featured creations**; all nine
  real products stay in `products.js`, ready for the future full-collection page.
- Lets customers **enquire** about any item via **WhatsApp** or **email**.
- Provides a **custom-order form** that sends a tidy enquiry (via WhatsApp, or a form
  service if you add one).
- Handles money honestly: one **canonical LKR** price per product, formatted with
  browser internationalisation; no fake currency conversions.
- Ships SEO and accessibility fundamentals.

## Technology

Plain **HTML, CSS and vanilla JavaScript**. No framework, no build step, no
dependencies. (See "Architecture" for why.) Works opened directly from disk or
served by any static host.

## Project structure

```
HomeCortchet/
├── HTML/                     ← the website (this is the web root to deploy)
│   ├── index.html            ← single-page storefront
│   ├── policies.html         ← shipping/returns/privacy/terms/currency info
│   ├── style.css             ← design system + all styles
│   ├── config.js             ← ⚙️ business details (edit me)
│   ├── products.js           ← 🧶 product catalogue (edit me)
│   ├── app.js                ← featured render, dialogs, currency, forms, nav
│   ├── robots.txt, sitemap.xml
│   ├── logo.svg, Crochet-rafiki.svg   ← logo (illustration retained, not on hero)
│   ├── fonts/                ← self-hosted Fraunces display serif (headings only)
│   └── 1.png … 9.png         ← real product photos
├── README.md  AUDIT.md  BUSINESS_SETUP.md  PAYMENTS_AND_CURRENCY.md  ROADMAP.md
└── .gitignore
```

## Run it locally

Because the site is plain static files, you have two options:

**Option 1 — just open it.** Double-click `HTML/index.html` (it's built to work from
the `file://` protocol). Note: some browsers block the custom heading font over
`file://`, in which case headings fall back to the built-in serif — everything else
looks and works the same. Serving over HTTP (Option 2) shows the Fraunces headings.

**Option 2 — serve it (recommended; closest to production).** From the `HTML/`
folder:

```bash
# Python (if installed)
python -m http.server 8000
# or Node
npx serve .
```

Then visit <http://localhost:8000>.

---

## How to maintain the site (no coding experience needed)

Everything you'll normally change is in **`HTML/config.js`** and
**`HTML/products.js`**. Search either file for `TODO(business)` to find every spot
that needs your input.

### Update business contact details

Open `HTML/config.js` and edit the `contact` and `social` values (WhatsApp number,
email, Facebook/Instagram, location, reply time). The WhatsApp number must be the
full international number, **digits only** (e.g. Sri Lanka `9477XXXXXXX`).

### Update / add / remove products

Open `HTML/products.js`. Each product is one `{ … }` block.

- **Edit:** change the text between quotes.
- **Add:** copy a block, paste it, give it a new unique `id` and `slug`.
- **Remove:** delete the whole block (including its trailing comma).

### Change the three featured products (homepage)

The homepage shows **three** featured creations, not the whole catalogue. To choose
which three appear:

1. In `HTML/products.js`, set `featured: true` on the three products you want and
   `featured: false` on the rest.
2. (Optional) To control the **left-to-right order** of the three cards, edit the
   `FEATURED_ORDER` list near the top of the featured section in `HTML/app.js`. Ids
   not listed are appended automatically. The three render as equal cards.

All nine products always remain in `products.js`; the unfeatured six are simply held
back for the future full-collection page.

### The homepage gallery, "coming soon" dialog & future shop

- There is **no `/shop` page yet**. The **"View the full collection"** button opens an
  accessible **coming-soon dialog** (a native `<dialog>` with Escape-to-close, focus
  management and focus return). Without JavaScript the button is a normal link to the
  contact footer.
- Tapping a featured piece opens a **product dialog** (image, details and the
  WhatsApp / email / "request a custom version" actions).
- **Where the future shop connects:** search `HTML/app.js` for `TODO(shop)`. Replace
  the coming-soon dialog there with navigation to the new collection page once it
  exists. That page can reuse `products.js` (data) and the existing product dialog.
- **Motion:** headings and sections fade in gently on scroll
  (`IntersectionObserver`). All animation is disabled and content shown immediately
  when the browser requests `prefers-reduced-motion: reduce`, and nothing is ever
  hidden waiting on animation.

### Set or change a product's price (currency is LKR)

In that product's block:

```js
priceMinor: 250000,      // LKR 2,500.00  — price in CENTS (×100), no decimals here
currency: "LKR",
priceConfirmed: true,    // flip to true to actually show the price
```

Until `priceConfirmed` is `true` (and a `priceMinor` is set), the card shows
**"Price on request"**. The global switch `CONFIG.currency.showPrices` (in
`config.js`) must also be `true` (it is by default).

### How currency display works

- One canonical price per product in **LKR**, stored in **minor units (cents)** to
  avoid rounding errors.
- Formatted with **`Intl.NumberFormat`** for correct symbol/grouping.
- The site does **not** show converted USD/GBP/etc. prices (no live rate source) — it
  shows LKR and explains that the customer's bank/provider sets the final amount.
- Full rationale and how to add conversions safely later:
  [PAYMENTS_AND_CURRENCY.md](PAYMENTS_AND_CURRENCY.md).

### Replace or add product images

Put the image in `HTML/` and reference its filename in the product's `image` field
(e.g. `image: "10.png"`). Keep the originals. Always write a factual `imageAlt`.
The three featured cards show a compact, full-bleed `object-fit: cover` thumbnail
(kept short on purpose); the product dialog shows the full piece. If you add a photo,
also add its pixel size to the small `IMG_DIMS` map in `app.js` so the layout reserves
space (prevents shift) — optional but tidy.

**Hero image:** the homepage hero is a **full-bleed `background-image`** set on the
`.hero` section in `style.css`, using `HTML/hero.jpg` (a styled crochet/yarn scene,
sourced free from Pexels, no attribution required). It fills the viewport
(`min-height: 100svh`) with `background-size: cover` and a warm gradient overlay so
the left-aligned hero text stays readable. The header is transparent over the hero
and turns into a solid cream bar once you scroll past it. There is a single primary
CTA ("Explore our work"). To swap in your own professional photo, just replace
`hero.jpg` (a warm, calm, portrait-ish photo crops cleanly). See the `TODO(hero)`
note in `index.html`.

### Configure the custom-order form (optional)

By default the form composes a **WhatsApp** message from what's typed (works with no
backend). To receive submissions in an inbox instead:

1. Create a free form at <https://formspree.io>.
2. Paste its endpoint into `config.js` → `forms.formspreeEndpoint`
   (e.g. `"https://formspree.io/f/abcdwxyz"`).

When set, the form POSTs there; if it fails, it falls back to WhatsApp.

### Configure a payment link (later)

There is **no checkout in v1**. When you have a **verified hosted** payment link
(PayHere recommended for Sri Lanka), you can reference it in `config.js` →
`payments.paymentLinkUrl`. Read [PAYMENTS_AND_CURRENCY.md](PAYMENTS_AND_CURRENCY.md)
first. **Never** put a payment **secret key** in any of these files or in Git.

### Could we use Stripe later?

Only if the business **genuinely** incorporates in a Stripe-supported country —
Stripe does **not** support Sri Lanka-registered businesses, and PayPal can't receive
funds in Sri Lanka. Don't fake a location. Details and the recommended Sri Lankan
alternative (PayHere) are in [PAYMENTS_AND_CURRENCY.md](PAYMENTS_AND_CURRENCY.md).

---

## Deploy

The site is static, so any static host works (all free tiers are fine):

1. Set your real domain everywhere the placeholder appears: search the project for
   `crafts-by-malika.example` (in `index.html`, `policies.html`, `robots.txt`,
   `sitemap.xml`) and replace it.
2. Deploy the **contents of the `HTML/` folder** as the site root. Options:
   - **Netlify / Vercel / Cloudflare Pages:** connect the repo, set the publish
     directory to `HTML`.
   - **GitHub Pages:** publish the `HTML/` folder.
   - Or upload the `HTML/` files to any web host via FTP.
3. Submit `sitemap.xml` in Google Search Console once live.

## Architecture (why static, no framework)

A small handmade-goods catalogue with an enquiry form has **no requirement** that a
framework solves better than plain files. Staying static means: zero build tooling,
nothing to patch, trivial hosting, fast loads, and code an early-career developer can
read. A data-driven `products.js` already removes the real pain point (duplicated
card markup). Introducing React/Vue/a backend would add maintenance burden and
security surface for no benefit at this stage. If real online checkout is needed,
the right move is a **hosted** payment provider (see the roadmap), not a custom
backend.

## Known limitations (be honest)

- **Not a shop yet** — no automated checkout; ordering is via enquiry. The homepage
  shows three featured pieces; the full-collection page is a future step (the
  "View the full collection" button currently opens a coming-soon dialog).
- **Prices are hidden** until real LKR prices are confirmed.
- **Contact details, policies, shipping, lead times and some product facts are
  placeholders** pending owner confirmation.
- The live product grid and form enhancements need JavaScript (brand, about, contact
  and policy info still work without it; a `<noscript>` note points to WhatsApp/email).
- Product images are the original PNGs; WebP/AVIF conversion is a future optimisation.

## Next steps

See [ROADMAP.md](ROADMAP.md) and [BUSINESS_SETUP.md](BUSINESS_SETUP.md). The three
highest-value actions are: (1) confirm contact details + real LKR prices,
(2) finalise shipping & returns policy, (3) set the real domain and submit the sitemap.

## Recovery

The pre-redesign state is preserved on the git branch
`backup/pre-redesign-2026-06-15`.
