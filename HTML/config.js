/* =============================================================================
 * config.js — Central business configuration for Crafts by Malika
 * -----------------------------------------------------------------------------
 * This is the ONE place to update business details. Non-technical owners can
 * safely edit the values below. Anything marked `TODO(business)` is a
 * placeholder that MUST be confirmed before the site is promoted publicly.
 *
 * No secret keys belong in this file. It is shipped to the browser and is
 * public. Never put API secret keys, passwords or private tokens here.
 * See PAYMENTS_AND_CURRENCY.md and BUSINESS_SETUP.md for guidance.
 * ========================================================================== */

window.CONFIG = {
  business: {
    name: "Crafts by Malika",
    tagline: "Handmade crochet, thoughtfully made in Sri Lanka",
    // TODO(business): Confirm the public maker name you are happy to show.
    makerName: "Malika",
    // TODO(business): Confirm the town / region to show publicly.
    //   Show a CITY or REGION, not a full residential address (privacy).
    location: "Sri Lanka",
    countryCode: "LK",
    // Year the business started — used in the About copy. TODO(business): confirm.
    established: "",
  },

  contact: {
    // ---------------------------------------------------------------------
    // WhatsApp number for click-to-chat links.
    // Format: FULL international number, DIGITS ONLY (country code + number),
    // with no "+", no spaces, no leading 0. Example (Sri Lanka): 9477XXXXXXX
    //
    // TODO(business): The number below came from the original MVP and appears
    // to be an Australian mobile (+61 480 152 146), most likely the developer's.
    // Confirm whether enquiries should reach this number, or replace it with the
    // business's own Sri Lankan WhatsApp number before launch.
    // ---------------------------------------------------------------------
    whatsapp: "61480152146",
    whatsappDisplay: "+61 480 152 146",

    // TODO(business): Confirm the public business email address.
    email: "neranjasuneth@gmail.com",

    // TODO(business): Confirm a realistic reply time, e.g. "within 1 business day".
    responseTime: "",
  },

  social: {
    // These links existed in the original site. TODO(business): confirm they are correct.
    facebook: "https://www.facebook.com/crafts.bymalika",
    instagram: "https://www.instagram.com/crafts.bymalika",
  },

  site: {
    // TODO(deploy): Set the final public URL once deployed. Used for the canonical
    // tag, sitemap and social-share metadata. Must NOT end with a trailing slash.
    url: "https://crafts-by-malika.example",
  },

  currency: {
    // Canonical (base) currency for the whole catalogue — ISO 4217 code.
    base: "LKR",
    // Locale used by Intl.NumberFormat for formatting amounts.
    locale: "en-LK",

    // Show prices in the catalogue?  Default OFF.
    // Prices are intentionally hidden until the owner enters REAL, confirmed
    // LKR prices in products.js (set each product's `priceMinor` and flip
    // `priceConfirmed: true`). While a product has no confirmed price, the card
    // shows "Price on request" instead of a number. This avoids publishing
    // placeholder or fabricated prices. See PAYMENTS_AND_CURRENCY.md.
    showPrices: true,

    // International conversion is intentionally OFF in v1. There is no reliable
    // live exchange-rate source wired in, so we never display converted prices.
    // See PAYMENTS_AND_CURRENCY.md for how to add this safely later.
    enableConversion: false,
  },

  forms: {
    // Optional Formspree endpoint for the custom-order form.
    // Leave EMPTY to use the built-in WhatsApp / email fallback (works with no backend).
    // To enable inbox delivery: create a free form at https://formspree.io and
    // paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
    formspreeEndpoint: "",
  },

  payments: {
    // No automated online checkout in v1 (see PAYMENTS_AND_CURRENCY.md).
    // When a VERIFIED hosted payment link is ready (e.g. a PayHere or Stripe
    // payment link), it can be referenced here. Leave empty until then.
    paymentLinkUrl: "",
  },
};
