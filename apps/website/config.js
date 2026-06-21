/* =============================================================================
 * config.js — Central business configuration for Crafts by Malika
 * -----------------------------------------------------------------------------
 * This is the ONE place to update the site's business details. The values below
 * are public — they are shipped to the browser as plain text.
 *
 * SECURITY: never put passwords, secret API keys, private tokens or any other
 * secret here (or anywhere in frontend HTML/CSS/JS). This file is public.
 * ========================================================================== */

window.CONFIG = {
  business: {
    name: "Crafts by Malika",
    tagline: "Handmade crochet, thoughtfully made in Sri Lanka",
    makerName: "Malika",
    location: "Sri Lanka",
  },

  contact: {
    // The site's only contact method. The custom-order form posts via Formspree (below).
    email: "craftsbymalika@gmail.com",
    // Optional reply time, e.g. "within 1 business day". Shown only if set.
    responseTime: "",
  },

  social: {
    facebook: "https://www.facebook.com/crafts.bymalika",
    instagram: "https://www.instagram.com/crafts.bymalika",
  },

  site: {
    // Public site URL (no trailing slash). Canonical and social tags live in the HTML.
    url: "https://don-suneth.github.io/Crafts-By-Malika",
  },

  forms: {
    // Formspree endpoint the custom-order form posts to. Create a free form at
    // https://formspree.io and paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
    formspreeEndpoint: "https://formspree.io/f/mnjyyrrr",
  },
};
