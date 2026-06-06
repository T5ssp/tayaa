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
  "المصار": { href: "massar.html", icon: "fa-crown", intro: "أحزمة عمانية بتفاصيل تراثية ولمسات فاخرة للمناسبات." },
  "العصي": { href: "sticks.html", icon: "fa-wand-magic-sparkles", intro: "عصي راقية بتفاصيل فضية وكلاسيكية متوازنة." },
  "الأحذية": { href: "shoes.html", icon: "fa-shoe-prints", intro: "أحذية جلدية منتقاة لإطلالة كاملة." },
  "العطور": { href: "perfumes.html", icon: "fa-spray-can-sparkles", intro: "عطور بخطوط دافئة وفاخرة وثبات أجمل." },
  "الحسابات": { href: "accounts.html", icon: "fa-layer-group", intro: "حسابات رقمية وخدمات جاهزة بتجربة شراء واضحة." }
};

const DEFAULT_PRODUCTS = [
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
    image: "./assets/products/kummah-shop.jpg",
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
    image: "./assets/products/kummah-souq.jpg",
    description: "تصميم أبيض هادئ وخفيف، مناسب للاستخدام اليومي.",
    material: "قطن فاخر",
    color: "أبيض",
    stock: 22
  },
  {
    id: "massar-royal-01",
    category: "المصار",
    title: "حزام عماني مطرز",
    price: 32,
    badge: "مختار",
    image: "./assets/products/khanjar-belt.jpg",
    description: "حزام عماني مستوحى من تفاصيل الخناجر التقليدية بلمسة فضية فاخرة.",
    material: "جلد وفضة",
    color: "عاجي",
    stock: 6
  },
  {
    id: "massar-brown-02",
    category: "المصار",
    title: "حزام مصار رسمي",
    price: 27,
    badge: "رسمي",
    image: "./assets/products/khanjar-belt-2.jpg",
    description: "تفاصيل جلدية تقليدية تناسب الإطلالات الرسمية والهدايا.",
    material: "جلد طبيعي",
    color: "بني",
    stock: 9
  },
  {
    id: "stick-wood-01",
    category: "العصي",
    title: "عصا خشب منقوشة",
    price: 18,
    badge: "حرفي",
    image: "./assets/products/silver-cane-clean.jpg",
    description: "عصا خشبية بتفاصيل مستوحاة من مقابض الفضة الكلاسيكية.",
    material: "خشب ومقبض فضي",
    color: "خشبي",
    stock: 10
  },
  {
    id: "stick-black-02",
    category: "العصي",
    title: "عصا سوداء كلاسيكية",
    price: 21,
    badge: "أنيق",
    image: "./assets/products/walking-stick-2.jpg",
    description: "تصميم أسود رصين بعصا خشبية فاخرة ومظهر رسمي.",
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

let PRODUCTS = [...DEFAULT_PRODUCTS];
window.TAYYA_DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;

const remote = {
  firebase: null,
  configured: false,
  productsLoaded: false,
  productCount: 0,
  products: [],
  users: [],
  admins: [],
  orders: [],
  userAccessLoaded: false,
  adminAccessLoaded: false,
  ordersLoaded: false,
  unsubscribeUsers: null,
  unsubscribeAdmins: null,
  unsubscribeOrders: null
};

let state = {
  cart: loadJson(STORAGE.cart, []),
  favorites: loadJson(STORAGE.favorites, []),
  compare: loadJson(STORAGE.compare, []),
  user: loadJson(STORAGE.user, null),
  addresses: loadJson(STORAGE.addresses, []),
  orders: loadJson(STORAGE.orders, [])
};

let phoneConfirmation = null;

document.addEventListener("DOMContentLoaded", () => {
  try {
    renderApp();
    registerEvents();
    initFirebaseBridge();
    registerServiceWorker();
  } catch (error) {
    bootMonitor.errors.push(error?.message || String(error));
    window.__tayyaEmergencyBoot?.("تعذر تشغيل الواجهة الجديدة.");
  }
});

async function initFirebaseBridge() {
  try {
    remote.firebase = await import("./firebase-store.js");
    remote.configured = remote.firebase.isFirebaseConfigured();
    if (!remote.configured) return;

    remote.firebase.onAuthStateChange((profile) => {
      state.user = profile;
      saveJson(STORAGE.user, profile);
      if (profile?.addresses) {
        state.addresses = profile.addresses;
        saveJson(STORAGE.addresses, state.addresses);
      }
      if (profile?.orders) {
        state.orders = profile.orders;
        saveJson(STORAGE.orders, state.orders);
      }
      syncAdminAccess();
      renderApp();
    }).catch((error) => console.warn("Firebase auth sync failed", error));

    remote.firebase.subscribeProducts((items) => {
      remote.productsLoaded = true;
      remote.productCount = items.length;
      remote.products = items;
      PRODUCTS = items.length ? items : [...DEFAULT_PRODUCTS];
      renderApp();
    }, (error) => {
      console.warn("Firebase products sync failed", error);
      toast("تعذر مزامنة المنتجات من Firebase، تم عرض البيانات التجريبية.", "error");
    }).catch((error) => console.warn("Firebase products listener failed", error));
  } catch (error) {
    console.warn("Firebase bridge unavailable", error);
  }
}

function syncAdminAccess() {
  if (!remote.configured || !remote.firebase) return;
  if (!state.user?.isAdmin) {
    remote.users = [];
    remote.admins = [];
    remote.orders = [];
    remote.userAccessLoaded = false;
    remote.adminAccessLoaded = false;
    remote.ordersLoaded = false;
    remote.unsubscribeUsers?.();
    remote.unsubscribeAdmins?.();
    remote.unsubscribeOrders?.();
    remote.unsubscribeUsers = null;
    remote.unsubscribeAdmins = null;
    remote.unsubscribeOrders = null;
    return;
  }

  if (!remote.unsubscribeUsers) {
    remote.firebase.subscribeUsers((users) => {
      remote.users = users;
      remote.userAccessLoaded = true;
      renderApp();
    }, (error) => {
      console.warn("Firebase users sync failed", error);
      toast("تعذر تحميل قائمة المستخدمين. تحقق من قواعد Firestore.", "error");
    }).then((unsubscribe) => {
      remote.unsubscribeUsers = unsubscribe;
    }).catch((error) => console.warn("Firebase users listener failed", error));
  }

  if (!remote.unsubscribeAdmins) {
    remote.firebase.subscribeAdmins((admins) => {
      remote.admins = admins;
      remote.adminAccessLoaded = true;
      renderApp();
    }, (error) => {
      console.warn("Firebase admins sync failed", error);
      toast("تعذر تحميل صلاحيات المسؤولين. تحقق من قواعد Firestore.", "error");
    }).then((unsubscribe) => {
      remote.unsubscribeAdmins = unsubscribe;
    }).catch((error) => console.warn("Firebase admins listener failed", error));
  }

  if (!remote.unsubscribeOrders) {
    remote.firebase.subscribeOrders((orders) => {
      remote.orders = orders;
      remote.ordersLoaded = true;
      renderApp();
    }, (error) => {
      console.warn("Firebase orders sync failed", error);
      toast("تعذر تحميل الطلبات. تحقق من قواعد Firestore.", "error");
    }).then((unsubscribe) => {
      remote.unsubscribeOrders = unsubscribe;
    }).catch((error) => console.warn("Firebase orders listener failed", error));
  }
}

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
  if (route === "forgot-password") return renderForgotPasswordPage();
  if (route === "account") return renderAccountPage();
  if (route === "track-order") return renderTrackOrderPage();
  if (route === "about") return renderInfoPage("من نحن", "طَيّة متجر عماني فاخر يركز على واجهة نظيفة، منتجات مختارة، وتجربة شراء بسيطة من أول زيارة حتى متابعة الطلب.");
  if (route === "contact") return renderContactPage();
  if (route === "faq") return renderFaqPage();
  if (route === "terms") return renderInfoPage("الشروط والأحكام", "الأسعار بالريال العماني، ويتم تأكيد الطلب والتواصل مع العميل قبل التجهيز والشحن.");
  if (route === "privacy") return renderInfoPage("سياسة الخصوصية", "نحفظ بيانات الحساب والعناوين والطلبات داخل المتصفح، ومع تفعيل Firebase يتم حفظها في Firestore حسب قواعد الحماية الخاصة بالمشروع.");
  if (route.startsWith("admin")) return renderAdminPage();
  return renderInfoPage("الصفحة غير موجودة", "لم نعثر على الصفحة المطلوبة.", "index.html", "العودة للرئيسية");
}

function renderHomePage() {
  const hero = PRODUCTS[0];
  return `
    <section class="hero">
      <div class="hero__media">
        <img src="${escapeAttr(hero.image)}" alt="${escapeAttr(hero.title)}">
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
      <img src="${escapeAttr(product.image)}" alt="${escapeAttr(label)}">
      <strong>${escapeHtml(label)}</strong>
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
    <article class="product-card" data-product-card data-title="${escapeAttr(product.title)}" data-price="${product.price}" data-id="${escapeAttr(product.id)}">
      <a class="product-card__image" href="product.html?id=${encodeURIComponent(product.id)}">
        <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.title)}">
        <span>${escapeHtml(product.badge)}</span>
      </a>
      <div class="product-card__body">
        <a href="product.html?id=${encodeURIComponent(product.id)}"><h3>${escapeHtml(product.title)}</h3></a>
        <p>${escapeHtml(product.category)}</p>
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
        <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.title)}">
      </div>
      <div class="product-detail__info">
        <span class="eyebrow">${escapeHtml(product.category)}</span>
        <h1>${escapeHtml(product.title)}</h1>
        <p>${escapeHtml(product.description)}</p>
        <div class="rating">★★★★★ <span>تقييم 4.8</span></div>
        <strong class="price">${formatPrice(product.price)}</strong>
        <div class="option-row"><span>الخامة</span><b>${escapeHtml(product.material)}</b></div>
        <div class="option-row"><span>اللون</span><b>${escapeHtml(product.color)}</b></div>
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
      <img src="${escapeAttr(line.product.image)}" alt="${escapeAttr(line.product.title)}">
      <div>
        <strong>${escapeHtml(line.product.title)}</strong>
        <span>${escapeHtml(line.product.category)}</span>
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
        <div class="payment-methods">
          <label><input type="radio" name="paymentMethod" value="visa" required> <span><i class="fab fa-cc-visa"></i> Visa</span></label>
          <label><input type="radio" name="paymentMethod" value="mastercard"> <span><i class="fab fa-cc-mastercard"></i> Mastercard</span></label>
          <label><input type="radio" name="paymentMethod" value="apple-pay"> <span><i class="fab fa-apple-pay"></i> Apple Pay</span></label>
        </div>
        <p class="secure-note">لا يتم إدخال بيانات البطاقة داخل الموقع. الدفع الحقيقي يتم عبر مزود دفع آمن عند ربط بوابة الدفع.</p>
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
          <button type="button" data-provider-login="apple"><i class="fab fa-apple"></i> Apple</button>
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
          <input class="control" name="code" inputmode="numeric" placeholder="رمز التحقق بعد وصول الرسالة">
          <div id="recaptcha-container" class="recaptcha-box"></div>
          <button class="btn btn--light" type="submit"><i class="fas fa-mobile-screen"></i> الدخول برقم الجوال</button>
        </form>
        <a class="auth-switch" href="${mode === "login" ? "register.html" : "login.html"}">${mode === "login" ? "ليس لديك حساب؟ إنشاء حساب" : "لديك حساب؟ تسجيل الدخول"}</a>
        ${mode === "login" ? '<a class="auth-switch" href="forgot-password.html">نسيت كلمة المرور؟</a>' : ""}
      </div>
    </section>
  `;
}

function renderForgotPasswordPage() {
  return `
    <section class="auth-page">
      <div class="auth-card">
        <span class="auth-avatar"><i class="fas fa-key"></i></span>
        <h1>استرجاع كلمة المرور</h1>
        <p>أدخل بريدك وسيتم إرسال رابط آمن لإعادة تعيين كلمة المرور عبر Firebase.</p>
        <form class="form-stack" id="forgot-password-form">
          <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" required>
          <button class="btn btn--primary" type="submit">إرسال رابط الاسترجاع</button>
        </form>
        <a class="auth-switch" href="login.html">العودة لتسجيل الدخول</a>
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
      <div><strong>${escapeHtml(address.label)}</strong><span>${escapeHtml(address.address)}</span></div>
      <button type="button" data-remove-address="${index}">حذف</button>
    </article>
  `;
}

function renderOrder(order) {
  return `
    <article class="saved-item">
      <i class="fas fa-receipt"></i>
      <div><strong>${escapeHtml(order.number)}</strong><span>${escapeHtml(order.date)} - ${escapeHtml(order.status)}</span></div>
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
    ["هل الدخول عبر Google وFacebook حقيقي؟", "نعم عند تعبئة firebase-config.js وتفعيل مزودات الدخول داخل Firebase Authentication."]
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

function renderAdminPage() {
  if (!remote.configured) {
    return `
      <section class="page-title">
        <span>Admin / Firebase</span>
        <h1>لوحة إدارة المنتجات</h1>
        <p>اللوحة جاهزة، وتحتاج فقط إلى تعبئة إعدادات Firebase وتشغيل قواعد الحماية.</p>
      </section>
      <section class="admin-layout">
        <article class="panel admin-status admin-status--warn">
          <i class="fas fa-database"></i>
          <div>
            <h2>Firebase غير مفعل بعد</h2>
            <p>افتح ملف firebase-config.js وضع بيانات مشروعك، ثم فعّل Authentication وFirestore. حساب المدير المقترح هو admin@tayya.om، ويمكنك تغييره قبل النشر.</p>
          </div>
        </article>
        <article class="panel admin-code">
          <h2>الحقول المطلوبة للمنتج</h2>
          <pre><code>{
  "name": "الكَمِيم العماني",
  "price": 5,
  "image": "URL للصورة",
  "category": "الكميم"
}</code></pre>
        </article>
      </section>
    `;
  }

  if (!state.user) return renderAdminLogin();

  if (!state.user.isAdmin) {
    return `
      <section class="auth-page">
        <div class="auth-card">
          <span class="auth-avatar"><i class="fas fa-lock"></i></span>
          <h1>صلاحية المسؤول مطلوبة</h1>
          <p>هذا الحساب مسجل، لكنه لا يحمل صلاحية Admin. أضف البريد في firebase-config.js للواجهة، واضبط Custom Claim في Firebase للحماية الحقيقية.</p>
          <button class="btn btn--light" type="button" data-logout>تسجيل الخروج</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="page-title">
      <span>Admin / Products</span>
      <h1>لوحة إدارة المنتجات</h1>
      <p>إضافة وتعديل وحذف المنتجات من Firestore. أي تغيير يظهر مباشرة في واجهة المتجر.</p>
    </section>
    <section class="admin-layout">
      <article class="panel admin-status">
        <i class="fas fa-circle-check"></i>
        <div>
          <h2>متصل بـ Firebase</h2>
          <p>${remote.productCount ? `يتم عرض ${remote.productCount} منتج من قاعدة البيانات.` : "قاعدة المنتجات فارغة حالياً، يمكنك إضافة منتج أو نسخ المنتجات التجريبية."}</p>
        </div>
        ${remote.productCount ? "" : '<button class="btn btn--gold" type="button" data-admin-seed>نسخ المنتجات التجريبية</button>'}
      </article>
      <div class="admin-grid">
        ${renderAdminProductForm()}
        ${renderAdminProductsTable()}
      </div>
      ${renderAdminOrdersPanel()}
      ${renderAdminAccessPanel()}
    </section>
  `;
}

function renderAdminLogin() {
  return `
    <section class="auth-page">
      <div class="auth-card">
        <span class="auth-avatar"><i class="fas fa-user-shield"></i></span>
        <h1>تسجيل دخول المسؤول</h1>
        <p>الدخول هنا للمسؤول فقط. استخدم بريد Admin أو Google Admin المصرح في Firebase.</p>
        <div class="social-login">
          <button type="button" data-admin-provider-login="google"><i class="fab fa-google"></i> Google Admin</button>
          <button type="button" data-admin-provider-login="facebook"><i class="fab fa-facebook-f"></i> Facebook Admin</button>
          <button type="button" data-admin-provider-login="apple"><i class="fab fa-apple"></i> Apple Admin</button>
        </div>
        <div class="divider"><span>أو عبر البريد وكلمة المرور</span></div>
        <form class="form-stack" id="admin-login-form">
          <input class="control" name="email" type="email" placeholder="بريد المسؤول" required>
          <input class="control" name="password" type="password" placeholder="كلمة المرور" required>
          <button class="btn btn--primary" type="submit">دخول لوحة الإدارة</button>
        </form>
      </div>
    </section>
  `;
}

function renderAdminProductForm(product = null) {
  const editing = product || null;
  const categoryOptions = Object.keys(CATEGORY_META).map((category) =>
    `<option value="${escapeAttr(category)}" ${editing?.category === category ? "selected" : ""}>${category}</option>`
  ).join("");

  return `
    <form class="panel form-stack admin-product-form" id="admin-product-form">
      <div class="panel__head">
        <h2>${editing ? "تعديل المنتج" : "إضافة منتج"}</h2>
        ${editing ? '<button class="link-button" type="button" data-admin-cancel>إلغاء</button>' : ""}
      </div>
      <input type="hidden" name="id" value="${escapeAttr(editing?.id || "")}">
      <input class="control" name="name" placeholder="اسم المنتج" value="${escapeAttr(editing?.title || "")}" required>
      <select class="control" name="category" required>${categoryOptions}</select>
      <input class="control" name="price" type="number" min="0" step="0.1" placeholder="السعر" value="${escapeAttr(editing?.price || "")}" required>
      <input class="control" name="image" type="url" placeholder="رابط الصورة" value="${escapeAttr(editing?.image || "")}" required>
      <input class="control" name="badge" placeholder="وسم قصير" value="${escapeAttr(editing?.badge || "متوفر")}">
      <div class="form-row">
        <input class="control" name="material" placeholder="الخامة" value="${escapeAttr(editing?.material || "")}">
        <input class="control" name="color" placeholder="اللون" value="${escapeAttr(editing?.color || "")}">
      </div>
      <input class="control" name="stock" type="number" min="0" step="1" placeholder="المخزون" value="${escapeAttr(editing?.stock || 0)}">
      <textarea class="control" name="description" placeholder="وصف المنتج">${editing?.description || ""}</textarea>
      <button class="btn btn--primary" type="submit">${editing ? "حفظ التعديل" : "إضافة المنتج"}</button>
    </form>
  `;
}

function renderAdminProductsTable() {
  const adminProducts = remote.productsLoaded ? remote.products : [];
  const rows = adminProducts.map((product) => `
    <tr>
      <td><img class="admin-thumb" src="${escapeAttr(product.image)}" alt="${escapeAttr(product.title)}"></td>
      <td><strong>${escapeHtml(product.title)}</strong><small>${escapeHtml(product.id)}</small></td>
      <td>${escapeHtml(product.category)}</td>
      <td>${formatPrice(product.price)}</td>
      <td class="admin-actions">
        <button type="button" data-admin-edit="${escapeAttr(product.id)}"><i class="fas fa-pen"></i> تعديل</button>
        <button type="button" data-admin-delete="${escapeAttr(product.id)}"><i class="fas fa-trash"></i> حذف</button>
      </td>
    </tr>
  `).join("");

  return `
    <section class="panel admin-products-panel">
      <div class="panel__head">
        <h2>كل المنتجات</h2>
        <button class="btn btn--light" type="button" data-admin-new>إضافة منتج</button>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>الصورة</th>
              <th>اسم المنتج</th>
              <th>الفئة</th>
              <th>السعر</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="5">لا توجد منتجات في قاعدة البيانات.</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderAdminAccessPanel() {
  const adminIds = new Set(remote.admins.map((admin) => admin.uid));
  if (state.user?.uid && state.user.isAdmin && !adminIds.has(state.user.uid)) {
    adminIds.add(state.user.uid);
  }

  const admins = remote.admins.length ? remote.admins : [];
  const users = remote.users.length ? remote.users : [];
  const userRows = users.map((user) => {
    const isAdmin = adminIds.has(user.uid);
    return `
      <tr>
        <td><strong>${escapeHtml(user.name || "مستخدم")}</strong><small>${escapeHtml(user.uid)}</small></td>
        <td>${escapeHtml(user.email || "-")}</td>
        <td>${escapeHtml(user.phone || "-")}</td>
        <td><span class="admin-badge ${isAdmin ? "is-admin" : ""}">${isAdmin ? "Admin" : "User"}</span></td>
        <td class="admin-actions">
          ${isAdmin ? "" : `<button type="button" data-admin-grant="${escapeAttr(user.uid)}"><i class="fas fa-user-shield"></i> منح صلاحية</button>`}
        </td>
      </tr>
    `;
  }).join("");

  const adminRows = admins.map((admin) => `
    <tr>
      <td><strong>${escapeHtml(admin.name || "مسؤول")}</strong><small>${escapeHtml(admin.uid)}</small></td>
      <td>${escapeHtml(admin.email || "-")}</td>
      <td>${escapeHtml(admin.grantedByEmail || "-")}</td>
      <td class="admin-actions">
        ${admin.uid === state.user?.uid ? '<span class="admin-note">حسابك الحالي</span>' : `<button type="button" data-admin-revoke="${escapeAttr(admin.uid)}"><i class="fas fa-user-minus"></i> سحب الصلاحية</button>`}
      </td>
    </tr>
  `).join("");

  return `
    <section class="panel admin-access-panel">
      <div class="panel__head">
        <div>
          <h2>المسؤولون والصلاحيات</h2>
          <p>امنح الصلاحية لمستخدم سجل دخوله مرة واحدة على الأقل، أو أدخل UID يدوياً من Firebase Authentication.</p>
        </div>
      </div>
      <form class="admin-role-form" id="admin-role-form">
        <input class="control" name="uid" placeholder="UID المستخدم من Firebase" required>
        <input class="control" name="email" type="email" placeholder="البريد الإلكتروني">
        <input class="control" name="name" placeholder="اسم اختياري">
        <button class="btn btn--primary" type="submit">منح صلاحية Admin</button>
      </form>
      <div class="admin-users-grid">
        <div>
          <h3>المسؤولون الحاليون</h3>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>الحساب</th><th>البريد</th><th>منحه</th><th>إجراء</th></tr></thead>
              <tbody>${adminRows || '<tr><td colspan="4">لا توجد صلاحيات محفوظة في collection admins بعد.</td></tr>'}</tbody>
            </table>
          </div>
        </div>
        <div>
          <h3>المستخدمون المسجلون</h3>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>الحساب</th><th>البريد</th><th>الجوال</th><th>الحالة</th><th>إجراء</th></tr></thead>
              <tbody>${userRows || '<tr><td colspan="5">لا يوجد مستخدمون بعد. المستخدم يظهر هنا بعد أول تسجيل دخول.</td></tr>'}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAdminOrdersPanel() {
  const orders = remote.ordersLoaded ? remote.orders : [];
  const rows = orders.map((order) => {
    const customer = order.customer || {};
    const message = `طلب جديد ${order.number || order.id} - ${customer.name || "عميل"} - ${formatPrice(order.total || 0)}`;
    const mailHref = `mailto:support@tayya.com?subject=${encodeURIComponent("طلب جديد من طَيّة")}&body=${encodeURIComponent(message)}`;
    const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message)}`;
    return `
      <tr>
        <td><strong>${escapeHtml(order.number || order.id)}</strong><small>${escapeHtml(order.status || "-")}</small></td>
        <td>${escapeHtml(customer.name || "-")}<small>${escapeHtml(customer.phone || customer.email || "")}</small></td>
        <td>${escapeHtml(order.paymentMethod || "-")}<small>${escapeHtml(order.paymentStatus || "")}</small></td>
        <td>${formatPrice(order.total || 0)}</td>
        <td class="admin-actions">
          <a href="${mailHref}"><i class="fas fa-envelope"></i> بريد</a>
          <a href="${whatsappHref}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> واتساب</a>
        </td>
      </tr>
    `;
  }).join("");

  return `
    <section class="panel admin-orders-panel">
      <div class="panel__head">
        <div>
          <h2>الطلبات والإشعارات</h2>
          <p>الطلبات تحفظ في Firestore فوراً. الإرسال التلقائي للبريد أو واتساب يحتاج Cloud Function أو مزود إشعارات.</p>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>الطلب</th><th>العميل</th><th>الدفع</th><th>الإجمالي</th><th>إشعار</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5">لا توجد طلبات في Firestore بعد.</td></tr>'}</tbody>
        </table>
      </div>
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
  const target = event.target.closest("[data-add-cart], [data-favorite], [data-compare], [data-cart-qty], [data-remove-cart], [data-provider-login], [data-admin-provider-login], [data-admin-edit], [data-admin-delete], [data-admin-new], [data-admin-cancel], [data-admin-seed], [data-admin-grant], [data-admin-revoke], [data-logout], [data-remove-address], [data-reset-filters], [data-step-qty], [data-open-favorites], [data-open-compare]");
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
  if (target.dataset.adminProviderLogin) loginAdmin({ provider: target.dataset.adminProviderLogin });
  if (target.dataset.adminEdit) editAdminProduct(target.dataset.adminEdit);
  if (target.dataset.adminDelete) deleteAdminProduct(target.dataset.adminDelete);
  if (target.dataset.adminNew !== undefined || target.dataset.adminCancel !== undefined) resetAdminForm();
  if (target.dataset.adminSeed !== undefined) seedAdminProducts();
  if (target.dataset.adminGrant) grantAdminUser({ uid: target.dataset.adminGrant });
  if (target.dataset.adminRevoke) revokeAdminUser(target.dataset.adminRevoke);
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
    loginUser({ name: data.name, email: data.email, password: data.password, phone: data.phone, provider: "email", mode: form.id === "register-form" ? "register" : "login" });
  }
  if (form.id === "phone-login-form") {
    event.preventDefault();
    const phone = String(new FormData(form).get("phone") || "").trim();
    if (!/^\+\d{7,}/.test(phone)) return toast("أدخل رقم الهاتف بصيغة دولية مثل +968...", "error");
    const code = String(new FormData(form).get("code") || "").trim();
    loginUser({ phone, code, provider: "phone" });
  }
  if (form.id === "forgot-password-form") {
    event.preventDefault();
    resetPasswordFlow(String(new FormData(form).get("email") || "").trim());
  }
  if (form.id === "admin-login-form") {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    loginAdmin({ email: data.email, password: data.password, provider: "email" });
  }
  if (form.id === "account-form") {
    event.preventDefault();
    state.user = { ...state.user, ...Object.fromEntries(new FormData(form)) };
    saveJson(STORAGE.user, state.user);
    saveRemoteUserData();
    toast("تم حفظ بيانات الحساب");
    renderApp();
  }
  if (form.id === "address-form") {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.address) return toast("اكتب العنوان أولًا", "error");
    state.addresses.push({ label: data.label || "عنوان محفوظ", address: data.address });
    saveJson(STORAGE.addresses, state.addresses);
    saveRemoteUserData();
    toast("تم حفظ العنوان");
    renderApp();
  }
  if (form.id === "admin-product-form") {
    event.preventDefault();
    saveAdminProduct(Object.fromEntries(new FormData(form)));
  }
  if (form.id === "admin-role-form") {
    event.preventDefault();
    grantAdminUser(Object.fromEntries(new FormData(form)));
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
      ? `<div class="saved-item"><i class="fas fa-receipt"></i><div><strong>${escapeHtml(order.number)}</strong><span>${escapeHtml(order.status)}</span></div><b>${formatPrice(order.total)}</b></div>`
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

async function loginUser(data = {}) {
  if (remote.configured && remote.firebase) {
    try {
      let profile = null;
      if (data.provider === "google") profile = await remote.firebase.signInWithGoogle();
      if (data.provider === "facebook") profile = await remote.firebase.signInWithFacebook();
      if (data.provider === "apple") profile = await remote.firebase.signInWithApple();
      if (data.provider === "email") {
        profile = data.mode === "register"
          ? await remote.firebase.registerWithEmail(data.email, data.password, data.name)
          : await remote.firebase.signInWithEmail(data.email, data.password);
      }
      if (data.provider === "phone") {
        if (!phoneConfirmation) {
          phoneConfirmation = await remote.firebase.sendPhoneCode(data.phone, "recaptcha-container");
          toast("تم إرسال رمز التحقق. أدخل الرمز ثم اضغط الدخول مرة أخرى.");
          return;
        }
        if (!data.code) return toast("أدخل رمز التحقق المرسل إلى الجوال.", "error");
        profile = await remote.firebase.confirmPhoneCode(phoneConfirmation, data.code);
        phoneConfirmation = null;
      }
      if (profile) {
        state.user = profile;
        saveJson(STORAGE.user, state.user);
        await saveRemoteUserData();
        toast("تم تسجيل الدخول");
        window.location.href = "account.html";
      }
      return;
    } catch (error) {
      console.error(error);
      return toast(getFirebaseErrorMessage(error), "error");
    }
  }

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

async function logoutUser() {
  if (remote.configured && remote.firebase) {
    await remote.firebase.signOutUser().catch(() => null);
  }
  state.user = null;
  saveJson(STORAGE.user, null);
  toast("تم تسجيل الخروج");
  window.location.href = "login.html";
}

async function loginAdmin(data = {}) {
  if (!remote.configured || !remote.firebase) return toast("فعّل Firebase أولاً من firebase-config.js", "error");
  try {
    const profile = data.provider === "google"
      ? await remote.firebase.signInWithGoogle()
      : data.provider === "facebook"
        ? await remote.firebase.signInWithFacebook()
        : data.provider === "apple"
          ? await remote.firebase.signInWithApple()
          : await remote.firebase.signInWithEmail(data.email, data.password);
    state.user = profile;
    saveJson(STORAGE.user, profile);
    toast(profile.isAdmin ? "مرحباً بالمسؤول" : "تم الدخول، لكن هذا الحساب ليس Admin");
    renderApp();
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

async function resetPasswordFlow(email) {
  if (!email) return toast("أدخل البريد الإلكتروني.", "error");
  if (!remote.configured || !remote.firebase) {
    return toast("فعّل Firebase أولاً لإرسال رابط استرجاع كلمة المرور.", "error");
  }
  try {
    await remote.firebase.resetPassword(email);
    toast("تم إرسال رابط استرجاع كلمة المرور إلى بريدك.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

async function saveRemoteUserData() {
  if (!remote.configured || !remote.firebase || !state.user) return;
  await remote.firebase.saveUserProfile(state.user, {
    addresses: state.addresses,
    orders: state.orders
  }).catch((error) => console.warn("User profile sync failed", error));
}

async function saveAdminProduct(data) {
  if (!remote.configured || !remote.firebase || !state.user?.isAdmin) {
    return toast("لا توجد صلاحية لإدارة المنتجات.", "error");
  }
  const product = {
    name: String(data.name || "").trim(),
    title: String(data.name || "").trim(),
    category: String(data.category || "").trim(),
    price: Number(data.price || 0),
    image: String(data.image || "").trim(),
    badge: String(data.badge || "متوفر").trim(),
    description: String(data.description || "").trim(),
    material: String(data.material || "").trim(),
    color: String(data.color || "").trim(),
    stock: Number(data.stock || 0)
  };
  if (!product.name || !product.category || !product.image) {
    return toast("أكمل اسم المنتج والفئة والصورة.", "error");
  }
  try {
    if (data.id) await remote.firebase.updateProduct(data.id, product);
    else await remote.firebase.addProduct(product);
    toast(data.id ? "تم تعديل المنتج" : "تمت إضافة المنتج");
    resetAdminForm();
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

function editAdminProduct(id) {
  const product = getProduct(id);
  if (!product) return toast("لم يتم العثور على المنتج.", "error");
  const form = document.getElementById("admin-product-form");
  if (!form) return;
  form.outerHTML = renderAdminProductForm(product);
  document.getElementById("admin-product-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetAdminForm() {
  const form = document.getElementById("admin-product-form");
  if (form) form.outerHTML = renderAdminProductForm();
}

async function deleteAdminProduct(id) {
  if (!remote.configured || !remote.firebase || !state.user?.isAdmin) {
    return toast("لا توجد صلاحية لحذف المنتجات.", "error");
  }
  if (!confirm("هل تريد حذف المنتج نهائياً؟")) return;
  try {
    await remote.firebase.deleteProduct(id);
    toast("تم حذف المنتج");
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

async function seedAdminProducts() {
  if (!remote.configured || !remote.firebase || !state.user?.isAdmin) {
    return toast("لا توجد صلاحية لإضافة المنتجات.", "error");
  }
  try {
    await remote.firebase.seedProducts(DEFAULT_PRODUCTS);
    toast("تم نسخ المنتجات التجريبية إلى Firestore");
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

async function grantAdminUser(data = {}) {
  if (!remote.configured || !remote.firebase || !state.user?.isAdmin) {
    return toast("لا توجد صلاحية لإدارة المسؤولين.", "error");
  }
  const uid = String(data.uid || "").trim();
  if (!uid) return toast("أدخل UID المستخدم.", "error");
  const knownUser = remote.users.find((user) => user.uid === uid) || {};
  try {
    await remote.firebase.grantAdmin(uid, {
      name: data.name || knownUser.name || "",
      email: data.email || knownUser.email || ""
    });
    toast("تم منح صلاحية Admin");
    document.getElementById("admin-role-form")?.reset();
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

async function revokeAdminUser(uid) {
  if (!remote.configured || !remote.firebase || !state.user?.isAdmin) {
    return toast("لا توجد صلاحية لإدارة المسؤولين.", "error");
  }
  if (uid === state.user?.uid) return toast("لا يمكن سحب صلاحية حسابك الحالي من هنا.", "error");
  if (!confirm("هل تريد سحب صلاحية Admin من هذا الحساب؟")) return;
  try {
    await remote.firebase.revokeAdmin(uid);
    toast("تم سحب صلاحية Admin");
  } catch (error) {
    console.error(error);
    toast(getFirebaseErrorMessage(error), "error");
  }
}

async function createOrder(data) {
  if (!state.cart.length) return toast("السلة فارغة", "error");
  const total = getCartTotal();
  const order = {
    number: `TY-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString("ar-OM"),
    status: "تم استلام الطلب",
    paymentMethod: data.paymentMethod || "غير محدد",
    paymentStatus: "بانتظار ربط بوابة الدفع",
    total: total + (total < FREE_SHIPPING ? 1.5 : 0),
    customer: data,
    items: state.cart.map((line) => {
      const product = getProduct(line.id);
      return {
        id: line.id,
        title: product?.title || line.id,
        price: product?.price || 0,
        qty: line.qty
      };
    })
  };
  if (remote.configured && remote.firebase) {
    try {
      const created = await remote.firebase.createOrder(order);
      order.remoteId = created.id;
    } catch (error) {
      console.warn("Order notification sync failed", error);
      toast("تم حفظ الطلب محلياً، لكن تعذر إرساله للوحة الإدارة.", "error");
    }
  }
  state.orders.unshift(order);
  state.cart = [];
  if (data.address) state.addresses.unshift({ label: "عنوان الطلب", address: data.address });
  saveJson(STORAGE.orders, state.orders);
  saveJson(STORAGE.addresses, state.addresses);
  saveJson(STORAGE.cart, state.cart);
  saveRemoteUserData();
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
  saveRemoteUserData();
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

function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  if (code.includes("auth/popup")) return "تعذر فتح نافذة تسجيل الدخول، جرّب مرة أخرى أو تحقق من إعدادات المتصفح.";
  if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password")) return "بيانات الدخول غير صحيحة.";
  if (code.includes("auth/user-not-found")) return "لا يوجد حساب بهذا البريد.";
  if (code.includes("auth/email-already-in-use")) return "هذا البريد مسجل مسبقاً.";
  if (code.includes("auth/weak-password")) return "كلمة المرور ضعيفة. استخدم 6 أحرف على الأقل.";
  if (code.includes("auth/operation-not-allowed")) return "طريقة الدخول غير مفعلة في Firebase Authentication.";
  if (code.includes("auth/invalid-phone-number")) return "رقم الجوال غير صحيح. استخدم الصيغة الدولية مثل +968.";
  if (code.includes("auth/invalid-verification-code")) return "رمز التحقق غير صحيح.";
  if (code.includes("permission-denied")) return "لا توجد صلاحية لتنفيذ هذه العملية. تحقق من Firestore Rules وصلاحية Admin.";
  return error?.message || "حدث خطأ غير متوقع.";
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => null);
}
