/* =============================================================================
 * products.js — Product catalogue for Crafts by Malika
 * -----------------------------------------------------------------------------
 * HOW TO MANAGE PRODUCTS (for non-developers)
 *
 *   • Each product is one { ... } block inside the PRODUCTS list below.
 *   • To EDIT a product, change the text between the quotes.
 *   • To ADD a product, copy an existing block, paste it, and change the values.
 *     Give it a NEW unique `id` and `slug`.
 *   • To REMOVE a product, delete its whole { ... } block (including the comma).
 *
 * PRICES
 *   • `currency` is always "LKR" (Sri Lankan Rupees) — the canonical currency.
 *   • `priceMinor` is the price in CENTS (minor units) to avoid rounding errors.
 *       LKR 2,500.00  ->  priceMinor: 250000
 *       LKR    750.00  ->  priceMinor: 75000
 *   • A price only shows on the site when BOTH `priceMinor` is set AND
 *     `priceConfirmed: true`. Until then the card shows "Price on request".
 *     This prevents accidentally publishing placeholder prices.
 *
 * IMAGES
 *   • `image` is the filename in this folder (e.g. "1.png").
 *   • `imageAlt` describes the photo for screen readers and SEO. Keep it factual.
 *
 * STOCK
 *   • `stockStatus`: "made_to_order" | "in_stock" | "one_off" (one-of-a-kind).
 *     Most handmade crochet is made to order. TODO(business): confirm per item.
 *
 * Descriptions below were written from the supplied photographs. Anything the
 * photo cannot confirm (exact size, fibre, colours offered) is left blank with a
 * TODO(business) note rather than guessed. See BUSINESS_SETUP.md.
 * ========================================================================== */

window.PRODUCTS = [
  {
    id: "turtle-forest",
    slug: "forest-turtle-toy",
    name: "Forest Turtle Toy",
    category: "Toys & Amigurumi",
    shortDescription: "A hand-crocheted turtle with a soft green body and a swirled purple shell.",
    fullDescription:
      "A cuddly amigurumi turtle, crocheted by hand with a bright green body and a spiral-stitched purple shell. A playful gift or a cheerful shelf companion. Colours can be changed on request.",
    priceMinor: null,          // TODO(business): set real LKR price in cents, then priceConfirmed: true
    currency: "LKR",
    priceConfirmed: false,
    image: "1.png",
    imageAlt: "Hand-crocheted turtle with a green body and a spiral purple shell.",
    featured: true,
    customisable: true,
    stockStatus: "made_to_order",
    leadTime: "",              // TODO(business): e.g. "1–2 weeks"
    materials: "Hand-crocheted yarn", // TODO(business): confirm exact fibre (cotton / acrylic / blend)
    dimensions: "",            // TODO(business)
    weight: "",                // TODO(business)
    colours: [],               // TODO(business): colourways you can offer
    careInstructions: "",      // TODO(business): e.g. "Hand wash cold, dry flat"
    safetyNote: "",            // TODO(business): for toys — does it use safety eyes / small parts?
    shipDomestic: true,
    shipInternational: true,
  },
  {
    id: "turtle-blush",
    slug: "blush-turtle-toy",
    name: "Blush Turtle Toy",
    category: "Toys & Amigurumi",
    shortDescription: "A hand-crocheted turtle in soft blush with a rounded deep-pink shell.",
    fullDescription:
      "A sweet amigurumi turtle stitched in blush pink with a deep-pink swirl shell. Soft, light and huggable — a gentle gift for children and grown-ups alike. Colours can be changed on request.",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "2.png",
    imageAlt: "Hand-crocheted turtle with a blush-pink body and a rounded deep-pink shell.",
    featured: false,
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
  {
    id: "birdie-rosy",
    slug: "rosy-birdie-buddy",
    name: "Rosy Birdie Buddy",
    category: "Toys & Amigurumi",
    shortDescription: "A little hand-crocheted bird in rosy pink with tiny wings and a soft crest.",
    fullDescription:
      "A charming amigurumi bird crocheted in rosy pink, with little wings and a soft cream crest. A whimsical desk or shelf friend. Colours can be changed on request.",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "3.png",
    imageAlt: "Small hand-crocheted bird in rosy pink with little wings and a cream crest.",
    featured: false,
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
  {
    id: "heart-pink",
    slug: "pink-sweetheart",
    name: "Pink Sweetheart",
    category: "Toys & Amigurumi",
    shortDescription: "A smiling hand-crocheted heart — a little handmade token of affection.",
    fullDescription:
      "A cheerful amigurumi heart with a friendly stitched face, crocheted by hand in soft pink. A sweet little keepsake or pick-me-up gift. (Shown styled beside a plant for scale; the plant is not included.) Colours can be changed on request.",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "4.png",
    imageAlt: "Hand-crocheted pink heart with a small smiling face.",
    featured: false,
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
  {
    id: "scrunchie-ocean",
    slug: "ocean-breeze-scrunchie",
    name: "Ocean Breeze Scrunchie",
    category: "Accessories",
    shortDescription: "A frilly hair scrunchie crocheted in ocean blues and white.",
    fullDescription:
      "A soft, frilly hair scrunchie crocheted in cool ocean blues and white. Gentle on hair and a pretty everyday accessory. Colours can be changed on request.",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "5.png",
    imageAlt: "Frilly crocheted hair scrunchie in shades of blue and white.",
    featured: false,
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
  {
    id: "wallhanging-boho",
    slug: "boho-wall-hanging",
    name: "Boho Wall Hanging",
    category: "Home Décor",
    shortDescription: "A fringed wall hanging worked in warm earth tones with a bold geometric pattern.",
    fullDescription:
      "A handmade fringed wall hanging worked in warm earth tones — brown, rust, mustard and cream — with a bold geometric chain pattern and tasselled ends. Adds cosy, handcrafted texture to a wall or can be used as a table runner.",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "6.png",
    imageAlt: "Crocheted wall hanging in brown, rust, mustard and cream with a geometric pattern and fringe.",
    featured: true,
    customisable: true,
    stockStatus: "one_off",     // TODO(business): confirm if this is one-of-a-kind or can be remade
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
      "A classic granny-square throw crocheted in burgundy, cream and dusty rose, framed with a charcoal border. A warm, heritage-style piece for a sofa, bed or reading chair. TODO(business): confirm the finished size (e.g. lap throw, baby blanket or cushion cover).",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "7.png",
    imageAlt: "Granny-square crochet throw in burgundy, cream and dusty rose with a charcoal border.",
    featured: true,
    customisable: true,
    stockStatus: "one_off",     // TODO(business): confirm
    leadTime: "",
    materials: "Hand-crocheted yarn",
    dimensions: "",            // TODO(business): important for a blanket/throw
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
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "8.png",
    imageAlt: "Triangular cream-coloured crochet shawl with a long fringe.",
    featured: false,
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
  {
    id: "shawl-meadow",
    slug: "meadow-triangle-shawl",
    name: "Meadow Triangle Shawl",
    category: "Shawls & Wraps",
    shortDescription: "A lacy triangular shawl in terracotta with a fresh lime-green border.",
    fullDescription:
      "A lacy, lightweight triangular shawl crocheted in warm terracotta with a fresh lime-green border and an openwork fan pattern. Wear it as a shawl or a kerchief-style wrap. Colours can be changed on request.",
    priceMinor: null,
    currency: "LKR",
    priceConfirmed: false,
    image: "9.png",
    imageAlt: "Lacy triangular crochet shawl in terracotta with a lime-green border.",
    featured: false,
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
