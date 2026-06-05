(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    bindHeaderState();
    bindSectionReveal();
    bindQuickNavState();
  }

  function bindHeaderState() {
    const header = document.querySelector("header");
    if (!header) return;
    const update = function () {
      header.classList.toggle("scrolled", window.scrollY > 16);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function bindSectionReveal() {
    const selectors = [
      ".hero-copy",
      ".hero-spotlight",
      ".featured-section",
      ".tools-section",
      ".products-container .product-card",
      ".newsletter-card",
      ".trust-strip",
      ".recommendations-section",
      ".growth-shell",
      ".odyssey-shell",
      ".info-sections",
      "footer"
    ];
    const nodes = document.querySelectorAll(selectors.join(","));
    if (!nodes.length) return;

    nodes.forEach(function (node, index) {
      node.classList.add("facelift-reveal");
      node.style.transitionDelay = Math.min(index % 8, 6) * 0.05 + "s";
    });

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (node) { observer.observe(node); });
  }

  function bindQuickNavState() {
    const links = Array.from(document.querySelectorAll(".quick-nav-links a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map();
    links.forEach(function (link) {
      const id = link.getAttribute("href");
      const target = id ? document.querySelector(id) : null;
      if (target) map.set(target, link);
    });
    if (!map.size) return;

    const activate = function (link) {
      links.forEach(function (item) { item.classList.toggle("is-active", item === link); });
    };

    const observer = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!visible) return;
      activate(map.get(visible.target));
    }, { threshold: [0.2, 0.35, 0.6], rootMargin: "-15% 0px -55% 0px" });

    map.forEach(function (_link, section) { observer.observe(section); });
  }
})();
