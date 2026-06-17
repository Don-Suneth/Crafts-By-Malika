/* =============================================================================
 * app.js — Behaviour for the Crafts by Malika storefront
 * -----------------------------------------------------------------------------
 * Responsibilities:
 *   1. Format money safely (LKR, minor units, Intl.NumberFormat, with fallback).
 *   2. Render the THREE featured creations (editorial) from products.js.
 *   3. Honest calls to action (WhatsApp / email enquiries — no fake checkout).
 *   4. Product details + coming-soon panels as accessible native <dialog>s.
 *   5. Drive the custom-order form (Formspree if configured, else WhatsApp).
 *   6. Sync contact links from config.js, mobile nav, header scroll, footer year,
 *      and subtle scroll-reveal animation (fully reduced-motion aware).
 *
 * The page still shows brand, story, contact and policy info without JavaScript;
 * only the live gallery and form enhancements require it.
 * ========================================================================== */
(function () {
  "use strict";

  var CONFIG = window.CONFIG || {};
  var PRODUCTS = window.PRODUCTS || [];

  // ---- Small helpers --------------------------------------------------------

  /** Create an element with optional class, text and attributes. */
  function el(tag, opts) {
    opts = opts || {};
    var node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.html != null) node.innerHTML = opts.html;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) {
        var v = opts.attrs[k];
        if (v !== false && v != null) node.setAttribute(k, v);
      });
    }
    return node;
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Intrinsic pixel sizes of the photos, so <img> can reserve space (no layout
  // shift) even though CSS controls the displayed box.
  var IMG_DIMS = {
    "1.png": [1027, 887], "2.png": [904, 683], "3.png": [720, 1280],
    "4.png": [720, 1280], "5.png": [850, 655], "6.png": [720, 1280],
    "7.png": [1096, 1215], "8.png": [807, 1280], "9.png": [863, 1280],
  };

  // ---- Money formatting -----------------------------------------------------

  // ISO 4217 minor-unit exponents we care about (default 2).
  var MINOR_UNITS = { LKR: 2, USD: 2, GBP: 2, EUR: 2, AUD: 2, JPY: 0 };

  /**
   * Format an amount given in MINOR units (e.g. cents) into a localized string.
   * Uses Intl.NumberFormat; falls back to a plain "CODE 0.00" string if anything
   * is unavailable, so prices never crash the page.
   */
  function formatMoney(minor, currency, locale) {
    currency = currency || (CONFIG.currency && CONFIG.currency.base) || "LKR";
    locale = locale || (CONFIG.currency && CONFIG.currency.locale) || "en-LK";
    var exp = MINOR_UNITS[currency] != null ? MINOR_UNITS[currency] : 2;
    var major = minor / Math.pow(10, exp);
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(major);
    } catch (e) {
      return currency + " " + major.toFixed(exp);
    }
  }

  /** What to show for a product's price, honouring the "no fake prices" rule. */
  function priceLabel(p) {
    var show = CONFIG.currency && CONFIG.currency.showPrices;
    if (show && p.priceConfirmed && p.priceMinor != null) {
      return formatMoney(p.priceMinor, p.currency, CONFIG.currency.locale);
    }
    return "Price on request";
  }

  var STATUS_LABELS = {
    made_to_order: "Made to order",
    in_stock: "In stock",
    one_off: "One of a kind",
  };

  // ---- Contact link builders ------------------------------------------------

  function waNumber() {
    return (CONFIG.contact && CONFIG.contact.whatsapp) || "";
  }

  function whatsappLink(message) {
    var n = waNumber();
    var base = n ? "https://wa.me/" + n : "https://wa.me/";
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  function mailtoLink(subject, body) {
    var email = (CONFIG.contact && CONFIG.contact.email) || "";
    var parts = [];
    if (subject) parts.push("subject=" + encodeURIComponent(subject));
    if (body) parts.push("body=" + encodeURIComponent(body));
    return "mailto:" + email + (parts.length ? "?" + parts.join("&") : "");
  }

  function productEnquiryMessage(p) {
    return (
      "Hi Crafts by Malika, I'm interested in the \"" + p.name + "\". " +
      "Is it available, and what is the price? Thank you!"
    );
  }

  // ---- Featured creations ---------------------------------------------------

  // Left-to-right display order of the three equal cards on the homepage.
  // Selection is still driven by `featured: true` in products.js; this only
  // controls ordering.
  var FEATURED_ORDER = ["throw-heritage", "shawl-golden", "wallhanging-boho"];

  function getFeatured() {
    var byId = {};
    PRODUCTS.forEach(function (p) { if (p.featured) byId[p.id] = p; });
    var ordered = [];
    FEATURED_ORDER.forEach(function (id) {
      if (byId[id]) { ordered.push(byId[id]); delete byId[id]; }
    });
    // Append any other featured items not named above (safety net).
    Object.keys(byId).forEach(function (id) { ordered.push(byId[id]); });
    return ordered.slice(0, 3);
  }

  function buildFeature(p) {
    var btn = el("button", {
      className: "feature reveal",
      attrs: {
        type: "button",
        "aria-label": "View " + p.name + " — " + p.category + ". " + priceLabel(p) + ".",
      },
    });

    var dims = IMG_DIMS[p.image] || [];
    var media = el("span", { className: "feature__media" });
    media.appendChild(el("img", {
      attrs: {
        src: p.image,
        alt: p.imageAlt || p.name,
        loading: "lazy",
        decoding: "async",
        width: dims[0],
        height: dims[1],
      },
    }));
    btn.appendChild(media);

    var body = el("span", { className: "feature__body" });
    body.appendChild(el("span", { className: "feature__category", text: p.category }));
    body.appendChild(el("span", { className: "feature__name", text: p.name }));
    body.appendChild(el("span", { className: "feature__price", text: priceLabel(p) }));
    // Static, non-user content only — safe to use innerHTML for the arrow glyph.
    body.appendChild(el("span", { className: "feature__cta", html: 'View &amp; enquire <span aria-hidden="true">&rarr;</span>' }));
    btn.appendChild(body);

    btn.addEventListener("click", function () { openModal(p); });
    return btn;
  }

  function renderFeatured() {
    var grid = $("#featured-grid");
    if (!grid) return;
    grid.innerHTML = "";
    var list = getFeatured();
    if (!list.length) {
      grid.appendChild(el("p", { className: "featured__loading", text: "Featured pieces are coming soon." }));
      return;
    }
    list.forEach(function (p) { grid.appendChild(buildFeature(p)); });
  }

  // ---- Dialog helpers (shared by product modal + coming-soon) ---------------

  function openDialog(dialog) {
    if (!dialog) return;
    dialog._opener = document.activeElement;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.style.overflow = "hidden";
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  /** Wire close buttons, backdrop click, and scroll/focus restore (once). */
  function wireDialog(dialog) {
    if (!dialog || dialog._wired) return;
    dialog._wired = true;

    $all("[data-close-dialog]", dialog).forEach(function (b) {
      b.addEventListener("click", function () { closeDialog(dialog); });
    });

    // Click on the backdrop (the dialog element itself, outside its content box).
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog(dialog);
    });

    // Fires on close button, backdrop, AND native Escape ('cancel' -> 'close').
    dialog.addEventListener("close", function () {
      document.body.style.overflow = "";
      var opener = dialog._opener;
      // Native <dialog> usually restores focus; this is a belt-and-braces fallback.
      if (opener && typeof opener.focus === "function" && document.activeElement === document.body) {
        opener.focus();
      }
    });
  }

  // ---- Product modal (native <dialog>) --------------------------------------

  var _modal = null;

  function getModal() {
    if (_modal) return _modal;

    var dialog = el("dialog", { className: "modal-dialog", attrs: { "aria-label": "Product details" } });

    var panel = el("div", { className: "modal" });
    var closeBtn = el("button", {
      className: "modal__close",
      text: "×",
      attrs: { type: "button", "aria-label": "Close", "data-close-dialog": "" },
    });
    panel.appendChild(closeBtn);
    panel.appendChild(el("figure", { className: "modal__media" }));
    panel.appendChild(el("div", { className: "modal__content" }));
    dialog.appendChild(panel);

    document.body.appendChild(dialog);
    wireDialog(dialog);
    _modal = dialog;
    return dialog;
  }

  function openModal(p) {
    var dialog = getModal();
    var media = dialog.querySelector(".modal__media");
    var content = dialog.querySelector(".modal__content");

    var dims = IMG_DIMS[p.image] || [];
    media.innerHTML = "";
    media.appendChild(el("img", {
      attrs: { src: p.image, alt: p.imageAlt || p.name, decoding: "async", width: dims[0], height: dims[1] },
    }));

    content.innerHTML = "";
    if (p.category) content.appendChild(el("p", { className: "modal__category", text: p.category }));
    content.appendChild(el("h2", { className: "modal__title", text: p.name }));

    var pills = el("div", { className: "modal__pills" });
    pills.appendChild(el("span", { className: "modal__price", text: priceLabel(p) }));
    if (STATUS_LABELS[p.stockStatus]) {
      pills.appendChild(el("span", {
        className: "modal__status modal__status--" + p.stockStatus,
        text: STATUS_LABELS[p.stockStatus],
      }));
    }
    content.appendChild(pills);

    if (p.shortDescription) {
      content.appendChild(el("p", { className: "modal__desc", text: p.shortDescription }));
    }

    var detailRows = [
      ["Full description", p.fullDescription],
      ["Materials", p.materials],
      ["Dimensions", p.dimensions],
      ["Colours", (p.colours && p.colours.length) ? p.colours.join(", ") : ""],
      ["Lead time", p.leadTime],
      ["Care", p.careInstructions],
      ["Safety", p.safetyNote],
    ].filter(function (row) { return row[1]; });

    if (detailRows.length) {
      var dl = el("dl", { className: "modal__details" });
      detailRows.forEach(function (row) {
        dl.appendChild(el("dt", { text: row[0] }));
        dl.appendChild(el("dd", { text: row[1] }));
      });
      content.appendChild(dl);
    }

    var actions = el("div", { className: "modal__actions" });
    actions.appendChild(el("a", {
      className: "btn btn--primary",
      text: "Enquire on WhatsApp",
      attrs: { href: whatsappLink(productEnquiryMessage(p)), target: "_blank", rel: "noopener" },
    }));
    actions.appendChild(el("a", {
      className: "btn btn--ghost",
      text: "Email instead",
      attrs: { href: mailtoLink("Enquiry: " + p.name, productEnquiryMessage(p)) },
    }));
    if (p.customisable) {
      var customBtn = el("button", {
        className: "btn btn--secondary",
        text: "Request a custom version",
        attrs: { type: "button" },
      });
      customBtn.addEventListener("click", function () {
        closeModal();
        prefillCustomForm(p);
      });
      actions.appendChild(customBtn);
    }
    content.appendChild(actions);

    openDialog(dialog);
  }

  function closeModal() { closeDialog(_modal); }

  // ---- Coming-soon dialog (future shop) -------------------------------------

  function setupComingSoon() {
    var trigger = $("#view-collection");
    var dialog = $("#coming-soon-dialog");
    if (!trigger || !dialog) return;

    var wa = $("#dialog-whatsapp");
    if (wa) {
      wa.setAttribute("href", whatsappLink(
        "Hi Crafts by Malika, I'd love to see more of your work. What's available at the moment?"
      ));
    }

    wireDialog(dialog);

    // TODO(shop): Replace this coming-soon dialog with navigation to the dedicated
    // collection page once the future shop route is implemented.
    trigger.addEventListener("click", function (e) {
      if (typeof dialog.showModal !== "function") return; // no native dialog: follow href to #contact
      e.preventDefault();
      openDialog(dialog);
    });
  }

  // ---- Custom-order form ----------------------------------------------------

  // Read a named control via form.elements so names like "name" don't collide
  // with built-in HTMLFormElement properties (form.name is the form's own name).
  function fieldValue(form, name) {
    var control = form.elements.namedItem(name);
    return control ? String(control.value).trim() : "";
  }

  function getFormData(form) {
    return {
      name: fieldValue(form, "name"),
      country: fieldValue(form, "country"),
      email: fieldValue(form, "email"),
      phone: fieldValue(form, "phone"),
      productType: fieldValue(form, "productType"),
      colours: fieldValue(form, "colours"),
      size: fieldValue(form, "size"),
      requiredDate: fieldValue(form, "requiredDate"),
      budget: fieldValue(form, "budget"),
      currency: fieldValue(form, "currency"),
      delivery: fieldValue(form, "delivery"),
      description: fieldValue(form, "description"),
    };
  }

  function buildEnquiryMessage(d) {
    var lines = [
      "Custom order enquiry — Crafts by Malika",
      d.name ? "Name: " + d.name : "",
      d.country ? "Country: " + d.country : "",
      d.email ? "Email: " + d.email : "",
      d.phone ? "Phone/WhatsApp: " + d.phone : "",
      d.productType ? "Product type: " + d.productType : "",
      d.colours ? "Preferred colours: " + d.colours : "",
      d.size ? "Size: " + d.size : "",
      d.requiredDate ? "Required by: " + d.requiredDate : "",
      d.budget ? "Budget: " + d.budget : "",
      d.currency ? "Preferred currency: " + d.currency : "",
      d.delivery ? "Delivery to: " + d.delivery : "",
      d.description ? "Details: " + d.description : "",
    ];
    return lines.filter(Boolean).join("\n");
  }

  function prefillCustomForm(p) {
    var form = $("#custom-order-form");
    if (!form) return;
    // Open the progressive-reveal panel so the fields are visible.
    var details = $("#custom-reveal");
    if (details) details.open = true;

    var typeField = form.elements.namedItem("productType");
    var descField = form.elements.namedItem("description");
    var nameField = form.elements.namedItem("name");
    if (typeField && !typeField.value) typeField.value = p.category;
    if (descField) {
      var seed = "I'd like a custom version of your \"" + p.name + "\". ";
      if (descField.value.indexOf(seed) === -1) {
        descField.value = seed + descField.value;
      }
    }
    updateFormWhatsappLink();
    var custom = document.getElementById("custom");
    if (custom) custom.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    if (nameField) nameField.focus();
  }

  function updateFormWhatsappLink() {
    var form = $("#custom-order-form");
    var link = $("#custom-whatsapp");
    if (!form || !link) return;
    link.setAttribute("href", whatsappLink(buildEnquiryMessage(getFormData(form))));
  }

  function setupCustomForm() {
    var form = $("#custom-order-form");
    if (!form) return;
    var status = $("#form-status");
    var waLink = $("#custom-whatsapp");

    // Keep the "Send via WhatsApp instead" link in sync with what's typed.
    form.addEventListener("input", updateFormWhatsappLink);
    updateFormWhatsappLink();

    if (waLink) {
      waLink.addEventListener("click", function () {
        if (status) status.textContent = "Opening WhatsApp with your enquiry…";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = getFormData(form);
      var endpoint = CONFIG.forms && CONFIG.forms.formspreeEndpoint;

      if (endpoint) {
        if (status) status.textContent = "Sending your enquiry…";
        fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        })
          .then(function (res) {
            if (res.ok) {
              form.reset();
              updateFormWhatsappLink();
              if (status) status.textContent = "Thank you! Your enquiry has been sent. We'll be in touch soon.";
            } else {
              throw new Error("Bad response");
            }
          })
          .catch(function () {
            if (status) {
              status.innerHTML =
                "Sorry, that didn't send. Please use the " +
                '"Send via WhatsApp instead" button above, or email us.';
            }
          });
      } else {
        // No backend configured: hand off to WhatsApp with a prefilled message.
        var url = whatsappLink(buildEnquiryMessage(data));
        window.open(url, "_blank", "noopener");
        if (status) {
          status.textContent =
            "Opening WhatsApp with your enquiry. If nothing happened, use the WhatsApp button above or email us.";
        }
      }
    });
  }

  // ---- Contact sync ---------------------------------------------------------

  function syncContactLinks() {
    var c = CONFIG.contact || {};
    var s = CONFIG.social || {};

    var wa = $('[data-contact="whatsapp"]');
    if (wa && c.whatsapp) {
      wa.setAttribute("href", whatsappLink());
      if (c.whatsappDisplay) wa.textContent = c.whatsappDisplay;
    }
    var em = $('[data-contact="email"]');
    if (em && c.email) {
      em.setAttribute("href", "mailto:" + c.email);
      em.textContent = c.email;
    }
    var fb = $('[data-contact="facebook"]');
    if (fb && s.facebook) fb.setAttribute("href", s.facebook);
    var ig = $('[data-contact="instagram"]');
    if (ig && s.instagram) ig.setAttribute("href", s.instagram);

    var rt = $('[data-contact="response-time"]');
    if (rt && c.responseTime) {
      rt.textContent = "We usually reply " + c.responseTime + ".";
      rt.hidden = false;
    }
  }

  // ---- Mobile navigation ----------------------------------------------------

  function setupNav() {
    var toggle = $(".nav-toggle");
    var nav = $(".primary-nav");
    var menu = $("#primary-menu");
    if (!toggle || !nav || !menu) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) close(); else open();
    });

    // Close after choosing a destination, or on Escape.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  // ---- Header scroll state --------------------------------------------------

  function setupHeaderScroll() {
    var header = $("#site-header");
    var hero = $("#home");
    if (!header) return;
    // The header is transparent over the hero and turns solid once the hero has
    // essentially scrolled past the (sticky) bar. Fall back to a small threshold
    // if there is no hero.
    function computeThreshold() {
      var hh = header.offsetHeight || 68;
      return hero ? Math.max(hero.offsetHeight - hh - 8, 24) : 24;
    }
    var threshold = computeThreshold();
    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > threshold); }
    function onResize() { threshold = computeThreshold(); onScroll(); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
  }

  // ---- Scroll reveal --------------------------------------------------------

  function setupReveals() {
    var nodes = $all(".reveal");
    if (!nodes.length) return;
    // No animation when reduced motion is preferred or IO is unsupported:
    // show everything immediately so content is never gated on animation.
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  // ---- Misc -----------------------------------------------------------------

  function setYear() {
    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // ---- Init -----------------------------------------------------------------

  function init() {
    setYear();
    syncContactLinks();
    setupNav();
    setupHeaderScroll();
    renderFeatured();
    setupComingSoon();
    setupCustomForm();
    setupReveals(); // after renderFeatured so dynamically-created .reveal nodes are observed
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
