(function () {
  const PREF_KEY = "tayya_luxury_prefs_v1";
  const ANALYTICS_KEY = "tayya_local_analytics_v1";
  const prefs = loadJson(PREF_KEY, { locale: "ar", currency: "OMR", market: "OM" });
  const analytics = loadJson(ANALYTICS_KEY, { views: {}, carts: {} });
  const currencyProfiles = {
    OMR: { symbol: "ر.ع", rate: 1 },
    USD: { symbol: "$", rate: 2.6008 },
    SAR: { symbol: "SAR", rate: 9.754 },
    EUR: { symbol: "EUR", rate: 2.39 },
    AED: { symbol: "د.إ", rate: 9.553 }
  };

  const copy = {
    ar: {
      global: "واجهة فاخرة جاهزة للنمو",
      shipping: "شحن إقليمي مرن",
      premium: "تجربة مخصصة",
      secure: "ثقة ودعم مباشر",
      storyTitle: "متجر فاخر بنسخة عالمية",
      storyText: "طوّرنا الواجهة لتبدو أقوى بصريًا، أسرع في التصفح، وأكثر جاهزية للتوسع لاحقًا نحو الدفع العالمي، التعدد اللغوي، والعميل الدولي.",
      faqTitle: "أسئلة شائعة",
      adsTitle: "اكتشف أيضًا",
      botTitle: "مساعد المتجر",
      botWelcome: "اسأل عن الشحن أو المقاسات أو أفضل عرض وسأوجهك داخل المتجر مباشرة.",
      botReplies: {
        shipping: "التجربة الحالية تدعم التوصيل للمنزل ولمكتب الشحن، ويمكننا لاحقًا ربط شركات شحن فعلية وتتبع الطلب.",
        returns: "يمكن إضافة سياسة استرجاع كاملة وصفحة واضحة للشروط والخصوصية وربطها بالطلب والعميل.",
        gifts: "المتجر جاهز لإضافة تغليف هدايا ورسائل خاصة وخيارات تخصيص المنتج أثناء الطلب.",
        payment: "الدفع العالمي مثل Stripe وPayPal يحتاج حسابات ومفاتيح ربط، لكن الواجهة الآن جاهزة لتلك المرحلة."
      },
      adCards: [
        { title: "Luxury gifting", body: "أضف صناديق هدايا ورسائل مخصصة وتجربة شراء راقية." },
        { title: "Global-ready checkout", body: "جهّز الواجهة للدفع الدولي والعملات والضرائب لاحقًا." },
        { title: "Editorial product discovery", body: "اعرض المنتجات بأسلوب قصصي يرفع قيمة العلامة التجارية." }
      ],
      faqItems: [
        { q: "هل المتجر جاهز للغات متعددة؟", a: "نعم، أضفنا أساسًا عمليًا لواجهة عالمية ويمكن توسيع الترجمة لتشمل كل النصوص ومسارات الصفحات." },
        { q: "هل يمكن دعمه بعملات متعددة؟", a: "أضفنا عرض أسعار متعدد العملات على الواجهة، ويمكن لاحقًا ربط أسعار وخدمات دفع فعلية." },
        { q: "ما الخطوة التالية الأقوى؟", a: "أفضل خطوة بعد هذه النسخة هي فصل المشروع إلى ملفات منظمة ثم ربط الدفع والإيميلات ولوحة إدارة أعمق." }
      ],
      quickLinks: ["Featured", "Products", "About", "Policies"],
      newsletterButton: "اشترك الآن",
      resetPassword: "استعادة كلمة المرور",
      couponApply: "تطبيق",
      searchPlaceholder: "ابحث عن منتج أو فئة أو وصف..."
    },
    en: {
      global: "Luxury storefront, ready to scale",
      shipping: "Regional shipping ready",
      premium: "Premium customer flow",
      secure: "High-trust experience",
      storyTitle: "A luxury store with global ambition",
      storyText: "The storefront now feels more premium, more editorial, and more ready for future expansion into international checkout, multilingual content, and broader customer journeys.",
      faqTitle: "Frequently asked questions",
      adsTitle: "You may also like",
      botTitle: "Store assistant",
      botWelcome: "Ask about shipping, sizing, or the best current offer and I will guide you through the storefront.",
      botReplies: {
        shipping: "The current flow supports home delivery and shipping office pickup, and it is ready for real courier integrations later.",
        returns: "We can expand this into a full return policy and a clearer legal flow linked to orders and customer accounts.",
        gifts: "The storefront is ready to support gift wrapping, card messages, and personalized order notes.",
        payment: "Global payment rails like Stripe and PayPal still need live credentials and backend setup, but the experience is now prepared for that stage."
      },
      adCards: [
        { title: "Luxury gifting", body: "Add premium gift packaging, notes, and curated order add-ons." },
        { title: "Global-ready checkout", body: "Prepare the storefront for international payments, currencies, and tax rules." },
        { title: "Editorial product discovery", body: "Present products with richer storytelling and stronger brand positioning." }
      ],
      faqItems: [
        { q: "Is the store ready for multilingual support?", a: "Yes. The current upgrade adds a practical global layer that can be expanded into full translation coverage later." },
        { q: "Can it support multiple currencies?", a: "Yes. We added a display currency layer and can later connect it to live pricing and payment services." },
        { q: "What is the strongest next step?", a: "Refactoring the project into modular files, then connecting payments, email flows, and a deeper admin system." }
      ],
      quickLinks: ["Featured", "Products", "About", "Policies"],
      newsletterButton: "Subscribe now",
      resetPassword: "Reset password",
      couponApply: "Apply",
      searchPlaceholder: "Search by product, category, or description..."
    }
  };

  document.addEventListener("DOMContentLoaded", bootstrap);

  function bootstrap() {
    waitForStore(() => {
      injectMarketBar();
      enhanceSearch();
      injectLuxurySections();
      upgradeFunctionHooks();
      applyPreferences();
      renderLuxurySections();
      restoreBotState();
    });
  }

  function waitForStore(callback) {
    if (window.tayyaStore && window.tayyaStore.state) {
      callback();
      return;
    }
    setTimeout(() => waitForStore(callback), 120);
  }

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function injectMarketBar() {
    if (document.querySelector(".luxury-market-bar")) return;
    const bar = document.createElement("div");
    bar.className = "luxury-market-bar";
    bar.innerHTML = `
      <div class="luxury-market-bar__inner">
        <div class="luxury-market-bar__meta">
          <span class="market-chip" data-copy="global"></span>
          <span class="market-chip" data-copy="shipping"></span>
          <span class="market-chip" data-copy="premium"></span>
          <span class="market-chip" data-copy="secure"></span>
        </div>
        <div class="luxury-market-bar__controls">
          <button class="locale-pill" data-locale="ar">AR</button>
          <button class="locale-pill" data-locale="en">EN</button>
          <select class="currency-select" id="luxury-market-switch">
            <option value="OM">Oman</option>
            <option value="AE">UAE</option>
            <option value="SA">Saudi Arabia</option>
            <option value="GLOBAL">International</option>
          </select>
          <select class="currency-select" id="luxury-currency-switch">
            <option value="OMR">OMR</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
            <option value="SAR">SAR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);

    bar.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", () => {
        prefs.locale = button.dataset.locale;
        persistPrefs();
        applyPreferences();
        window.syncMarketExperience?.();
      });
    });

    const marketSwitch = bar.querySelector("#luxury-market-switch");
    marketSwitch.value = prefs.market || "OM";
    marketSwitch.addEventListener("change", (event) => {
      prefs.market = event.target.value;
      persistPrefs();
      applyPreferences();
      window.syncMarketExperience?.();
    });

    const currencySwitch = bar.querySelector("#luxury-currency-switch");
    currencySwitch.value = prefs.currency;
    currencySwitch.addEventListener("change", (event) => {
      prefs.currency = event.target.value;
      persistPrefs();
      refreshPriceDisplays();
    });
  }

  function enhanceSearch() {
    const input = document.getElementById("search-input");
    if (!input || input.parentElement.querySelector(".luxury-suggestions")) return;
    const box = document.createElement("div");
    box.className = "luxury-suggestions";
    input.parentElement.style.position = "relative";
    input.parentElement.appendChild(box);

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      const products = window.tayyaStore.state.products || [];
      if (query.length < 2) {
        box.classList.remove("open");
        box.innerHTML = "";
        return;
      }
      const results = products
        .filter((product) => [product.name, product.desc, product.category].filter(Boolean).join(" ").toLowerCase().includes(query))
        .slice(0, 6);
      box.innerHTML = results.map((product) => `
        <div class="luxury-suggestion" data-product-id="${product.id}">
          <span>${escapeHtml(product.name)}</span>
          <small>${escapeHtml(product.category || "")}</small>
        </div>
      `).join("");
      box.classList.toggle("open", results.length > 0);
      box.querySelectorAll("[data-product-id]").forEach((item) => {
        item.addEventListener("click", () => {
          window.openQuickView(item.dataset.productId);
          box.classList.remove("open");
        });
      });
    });

    document.addEventListener("click", (event) => {
      if (!input.parentElement.contains(event.target)) {
        box.classList.remove("open");
      }
    });
  }

  function injectLuxurySections() {
    if (!document.querySelector(".luxury-story")) {
      const story = document.createElement("section");
      story.className = "luxury-story";
      story.innerHTML = `
        <div class="luxury-story__grid">
          <div class="luxury-story__panel" id="luxury-story-panel"></div>
          <aside class="luxury-story__aside" id="luxury-story-aside"></aside>
        </div>
      `;
      const hero = document.querySelector(".hero");
      hero?.insertAdjacentElement("afterend", story);
    }

    if (!document.querySelector(".luxury-ads")) {
      const ads = document.createElement("section");
      ads.className = "luxury-ads";
      ads.id = "luxury-ads";
      ads.innerHTML = `<h3></h3><div class="luxury-ads__grid" id="luxury-ads-grid"></div>`;
      document.querySelector(".products-container")?.insertAdjacentElement("afterend", ads);
    }

    if (!document.querySelector(".luxury-faq")) {
      const faq = document.createElement("section");
      faq.className = "luxury-faq";
      faq.id = "luxury-faq";
      faq.innerHTML = `<h3></h3><div id="luxury-faq-list"></div>`;
      document.querySelector(".info-sections")?.insertAdjacentElement("beforebegin", faq);
    }

    if (!document.querySelector(".luxury-bot")) {
      const bot = document.createElement("aside");
      bot.className = "luxury-bot";
      bot.innerHTML = `
        <div class="luxury-bot__header">
          <strong id="luxury-bot-title"></strong>
          <button class="ghost-btn" id="luxury-bot-toggle">Hide</button>
        </div>
        <div class="luxury-bot__body" id="luxury-bot-body">
          <div class="luxury-bot__reply" id="luxury-bot-reply"></div>
          <div class="luxury-bot__chips">
            <button class="luxury-bot__chip" data-reply="shipping">Shipping</button>
            <button class="luxury-bot__chip" data-reply="returns">Returns</button>
            <button class="luxury-bot__chip" data-reply="gifts">Gifts</button>
            <button class="luxury-bot__chip" data-reply="payment">Payments</button>
          </div>
        </div>
      `;
      document.body.appendChild(bot);

      bot.querySelectorAll("[data-reply]").forEach((chip) => {
        chip.addEventListener("click", () => {
          const localeCopy = copy[prefs.locale];
          bot.querySelector("#luxury-bot-reply").textContent = localeCopy.botReplies[chip.dataset.reply];
        });
      });

      bot.querySelector("#luxury-bot-toggle").addEventListener("click", () => {
        const body = bot.querySelector("#luxury-bot-body");
        const hidden = body.style.display === "none";
        body.style.display = hidden ? "grid" : "none";
        bot.querySelector("#luxury-bot-toggle").textContent = hidden ? "Hide" : "Show";
      });
    }
  }

  function upgradeFunctionHooks() {
    ["filterProducts", "updateCartUI", "openQuickView"].forEach((name) => {
      const original = window[name];
      if (typeof original !== "function" || original.__luxWrapped) return;
      const wrapped = function (...args) {
        const result = original.apply(this, args);
        queueMicrotask(() => {
          refreshPriceDisplays();
          renderLuxurySections();
        });
        return result;
      };
      wrapped.__luxWrapped = true;
      window[name] = wrapped;
      if (window.tayyaStore && window.tayyaStore[name]) {
        window.tayyaStore[name] = wrapped;
      }
    });

    const originalAddToCart = window.addToCart;
    if (typeof originalAddToCart === "function" && !originalAddToCart.__luxWrapped) {
      const wrappedAddToCart = function (id, btn) {
        analytics.carts[id] = (analytics.carts[id] || 0) + 1;
        persistAnalytics();
        return originalAddToCart.call(this, id, btn);
      };
      wrappedAddToCart.__luxWrapped = true;
      window.addToCart = wrappedAddToCart;
    }

    const originalQuickView = window.openQuickView;
    if (typeof originalQuickView === "function" && !originalQuickView.__luxTracked) {
      const trackedQuickView = function (id) {
        analytics.views[id] = (analytics.views[id] || 0) + 1;
        persistAnalytics();
        return originalQuickView.call(this, id);
      };
      trackedQuickView.__luxTracked = true;
      window.openQuickView = trackedQuickView;
      if (window.tayyaStore && window.tayyaStore.openQuickView) {
        window.tayyaStore.openQuickView = trackedQuickView;
      }
    }
  }

  function renderLuxurySections() {
    renderStoryPanels();
    renderAds();
    renderFaq();
    refreshPriceDisplays();
    syncLocaleText();
  }

  function renderStoryPanels() {
    const localeCopy = copy[prefs.locale];
    const storyPanel = document.getElementById("luxury-story-panel");
    const storyAside = document.getElementById("luxury-story-aside");
    const products = window.tayyaStore.state.products || [];
    const topViewed = [...products]
      .sort((a, b) => (analytics.views[b.id] || 0) - (analytics.views[a.id] || 0))
      .slice(0, 3);

    if (storyPanel) {
      storyPanel.innerHTML = `
        <h3>${localeCopy.storyTitle}</h3>
        <p>${localeCopy.storyText}</p>
        <div class="luxury-stat-grid">
          <div class="luxury-stat"><strong>${products.length}</strong><span>${prefs.locale === "ar" ? "منتج قابل للتوسع" : "scalable products"}</span></div>
          <div class="luxury-stat"><strong>${Object.keys(analytics.views).length}</strong><span>${prefs.locale === "ar" ? "إشارات اهتمام محلية" : "local interest signals"}</span></div>
          <div class="luxury-stat"><strong>${Object.keys(analytics.carts).length}</strong><span>${prefs.locale === "ar" ? "منتجات مطلوبة" : "carted products"}</span></div>
        </div>
      `;
    }

    if (storyAside) {
      storyAside.innerHTML = `
        <h3>${prefs.locale === "ar" ? "أكثر ما يجذب العملاء" : "What attracts customers most"}</h3>
        ${topViewed.length ? topViewed.map((product) => `
          <div style="display:flex; justify-content:space-between; gap:12px; padding:12px 0; border-bottom:1px solid rgba(90,11,20,0.08);">
            <div>
              <strong style="color:var(--primary);">${escapeHtml(product.name)}</strong>
              <div style="font-size:13px; opacity:0.8;">${analytics.views[product.id] || 0} ${prefs.locale === "ar" ? "مشاهدة" : "views"}</div>
            </div>
            <button class="ghost-btn" onclick="window.openQuickView('${product.id}')">${prefs.locale === "ar" ? "عرض" : "View"}</button>
          </div>
        `).join("") : `<p>${prefs.locale === "ar" ? "ابدأ التفاعل مع المنتجات لتظهر هنا المنتجات الأكثر جذبًا." : "Start interacting with products to surface your most attractive items here."}</p>`}
      `;
    }
  }

  function renderAds() {
    const adsRoot = document.getElementById("luxury-ads-grid");
    const adsTitle = document.querySelector(".luxury-ads h3");
    if (!adsRoot || !adsTitle) return;
    const localeCopy = copy[prefs.locale];
    adsTitle.textContent = localeCopy.adsTitle;
    adsRoot.innerHTML = localeCopy.adCards.map((card) => `
      <article class="luxury-ad-card">
        <h4 style="color:var(--primary); margin-bottom:8px;">${card.title}</h4>
        <p>${card.body}</p>
      </article>
    `).join("");
  }

  function renderFaq() {
    const faqTitle = document.querySelector(".luxury-faq h3");
    const faqList = document.getElementById("luxury-faq-list");
    if (!faqTitle || !faqList) return;
    const localeCopy = copy[prefs.locale];
    faqTitle.textContent = localeCopy.faqTitle;
    faqList.innerHTML = localeCopy.faqItems.map((item) => `
      <details>
        <summary>${item.q}</summary>
        <p style="margin-top:10px;">${item.a}</p>
      </details>
    `).join("");
  }

  function refreshPriceDisplays() {
    const profile = currencyProfiles[prefs.currency] || currencyProfiles.OMR;
    updatePriceSelector(".price-container span", (el, value) => `${formatNumber(value * profile.rate)} ${profile.symbol}`);
    updatePriceSelector("#subtotal", (el, value) => `${formatNumber(value * profile.rate)} ${profile.symbol}`);
    updatePriceSelector("#delivery-fee-display", (el, value) => `${formatNumber(value * profile.rate)} ${profile.symbol}`);
    updatePriceSelector("#cart-items-list [style*='font-weight:900']", (el, value) => `${formatNumber(value * profile.rate)} ${profile.symbol}`);
    updatePriceSelector(".featured-content [style*='font-weight:900']", (el, value) => `${formatNumber(value * profile.rate)} ${profile.symbol}`);
    updatePriceSelector("#quickViewContent h3", (el, value) => `${formatNumber(value * profile.rate)} ${profile.symbol}`);

    const totalEl = document.getElementById("cartTotal");
    if (totalEl) {
      const total = extractNumber(totalEl.dataset.basePrice || totalEl.textContent);
      if (Number.isFinite(total)) {
        totalEl.dataset.basePrice = String(total);
        const label = prefs.locale === "ar" ? "الإجمالي" : "Total";
        totalEl.textContent = `${label}: ${formatNumber(total * profile.rate)} ${profile.symbol}`;
      }
    }

    const discountEl = document.getElementById("discount-line");
    if (discountEl) {
      const discount = extractNumber(discountEl.dataset.basePrice || discountEl.textContent);
      if (Number.isFinite(discount) && discount > 0) {
        discountEl.dataset.basePrice = String(discount);
        const label = prefs.locale === "ar" ? "الخصم" : "Discount";
        discountEl.textContent = `${label}: -${formatNumber(discount * profile.rate)} ${profile.symbol}`;
      } else {
        discountEl.textContent = prefs.locale === "ar" ? "بدون خصم" : "No discount";
      }
    }
  }

  function updatePriceSelector(selector, formatter) {
    document.querySelectorAll(selector).forEach((element) => {
      const stored = element.dataset.basePrice;
      const detected = stored ? Number(stored) : extractNumber(element.textContent);
      if (!Number.isFinite(detected)) return;
      element.dataset.basePrice = String(detected);
      element.textContent = formatter(element, detected);
    });
  }

  function extractNumber(text) {
    const match = String(text).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  }

  function formatNumber(value) {
    return Number(value || 0).toFixed(2);
  }

  function syncLocaleText() {
    const localeCopy = copy[prefs.locale];
    document.documentElement.lang = prefs.locale;
    document.documentElement.dir = prefs.locale === "ar" ? "rtl" : "ltr";

    document.querySelectorAll(".market-chip").forEach((chip, index) => {
      const keys = ["global", "shipping", "premium", "secure"];
      chip.textContent = localeCopy[keys[index]];
    });

    document.querySelectorAll(".locale-pill").forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.locale === prefs.locale);
    });

    const marketSwitch = document.getElementById("luxury-market-switch");
    if (marketSwitch) {
      marketSwitch.value = prefs.market || "OM";
      const marketLabels = {
        ar: { OM: "عُمان", AE: "الإمارات", SA: "السعودية", GLOBAL: "دولي" },
        en: { OM: "Oman", AE: "UAE", SA: "Saudi Arabia", GLOBAL: "International" }
      };
      Array.from(marketSwitch.options).forEach((option) => {
        option.textContent = marketLabels[prefs.locale][option.value] || option.textContent;
      });
    }

    const search = document.getElementById("search-input");
    if (search) search.placeholder = localeCopy.searchPlaceholder;

    const newsletterButton = document.querySelector(".newsletter-form .submit-btn");
    if (newsletterButton) newsletterButton.textContent = localeCopy.newsletterButton;

    const resetPassword = document.querySelector("#authOverlay .ghost-btn");
    if (resetPassword) resetPassword.textContent = localeCopy.resetPassword;

    const couponButton = document.querySelector(".coupon-row .ghost-btn");
    if (couponButton) couponButton.textContent = localeCopy.couponApply;

    const featuredTitle = document.querySelector(".featured-section .section-headline h2");
    if (featuredTitle) featuredTitle.textContent = localeCopy.quickLinks[0];

    document.querySelectorAll(".quick-nav-links a").forEach((link, index) => {
      link.textContent = localeCopy.quickLinks[index] || link.textContent;
    });

    const botTitle = document.getElementById("luxury-bot-title");
    const botReply = document.getElementById("luxury-bot-reply");
    if (botTitle) botTitle.textContent = localeCopy.botTitle;
    if (botReply) botReply.textContent = localeCopy.botWelcome;
  }

  function applyPreferences() {
    const marketSwitch = document.getElementById("luxury-market-switch");
    const currencySwitch = document.getElementById("luxury-currency-switch");
    if (marketSwitch) marketSwitch.value = prefs.market || "OM";
    if (currencySwitch) currencySwitch.value = prefs.currency;
    syncLocaleText();
    refreshPriceDisplays();
    window.syncMarketExperience?.();
  }

  function persistPrefs() {
    saveJson(PREF_KEY, prefs);
  }

  function persistAnalytics() {
    saveJson(ANALYTICS_KEY, analytics);
  }

  function restoreBotState() {
    const body = document.getElementById("luxury-bot-body");
    if (!body) return;
    body.style.display = "grid";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
