(function () {
  const PREF_KEY = "tayya_luxury_prefs_v1";
  const REVIEW_KEY = "tayya_reviews_v1";
  const FREE_SHIPPING_THRESHOLD = 30;
  const WA_PHONE = "96876787356";
  const CURRENCY = {
    OMR: { symbol: "OMR", rate: 1 },
    USD: { symbol: "USD", rate: 2.6008 },
    AED: { symbol: "AED", rate: 9.553 },
    SAR: { symbol: "SAR", rate: 9.754 },
    EUR: { symbol: "EUR", rate: 2.39 }
  };
  const TEXT = {
    ar: {
      studioTitle: "استديو التسوق الفاخر",
      studioBody: "اختصارات ذكية، اقتراحات أسرع، ودليل شراء يختصر الطريق للعميل.",
      searchLead: "اقتراحات مباشرة حسب البحث وتفاعل المنتجات",
      finderTitle: "مستشار الاختيار",
      finderAction: "اقترح لي",
      reviewTitle: "مراجعات تبني الثقة",
      faqTitle: "خدمة أوضح",
      faqBody: "أسئلة سريعة، وعود واضحة، ومسارات مباشرة للحساب والسلة والدعم.",
      conciergeTitle: "المساعد الفاخر",
      adminTitle: "رؤية نمو أعمق",
      open: "عرض",
      save: "حفظ",
      home: "الرئيسية",
      search: "بحث",
      categories: "الفئات",
      cart: "السلة",
      account: "الحساب",
      top: "الأعلى تقييمًا",
      popular: "رائج",
      scarce: "كمية محدودة",
      fresh: "جديد",
      signature: "فاخر",
      exportCustomers: "تصدير العملاء CSV",
      exportSales: "تصدير ملخص المبيعات CSV",
      empty: "لا توجد نتائج مطابقة الآن.",
      finderEmpty: "سيظهر هنا أفضل 3 منتجات مناسبة حسب الميزانية والأسلوب.",
      faqButton: "افتح واتساب"
    },
    en: {
      studioTitle: "Luxury shopping studio",
      studioBody: "Smarter shortcuts, faster suggestions, and a guided layer that shortens the buying path.",
      searchLead: "Live suggestions based on search intent and product activity",
      finderTitle: "Guided finder",
      finderAction: "Find my picks",
      reviewTitle: "Trust-building reviews",
      faqTitle: "Clearer service",
      faqBody: "Quick answers, clear promises, and direct paths to account, cart, and support.",
      conciergeTitle: "Luxury concierge",
      adminTitle: "Deeper growth view",
      open: "View",
      save: "Save",
      home: "Home",
      search: "Search",
      categories: "Categories",
      cart: "Cart",
      account: "Account",
      top: "Top rated",
      popular: "Popular",
      scarce: "Low stock",
      fresh: "New",
      signature: "Signature",
      exportCustomers: "Export customers CSV",
      exportSales: "Export sales summary CSV",
      empty: "No direct matches right now.",
      finderEmpty: "Your best three product matches will appear here.",
      faqButton: "Open WhatsApp"
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  function init() {
    waitForStore(bootstrap);
  }

  function waitForStore(callback) {
    if (window.tayyaStore && window.tayyaStore.state) return callback();
    setTimeout(function () { waitForStore(callback); }, 120);
  }

  function bootstrap() {
    injectDiscovery();
    injectReviewSpotlight();
    injectFaq();
    injectConcierge();
    injectMobileDock();
    exposeExports();
    wrap("filterProducts", renderAll);
    wrap("fetchProducts", renderAll);
    wrap("loadOrders", renderAdminGrowth);
    wrap("updateCartUI", syncDock);
    wrap("openQuickView", enhanceQuickView);
    bindEvents();
    renderAll();
  }

  function exposeExports() {
    window.exportCustomersCsv = exportCustomersCsv;
    window.exportSalesBreakdownCsv = exportSalesBreakdownCsv;
  }

  function wrap(name, after) {
    const original = window[name];
    if (typeof original !== "function" || original.__growthWrapped) return;
    const wrapped = function () {
      const result = original.apply(this, arguments);
      if (result && typeof result.then === "function") return result.finally(function () { queueMicrotask(after); });
      queueMicrotask(after);
      return result;
    };
    wrapped.__growthWrapped = true;
    window[name] = wrapped;
  }

  function bindEvents() {
    if (document.body.__growthBound) return;
    document.body.__growthBound = true;
    document.addEventListener("input", function (event) {
      if (event.target.id === "search-input") renderDiscovery();
    });
    document.addEventListener("change", function (event) {
      if (/^growth-(budget|mood|stock)$/.test(event.target.id) || event.target.id === "luxury-currency-switch" || event.target.id === "luxury-market-switch") renderAll();
    });
    document.addEventListener("click", handleClick);
  }

  function handleClick(event) {
    const preset = event.target.closest("[data-growth-preset]");
    if (preset) return applyPreset(preset.getAttribute("data-growth-preset"));
    const open = event.target.closest("[data-growth-open]");
    if (open) return typeof window.openQuickView === "function" && window.openQuickView(open.getAttribute("data-growth-open"));
    const save = event.target.closest("[data-growth-save]");
    if (save) return typeof window.toggleFavoriteProduct === "function" && window.toggleFavoriteProduct(save.getAttribute("data-growth-save"));
    const faq = event.target.closest("[data-growth-faq]");
    if (faq) return faq.closest(".growth-faq-item").classList.toggle("open");
    const concierge = event.target.closest("[data-concierge-action]");
    if (concierge) return runConciergeAction(concierge.getAttribute("data-concierge-action"));
    const dock = event.target.closest("[data-dock-action]");
    if (dock) return runDockAction(dock.getAttribute("data-dock-action"));
    const toggle = event.target.closest("#growth-concierge-toggle");
    if (toggle) return document.body.classList.toggle("growth-concierge-open");
    const finder = event.target.closest("#growth-finder-btn");
    if (finder) return renderFinder(true);
  }

  function renderAll() {
    renderDiscovery();
    renderFinder(false);
    renderReviewSpotlight();
    renderFaq();
    renderConcierge();
    decorateProducts();
    syncDock();
    renderAdminGrowth();
  }

  function locale() {
    const prefs = json(PREF_KEY, { locale: "ar" });
    return prefs.locale === "en" ? "en" : "ar";
  }

  function copy() { return TEXT[locale()]; }
  function state() { return window.tayyaStore.state || {}; }
  function products() { return Array.isArray(state().products) ? state().products : []; }
  function json(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; } }
  function reviews(id) { const map = json(REVIEW_KEY, {}); return Array.isArray(map[id]) ? map[id] : []; }
  function rating(id) { return typeof window.tayyaStore.getAverageRating === "function" ? Number(window.tayyaStore.getAverageRating(id) || 0) : 0; }
  function stock(product) { return Object.values(product && product.stockSizes ? product.stockSizes : {}).reduce(function (sum, value) { return sum + Number(value || 0); }, 0); }
  function esc(value) { return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function money(value) { const prefs = json(PREF_KEY, { currency: "OMR" }); const profile = CURRENCY[prefs.currency] || CURRENCY.OMR; const amount = Number(value || 0) * Number(profile.rate || 1); return locale() === "en" ? profile.symbol + " " + amount.toFixed(1) : amount.toFixed(1) + " " + profile.symbol; }
  function fresh(product) { const parsed = new Date(product && product.createdAt ? product.createdAt : ""); return !Number.isNaN(parsed.getTime()) && (Date.now() - parsed.getTime()) <= 14 * 24 * 60 * 60 * 1000; }
  function text(id, value) { const node = document.getElementById(id); if (node) node.textContent = value; }

  function haystack(product) {
    return [
      product.name,
      product.desc,
      product.category,
      product.brand,
      product.color,
      product.material,
      product.collection
    ].concat(Array.isArray(product.tags) ? product.tags : []).filter(Boolean).join(" ").toLowerCase();
  }

  function productScore(product, query) {
    const matched = query && haystack(product).includes(query) ? 14 : 0;
    return rating(product.id) * 18 + reviews(product.id).length * 6 + (stock(product) > 0 ? 8 : 0) + (fresh(product) ? 8 : 0) + matched;
  }

  function injectDiscovery() {
    if (document.getElementById("growth-discovery")) return;
    const anchor = document.querySelector(".tools-note");
    if (!anchor) return;
    const section = document.createElement("section");
    section.id = "growth-discovery";
    section.className = "growth-shell";
    section.innerHTML = [
      '<div class="growth-head"><div><h2 id="growth-title"></h2><p id="growth-body"></p></div></div>',
      '<div class="growth-grid growth-grid--two">',
      '  <article class="growth-card">',
      '    <div class="growth-card__top"><strong id="growth-search-lead"></strong></div>',
      '    <div class="growth-chip-row" id="growth-shortcuts"></div>',
      '    <div class="growth-suggestion-grid" id="growth-suggestions"></div>',
      "  </article>",
      '  <article class="growth-card">',
      '    <div class="growth-card__top"><strong id="growth-finder-title"></strong><button class="submit-btn growth-inline-btn" type="button" id="growth-finder-btn"></button></div>',
      '    <div class="growth-form-grid">',
      '      <select id="growth-budget" class="sort-select"><option value="all">All</option><option value="under-30">Up to 30</option><option value="30-60">30 - 60</option><option value="60-plus">60+</option></select>',
      '      <select id="growth-mood" class="sort-select"><option value="gift">Gift</option><option value="signature">Signature</option><option value="daily">Daily</option><option value="collector">Collection</option></select>',
      '      <select id="growth-stock" class="sort-select"><option value="ready">In stock</option><option value="any">Any stock</option><option value="scarce">Low stock</option></select>',
      "    </div>",
      '    <div class="growth-suggestion-grid" id="growth-finder-results"></div>',
      "  </article>",
      "</div>",
      '<div class="growth-curation-grid" id="growth-curation"></div>'
    ].join("");
    anchor.insertAdjacentElement("afterend", section);
  }

  function renderDiscovery() {
    const root = document.getElementById("growth-discovery");
    if (!root) return;
    const ui = copy();
    const query = String(document.getElementById("search-input") ? document.getElementById("search-input").value : "").trim().toLowerCase();
    const matched = (query ? products().filter(function (product) { return haystack(product).includes(query); }) : products()).slice().sort(function (a, b) { return productScore(b, query) - productScore(a, query); }).slice(0, 6);
    text("growth-title", ui.studioTitle);
    text("growth-body", ui.studioBody);
    text("growth-search-lead", ui.searchLead);
    text("growth-finder-title", ui.finderTitle);
    text("growth-finder-btn", ui.finderAction);
    const budgetSelect = document.getElementById("growth-budget");
    const moodSelect = document.getElementById("growth-mood");
    const stockSelect = document.getElementById("growth-stock");
    if (budgetSelect) { const value = budgetSelect.value || "all"; budgetSelect.innerHTML = locale() === "en" ? '<option value="all">All prices</option><option value="under-30">Up to 30</option><option value="30-60">30 - 60</option><option value="60-plus">60+</option>' : '<option value="all">كل الأسعار</option><option value="under-30">حتى 30</option><option value="30-60">30 - 60</option><option value="60-plus">60+</option>'; budgetSelect.value = value; }
    if (moodSelect) { const value = moodSelect.value || "gift"; moodSelect.innerHTML = locale() === "en" ? '<option value="gift">Gift</option><option value="signature">Signature</option><option value="daily">Daily</option><option value="collector">Collection</option>' : '<option value="gift">هدية</option><option value="signature">فاخر</option><option value="daily">يومي</option><option value="collector">مجموعة</option>'; moodSelect.value = value; }
    if (stockSelect) { const value = stockSelect.value || "ready"; stockSelect.innerHTML = locale() === "en" ? '<option value="ready">In stock</option><option value="any">Any stock</option><option value="scarce">Low stock</option>' : '<option value="ready">متوفر الآن</option><option value="any">أي حالة</option><option value="scarce">كمية محدودة</option>'; stockSelect.value = value; }

    const shortcuts = [
      { key: "gift", label: locale() === "en" ? "Gift-ready" : "هدايا سريعة" },
      { key: "top", label: ui.top },
      { key: "ready", label: locale() === "en" ? "Ready now" : "جاهز للشحن" },
      { key: "signature", label: ui.signature },
      { key: "reset", label: locale() === "en" ? "Reset" : "إعادة الضبط" }
    ];
    const cards = [
      { key: "gift", icon: "fa-gift", title: locale() === "en" ? "Gift picks" : "هدايا جاهزة", count: products().filter(function (product) { return Number(product.price || 0) <= FREE_SHIPPING_THRESHOLD && stock(product) > 0; }).length },
      { key: "signature", icon: "fa-crown", title: locale() === "en" ? "Signature edit" : "قطع فاخرة", count: products().filter(function (product) { return Number(product.price || 0) >= 60; }).length },
      { key: "top", icon: "fa-star", title: locale() === "en" ? "Top rated" : "الأعلى تقييمًا", count: products().filter(function (product) { return rating(product.id) >= 4.5; }).length },
      { key: "ready", icon: "fa-bolt", title: locale() === "en" ? "Ready to ship" : "جاهزة للإرسال", count: products().filter(function (product) { return stock(product) > 0; }).length }
    ];

    const shortcutRoot = document.getElementById("growth-shortcuts");
    if (shortcutRoot) shortcutRoot.innerHTML = shortcuts.map(function (item) { return '<button type="button" class="growth-chip" data-growth-preset="' + esc(item.key) + '">' + esc(item.label) + "</button>"; }).join("");

    const suggestionRoot = document.getElementById("growth-suggestions");
    if (suggestionRoot) suggestionRoot.innerHTML = matched.length ? matched.map(function (product) { return miniCard(product, query ? (locale() === "en" ? "Matched search" : "مطابق للبحث") : ui.top); }).join("") : '<div class="growth-empty">' + esc(ui.empty) + "</div>";

    const curationRoot = document.getElementById("growth-curation");
    if (curationRoot) curationRoot.innerHTML = cards.map(function (card) {
      return [
        '<article class="growth-card growth-card--curation">',
        '  <div class="growth-icon"><i class="fas ' + esc(card.icon) + '"></i></div>',
        '  <strong>' + esc(card.title) + "</strong>",
        '  <div class="growth-metric">' + esc(String(card.count)) + "</div>",
        '  <button type="button" class="ghost-btn" data-growth-preset="' + esc(card.key) + '">' + esc(ui.open) + "</button>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderFinder(force) {
    const root = document.getElementById("growth-finder-results");
    if (!root) return;
    const ui = copy();
    const budget = document.getElementById("growth-budget") ? document.getElementById("growth-budget").value : "all";
    const mood = document.getElementById("growth-mood") ? document.getElementById("growth-mood").value : "gift";
    const stockMode = document.getElementById("growth-stock") ? document.getElementById("growth-stock").value : "ready";
    const list = products().filter(function (product) {
      const price = Number(product.price || 0);
      const available = stock(product);
      if (budget === "under-30" && price > 30) return false;
      if (budget === "30-60" && (price < 30 || price > 60)) return false;
      if (budget === "60-plus" && price < 60) return false;
      if (stockMode === "ready" && available <= 0) return false;
      if (stockMode === "scarce" && !(available > 0 && available <= 2)) return false;
      return true;
    }).map(function (product) {
      let score = rating(product.id) * 18 + reviews(product.id).length * 5 + (stock(product) > 0 ? 4 : 0);
      if (mood === "gift" && Number(product.price || 0) <= 45) score += 12;
      if (mood === "signature" && Number(product.price || 0) >= 60) score += 14;
      if (mood === "daily" && Number(product.price || 0) <= 35) score += 10;
      if (mood === "collector" && product.collection) score += 12;
      return { product: product, score: score };
    }).sort(function (a, b) { return b.score - a.score; }).slice(0, 3).map(function (entry) { return entry.product; });
    if (!force && !list.length) return root.innerHTML = '<div class="growth-empty growth-empty--soft">' + esc(ui.finderEmpty) + "</div>";
    root.innerHTML = list.length ? list.map(function (product) { return miniCard(product, locale() === "en" ? "Smart fit" : "ترشيح ذكي"); }).join("") : '<div class="growth-empty">' + esc(ui.empty) + "</div>";
  }

  function miniCard(product, label) {
    return [
      '<article class="growth-product-card">',
      '  <img src="' + esc(product.imgUrl || "") + '" alt="' + esc(product.name || "") + '" loading="lazy" decoding="async">',
      '  <div class="growth-product-card__body">',
      '    <span class="growth-eyebrow">' + esc(label) + "</span>",
      '    <strong>' + esc(product.name || "") + "</strong>",
      '    <div class="growth-product-card__meta"><span>' + esc(money(product.price || 0)) + '</span><span>' + esc((rating(product.id) || 0).toFixed(1)) + "/5</span></div>",
      '    <div class="growth-product-card__actions"><button type="button" class="ghost-btn" data-growth-open="' + esc(product.id) + '">' + esc(copy().open) + '</button><button type="button" class="ghost-btn" data-growth-save="' + esc(product.id) + '">' + esc(copy().save) + "</button></div>",
      "  </div>",
      "</article>"
    ].join("");
  }

  function injectReviewSpotlight() {
    if (document.getElementById("growth-reviews")) return;
    const anchor = document.getElementById("products");
    if (!anchor) return;
    const section = document.createElement("section");
    section.id = "growth-reviews";
    section.className = "growth-shell";
    section.innerHTML = '<div class="growth-head"><div><h2 id="growth-review-title"></h2></div></div><div class="growth-grid growth-grid--two"><div id="growth-review-products" class="growth-suggestion-grid"></div><div id="growth-review-quotes" class="growth-quote-list"></div></div>';
    anchor.insertAdjacentElement("afterend", section);
  }

  function renderReviewSpotlight() {
    const productRoot = document.getElementById("growth-review-products");
    const quoteRoot = document.getElementById("growth-review-quotes");
    if (!productRoot || !quoteRoot) return;
    text("growth-review-title", copy().reviewTitle);
    const topProducts = products().filter(function (product) { return reviews(product.id).length; }).sort(function (a, b) { return (rating(b.id) * 100 + reviews(b.id).length * 8) - (rating(a.id) * 100 + reviews(a.id).length * 8); }).slice(0, 3);
    const flatReviews = [];
    products().forEach(function (product) {
      reviews(product.id).forEach(function (review) {
        flatReviews.push({ product: product, review: review, power: Number(review.helpful || 0) + Number(review.rating || 0) * 2 });
      });
    });
    flatReviews.sort(function (a, b) { return b.power - a.power; });
    productRoot.innerHTML = topProducts.length ? topProducts.map(function (product) { return miniCard(product, copy().top); }).join("") : '<div class="growth-empty">' + esc(copy().empty) + "</div>";
    quoteRoot.innerHTML = flatReviews.slice(0, 4).map(function (item) {
      return '<article class="growth-quote-card"><span class="growth-eyebrow">' + esc(item.product.name || "") + '</span><p>"' + esc(item.review.comment || "") + '"</p><div class="growth-quote-meta"><strong>' + esc(item.review.name || "Guest") + '</strong><span>' + esc(String(Number(item.review.helpful || 0))) + "</span></div></article>";
    }).join("") || '<div class="growth-empty growth-empty--soft">' + esc(copy().empty) + "</div>";
  }

  function injectFaq() {
    if (document.getElementById("growth-faq")) return;
    const anchor = document.querySelector(".newsletter-card");
    if (!anchor) return;
    const section = document.createElement("section");
    section.id = "growth-faq";
    section.className = "growth-shell";
    section.innerHTML = '<div class="growth-head"><div><h2 id="growth-faq-title"></h2><p id="growth-faq-body"></p></div></div><div class="growth-grid growth-grid--two"><div id="growth-faq-metrics" class="growth-metric-grid"></div><div id="growth-faq-list" class="growth-faq-list"></div></div><div class="growth-cta-row"><button type="button" class="ghost-btn" data-concierge-action="agent" id="growth-faq-button"></button></div>';
    anchor.insertAdjacentElement("afterend", section);
  }

  function renderFaq() {
    const metricsRoot = document.getElementById("growth-faq-metrics");
    const listRoot = document.getElementById("growth-faq-list");
    if (!metricsRoot || !listRoot) return;
    const metrics = locale() === "en"
      ? [
          ["fa-truck-fast", "Free shipping", "Above 30 OMR with flexible delivery routes."],
          ["fa-shield-halved", "Trusted payments", "COD, PayPal, Stripe, and bank transfer."],
          ["fa-gift", "Gift-ready checkout", "Gift messages and custom notes live inside the cart."],
          ["fa-comments", "Fast support", "WhatsApp plus an on-page concierge layer."]
        ]
      : [
          ["fa-truck-fast", "شحن مجاني", "فوق 30 ر.ع مع خيارات توصيل مرنة."],
          ["fa-shield-halved", "دفع موثوق", "دفع عند الاستلام وPayPal وStripe وتحويل."],
          ["fa-gift", "طلب قابل للإهداء", "رسائل هدية وملاحظات مخصصة داخل السلة."],
          ["fa-comments", "دعم سريع", "واتساب مباشر مع مساعد داخل الصفحة."]
        ];
    const faq = locale() === "en"
      ? [
          ["Which payment methods are available?", "The storefront supports cash on delivery, PayPal, Stripe, and bank transfer based on current admin settings."],
          ["How does free shipping work?", "Delivery fees drop to zero automatically when the post-discount cart total reaches 30 OMR or more."],
          ["Can customers add a gift note?", "Yes. The cart includes a dedicated gift message field and a general order notes field."],
          ["How do customers track orders?", "The account hub keeps recent orders, invoice access, and the order timeline close to the customer."]
        ]
      : [
          ["ما هي طرق الدفع المتاحة؟", "المتجر يدعم الدفع عند الاستلام وPayPal وStripe والتحويل البنكي بحسب إعدادات الإدارة."],
          ["كيف يعمل الشحن المجاني؟", "تُلغى رسوم التوصيل تلقائيًا عندما يصل صافي السلة بعد الخصومات إلى 30 ر.ع أو أكثر."],
          ["هل يمكن إضافة رسالة هدية؟", "نعم، يوجد حقل خاص برسالة الهدية وحقل آخر لملاحظات الطلب داخل السلة."],
          ["كيف يتابع العميل طلبه؟", "يمكنه مراجعة الطلبات والفاتورة والحالة من مركز الحساب بسهولة."]
        ];
    text("growth-faq-title", copy().faqTitle);
    text("growth-faq-body", copy().faqBody);
    text("growth-faq-button", copy().faqButton);
    metricsRoot.innerHTML = metrics.map(function (item) { return '<article class="growth-metric-card"><div class="growth-icon"><i class="fas ' + esc(item[0]) + '"></i></div><strong>' + esc(item[1]) + '</strong><p>' + esc(item[2]) + "</p></article>"; }).join("");
    listRoot.innerHTML = faq.map(function (item) { return '<article class="growth-faq-item"><button type="button" class="growth-faq-toggle" data-growth-faq><span>' + esc(item[0]) + '</span><i class="fas fa-plus"></i></button><div class="growth-faq-answer">' + esc(item[1]) + "</div></article>"; }).join("");
  }

  function injectConcierge() {
    if (document.getElementById("growth-concierge")) return;
    const box = document.createElement("div");
    box.id = "growth-concierge";
    box.innerHTML = '<button type="button" id="growth-concierge-toggle"><i class="fas fa-headset"></i></button><div class="growth-concierge-panel"><strong id="growth-concierge-title"></strong><p id="growth-concierge-response"></p><div class="growth-concierge-actions" id="growth-concierge-actions"></div></div>';
    document.body.appendChild(box);
  }

  function renderConcierge() {
    const actionsRoot = document.getElementById("growth-concierge-actions");
    if (!actionsRoot) return;
    const items = locale() === "en"
      ? [["delivery", "Shipping info"], ["payments", "Payment options"], ["gifts", "Gift help"], ["account", "My account"], ["cart", "My cart"], ["agent", "WhatsApp"]]
      : [["delivery", "تفاصيل الشحن"], ["payments", "خيارات الدفع"], ["gifts", "اقتراحات هدايا"], ["account", "حسابي"], ["cart", "سلتي"], ["agent", "واتساب مباشر"]];
    text("growth-concierge-title", copy().conciergeTitle);
    text("growth-concierge-response", locale() === "en" ? "Choose any path and the storefront will open the fastest route." : "اختر ما تريد وسأفتح لك المسار الأسرع داخل المتجر.");
    actionsRoot.innerHTML = items.map(function (item) { return '<button type="button" class="ghost-btn" data-concierge-action="' + esc(item[0]) + '">' + esc(item[1]) + "</button>"; }).join("");
  }

  function runConciergeAction(action) {
    const response = {
      delivery: locale() === "en" ? "Free shipping starts above 30 OMR, with flexible delivery options by market." : "الشحن المجاني يبدأ فوق 30 ر.ع مع خيارات توصيل مرنة حسب السوق.",
      payments: locale() === "en" ? "Customers can use COD, PayPal, Stripe / Apple Pay, and bank transfer when configured." : "يمكن للعميل استخدام الدفع عند الاستلام وPayPal وStripe والتحويل البنكي عند التفعيل.",
      gifts: locale() === "en" ? "Use the Gift-ready shortcut, then add a gift note inside the cart before checkout." : "استخدم اختصار الهدايا السريعة ثم أضف رسالة الهدية داخل السلة.",
      account: locale() === "en" ? "Opening the account hub now." : "سيتم فتح مركز الحساب الآن.",
      cart: locale() === "en" ? "Opening the cart now." : "سيتم فتح السلة الآن.",
      agent: locale() === "en" ? "Opening WhatsApp now." : "سيتم فتح واتساب الآن."
    };
    text("growth-concierge-response", response[action] || "");
    if (action === "account" && typeof window.toggleAccount === "function") window.toggleAccount();
    if (action === "cart" && typeof window.toggleCart === "function") window.toggleCart();
    if (action === "gifts") applyPreset("gift");
    if (action === "agent") window.open("https://api.whatsapp.com/send?phone=" + WA_PHONE, "_blank");
  }

  function injectMobileDock() {
    if (document.getElementById("growth-mobile-dock")) return;
    const dock = document.createElement("nav");
    dock.id = "growth-mobile-dock";
    dock.innerHTML = '<button type="button" data-dock-action="home"><i class="fas fa-house"></i><span id="growth-dock-home"></span></button><button type="button" data-dock-action="search"><i class="fas fa-magnifying-glass"></i><span id="growth-dock-search"></span></button><button type="button" data-dock-action="categories"><i class="fas fa-layer-group"></i><span id="growth-dock-categories"></span></button><button type="button" data-dock-action="cart"><i class="fas fa-bag-shopping"></i><span id="growth-dock-cart"></span><b id="growth-dock-count">0</b></button><button type="button" data-dock-action="account"><i class="fas fa-user"></i><span id="growth-dock-account"></span></button>';
    document.body.appendChild(dock);
  }

  function syncDock() {
    text("growth-dock-home", copy().home);
    text("growth-dock-search", copy().search);
    text("growth-dock-categories", copy().categories);
    text("growth-dock-cart", copy().cart);
    text("growth-dock-account", copy().account);
    text("growth-dock-count", document.getElementById("cart-count") ? document.getElementById("cart-count").textContent : "0");
  }

  function runDockAction(action) {
    if (action === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    if (action === "search" && document.getElementById("search-input")) { document.getElementById("search-input").focus(); document.getElementById("search-input").scrollIntoView({ behavior: "smooth", block: "center" }); }
    if (action === "categories" && document.querySelector(".categories-filter")) document.querySelector(".categories-filter").scrollIntoView({ behavior: "smooth", block: "center" });
    if (action === "cart" && typeof window.toggleCart === "function") window.toggleCart();
    if (action === "account" && typeof window.toggleAccount === "function") window.toggleAccount();
  }

  function applyPreset(preset) {
    const sort = document.getElementById("sort-select");
    const price = document.getElementById("price-filter");
    const availability = document.getElementById("availability-filter");
    const search = document.getElementById("search-input");
    if (search) search.value = "";
    if (sort) sort.value = "default";
    if (price) price.value = "all";
    if (availability) availability.value = "all";
    if (preset === "gift" && price) { price.value = "25-50"; if (sort) sort.value = "top-rated"; }
    if (preset === "top" && sort) sort.value = "top-rated";
    if (preset === "ready" && availability) availability.value = "in-stock";
    if (preset === "signature" && price) { price.value = "50-9999"; if (sort) sort.value = "high-low"; }
    if (typeof window.filterProducts === "function") window.filterProducts();
    if (document.getElementById("products")) document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function decorateProducts() {
    const badgeText = copy();
    const map = {};
    products().forEach(function (product) { map[product.id] = product; });
    document.querySelectorAll("#products .product-card").forEach(function (card) {
      const product = map[card.getAttribute("data-product-id")];
      if (!product) return;
      const img = card.querySelector(".img-container");
      if (!img) return;
      const existing = img.querySelector(".growth-badges");
      if (existing) existing.remove();
      const list = [];
      if (rating(product.id) >= 4.5 && reviews(product.id).length) list.push(badgeText.top);
      if (reviews(product.id).length >= 3) list.push(badgeText.popular);
      if (stock(product) > 0 && stock(product) <= 2) list.push(badgeText.scarce);
      if (fresh(product)) list.push(badgeText.fresh);
      if (Number(product.price || 0) >= 60) list.push(badgeText.signature);
      if (!list.length) return;
      const badges = document.createElement("div");
      badges.className = "growth-badges";
      badges.innerHTML = list.slice(0, 3).map(function (item) { return '<span>' + esc(item) + "</span>"; }).join("");
      img.appendChild(badges);
    });
  }

  function enhanceQuickView() {
    const quickView = document.getElementById("quickViewContent");
    if (!quickView || quickView.querySelector(".growth-facts")) return;
    const facts = locale() === "en"
      ? ["Free shipping above 30 OMR", "Gift notes supported", "COD, PayPal, Stripe"]
      : ["شحن مجاني فوق 30 ر.ع", "رسائل هدية مدعومة", "دفع عند الاستلام وPayPal وStripe"];
    const block = document.createElement("div");
    block.className = "growth-facts";
    block.innerHTML = facts.map(function (item) { return '<span>' + esc(item) + "</span>"; }).join("");
    const reviewsBox = quickView.querySelector(".reviews-box");
    if (reviewsBox) reviewsBox.insertAdjacentElement("beforebegin", block);
    else quickView.appendChild(block);
  }

  function ensureAdminButtons() {
    const toolbar = document.querySelector("#adminOverlay .admin-section-head div");
    if (!toolbar) return;
    const existingCustomer = toolbar.querySelector("[data-growth-export='customers']");
    const existingSales = toolbar.querySelector("[data-growth-export='sales']");
    if (existingCustomer && existingSales) {
      existingCustomer.textContent = copy().exportCustomers;
      existingSales.textContent = copy().exportSales;
      return;
    }
    const customerButton = document.createElement("button");
    customerButton.type = "button";
    customerButton.className = "ghost-btn";
    customerButton.setAttribute("data-growth-export", "customers");
    customerButton.textContent = copy().exportCustomers;
    customerButton.addEventListener("click", exportCustomersCsv);
    const salesButton = document.createElement("button");
    salesButton.type = "button";
    salesButton.className = "ghost-btn";
    salesButton.setAttribute("data-growth-export", "sales");
    salesButton.textContent = copy().exportSales;
    salesButton.addEventListener("click", exportSalesBreakdownCsv);
    toolbar.appendChild(customerButton);
    toolbar.appendChild(salesButton);
  }

  function renderAdminGrowth() {
    const area = document.getElementById("admin-operations-area");
    if (!area) return;
    ensureAdminButtons();
    let block = document.getElementById("growth-admin");
    if (!block) {
      block = document.createElement("div");
      block.id = "growth-admin";
      block.className = "growth-admin";
      area.insertAdjacentElement("afterend", block);
    }
    const orders = Array.isArray(state().ordersCache) ? state().ordersCache : [];
    if (!orders.length) return block.innerHTML = '<div class="growth-card"><h3>' + esc(copy().adminTitle) + '</h3><p>' + esc(locale() === "en" ? "Load orders to unlock deeper customer and sales insights." : "حدّث الطلبات أولًا لإظهار إحصائيات أعمق للعملاء والمبيعات." ) + "</p></div>";
    const customers = {};
    const markets = {};
    const brands = {};
    let revenue = 0;
    let items = 0;
    let digital = 0;
    orders.forEach(function (order) {
      const total = Number(order.total || 0);
      const key = String(order.custEmail || order.custPhone || order.custName || order.id || "guest").toLowerCase();
      if (!customers[key]) customers[key] = { name: order.custName || order.custEmail || order.custPhone || "Guest", orders: 0, revenue: 0 };
      customers[key].orders += 1;
      customers[key].revenue += total;
      revenue += total;
      if (String(order.paymentMethod || "").toLowerCase() !== "cod") digital += 1;
      (order.items || []).forEach(function (item) { items += Number(item.quantity || 0); brands[item.brand || "Unbranded"] = (brands[item.brand || "Unbranded"] || 0) + Number(item.quantity || 0); });
      const market = order.marketLabel || order.marketCode || (locale() === "en" ? "Default" : "الافتراضي");
      markets[market] = (markets[market] || 0) + total;
    });
    const customerRows = Object.values(customers).sort(function (a, b) { return b.revenue - a.revenue; }).slice(0, 5);
    const repeat = Object.values(customers).filter(function (customer) { return customer.orders > 1; }).length;
    const topMarkets = Object.entries(markets).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5);
    const topBrands = Object.entries(brands).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5);
    const inventory = products();
    const healthy = inventory.filter(function (product) { return stock(product) > 3; }).length;
    const restock = inventory.filter(function (product) { return stock(product) > 0 && stock(product) <= 3; }).length;
    const soldOut = inventory.filter(function (product) { return stock(product) <= 0; }).length;
    block.innerHTML = [
      '<div class="growth-head"><div><h2>' + esc(copy().adminTitle) + "</h2></div></div>",
      '<div class="growth-admin-metrics">',
      '  <article><span>' + esc(locale() === "en" ? "Repeat customers" : "العملاء المتكررون") + '</span><strong>' + esc((Object.keys(customers).length ? (repeat / Object.keys(customers).length) * 100 : 0).toFixed(0)) + '%</strong></article>',
      '  <article><span>' + esc(locale() === "en" ? "Digital payments" : "الدفع الرقمي") + '</span><strong>' + esc((orders.length ? (digital / orders.length) * 100 : 0).toFixed(0)) + '%</strong></article>',
      '  <article><span>' + esc(locale() === "en" ? "Items / order" : "قطع / طلب") + '</span><strong>' + esc((orders.length ? items / orders.length : 0).toFixed(1)) + "</strong></article>",
      '  <article><span>' + esc(locale() === "en" ? "Revenue / customer" : "إيراد / عميل") + '</span><strong>' + esc(money(Object.keys(customers).length ? revenue / Object.keys(customers).length : 0)) + "</strong></article>",
      "</div>",
      '<div class="growth-grid growth-grid--three">',
      '  <article class="growth-card"><h3>' + esc(locale() === "en" ? "Top customers" : "أفضل العملاء") + '</h3>' + customerRows.map(function (row) { return '<div class="growth-row"><div><strong>' + esc(row.name) + '</strong><p>' + esc(String(row.orders)) + '</p></div><b>' + esc(money(row.revenue)) + "</b></div>"; }).join("") + "</article>",
      '  <article class="growth-card"><h3>' + esc(locale() === "en" ? "Markets" : "الأسواق") + '</h3>' + barRows(topMarkets, money) + "</article>",
      '  <article class="growth-card"><h3>' + esc(locale() === "en" ? "Brands" : "العلامات") + '</h3>' + barRows(topBrands, function (value) { return String(value); }) + "</article>",
      '  <article class="growth-card"><h3>' + esc(locale() === "en" ? "Inventory health" : "صحة المخزون") + '</h3><div class="growth-row"><div><strong>' + esc(locale() === "en" ? "Healthy" : "جاهز") + '</strong></div><b>' + esc(String(healthy)) + '</b></div><div class="growth-row"><div><strong>' + esc(locale() === "en" ? "Restock" : "يحتاج إعادة") + '</strong></div><b>' + esc(String(restock)) + '</b></div><div class="growth-row"><div><strong>' + esc(locale() === "en" ? "Sold out" : "نافد") + '</strong></div><b>' + esc(String(soldOut)) + "</b></div></article>",
      "</div>"
    ].join("");
  }

  function barRows(entries, format) {
    if (!entries.length) return '<div class="growth-empty growth-empty--soft">No data yet.</div>';
    const max = Math.max.apply(null, entries.map(function (entry) { return Number(entry[1] || 0); }).concat([1]));
    return entries.map(function (entry) {
      const width = Math.max(12, (Number(entry[1] || 0) / max) * 100);
      return '<div class="growth-bar-row"><div class="growth-bar-label"><span>' + esc(entry[0]) + '</span><strong>' + esc(format(Number(entry[1] || 0))) + '</strong></div><div class="growth-bar-track"><i style="width:' + width.toFixed(1) + '%;"></i></div></div>';
    }).join("");
  }

  async function ensureOrders() {
    if (Array.isArray(state().ordersCache) && state().ordersCache.length) return state().ordersCache;
    if (typeof window.loadOrders === "function") await window.loadOrders();
    return Array.isArray(state().ordersCache) ? state().ordersCache : [];
  }

  async function exportCustomersCsv() {
    const orders = await ensureOrders();
    const rows = [["Customer", "Email", "Phone", "Orders", "Revenue", "Market"]];
    const map = {};
    orders.forEach(function (order) {
      const key = String(order.custEmail || order.custPhone || order.custName || order.id || "guest").toLowerCase();
      if (!map[key]) map[key] = { customer: order.custName || order.custEmail || order.custPhone || "Guest", email: order.custEmail || "", phone: order.custPhone || "", orders: 0, revenue: 0, market: order.marketLabel || order.marketCode || "" };
      map[key].orders += 1;
      map[key].revenue += Number(order.total || 0);
    });
    Object.values(map).sort(function (a, b) { return b.revenue - a.revenue; }).forEach(function (row) { rows.push([row.customer, row.email, row.phone, row.orders, row.revenue.toFixed(2), row.market]); });
    downloadCsv("tayya-customers-report.csv", rows);
    if (typeof window.showToast === "function") window.showToast(locale() === "en" ? "Customer report exported" : "تم تصدير تقرير العملاء", "success");
  }

  async function exportSalesBreakdownCsv() {
    const orders = await ensureOrders();
    const rows = [["Type", "Label", "Value"]];
    const markets = {};
    const brands = {};
    orders.forEach(function (order) {
      const market = order.marketLabel || order.marketCode || "Default";
      markets[market] = (markets[market] || 0) + Number(order.total || 0);
      (order.items || []).forEach(function (item) { brands[item.brand || "Unbranded"] = (brands[item.brand || "Unbranded"] || 0) + Number(item.quantity || 0); });
    });
    Object.entries(markets).forEach(function (entry) { rows.push(["Market revenue", entry[0], Number(entry[1]).toFixed(2)]); });
    Object.entries(brands).forEach(function (entry) { rows.push(["Brand quantity", entry[0], Number(entry[1]).toFixed(0)]); });
    downloadCsv("tayya-sales-breakdown.csv", rows);
    if (typeof window.showToast === "function") window.showToast(locale() === "en" ? "Sales summary exported" : "تم تصدير ملخص المبيعات", "success");
  }

  function downloadCsv(filename, rows) {
    const csv = rows.map(function (row) { return row.map(function (value) { const textValue = String(value == null ? "" : value); return /[",\n]/.test(textValue) ? '"' + textValue.replace(/"/g, '""') + '"' : textValue; }).join(","); }).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
})();
