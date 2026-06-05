(function () {
  const PREF_KEY = "tayya_luxury_prefs_v1";
  const REVIEW_KEY = "tayya_reviews_v1";
  const FALLBACK_FEED = {
    ar: [
      "واجهة أسرع للبحث والتصفح والدفع",
      "تجربة أقرب لمتاجر العلامات العالمية",
      "تحسينات جديدة للموبايل والسلة والحساب",
      "عروض ذكية وشحن مجاني فوق 30 ر.ع"
    ],
    en: [
      "Faster search, browsing, and checkout",
      "A surface closer to global luxury storefronts",
      "New polish for mobile, cart, and account",
      "Smarter offers and free shipping above 30 OMR"
    ]
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    waitForStore(bootstrap);
  }

  function waitForStore(callback) {
    if (window.tayyaStore && window.tayyaStore.state) return callback();
    setTimeout(function () { waitForStore(callback); }, 120);
  }

  function bootstrap() {
    injectHotTags();
    injectMiniRail();
    injectCommandPalette();
    injectReviewFeed();
    wrapFetchProducts();
    wrap("updateCartUI", renderPanorama);
    wrap("loadOrders", renderAdminFilters);
    bindEvents();
    renderPanorama();
  }

  function wrap(name, after) {
    const original = window[name];
    if (typeof original !== "function" || original.__panoramaWrapped) return;
    const wrapped = function () {
      const result = original.apply(this, arguments);
      if (result && typeof result.then === "function") return result.finally(function () { queueMicrotask(after); });
      queueMicrotask(after);
      return result;
    };
    wrapped.__panoramaWrapped = true;
    window[name] = wrapped;
  }

  function wrapFetchProducts() {
    const original = window.fetchProducts;
    if (typeof original !== "function" || original.__panoramaFetchWrapped) return;
    const wrapped = function () {
      showProductLoadingState();
      const result = original.apply(this, arguments);
      if (result && typeof result.then === "function") {
        return result.finally(function () {
          hideProductLoadingState();
          queueMicrotask(renderPanorama);
        });
      }
      hideProductLoadingState();
      queueMicrotask(renderPanorama);
      return result;
    };
    wrapped.__panoramaFetchWrapped = true;
    window.fetchProducts = wrapped;
  }

  function locale() {
    const prefs = loadJson(PREF_KEY, { locale: "ar" });
    return prefs.locale === "en" ? "en" : "ar";
  }

  function copy() {
    const isEn = locale() === "en";
    return {
      hotTitle: isEn ? "Hot discovery tags" : "وسوم الاكتشاف السريع",
      hotBody: isEn ? "Jump directly into the strongest searches, categories, and product cues." : "اقفز مباشرة إلى أقوى مسارات البحث والفئات والإشارات الشرائية.",
      railTitle: isEn ? "Quick cart rail" : "شريط السلة السريع",
      railCart: isEn ? "Open cart" : "افتح السلة",
      railSearch: isEn ? "Search" : "بحث",
      railFree: isEn ? "to free shipping" : "للشحن المجاني",
      commandTitle: isEn ? "Quick command" : "الأوامر السريعة",
      commandHint: isEn ? "Use Ctrl + K or /" : "استخدم / أو Ctrl + K",
      commandPlaceholder: isEn ? "Search for an action..." : "ابحث عن أمر سريع...",
      commandEmpty: isEn ? "No matching action." : "لا يوجد أمر مطابق.",
      feedTitle: isEn ? "Store pulse feed" : "شريط نبض المتجر",
      feedBody: isEn ? "Rolling product, review, and service signals across the storefront." : "شريط متحرك لنبض المنتجات والمراجعات والخدمة عبر الواجهة.",
      adminTitle: isEn ? "Order filters" : "فلاتر الطلبات",
      adminSearch: isEn ? "Search orders..." : "ابحث في الطلبات...",
      actions: [
        { key: "search", label: isEn ? "Focus search" : "تركيز على البحث" },
        { key: "cart", label: isEn ? "Open cart" : "فتح السلة" },
        { key: "account", label: isEn ? "Open account" : "فتح الحساب" },
        { key: "featured", label: isEn ? "Go to featured" : "المنتجات المميزة" },
        { key: "products", label: isEn ? "Go to products" : "كل المنتجات" },
        { key: "dark", label: isEn ? "Toggle dark mode" : "تبديل الوضع الداكن" },
        { key: "whatsapp", label: isEn ? "Open WhatsApp" : "واتساب مباشر" }
      ],
      statusAll: isEn ? "All" : "الكل",
      statusNew: isEn ? "New" : "جديد",
      statusPrep: isEn ? "Preparing" : "قيد التجهيز",
      statusPaid: isEn ? "Paid" : "مدفوع",
      statusShipped: isEn ? "Shipped" : "تم الشحن"
    };
  }

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function state() {
    return window.tayyaStore.state || {};
  }

  function products() {
    return Array.isArray(state().products) ? state().products : [];
  }

  function rating(id) {
    return typeof window.tayyaStore.getAverageRating === "function" ? Number(window.tayyaStore.getAverageRating(id) || 0) : 0;
  }

  function reviewsMap() {
    return loadJson(REVIEW_KEY, {});
  }

  function injectHotTags() {
    if (document.getElementById("panorama-tags")) return;
    const anchor = document.querySelector(".tools-note");
    if (!anchor || !anchor.parentNode) return;
    const section = document.createElement("section");
    section.id = "panorama-tags";
    section.className = "panorama-shell";
    section.innerHTML = [
      '<div class="panorama-head">',
      '  <div><h2 id="panorama-tags-title"></h2><p id="panorama-tags-body"></p></div>',
      "</div>",
      '<div class="panorama-chip-grid" id="panorama-chip-grid"></div>'
    ].join("");
    anchor.insertAdjacentElement("afterend", section);
  }

  function injectMiniRail() {
    if (document.getElementById("panorama-rail")) return;
    const rail = document.createElement("aside");
    rail.id = "panorama-rail";
    rail.innerHTML = [
      '<div class="panorama-rail__head"><strong id="panorama-rail-title"></strong></div>',
      '<div class="panorama-rail__stats">',
      '  <div><span id="panorama-rail-count">0</span><small>items</small></div>',
      '  <div><span id="panorama-rail-total">0</span><small>OMR</small></div>',
      "</div>",
      '<div class="panorama-rail__progress"><i id="panorama-rail-progress"></i></div>',
      '<div class="panorama-rail__note" id="panorama-rail-note"></div>',
      '<div class="panorama-rail__actions">',
      '  <button type="button" class="ghost-btn" data-panorama-action="cart" id="panorama-rail-cart"></button>',
      '  <button type="button" class="ghost-btn" data-panorama-action="search" id="panorama-rail-search"></button>',
      "</div>"
    ].join("");
    document.body.appendChild(rail);
  }

  function injectCommandPalette() {
    if (document.getElementById("panorama-command")) return;
    const overlay = document.createElement("div");
    overlay.id = "panorama-command";
    overlay.innerHTML = [
      '<div class="panorama-command__overlay" data-panorama-close></div>',
      '<div class="panorama-command__panel">',
      '  <div class="panorama-command__head"><strong id="panorama-command-title"></strong><span id="panorama-command-hint"></span></div>',
      '  <input type="text" id="panorama-command-input" autocomplete="off">',
      '  <div class="panorama-command__list" id="panorama-command-list"></div>',
      "</div>"
    ].join("");
    document.body.appendChild(overlay);
  }

  function injectReviewFeed() {
    if (document.getElementById("panorama-feed")) return;
    const anchor = document.querySelector(".info-sections");
    if (!anchor || !anchor.parentNode) return;
    const section = document.createElement("section");
    section.id = "panorama-feed";
    section.className = "panorama-shell";
    section.innerHTML = [
      '<div class="panorama-head">',
      '  <div><h2 id="panorama-feed-title"></h2><p id="panorama-feed-body"></p></div>',
      "</div>",
      '<div class="panorama-ticker"><div class="panorama-ticker__track" id="panorama-feed-track"></div></div>'
    ].join("");
    anchor.insertAdjacentElement("beforebegin", section);
  }

  function bindEvents() {
    if (document.body.__panoramaBound) return;
    document.body.__panoramaBound = true;

    document.addEventListener("click", function (event) {
      const chip = event.target.closest("[data-panorama-chip]");
      if (chip) {
        applyChip(chip.getAttribute("data-panorama-chip"), chip.getAttribute("data-panorama-value") || "");
        return;
      }
      const action = event.target.closest("[data-panorama-action]");
      if (action) {
        runAction(action.getAttribute("data-panorama-action"));
        return;
      }
      if (event.target.closest("[data-panorama-close]")) {
        closeCommandPalette();
        return;
      }
      const commandAction = event.target.closest("[data-panorama-command]");
      if (commandAction) {
        runAction(commandAction.getAttribute("data-panorama-command"));
        closeCommandPalette();
        return;
      }
      const statusFilter = event.target.closest("[data-order-filter]");
      if (statusFilter) {
        applyOrderFilter(statusFilter.getAttribute("data-order-filter"));
      }
    });

    document.addEventListener("keydown", function (event) {
      const active = document.getElementById("panorama-command");
      const isOpen = active && active.classList.contains("open");
      if ((event.ctrlKey && event.key.toLowerCase() === "k") || (!event.ctrlKey && event.key === "/" && !isTypingField(event.target))) {
        event.preventDefault();
        toggleCommandPalette();
        return;
      }
      if (isOpen && event.key === "Escape") {
        closeCommandPalette();
      }
    });

    const input = document.getElementById("panorama-command-input");
    if (input) {
      input.addEventListener("input", renderCommandPalette);
    }
  }

  function isTypingField(target) {
    return target && /INPUT|TEXTAREA|SELECT/.test(target.tagName || "");
  }

  function renderPanorama() {
    renderHotTags();
    renderMiniRail();
    renderCommandPalette();
    renderReviewFeed();
    renderAdminFilters();
  }

  function renderHotTags() {
    const title = document.getElementById("panorama-tags-title");
    const body = document.getElementById("panorama-tags-body");
    const grid = document.getElementById("panorama-chip-grid");
    if (!title || !body || !grid) return;
    const ui = copy();
    title.textContent = ui.hotTitle;
    body.textContent = ui.hotBody;
    const bucket = [];
    products().slice(0, 16).forEach(function (product) {
      [product.category, product.brand, product.color, product.material].filter(Boolean).forEach(function (value) {
        bucket.push(String(value));
      });
    });
    const counts = bucket.reduce(function (map, value) {
      map[value] = (map[value] || 0) + 1;
      return map;
    }, {});
    const topTags = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 8);
    const chips = topTags.map(function (entry) {
      return { type: "search", value: entry[0], label: entry[0] };
    });
    if (!chips.length) {
      chips.push(
        { type: "sort", value: "top-rated", label: ui.statusPaid },
        { type: "price", value: "25-50", label: "25 - 50" }
      );
    }
    grid.innerHTML = chips.map(function (chip) {
      return '<button type="button" class="panorama-chip" data-panorama-chip="' + esc(chip.type) + '" data-panorama-value="' + esc(chip.value) + '">' + esc(chip.label) + "</button>";
    }).join("");
  }

  function renderMiniRail() {
    const rail = document.getElementById("panorama-rail");
    if (!rail) return;
    const ui = copy();
    const cart = Array.isArray(state().cart) ? state().cart : [];
    const count = cart.reduce(function (sum, item) { return sum + Number(item.quantity || 0); }, 0);
    const total = cart.reduce(function (sum, item) { return sum + Number(item.price || 0) * Number(item.quantity || 0); }, 0);
    const percent = Math.max(0, Math.min(100, (total / 30) * 100));
    document.getElementById("panorama-rail-title").textContent = ui.railTitle;
    document.getElementById("panorama-rail-count").textContent = String(count);
    document.getElementById("panorama-rail-total").textContent = total.toFixed(1);
    document.getElementById("panorama-rail-progress").style.width = percent.toFixed(1) + "%";
    document.getElementById("panorama-rail-note").textContent = total >= 30 ? (locale() === "en" ? "Free shipping unlocked" : "تم فتح الشحن المجاني") : (30 - total).toFixed(1) + " OMR " + ui.railFree;
    document.getElementById("panorama-rail-cart").textContent = ui.railCart;
    document.getElementById("panorama-rail-search").textContent = ui.railSearch;
    rail.classList.toggle("is-visible", count > 0 || window.scrollY > 380);
  }

  function renderCommandPalette() {
    const title = document.getElementById("panorama-command-title");
    const hint = document.getElementById("panorama-command-hint");
    const input = document.getElementById("panorama-command-input");
    const list = document.getElementById("panorama-command-list");
    if (!title || !hint || !input || !list) return;
    const ui = copy();
    title.textContent = ui.commandTitle;
    hint.textContent = ui.commandHint;
    input.placeholder = ui.commandPlaceholder;
    const query = String(input.value || "").trim().toLowerCase();
    const actions = ui.actions.filter(function (item) {
      return !query || String(item.label || "").toLowerCase().includes(query) || String(item.key || "").toLowerCase().includes(query);
    });
    list.innerHTML = actions.length ? actions.map(function (item) {
      return '<button type="button" class="panorama-command__item" data-panorama-command="' + esc(item.key) + '">' + esc(item.label) + "</button>";
    }).join("") : '<div class="panorama-command__empty">' + esc(ui.commandEmpty) + "</div>";
  }

  function renderReviewFeed() {
    const title = document.getElementById("panorama-feed-title");
    const body = document.getElementById("panorama-feed-body");
    const track = document.getElementById("panorama-feed-track");
    if (!title || !body || !track) return;
    const ui = copy();
    title.textContent = ui.feedTitle;
    body.textContent = ui.feedBody;
    const feed = [];
    Object.keys(reviewsMap()).forEach(function (productId) {
      const product = products().find(function (item) { return item.id === productId; });
      (reviewsMap()[productId] || []).slice(0, 2).forEach(function (review) {
        if (!product || !review.comment) return;
        feed.push((product.name || "") + " • " + review.comment);
      });
    });
    const items = (feed.length ? feed : FALLBACK_FEED[locale() === "en" ? "en" : "ar"]).slice(0, 8);
    const renderItems = items.concat(items).map(function (item) {
      return '<span class="panorama-ticker__item">' + esc(item) + "</span>";
    }).join("");
    track.innerHTML = renderItems;
  }

  function renderAdminFilters() {
    const area = document.getElementById("admin-dynamic-area");
    if (!area || !area.parentNode) return;
    let filters = document.getElementById("panorama-admin-filters");
    if (!filters) {
      filters = document.createElement("div");
      filters.id = "panorama-admin-filters";
      filters.className = "panorama-admin-filters";
      area.parentNode.insertBefore(filters, area);
    }
    const ui = copy();
    filters.innerHTML = [
      '<div class="panorama-admin-filters__head"><strong>' + esc(ui.adminTitle) + '</strong></div>',
      '<div class="panorama-admin-filters__controls">',
      '  <input type="text" id="panorama-order-search" placeholder="' + esc(ui.adminSearch) + '">',
      '  <div class="panorama-order-statuses">',
      '    <button type="button" data-order-filter="all">' + esc(ui.statusAll) + "</button>",
      '    <button type="button" data-order-filter="جديد">' + esc(ui.statusNew) + "</button>",
      '    <button type="button" data-order-filter="قيد التجهيز">' + esc(ui.statusPrep) + "</button>",
      '    <button type="button" data-order-filter="مدفوع">' + esc(ui.statusPaid) + "</button>",
      '    <button type="button" data-order-filter="تم الشحن">' + esc(ui.statusShipped) + "</button>",
      "  </div>",
      "</div>"
    ].join("");
    const input = document.getElementById("panorama-order-search");
    if (input && !input.dataset.bound) {
      input.dataset.bound = "1";
      input.addEventListener("input", function () {
        applyOrderFilter(window.__panoramaOrderStatus || "all");
      });
    }
  }

  function applyOrderFilter(status) {
    window.__panoramaOrderStatus = status || "all";
    const query = String(document.getElementById("panorama-order-search") ? document.getElementById("panorama-order-search").value : "").toLowerCase();
    document.querySelectorAll(".panorama-order-statuses button").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-order-filter") === (status || "all"));
    });
    document.querySelectorAll("#admin-dynamic-area .admin-order-card").forEach(function (card) {
      const text = String(card.textContent || "").toLowerCase();
      const statusMatch = !status || status === "all" || text.includes(String(status).toLowerCase());
      const queryMatch = !query || text.includes(query);
      card.style.display = statusMatch && queryMatch ? "" : "none";
    });
  }

  function applyChip(type, value) {
    if (type === "search" && document.getElementById("search-input")) {
      document.getElementById("search-input").value = value;
    }
    if (type === "sort" && document.getElementById("sort-select")) {
      document.getElementById("sort-select").value = value;
    }
    if (type === "price" && document.getElementById("price-filter")) {
      document.getElementById("price-filter").value = value;
    }
    if (typeof window.filterProducts === "function") window.filterProducts();
    const productsSection = document.getElementById("products");
    if (productsSection) productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function runAction(action) {
    if (action === "search" && document.getElementById("search-input")) {
      document.getElementById("search-input").focus();
      document.getElementById("search-input").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (action === "cart" && typeof window.toggleCart === "function") return window.toggleCart();
    if (action === "account" && typeof window.toggleAccount === "function") return window.toggleAccount();
    if (action === "featured" && document.getElementById("featured-products")) return document.getElementById("featured-products").scrollIntoView({ behavior: "smooth", block: "start" });
    if (action === "products" && document.getElementById("products")) return document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
    if (action === "dark" && typeof window.toggleDarkMode === "function") return window.toggleDarkMode();
    if (action === "whatsapp") return window.open("https://api.whatsapp.com/send?phone=96876787356", "_blank");
  }

  function toggleCommandPalette() {
    const root = document.getElementById("panorama-command");
    if (!root) return;
    root.classList.toggle("open");
    if (root.classList.contains("open")) {
      const input = document.getElementById("panorama-command-input");
      if (input) {
        input.value = "";
        renderCommandPalette();
        setTimeout(function () { input.focus(); }, 30);
      }
    }
  }

  function closeCommandPalette() {
    const root = document.getElementById("panorama-command");
    if (root) root.classList.remove("open");
  }

  function showProductLoadingState() {
    const container = document.getElementById("products");
    if (!container) return;
    if (!products().length) {
      container.innerHTML = Array.from({ length: 6 }).map(function () {
        return '<div class="panorama-skeleton-card"><div class="panorama-skeleton-card__media"></div><div class="panorama-skeleton-card__line panorama-skeleton-card__line--lg"></div><div class="panorama-skeleton-card__line"></div><div class="panorama-skeleton-card__line panorama-skeleton-card__line--sm"></div></div>';
      }).join("");
    }
    container.classList.add("panorama-loading");
  }

  function hideProductLoadingState() {
    const container = document.getElementById("products");
    if (container) container.classList.remove("panorama-loading");
  }
})();
