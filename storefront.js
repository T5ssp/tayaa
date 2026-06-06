const bootMonitor = window.__TAYYA_BOOT = window.__TAYYA_BOOT || {
  started: false,
  shell: false,
  page: false,
  errors: []
};
bootMonitor.started = true;

const CURRENCY = "ر.ع";
const FREE_SHIPPING = 30;
const STORAGE = {
  cart: "tayya_clean_cart_v1",
  favorites: "tayya_clean_favorites_v1",
  compare: "tayya_clean_compare_v1",
  user: "tayya_clean_user_v1",
  addresses: "tayya_clean_addresses_v1",
  orders: "tayya_clean_orders_v1"
};

const CATEGORY_META = {
  "الكميم": { href: "kummah.html", icon: "fa-shirt", intro: "كميم مختارة بتطريز هادئ ولمسة عمانية أنيقة." },
  "المصار": { href: "massar.html", icon: "fa-crown", intro: "مصار فاخرة للمناسبات اليومية والرسمية." },
  "العصي": { href: "sticks.html", icon: "fa-wand-magic-sparkles", intro: "عصي راقية بتفاصيل كلاسيكية متوازنة." },
  "الأحذية": { href: "shoes.html", icon: "fa-shoe-prints", intro: "أحذية جلدية منتقاة لإطلالة كاملة." },
  "العطور": { href: "perfumes.html", icon: "fa-spray-can-sparkles", intro: "عطور بخطوط دافئة وفاخرة وثبات أجمل." },
  "الحسابات": { href: "accounts.html", icon: "fa-layer-group", intro: "حسابات رقمية وخدمات جاهزة بتجربة شراء واضحة." }
};

const PRODUCTS = [
  {
    id: "perfume-oud-01",
    category: "العطور",
    title: "عطر عود دافئ",
    price: 19.9,
    badge: "الأكثر طلبًا",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    description: "مزيج عود وعنبر بنهاية ناعمة، مناسب للهدايا والاستخدام اليومي.",
    material: "عود، عنبر، مسك",
    color: "خمري",
    stock: 12
  },
  {
    id: "perfume-amber-02",
    category: "العطور",
    title: "عنبر السلطان",
    price: 24,
    badge: "فاخر",
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=900&q=85",
    description: "عطر شرقي متوازن بطابع رسمي ومظهر هدية راق.",
    material: "عنبر، فانيلا، أخشاب",
    color: "ذهبي",
    stock: 8
  },
  {
    id: "kummah-red-01",
    category: "الكميم",
    title: "كميم أحمر فاخر",
    price: 14.5,
    badge: "جديد",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
    description: "كميم بتفاصيل دقيقة وخامة مريحة تناسب الإطلالات العمانية.",
    material: "قطن مطرز",
    color: "أحمر",
    stock: 18
  },
  {
    id: "kummah-white-02",
    category: "الكميم",
    title: "كميم أبيض ناعم",
    price: 12,
    badge: "أساسي",
    image: "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=900&q=85",
    description: "تصميم أبيض هادئ وخفيف، مناسب للاستخدام اليومي.",
    material: "قطن فاخر",
    color: "أبيض",
    stock: 22
  },
  {
    id: "massar-royal-01",
    category: "المصار",
    title: "مصر ملكي عاجي",
    price: 32,
    badge: "مختار",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=85",
    description: "مصر بخامة ناعمة ولمعان بسيط يمنح حضورًا فخمًا.",
    material: "حرير مخلوط",
    color: "عاجي",
    stock: 6
  },
  {
    id: "massar-brown-02",
    category: "المصار",
    title: "مصر بني رسمي",
    price: 27,
    badge: "رسمي",
    image: "https://images.unsplash.com/photo-1520975682031-a62d2f1c7b08?auto=format&fit=crop&w=900&q=85",
    description: "لون بني عميق ينسجم مع المناسبات والعمل.",
    material: "نسيج فاخر",
    color: "بني",
    stock: 9
  },
  {
    id: "stick-wood-01",
    category: "العصي",
    title: "عصا خشب منقوشة",
    price: 18,
    badge: "حرفي",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=900&q=85",
    description: "عصا خفيفة بنقشة كلاسيكية ولمسة ذهبية بسيطة.",
    material: "خشب طبيعي",
    color: "خشبي",
    stock: 10
  },
  {
    id: "stick-black-02",
    category: "العصي",
    title: "عصا سوداء كلاسيكية",
    price: 21,
    badge: "أنيق",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    description: "تصميم أسود رصين مناسب للهدايا والمناسبات.",
    material: "خشب مطلي",
    color: "أسود",
    stock: 7
  },
  {
    id: "shoe-brown-01",
    category: "الأحذية",
    title: "حذاء جلد بني",
    price: 29,
    badge: "جلد",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    description: "حذاء جلد بتصميم عملي وفخم يناسب الزي الرسمي.",
    material: "جلد طبيعي",
    color: "بني",
    stock: 11
  },
  {
    id: "shoe-black-02",
    category: "الأحذية",
    title: "حذاء رسمي أسود",
    price: 34,
    badge: "رسمي",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85",
    description: "حذاء رسمي بخط نظيف ومريح للمناسبات الطويلة.",
    material: "جلد ناعم",
    color: "أسود",
    stock: 5
  },
  {
    id: "account-stream-01",
    category: "الحسابات",
    title: "حساب ترفيهي شهري",
    price: 4.5,
    badge: "رقمي",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
    description: "تجربة رقمية واضحة مع تسليم منظم بعد الطلب.",
    material: "اشتراك رقمي",
    color: "رقمي",
    stock: 30
  },
  {
    id: "account-design-02",
    category: "الحسابات",
    title: "حساب أدوات تصميم",
    price: 7,
    badge: "خدمة",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
    description: "حساب خدمات رقمية للاستخدام الشخصي أو التجاري الخفيف.",
    material: "خدمة رقمية",
    color: "رقمي",
    stock: 20
  }
];

let state = {
  cart: loadJson(STORAGE.cart, []),
  favorites: loadJson(STORAGE.favorites, []),
  compare: loadJson(STORAGE.compare, []),
  user: loadJson(STORAGE.user, null),
  addresses: loadJson(STORAGE.addresses, []),
  orders: loadJson(STORAGE.orders, [])
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    renderApp();
    registerEvents();
    registerServiceWorker();
  } catch (error) {
    bootMonitor.errors.push(error?.message || String(error));
    window.__tayyaEmergencyBoot?.("تعذر تشغيل الواجهة الجديدة.");
  }
});

function renderApp() {
  const app = document.getElementById("app");
  if (!app) return;
  const route = getRoute();
  app.innerHTML = `
    <div class="site-shell">
      ${renderTopbar()}
      ${renderHeader(route)}
      <main class="page page--${escapeAttr(route)}">
        ${renderPage(route)}
      </main>
      ${renderFooter()}
      ${renderMobileNav(route)}
      <div class="toast-stack" id="toast-stack"></div>
    </div>
  `;
  bootMonitor.shell = true;
  bootMonitor.page = true;
}

function getRoute() {
  const page = document.body.dataset.page || "home";
  if (page === "category") return "category";
  return page;
}

function getCurrentCategory() {
  const file = location.pathname.split("/").pop();
  const byFile = {
    "kummah.html": "الكميم",
    "massar.html": "المصار",
    "sticks.html": "العصي",
    "shoes.html": "الأحذية",
    "perfumes.html": "العطور",
    "accounts.html": "الحسابات"
  };
  return byFile[file] || document.body.dataset.category || "العطور";
}

function renderTopbar() {
  return `
    <div class="topbar">
      <div class="container topbar__inner">
        <span>شحن مجاني فوق ${FREE_SHIPPING} ${CURRENCY}</span>
        <span>تجربة آمنة وسريعة للجوال والكمبيوتر</span>
      </div>
    </div>
  `;
}

function renderHeader(route) {
  const nav = Object.entries(CATEGORY_META).map(([label, meta]) =>
    `<a href="${meta.href}" class="${route === "category" && getCurrentCategory() === label ? "is-active" : ""}">${label}</a>`
  ).join("");

  return `
    <header class="site-header">
      <div class="container header-grid">
        <a class="brand" href="index.html" aria-label="طية">
          <span class="brand__seal">ط</span>
          <span><strong>طَيّة</strong><small>متجر عماني فاخر</small></span>
        </a>
        <form class="search" data-search-form>
          <input name="q" type="search" placeholder="ابحث عن منتج..." autocomplete="off">
          <button type="submit" aria-label="بحث"><i class="fas fa-search"></i></button>
        </form>
        <div class="header-actions">
          <a class="header-action" href="account.html" aria-label="حسابي"><i class="far fa-user"></i><span>حسابي</span></a>
          <button class="header-action" type="button" data-open-favorites aria-label="المفضلة"><i class="far fa-heart"></i><b>${state.favorites.length}</b></button>
          <button class="header-action" type="button" data-open-compare aria-label="المقارنة"><i class="fas fa-scale-balanced"></i><b>${state.compare.length}</b></button>
          <a class="header-action header-action--cart" href="cart.html" aria-label="السلة"><i class="fas fa-bag-shopping"></i><b>${getCartCount()}</b></a>
        </div>
      </div>
      <nav class="site-nav">
        <div class="container site-nav__inner">
          <a href="index.html" class="${route === "home" ? "is-active" : ""}">الرئيسية</a>
          ${nav}
          <a href="contact.html" class="${route === "contact" ? "is-active" : ""}">تواصل معنا</a>
        </div>
      </nav>
    </header>
  `;
}

function renderPage(route) {
  if (route === "home") return renderHomePage();
  if (route === "category") return renderCategoryPage();
  if (route === "product") return renderProductPage();
  if (route === "cart") return renderCartPage();
  if (route === "checkout") return renderCheckoutPage();
  if (route === "login") return renderLoginPage();
  if (route === "register") return renderRegisterPage();
  if (route === "account") return renderAccountPage();
  if (route === "track-order") return renderTrackOrderPage();
  if (route === "about") return renderInfoPage("من نحن", "طَيّة متجر عماني فاخر يركز على واجهة نظيفة، منتجات مختارة، وتجربة شراء بسيطة من أول زيارة حتى متابعة الطلب.");
  if (route === "contact") return renderContactPage();
  if (route === "faq") return renderFaqPage();
  if (route === "terms") return renderInfoPage("الشروط والأحكام", "الأسعار بالريال العماني، ويتم تأكيد الطلب والتواصل مع العميل قبل التجهيز والشحن.");
  if (route === "privacy") return renderInfoPage("سياسة الخصوصية", "نحفظ بيانات الحساب والعناوين والطلبات محليًا في هذه النسخة التجريبية، ولا نعرض بياناتك لأي طرف آخر.");
  if (route.startsWith("admin")) return renderInfoPage("لوحة الإدارة", "هذه الواجهة مركزة الآن على تجربة العميل. يمكن بناء لوحة إدارة مستقلة لاحقًا عند ربط قاعدة بيانات آمنة.");
  return renderInfoPage("الصفحة غير موجودة", "لم نعثر على الصفحة المطلوبة.", "index.html", "العودة للرئيسية");
}

function renderHomePage() {
  const hero = PRODUCTS[0];
  return `
    <section class="hero">
      <div class="hero__media">
        <img src="${hero.image}" alt="${hero.title}">
      </div>
      <div class="hero__copy">
        <span class="eyebrow">طَيّة | متجر فاخر</span>
        <h1>الفخامة في كل تفصيلة</h1>
        <p>تسوق الكميم، المصار، العصي، الأحذية، العطور والحسابات داخل واجهة عربية نظيفة وسريعة.</p>
        <div class="hero__actions">
          <a class="btn btn--gold" href="perfumes.html">تسوق الآن</a>
          <a class="btn btn--light" href="about.html">عن طَيّة</a>
        </div>
      </div>
    </section>
    ${renderAssurance()}
    <section class="section">
      <div class="section__head">
        <span>الأقسام</span>
        <h2>تسوق حسب الفئة</h2>
      </div>
      <div class="category-strip">
        ${Object.entries(CATEGORY_META).map(([label, meta]) => renderCategoryTile(label, meta)).join("")}
      </div>
    </section>
    <section class="section">
      <div class="section__head">
        <span>مختارات</span>
        <h2>منتجات مقترحة</h2>
      </div>
      <div class="product-grid product-grid--home">
        ${PRODUCTS.slice(0, 8).map(renderProductCard).join("")}
      </div>
    </section>
  `;
}

function renderCategoryTile(label, meta) {
  const product = PRODUCTS.find((item) => item.category === label) || PRODUCTS[0];
  return `
    <a class="category-tile" href="${meta.href}">
      <img src="${product.image}" alt="${label}">
      <strong>${label}</strong>
      <small>عرض المنتجات</small>
    </a>
  `;
}

function renderCategoryPage() {
  const category = getCurrentCategory();
  const items = PRODUCTS.filter((item) => item.category === category);
  const prices = items.map((item) => item.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `
    <section class="page-title">
      <span>الرئيسية / ${category}</span>
      <h1>${category}</h1>
      <p>${CATEGORY_META[category]?.intro || "منتجات مختارة بعناية."}</p>
    </section>
    <section class="catalog-layout">
      <aside class="filters">
        <h2>فلترة</h2>
        <label>بحث داخل القسم<input class="control" type="search" data-filter-search placeholder="اسم المنتج"></label>
        <label>ترتيب<select class="control" data-sort>
          <option value="featured">الأحدث</option>
          <option value="low">السعر: الأقل</option>
          <option value="high">السعر: الأعلى</option>
        </select></label>
        <div class="filter-box">
          <strong>السعر</strong>
          <span>${formatPrice(min)} - ${formatPrice(max)}</span>
        </div>
        <button class="btn btn--primary" type="button" data-reset-filters>تصفية الفلاتر</button>
      </aside>
      <div class="catalog-results">
        <div class="catalog-toolbar">
          <strong>${items.length} منتجات</strong>
          <span>شبكة منتجات واضحة مع أزرار السلة والمفضلة والمقارنة.</span>
        </div>
        <div class="product-grid" data-catalog-grid data-category="${escapeAttr(category)}">
          ${items.map(renderProductCard).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProductCard(product) {
  const inFav = state.favorites.includes(product.id);
  const inCompare = state.compare.includes(product.id);
  return `
    <article class="product-card" data-product-card data-title="${escapeAttr(product.title)}" data-price="${product.price}" data-id="${product.id}">
      <a class="product-card__image" href="product.html?id=${encodeURIComponent(product.id)}">
        <img src="${product.image}" alt="${product.title}">
        <span>${product.badge}</span>
      </a>
      <div class="product-card__body">
        <a href="product.html?id=${encodeURIComponent(product.id)}"><h3>${product.title}</h3></a>
        <p>${product.category}</p>
        <strong>${formatPrice(product.price)}</strong>
        <div class="product-actions">
          <button type="button" data-add-cart="${product.id}"><i class="fas fa-bag-shopping"></i> أضف للسلة</button>
          <button type="button" class="${inFav ? "is-active" : ""}" data-favorite="${product.id}" aria-label="المفضلة"><i class="far fa-heart"></i></button>
          <button type="button" class="${inCompare ? "is-active" : ""}" data-compare="${product.id}" aria-label="المقارنة"><i class="fas fa-scale-balanced"></i></button>
        </div>
      </div>
    </article>
  `;
}

function renderProductPage() {
  const id = new URLSearchParams(location.search).get("id") || PRODUCTS[0].id;
  const product = getProduct(id) || PRODUCTS[0];
  return `
    <section class="product-detail">
      <div class="product-detail__gallery">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-detail__info">
        <span class="eyebrow">${product.category}</span>
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <div class="rating">★★★★★ <span>تقييم 4.8</span></div>
        <strong class="price">${formatPrice(product.price)}</strong>
        <div class="option-row"><span>الخامة</span><b>${product.material}</b></div>
        <div class="option-row"><span>اللون</span><b>${product.color}</b></div>
        <div class="quantity-row">
          <button type="button" data-step-qty="-1">-</button>
          <input id="detail-qty" value="1" inputmode="numeric">
          <button type="button" data-step-qty="1">+</button>
        </div>
        <button class="btn btn--primary" type="button" data-add-cart="${product.id}" data-from-detail>أضف للسلة</button>
        <a class="btn btn--gold" href="checkout.html">اشتر الآن</a>
      </div>
    </section>
    ${renderAssurance()}
  `;
}

function renderCartPage() {
  const lines = state.cart.map((line) => ({ ...line, product: getProduct(line.id) })).filter((line) => line.product);
  const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  return `
    <section class="page-title"><span>الرئيسية / السلة</span><h1>سلة التسوق</h1></section>
    <section class="cart-layout">
      <div class="cart-lines">
        ${lines.length ? lines.map(renderCartLine).join("") : '<div class="empty-card">السلة فارغة حاليًا.</div>'}
      </div>
      <aside class="order-summary">
        <h2>ملخص الطلب</h2>
        <div><span>عدد المنتجات</span><strong>${getCartCount()}</strong></div>
        <div><span>المجموع</span><strong>${formatPrice(total)}</strong></div>
        <div><span>الشحن</span><strong>${total >= FREE_SHIPPING ? "مجاني" : formatPrice(1.5)}</strong></div>
        <hr>
        <div><span>الإجمالي</span><strong>${formatPrice(total + (total && total < FREE_SHIPPING ? 1.5 : 0))}</strong></div>
        <a class="btn btn--primary" href="checkout.html">إتمام الطلب</a>
      </aside>
    </section>
  `;
}

function renderCartLine(line) {
  return `
    <article class="cart-line">
      <img src="${line.product.image}" alt="${line.product.title}">
      <div>
        <strong>${line.product.title}</strong>
        <span>${line.product.category}</span>
      </div>
      <div class="cart-qty">
        <button type="button" data-cart-qty="${line.id}" data-delta="-1">-</button>
        <b>${line.qty}</b>
        <button type="button" data-cart-qty="${line.id}" data-delta="1">+</button>
      </div>
      <strong>${formatPrice(line.product.price * line.qty)}</strong>
      <button class="icon-danger" type="button" data-remove-cart="${line.id}"><i class="fas fa-xmark"></i></button>
    </article>
  `;
}

function renderCheckoutPage() {
  const total = getCartTotal();
  return `
    <section class="page-title"><span>الرئيسية / الدفع</span><h1>إتمام الطلب</h1></section>
    <section class="checkout-layout">
      <form class="panel form-stack" id="checkout-form">
        <h2>بيانات التوصيل</h2>
        <input class="control" name="name" placeholder="الاسم الكامل" value="${escapeAttr(state.user?.name || "")}" required>
        <input class="control" name="phone" placeholder="رقم الجوال" value="${escapeAttr(state.user?.phone || "")}" required>
        <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" value="${escapeAttr(state.user?.email || "")}">
        <textarea class="control" name="address" placeholder="العنوان الكامل" required></textarea>
        <button class="btn btn--primary" type="submit">تأكيد الطلب</button>
      </form>
      <aside class="order-summary">
        <h2>المستحقات</h2>
        <div><span>المجموع</span><strong>${formatPrice(total)}</strong></div>
        <div><span>الشحن</span><strong>${total >= FREE_SHIPPING ? "مجاني" : formatPrice(total ? 1.5 : 0)}</strong></div>
        <hr>
        <div><span>الإجمالي</span><strong>${formatPrice(total + (total && total < FREE_SHIPPING ? 1.5 : 0))}</strong></div>
      </aside>
    </section>
  `;
}

function renderLoginPage() {
  if (state.user) return renderSignedInCard();
  return renderAuthShell("تسجيل الدخول", "ادخل لحسابك مباشرة إلى صفحة حساب بسيطة وواضحة.", "login");
}

function renderRegisterPage() {
  if (state.user) return renderSignedInCard();
  return renderAuthShell("إنشاء حساب", "أنشئ حسابًا سريعًا ثم أكمل بياناتك الأساسية من صفحة الحساب.", "register");
}

function renderAuthShell(title, subtitle, mode) {
  return `
    <section class="auth-page">
      <div class="auth-card">
        <span class="auth-avatar"><i class="far fa-user"></i></span>
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <div class="social-login">
          <button type="button" data-provider-login="google"><i class="fab fa-google"></i> Google</button>
          <button type="button" data-provider-login="facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
        </div>
        <div class="divider"><span>أو سجل دخولك من خلال</span></div>
        <form class="form-stack" id="${mode === "login" ? "login-form" : "register-form"}">
          ${mode === "register" ? '<input class="control" name="name" placeholder="الاسم الكامل" required>' : ""}
          <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" required>
          <input class="control" name="password" type="password" placeholder="كلمة المرور" required>
          <button class="btn btn--primary" type="submit">${title}</button>
        </form>
        <form class="phone-login" id="phone-login-form">
          <input class="control" name="phone" type="tel" placeholder="+968 9X XXX XXX" required>
          <button class="btn btn--light" type="submit"><i class="fas fa-mobile-screen"></i> الدخول برقم الجوال</button>
        </form>
        <a class="auth-switch" href="${mode === "login" ? "register.html" : "login.html"}">${mode === "login" ? "ليس لديك حساب؟ إنشاء حساب" : "لديك حساب؟ تسجيل الدخول"}</a>
      </div>
    </section>
  `;
}

function renderSignedInCard() {
  return `
    <section class="auth-page">
      <div class="auth-card">
        <span class="auth-avatar"><i class="far fa-user"></i></span>
        <h1>أنت مسجل الدخول</h1>
        <p>انتقل مباشرة إلى صفحة حسابك.</p>
        <a class="btn btn--primary" href="account.html">صفحة الحساب</a>
      </div>
    </section>
  `;
}

function renderAccountPage() {
  if (!state.user) {
    return `
      <section class="auth-page">
        <div class="auth-card">
          <span class="auth-avatar"><i class="far fa-user"></i></span>
          <h1>تسجيل الدخول مطلوب</h1>
          <p>سجل دخولك لعرض معلومات الحساب والعناوين وسجل الطلبات.</p>
          <a class="btn btn--primary" href="login.html">تسجيل الدخول</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="page-title"><span>الرئيسية / حسابي</span><h1>الملف الشخصي</h1><p>معلومات الحساب، العناوين المحفوظة، وسجل الطلبات فقط.</p></section>
    <section class="account-layout">
      <aside class="account-menu">
        <button class="is-active" type="button">الملف الشخصي</button>
        <button type="button">عناويني</button>
        <button type="button">سجل الطلبات</button>
        <button type="button" data-logout>تسجيل الخروج</button>
      </aside>
      <div class="account-content">
        <form class="panel form-stack" id="account-form">
          <h2>معلومات الحساب</h2>
          <input class="control" name="name" placeholder="الاسم الكامل" value="${escapeAttr(state.user.name || "")}">
          <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" value="${escapeAttr(state.user.email || "")}">
          <input class="control" name="phone" placeholder="رقم الجوال" value="${escapeAttr(state.user.phone || "")}">
          <button class="btn btn--primary" type="submit">حفظ التعديلات</button>
        </form>
        <section class="panel">
          <div class="panel__head"><h2>العناوين المحفوظة</h2></div>
          <form class="address-form" id="address-form">
            <input class="control" name="label" placeholder="اسم العنوان">
            <input class="control" name="address" placeholder="تفاصيل العنوان">
            <button class="btn btn--light" type="submit">إضافة عنوان</button>
          </form>
          <div class="saved-list">${state.addresses.length ? state.addresses.map(renderAddress).join("") : "<p>لا توجد عناوين محفوظة.</p>"}</div>
        </section>
        <section class="panel">
          <div class="panel__head"><h2>سجل الطلبات</h2></div>
          <div class="saved-list">${state.orders.length ? state.orders.map(renderOrder).join("") : "<p>لا توجد طلبات حتى الآن.</p>"}</div>
        </section>
      </div>
    </section>
  `;
}

function renderAddress(address, index) {
  return `
    <article class="saved-item">
      <i class="fas fa-location-dot"></i>
      <div><strong>${address.label}</strong><span>${address.address}</span></div>
      <button type="button" data-remove-address="${index}">حذف</button>
    </article>
  `;
}

function renderOrder(order) {
  return `
    <article class="saved-item">
      <i class="fas fa-receipt"></i>
      <div><strong>${order.number}</strong><span>${order.date} - ${order.status}</span></div>
      <b>${formatPrice(order.total)}</b>
    </article>
  `;
}

function renderTrackOrderPage() {
  return `
    <section class="narrow-page panel">
      <h1>تتبع الطلب</h1>
      <p>أدخل رقم الطلب لعرض آخر حالة محفوظة.</p>
      <form class="form-stack" id="track-form">
        <input class="control" name="number" placeholder="مثال: TY-1024" required>
        <button class="btn btn--primary" type="submit">بحث</button>
      </form>
      <div id="track-result"></div>
    </section>
  `;
}

function renderContactPage() {
  return `
    <section class="contact-grid">
      <div class="panel">
        <h1>تواصل معنا</h1>
        <p>نرحب باستفساراتك حول المنتجات والطلبات والتوصيل.</p>
        <div class="contact-list">
          <span><i class="fas fa-phone"></i> +968 50 123 4567</span>
          <span><i class="fas fa-envelope"></i> support@tayya.com</span>
          <span><i class="fab fa-whatsapp"></i> واتساب خدمة العملاء</span>
        </div>
      </div>
      <form class="panel form-stack" id="contact-form">
        <input class="control" name="name" placeholder="الاسم">
        <input class="control" name="email" type="email" placeholder="البريد الإلكتروني">
        <textarea class="control" name="message" placeholder="رسالتك"></textarea>
        <button class="btn btn--primary" type="submit">إرسال</button>
      </form>
    </section>
  `;
}

function renderFaqPage() {
  const faqs = [
    ["كيف أطلب؟", "أضف المنتج للسلة ثم أكمل بيانات التوصيل من صفحة الدفع."],
    ["ماذا تحتوي صفحة الحساب؟", "معلومات الحساب، العناوين المحفوظة، وسجل الطلبات فقط."],
    ["هل الدخول عبر Google وFacebook حقيقي؟", "الواجهة جاهزة، والربط الحقيقي يحتاج إعداد مزودات آمنة مثل Firebase أو خادم خلفي."]
  ];
  return `<section class="narrow-page">${faqs.map(([q, a]) => `<article class="panel faq"><h2>${q}</h2><p>${a}</p></article>`).join("")}</section>`;
}

function renderInfoPage(title, text, href = "index.html", label = "العودة للرئيسية") {
  return `
    <section class="narrow-page panel">
      <h1>${title}</h1>
      <p>${text}</p>
      <a class="btn btn--primary" href="${href}">${label}</a>
    </section>
  `;
}

function renderAssurance() {
  const items = [
    ["fa-headset", "دعم 24/7", "نحن هنا لخدمتك دائمًا"],
    ["fa-truck-fast", "شحن سريع", "تجهيز واضح ومنظم"],
    ["fa-shield-heart", "منتجات أصلية", "اختيارات منتقاة بعناية"],
    ["fa-lock", "دفع آمن", "تجربة شراء مطمئنة"]
  ];
  return `<section class="assurance">${items.map(([icon, title, text]) => `<article><i class="fas ${icon}"></i><strong>${title}</strong><span>${text}</span></article>`).join("")}</section>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div><strong class="footer-logo">طَيّة</strong><p>متجر عماني فاخر بواجهة عربية نظيفة وتجربة شراء مباشرة.</p></div>
        <div><h3>الأقسام</h3>${Object.entries(CATEGORY_META).map(([label, meta]) => `<a href="${meta.href}">${label}</a>`).join("")}</div>
        <div><h3>خدمة العملاء</h3><a href="track-order.html">تتبع الطلب</a><a href="faq.html">الأسئلة الشائعة</a><a href="contact.html">تواصل معنا</a></div>
        <div><h3>السياسات</h3><a href="terms.html">الشروط والأحكام</a><a href="privacy.html">سياسة الخصوصية</a></div>
      </div>
      <div class="container footer-bottom"><span>© 2026 طَيّة</span><span>Visa • Apple Pay • Mastercard</span></div>
    </footer>
  `;
}

function renderMobileNav(route) {
  return `
    <nav class="mobile-nav">
      <a class="${route === "home" ? "is-active" : ""}" href="index.html"><i class="fas fa-house"></i><span>الرئيسية</span></a>
      <a href="kummah.html"><i class="fas fa-shirt"></i><span>الكميم</span></a>
      <a class="${route === "cart" ? "is-active" : ""}" href="cart.html"><i class="fas fa-bag-shopping"></i><span>السلة</span></a>
      <a class="${route === "account" ? "is-active" : ""}" href="account.html"><i class="far fa-user"></i><span>حسابي</span></a>
    </nav>
  `;
}

function registerEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", handleInput);
}

function handleClick(event) {
  const target = event.target.closest("[data-add-cart], [data-favorite], [data-compare], [data-cart-qty], [data-remove-cart], [data-provider-login], [data-logout], [data-remove-address], [data-reset-filters], [data-step-qty], [data-open-favorites], [data-open-compare]");
  if (!target) return;

  if (target.dataset.addCart) {
    addToCart(target.dataset.addCart, target.hasAttribute("data-from-detail") ? getDetailQty() : 1);
    return;
  }
  if (target.dataset.favorite) toggleList("favorites", STORAGE.favorites, target.dataset.favorite, "المفضلة");
  if (target.dataset.compare) toggleList("compare", STORAGE.compare, target.dataset.compare, "المقارنة", 4);
  if (target.dataset.cartQty) updateCartQty(target.dataset.cartQty, Number(target.dataset.delta || 1));
  if (target.dataset.removeCart) removeCart(target.dataset.removeCart);
  if (target.dataset.providerLogin) loginUser({ provider: target.dataset.providerLogin });
  if (target.dataset.logout !== undefined) logoutUser();
  if (target.dataset.removeAddress) removeAddress(Number(target.dataset.removeAddress));
  if (target.dataset.resetFilters !== undefined) resetFilters();
  if (target.dataset.stepQty) stepDetailQty(Number(target.dataset.stepQty));
  if (target.dataset.openFavorites !== undefined) toast(state.favorites.length ? `لديك ${state.favorites.length} عناصر في المفضلة` : "المفضلة فارغة");
  if (target.dataset.openCompare !== undefined) toast(state.compare.length ? `لديك ${state.compare.length} عناصر في المقارنة` : "المقارنة فارغة");
}

function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.matches("[data-search-form]")) {
    event.preventDefault();
    const q = new FormData(form).get("q");
    location.href = `perfumes.html?search=${encodeURIComponent(String(q || ""))}`;
  }
  if (form.id === "login-form" || form.id === "register-form") {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    loginUser({ name: data.name, email: data.email, phone: data.phone, provider: "email" });
  }
  if (form.id === "phone-login-form") {
    event.preventDefault();
    const phone = String(new FormData(form).get("phone") || "").trim();
    if (!/^\+\d{7,}/.test(phone)) return toast("أدخل رقم الهاتف بصيغة دولية مثل +968...", "error");
    loginUser({ phone, provider: "phone" });
  }
  if (form.id === "account-form") {
    event.preventDefault();
    state.user = { ...state.user, ...Object.fromEntries(new FormData(form)) };
    saveJson(STORAGE.user, state.user);
    toast("تم حفظ بيانات الحساب");
    renderApp();
  }
  if (form.id === "address-form") {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.address) return toast("اكتب العنوان أولًا", "error");
    state.addresses.push({ label: data.label || "عنوان محفوظ", address: data.address });
    saveJson(STORAGE.addresses, state.addresses);
    toast("تم حفظ العنوان");
    renderApp();
  }
  if (form.id === "checkout-form") {
    event.preventDefault();
    createOrder(Object.fromEntries(new FormData(form)));
  }
  if (form.id === "contact-form") {
    event.preventDefault();
    toast("تم إرسال رسالتك");
    form.reset();
  }
  if (form.id === "track-form") {
    event.preventDefault();
    const number = String(new FormData(form).get("number") || "").trim();
    const order = state.orders.find((item) => item.number === number);
    document.getElementById("track-result").innerHTML = order
      ? `<div class="saved-item"><i class="fas fa-receipt"></i><div><strong>${order.number}</strong><span>${order.status}</span></div><b>${formatPrice(order.total)}</b></div>`
      : `<p class="empty-card">لم نجد طلبًا بهذا الرقم.</p>`;
  }
}

function handleInput(event) {
  if (event.target.matches("[data-filter-search], [data-sort]")) filterCatalog();
}

function filterCatalog() {
  const grid = document.querySelector("[data-catalog-grid]");
  if (!grid) return;
  const query = document.querySelector("[data-filter-search]")?.value?.trim() || "";
  const sort = document.querySelector("[data-sort]")?.value || "featured";
  let items = PRODUCTS.filter((item) => item.category === grid.dataset.category && item.title.includes(query));
  if (sort === "low") items.sort((a, b) => a.price - b.price);
  if (sort === "high") items.sort((a, b) => b.price - a.price);
  grid.innerHTML = items.map(renderProductCard).join("") || '<div class="empty-card">لا توجد منتجات مطابقة.</div>';
}

function resetFilters() {
  const input = document.querySelector("[data-filter-search]");
  const sort = document.querySelector("[data-sort]");
  if (input) input.value = "";
  if (sort) sort.value = "featured";
  filterCatalog();
}

function loginUser(data = {}) {
  const providerLabels = { google: "Google", facebook: "Facebook", phone: "رقم الجوال", email: "البريد" };
  state.user = {
    name: data.name || data.email?.split("@")[0] || data.phone || providerLabels[data.provider] || "عميل طَيّة",
    email: data.email || (data.provider ? `${data.provider}@tayya.local` : ""),
    phone: data.phone || "",
    provider: data.provider || "email"
  };
  saveJson(STORAGE.user, state.user);
  toast("تم تسجيل الدخول");
  window.location.href = "account.html";
}

function logoutUser() {
  state.user = null;
  saveJson(STORAGE.user, null);
  toast("تم تسجيل الخروج");
  window.location.href = "login.html";
}

function createOrder(data) {
  if (!state.cart.length) return toast("السلة فارغة", "error");
  const total = getCartTotal();
  const order = {
    number: `TY-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString("ar-OM"),
    status: "تم استلام الطلب",
    total: total + (total < FREE_SHIPPING ? 1.5 : 0),
    customer: data
  };
  state.orders.unshift(order);
  state.cart = [];
  if (data.address) state.addresses.unshift({ label: "عنوان الطلب", address: data.address });
  saveJson(STORAGE.orders, state.orders);
  saveJson(STORAGE.addresses, state.addresses);
  saveJson(STORAGE.cart, state.cart);
  toast(`تم إنشاء الطلب ${order.number}`);
  window.location.href = "account.html";
}

function addToCart(id, qty = 1) {
  const product = getProduct(id);
  if (!product) return;
  const line = state.cart.find((item) => item.id === id);
  if (line) line.qty += qty;
  else state.cart.push({ id, qty });
  saveJson(STORAGE.cart, state.cart);
  toast("تمت الإضافة للسلة");
  renderApp();
}

function updateCartQty(id, delta) {
  const line = state.cart.find((item) => item.id === id);
  if (!line) return;
  line.qty = Math.max(1, line.qty + delta);
  saveJson(STORAGE.cart, state.cart);
  renderApp();
}

function removeCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  saveJson(STORAGE.cart, state.cart);
  renderApp();
}

function toggleList(key, storageKey, id, label, limit = Infinity) {
  const list = state[key];
  if (list.includes(id)) state[key] = list.filter((item) => item !== id);
  else {
    if (list.length >= limit) return toast(`يمكن إضافة ${limit} عناصر فقط إلى ${label}`, "error");
    state[key] = [...list, id];
  }
  saveJson(storageKey, state[key]);
  renderApp();
}

function removeAddress(index) {
  state.addresses.splice(index, 1);
  saveJson(STORAGE.addresses, state.addresses);
  renderApp();
}

function stepDetailQty(delta) {
  const input = document.getElementById("detail-qty");
  if (!input) return;
  input.value = String(Math.max(1, Number(input.value || 1) + delta));
}

function getDetailQty() {
  return Math.max(1, Number(document.getElementById("detail-qty")?.value || 1));
}

function getProduct(id) {
  return PRODUCTS.find((item) => item.id === id);
}

function getCartCount() {
  return state.cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function getCartTotal() {
  return state.cart.reduce((sum, line) => sum + (getProduct(line.id)?.price || 0) * line.qty, 0);
}

function formatPrice(value) {
  return `${Number(value || 0).toFixed(value % 1 ? 1 : 0)} ${CURRENCY}`;
}

function toast(message, type = "success") {
  const root = document.getElementById("toast-stack");
  if (!root) return;
  const node = document.createElement("div");
  node.className = `toast toast--${type}`;
  node.textContent = message;
  root.appendChild(node);
  requestAnimationFrame(() => node.classList.add("is-visible"));
  setTimeout(() => {
    node.classList.remove("is-visible");
    setTimeout(() => node.remove(), 250);
  }, 2400);
}

function loadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeAttr(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => null);
}
