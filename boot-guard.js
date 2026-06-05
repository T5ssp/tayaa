(function () {
  const globalKey = "__TAYYA_BOOT";
  const monitor = window[globalKey] = window[globalKey] || {
    started: false,
    shell: false,
    page: false,
    errors: []
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getFallbackLinks(page) {
    const base = [
      { href: "index.html", label: "الرئيسية" },
      { href: "kummah.html", label: "الكميم" },
      { href: "massar.html", label: "المصار" },
      { href: "sticks.html", label: "العصي" },
      { href: "shoes.html", label: "الأحذية" },
      { href: "perfumes.html", label: "العطور" },
      { href: "accounts.html", label: "الحسابات" },
      { href: "cart.html", label: "السلة" },
      { href: "checkout.html", label: "الدفع" },
      { href: "contact.html", label: "التواصل" }
    ];

    if (String(page || "").startsWith("admin")) {
      return [
        { href: "admin.html", label: "لوحة الأدمن" },
        { href: "admin-products.html", label: "المنتجات" },
        { href: "admin-orders.html", label: "الطلبات" },
        { href: "admin-offers.html", label: "العروض" },
        { href: "admin-reports.html", label: "التقارير" }
      ];
    }

    return base;
  }

  function renderEmergency(reason) {
    const app = document.getElementById("app");
    if (!app || monitor.page) return;

    const page = document.body?.dataset?.page || "home";
    const title = document.body?.dataset?.title || document.title || "طَيّة";
    const links = getFallbackLinks(page);
    const offlineMessage = navigator.onLine === false
      ? "يبدو أن الجهاز غير متصل بالإنترنت الآن، لذلك تم فتح نسخة محلية احتياطية من الواجهة."
      : reason || "تأخر تشغيل الواجهة الكاملة، لذلك عرضنا نسخة احتياطية قابلة للتصفح بدل إبقاء الصفحة معلقة.";
    const lastError = monitor.errors.length ? `<p class="mini-note">آخر خطأ ملتقط: ${escapeHtml(monitor.errors[monitor.errors.length - 1])}</p>` : "";

    app.innerHTML = `
      <div class="boot-fallback">
        <strong>تم فتح نسخة احتياطية من المتجر</strong>
        <p>${escapeHtml(title)}</p>
        <p>${escapeHtml(offlineMessage)}</p>
        ${lastError}
        <div class="boot-fallback__actions">
          <a class="primary-button" href="index.html">العودة للرئيسية</a>
          <button class="ghost-button" type="button" onclick="window.location.reload()">إعادة المحاولة</button>
        </div>
        <div class="boot-fallback__links">
          ${links.map((link) => `<a class="ghost-button" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("")}
        </div>
      </div>
    `;
  }

  function scheduleWatchdog() {
    window.setTimeout(() => {
      if (!monitor.shell && !monitor.page) {
        renderEmergency("تعذر بدء واجهة المتجر الكاملة، لذلك تم تشغيل بديل سريع بدل الانتظار على شاشة التحميل.");
      }
    }, 1800);

    window.setTimeout(() => {
      if (!monitor.page) {
        renderEmergency("استمر التحميل أكثر من المتوقع، وتم استبدال رسالة الانتظار بواجهة احتياطية قابلة للاستخدام.");
      }
    }, 4500);
  }

  window.__tayyaEmergencyBoot = renderEmergency;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleWatchdog, { once: true });
  } else {
    scheduleWatchdog();
  }
})();
