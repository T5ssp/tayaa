(function () {
  const FAVORITES_KEY = "tayya_favorites_v1";
  const COMPARE_KEY = "tayya_compare_v1";
  const RECENT_KEY = "tayya_recent_v1";
  const PREF_KEY = "tayya_luxury_prefs_v1";
  const ANALYTICS_KEY = "tayya_local_analytics_v1";
  const REVIEW_KEY = "tayya_reviews_v1";
  const STOCK_ALERTS_KEY = "tayya_stock_alerts_v1";
  const INSTALL_PREF_KEY = "tayya_install_pref_v1";
  const FREE_SHIPPING_THRESHOLD = 30;
  const favorites = loadIds(FAVORITES_KEY);
  const compare = loadIds(COMPARE_KEY);
  const recent = loadIds(RECENT_KEY);
  let deferredInstallPrompt = null;
  const currencyProfiles = {
    OMR: { symbol: "OMR", rate: 1 },
    USD: { symbol: "USD", rate: 2.6008 },
    AED: { symbol: "AED", rate: 9.553 },
    SAR: { symbol: "SAR", rate: 9.754 },
    EUR: { symbol: "EUR", rate: 2.39 }
  };

  const copy = {
    ar: {
      topBar: "شحن مجاني فوق 30 ر.ع • دفع متنوع • عرض عملات متعددة • دعم واتساب مباشر",
      trustTitle: "طبقة ثقة عالمية",
      trustBody: "خدمات أوضح وتجربة أكثر احترافية تربط بين العرض، الشحن، والدعم داخل الصفحة نفسها.",
      showcaseTitle: "واجهة تجارة أفخم وأكثر جاهزية",
      showcaseBody: "مسار شراء أسرع، دفع أكثر تنوعًا، ولوحة إدارة أذكى لمتابعة النمو الحقيقي.",
      experienceTitle: "مركز تجربة عالمي",
      experienceBody: "حوّل المتجر إلى تجربة أقرب للتطبيق مع تثبيت سريع، حساب أقوى، وتنبيهات شخصية.",
      trustCards: [
        { icon: "fa-globe", title: "تجربة عالمية", body: "واجهة أفخم، عملات متعددة، وتجربة قابلة للتوسع دوليًا." },
        { icon: "fa-shield-halved", title: "ثقة أوضح", body: "رسائل أمان وشحن ودعم فوري داخل رحلة الشراء." },
        { icon: "fa-truck-fast", title: "شحن مرن", body: "توصيل منزلي أو مكتب شحن مع شحن مجاني فوق حد محدد." },
        { icon: "fa-gem", title: "عرض راقٍ", body: "بطاقات أغنى، مقارنة منتجات، ومحتوى أقرب للعلامات الفاخرة." }
      ],
      filtersTitle: "فلاتر أدق",
      allBrands: "كل الماركات",
      allColors: "كل الألوان",
      allSizes: "كل المقاسات",
      allStock: "كل الحالات",
      inStock: "متوفر",
      soldOut: "نفد",
      recommendationsTitle: "اقتراحات مخصصة",
      recommendationsBody: "منتجات تم اختيارها بناءً على التفاعل المحلي والمفضلة والتقييمات.",
      recentTitle: "شوهد مؤخرًا",
      recentBody: "أكمل من حيث توقفت وارجع سريعًا إلى القطع التي لفتت انتباهك.",
      trending: "الأكثر جذبًا",
      saved: "محفوظ",
      viewed: "شوهد مؤخرًا",
      compareTitle: "مقارنة سريعة",
      compareBody: "قارن بين المنتجات الأكثر أهمية قبل اتخاذ القرار.",
      compareEmpty: "أضف حتى 3 منتجات للمقارنة السريعة.",
      clearCompare: "مسح المقارنة",
      shippingUnlocked: "تم فتح الشحن المجاني",
      shippingRemaining: "أضف {amount} للوصول إلى الشحن المجاني",
      secureCheckout: "تأكيد واتساب",
      multiCurrency: "عرض عملات",
      deliveryFlex: "شحن مرن",
      authTitle: "دخول أسرع",
      authBody: "اسمح للعملاء بالدخول عبر Google الآن، ويمكن توسيعها لاحقًا لمزودين آخرين.",
      googleSignIn: "المتابعة عبر Google",
      shareSuccess: "تم تجهيز رابط المنتج للمشاركة",
      favoriteAdded: "تم حفظ المنتج",
      favoriteRemoved: "تمت إزالة المنتج من المحفوظات",
      compareAdded: "أضيف للمقارنة",
      compareRemoved: "تمت إزالة المنتج من المقارنة",
      compareLimit: "يمكن مقارنة 3 منتجات كحد أقصى",
      open: "عرض",
      remove: "إزالة",
      addToCompare: "قارن",
      save: "حفظ",
      share: "مشاركة",
      quickStats: "ترشيح ذكي",
      ratingLabel: "التقييم",
      categoryLabel: "الفئة",
      showcasePanels: [
        { title: "دفع مرن", body: "الدفع عند الاستلام مع PayPal وStripe والتحويل البنكي عند تفعيل الروابط الرسمية." },
        { title: "إدارة أذكى", body: "إحصائيات مبيعات، أفضل المنتجات، وحالات الطلبات داخل لوحة الإدارة." },
        { title: "تجربة عالمية", body: "بطاقات أغنى، مقارنة، مفضلة، ومؤشرات ثقة أوضح على الجوال والديسكتوب." }
      ],
      installCardTitle: "ثبّت المتجر كتطبيق",
      installCardBody: "وصول أسرع من الشاشة الرئيسية وتجربة أقرب للتطبيق على الجوال.",
      installAction: "تثبيت الآن",
      installLater: "لاحقًا",
      installReady: "المتجر جاهز للعمل كتطبيق",
      alertsCardTitle: "تنبيهات شخصية",
      alertsCardBody: "تابع المنتجات التي تريدها واحفظ تنبيهات العودة للمخزون من داخل الحساب.",
      alertsAction: "افتح الحساب",
      savedCardTitle: "منتجات محفوظة",
      savedCardBody: "المفضلة والمقارنة تبقى جاهزة لتسرّع قرار الشراء للعميل.",
      savedAction: "راجع المفضلة"
    },
    en: {
      topBar: "Free shipping over 30 OMR • More payment options • Multi-currency preview • WhatsApp concierge",
      trustTitle: "Global trust layer",
      trustBody: "A clearer service layer that ties together presentation, delivery, support, and confidence.",
      showcaseTitle: "A more premium commerce surface",
      showcaseBody: "Faster checkout, richer payment options, and sharper admin visibility for real growth.",
      experienceTitle: "Global experience hub",
      experienceBody: "Push the storefront closer to an app with installation, account access, and personal alerts.",
      trustCards: [
        { icon: "fa-globe", title: "Global-ready experience", body: "A more premium storefront with multi-currency display and cleaner expansion paths." },
        { icon: "fa-shield-halved", title: "Clearer trust signals", body: "Security, support, and delivery reassurance directly inside the purchase flow." },
        { icon: "fa-truck-fast", title: "Flexible delivery", body: "Home delivery or shipping office pickup with a visible free-shipping threshold." },
        { icon: "fa-gem", title: "Luxury presentation", body: "Richer cards, product comparison, and more editorial product discovery." }
      ],
      filtersTitle: "Sharper filters",
      allBrands: "All brands",
      allColors: "All colors",
      allSizes: "All sizes",
      allStock: "All stock",
      inStock: "In stock",
      soldOut: "Sold out",
      recommendationsTitle: "Curated recommendations",
      recommendationsBody: "Picked from local interest signals, favorites, and product ratings.",
      recentTitle: "Recently viewed",
      recentBody: "Pick up where the customer left off and return to the products that caught attention.",
      trending: "Trending now",
      saved: "Saved pick",
      viewed: "Viewed recently",
      compareTitle: "Quick comparison",
      compareBody: "Compare the products that matter most before you decide.",
      compareEmpty: "Add up to 3 products for a quick side-by-side comparison.",
      clearCompare: "Clear compare",
      shippingUnlocked: "Free shipping unlocked",
      shippingRemaining: "Add {amount} to unlock free shipping",
      secureCheckout: "WhatsApp confirmation",
      multiCurrency: "Multi-currency",
      deliveryFlex: "Flexible delivery",
      authTitle: "Faster sign-in",
      authBody: "Let customers continue with Google now, then expand to other providers later.",
      googleSignIn: "Continue with Google",
      shareSuccess: "Product link is ready to share",
      favoriteAdded: "Product saved",
      favoriteRemoved: "Removed from saved products",
      compareAdded: "Added to comparison",
      compareRemoved: "Removed from comparison",
      compareLimit: "You can compare up to 3 products",
      open: "View",
      remove: "Remove",
      addToCompare: "Compare",
      save: "Save",
      share: "Share",
      quickStats: "Smart fit",
      ratingLabel: "Rating",
      categoryLabel: "Category",
      showcasePanels: [
        { title: "Flexible payments", body: "Cash on delivery plus PayPal, Stripe, and bank transfer once official links are configured." },
        { title: "Smarter operations", body: "Sales analytics, top products, and richer order status handling inside admin." },
        { title: "Global polish", body: "Richer cards, comparison, favorites, and clearer trust cues on mobile and desktop." }
      ],
      installCardTitle: "Install the storefront",
      installCardBody: "Add it to the home screen for a faster, more app-like shopping flow.",
      installAction: "Install",
      installLater: "Later",
      installReady: "The storefront is install-ready",
      alertsCardTitle: "Personal alerts",
      alertsCardBody: "Keep restock alerts and customer follow-up actions closer to the account hub.",
      alertsAction: "Open account",
      savedCardTitle: "Saved products",
      savedCardBody: "Favorites and comparison stay close to help customers decide faster.",
      savedAction: "Review saved"
    }
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
    if (window.tayyaStore && window.tayyaStore.state) {
      callback();
      return;
    }
    setTimeout(function () {
      waitForStore(callback);
    }, 120);
  }

  function bootstrap() {
    injectTrustStrip();
    injectCommerceShowcase();
    injectExperienceHub();
    injectSmartFilters();
    injectRecommendations();
    injectRecentShelf();
    injectCompareDrawer();
    injectSocialAuth();
    bindInstallPrompt();
    exposeActions();
    wrapStoreFunctions();
    bindMarketEvents();
    renderCommerceLayer();
  }

  function wrapStoreFunctions() {
    ["filterProducts", "fetchProducts", "updateCartUI"].forEach(function (name) {
      const original = window[name];
      if (typeof original !== "function" || original.__commerceWrapped) return;
      const wrapped = function () {
        const result = original.apply(this, arguments);
        queueMicrotask(renderCommerceLayer);
        return result;
      };
      wrapped.__commerceWrapped = true;
      window[name] = wrapped;
    });

    const originalQuickView = window.openQuickView;
    if (typeof originalQuickView === "function" && !originalQuickView.__commerceWrapped) {
      const wrappedQuickView = function (id) {
        pushUnique(recent, id, 8);
        persistIds(RECENT_KEY, recent);
        const result = originalQuickView.apply(this, arguments);
        queueMicrotask(function () {
          renderCommerceLayer();
          syncQuickViewButtons();
        });
        return result;
      };
      wrappedQuickView.__commerceWrapped = true;
      window.openQuickView = wrappedQuickView;
    }
  }

  function bindMarketEvents() {
    if (document.body.__commerceBound) return;
    document.body.__commerceBound = true;

    document.body.addEventListener("click", function (event) {
      if (event.target.closest("[data-locale]")) {
        setTimeout(renderCommerceLayer, 0);
      }
    });

    document.body.addEventListener("change", function (event) {
      if (
        event.target.id === "luxury-currency-switch" ||
        event.target.id === "brand-filter" ||
        event.target.id === "color-filter" ||
        event.target.id === "size-filter" ||
        event.target.id === "availability-filter"
      ) {
        setTimeout(renderCommerceLayer, 0);
      }
    });
  }

  function exposeActions() {
    window.toggleFavoriteProduct = function (id, button) {
      const index = favorites.indexOf(id);
      if (index >= 0) {
        favorites.splice(index, 1);
        notify(getCopy().favoriteRemoved, "info");
      } else {
        pushUnique(favorites, id, 16);
        notify(getCopy().favoriteAdded, "success");
      }
      pushUnique(recent, id, 8);
      persistIds(FAVORITES_KEY, favorites);
      persistIds(RECENT_KEY, recent);
      renderCommerceLayer();
      if (button) syncActionButton(button, favorites.indexOf(id) >= 0, "favorite");
    };

    window.toggleCompareProduct = function (id, button) {
      const index = compare.indexOf(id);
      if (index >= 0) {
        compare.splice(index, 1);
        notify(getCopy().compareRemoved, "info");
      } else {
        if (compare.length >= 3) {
          notify(getCopy().compareLimit, "error");
          return;
        }
        compare.push(id);
        notify(getCopy().compareAdded, "success");
      }
      pushUnique(recent, id, 8);
      persistIds(COMPARE_KEY, compare);
      persistIds(RECENT_KEY, recent);
      renderCommerceLayer();
      if (button) syncActionButton(button, compare.indexOf(id) >= 0, "compare");
    };

    window.shareProduct = async function (id) {
      const product = getProduct(id);
      if (!product) return;
      const shareUrl = getSiteUrl() + "?product=" + encodeURIComponent(id);
      const text = product.name + " - " + shareUrl;

      try {
        if (navigator.share) {
          await navigator.share({ title: product.name, text: product.desc || product.name, url: shareUrl });
          notify(getCopy().shareSuccess, "success");
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          notify(getCopy().shareSuccess, "success");
        } else {
          notify(getCopy().shareSuccess, "info");
        }
      } catch (error) {
        if (!navigator.share) notify(getCopy().shareSuccess, "info");
      }
    };

    window.clearCompareProducts = function () {
      compare.length = 0;
      persistIds(COMPARE_KEY, compare);
      renderCommerceLayer();
    };

    window.triggerStoreInstall = async function () {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } catch (error) {
        // Ignore choice handling and keep the prompt state lightweight.
      }
      deferredInstallPrompt = null;
      renderExperienceHub();
    };

    window.dismissStoreInstallCard = function () {
      localStorage.setItem(INSTALL_PREF_KEY, "dismissed");
      renderExperienceHub();
    };
  }

  function injectTrustStrip() {
    if (document.getElementById("trust-strip")) return;
    const section = document.createElement("section");
    section.className = "trust-strip";
    section.id = "trust-strip";
    section.innerHTML = '<div class="recommendations-head"><div><h3></h3><p></p></div></div><div class="trust-strip__grid" id="trust-strip-grid"></div>';
    const hero = document.querySelector(".hero");
    hero && hero.insertAdjacentElement("afterend", section);
  }

  function injectCommerceShowcase() {
    if (document.getElementById("commerce-showcase")) return;
    const section = document.createElement("section");
    section.className = "recommendations-section";
    section.id = "commerce-showcase";
    section.innerHTML = [
      '<div class="recommendations-head">',
      '  <div>',
      '    <h3 id="commerce-showcase-title"></h3>',
      '    <p id="commerce-showcase-body"></p>',
      "  </div>",
      '  <span class="lux-meta-chip" id="commerce-showcase-chip"></span>',
      "</div>",
      '<div class="trust-strip__grid" id="commerce-showcase-grid"></div>'
    ].join("");
    const featured = document.getElementById("featured-products");
    featured && featured.insertAdjacentElement("afterend", section);
  }

  function injectExperienceHub() {
    if (document.getElementById("experience-hub")) return;
    const section = document.createElement("section");
    section.className = "recommendations-section";
    section.id = "experience-hub";
    section.innerHTML = [
      '<div class="recommendations-head">',
      '  <div>',
      '    <h3 id="experience-title"></h3>',
      '    <p id="experience-body"></p>',
      "  </div>",
      '  <span class="lux-meta-chip" id="experience-chip"></span>',
      "</div>",
      '<div class="experience-hub__grid" id="experience-grid"></div>'
    ].join("");
    const showcase = document.getElementById("commerce-showcase");
    if (showcase) showcase.insertAdjacentElement("afterend", section);
  }

  function injectSmartFilters() {
    if (document.getElementById("brand-filter")) return;
    const tools = document.querySelector(".tools-note-inner > div:last-child");
    if (!tools) return;

    const wrapper = document.createElement("div");
    wrapper.className = "smart-filters";
    wrapper.innerHTML = [
      '<select class="sort-select" id="brand-filter"></select>',
      '<select class="sort-select" id="color-filter"></select>',
      '<select class="sort-select" id="size-filter">',
      '  <option value="all">All sizes</option>',
      '  <option value="52">52</option>',
      '  <option value="53">53</option>',
      '  <option value="54">54</option>',
      '  <option value="55">55</option>',
      "</select>",
      '<select class="sort-select" id="availability-filter">',
      '  <option value="all">All stock</option>',
      '  <option value="in-stock">In stock</option>',
      '  <option value="sold-out">Sold out</option>',
      "</select>"
    ].join("");
    tools.insertAdjacentElement("afterbegin", wrapper);

    wrapper.querySelectorAll("select").forEach(function (select) {
      select.addEventListener("change", function () {
        if (window.filterProducts) window.filterProducts();
      });
    });
  }

  function injectRecommendations() {
    if (document.getElementById("luxury-recommendations")) return;
    const section = document.createElement("section");
    section.className = "recommendations-section";
    section.id = "luxury-recommendations";
    section.innerHTML = [
      '<div class="recommendations-head">',
      '  <div>',
      '    <h3 id="recommendations-title"></h3>',
      '    <p id="recommendations-body"></p>',
      "  </div>",
      '  <span class="lux-meta-chip" id="recommendations-chip"></span>',
      "</div>",
      '<div class="recommendations-grid" id="recommendations-grid"></div>'
    ].join("");
    const products = document.querySelector(".products-container");
    products && products.insertAdjacentElement("afterend", section);
  }

  function injectRecentShelf() {
    if (document.getElementById("recent-shelf")) return;
    const section = document.createElement("section");
    section.className = "recommendations-section";
    section.id = "recent-shelf";
    section.innerHTML = [
      '<div class="recommendations-head">',
      '  <div>',
      '    <h3 id="recent-title"></h3>',
      '    <p id="recent-body"></p>',
      "  </div>",
      '  <span class="lux-meta-chip" id="recent-chip"></span>',
      "</div>",
      '<div class="recommendations-grid" id="recent-grid"></div>'
    ].join("");
    const recommendations = document.getElementById("luxury-recommendations");
    recommendations && recommendations.insertAdjacentElement("afterend", section);
  }

  function injectCompareDrawer() {
    if (document.getElementById("compare-drawer")) return;
    const drawer = document.createElement("aside");
    drawer.className = "compare-drawer";
    drawer.id = "compare-drawer";
    drawer.innerHTML = [
      '<div class="compare-drawer__shell">',
      '  <div class="compare-drawer__header">',
      '    <div>',
      '      <h3 id="compare-title"></h3>',
      '      <p id="compare-body"></p>',
      "    </div>",
      '    <div class="compare-drawer__actions">',
      '      <button class="ghost-btn" type="button" onclick="clearCompareProducts()" id="compare-clear-btn"></button>',
      "    </div>",
      "  </div>",
      '  <div class="compare-items" id="compare-items"></div>',
      "</div>"
    ].join("");
    document.body.appendChild(drawer);
  }

  function injectSocialAuth() {
    const authContent = document.querySelector("#authOverlay .modal-content");
    if (!authContent || authContent.querySelector(".social-auth-row")) return;

    const row = document.createElement("div");
    row.className = "social-auth-row";
    row.innerHTML = [
      '<div class="social-auth-title" id="social-auth-title"></div>',
      '<div class="social-auth-note" id="social-auth-note"></div>',
      '<div class="social-auth-actions">',
      '  <button class="social-auth-btn" type="button" onclick="socialSignIn(\'google\')" id="google-sign-btn">',
      '    <i class="fab fa-google"></i> <span></span>',
      "  </button>",
      "</div>"
    ].join("");

    const submitButton = authContent.querySelector(".submit-btn");
    submitButton && submitButton.insertAdjacentElement("afterend", row);
  }

  function renderCommerceLayer() {
    refreshTopBar();
    renderTrustStrip();
    renderCommerceShowcase();
    renderExperienceHub();
    populateSmartFilters();
    renderRecommendations();
    renderRecentShelf();
    renderCompareDrawer();
    renderCartProgress();
    syncProductCards();
    syncQuickViewButtons();
    renderSocialAuth();
    renderStructuredData();
  }

  function refreshTopBar() {
    const span = document.querySelector(".top-bar span");
    if (!span) return;
    const liveTopBar = typeof window.getLiveTopBarText === "function" ? window.getLiveTopBarText(getLocale()) : "";
    span.textContent = liveTopBar || getCopy().topBar;
  }

  function renderTrustStrip() {
    const section = document.getElementById("trust-strip");
    const grid = document.getElementById("trust-strip-grid");
    if (!section || !grid) return;
    const localeCopy = getCopy();
    const headTitle = section.querySelector("h3");
    const headBody = section.querySelector("p");
    if (headTitle) headTitle.textContent = localeCopy.trustTitle;
    if (headBody) headBody.textContent = localeCopy.trustBody;
    grid.innerHTML = localeCopy.trustCards.map(function (card) {
      return [
        '<article class="trust-card">',
        '  <i class="fas ' + card.icon + '"></i>',
        "  <h3>" + escapeHtml(card.title) + "</h3>",
        "  <p>" + escapeHtml(card.body) + "</p>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderCommerceShowcase() {
    const grid = document.getElementById("commerce-showcase-grid");
    if (!grid) return;
    const localeCopy = getCopy();
    const products = getProducts();
    const title = document.getElementById("commerce-showcase-title");
    const body = document.getElementById("commerce-showcase-body");
    const chip = document.getElementById("commerce-showcase-chip");
    if (title) title.textContent = localeCopy.showcaseTitle;
    if (body) body.textContent = localeCopy.showcaseBody;
    if (chip) chip.textContent = products.length
      ? (getLocale() === "ar" ? products.length + " منتج" : products.length + " products")
      : (getLocale() === "ar" ? "المتجر" : "Storefront");
    grid.innerHTML = localeCopy.showcasePanels.map(function (panel) {
      return [
        '<article class="trust-card">',
        "  <h3>" + escapeHtml(panel.title) + "</h3>",
        "  <p>" + escapeHtml(panel.body) + "</p>",
        "</article>"
      ].join("");
    }).join("");
  }

  function bindInstallPrompt() {
    if (window.__tayyaInstallBound) return;
    window.__tayyaInstallBound = true;
    window.addEventListener("beforeinstallprompt", function (event) {
      event.preventDefault();
      deferredInstallPrompt = event;
      renderExperienceHub();
    });
    window.addEventListener("appinstalled", function () {
      deferredInstallPrompt = null;
      localStorage.removeItem(INSTALL_PREF_KEY);
      renderExperienceHub();
    });
  }

  function renderExperienceHub() {
    const grid = document.getElementById("experience-grid");
    if (!grid) return;
    const localeCopy = getCopy();
    const title = document.getElementById("experience-title");
    const body = document.getElementById("experience-body");
    const chip = document.getElementById("experience-chip");
    if (title) title.textContent = localeCopy.experienceTitle;
    if (body) body.textContent = localeCopy.experienceBody;

    const alerts = loadJson(STOCK_ALERTS_KEY, []);
    const dismissed = localStorage.getItem(INSTALL_PREF_KEY) === "dismissed";
    const isStandalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    const installAvailable = !!deferredInstallPrompt && !dismissed;
    const installStatus = isStandalone
      ? localeCopy.installReady
      : installAvailable
        ? localeCopy.installAction
        : (getLocale() === "ar" ? "من المتصفح" : "Browser menu");
    if (chip) chip.textContent = getLocale() === "ar"
      ? alerts.length + " تنبيه محفوظ"
      : alerts.length + " saved alerts";

    grid.innerHTML = [
      [
        '<article class="experience-card">',
        "  <h3>" + escapeHtml(localeCopy.installCardTitle) + "</h3>",
        "  <p>" + escapeHtml(localeCopy.installCardBody) + "</p>",
        '  <div class="experience-card__metric">' + escapeHtml(installStatus) + "</div>",
        '  <div class="experience-card__actions">',
        installAvailable ? '    <button class="ghost-btn" type="button" onclick="triggerStoreInstall()">' + escapeHtml(localeCopy.installAction) + "</button>" : "",
        !isStandalone ? '    <button class="ghost-btn" type="button" onclick="dismissStoreInstallCard()">' + escapeHtml(localeCopy.installLater) + "</button>" : "",
        "  </div>",
        "</article>"
      ].join(""),
      [
        '<article class="experience-card">',
        "  <h3>" + escapeHtml(localeCopy.alertsCardTitle) + "</h3>",
        "  <p>" + escapeHtml(localeCopy.alertsCardBody) + "</p>",
        '  <div class="experience-card__metric">' + escapeHtml(String(alerts.length)) + "</div>",
        '  <div class="experience-card__actions">',
        '    <button class="ghost-btn" type="button" onclick="toggleAccount()">' + escapeHtml(localeCopy.alertsAction) + "</button>",
        "  </div>",
        "</article>"
      ].join(""),
      [
        '<article class="experience-card">',
        "  <h3>" + escapeHtml(localeCopy.savedCardTitle) + "</h3>",
        "  <p>" + escapeHtml(localeCopy.savedCardBody) + "</p>",
        '  <div class="experience-card__metric">' + escapeHtml(String(favorites.length)) + "</div>",
        '  <div class="experience-card__actions">',
        '    <button class="ghost-btn" type="button" onclick="toggleAccount()">' + escapeHtml(localeCopy.savedAction) + "</button>",
        "  </div>",
        "</article>"
      ].join("")
    ].join("");
  }

  function populateSmartFilters() {
    const products = getProducts();
    const brands = uniqueValues(products.map(function (product) { return product.brand; }));
    const colors = uniqueValues(products.map(function (product) { return product.color; }));
    setSelectOptions(document.getElementById("brand-filter"), brands, getCopy().allBrands);
    setSelectOptions(document.getElementById("color-filter"), colors, getCopy().allColors);

    const sizeFilter = document.getElementById("size-filter");
    const availabilityFilter = document.getElementById("availability-filter");
    if (sizeFilter) {
      updateSelectLabel(sizeFilter, {
        all: getCopy().allSizes,
        "52": "52",
        "53": "53",
        "54": "54",
        "55": "55"
      });
    }
    if (availabilityFilter) {
      updateSelectLabel(availabilityFilter, {
        all: getCopy().allStock,
        "in-stock": getCopy().inStock,
        "sold-out": getCopy().soldOut
      });
    }
  }

  function renderRecommendations() {
    const grid = document.getElementById("recommendations-grid");
    if (!grid) return;

    const localeCopy = getCopy();
    const title = document.getElementById("recommendations-title");
    const body = document.getElementById("recommendations-body");
    const chip = document.getElementById("recommendations-chip");
    if (title) title.textContent = localeCopy.recommendationsTitle;
    if (body) body.textContent = localeCopy.recommendationsBody;
    if (chip) chip.textContent = localeCopy.quickStats;

    const products = getProducts();
    const recommended = products
      .slice()
      .sort(function (left, right) { return scoreProduct(right) - scoreProduct(left); })
      .slice(0, 6);

    if (!recommended.length) {
      grid.innerHTML = "";
      return;
    }

    grid.innerHTML = recommended.map(function (product) {
      const metaMarkup = buildMetaChips(product);
      return [
        '<article class="recommend-card">',
        '  <img src="' + escapeHtml(product.imgUrl) + '" alt="' + escapeHtml(product.name) + '" loading="lazy" decoding="async">',
        '  <div class="recommend-card__content">',
        '    <span class="recommend-card__eyebrow">' + escapeHtml(getRecommendationReason(product.id)) + '</span>',
        "    <strong>" + escapeHtml(product.name) + "</strong>",
        "    <p>" + escapeHtml(product.desc || product.category || "") + "</p>",
        metaMarkup ? '    <div class="lux-meta-row">' + metaMarkup + "</div>" : "",
        '    <div class="recommend-card__price">' + formatMoney(product.price) + "</div>",
        '    <div class="recommend-card__actions">',
        '      <button class="ghost-btn" type="button" onclick="openQuickView(\'' + escapeAttr(product.id) + '\')">' + escapeHtml(localeCopy.open) + "</button>",
        '      <button class="ghost-btn" type="button" onclick="toggleCompareProduct(\'' + escapeAttr(product.id) + '\')">' + escapeHtml(localeCopy.addToCompare) + "</button>",
        "    </div>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderRecentShelf() {
    const grid = document.getElementById("recent-grid");
    if (!grid) return;
    const title = document.getElementById("recent-title");
    const body = document.getElementById("recent-body");
    const chip = document.getElementById("recent-chip");
    const localeCopy = getCopy();
    if (title) title.textContent = localeCopy.recentTitle;
    if (body) body.textContent = localeCopy.recentBody;
    const recentProducts = recent.map(getProduct).filter(Boolean).slice(0, 6);
    if (chip) chip.textContent = getLocale() === "ar" ? recentProducts.length + " عناصر" : recentProducts.length + " items";
    if (!recentProducts.length) {
      grid.innerHTML = "";
      return;
    }
    grid.innerHTML = recentProducts.map(function (product) {
      const metaMarkup = buildMetaChips(product);
      return [
        '<article class="recommend-card">',
        '  <img src="' + escapeHtml(product.imgUrl) + '" alt="' + escapeHtml(product.name) + '" loading="lazy" decoding="async">',
        '  <div class="recommend-card__content">',
        '    <span class="recommend-card__eyebrow">' + escapeHtml(localeCopy.viewed) + '</span>',
        "    <strong>" + escapeHtml(product.name) + "</strong>",
        "    <p>" + escapeHtml(product.desc || product.category || "") + "</p>",
        metaMarkup ? '    <div class="lux-meta-row">' + metaMarkup + "</div>" : "",
        '    <div class="recommend-card__price">' + formatMoney(product.price) + "</div>",
        '    <div class="recommend-card__actions">',
        '      <button class="ghost-btn" type="button" onclick="openQuickView(\'' + escapeAttr(product.id) + '\')">' + escapeHtml(localeCopy.open) + "</button>",
        '      <button class="ghost-btn" type="button" onclick="toggleFavoriteProduct(\'' + escapeAttr(product.id) + '\')">' + escapeHtml(localeCopy.save) + "</button>",
        "    </div>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderCompareDrawer() {
    const drawer = document.getElementById("compare-drawer");
    const items = document.getElementById("compare-items");
    if (!drawer || !items) return;

    const localeCopy = getCopy();
    const title = document.getElementById("compare-title");
    const body = document.getElementById("compare-body");
    const clearButton = document.getElementById("compare-clear-btn");
    if (title) title.textContent = localeCopy.compareTitle;
    if (body) body.textContent = localeCopy.compareBody;
    if (clearButton) clearButton.textContent = localeCopy.clearCompare;

    const products = compare.map(getProduct).filter(Boolean);
    drawer.classList.toggle("open", products.length > 0);

    if (!products.length) {
      items.innerHTML = '<div class="compare-card">' + escapeHtml(localeCopy.compareEmpty) + "</div>";
      return;
    }

    items.innerHTML = products.map(function (product) {
      const rating = getAverageRating(product.id).toFixed(1);
      const metaMarkup = buildMetaChips(product);
      const localeCopy = getCopy();
      return [
        '<article class="compare-card">',
        "  <strong>" + escapeHtml(product.name) + "</strong>",
        metaMarkup ? '  <div class="lux-meta-row" style="justify-content:flex-start;">' + metaMarkup + "</div>" : "",
        '  <div class="compare-card__price">' + formatMoney(product.price) + "</div>",
        "  <div>" + escapeHtml(localeCopy.ratingLabel) + ": " + escapeHtml(rating) + "</div>",
        "  <div>" + escapeHtml(localeCopy.categoryLabel) + ": " + escapeHtml(product.category || "General") + "</div>",
        '  <div class="compare-card__actions">',
        '    <button class="ghost-btn" type="button" onclick="openQuickView(\'' + escapeAttr(product.id) + '\')">' + escapeHtml(localeCopy.open) + "</button>",
        '    <button class="ghost-btn" type="button" onclick="toggleCompareProduct(\'' + escapeAttr(product.id) + '\')">' + escapeHtml(localeCopy.remove) + "</button>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderCartProgress() {
    const checkout = document.getElementById("cart-checkout-section");
    if (!checkout || checkout.style.display === "none") return;

    let progress = document.getElementById("cart-progress");
    if (!progress) {
      progress = document.createElement("div");
      progress.id = "cart-progress";
      progress.className = "cart-progress";
      const summary = checkout.querySelector(".summary-muted");
      if (summary) summary.insertAdjacentElement("afterend", progress);
      else checkout.insertAdjacentElement("afterbegin", progress);
    }

    const subtotal = extractNumber((document.getElementById("subtotal") || {}).dataset ? document.getElementById("subtotal").dataset.basePrice : 0);
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const width = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
    const message = remaining <= 0
      ? getCopy().shippingUnlocked
      : getCopy().shippingRemaining.replace("{amount}", formatMoney(remaining));

    progress.innerHTML = [
      "<strong>" + escapeHtml(message) + "</strong>",
      '<div class="cart-progress__bar"><div class="cart-progress__fill" style="width:' + width + '%;"></div></div>',
      '<div class="cart-progress__meta">',
      '  <span>' + escapeHtml(formatMoney(subtotal)) + "</span>",
      '  <span>' + escapeHtml(formatMoney(FREE_SHIPPING_THRESHOLD)) + "</span>",
      "</div>",
      '<div class="cart-progress__trust">',
      '  <span><i class="fas fa-shield-halved"></i> ' + escapeHtml(getCopy().secureCheckout) + "</span>",
      '  <span><i class="fas fa-coins"></i> ' + escapeHtml(getCopy().multiCurrency) + "</span>",
      '  <span><i class="fas fa-truck-fast"></i> ' + escapeHtml(getCopy().deliveryFlex) + "</span>",
      "</div>"
    ].join("");
  }

  function syncProductCards() {
    document.querySelectorAll(".product-card[data-product-id]").forEach(function (card) {
      const productId = card.getAttribute("data-product-id");
      const favoriteButton = card.querySelector('[data-lux-action="favorite"]');
      const compareButton = card.querySelector('[data-lux-action="compare"]');
      syncActionButton(favoriteButton, favorites.indexOf(productId) >= 0, "favorite");
      syncActionButton(compareButton, compare.indexOf(productId) >= 0, "compare");
    });
  }

  function syncQuickViewButtons() {
    const content = document.getElementById("quickViewContent");
    if (!content || !content.dataset.productId) return;
    const productId = content.dataset.productId;
    const favoriteButton = content.querySelector('[data-lux-action="favorite"]');
    const compareButton = content.querySelector('[data-lux-action="compare"]');
    syncActionButton(favoriteButton, favorites.indexOf(productId) >= 0, "favorite");
    syncActionButton(compareButton, compare.indexOf(productId) >= 0, "compare");
  }

  function renderSocialAuth() {
    const row = document.querySelector(".social-auth-row");
    if (!row) return;
    const localeCopy = getCopy();
    const title = document.getElementById("social-auth-title");
    const note = document.getElementById("social-auth-note");
    const google = document.getElementById("google-sign-btn");
    if (title) title.textContent = localeCopy.authTitle;
    if (note) note.textContent = localeCopy.authBody;
    if (google) {
      const label = google.querySelector("span");
      if (label) label.textContent = localeCopy.googleSignIn;
    }
  }

  function renderStructuredData() {
    const products = getProducts();
    if (!products.length) return;
    const reviews = loadJson(REVIEW_KEY, {});
    const siteUrl = getSiteUrl();
    const iconUrl = new URL("./icon.svg", siteUrl).href;
    const scriptId = "tayya-structured-data";
    const existing = document.getElementById(scriptId);

    const graph = [
      {
        "@type": "Organization",
        "@id": siteUrl + "#organization",
        name: "TAYYA",
        url: siteUrl,
        logo: iconUrl
      },
      {
        "@type": "WebSite",
        "@id": siteUrl + "#website",
        url: siteUrl,
        name: "TAYYA",
        inLanguage: document.documentElement.lang || "ar"
      }
    ];

    products.slice(0, 12).forEach(function (product) {
      const reviewList = Array.isArray(reviews[product.id]) ? reviews[product.id] : [];
      const stockTotal = product.stockSizes ? Object.values(product.stockSizes).reduce(function (sum, value) { return sum + Number(value || 0); }, 0) : 0;
      const schemaProduct = {
        "@type": "Product",
        "@id": siteUrl + "?product=" + encodeURIComponent(product.id),
        sku: product.id,
        name: product.name,
        description: product.desc || product.category || "Premium Omani product",
        category: product.category || "Storefront",
        image: product.imgUrl ? [product.imgUrl] : [],
        brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
        offers: {
          "@type": "Offer",
          priceCurrency: "OMR",
          price: Number(product.price || 0).toFixed(2),
          availability: stockTotal > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: siteUrl + "?product=" + encodeURIComponent(product.id)
        }
      };

      if (reviewList.length) {
        schemaProduct.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: getAverageRating(product.id).toFixed(1),
          reviewCount: reviewList.length
        };
      }

      graph.push(schemaProduct);
    });

    const script = existing || document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    if (!existing) document.head.appendChild(script);
  }

  function scoreProduct(product) {
    const analytics = loadJson(ANALYTICS_KEY, { views: {}, carts: {} });
    const rating = getAverageRating(product.id);
    const viewScore = Number(analytics.views[product.id] || 0);
    const cartScore = Number(analytics.carts[product.id] || 0) * 2;
    const favoriteScore = favorites.indexOf(product.id) >= 0 ? 5 : 0;
    const recentScore = recent.indexOf(product.id) >= 0 ? 3 : 0;
    return (rating * 10) + viewScore + cartScore + favoriteScore + recentScore;
  }

  function getRecommendationReason(productId) {
    if (favorites.indexOf(productId) >= 0) return getCopy().saved;
    if (recent.indexOf(productId) >= 0) return getCopy().viewed;
    return getCopy().trending;
  }

  function buildMetaChips(product) {
    return [product.brand, product.color, product.collection]
      .filter(Boolean)
      .slice(0, 3)
      .map(function (value) { return '<span class="lux-meta-chip">' + escapeHtml(value) + "</span>"; })
      .join("");
  }

  function syncActionButton(button, active, type) {
    if (!button) return;
    button.classList.toggle("active", active);
    if (type === "favorite") {
      const icon = button.querySelector("i");
      if (icon) icon.className = active ? "fas fa-heart" : "far fa-heart";
      if (!icon) button.textContent = active ? getCopy().saved : getCopy().save;
    }
    if (type === "compare" && !button.querySelector("i")) {
      button.textContent = active ? getCopy().remove : getCopy().addToCompare;
    }
  }

  function setSelectOptions(select, values, placeholder) {
    if (!select) return;
    const current = select.value || "all";
    const markup = ['<option value="all">' + escapeHtml(placeholder) + "</option>"].concat(
      values.map(function (value) {
        const normalized = String(value).trim().toLowerCase();
        return '<option value="' + escapeAttr(normalized) + '">' + escapeHtml(value) + "</option>";
      })
    );
    select.innerHTML = markup.join("");
    select.value = values.map(function (value) { return String(value).trim().toLowerCase(); }).indexOf(current) >= 0 ? current : "all";
  }

  function updateSelectLabel(select, labels) {
    if (!select) return;
    const current = select.value || "all";
    Object.keys(labels).forEach(function (key) {
      const option = select.querySelector('option[value="' + key + '"]');
      if (option) option.textContent = labels[key];
    });
    select.value = current;
  }

  function getSiteUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return canonical.href;
    return window.location.origin + window.location.pathname;
  }

  function getLocale() {
    const prefs = loadJson(PREF_KEY, { locale: "ar" });
    return prefs.locale === "en" ? "en" : "ar";
  }

  function getCopy() {
    return copy[getLocale()];
  }

  function getProduct(id) {
    return getProducts().find(function (product) { return product.id === id; }) || null;
  }

  function getProducts() {
    return (window.tayyaStore && window.tayyaStore.state && window.tayyaStore.state.products) || [];
  }

  function getAverageRating(id) {
    if (window.tayyaStore && typeof window.tayyaStore.getAverageRating === "function") {
      return Number(window.tayyaStore.getAverageRating(id) || 0);
    }
    return 0;
  }

  function formatMoney(value) {
    const prefs = loadJson(PREF_KEY, { currency: "OMR" });
    const profile = currencyProfiles[prefs.currency] || currencyProfiles.OMR;
    return (Number(value || 0) * profile.rate).toFixed(2) + " " + profile.symbol;
  }

  function uniqueValues(values) {
    return values
      .map(function (value) { return String(value || "").trim(); })
      .filter(Boolean)
      .filter(function (value, index, list) { return list.indexOf(value) === index; });
  }

  function pushUnique(list, value, limit) {
    const existing = list.indexOf(value);
    if (existing >= 0) list.splice(existing, 1);
    list.unshift(value);
    if (typeof limit === "number" && list.length > limit) {
      list.length = limit;
    }
  }

  function persistIds(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
  }

  function loadIds(key) {
    const value = loadJson(key, []);
    return Array.isArray(value) ? value : [];
  }

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function extractNumber(value) {
    const text = String(value || "");
    const match = text.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function notify(message, type) {
    if (typeof window.showToast === "function") {
      window.showToast(message, type || "info");
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "");
  }
})();
