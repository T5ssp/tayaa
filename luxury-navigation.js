(function () {
  var PREF_KEY = "tayya_luxury_prefs_v1";
  var INTRO_SEEN_KEY = "tayya_intro_seen_v1";
  var activeView = "landing";
  var refreshFrame = null;

  var VIEW_ORDER = ["landing", "shop", "discover", "about"];
  var VIEW_CONFIG = {
    landing: {
      icon: "fa-house-chimney-window",
      defaultTarget: "store-landing",
      selectors: [
        ".hero",
        ".luxury-story",
        "#trust-strip",
        "#featured-products",
        "#commerce-showcase",
        "#experience-hub",
        "#atelier-gallery"
      ]
    },
    shop: {
      icon: "fa-bag-shopping",
      defaultTarget: "products",
      selectors: [
        ".tools-section",
        ".tools-note",
        "#panorama-tags",
        "#growth-discovery",
        "#products",
        "#luxury-ads",
        "#luxury-recommendations",
        "#recent-shelf",
        ".newsletter-card"
      ]
    },
    discover: {
      icon: "fa-compass",
      defaultTarget: "growth-reviews",
      selectors: [
        "#growth-reviews",
        "#atelier-ribbon",
        "#odyssey-layer",
        "#growth-faq",
        "#panorama-feed"
      ]
    },
    about: {
      icon: "fa-circle-info",
      defaultTarget: "about-us",
      selectors: [
        ".luxury-faq",
        ".info-sections"
      ]
    }
  };

  var COPY = {
    ar: {
      navLabel: "مشاهد المتجر",
      quickLinks: ["المميزة", "المتجر", "عن المتجر", "السياسات"],
      views: {
        landing: {
          title: "الافتتاحية",
          body: "هوية المتجر، المشهد الرئيسي، وأبرز المسارات الفاخرة من أول دخول."
        },
        shop: {
          title: "المتجر",
          body: "البحث، الفلاتر، التصنيفات، المنتجات، والعروض في مكان واحد واضح."
        },
        discover: {
          title: "الاستكشاف",
          body: "مراجعات، اقتراحات، خدمة أوضح، ومحتوى يقرب التجربة من متجر عالمي."
        },
        about: {
          title: "عن المتجر",
          body: "الأسئلة الشائعة، معلومات الثقة، وسياسات المتجر وتعريفه."
        }
      },
      heroNote: "تمت إعادة تنظيم المتجر الآن إلى مشاهد واضحة بدل صفحة طويلة واحدة، حتى ينتقل العميل بين الافتتاحية والمتجر والاستكشاف بشكل أفخم وأسهل.",
      heroCategories: ["الكميم", "المصار", "العصي", "الأحذية", "العطور"],
      heroEditorial: [
        {
          chip: "Store atlas",
          title: "تصفح منظم بمشاهد حقيقية",
          body: "بدل التكدس في صفحة واحدة، صار للمتجر افتتاحية، متجر، استكشاف، وتعريف واضح."
        },
        {
          chip: "Luxury flow",
          title: "مدخل أقوى لأول انطباع",
          body: "واجهة الدخول أصبحت تحمل هوية أفخم وتشرح المسارات الأهم بسرعة من أول ثانية."
        },
        {
          chip: "Global-ready",
          title: "أساس أقرب لمتجر عالمي",
          body: "هذا التنظيم يسهل تطوير الدفع، الشحن، الحسابات، والتوسع الدولي لاحقًا."
        }
      ],
      heroSceneChip: "Store atlas",
      heroSceneTitle: "تبويبة لكل مرحلة من تجربة الشراء",
      heroSceneBody: "ابدأ من الافتتاحية، ثم انتقل للمتجر، وبعدها للاستكشاف أو معلومات الثقة بدون تشتيت أو تمرير مرهق.",
      heroSceneViews: {
        landing: { title: "الافتتاحية", body: "الهوية والمنتجات المميزة" },
        shop: { title: "المتجر", body: "بحث وفلاتر وكل المنتجات" },
        discover: { title: "الاستكشاف", body: "مراجعات وتوصيات وخدمة" },
        about: { title: "عن المتجر", body: "FAQ وسياسات وتعريف" }
      },
      heroMetrics: {
        products: "منتجات جاهزة",
        tabs: "مشاهد رئيسية",
        shipping: "حد الشحن المجاني"
      },
      splashSkip: "تخطي الافتتاحية"
    },
    en: {
      navLabel: "Store Views",
      quickLinks: ["Featured", "Shop", "About", "Policies"],
      views: {
        landing: {
          title: "Intro",
          body: "Brand opening, the premium lead section, and the most important entry links."
        },
        shop: {
          title: "Shop",
          body: "Search, filters, categories, products, and offers grouped into one clear browsing view."
        },
        discover: {
          title: "Discover",
          body: "Reviews, recommendations, service clarity, and richer editorial exploration."
        },
        about: {
          title: "About",
          body: "Store identity, FAQ, and policy content in a dedicated view."
        }
      },
      heroNote: "The storefront is now organized into clear views instead of one endless page, so the customer can move between intro, shop, and discovery with less friction.",
      heroCategories: ["Kummah", "Massar", "Canes", "Shoes", "Perfumes"],
      heroEditorial: [
        {
          chip: "Store atlas",
          title: "Structured browsing views",
          body: "The store now has an intro, shop, discover, and about layer instead of one crowded scroll."
        },
        {
          chip: "Luxury flow",
          title: "A stronger opening scene",
          body: "The entrance feels more premium and explains the main paths quickly from the first moment."
        },
        {
          chip: "Global-ready",
          title: "A better base for scale",
          body: "This structure makes future payment, shipping, account, and international upgrades easier."
        }
      ],
      heroSceneChip: "Store atlas",
      heroSceneTitle: "A dedicated tab for each buying stage",
      heroSceneBody: "Start with the intro, jump into the shop, then move into discovery or trust content without a fatiguing scroll.",
      heroSceneViews: {
        landing: { title: "Intro", body: "Brand opening and featured products" },
        shop: { title: "Shop", body: "Search, filters, and the product grid" },
        discover: { title: "Discover", body: "Reviews, discovery, and service" },
        about: { title: "About", body: "FAQ, policies, and brand context" }
      },
      heroMetrics: {
        products: "Ready products",
        tabs: "Primary views",
        shipping: "Free shipping"
      },
      splashSkip: "Skip intro"
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    waitForStore(start);
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

  function start() {
    exposeApi();
    injectNavigation();
    injectHeroEnhancements();
    enhanceSplash();
    assignViewSections();
    bindEvents();
    wrap("fetchProducts", handleStructureRefresh);
    syncInitialView();
  }

  function exposeApi() {
    window.switchStoreView = function (view, options) {
      if (!VIEW_CONFIG[view]) return;
      setView(view, options || {});
    };
    window.dismissSplashIntro = dismissSplash;
  }

  function wrap(name, after) {
    var original = window[name];
    if (typeof original !== "function" || original.__navigationWrapped) return;
    var wrapped = function () {
      var result = original.apply(this, arguments);
      if (result && typeof result.then === "function") {
        return result.finally(function () {
          queueMicrotask(after);
        });
      }
      queueMicrotask(after);
      return result;
    };
    wrapped.__navigationWrapped = true;
    window[name] = wrapped;
  }

  function locale() {
    try {
      var prefs = JSON.parse(localStorage.getItem(PREF_KEY) || "{}");
      return prefs.locale === "en" ? "en" : "ar";
    } catch (_) {
      return "ar";
    }
  }

  function text() {
    return COPY[locale()];
  }

  function state() {
    return window.tayyaStore && window.tayyaStore.state ? window.tayyaStore.state : { products: [] };
  }

  function injectNavigation() {
    if (document.getElementById("store-view-tabs")) return;
    var quickNav = document.querySelector(".quick-nav");
    if (!quickNav || !quickNav.parentNode) return;
    var section = document.createElement("section");
    section.id = "store-view-tabs";
    section.className = "store-view-tabs";
    section.innerHTML = [
      '<div class="store-view-tabs__frame">',
      '  <div class="store-view-tabs__head">',
      '    <div class="store-view-tabs__eyebrow"><i class="fas fa-layer-group"></i><span id="store-view-label"></span></div>',
      '    <div class="store-view-tabs__summary" id="store-view-summary"></div>',
      "  </div>",
      '  <div class="store-view-tabs__grid" id="store-view-tabs-grid"></div>',
      "</div>"
    ].join("");
    quickNav.insertAdjacentElement("afterend", section);
    renderNavigation();
  }

  function injectHeroEnhancements() {
    var heroCopy = document.querySelector(".hero-copy");
    var heroSpotlight = document.querySelector(".hero-spotlight");
    var hero = document.querySelector(".hero");
    if (hero && !hero.id) hero.id = "store-landing";
    if (heroCopy && !document.getElementById("hero-luxury-note")) {
      var note = document.createElement("div");
      note.id = "hero-luxury-note";
      note.className = "hero-luxury-note";
      var title = heroCopy.querySelector("h1");
      if (title) title.insertAdjacentElement("afterend", note);
    }
    if (heroCopy && !document.getElementById("hero-category-row")) {
      var categories = document.createElement("div");
      categories.id = "hero-category-row";
      categories.className = "hero-category-row";
      var actions = heroCopy.querySelector(".hero-actions");
      if (actions) actions.insertAdjacentElement("beforebegin", categories);
    }
    if (heroCopy && !document.getElementById("hero-editorial-grid")) {
      var grid = document.createElement("div");
      grid.id = "hero-editorial-grid";
      grid.className = "hero-editorial-grid";
      for (var i = 0; i < 3; i += 1) {
        var card = document.createElement("article");
        card.className = "hero-editorial-card";
        card.innerHTML = [
          '<span id="hero-editorial-chip-' + i + '"></span>',
          '<strong id="hero-editorial-title-' + i + '"></strong>',
          '<p id="hero-editorial-body-' + i + '"></p>'
        ].join("");
        grid.appendChild(card);
      }
      var heroActions = heroCopy.querySelector(".hero-actions");
      if (heroActions) heroActions.insertAdjacentElement("afterend", grid);
    }
    if (heroSpotlight && !document.getElementById("hero-scene-card")) {
      var scene = document.createElement("article");
      scene.id = "hero-scene-card";
      scene.className = "hero-scene";
      scene.innerHTML = [
        '<div class="hero-scene__top">',
        '  <span class="hero-view-pill" id="hero-scene-chip"></span>',
        '  <strong id="hero-scene-title"></strong>',
        '  <p id="hero-scene-body"></p>',
        "</div>",
        '<div class="hero-scene__views" id="hero-scene-views"></div>',
        '<div class="hero-scene__footer">',
        '  <div class="hero-scene__metric"><span id="hero-metric-products-label"></span><strong id="hero-metric-products-value"></strong></div>',
        '  <div class="hero-scene__metric"><span id="hero-metric-tabs-label"></span><strong id="hero-metric-tabs-value"></strong></div>',
        '  <div class="hero-scene__metric"><span id="hero-metric-shipping-label"></span><strong id="hero-metric-shipping-value"></strong></div>',
        "</div>"
      ].join("");
      heroSpotlight.insertAdjacentElement("afterbegin", scene);
    }
    renderHeroEnhancements();
  }

  function renderNavigation() {
    var ui = text();
    var label = document.getElementById("store-view-label");
    var summary = document.getElementById("store-view-summary");
    var grid = document.getElementById("store-view-tabs-grid");
    if (!label || !summary || !grid) return;
    label.textContent = ui.navLabel;
    summary.textContent = ui.views[activeView].body;
    localizeQuickNav(ui.quickLinks);
    grid.innerHTML = VIEW_ORDER.map(function (view) {
      var entry = ui.views[view];
      return [
        '<button type="button" class="store-view-tab' + (view === activeView ? " is-active" : "") + '" data-store-view-tab="' + view + '">',
        '  <i class="fas ' + VIEW_CONFIG[view].icon + '"></i>',
        "  <div>",
        "    <strong>" + escapeHtml(entry.title) + "</strong>",
        "    <span>" + escapeHtml(entry.body) + "</span>",
        "  </div>",
        "</button>"
      ].join("");
    }).join("");
  }

  function renderHeroEnhancements() {
    var ui = text();
    var productsCount = Array.isArray(state().products) ? state().products.length : 0;
    setText("hero-luxury-note", ui.heroNote);
    setText("hero-scene-chip", ui.heroSceneChip);
    setText("hero-scene-title", ui.heroSceneTitle);
    setText("hero-scene-body", ui.heroSceneBody);
    setText("hero-metric-products-label", ui.heroMetrics.products);
    setText("hero-metric-products-value", String(productsCount));
    setText("hero-metric-tabs-label", ui.heroMetrics.tabs);
    setText("hero-metric-tabs-value", String(VIEW_ORDER.length));
    setText("hero-metric-shipping-label", ui.heroMetrics.shipping);
    setText("hero-metric-shipping-value", locale() === "en" ? "30 OMR+" : "30+ ر.ع");

    var categoryRow = document.getElementById("hero-category-row");
    if (categoryRow) {
      categoryRow.innerHTML = ui.heroCategories.map(function (category, index) {
        return '<button type="button" data-hero-category-index="' + index + '">' + escapeHtml(category) + "</button>";
      }).join("");
    }

    for (var i = 0; i < ui.heroEditorial.length; i += 1) {
      setText("hero-editorial-chip-" + i, ui.heroEditorial[i].chip);
      setText("hero-editorial-title-" + i, ui.heroEditorial[i].title);
      setText("hero-editorial-body-" + i, ui.heroEditorial[i].body);
    }

    var sceneViews = document.getElementById("hero-scene-views");
    if (sceneViews) {
      sceneViews.innerHTML = VIEW_ORDER.map(function (view) {
        var entry = ui.heroSceneViews[view];
        var target = VIEW_CONFIG[view].defaultTarget;
        return [
          '<button type="button" data-store-view-trigger="' + view + '" data-store-target="' + target + '">',
          "  <strong>" + escapeHtml(entry.title) + "</strong>",
          "  <span>" + escapeHtml(entry.body) + "</span>",
          "</button>"
        ].join("");
      }).join("");
    }

    var skip = document.querySelector(".splash-skip");
    if (skip) skip.textContent = ui.splashSkip;
  }

  function localizeQuickNav(labels) {
    var links = document.querySelectorAll(".quick-nav-links a");
    if (!links.length || !labels || labels.length < 4) return;
    links.forEach(function (link, index) {
      if (labels[index]) link.textContent = labels[index];
    });
  }

  function assignViewSections() {
    VIEW_ORDER.forEach(function (view) {
      VIEW_CONFIG[view].selectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (node) {
          if (!node || !node.parentNode || node.closest(".modal-overlay")) return;
          node.dataset.storeView = view;
          node.classList.add("store-view-section");
        });
      });
    });
  }

  function setView(view, options) {
    if (!VIEW_CONFIG[view]) return;
    activeView = view;
    document.body.setAttribute("data-store-view-active", view);
    applyViewVisibility();
    renderNavigation();
    if (!options || !options.skipScroll) {
      scrollToTarget(options && options.targetId ? options.targetId : VIEW_CONFIG[view].defaultTarget);
    }
  }

  function applyViewVisibility() {
    document.querySelectorAll(".store-view-section").forEach(function (node) {
      var visible = node.dataset.storeView === activeView;
      node.classList.toggle("store-view-hidden", !visible);
      node.classList.toggle("is-live", visible);
      if (visible) node.removeAttribute("hidden");
      else node.setAttribute("hidden", "hidden");
    });
  }

  function scrollToTarget(id) {
    var target = id ? document.getElementById(id) : null;
    if (!target) {
      target = document.querySelector('.store-view-section[data-store-view="' + activeView + '"]');
    }
    if (!target) return;
    requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function bindEvents() {
    if (document.body.__storeNavigationBound) return;
    document.body.__storeNavigationBound = true;

    document.addEventListener("click", handleClick, true);
    document.addEventListener("change", handleChange, true);
    document.addEventListener("focusin", handleFocusIn, true);
    window.addEventListener("hashchange", handleHashChange);
    observeTopLevelMutations();
  }

  function handleClick(event) {
    var logo = event.target.closest(".logo");
    if (logo) {
      event.preventDefault();
      setView("landing", { targetId: VIEW_CONFIG.landing.defaultTarget });
      return;
    }

    var tab = event.target.closest("[data-store-view-tab]");
    if (tab) {
      event.preventDefault();
      setView(tab.getAttribute("data-store-view-tab"), {});
      return;
    }

    var viewTrigger = event.target.closest("[data-store-view-trigger]");
    if (viewTrigger) {
      event.preventDefault();
      setView(viewTrigger.getAttribute("data-store-view-trigger"), {
        targetId: viewTrigger.getAttribute("data-store-target") || undefined
      });
      return;
    }

    var categoryTrigger = event.target.closest("[data-hero-category-index]");
    if (categoryTrigger) {
      event.preventDefault();
      routeHeroCategory(Number(categoryTrigger.getAttribute("data-hero-category-index") || 0));
      return;
    }

    var anchor = event.target.closest('a[href^="#"]');
    if (anchor) {
      var hash = anchor.getAttribute("href");
      var targetView = viewFromHash(hash);
      if (targetView) {
        event.preventDefault();
        setView(targetView, { targetId: hash.slice(1) });
        return;
      }
    }

    var panoramaAction = event.target.closest("[data-panorama-action]");
    if (panoramaAction) {
      var action = panoramaAction.getAttribute("data-panorama-action");
      if (action === "featured") setView("landing", { skipScroll: true });
      if (action === "products" || action === "search") setView("shop", { skipScroll: true });
    }

    var dockAction = event.target.closest("[data-dock-action]");
    if (dockAction) {
      var dock = dockAction.getAttribute("data-dock-action");
      if (dock === "home") setView("landing", { skipScroll: true });
      if (dock === "search" || dock === "categories") setView("shop", { skipScroll: true });
    }

    if (event.target.closest(".cat-btn, [data-atelier-category], [data-growth-preset], [data-panorama-chip]")) {
      setView("shop", { skipScroll: true });
    }

    if (event.target.closest("[data-locale]")) {
      setTimeout(function () {
        renderNavigation();
        renderHeroEnhancements();
      }, 0);
    }

    if (event.target.closest(".splash-skip")) {
      event.preventDefault();
      dismissSplash();
    }
  }

  function handleChange(event) {
    if (
      event.target.id === "header-category-select" ||
      event.target.id === "sort-select" ||
      event.target.id === "price-filter" ||
      event.target.id === "brand-filter" ||
      event.target.id === "color-filter" ||
      event.target.id === "size-filter" ||
      event.target.id === "availability-filter"
    ) {
      setView("shop", { skipScroll: true });
    }

    if (event.target.id === "luxury-market-switch" || event.target.id === "luxury-currency-switch") {
      setTimeout(renderHeroEnhancements, 0);
    }
  }

  function handleFocusIn(event) {
    if (event.target.id === "search-input") {
      setView("shop", { skipScroll: true });
    }
  }

  function handleHashChange() {
    var nextView = viewFromHash(location.hash);
    if (!nextView) return;
    setView(nextView, { targetId: location.hash.slice(1) });
  }

  function viewFromHash(hash) {
    if (!hash || hash === "#") return null;
    var target = document.getElementById(hash.replace(/^#/, ""));
    if (!target) return null;
    var section = target.closest("[data-store-view]");
    return section ? section.getAttribute("data-store-view") : null;
  }

  function routeHeroCategory(index) {
    var categoryNames = {
      ar: ["الكميم", "المصار", "العصي", "الأحذية", "العطور"],
      en: ["الكميم", "المصار", "العصي", "الأحذية", "العطور"]
    };
    var category = categoryNames[locale()][index] || categoryNames.ar[index] || "";
    var targetButton = Array.from(document.querySelectorAll(".cat-btn")).find(function (button) {
      return String(button.textContent || "").trim() === category || String(button.getAttribute("onclick") || "").indexOf(category) >= 0;
    });
    setView("shop", { targetId: "products" });
    if (targetButton && typeof window.filterCategory === "function") {
      window.filterCategory(category, targetButton);
    }
  }

  function observeTopLevelMutations() {
    if (document.body.__storeNavigationObserver) return;
    var observer = new MutationObserver(function () {
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(handleStructureRefresh);
    });
    observer.observe(document.body, { childList: true });
    document.body.__storeNavigationObserver = true;
  }

  function handleStructureRefresh() {
    assignViewSections();
    renderHeroEnhancements();
    applyViewVisibility();
    renderNavigation();
  }

  function syncInitialView() {
    var hashView = viewFromHash(location.hash);
    setView(hashView || "landing", { skipScroll: true });
  }

  function enhanceSplash() {
    var shell = document.querySelector("#splash-screen .splash-shell");
    if (!shell || shell.querySelector(".splash-skip")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "splash-skip";
    button.textContent = text().splashSkip;
    shell.appendChild(button);
  }

  function dismissSplash() {
    var splash = document.getElementById("splash-screen");
    if (!splash || splash.dataset.dismissed === "1") return;
    splash.dataset.dismissed = "1";
    splash.classList.add("is-leaving");
    setSession(INTRO_SEEN_KEY, "1");
    setTimeout(function () {
      splash.style.display = "none";
    }, 1200);
  }

  function getSession(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function setSession(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (_) {
      return;
    }
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  window.getStoreIntroDelay = function () {
    return getSession(INTRO_SEEN_KEY) === "1" ? 1800 : 3200;
  };
})();
