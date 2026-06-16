/* =============================================================================
 * app.js — Behaviour for the Crafts by Malika storefront
 * -----------------------------------------------------------------------------
 * Responsibilities:
 *   1. Format money safely (LKR, minor units, Intl.NumberFormat, with fallback).
 *   2. Render the product catalogue and category filters from products.js.
 *   3. Build honest calls to action (WhatsApp / email enquiries — no fake checkout).
 *   4. Drive the custom-order form (Formspree if configured, else WhatsApp).
 *   5. Sync contact links from config.js and run the mobile nav + footer year.
 *
 * The page still shows brand, about, contact and policy info without JavaScript;
 * only the live product grid and form enhancements require it.
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
      // Fallback if the locale/currency is not supported in this browser.
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

  // ---- Product catalogue ----------------------------------------------------

  function productEnquiryMessage(p) {
    return (
      "Hi Crafts by Malika, I'm interested in the \"" + p.name + "\". " +
      "Is it available, and what is the price? Thank you!"
    );
  }

  function buildCard(p) {
    var card = el("article", { className: "card", attrs: { "data-category": p.category } });

    // Media (square, cover fill)
    var figure = el("figure", { className: "card__media" });
    figure.appendChild(el("img", {
      attrs: {
        src: p.image,
        alt: p.imageAlt || p.name,
        loading: "lazy",
        decoding: "async",
      },
    }));
    if (p.featured) {
      figure.appendChild(el("span", { className: "card__flag", text: "Featured" }));
    }
    card.appendChild(figure);

    // Body: title + price/status only
    var body = el("div", { className: "card__body" });
    body.appendChild(el("h3", { className: "card__title", text: p.name }));

    var meta = el("div", { className: "card__meta" });
    meta.appendChild(el("span", { className: "card__price", text: priceLabel(p) }));
    if (STATUS_LABELS[p.stockStatus]) {
      meta.appendChild(el("span", {
        className: "card__status card__status--" + p.stockStatus,
        text: STATUS_LABELS[p.stockStatus],
      }));
    }
    body.appendChild(meta);
    card.appendChild(body);

    // Action area — text button is the accessible control; whole card is clickable.
    var actions = el("div", { className: "card__actions" });
    var viewBtn = el("button", {
      className: "btn--card-cta",
      text: "View details",
      attrs: { type: "button", "aria-label": "View details for " + p.name },
    });
    viewBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal(p);
    });
    actions.appendChild(viewBtn);
    card.appendChild(actions);

    // The whole card surface opens the modal for mouse/touch users.
    card.addEventListener("click", function () { openModal(p); });

    return card;
  }

  // ---- Product modal --------------------------------------------------------

  var _modal = null;

  function getModal() {
    if (_modal) return _modal;

    var overlay = el("div", {
      className: "modal-overlay",
      attrs: { role: "dialog", "aria-modal": "true", "aria-label": "Product details" },
    });
    overlay.hidden = true;

    var panel = el("div", { className: "modal" });

    var closeBtn = el("button", {
      className: "modal__close",
      text: "×",
      attrs: { type: "button", "aria-label": "Close" },
    });
    closeBtn.addEventListener("click", closeModal);
    panel.appendChild(closeBtn);

    var media = document.createElement("figure");
    media.className = "modal__media";
    panel.appendChild(media);
    panel.appendChild(el("div", { className: "modal__content" }));

    overlay.appendChild(panel);

    // Close on backdrop click
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && _modal && !_modal.hidden) closeModal();
    });

    document.body.appendChild(overlay);
    _modal = overlay;
    return overlay;
  }

  function openModal(p) {
    var overlay = getModal();
    var media = overlay.querySelector(".modal__media");
    var content = overlay.querySelector(".modal__content");

    // Rebuild media
    media.innerHTML = "";
    media.appendChild(el("img", {
      attrs: { src: p.image, alt: p.imageAlt || p.name, decoding: "async" },
    }));

    // Rebuild content
    content.innerHTML = "";

    if (p.category) {
      content.appendChild(el("p", { className: "modal__category", text: p.category }));
    }
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
      attrs: {
        href: whatsappLink(productEnquiryMessage(p)),
        target: "_blank",
        rel: "noopener",
      },
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

    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    overlay.querySelector(".modal__close").focus();
  }

  function closeModal() {
    if (!_modal) return;
    _modal.hidden = true;
    document.body.style.overflow = "";
  }

  function renderProducts(filter) {
    var grid = $("#product-grid");
    if (!grid) return;
    grid.innerHTML = "";

    var list = PRODUCTS.filter(function (p) {
      return !filter || filter === "all" || p.category === filter;
    });

    if (!list.length) {
      grid.appendChild(el("p", { className: "product-grid__empty", text: "No items in this category yet." }));
      return;
    }
    list.forEach(function (p) { grid.appendChild(buildCard(p)); });
  }

  function renderFilters() {
    var wrap = $("#filters");
    if (!wrap) return;

    var categories = [];
    PRODUCTS.forEach(function (p) {
      if (categories.indexOf(p.category) === -1) categories.push(p.category);
    });

    var all = ["all"].concat(categories);
    all.forEach(function (cat, i) {
      var btn = el("button", {
        className: "filter" + (i === 0 ? " is-active" : ""),
        text: cat === "all" ? "All" : cat,
        attrs: { type: "button", "data-filter": cat, "aria-pressed": i === 0 ? "true" : "false" },
      });
      btn.addEventListener("click", function () {
        $all(".filter", wrap).forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        renderProducts(cat);
      });
      wrap.appendChild(btn);
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
        // Send through Formspree (or compatible) endpoint.
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

  // ---- Misc -----------------------------------------------------------------

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function setYear() {
    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // ---- Init -----------------------------------------------------------------

  function init() {
    setYear();
    syncContactLinks();
    setupNav();
    renderFilters();
    renderProducts("all");
    setupCustomForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
