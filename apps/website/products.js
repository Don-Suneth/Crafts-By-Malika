/* =============================================================================
 * products.js — Product examples for Crafts by Malika
 * -----------------------------------------------------------------------------
 * HOW TO MANAGE PRODUCTS (for non-developers)
 *
 *   • Each product is one { ... } block inside the PRODUCTS list below.
 *   • To EDIT a product, change the text between the quotes.
 *   • To ADD a product, copy an existing block, paste it, and change the values.
 *     Give it a NEW unique `id` and `slug`.
 *   • To REMOVE a product, delete its whole { ... } block (including the comma).
 *
 * This is a showcase + enquiry site: it presents three representative handmade
 * pieces as examples. There are no prices here — price, availability, timeframe
 * and payment are arranged directly with the customer after discussing their
 * request.
 *
 * IMAGES
 *   • `image` is the filename in this folder (e.g. "6.png").
 *   • `imageAlt` describes the photo for screen readers and SEO. Keep it factual.
 *
 * STOCK
 *   • `stockStatus`: "made_to_order" | "in_stock" | "one_off" (one-of-a-kind).
 *
 * Some per-product fields (dimensions, lead time, colours, care, safety) are left
 * blank and can be filled in later; blank fields are simply not shown.
 * ========================================================================== */

window.PRODUCTS = [
  {
    id: "wallhanging-boho",
    slug: "boho-wall-hanging",
    name: "Boho Wall Hanging",
    category: "Home Décor",
    shortDescription: "A fringed wall hanging worked in warm earth tones with a bold geometric pattern.",
    fullDescription:
      "A handmade fringed wall hanging worked in warm earth tones — brown, rust, mustard and cream — with a bold geometric chain pattern and tasselled ends. Adds cosy, handcrafted texture to a wall or can be used as a table runner.",
    image: "6.png",
    imageAlt: "Crocheted wall hanging in brown, rust, mustard and cream with a geometric pattern and fringe.",
    customisable: true,
    stockStatus: "one_off",
    leadTime: "",
    materials: "Hand-crocheted yarn",
    dimensions: "",
    weight: "",
    colours: [],
    careInstructions: "",
    safetyNote: "",
    shipDomestic: true,
    shipInternational: true,
  },
  {
    id: "throw-heritage",
    slug: "heritage-granny-throw",
    name: "Heritage Granny Throw",
    category: "Home Décor",
    shortDescription: "A classic granny-square throw in burgundy, cream and dusty rose with a charcoal border.",
    fullDescription:
      "A classic granny-square throw crocheted in burgundy, cream and dusty rose, framed with a charcoal border. A warm, heritage-style piece for a sofa, bed or reading chair.",
    image: "7.png",
    imageAlt: "Granny-square crochet throw in burgundy, cream and dusty rose with a charcoal border.",
    customisable: true,
    stockStatus: "one_off",
    leadTime: "",
    materials: "Hand-crocheted yarn",
    dimensions: "",
    weight: "",
    colours: [],
    careInstructions: "",
    safetyNote: "",
    shipDomestic: true,
    shipInternational: true,
  },
  {
    id: "shawl-golden",
    slug: "golden-fringe-shawl",
    name: "Golden Fringe Shawl",
    category: "Shawls & Wraps",
    shortDescription: "A triangular shawl crocheted in soft cream with a long, swishy fringe.",
    fullDescription:
      "A graceful triangular shawl crocheted by hand in soft cream tones, finished with a long, swishy fringe. A light wrap for cooler evenings or a special-occasion accessory. Colours can be changed on request.",
    image: "8.png",
    imageAlt: "Triangular cream-coloured crochet shawl with a long fringe.",
    customisable: true,
    stockStatus: "made_to_order",
    leadTime: "",
    materials: "Hand-crocheted yarn",
    dimensions: "",
    weight: "",
    colours: [],
    careInstructions: "",
    safetyNote: "",
    shipDomestic: true,
    shipInternational: true,
  },
];
