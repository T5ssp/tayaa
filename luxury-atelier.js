(function () {
  const PREF_KEY = "tayya_luxury_prefs_v1";
  const REVIEW_KEY = "tayya_reviews_v1";
  const FALLBACK_QUOTES = {
    ar: [
      { title: "خدمة أسرع", body: "واجهة أنظف واختصارات أوضح تجعل الوصول للمنتج أسرع وأكثر سلاسة." },
      { title: "هوية أفخم", body: "العرض البصري الآن أقرب إلى متاجر العلامات العالمية مع هدوء وعمق أكبر." },
      { title: "موبايل أذكى", body: "العناصر الأهم صارت أقرب للإبهام مع شعور أكثر فخامة على الشاشات الصغيرة." }
    ],
    en: [
      { title: "Sharper service", body: "A cleaner layout and clearer shortcuts make product discovery faster." },
      { title: "Stronger luxury feel", body: "The visual surface now feels closer to premium global storefronts." },
      { title: "Smarter mobile flow", body: "The most important actions now sit closer to the thumb with more polish." }
    ]
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
    injectProgressBar();
    injectCursorGlow();
    injectCategoryGallery();
    injectQuoteRibbon();
    enhanceFooter();
    wrap("fetchProducts", renderAtelier);
    wrap("filterProducts", renderAtelier);
    bindClicks();
    bindMotion();
    renderAtelier();
  }

  function wrap(name, after) {
    const original = window[name];
    if (typeof original !== "function" || original.__atelierWrapped) return;
    const wrapped = function () {
      const result = original.apply(this, arguments);
      if (result && typeof result.then === "function") return result.finally(function () { queueMicrotask(after); });
      queueMicrotask(after);
      return result;
    };
    wrapped.__atelierWrapped = true;
    window[name] = wrapped;
  }

  function locale() {
    const prefs = loadJson(PREF_KEY, { locale: "ar" });
    return prefs.locale === "en" ? "en" : "ar";
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

  function products() {
    return Array.isArray(window.tayyaStore.state.products) ? window.tayyaStore.state.products : [];
  }

  function getReviewsMap() {
    return loadJson(REVIEW_KEY, {});
  }

  function rating(id) {
    return typeof window.tayyaStore.getAverageRating === "function" ? Number(window.tayyaStore.getAverageRating(id) || 0) : 0;
  }

  function bindClicks() {
    if (document.body.__atelierClicksBound) return;
    document.body.__atelierClicksBound = true;
    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-atelier-category]");
      if (!button) return;
      const category = button.getAttribute("data-atelier-category");
      if (!category || typeof window.filterCategory !== "function") return;
      const targetButton = Array.from(document.querySelectorAll(".cat-btn")).find(function (node) {
        return String(node.textContent || "").trim() === String(category).trim() || String(node.getAttribute("onclick") || "").includes(category);
      });
      if (targetButton) window.filterCategory(category, targetButton);
    });
  }

  function injectProgressBar() {
    if (document.getElementById("atelier-progress")) return;
    const bar = document.createElement("div");
    bar.id = "atelier-progress";
    bar.innerHTML = "<i></i>";
    document.body.appendChild(bar);
  }

  function injectCursorGlow() {
    if (document.getElementById("atelier-cursor")) return;
    const glow = document.createElement("div");
    glow.id = "atelier-cursor";
    document.body.appendChild(glow);
  }

  function injectCategoryGallery() {
    if (document.getElementById("atelier-gallery")) return;
    const anchor = document.querySelector(".featured-section");
    if (!anchor || !anchor.parentNode) return;
    const section = document.createElement("section");
    section.id = "atelier-gallery";
    section.className = "atelier-shell";
    section.innerHTML = [
      '<div class="atelier-head">',
      '  <div><h2 id="atelier-gallery-title"></h2><p id="atelier-gallery-body"></p></div>',
      '  <span class="atelier-head__chip" id="atelier-gallery-chip"></span>',
      "</div>",
      '<div class="atelier-gallery-grid" id="atelier-gallery-grid"></div>'
    ].join("");
    anchor.insertAdjacentElement("afterend", section);
  }

  function injectQuoteRibbon() {
    if (document.getElementById("atelier-ribbon")) return;
    const anchor = document.querySelector(".newsletter-card");
    if (!anchor || !anchor.parentNode) return;
    const section = document.createElement("section");
    section.id = "atelier-ribbon";
    section.className = "atelier-shell";
    section.innerHTML = [
      '<div class="atelier-head">',
      '  <div><h2 id="atelier-ribbon-title"></h2><p id="atelier-ribbon-body"></p></div>',
      "</div>",
      '<div class="atelier-ribbon-grid" id="atelier-ribbon-grid"></div>'
    ].join("");
    anchor.insertAdjacentElement("beforebegin", section);
  }

  function enhanceFooter() {
    const footer = document.querySelector("footer");
    if (!footer || footer.dataset.atelierReady === "1") return;
    footer.dataset.atelierReady = "1";
    footer.innerHTML = [
      '<div class="atelier-footer">',
      '  <div class="atelier-footer__brand">',
      '    <h2>طَيّة</h2>',
      '    <p id="atelier-footer-copy"></p>',
      '    <div class="atelier-footer__chips">',
      '      <span>WhatsApp concierge</span>',
      '      <span>Global-ready experience</span>',
      '      <span>Free shipping over 30 OMR</span>',
      "    </div>",
      "  </div>",
      '  <div class="atelier-footer__grid">',
      '    <article><h4 id="atelier-footer-links-title"></h4><div class="atelier-footer__links"><a href="#featured-products">Featured</a><a href="#products">Products</a><a href="#about-us">About</a><a href="#policies">Policies</a></div></article>',
      '    <article><h4 id="atelier-footer-contact-title"></h4><div class="atelier-footer__links"><a href="https://api.whatsapp.com/send?phone=96876787356" target="_blank" rel="noopener">WhatsApp</a><a href="#accountOverlay" onclick="toggleAccount()">Account hub</a><a href="#cartOverlay" onclick="toggleCart()">Open cart</a></div></article>',
      '    <article><h4 id="atelier-footer-social-title"></h4><div class="atelier-footer__links"><a href="https://instagram.com/TAYYA.OM" target="_blank" rel="noopener">Instagram</a><a href="#">Editorial drops</a><a href="#">Private offers</a></div></article>',
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderAtelier() {
    renderProgress();
    renderCategoryGallery();
    renderQuoteRibbon();
    renderFooterCopy();
  }

  function renderProgress() {
    const fill = document.querySelector("#atelier-progress i");
    if (!fill) return;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const percent = Math.max(0, Math.min(100, (window.scrollY / max) * 100));
    fill.style.width = percent.toFixed(2) + "%";
  }

  function renderCategoryGallery() {
    const title = document.getElementById("atelier-gallery-title");
    const body = document.getElementById("atelier-gallery-body");
    const chip = document.getElementById("atelier-gallery-chip");
    const grid = document.getElementById("atelier-gallery-grid");
    if (!title || !body || !chip || !grid) return;
    const isEn = locale() === "en";
    title.textContent = isEn ? "Editorial category gallery" : "معرض الفئات التحريري";
    body.textContent = isEn
      ? "A richer category surface that makes each collection feel more deliberate and premium."
      : "سطح عرض أغنى للفئات بحيث تبدو كل مجموعة أكثر أناقة وقيمة بصريًا.";
    const grouped = {};
    products().forEach(function (product) {
      const category = product.category || (isEn ? "Collection" : "مجموعة");
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(product);
    });
    const entries = Object.entries(grouped)
      .map(function (entry) {
        const items = entry[1].slice().sort(function (a, b) {
          return rating(b.id) - rating(a.id);
        });
        return { category: entry[0], items: items };
      })
      .sort(function (a, b) { return b.items.length - a.items.length; })
      .slice(0, 4);
    chip.textContent = isEn ? entries.length + " curated views" : entries.length + " مشاهد منسقة";
    grid.innerHTML = entries.map(function (entry) {
      const hero = entry.items[0] || {};
      const range = entry.items.map(function (item) { return Number(item.price || 0); });
      const min = range.length ? Math.min.apply(null, range) : 0;
      const max = range.length ? Math.max.apply(null, range) : 0;
      return [
        '<article class="atelier-gallery-card" data-atelier-category="' + esc(entry.category) + '">',
        '  <img src="' + esc(hero.imgUrl || "") + '" alt="' + esc(entry.category) + '" loading="lazy" decoding="async">',
        '  <div class="atelier-gallery-card__overlay"></div>',
        '  <div class="atelier-gallery-card__content">',
        '    <span>' + esc(entry.items.length + (isEn ? " pieces" : " قطعة")) + '</span>',
        '    <strong>' + esc(entry.category) + "</strong>",
        '    <p>' + esc((isEn ? "Range " : "المدى ") + min.toFixed(0) + " - " + max.toFixed(0) + " OMR") + "</p>",
        '    <button type="button" class="ghost-btn atelier-card-btn" data-atelier-category="' + esc(entry.category) + '">' + esc(isEn ? "Browse category" : "تصفح الفئة") + "</button>",
        "  </div>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderQuoteRibbon() {
    const title = document.getElementById("atelier-ribbon-title");
    const body = document.getElementById("atelier-ribbon-body");
    const grid = document.getElementById("atelier-ribbon-grid");
    if (!title || !body || !grid) return;
    const isEn = locale() === "en";
    title.textContent = isEn ? "Luxury notes" : "ملاحظات الواجهة الفاخرة";
    body.textContent = isEn
      ? "A softer editorial layer around the storefront to make the whole experience feel more premium."
      : "طبقة تحريرية أهدأ حول المتجر حتى تبدو التجربة كلها أكثر فخامة واتساقًا.";
    const quotes = buildQuotes();
    grid.innerHTML = quotes.map(function (quote) {
      return [
        '<article class="atelier-quote-card">',
        '  <strong>' + esc(quote.title) + "</strong>",
        '  <p>' + esc(quote.body) + "</p>",
        "</article>"
      ].join("");
    }).join("");
  }

  function buildQuotes() {
    const isEn = locale() === "en";
    const reviewMap = getReviewsMap();
    const dynamic = [];
    products().forEach(function (product) {
      (reviewMap[product.id] || []).slice(0, 1).forEach(function (review) {
        if (!review.comment) return;
        dynamic.push({
          title: product.name,
          body: review.comment
        });
      });
    });
    return (dynamic.slice(0, 3).length ? dynamic.slice(0, 3) : FALLBACK_QUOTES[isEn ? "en" : "ar"]);
  }

  function renderFooterCopy() {
    const copyNode = document.getElementById("atelier-footer-copy");
    const linksTitle = document.getElementById("atelier-footer-links-title");
    const contactTitle = document.getElementById("atelier-footer-contact-title");
    const socialTitle = document.getElementById("atelier-footer-social-title");
    if (!copyNode || !linksTitle || !contactTitle || !socialTitle) return;
    const isEn = locale() === "en";
    copyNode.textContent = isEn
      ? "A premium Omani storefront shaped to feel faster, calmer, and more global across mobile and desktop."
      : "متجر عُماني فاخر بواجهة أهدأ وأسرع وأكثر جاهزية عالميًا على الجوال والديسكتوب.";
    linksTitle.textContent = isEn ? "Navigate" : "التنقل";
    contactTitle.textContent = isEn ? "Contact" : "التواصل";
    socialTitle.textContent = isEn ? "Brand" : "العلامة";
  }

  function bindMotion() {
    const glow = document.getElementById("atelier-cursor");
    if (glow && window.matchMedia("(pointer:fine)").matches) {
      window.addEventListener("pointermove", function (event) {
        glow.style.transform = "translate(" + (event.clientX - 140) + "px," + (event.clientY - 140) + "px)";
      }, { passive: true });
    }
    window.addEventListener("scroll", renderProgress, { passive: true });
  }
})();
