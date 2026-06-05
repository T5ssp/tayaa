(function () {
  const PREF_KEY = "tayya_luxury_prefs_v1";
  const CUSTOMER_KEY = "tayya_customer_profile_v1";
  const STOCK_ALERTS_KEY = "tayya_stock_alerts_v1";
  const COUPON_LAB_KEY = "tayya_coupon_lab_v1";
  const FREE_SHIPPING_THRESHOLD = 30;
  const FALLBACK_COUPONS = [
    { code: "WELCOME10", percent: 10, minimum: 0, market: "ALL" },
    { code: "EID15", percent: 15, minimum: 25, market: "ALL" },
    { code: "VIP20", percent: 20, minimum: 60, market: "ALL" }
  ];
  const COPY = {
    ar: {
      title: "طبقة فاخره إضافية",
      body: "عروض ذكية، ولاء حي، نبض بيع، وباقات جاهزة ترفع قيمة التجربة التجارية بالكامل.",
      shipping: "لوحة الشحن والوعود",
      offers: "جدار العروض الحية",
      vault: "خزنة العميل",
      pulse: "نبض المتجر",
      bundles: "باقات شراء جاهزة",
      apply: "جهّز الكود",
      account: "افتح الحساب",
      cart: "افتح السلة",
      browse: "تصفح الباقة",
      freeUnlocked: "تم فتح الشحن المجاني",
      freeRemaining: "المتبقي للشحن المجاني",
      noOffers: "لا توجد عروض مخصصة الآن.",
      noOrders: "ستظهر هنا حركة الطلبات حالما تتوفر بيانات أكثر.",
      points: "نقطة",
      favorites: "محفوظات",
      alerts: "تنبيهات",
      orders: "طلبات",
      tier: "المستوى",
      next: "الخطوة التالية",
      referral: "رمز الإحالة",
      market: "السوق",
      eta: "التسليم",
      saving: "توفير محتمل",
      recent: "طلب حديث",
      starter: "Starter",
      silver: "Silver",
      gold: "Gold",
      black: "Black"
    },
    en: {
      title: "An extra luxury layer",
      body: "Live offers, loyalty momentum, sales pulse, and curated bundles that make the storefront feel more global.",
      shipping: "Shipping and promise board",
      offers: "Live offers wall",
      vault: "Customer vault",
      pulse: "Store pulse",
      bundles: "Ready-to-shop bundles",
      apply: "Stage code",
      account: "Open account",
      cart: "Open cart",
      browse: "Browse bundle",
      freeUnlocked: "Free shipping unlocked",
      freeRemaining: "Left to unlock free shipping",
      noOffers: "No targeted offers are active right now.",
      noOrders: "Recent order motion will appear here once more data is available.",
      points: "points",
      favorites: "saved",
      alerts: "alerts",
      orders: "orders",
      tier: "Tier",
      next: "Next step",
      referral: "Referral code",
      market: "Market",
      eta: "ETA",
      saving: "Potential saving",
      recent: "Recent order",
      starter: "Starter",
      silver: "Silver",
      gold: "Gold",
      black: "Black"
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
    injectOdyssey();
    wrap("filterProducts", renderOdyssey);
    wrap("fetchProducts", renderOdyssey);
    wrap("updateCartUI", renderOdyssey);
    wrap("loadOrders", renderOdyssey);
    bindEvents();
    renderOdyssey();
  }

  function wrap(name, after) {
    const original = window[name];
    if (typeof original !== "function" || original.__odysseyWrapped) return;
    const wrapped = function () {
      const result = original.apply(this, arguments);
      if (result && typeof result.then === "function") return result.finally(function () { queueMicrotask(after); });
      queueMicrotask(after);
      return result;
    };
    wrapped.__odysseyWrapped = true;
    window[name] = wrapped;
  }

  function bindEvents() {
    if (document.body.__odysseyBound) return;
    document.body.__odysseyBound = true;
    document.addEventListener("click", function (event) {
      const codeButton = event.target.closest("[data-odyssey-code]");
      if (codeButton) return stageCoupon(codeButton.getAttribute("data-odyssey-code"));
      const openButton = event.target.closest("[data-odyssey-open]");
      if (openButton) return typeof window.openQuickView === "function" && window.openQuickView(openButton.getAttribute("data-odyssey-open"));
      const navButton = event.target.closest("[data-odyssey-nav]");
      if (navButton) return navigate(navButton.getAttribute("data-odyssey-nav"));
    });
    document.addEventListener("change", function (event) {
      if (event.target.id === "luxury-market-switch" || event.target.id === "luxury-currency-switch") renderOdyssey();
    });
  }

  function injectOdyssey() {
    if (document.getElementById("odyssey-layer")) return;
    const anchor = document.getElementById("growth-faq") || document.querySelector(".newsletter-card");
    if (!anchor) return;
    const section = document.createElement("section");
    section.id = "odyssey-layer";
    section.className = "odyssey-shell";
    section.innerHTML = [
      '<div class="odyssey-head"><div><h2 id="odyssey-title"></h2><p id="odyssey-body"></p></div></div>',
      '<div class="odyssey-grid">',
      '  <article class="odyssey-card"><h3 id="odyssey-shipping-title"></h3><div id="odyssey-shipping-body"></div></article>',
      '  <article class="odyssey-card"><h3 id="odyssey-offers-title"></h3><div id="odyssey-offers-body"></div></article>',
      '  <article class="odyssey-card"><h3 id="odyssey-vault-title"></h3><div id="odyssey-vault-body"></div></article>',
      '  <article class="odyssey-card"><h3 id="odyssey-pulse-title"></h3><div id="odyssey-pulse-body"></div></article>',
      "</div>",
      '<div class="odyssey-bundle-head"><h3 id="odyssey-bundles-title"></h3></div>',
      '<div class="odyssey-bundle-grid" id="odyssey-bundles-body"></div>'
    ].join("");
    anchor.insertAdjacentElement("afterend", section);
  }

  function renderOdyssey() {
    if (!document.getElementById("odyssey-layer")) return;
    const ui = copy();
    setText("odyssey-title", ui.title);
    setText("odyssey-body", ui.body);
    setText("odyssey-shipping-title", ui.shipping);
    setText("odyssey-offers-title", ui.offers);
    setText("odyssey-vault-title", ui.vault);
    setText("odyssey-pulse-title", ui.pulse);
    setText("odyssey-bundles-title", ui.bundles);
    renderShippingBoard();
    renderOffersWall();
    renderVault();
    renderPulse();
    renderBundles();
  }

  function locale() { const prefs = json(PREF_KEY, { locale: "ar" }); return prefs.locale === "en" ? "en" : "ar"; }
  function copy() { return COPY[locale()]; }
  function prefs() { return json(PREF_KEY, { market: "OM", currency: "OMR" }); }
  function json(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; } }
  function esc(value) { return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function state() { return window.tayyaStore.state || {}; }
  function products() { return Array.isArray(state().products) ? state().products : []; }
  function stock(product) { return Object.values(product && product.stockSizes ? product.stockSizes : {}).reduce(function (sum, value) { return sum + Number(value || 0); }, 0); }
  function rating(id) { return typeof window.tayyaStore.getAverageRating === "function" ? Number(window.tayyaStore.getAverageRating(id) || 0) : 0; }
  function subtotal() { return (state().cart || []).reduce(function (sum, item) { return sum + Number(item.price || 0) * Number(item.quantity || 0); }, 0); }
  function coupons() { const saved = json(COUPON_LAB_KEY, null); return Array.isArray(saved) ? saved : FALLBACK_COUPONS; }
  function currentOrders() { return Array.isArray(state().ordersCache) ? state().ordersCache : []; }
  function setText(id, value) { const node = document.getElementById(id); if (node) node.textContent = value; }

  function renderShippingBoard() {
    const ui = copy();
    const root = document.getElementById("odyssey-shipping-body");
    if (!root) return;
    const currentSubtotal = subtotal();
    const percent = Math.max(0, Math.min(100, (currentSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - currentSubtotal);
    const estimate = document.getElementById("delivery-estimate") ? document.getElementById("delivery-estimate").textContent : "";
    const note = document.getElementById("market-delivery-note") ? document.getElementById("market-delivery-note").textContent : "";
    const market = prefs().market || "OM";
    root.innerHTML = [
      '<div class="odyssey-stat-row"><span>' + esc(ui.market) + '</span><strong>' + esc(market) + "</strong></div>",
      '<div class="odyssey-progress"><i style="width:' + percent.toFixed(1) + '%;"></i></div>',
      '<div class="odyssey-shipping-note">' + esc(currentSubtotal >= FREE_SHIPPING_THRESHOLD ? ui.freeUnlocked : ui.freeRemaining + ": " + remaining.toFixed(1)) + "</div>",
      '<div class="odyssey-mini-card">' + esc(note || "") + "</div>",
      '<div class="odyssey-stat-row"><span>' + esc(ui.eta) + '</span><strong>' + esc(estimate || "-") + "</strong></div>",
      '<div class="odyssey-action-row"><button type="button" class="ghost-btn" data-odyssey-nav="cart">' + esc(ui.cart) + "</button></div>"
    ].join("");
  }

  function renderOffersWall() {
    const ui = copy();
    const root = document.getElementById("odyssey-offers-body");
    if (!root) return;
    const market = prefs().market || "OM";
    const offers = coupons().filter(function (offer) {
      return String(offer.market || "ALL").toUpperCase() === "ALL" || String(offer.market || "").toUpperCase() === String(market).toUpperCase();
    }).sort(function (a, b) {
      return Number(b.percent || 0) - Number(a.percent || 0);
    }).slice(0, 4);
    root.innerHTML = offers.length ? offers.map(function (offer) {
      return [
        '<div class="odyssey-offer-card">',
        '  <div><strong>' + esc(String(offer.code || "").toUpperCase()) + '</strong><p>' + esc(String(offer.percent || 0)) + '% • Min ' + esc(String(Number(offer.minimum || 0).toFixed(0))) + " • " + esc(String(offer.market || "ALL").toUpperCase()) + "</p></div>",
        '  <button type="button" class="ghost-btn" data-odyssey-code="' + esc(String(offer.code || "").toUpperCase()) + '">' + esc(ui.apply) + "</button>",
        "</div>"
      ].join("");
    }).join("") : '<div class="odyssey-empty">' + esc(ui.noOffers) + "</div>";
  }

  function renderVault() {
    const ui = copy();
    const root = document.getElementById("odyssey-vault-body");
    if (!root) return;
    const profile = json(CUSTOMER_KEY, {}) || {};
    const orders = currentOrders().filter(function (order) {
      const email = String(order.custEmail || "").toLowerCase();
      const phone = String(order.custPhone || "");
      return (profile.email && email === String(profile.email || "").toLowerCase()) || (profile.phone && phone === String(profile.phone || ""));
    });
    const spent = orders.reduce(function (sum, order) { return sum + Number(order.total || 0); }, 0);
    const tier = spent >= 250 ? ui.black : spent >= 120 ? ui.gold : spent >= 60 ? ui.silver : ui.starter;
    const nextStep = spent >= 250 ? 0 : spent >= 120 ? 250 - spent : spent >= 60 ? 120 - spent : 60 - spent;
    const favorites = json("tayya_favorites_v1", []).length;
    const alerts = json(STOCK_ALERTS_KEY, []).length;
    const referral = buildReferralCode(profile);
    root.innerHTML = [
      '<div class="odyssey-vault-grid">',
      '  <div class="odyssey-mini-card"><span>' + esc(ui.tier) + '</span><strong>' + esc(tier) + "</strong></div>",
      '  <div class="odyssey-mini-card"><span>' + esc(ui.orders) + '</span><strong>' + esc(String(orders.length)) + "</strong></div>",
      '  <div class="odyssey-mini-card"><span>' + esc(ui.favorites) + '</span><strong>' + esc(String(favorites)) + "</strong></div>",
      '  <div class="odyssey-mini-card"><span>' + esc(ui.alerts) + '</span><strong>' + esc(String(alerts)) + "</strong></div>",
      "</div>",
      '<div class="odyssey-stat-row"><span>' + esc(ui.next) + '</span><strong>' + esc(nextStep > 0 ? nextStep.toFixed(1) + " OMR" : ui.freeUnlocked) + "</strong></div>",
      '<div class="odyssey-stat-row"><span>' + esc(ui.referral) + '</span><strong>' + esc(referral) + "</strong></div>",
      '<div class="odyssey-shipping-note">' + esc(Math.floor(spent)) + " " + esc(ui.points) + "</div>",
      '<div class="odyssey-action-row"><button type="button" class="ghost-btn" data-odyssey-nav="account">' + esc(ui.account) + '</button><button type="button" class="ghost-btn" data-odyssey-nav="cart">' + esc(ui.cart) + "</button></div>"
    ].join("");
  }

  function renderPulse() {
    const ui = copy();
    const root = document.getElementById("odyssey-pulse-body");
    if (!root) return;
    const orders = currentOrders().slice(0, 5);
    if (!orders.length) {
      root.innerHTML = '<div class="odyssey-empty">' + esc(ui.noOrders) + "</div>";
      return;
    }
    root.innerHTML = orders.map(function (order) {
      const name = anonymize(order.custName || order.custEmail || order.custPhone || "Guest");
      const market = order.marketLabel || order.marketCode || "-";
      return '<div class="odyssey-offer-card"><div><strong>' + esc(ui.recent) + '</strong><p>' + esc(name) + " • " + esc(market) + '</p></div><b>' + esc(Number(order.total || 0).toFixed(1)) + " OMR</b></div>";
    }).join("");
  }

  function renderBundles() {
    const ui = copy();
    const root = document.getElementById("odyssey-bundles-body");
    if (!root) return;
    const ranked = products().slice().sort(function (a, b) {
      return (rating(b.id) * 20 + stock(b)) - (rating(a.id) * 20 + stock(a));
    });
    const bundles = [ranked.slice(0, 3), ranked.slice(3, 6), ranked.slice(6, 9)].filter(function (group) { return group.length; });
    root.innerHTML = bundles.map(function (bundle, index) {
      const total = bundle.reduce(function (sum, product) { return sum + Number(product.price || 0); }, 0);
      const market = prefs().market || "OM";
      const offer = coupons().filter(function (item) {
        const codeMarket = String(item.market || "ALL").toUpperCase();
        return total >= Number(item.minimum || 0) && (codeMarket === "ALL" || codeMarket === String(market).toUpperCase());
      }).sort(function (a, b) { return Number(b.percent || 0) - Number(a.percent || 0); })[0];
      return [
        '<article class="odyssey-bundle-card">',
        '  <span class="odyssey-bundle-chip">Edit ' + esc(String(index + 1)) + "</span>",
        '  <h4>' + esc(bundle[0].category || bundle[0].collection || (locale() === "en" ? "Curated bundle" : "باقة مختارة")) + "</h4>",
        '  <p>' + bundle.map(function (product) { return esc(product.name); }).join(" • ") + "</p>",
        '  <div class="odyssey-bundle-price">' + esc(total.toFixed(1)) + " OMR</div>",
        offer ? '<div class="odyssey-bundle-saving">' + esc(ui.saving) + ": " + esc(String((total * Number(offer.percent || 0) / 100).toFixed(1))) + " OMR • " + esc(String(offer.code || "").toUpperCase()) + "</div>" : "",
        '  <div class="odyssey-action-row"><button type="button" class="ghost-btn" data-odyssey-open="' + esc(bundle[0].id) + '">' + esc(ui.browse) + '</button>' + (offer ? '<button type="button" class="ghost-btn" data-odyssey-code="' + esc(String(offer.code || "").toUpperCase()) + '">' + esc(ui.apply) + "</button>" : "") + "</div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function stageCoupon(code) {
    const input = document.getElementById("coupon-code");
    if (input) input.value = String(code || "").toUpperCase();
    if (navigator.clipboard && code) navigator.clipboard.writeText(String(code).toUpperCase()).catch(function () { return null; });
    if (typeof window.showToast === "function") window.showToast((locale() === "en" ? "Coupon staged: " : "تم تجهيز الكوبون: ") + String(code || "").toUpperCase(), "success");
    if (state().cart && state().cart.length && typeof window.applyCoupon === "function") window.applyCoupon();
  }

  function navigate(target) {
    if (target === "account" && typeof window.toggleAccount === "function") window.toggleAccount();
    if (target === "cart" && typeof window.toggleCart === "function") window.toggleCart();
  }

  function buildReferralCode(profile) {
    const seed = String(profile.email || profile.phone || "tayya").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return "TY-" + (seed.slice(0, 6) || "GUEST").padEnd(6, "X");
  }

  function anonymize(value) {
    const text = String(value || "Guest");
    if (text.length <= 2) return text + "***";
    return text.slice(0, 2) + "***";
  }
})();
