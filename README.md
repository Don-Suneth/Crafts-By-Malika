# Crafts by Malika

A static **showcase and enquiry website** for **Crafts by Malika**, a small family
business in **Sri Lanka** making handmade crochet.

**Public site:** <https://don-suneth.github.io/Crafts-By-Malika/>

## Purpose

The site introduces the business and its handmade work, and makes it easy for
customers to get in touch. It is a showcase-and-enquiry site, **not** an online store
and **not** a full catalogue.

## Business model

Customers **enquire first**. For each order, the design, price, timeframe, delivery
and payment arrangements are then discussed **directly** with the customer. Nothing is
bought or paid for through the website.

## The three examples

The homepage shows three real pieces — the **Boho Wall Hanging**, the **Heritage
Granny Throw** and the **Golden Fringe Shawl**. These are **representative examples of
the type of work available**, not stocked items and not a complete product list.
Colours, sizes and custom requests are arranged on enquiry.

## What the website does

- Displays the three representative examples.
- Opens an accessible product dialog for each piece (image + details).
- Sends a **product enquiry email** (a pre-filled `mailto:`) for any piece.
- Provides a **custom-order form**.
- Submits the form through **Formspree**, with success / error feedback.
- Provides **business and policy information** (the policies / information page).

## What the website does not do

- No checkout.
- No card payments.
- No fixed online pricing.
- No currency conversion.
- No live inventory or stock counts.
- No customer accounts or logins.
- No automatic order processing.

## Technology

Plain, dependency-free static site:

- **HTML**
- **CSS**
- **vanilla JavaScript** (no framework, no build step)
- **Formspree** — delivers the custom-order form to the business inbox
- **GitHub Pages** — hosting
- **GitHub Actions** — deployment

## Repository structure

```
Crafts-By-Malika/
├── apps/
│   └── website/               ← the website (this folder is the web root)
│       ├── index.html          ← single-page showcase + enquiry
│       ├── policies.html       ← ordering / delivery / pricing / privacy info
│       ├── style.css           ← all styles
│       ├── config.js           ← business details (edit me)
│       ├── products.js         ← the three product examples (edit me)
│       ├── app.js              ← rendering, dialogs, form, navigation
│       ├── robots.txt, sitemap.xml
│       ├── logo.svg, hero.jpg
│       ├── 6.png, 7.png, 8.png ← the three product images
│       └── fonts/              ← self-hosted heading font (Fraunces)
├── .github/
│   └── workflows/
│       └── deploy-pages.yml    ← GitHub Pages deployment
├── README.md
├── BUSINESS_SETUP.md
└── .gitignore
```

## Local development

No tooling required — it is plain static files.

- **Open directly:** double-click `apps/website/index.html`. (Some browsers block the
  custom heading font over `file://`; headings then fall back to a built-in serif.
  Serving over HTTP shows the intended font.)
- **Serve locally (recommended):**
  ```bash
  cd apps/website
  python -m http.server 8000
  ```
  Then visit <http://localhost:8000>.

## How to update the site

Everything you'll normally change is in `apps/website/config.js` and
`apps/website/products.js` — plain text, safe to edit.

### The three examples and their descriptions
Edit `apps/website/products.js`. Each example is one `{ … }` block; change the text
between the quotes to update a name or description. The left-to-right display order is
set by the short list near the top of `apps/website/app.js`.

### Product images
Put the image file in `apps/website/` and set the product's `image` field to its
filename (e.g. `image: "7.png"`). Always write a factual `imageAlt`. The current
examples use `6.png`, `7.png` and `8.png`.

### Contact details and social links
Edit `apps/website/config.js`:
- `contact.email` — the business email (`craftsbymalika@gmail.com`)
- `social.facebook`, `social.instagram`

### Formspree endpoint
Edit `apps/website/config.js` → `forms.formspreeEndpoint`. Create a free form at
<https://formspree.io> and paste its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
The custom-order form POSTs there.

> **Security:** `config.js` is public (it is shipped to the browser). Never put
> passwords, secret API keys or private tokens in it, or anywhere in the frontend.

## Deployment

Hosted on **GitHub Pages via GitHub Actions** — `.github/workflows/deploy-pages.yml`.

The workflow triggers on every push to `main` (and can be run manually from the repo's
**Actions** tab). It uploads **only `apps/website/`** and publishes it as the site
root.

### Required one-time setting
In the repository: **Settings → Pages → Build and deployment → Source → GitHub
Actions**.

**Public URL:** <https://don-suneth.github.io/Crafts-By-Malika/>

## Pre-launch & maintenance checklist

Pre-launch:
- [ ] The three example descriptions read correctly.
- [ ] `craftsbymalika@gmail.com`, Facebook and Instagram are correct.
- [ ] A test enquiry has been sent and arrives in the Formspree inbox.
- [ ] **Settings → Pages → Source → GitHub Actions** is set and a deploy run succeeded.
- [ ] The live site has been checked on mobile and desktop.

Maintenance:
- [ ] Keep the three examples and their photos current.
- [ ] Reply to enquiries promptly.
- [ ] Update `config.js` if contact or social details change.

## Future structure (not built yet)

These folders **do not exist** today and contain no code. They are noted only as
possible future locations:

- `apps/dashboard/` — *may* later hold a real internal dashboard.
- `services/api/` — *may* later hold a backend, **only if** one is genuinely required.

Until there is a real need, the project stays a plain static site.
