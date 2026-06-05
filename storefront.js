let initializeApp;
let getAuth;
let createUserWithEmailAndPassword;
let signInWithEmailAndPassword;
let onAuthStateChanged;
let signOut;
let updateProfile;
let sendPasswordResetEmail;
let GoogleAuthProvider;
let FacebookAuthProvider;
let signInWithPopup;
let signInWithPhoneNumber;
let RecaptchaVerifier;
let getFirestore;
let collection;
let addDoc;
let getDocs;
let deleteDoc;
let doc;
let updateDoc;

const bootMonitor = window.__TAYYA_BOOT = window.__TAYYA_BOOT || {
  started: false,
  shell: false,
  page: false,
  errors: []
};
bootMonitor.started = true;

const firebaseConfig = window.TAYYA_FIREBASE_CONFIG || null;
const IMGBB_API_KEY = window.TAYYA_IMGBB_API_KEY || "";
const ADMIN_EMAILS = ["admin@tayya.om"];
const ADMIN_PHONES = [];
const LOCAL_PHONE_OTP = "123456";
const FREE_SHIPPING_THRESHOLD = 30;
const REMOTE_BOOT_TIMEOUT = 3500;

const KEYS = {
  cart: "tayya_cart",
  customer: "tayya_customer_profile_v1",
  theme: "tayya_theme_v1",
  language: "tayya_language_v1",
  currency: "tayya_currency_v1",
  payment: "tayya_payment_settings_v1",
  coupons: "tayya_coupon_lab_v1",
  productsCache: "tayya_products_cache_v2",
  accountsCache: "tayya_accounts_cache_v1",
  ordersCache: "tayya_orders_cache_v1",
  favorites: "tayya_favorites_v1",
  compare: "tayya_compare_v1",
  addresses: "tayya_address_book_v1",
  reviews: "tayya_reviews_v1",
  productQuestions: "tayya_product_questions_v1",
  content: "tayya_storefront_content_v1",
  localUser: "tayya_local_user_v1",
  newsletter: "tayya_newsletter_v1",
  stockAlerts: "tayya_stock_alerts_v1",
  recentViews: "tayya_recent_views_v1",
  contactInbox: "tayya_contact_inbox_v1",
  savedForLater: "tayya_saved_for_later_v1",
  aiMessages: "tayya_ai_messages_v1"
};

const SESSION_KEYS = {
  introSeen: "tayya_intro_session_v1"
};

const DEMO_PRODUCTS = [
  {
    id: "demo-kummah-1",
    name: "كميم سلطاني فاخر",
    price: 14.5,
    category: "الكميم",
    brand: "TAYYA Atelier",
    color: "عاجي",
    material: "قماش فاخر",
    collection: "Heritage",
    imgUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "كميم أنيق بتفاصيل عمانية هادئة مناسب للمناسبات اليومية والرسمية.",
    stockSizes: { 52: 4, 53: 7, 54: 5, 55: 3 },
    featured: true,
    soldCount: 18,
    rating: 4.8,
    createdAt: "2026-03-10T10:00:00.000Z"
  },
  {
    id: "demo-massar-1",
    name: "مصار كلاسيكي مطرز",
    price: 22,
    category: "المصار",
    brand: "TAYYA Atelier",
    color: "رملي",
    material: "قطن فاخر",
    collection: "Majlis",
    imgUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "مصار عماني فاخر بتطريز متوازن وخامة مريحة للاستخدام الطويل.",
    stockSizes: { 52: 3, 53: 4, 54: 6, 55: 2 },
    featured: true,
    soldCount: 11,
    rating: 4.6,
    createdAt: "2026-03-09T10:00:00.000Z"
  },
  {
    id: "demo-stick-1",
    name: "عصا نخبوية مصقولة",
    price: 18,
    category: "العصي",
    brand: "Majan Line",
    color: "بني",
    material: "خشب طبيعي",
    collection: "Legacy",
    imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "عصا بتشطيب أنيق مناسب للهدايا والاستخدام الشخصي.",
    stockSizes: { 52: 1 },
    soldCount: 5,
    rating: 4.3,
    createdAt: "2026-03-08T10:00:00.000Z"
  },
  {
    id: "demo-shoes-1",
    name: "حذاء جلدي عربي",
    price: 26.5,
    category: "الأحذية",
    brand: "Desert Walk",
    color: "أسود",
    material: "جلد طبيعي",
    collection: "Urban",
    imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "حذاء عربي بخامة جلدية ولمسة عصرية تناسب الإطلالات اليومية.",
    stockSizes: { 52: 0, 53: 3, 54: 4, 55: 4 },
    soldCount: 7,
    rating: 4.4,
    createdAt: "2026-03-07T10:00:00.000Z"
  },
  {
    id: "demo-perfume-1",
    name: "عطر عودي دافئ",
    price: 19.9,
    category: "العطور",
    brand: "TAYYA Scents",
    color: "عنبر",
    material: "مركز عطري",
    collection: "Nobility",
    imgUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "عطر شرقي بلمسات عود وعنبر لإحساس فاخر يدوم طويلًا.",
    stockSizes: { 52: 8 },
    featured: true,
    soldCount: 22,
    rating: 4.9,
    createdAt: "2026-03-06T10:00:00.000Z"
  }
];

const DEMO_ACCOUNTS = [
  {
    id: "demo-account-1",
    name: "حساب مميز جاهز",
    price: 12,
    category: "الحسابات",
    accountType: "Premium",
    brand: "TAYYA Digital",
    imgUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
    ],
    desc: "مثال لحساب رقمي مع صور متعددة ووصف كامل وسعر مستقل.",
    featured: true,
    offer: true,
    createdAt: "2026-03-10T09:00:00.000Z"
  }
];

const CATEGORY_ROUTES = {
  "الكميم": { href: "kummah.html", label: "الكميم", labelEn: "Kummah" },
  "المصار": { href: "massar.html", label: "المصار", labelEn: "Massar" },
  "العصي": { href: "sticks.html", label: "العصي", labelEn: "Sticks" },
  "الأحذية": { href: "shoes.html", label: "الأحذية", labelEn: "Shoes" },
  "العطور": { href: "perfumes.html", label: "العطور", labelEn: "Perfumes" }
};

const LANGUAGE_OPTIONS = {
  ar: { short: "AR", label: "العربية", dir: "rtl", locale: "ar-AE" },
  en: { short: "EN", label: "English", dir: "ltr", locale: "en-US" }
};

const CURRENCY_OPTIONS = {
  OMR: { rate: 1, label: "ر.ع", code: "OMR" },
  AED: { rate: 9.5, label: "د.إ", code: "AED" },
  SAR: { rate: 9.75, label: "ر.س", code: "SAR" },
  USD: { rate: 2.6, label: "USD", code: "USD" },
  EUR: { rate: 2.39, label: "EUR", code: "EUR" }
};

const SHELL_I18N = {
  ar: {
    tagline: "متجر فاخر متعدد الصفحات",
    quickSearch: "بحث سريع",
    theme: "الوضع الليلي",
    account: "حسابي",
    compare: "المقارنة",
    cart: "السلة",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    home: "الرئيسية",
    accounts: "الحسابات",
    about: "من نحن",
    contact: "تواصل",
    faq: "FAQ",
    admin: "الأدمن",
    browse: "التصفح",
    service: "الخدمة",
    policies: "السياسات",
    footerText: "متجر فاخر متعدد الصفحات جاهز للتوسع، مع صفحات مستقلة للأقسام والمنتج والسلة والدفع والإدارة.",
    footerPromo: `شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع • دعم RTL • صفحات مستقلة لكل قسم`,
    support: "الخدمة",
    install: "ثبت التطبيق"
  },
  en: {
    tagline: "Luxury multi-page store",
    quickSearch: "Quick search",
    theme: "Theme",
    account: "Account",
    compare: "Compare",
    cart: "Cart",
    login: "Sign in",
    logout: "Sign out",
    home: "Home",
    accounts: "Accounts",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    admin: "Admin",
    browse: "Browse",
    service: "Service",
    policies: "Policies",
    footerText: "A premium multi-page storefront built for expansion with dedicated pages for categories, product, cart, checkout, and admin.",
    footerPromo: `Free shipping over ${FREE_SHIPPING_THRESHOLD} OMR • RTL ready • Dedicated pages`,
    support: "Support",
    install: "Install app"
  }
};

const SHIPPING_REGIONS = {
  om: {
    label: "عُمان",
    methods: [
      { key: "om-standard", label: "توصيل منزلي قياسي", price: 1.5, eta: "1 - 2 يوم" },
      { key: "om-express", label: "توصيل منزلي سريع", price: 2.5, eta: "خلال 24 ساعة" },
      { key: "om-pickup", label: "استلام من نقطة شحن", price: 0.5, eta: "اليوم نفسه أو التالي" }
    ]
  },
  gcc: {
    label: "الخليج",
    methods: [
      { key: "gcc-standard", label: "شحن خليجي قياسي", price: 3.5, eta: "2 - 4 أيام" },
      { key: "gcc-express", label: "شحن خليجي سريع", price: 5.5, eta: "1 - 2 يوم" }
    ]
  },
  intl: {
    label: "دولي",
    methods: [
      { key: "intl-standard", label: "شحن دولي اقتصادي", price: 7.5, eta: "5 - 8 أيام" },
      { key: "intl-express", label: "شحن دولي سريع", price: 12, eta: "2 - 4 أيام" }
    ]
  }
};

const DEFAULT_PAYMENT_SETTINGS = {
  paypalLink: "",
  stripeLink: "",
  bankAccountName: "TAYYA",
  bankName: "",
  bankIban: "",
  bankNote: ""
};

const DEFAULT_CONTENT_SETTINGS = {
  topRibbon: "شحن مجاني فوق 30 ر.ع • متجر متعدد الصفحات • دفع مرن • تجربة أفخم وأسهل على الجوال والكمبيوتر",
  homeBadge: "Luxury Omani storefront",
  homeTitle: "تجربة متجر فاخر متعددة الصفحات",
  homeText: "انتقل الآن بين الأقسام والمنتجات والسلة والدفع والحساب والإدارة عبر صفحات مستقلة وواضحة بدل صفحة واحدة مزدحمة.",
  campaignTitle: "أسبوع التميز العماني",
  campaignText: "عروض مختارة على الكميم والمصار والعطور مع شحن مجاني أسرع ورحلة دفع أوضح.",
  campaignCode: "EID15",
  campaignEndsAt: "",
  campaignHref: "checkout.html"
};

const DEFAULT_COUPONS = [
  { code: "WELCOME10", percent: 10, minimum: 0, label: "خصم ترحيبي" },
  { code: "EID15", percent: 15, minimum: 30, label: "عرض موسمي" },
  { code: "VIP20", percent: 20, minimum: 60, label: "عرض VIP" }
];

const ROUTE_META = {
  home: { eyebrow: "TAYYA", ctaPrimary: { href: "kummah.html", label: "ابدأ التصفح" }, ctaSecondary: { href: "checkout.html", label: "الدفع" } },
  edits: { eyebrow: "التحرير الموسمي", ctaPrimary: { href: "kummah.html", label: "ابدأ التصفح" }, ctaSecondary: { href: "checkout.html", label: "الدفع" } },
  category: { eyebrow: "Collection", ctaPrimary: { href: "cart.html", label: "السلة" }, ctaSecondary: { href: "checkout.html", label: "الدفع" } },
  accounts: { eyebrow: "Accounts", ctaPrimary: { href: "accounts.html", label: "كل الحسابات" }, ctaSecondary: { href: "admin-accounts.html", label: "إدارتها" } },
  product: { eyebrow: "Product page", ctaPrimary: { href: "cart.html", label: "السلة" }, ctaSecondary: { href: "checkout.html", label: "شراء سريع" } },
  cart: { eyebrow: "Cart", ctaPrimary: { href: "checkout.html", label: "أكمل الطلب" }, ctaSecondary: { href: "index.html", label: "واصل التسوق" } },
  checkout: { eyebrow: "Checkout", ctaPrimary: { href: "cart.html", label: "راجع السلة" }, ctaSecondary: { href: "track-order.html", label: "تتبع الطلب" } },
  account: { eyebrow: "My account", ctaPrimary: { href: "track-order.html", label: "تتبع الطلب" }, ctaSecondary: { href: "vip.html", label: "نادي VIP" } },
  vip: { eyebrow: "VIP club", ctaPrimary: { href: "vip.html", label: "نادي VIP" }, ctaSecondary: { href: "checkout.html", label: "الدفع" } },
  login: { eyebrow: "Secure access", ctaPrimary: { href: "register.html", label: "إنشاء حساب" }, ctaSecondary: { href: "account.html", label: "حسابي" } },
  register: { eyebrow: "Create account", ctaPrimary: { href: "login.html", label: "تسجيل الدخول" }, ctaSecondary: { href: "account.html", label: "حسابي" } },
  about: { eyebrow: "About TAYYA", ctaPrimary: { href: "contact.html", label: "تواصل معنا" }, ctaSecondary: { href: "faq.html", label: "الأسئلة الشائعة" } },
  contact: { eyebrow: "Contact", ctaPrimary: { href: "track-order.html", label: "تتبع الطلب" }, ctaSecondary: { href: "about.html", label: "من نحن" } },
  faq: { eyebrow: "FAQ", ctaPrimary: { href: "contact.html", label: "تواصل معنا" }, ctaSecondary: { href: "privacy.html", label: "الخصوصية" } },
  terms: { eyebrow: "Terms", ctaPrimary: { href: "privacy.html", label: "سياسة الخصوصية" }, ctaSecondary: { href: "contact.html", label: "الدعم" } },
  privacy: { eyebrow: "Privacy", ctaPrimary: { href: "terms.html", label: "الشروط" }, ctaSecondary: { href: "contact.html", label: "الدعم" } },
  "track-order": { eyebrow: "Tracking", ctaPrimary: { href: "account.html", label: "حسابي" }, ctaSecondary: { href: "contact.html", label: "الدعم" } },
  admin: { eyebrow: "Admin", ctaPrimary: { href: "admin-products.html", label: "إدارة المنتجات" }, ctaSecondary: { href: "admin-reports.html", label: "التقارير" } },
  "admin-products": { eyebrow: "Admin products", ctaPrimary: { href: "admin-products.html", label: "المنتجات" }, ctaSecondary: { href: "admin-images.html", label: "رفع الصور" } },
  "admin-accounts": { eyebrow: "Admin accounts", ctaPrimary: { href: "admin-accounts.html", label: "الحسابات" }, ctaSecondary: { href: "accounts.html", label: "عرض عام" } },
  "admin-orders": { eyebrow: "Admin orders", ctaPrimary: { href: "admin-orders.html", label: "الطلبات" }, ctaSecondary: { href: "track-order.html", label: "التتبع" } },
  "admin-offers": { eyebrow: "Offers", ctaPrimary: { href: "admin-offers.html", label: "العروض" }, ctaSecondary: { href: "checkout.html", label: "الدفع" } },
  "admin-images": { eyebrow: "Media", ctaPrimary: { href: "admin-images.html", label: "الصور" }, ctaSecondary: { href: "admin-products.html", label: "المنتجات" } },
  "admin-reports": { eyebrow: "Reports", ctaPrimary: { href: "admin-reports.html", label: "الإحصائيات" }, ctaSecondary: { href: "admin.html", label: "لوحة الأدمن" } },
  "404": { eyebrow: "Page missing", ctaPrimary: { href: "index.html", label: "الرجوع للرئيسية" }, ctaSecondary: { href: "contact.html", label: "تواصل معنا" } }
};

const route = document.body.dataset.page || "home";
const routeCategory = document.body.dataset.category || "";

const state = {
  auth: null,
  db: null,
  firebaseReady: false,
  user: loadJson(KEYS.localUser, null),
  products: loadJson(KEYS.productsCache, []),
  accounts: loadJson(KEYS.accountsCache, []),
  orders: loadJson(KEYS.ordersCache, []),
  cart: loadJson(KEYS.cart, []),
  customer: loadJson(KEYS.customer, {}),
  theme: localStorage.getItem(KEYS.theme) || "light",
  language: localStorage.getItem(KEYS.language) || "ar",
  currency: localStorage.getItem(KEYS.currency) || "OMR",
  favorites: loadJson(KEYS.favorites, []),
  compare: loadJson(KEYS.compare, []),
  reviews: loadJson(KEYS.reviews, {}),
  productQuestions: loadJson(KEYS.productQuestions, {}),
  newsletter: loadJson(KEYS.newsletter, []),
  stockAlerts: loadJson(KEYS.stockAlerts, []),
  recentViews: loadJson(KEYS.recentViews, []),
  savedForLater: loadJson(KEYS.savedForLater, []),
  aiMessages: loadJson(KEYS.aiMessages, []),
  coupons: getCoupons(),
  paymentSettings: { ...DEFAULT_PAYMENT_SETTINGS, ...loadJson(KEYS.payment, DEFAULT_PAYMENT_SETTINGS) },
  contentSettings: { ...DEFAULT_CONTENT_SETTINGS, ...loadJson(KEYS.content, DEFAULT_CONTENT_SETTINGS) },
  filters: {},
  productEditId: "",
  accountEditId: "",
  checkoutCoupon: "",
  checkoutRegion: "om",
  checkoutMethod: "",
  checkoutPayment: "cod",
  orderSearch: "",
  trackQuery: "",
  introOpen: false,
  supportWidgetOpen: false,
  aiAssistantOpen: false,
  commandPaletteOpen: false,
  commandQuery: "",
  installPrompt: null,
  phoneAuth: {
    step: "request",
    phoneNumber: "",
    confirmationResult: null,
    recaptchaVerifier: null,
    localOtp: ""
  }
};

document.addEventListener("DOMContentLoaded", () => {
  init().catch((error) => {
    console.error(error);
    bootMonitor.errors.push(String(error?.message || error || "init-error"));
    window.__tayyaEmergencyBoot?.("تعذر تهيئة المتجر الكامل، لذلك تم فتح نسخة احتياطية بدل بقاء الصفحة على شاشة التحميل.");
    notify("تعذر تهيئة المتجر الآن", "error");
  });
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  state.installPrompt = event;
  renderShell();
});

window.addEventListener("appinstalled", () => {
  state.installPrompt = null;
  notify("تم تثبيت التطبيق بنجاح");
  renderShell();
});

window.addEventListener("error", (event) => {
  console.error(event.error || event.message);
  bootMonitor.errors.push(String(event.error?.message || event.message || "window-error"));
  notify("حدث خطأ JavaScript وتم التقاطه بدل توقف الصفحة", "error");
});

window.addEventListener("unhandledrejection", (event) => {
  console.error(event.reason);
  bootMonitor.errors.push(String(event.reason?.message || event.reason || "promise-rejection"));
  notify("حدث خطأ غير متوقع أثناء التحميل وتم احتواؤه", "error");
});

async function init() {
  applyTheme(state.theme);
  applyLanguage(state.language);
  seedLocalData();
  state.introOpen = shouldShowStoreIntro();
  ensureAiAssistantState();
  renderShell();
  bindEvents();
  await renderPage();
  registerServiceWorker();
  void hydrateRemoteState();
}

function seedLocalData() {
  if (!state.products.length) {
    state.products = DEMO_PRODUCTS.map((item) => normalizeProduct(item));
    saveJson(KEYS.productsCache, state.products);
  }
  if (!state.accounts.length) {
    state.accounts = DEMO_ACCOUNTS.map((item) => normalizeAccount(item));
    saveJson(KEYS.accountsCache, state.accounts);
  }
  migrateStoreIdentity();
}

function migrateStoreIdentity() {
  const legacyCategories = ["الكميم", "المصار", "العصي", "الأحذية", "العطور"];
  const hasLegacyProducts = Array.isArray(state.products) && state.products.some((item) => legacyCategories.includes(String(item.category || "")));
  const hasLegacyAccounts = Array.isArray(state.accounts) && state.accounts.some((item) => /TAYYA Digital|الحسابات/.test(`${item.brand || ""} ${item.category || ""}`));
  const contentSnapshot = JSON.stringify(state.contentSettings || {});
  const hasLegacyContent = /عماني|الكميم|المصار|العطور|Luxury|Omani/i.test(contentSnapshot);

  if (hasLegacyProducts) {
    state.products = DEMO_PRODUCTS.map((item) => normalizeProduct(item));
    saveJson(KEYS.productsCache, state.products);
  }

  if (hasLegacyAccounts) {
    state.accounts = DEMO_ACCOUNTS.map((item) => normalizeAccount(item));
    saveJson(KEYS.accountsCache, state.accounts);
  }

  if (hasLegacyContent) {
    state.contentSettings = { ...DEFAULT_CONTENT_SETTINGS };
    saveJson(KEYS.content, state.contentSettings);
  }
}

function shouldShowStoreIntro() {
  return false;
}

function markStoreIntroSeen() {
  try {
    sessionStorage.setItem(SESSION_KEYS.introSeen, "1");
  } catch {
    // ignore sessionStorage failures and keep the intro dismissible in-memory
  }
}

function ensureAiAssistantState() {
  if (Array.isArray(state.aiMessages) && state.aiMessages.length) return;
  state.aiMessages = [
    {
      role: "assistant",
      text: "أنا المساعد الذكي داخل المتجر. اسألني عن أفضل المنتجات، الشحن، الدفع، أو اطلب مني ترشيحًا سريعًا حسب ذوقك.",
      links: [
        { href: "kummah.html", label: "الكميم" },
        { href: "checkout.html", label: "الدفع" }
      ]
    }
  ];
  saveJson(KEYS.aiMessages, state.aiMessages);
}

async function hydrateRemoteState() {
  const firebaseReady = await withTimeout(initFirebase(), REMOTE_BOOT_TIMEOUT, false);
  await Promise.all([
    loadProducts(Boolean(firebaseReady)),
    loadAccounts(Boolean(firebaseReady))
  ]);
  if (needsOrders(route)) await loadOrders(Boolean(firebaseReady));
  renderShell();
  await renderPage();
}

async function initFirebase() {
  if (!firebaseConfig?.apiKey) {
    return useLocalFirebaseFallback();
  }

  try {
    const [firebaseApp, firebaseAuth, firebaseDb] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js")
    ]);
    initializeApp = firebaseApp.initializeApp;
    getAuth = firebaseAuth.getAuth;
    createUserWithEmailAndPassword = firebaseAuth.createUserWithEmailAndPassword;
    signInWithEmailAndPassword = firebaseAuth.signInWithEmailAndPassword;
    onAuthStateChanged = firebaseAuth.onAuthStateChanged;
    signOut = firebaseAuth.signOut;
    updateProfile = firebaseAuth.updateProfile;
    sendPasswordResetEmail = firebaseAuth.sendPasswordResetEmail;
    GoogleAuthProvider = firebaseAuth.GoogleAuthProvider;
    FacebookAuthProvider = firebaseAuth.FacebookAuthProvider;
    signInWithPopup = firebaseAuth.signInWithPopup;
    signInWithPhoneNumber = firebaseAuth.signInWithPhoneNumber;
    RecaptchaVerifier = firebaseAuth.RecaptchaVerifier;
    getFirestore = firebaseDb.getFirestore;
    collection = firebaseDb.collection;
    addDoc = firebaseDb.addDoc;
    getDocs = firebaseDb.getDocs;
    deleteDoc = firebaseDb.deleteDoc;
    doc = firebaseDb.doc;
    updateDoc = firebaseDb.updateDoc;

    const app = initializeApp(firebaseConfig);
    state.auth = getAuth(app);
    state.db = getFirestore(app);
    state.firebaseReady = true;
    await Promise.all([loadProducts(true), loadAccounts(true)]);
    if (needsOrders(route)) await loadOrders(true);
    renderShell();
    await renderPage();
    onAuthStateChanged(state.auth, async (user) => {
      state.user = normalizeAuthUser(user);
      if (state.user) {
        saveJson(KEYS.localUser, state.user);
        syncCustomerProfileFromUser(state.user);
      } else {
        localStorage.removeItem(KEYS.localUser);
      }
      if (needsOrders(route) && (isAdmin() || route === "account" || route === "track-order")) {
        await loadOrders(true);
      }
      renderShell();
      await renderPage();
    });
  } catch (error) {
    useLocalFirebaseFallback();
    notify("تم تشغيل المتجر بوضع محلي احتياطي لأن Firebase غير متاح الآن", "error");
    return false;
  }
  return true;
}

function useLocalFirebaseFallback() {
  state.firebaseReady = false;
  state.auth = null;
  state.db = null;
  if (!state.products.length) state.products = DEMO_PRODUCTS.map((item) => normalizeProduct(item));
  if (!state.accounts.length) state.accounts = DEMO_ACCOUNTS.map((item) => normalizeAccount(item));
  saveJson(KEYS.productsCache, state.products);
  saveJson(KEYS.accountsCache, state.accounts);
  return false;
}

async function loadProducts(force = false) {
  if (!state.db) {
    if (!state.products.length || force) {
      state.products = (loadJson(KEYS.productsCache, []).length ? loadJson(KEYS.productsCache, []) : DEMO_PRODUCTS).map((item) => normalizeProduct(item));
      saveJson(KEYS.productsCache, state.products);
    }
    return state.products;
  }
  if (!force && state.products.length) return state.products;
  try {
    const snap = await getDocs(collection(state.db, "products"));
    state.products = [];
    snap.forEach((item) => state.products.push(normalizeProduct({ id: item.id, ...item.data() })));
    state.products.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    saveJson(KEYS.productsCache, state.products);
  } catch (error) {
    if (!state.products.length) throw error;
  }
  return state.products;
}

async function loadAccounts(force = false) {
  if (!state.db) {
    if (!state.accounts.length || force) {
      state.accounts = (loadJson(KEYS.accountsCache, []).length ? loadJson(KEYS.accountsCache, []) : DEMO_ACCOUNTS).map((item) => normalizeAccount(item));
      saveJson(KEYS.accountsCache, state.accounts);
    }
    return state.accounts;
  }
  if (!force && state.accounts.length) return state.accounts;
  try {
    const snap = await getDocs(collection(state.db, "accounts"));
    state.accounts = [];
    snap.forEach((item) => state.accounts.push(normalizeAccount({ id: item.id, ...item.data() })));
    state.accounts.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    saveJson(KEYS.accountsCache, state.accounts);
  } catch (error) {
    if (!state.accounts.length) state.accounts = [];
  }
  return state.accounts;
}

async function loadOrders(force = false) {
  if (!state.db) {
    if (force || !state.orders.length) state.orders = loadJson(KEYS.ordersCache, []);
    return state.orders;
  }
  if (!force && state.orders.length) return state.orders;
  try {
    const snap = await getDocs(collection(state.db, "orders"));
    state.orders = [];
    snap.forEach((item) => state.orders.push({ id: item.id, ...item.data() }));
    state.orders.sort((a, b) => getDateValue(b.createdAt || b.date) - getDateValue(a.createdAt || a.date));
    saveJson(KEYS.ordersCache, state.orders);
  } catch (error) {
    if (!state.orders.length) state.orders = [];
  }
  return state.orders;
}

function renderShell() {
  const app = document.getElementById("app");
  if (!app) return;
  const hero = getHeroData();
  const adminNav = isAdmin() ? '<a href="admin.html" class="' + (route.startsWith("admin") ? "is-active" : "") + '">' + escapeHtml(t("admin", "الأدمن")) + "</a>" : "";
  const ribbonText = state.language === "en"
    ? `Free shipping over ${FREE_SHIPPING_THRESHOLD} OMR • Multi-page store • Flexible checkout`
    : state.contentSettings.topRibbon;
  app.innerHTML = [
    '<div class="store-shell">',
    '  <div class="top-ribbon"><div class="top-ribbon__inner">' + escapeHtml(ribbonText) + "</div></div>",
    '  <header class="site-header">',
    '    <div class="header__inner">',
    '      <a class="brand" href="index.html">',
    '        <span class="brand__mark">ط</span>',
    '        <span class="brand__text"><strong>طَيّة</strong><span>' + escapeHtml(t("tagline", "Luxury multi-page store")) + "</span></span>",
    "      </a>",
    '      <div class="header-actions">',
    '        <button class="icon-button" type="button" data-action="toggle-command" title="' + escapeHtml(t("quickSearch", "بحث سريع")) + '"><i class="fas fa-magnifying-glass"></i></button>',
    '        <button class="icon-button" type="button" data-action="toggle-theme" title="' + escapeHtml(t("theme", "الوضع الليلي")) + '"><i class="fas ' + (state.theme === "dark" ? "fa-sun" : "fa-moon") + '"></i></button>',
    '        <button class="header-chip header-chip--button" type="button" data-action="toggle-language"><i class="fas fa-language"></i><span>' + escapeHtml(LANGUAGE_OPTIONS[state.language]?.short || "AR") + "</span></button>",
    '        <button class="header-chip header-chip--button" type="button" data-action="toggle-currency"><i class="fas fa-coins"></i><span>' + escapeHtml(state.currency) + "</span></button>",
    state.installPrompt ? '        <button class="header-chip header-chip--button" type="button" data-action="install-app"><i class="fas fa-download"></i><span>' + escapeHtml(t("install", "ثبت التطبيق")) + "</span></button>" : "",
    '        <a class="header-chip" href="account.html"><i class="fas fa-id-card"></i><span>' + escapeHtml(state.user ? getUserDisplayLabel() : t("account", "حسابي")) + "</span></a>",
    '        <button class="header-chip header-chip--button" type="button" data-action="scroll-compare"><i class="fas fa-scale-balanced"></i><span>' + escapeHtml(t("compare", "المقارنة")) + '</span><b class="cart-counter">' + getCompareItems().length + "</b></button>",
    '        <a class="header-chip" href="cart.html"><i class="fas fa-bag-shopping"></i><span>' + escapeHtml(t("cart", "السلة")) + '</span><b class="cart-counter">' + getCartCount() + "</b></a>",
    state.user
      ? '        <button class="icon-button" type="button" data-action="logout" title="' + escapeHtml(t("logout", "تسجيل الخروج")) + '"><i class="fas fa-right-from-bracket"></i></button>'
      : '        <a class="icon-button" href="login.html" title="' + escapeHtml(t("login", "تسجيل الدخول")) + '"><i class="fas fa-user"></i></a>',
    "      </div>",
    "    </div>",
    "  </header>",
    '  <nav class="site-nav">',
    '    <div class="nav__inner">',
    '      <div class="nav-links">',
    '        <a href="index.html" class="' + activeClass("home") + '">' + escapeHtml(t("home", "الرئيسية")) + '</a>',
    '        <a href="kummah.html" class="' + currentFileMatches("kummah.html") + '">' + escapeHtml(getCategoryLabel("الكميم")) + '</a>',
    '        <a href="massar.html" class="' + currentFileMatches("massar.html") + '">' + escapeHtml(getCategoryLabel("المصار")) + '</a>',
    '        <a href="sticks.html" class="' + currentFileMatches("sticks.html") + '">' + escapeHtml(getCategoryLabel("العصي")) + '</a>',
    '        <a href="shoes.html" class="' + currentFileMatches("shoes.html") + '">' + escapeHtml(getCategoryLabel("الأحذية")) + '</a>',
    '        <a href="perfumes.html" class="' + currentFileMatches("perfumes.html") + '">' + escapeHtml(getCategoryLabel("العطور")) + '</a>',
    '        <a href="accounts.html" class="' + activeClass("accounts") + '">' + escapeHtml(t("accounts", "الحسابات")) + "</a>",
    "      </div>",
    '      <div class="nav-links--secondary">',
    '        <a href="about.html" class="' + activeClass("about") + '">' + escapeHtml(t("about", "من نحن")) + '</a>',
    '        <a href="contact.html" class="' + activeClass("contact") + '">' + escapeHtml(t("contact", "تواصل")) + '</a>',
    '        <a href="faq.html" class="' + activeClass("faq") + '">' + escapeHtml(t("faq", "FAQ")) + "</a>",
             adminNav,
    "      </div>",
    "    </div>",
    "  </nav>",
    '  <main class="page-shell page-shell--' + escapeHtml(route) + '">',
    '    <div class="breadcrumbs">' + renderBreadcrumbs() + "</div>",
    '    <section class="page-hero">',
    '      <div class="page-hero__grid">',
    "        <div>",
    '          <div class="page-hero__eyebrow"><i class="fas fa-gem"></i><span>' + escapeHtml(hero.eyebrow) + "</span></div>",
    '          <h1>' + escapeHtml(hero.title) + "</h1>",
    '          <p>' + escapeHtml(hero.description) + "</p>",
    '          <div class="hero-actions" style="margin-top:18px;">',
    '            <a class="primary-button" href="' + escapeHtml(hero.primary.href) + '">' + escapeHtml(hero.primary.label) + "</a>",
    '            <a class="ghost-button" href="' + escapeHtml(hero.secondary.href) + '">' + escapeHtml(hero.secondary.label) + "</a>",
    "          </div>",
    "        </div>",
    '        <aside class="hero-card">',
    '          <strong>' + escapeHtml(hero.asideTitle) + "</strong>",
    '          <p>' + escapeHtml(hero.asideText) + "</p>",
    '          <div class="hero-card__stats">',
    renderHeroStats(),
    "          </div>",
    "        </aside>",
    "      </div>",
    "    </section>",
    '    <div class="section-stack" id="page-content"></div>',
    "  </main>",
    '  <footer class="site-footer">',
    '    <div class="footer__inner">',
    '      <div class="footer-grid">',
    '        <div><h4>طَيّة</h4><p>' + escapeHtml(t("footerText", "متجر فاخر متعدد الصفحات جاهز للتوسع، مع صفحات مستقلة للأقسام والمنتج والسلة والدفع والإدارة.")) + '</p></div>',
    '        <div><h4>' + escapeHtml(t("browse", "التصفح")) + '</h4><a href="kummah.html">' + escapeHtml(getCategoryLabel("الكميم")) + '</a><a href="massar.html">' + escapeHtml(getCategoryLabel("المصار")) + '</a><a href="accounts.html">' + escapeHtml(t("accounts", "الحسابات")) + '</a></div>',
    '        <div><h4>' + escapeHtml(t("service", "الخدمة")) + '</h4><a href="track-order.html">تتبع الطلب</a><a href="faq.html">الأسئلة الشائعة</a><a href="contact.html">' + escapeHtml(t("contact", "تواصل")) + '</a></div>',
    '        <div><h4>' + escapeHtml(t("policies", "السياسات")) + '</h4><a href="terms.html">الشروط والأحكام</a><a href="privacy.html">سياسة الخصوصية</a><a href="about.html">' + escapeHtml(t("about", "من نحن")) + '</a></div>',
    "      </div>",
    '      <div class="footer-bottom"><span>© 2026 TAYYA</span><span>' + escapeHtml(t("footerPromo", `شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع • دعم RTL • صفحات مستقلة لكل قسم`)) + '</span></div>',
    "    </div>",
    "  </footer>",
    renderCommandPalette(),
    renderCompareTray(),
    renderSupportWidget(),
    renderAiConcierge(),
    renderStoreIntroOverlay(),
    '  <div class="mobile-dock"><div class="mobile-dock__inner">',
    '    <a href="index.html" class="' + activeClass("home") + '"><i class="fas fa-house"></i><span>' + escapeHtml(t("home", "الرئيسية")) + '</span></a>',
    '    <a href="kummah.html" class="' + currentFileMatches("kummah.html") + '"><i class="fas fa-shirt"></i><span>' + escapeHtml(getCategoryLabel("الكميم")) + '</span></a>',
    '    <a href="accounts.html" class="' + activeClass("accounts") + '"><i class="fas fa-layer-group"></i><span>' + escapeHtml(t("accounts", "الحسابات")) + '</span></a>',
    '    <a href="cart.html" class="' + activeClass("cart") + '"><i class="fas fa-bag-shopping"></i><span>' + escapeHtml(t("cart", "السلة")) + '</span></a>',
    '    <a href="account.html" class="' + activeClass("account") + '"><i class="fas fa-user"></i><span>' + escapeHtml(t("account", "حسابي")) + "</span></a>",
    "  </div></div>",
    '  <div class="toast-stack" id="toast-stack"></div>',
    "</div>"
  ].join("");
  bootMonitor.shell = true;
}

async function renderPage() {
  const root = document.getElementById("page-content");
  if (!root) return;
  try {
    switch (route) {
      case "home":
        root.innerHTML = renderHomePageV3();
        break;
      case "edits":
        root.innerHTML = renderEditorialPage();
        break;
      case "category":
        root.innerHTML = renderCategoryPage(routeCategory);
        break;
      case "accounts":
        root.innerHTML = renderAccountsPage();
        break;
      case "product":
        root.innerHTML = renderProductPageV2();
        break;
      case "cart":
        root.innerHTML = renderCartPage();
        break;
      case "checkout":
        root.innerHTML = renderCheckoutPage();
        break;
      case "about":
        root.innerHTML = renderAboutPageV2();
        break;
      case "contact":
        root.innerHTML = renderContactPage();
        break;
      case "faq":
        root.innerHTML = renderFaqPage();
        break;
      case "terms":
        root.innerHTML = renderInfoPage("الشروط والأحكام", [
          { title: "الطلبات", body: "لا يُعتمد الطلب نهائيًا إلا بعد تأكيده وحفظه في النظام." },
          { title: "الأسعار", body: "الأسعار قابلة للتحديث حسب العروض والمخزون، ويُعتمد السعر الظاهر وقت إتمام الطلب." },
          { title: "الشحن", body: "تختلف مدة الشحن حسب المنطقة وطريقة التوصيل المختارة في صفحة الدفع." }
        ]);
        break;
      case "privacy":
        root.innerHTML = renderInfoPage("سياسة الخصوصية", [
          { title: "البيانات", body: "بيانات العميل تُستخدم لتجهيز الطلب والتوصيل والدعم وخدمة ما بعد البيع." },
          { title: "الدفع", body: "إعدادات الدفع وروابطه تُدار من لوحة الأدمن، ولا نخزن أي بيانات بطاقات على هذه الواجهة." },
          { title: "الكوكيز", body: "يُستخدم التخزين المحلي لحفظ السلة والعناوين والتفضيلات لتجربة أسرع." }
        ]);
        break;
      case "track-order":
        root.innerHTML = renderTrackOrderPage();
        break;
      case "login":
        root.innerHTML = renderLoginPage();
        break;
      case "register":
        root.innerHTML = renderRegisterPage();
        break;
      case "account":
        root.innerHTML = await renderCustomerAccountPageV2();
        break;
      case "vip":
        root.innerHTML = renderVipClubPage();
        break;
      case "admin":
        root.innerHTML = await renderAdminDashboardPageV2();
        break;
      case "admin-products":
        root.innerHTML = await renderAdminProductsPage();
        break;
      case "admin-accounts":
        root.innerHTML = await renderAdminAccountsPage();
        break;
      case "admin-orders":
        root.innerHTML = await renderAdminOrdersPage();
        break;
      case "admin-offers":
        root.innerHTML = await renderAdminOffersPage();
        break;
      case "admin-images":
        root.innerHTML = await renderAdminImagesPage();
        break;
      case "admin-reports":
        root.innerHTML = await renderAdminReportsPageV2();
        break;
      case "404":
        root.innerHTML = render404Page();
        break;
      default:
        root.innerHTML = render404Page();
        break;
    }
  } catch (error) {
    console.error(error);
    bootMonitor.errors.push(String(error?.message || error || "render-page-error"));
    root.innerHTML = render404Page("حدث خطأ أثناء تحميل هذه الصفحة، لكن المتجر ما زال يعمل. جرّب التحديث أو افتح الصفحة من جديد.");
    notify("تم التقاط خطأ داخل الصفحة بدل ظهور شاشة فارغة", "error");
  }
  bootMonitor.page = true;
  if (route !== "product") {
    updateDocumentMeta(document.body.dataset.title || getHeroData().title, document.body.dataset.description || getHeroData().description);
  }
  hydratePageState();
  if (state.commandPaletteOpen) {
    const input = document.getElementById("command-palette-search");
    if (input instanceof HTMLInputElement) {
      input.focus();
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  }
}

function renderHomePage() {
  const visibleProducts = getVisibleProducts();
  const featured = [...visibleProducts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a)).slice(0, 4);
  const latest = visibleProducts.slice(0, 4);
  const accountSpotlight = getVisibleAccounts().slice(0, 3);
  const categories = Object.keys(CATEGORY_ROUTES).map((category) => {
    const href = CATEGORY_ROUTES[category].href;
    const items = visibleProducts.filter((item) => item.category === category);
    const count = items.length;
    const cover = items[0]?.imgUrl || "";
    const startingPrice = getCategoryStartingPrice(category);
    return `
      <a class="category-tile category-tile--rich" href="${href}" style="${cover ? `background-image: linear-gradient(180deg, rgba(15, 6, 8, 0.05), rgba(90, 11, 20, 0.94)), url('${escapeHtml(cover)}');` : ""}">
        <span class="category-kicker">${escapeHtml(CATEGORY_ROUTES[category].label)}</span>
        <strong>${escapeHtml(category)}</strong>
        <p>${count} منتج متاح ${startingPrice ? `• يبدأ من ${formatPrice(startingPrice)}` : ""}</p>
      </a>
    `;
  }).join("");

  const testimonials = [
    { name: "عميل دائم", text: "التصفح صار أسرع بكثير، وصفحة المنتج والدفع أوضح من قبل." },
    { name: "طلب خاص", text: "الانتقال بين الأقسام الآن مريح جدًا ويعطي إحساس متجر فعلي وليس صفحة طويلة." },
    { name: "متابعة شراء", text: "السلة والدفع والحسابات المنفصلة رفعت الثقة وسهولة الاستخدام بشكل واضح." }
  ];

  return `
    <section class="lux-home-grid">
      <article class="lux-home-panel lux-home-panel--hero">
        <span class="category-kicker">Premium storefront</span>
        <h2>واجهة أهدأ، تنقل أسرع، وتجربة شراء أقرب للمتاجر العالمية</h2>
        <p>بنية متعددة الصفحات، بطاقات أوضح، وشراء يبدأ من الأقسام ثم ينتهي في سلة ودفع منظمين جدًا.</p>
        <div class="chip-row">
          <span class="stat-chip">إطلاق أسرع</span>
          <span class="stat-chip">صفحات مستقلة</span>
          <span class="stat-chip">Responsive فعلي</span>
        </div>
      </article>
      <article class="lux-home-panel">
        <strong>${visibleProducts.length}</strong>
        <p class="mini-note">منتجات جاهزة للعرض الآن عبر أقسام مستقلة وواضحة.</p>
      </article>
      <article class="lux-home-panel">
        <strong>${state.orders.length}</strong>
        <p class="mini-note">طلبات محفوظة بين المتابعة والسلة والدفع والتقارير.</p>
      </article>
      <article class="lux-home-panel">
        <strong>${accountSpotlight.length}</strong>
        <p class="mini-note">عناصر رقمية أو حسابات مميزة يمكن إبرازها في صفحة مستقلة.</p>
      </article>
    </section>

    <section class="trust-band">
      <article><strong>شحن مجاني</strong><span>فوق ${FREE_SHIPPING_THRESHOLD} ر.ع</span></article>
      <article><strong>دفع متنوع</strong><span>PayPal وStripe والتحويل والاستلام</span></article>
      <article><strong>دعم مباشر</strong><span>واتساب وصفحة تواصل وتتبع طلب</span></article>
      <article><strong>إدارة كاملة</strong><span>منتجات وحسابات وصور وتقارير منفصلة</span></article>
    </section>

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>أقسام مستقلة بواجهة تحريرية أفخم</h2>
          <p>كل قسم أصبح له حضور بصري أوضح مع صفحة مستقلة، بحث داخلي، وترتيب وفلاتر ومحتوى يليق به.</p>
        </div>
      </div>
      <div class="category-grid">${categories}</div>
    </section>

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>الأكثر جذبًا الآن</h2>
          <p>منتجات تم إبرازها حسب الجاذبية والطلب والمظهر العام لتقود الزائر بسرعة إلى صفحة المنتج.</p>
        </div>
        <div class="chip-row">
          <span class="stat-chip">شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع</span>
          <span class="stat-chip">دفع متعدد</span>
          <span class="stat-chip">لوحة أدمن منفصلة</span>
        </div>
      </div>
      ${renderCatalogGrid(featured)}
    </section>

    <section class="stats-grid">
      <article class="stat-card"><strong>${visibleProducts.length}</strong><p class="mini-note">منتجات عامة متاحة</p></article>
      <article class="stat-card"><strong>${state.accounts.filter((item) => !item.hidden).length}</strong><p class="mini-note">حسابات قابلة للإدارة والبيع</p></article>
      <article class="stat-card"><strong>${Object.keys(CATEGORY_ROUTES).length}</strong><p class="mini-note">أقسام رئيسية بصفحات مستقلة</p></article>
      <article class="stat-card"><strong>${getCartCount()}</strong><p class="mini-note">عناصر محفوظة في السلة</p></article>
    </section>

    ${accountSpotlight.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>قسم الحسابات المميزة</h2>
            <p>تمت ترقيته كقسم منفصل يمكن استخدامه كمنتجات رقمية، حسابات جاهزة، أو عروض خاصة.</p>
          </div>
          <a class="ghost-button" href="accounts.html">عرض الكل</a>
        </div>
        ${renderCatalogGrid(accountSpotlight, "account")}
      </section>
    ` : ""}

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>أحدث الإضافات</h2>
          <p>عرض أحدث المنتجات بشكل سريع مع إمكانية الانتقال لصفحة المنتج نفسها.</p>
        </div>
      </div>
      ${renderCatalogGrid(latest)}
    </section>

    <section class="section-card editorial-banner">
      <div class="editorial-banner__copy">
        <span class="category-kicker">اتجاه المتجر</span>
        <h2>المتجر الآن جاهز ليأخذ شكل علامة أقوى، لا مجرد صفحة بيع</h2>
        <p>مع كل جولة تطوير، نستطيع دفع الواجهة أكثر نحو طابع تحريري فاخر وتجربة تحويل أعلى في الصفحات الأكثر أهمية.</p>
      </div>
      <div class="testimonial-grid">
        ${testimonials.map((item) => `
          <article class="testimonial-card">
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.text)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderGrandOpening(visibleProducts, featured, subscribers, recentViews, promoPicks, accountSpotlight) {
  const heroFocus = featured[0] || visibleProducts[0] || promoPicks[0] || accountSpotlight[0] || null;
  const signatureCategories = Object.keys(CATEGORY_ROUTES).slice(0, 4).map((category) => {
    const items = visibleProducts.filter((item) => item.category === category);
    const cover = items[0]?.imgUrl || heroFocus?.imgUrl || "";
    const startingPrice = getCategoryStartingPrice(category);
    return `
      <a class="salon-card" href="${CATEGORY_ROUTES[category].href}" style="${cover ? `background-image: linear-gradient(180deg, rgba(12, 6, 8, 0.08), rgba(39, 10, 18, 0.92)), url('${escapeHtml(cover)}');` : ""}">
        <span class="category-kicker">Signature line</span>
        <strong>${escapeHtml(category)}</strong>
        <p>${items.length} قطعة ${startingPrice ? `• تبدأ من ${formatPrice(startingPrice)}` : "• تشكيلة منتقاة"}</p>
      </a>
    `;
  }).join("");

  return `
    <section class="grand-intro" style="${heroFocus?.imgUrl ? `background-image: linear-gradient(125deg, rgba(9, 4, 6, 0.78), rgba(60, 10, 20, 0.76)), url('${escapeHtml(heroFocus.imgUrl)}');` : ""}">
      <div class="grand-intro__content">
        <div class="chip-row">
          <span class="stat-chip">House of TAYYA</span>
          <span class="stat-chip">Curated for mobile</span>
          <span class="stat-chip">Luxury shopping flow</span>
        </div>
        <h1>افتتاحية أرقى لمتجر يبيع بثقة ويعرض الهوية العُمانية بأسلوب عالمي.</h1>
        <p>صممت بداية المتجر لتقود العميل من أول لحظة نحو الأقسام الأهم والعروض والمنتجات المميزة، مع إحساس تحريري فاخر ومسار شراء أوضح وأسرع.</p>
        <div class="hero-actions">
          <a class="primary-button" href="kummah.html">ابدأ التصفح</a>
          <a class="ghost-button" href="checkout.html">تسوّق سريع</a>
          <a class="ghost-button" href="accounts.html">الحسابات المميزة</a>
        </div>
        <div class="grand-intro__stats">
          <article class="grand-stat"><strong>${visibleProducts.length}</strong><span>منتجًا في المتجر</span></article>
          <article class="grand-stat"><strong>${featured.length}</strong><span>قطعة بارزة الآن</span></article>
          <article class="grand-stat"><strong>${subscribers.length}</strong><span>مشتركًا مهتمًا</span></article>
          <article class="grand-stat"><strong>${FREE_SHIPPING_THRESHOLD}</strong><span>حد الشحن المجاني</span></article>
        </div>
      </div>
      <aside class="grand-intro__aside">
        <article class="grand-note">
          <span class="category-kicker">Editorial focus</span>
          <h3>${escapeHtml(heroFocus?.name || "منتجات مختارة بعناية")}</h3>
          <p>${escapeHtml(heroFocus?.desc || "التجربة الافتتاحية الجديدة تضع أفضل ما في المتجر في الواجهة مباشرة بدل إخفائه داخل التصفح الطويل.")}</p>
          <div class="chip-row">
            <span class="stat-chip">${formatPrice(heroFocus?.price || 0)}</span>
            <span class="stat-chip">${escapeHtml(heroFocus?.category || "منتج مميز")}</span>
          </div>
          ${heroFocus ? `<a class="ghost-button" href="product.html?id=${encodeURIComponent(heroFocus.id)}${heroFocus.type === "account" ? "&type=account" : ""}">افتح المنتج</a>` : ""}
        </article>
        <article class="grand-note">
          <span class="category-kicker">Journey map</span>
          <div class="route-pill-list">
            <a class="route-pill" href="kummah.html"><strong>1</strong><span>اختر القسم</span></a>
            <a class="route-pill" href="cart.html"><strong>2</strong><span>راجع السلة</span></a>
            <a class="route-pill" href="checkout.html"><strong>3</strong><span>أكمل الدفع</span></a>
            <a class="route-pill" href="track-order.html"><strong>4</strong><span>تتبع الطلب</span></a>
          </div>
        </article>
      </aside>
    </section>

    <section class="luxury-marquee" aria-label="Store highlights">
      <div class="luxury-marquee__track">
        <span>Curated Omani essentials</span>
        <span>فلاتر أسرع وتجربة أنعم</span>
        <span>أسئلة منتجات ومراجعات أوضح</span>
        <span>شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع</span>
        <span>هدايا وتغليف ورسائل إهداء</span>
        <span>متجر متعدد الصفحات</span>
        <span>Curated Omani essentials</span>
        <span>فلاتر أسرع وتجربة أنعم</span>
      </div>
    </section>

    <section class="salon-grid">
      <article class="salon-feature">
        <span class="category-kicker">Luxury entrance</span>
        <h2>قصة دخول تجعل كل قسم يبدو كأنه جناح مستقل داخل متجر فاخر.</h2>
        <p>أضفت افتتاحية تحريرية تبرز الاتجاه البصري للمتجر، مع بطاقات أقسام أرقى، مسار شراء سريع، ونقطة دخول أوضح للمنتجات والعروض والحسابات.</p>
        <div class="chip-row">
          <span class="stat-chip">منتجات مميزة</span>
          <span class="stat-chip">تصنيفات أسرع</span>
          <span class="stat-chip">محتوى أفخم</span>
        </div>
      </article>
      <div class="salon-grid__rail">
        ${signatureCategories}
      </div>
    </section>

    ${(recentViews.length || promoPicks.length || accountSpotlight.length) ? `
      <section class="arrival-deck">
        ${recentViews[0] ? `
          <article class="arrival-deck__card">
            <span class="category-kicker">Recently viewed</span>
            <h3>عودتك أسرع إلى ما لفت انتباهك</h3>
            <p>${escapeHtml(recentViews[0].name)} ${recentViews[0].price ? `• ${formatPrice(recentViews[0].price)}` : ""}</p>
            <a class="ghost-button" href="product.html?id=${encodeURIComponent(recentViews[0].id)}${recentViews[0].type === "account" ? "&type=account" : ""}">افتح العنصر</a>
          </article>
        ` : `
          <article class="arrival-deck__card">
            <span class="category-kicker">New visitor</span>
            <h3>ابدأ من المجموعة الأبرز الآن</h3>
            <p>الواجهة الجديدة تقترح مسارًا أسرع للوصول إلى المنتجات التي تحقق أفضل انطباع أولي.</p>
            <a class="ghost-button" href="massar.html">استكشف المصار</a>
          </article>
        `}
        ${promoPicks[0] ? `
          <article class="arrival-deck__card">
            <span class="category-kicker">Offer mood</span>
            <h3>${escapeHtml(promoPicks[0].name)}</h3>
            <p>قطعة موصى بها للعروض والتقاطعات الشرائية مع وصول مباشر إلى الشراء.</p>
            <a class="ghost-button" href="product.html?id=${encodeURIComponent(promoPicks[0].id)}">افتح العرض</a>
          </article>
        ` : ""}
        ${accountSpotlight[0] ? `
          <article class="arrival-deck__card">
            <span class="category-kicker">Digital line</span>
            <h3>${escapeHtml(accountSpotlight[0].name)}</h3>
            <p>قسم الحسابات صار جزءًا واضحًا من الافتتاحية بدل أن يبقى مخفيًا خلف التصفح التقليدي.</p>
            <a class="ghost-button" href="accounts.html">عرض الحسابات</a>
          </article>
        ` : ""}
      </section>
    ` : ""}
  `;
}

function renderHomePageV2() {
  const visibleProducts = getVisibleProducts();
  const featured = [...visibleProducts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a)).slice(0, 4);
  const latest = visibleProducts.slice(0, 4);
  const accountSpotlight = getVisibleAccounts().slice(0, 3);
  const personalized = getPersonalizedRecommendations(4);
  const recentViews = getRecentlyViewedItems().slice(0, 4);
  const promoPicks = getPromoPicks(4);
  const subscribers = getNewsletterSubscribers();
  const categories = Object.keys(CATEGORY_ROUTES).map((category) => {
    const items = visibleProducts.filter((item) => item.category === category);
    const cover = items[0]?.imgUrl || "";
    const startingPrice = getCategoryStartingPrice(category);
    return `
      <a class="category-tile category-tile--rich" href="${CATEGORY_ROUTES[category].href}" style="${cover ? `background-image: linear-gradient(180deg, rgba(15, 6, 8, 0.06), rgba(90, 11, 20, 0.94)), url('${escapeHtml(cover)}');` : ""}">
        <span class="category-kicker">${escapeHtml(CATEGORY_ROUTES[category].label)}</span>
        <strong>${escapeHtml(category)}</strong>
        <p>${items.length} منتج متاح ${startingPrice ? `• يبدأ من ${formatPrice(startingPrice)}` : ""}</p>
      </a>
    `;
  }).join("");
  const testimonials = [
    { name: "عميل دائم", text: "التصفح صار أسرع، والانتقال بين الأقسام والمنتجات أوضح وأكثر راحة من قبل." },
    { name: "طلب خاص", text: "المتجر الآن يشعرني أنني داخل منصة فعلية، لا مجرد صفحة كبيرة ومزدحمة." },
    { name: "متابعة شراء", text: "السلة والحساب والدفع والمراجعات مترابطة بطريقة أوضح وتبني ثقة أعلى." }
  ];

  return `
    <section class="lux-home-grid">
      <article class="lux-home-panel lux-home-panel--hero">
        <span class="category-kicker">Premium storefront</span>
        <h2>مركز بيع فاخر يجمع الاكتشاف والعروض والتوصيات في واجهة واحدة</h2>
        <p>نسخة رئيسية أقوى للمبيعات: أقسام أوضح، عروض جاهزة، توصيات مخصصة، وطبقة نمو يمكن تطويرها بسهولة لاحقًا.</p>
        <div class="chip-row">
          <span class="stat-chip">واجهة أفخم</span>
          <span class="stat-chip">اكتشاف أذكى</span>
          <span class="stat-chip">نمو وتسويق</span>
        </div>
      </article>
      <article class="lux-home-panel">
        <strong>${visibleProducts.length}</strong>
        <p class="mini-note">منتجات موزعة عبر أقسام مستقلة مع صفحات منتج وسلة ودفع وحساب.</p>
      </article>
      <article class="lux-home-panel">
        <strong>${state.orders.length}</strong>
        <p class="mini-note">طلبات محفوظة تدعم المتابعة والتقارير وتطوير رحلة العميل.</p>
      </article>
      <article class="lux-home-panel">
        <strong>${subscribers.length}</strong>
        <p class="mini-note">مشتركون مهتمون يمكن البناء عليهم في التسويق والتنبيهات لاحقًا.</p>
      </article>
    </section>

    <section class="trust-band">
      <article><strong>شحن مجاني</strong><span>فوق ${FREE_SHIPPING_THRESHOLD} ر.ع مع ملخص واضح في السلة والدفع</span></article>
      <article><strong>دفع متنوع</strong><span>PayPal وStripe والتحويل البنكي والدفع عند الاستلام</span></article>
      <article><strong>دعم مباشر</strong><span>صفحات تواصل وتتبع وواتساب وسجل حساب منظم</span></article>
      <article><strong>إدارة كاملة</strong><span>لوحات مستقلة للمنتجات والحسابات والطلبات والصور والتقارير</span></article>
    </section>

    ${renderCampaignSpotlight()}

    ${renderBrandShowcase(visibleProducts, featured, accountSpotlight, subscribers)}

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>أقسام مستقلة بواجهة تحريرية أفخم</h2>
          <p>كل قسم يظهر بصورة أوضح وبداية سعر ومحتوى أكثر قوة حتى يصبح الاكتشاف أسرع وأجمل بصريًا.</p>
        </div>
      </div>
      <div class="category-grid">${categories}</div>
    </section>

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>الأكثر جذبًا الآن</h2>
          <p>منتجات تم إبرازها حسب الشعبية والمخزون والانطباع العام لتقود العميل مباشرة إلى صفحات المنتج.</p>
        </div>
        <div class="chip-row">
          <span class="stat-chip">شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع</span>
          <span class="stat-chip">دفع متعدد</span>
          <span class="stat-chip">RTL جاهز</span>
        </div>
      </div>
      ${renderCatalogGrid(featured)}
    </section>

    ${promoPicks.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>عروض جاهزة وتقاطعات شراء</h2>
            <p>قسم يساعد على رفع قيمة السلة عبر منتجات قوية وكوبونات وعناصر قليلة المخزون.</p>
          </div>
          <div class="chip-row">
            ${state.coupons.slice(0, 3).map((coupon) => `<span class="stat-chip">${escapeHtml(coupon.code)} • ${escapeHtml(String(coupon.percent || 0))}%</span>`).join("")}
          </div>
        </div>
        ${renderCatalogGrid(promoPicks)}
      </section>
    ` : ""}

    ${personalized.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>مقترحات مخصصة لك</h2>
            <p>ترتيب يعتمد على المحفوظات والسلة والمشاهدات الأخيرة ليجعل المتجر أكثر ذكاءً حتى بدون باك-إند معقد.</p>
          </div>
        </div>
        ${renderCatalogGrid(personalized, "mixed")}
      </section>
    ` : ""}

    ${accountSpotlight.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>قسم الحسابات المميزة</h2>
            <p>طبقة عرض منفصلة للعناصر الرقمية أو الحسابات الجاهزة حتى لا تضيع وسط المنتجات التقليدية.</p>
          </div>
          <a class="ghost-button" href="accounts.html">عرض الكل</a>
        </div>
        ${renderCatalogGrid(accountSpotlight, "account")}
      </section>
    ` : ""}

    <section class="stats-grid">
      <article class="stat-card"><strong>${visibleProducts.length}</strong><p class="mini-note">منتجات عامة متاحة</p></article>
      <article class="stat-card"><strong>${state.accounts.filter((item) => !item.hidden).length}</strong><p class="mini-note">حسابات قابلة للإدارة والبيع</p></article>
      <article class="stat-card"><strong>${state.coupons.length}</strong><p class="mini-note">عروض وكوبونات نشطة</p></article>
      <article class="stat-card"><strong>${getCartCount()}</strong><p class="mini-note">عناصر محفوظة في السلة</p></article>
    </section>

    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>أحدث الإضافات</h2>
          <p>عرض سريع لأحدث ما أضيف إلى المتجر مع وصول مباشر لصفحة كل منتج.</p>
        </div>
      </div>
      ${renderCatalogGrid(latest)}
    </section>

    ${recentViews.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>شاهدته مؤخرًا</h2>
            <p>عودة سريعة للعناصر التي مررت عليها أثناء التصفح لتقليل التشتت وزيادة الاستمرارية.</p>
          </div>
        </div>
        ${renderCatalogGrid(recentViews, "mixed")}
      </section>
    ` : ""}

    ${renderMarketingSuite(featured, promoPicks, subscribers)}

    <section class="section-card editorial-banner">
      <div class="editorial-banner__copy">
        <span class="category-kicker">Store direction</span>
        <h2>المتجر الآن جاهز ليأخذ شكل علامة أقوى، لا مجرد صفحة بيع</h2>
        <p>أضفت طبقة اكتشاف وتوجيه وتسويق خفيفة داخل الصفحة الرئيسية لتكون نقطة انطلاق حقيقية للمبيعات والنمو.</p>
      </div>
      <div class="testimonial-grid">
        ${testimonials.map((item) => `
          <article class="testimonial-card">
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.text)}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section-card newsletter-panel">
      <div class="newsletter-panel__copy">
        <span class="category-kicker">Growth engine</span>
        <h2>قناة نمو مستمرة عبر البريد والتنبيهات</h2>
        <p>أضفت نموذج اشتراك واضحًا داخل الواجهة، مع حفظ المشتركين والاهتمامات محليًا كبداية عملية قابلة للربط مع أي خدمة بريد لاحقًا.</p>
        <div class="newsletter-stats">
          <article><strong>${subscribers.length}</strong><span>مشترك</span></article>
          <article><strong>${state.favorites.length}</strong><span>محفوظات</span></article>
          <article><strong>${promoPicks.length}</strong><span>عروض بارزة</span></article>
        </div>
      </div>
      <form class="newsletter-panel__form auth-card" id="newsletter-form">
        <h3>اشترك في جديد المتجر</h3>
        <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" value="${escapeHtml(getCurrentCustomerEmail())}" required>
        <div class="chip-row">
          <label class="switch-line"><input type="checkbox" name="news" checked> جديد المنتجات</label>
          <label class="switch-line"><input type="checkbox" name="offers" checked> العروض والخصومات</label>
        </div>
        <button class="primary-button" type="submit">تفعيل الاشتراك</button>
        <p class="mini-note">يمكن لاحقًا ربط هذا النموذج مع خدمة بريد أو واتساب أو حملات آلية بدون تغيير الواجهة.</p>
      </form>
    </section>
  `;
}

function renderHomePageV3() {
  const visibleProducts = getVisibleProducts();
  const featured = [...visibleProducts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a)).slice(0, 4);
  const accountSpotlight = getVisibleAccounts().slice(0, 3);
  const recentViews = getRecentlyViewedItems().slice(0, 4);
  const promoPicks = getPromoPicks(4);
  const subscribers = getNewsletterSubscribers();
  return `${renderGrandOpening(visibleProducts, featured, subscribers, recentViews, promoPicks, accountSpotlight)}${renderSignatureSuite(visibleProducts, featured, promoPicks, subscribers)}${renderEditorialHighlight(visibleProducts, featured, promoPicks)}${renderHomePageV2()}${renderConciergeStrip(featured, promoPicks, subscribers)}`;
}

function renderSignatureSuite(visibleProducts, featured, promoPicks, subscribers) {
  const readyToShip = visibleProducts.filter((item) => getStock(item) > 0).length;
  const limitedPieces = visibleProducts.filter((item) => {
    const stock = getStock(item);
    return stock > 0 && stock <= 4;
  }).length;
  const collections = new Set(visibleProducts.map((item) => String(item.collection || "").trim()).filter(Boolean)).size;
  const heroItem = featured[0] || promoPicks[0] || visibleProducts[0];
  const editorPick = featured[1] || promoPicks[1] || visibleProducts[1] || heroItem;

  return `
    <section class="signature-suite">
      <article class="signature-suite__lead">
        <span class="category-kicker">Maison Tayya</span>
        <h2>تجربة أرقى تبني إحساس العلامة قبل لحظة الشراء وتدفع العميل إلى المنتج المناسب بسرعة وأناقة.</h2>
        <p>أضفت طبقة افتتاحية جديدة تُشعر الزائر أنه داخل متجر فاخر منظم: قطع مختارة، منتجات محدودة، جاهزية شحن، ومسار واضح للوصول إلى أهم ما في المتجر.</p>
        <div class="hero-actions">
          <a class="primary-button" href="${escapeHtml(heroItem ? `product.html?id=${encodeURIComponent(heroItem.id)}` : "index.html")}">افتح القطعة المميزة</a>
          <a class="ghost-button" href="about.html">تعرف على الهوية</a>
        </div>
      </article>
      <div class="signature-suite__grid">
        <article class="signature-card signature-card--feature">
          <span class="tag">Editor's pick</span>
          <strong>${escapeHtml(heroItem?.name || "مختارات مختارة بعناية")}</strong>
          <p>${escapeHtml(heroItem?.desc || "واجهة جديدة تبرز المنتجات التي تستحق أن تقود رحلة العميل من أول زيارة.")}</p>
          <div class="chip-row">
            <span class="stat-chip">${escapeHtml(heroItem?.collection || "تحرير خاص")}</span>
            <span class="stat-chip">${formatPrice(heroItem?.price || 0)}</span>
            <span class="stat-chip">${getStock(heroItem)} متاح</span>
          </div>
          <a class="ghost-button" href="${escapeHtml(heroItem ? `product.html?id=${encodeURIComponent(heroItem.id)}` : "index.html")}">عرض التفاصيل</a>
        </article>
        <article class="signature-card">
          <span class="tag">Ready to ship</span>
          <strong>${readyToShip}</strong>
          <p>منتجات جاهزة للشحن الفوري داخل تجربة عرض أوضح مع مؤشرات توفر مباشرة في الصفحة.</p>
        </article>
        <article class="signature-card">
          <span class="tag">Limited pieces</span>
          <strong>${limitedPieces}</strong>
          <p>قطع منخفضة المخزون يمكن إبرازها كعناصر نادرة لدفع القرار الشرائي في وقت أسرع.</p>
        </article>
        <article class="signature-card">
          <span class="tag">Collections</span>
          <strong>${collections || 1}</strong>
          <p>مجموعات واضحة تسهّل بناء حملات موسمية، صفحات هدايا، واختيارات مميزة لاحقًا.</p>
        </article>
        <article class="signature-card">
          <span class="tag">VIP growth</span>
          <strong>${subscribers.length}</strong>
          <p>عملاء مهتمون يمكن تحويلهم إلى نادي ولاء وعروض خاصة دون تغيير بنية الواجهة لاحقًا.</p>
        </article>
        <article class="signature-card">
          <span class="tag">Next focus</span>
          <strong>${escapeHtml(editorPick?.name || "واجهة المجموعات")}</strong>
          <p>هذه المساحة تجهز المتجر لصفحات drop جديدة، هدايا موسمية، وإطلاقات محدودة بأسلوب أرفع.</p>
        </article>
      </div>
    </section>
  `;
}

function renderConciergeStrip(featured, promoPicks, subscribers) {
  const focusNames = [...featured.slice(0, 2), ...promoPicks.slice(0, 1)].map((item) => item.name).filter(Boolean);
  return `
    <section class="concierge-strip">
      <div class="concierge-strip__copy">
        <span class="category-kicker">Private concierge</span>
        <h2>المتجر لم يعد مجرد عرض منتجات، بل صار جاهزًا لمسار خدمة أرقى وعلاقات أقوى مع العملاء.</h2>
        <p>${focusNames.length ? `العناصر الأبرز الآن: ${escapeHtml(focusNames.join("، "))}.` : "يمكنك استخدام هذه المساحة لاحقًا للعروض الخاصة، الطلبات المسبقة، أو خدمة العملاء الخاصة."}</p>
      </div>
      <div class="concierge-strip__meta">
        <article>
          <strong>خدمة خاصة</strong>
          <span>واتساب مباشر، محتوى حملات، ومتابعة شراء أوضح.</span>
        </article>
        <article>
          <strong>نمو ثابت</strong>
          <span>${subscribers.length} مشترك قابلون للتفعيل في حملات الإطلاق والعروض.</span>
        </article>
      </div>
      <div class="concierge-strip__actions">
        <a class="primary-button" href="contact.html">رتب تجربة خاصة</a>
        <a class="ghost-button" href="vip.html">نادي VIP</a>
        <a class="ghost-button" href="https://api.whatsapp.com/send?phone=96876787356" target="_blank" rel="noopener">واتساب المتجر</a>
      </div>
    </section>
  `;
}

function getEditorialCapsules(items = getVisibleProducts()) {
  const visible = Array.isArray(items) ? items.filter(Boolean) : [];
  const formalSet = visible.filter((item) => ["الكميم", "المصار"].includes(String(item.category || ""))).slice(0, 3);
  const giftSet = visible.filter((item) => Number(item.price || 0) >= 18).slice(0, 3);
  const finishingSet = visible.filter((item) => ["العطور", "الأحذية", "العصي"].includes(String(item.category || ""))).slice(0, 3);
  return [
    {
      title: "تحرير المجلس",
      text: "قطع افتتاحية للمجالس والمناسبات الرسمية مع خامات هادئة وحضور واضح.",
      href: "kummah.html",
      items: formalSet
    },
    {
      title: "هدايا موقعة",
      text: "اختيارات يمكن تحويلها إلى هدية راقية بسرعة مع تغليف ورسالة خاصة.",
      href: "checkout.html",
      items: giftSet
    },
    {
      title: "تفاصيل الإطلالة",
      text: "عطور وإكسسوارات ولمسات نهائية ترفع قيمة السلة وتكمل التجربة.",
      href: "perfumes.html",
      items: finishingSet
    }
  ].filter((capsule) => capsule.items.length);
}

function renderEditorialHighlight(visibleProducts, featured, promoPicks) {
  const capsules = getEditorialCapsules(visibleProducts).slice(0, 3);
  const focus = featured[0] || promoPicks[0] || visibleProducts[0] || null;
  return `
    <section class="editorial-highlight">
      <article class="editorial-highlight__lead">
        <span class="category-kicker">التحرير الموسمي</span>
        <h2>مساحة تحريرية جديدة تجمع الاختيارات المنسقة، الهدايا، والإطلاقات التي تستحق واجهة مستقلة.</h2>
        <p>أضفت طبقة جديدة تجعل المتجر يبدو أقرب إلى علامة راقية لها تحرير موسمي وليس مجرد كتالوج بيع. هذه المساحة تمهّد لحملات موسمية وصفحات هبوط أعلى جودة.</p>
        <div class="hero-actions">
          <a class="primary-button" href="edits.html">افتح التحرير الموسمي</a>
          <a class="ghost-button" href="${escapeHtml(focus ? `product.html?id=${encodeURIComponent(focus.id)}` : "checkout.html")}">شاهد الاختيار الأبرز</a>
        </div>
      </article>
      <div class="editorial-highlight__grid">
        ${capsules.map((capsule) => `
          <article class="editorial-look-card">
            <span class="tag">${escapeHtml(capsule.title)}</span>
            <strong>${escapeHtml(capsule.items.map((item) => item.name).slice(0, 2).join(" • ") || capsule.title)}</strong>
            <p>${escapeHtml(capsule.text)}</p>
            <div class="chip-row">
              <span class="stat-chip">${capsule.items.length} قطع</span>
              <span class="stat-chip">${escapeHtml(capsule.items[0]?.category || "مختارات")}</span>
            </div>
            <a class="ghost-button" href="${escapeHtml(capsule.href)}">استكشف المسار</a>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderEditorialPage() {
  const visibleProducts = getVisibleProducts();
  const featured = [...visibleProducts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a)).slice(0, 6);
  const promoPicks = getPromoPicks(6);
  const personalized = getPersonalizedRecommendations(4);
  const recentViews = getRecentlyViewedItems().slice(0, 4);
  const capsules = getEditorialCapsules(visibleProducts);
  const focus = featured[0] || promoPicks[0] || visibleProducts[0] || null;
  const curatedEdit = [...featured, ...promoPicks]
    .filter((item, index, list) => item && list.findIndex((entry) => entry.id === item.id) === index)
    .slice(0, 4);

  return `
    <section class="editorial-hero">
      <div class="editorial-hero__copy">
        <span class="category-kicker">بيت التحرير</span>
        <h2>التحرير الموسمي لطَيّة</h2>
        <p>صفحة مستقلة للعروض المختارة، هدايا المناسبات، وإطلالات المجلس. هذه المساحة تجهز المتجر لصفحات هبوط موسمية وإطلاقات محدودة بجودة أعلى وتجربة أوضح.</p>
        <div class="editorial-stats">
          <article><strong>${curatedEdit.length || 1}</strong><span>اختيارات بارزة</span></article>
          <article><strong>${capsules.length}</strong><span>مسارات منسقة</span></article>
          <article><strong>${getAverageProductRating(visibleProducts)}</strong><span>متوسط الرضا</span></article>
        </div>
        <div class="hero-actions">
          <a class="primary-button" href="${escapeHtml(focus ? `product.html?id=${encodeURIComponent(focus.id)}` : "checkout.html")}">ابدأ من القطعة الرئيسية</a>
          <a class="ghost-button" href="checkout.html">اذهب إلى الدفع الراقي</a>
        </div>
      </div>
      <article class="editorial-hero__spotlight">
        <span class="tag">اختيار التحرير</span>
        <strong>${escapeHtml(focus?.name || "اختيارات موسمية خاصة")}</strong>
        <p>${escapeHtml(focus?.desc || "واجهة مخصصة للمختارات التي تستحق حضورًا أهدأ وأكثر تميزًا داخل المتجر.")}</p>
        <div class="chip-row">
          <span class="stat-chip">${escapeHtml(focus?.collection || "التحرير الموسمي")}</span>
          <span class="stat-chip">${formatPrice(focus?.price || 0)}</span>
          <span class="stat-chip">${getStock(focus)} متاح</span>
        </div>
        <a class="ghost-button" href="${escapeHtml(focus ? `product.html?id=${encodeURIComponent(focus.id)}` : "index.html")}">عرض التفاصيل</a>
      </article>
    </section>

    <section class="editorial-capsules">
      ${capsules.map((capsule) => `
        <article class="editorial-capsule">
          <div class="editorial-capsule__head">
            <div>
              <span class="category-kicker">${escapeHtml(capsule.title)}</span>
              <h3>${escapeHtml(capsule.title)}</h3>
            </div>
            <a class="ghost-button" href="${escapeHtml(capsule.href)}">استكشف</a>
          </div>
          <p>${escapeHtml(capsule.text)}</p>
          <div class="editorial-pick-list">
            ${capsule.items.map((item) => `
              <a class="editorial-pick" href="product.html?id=${encodeURIComponent(item.id)}">
                <img src="${escapeHtml(item.imgUrl || getGallery(item)[0] || "")}" alt="${escapeHtml(item.name)}" loading="lazy">
                <div>
                  <strong>${escapeHtml(item.name)}</strong>
                  <span>${formatPrice(item.price)}</span>
                </div>
              </a>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </section>

    ${curatedEdit.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>اختيارات هذا التحرير</h2>
            <p>قطع جاهزة للعرض في حملات موسمية أو صفحات هبوط خاصة دون إعادة بناء الكتالوج من الصفر.</p>
          </div>
          <div class="chip-row">
            <span class="stat-chip">جاهز للحملات</span>
            <span class="stat-chip">نية شراء عالية</span>
          </div>
        </div>
        ${renderCatalogGrid(curatedEdit)}
      </section>
    ` : ""}

    ${personalized.length ? `
      <section class="section-card section-card--soft">
        <div class="section-head">
          <div>
            <h2>اقتراحات تلائم ذوق العميل</h2>
            <p>دمجت هنا طبقة توصية أوضح حتى تصبح الصفحة ليست جمالية فقط، بل قادرة على دفع قرار الشراء أيضًا.</p>
          </div>
        </div>
        ${renderCatalogGrid(personalized)}
      </section>
    ` : ""}

    ${recentViews.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>استكمل من آخر ما شاهدته</h2>
            <p>مسار سريع يعيد العميل إلى آخر اهتماماته بدل فقدان الزخم داخل الزيارة.</p>
          </div>
        </div>
        ${renderCatalogGrid(recentViews, "mixed")}
      </section>
    ` : ""}
  `;
}

function getAverageProductRating(items = []) {
  const rated = items.filter((item) => Number(item.rating || 0) > 0);
  if (!rated.length) return "4.8";
  const value = rated.reduce((sum, item) => sum + Number(item.rating || 0), 0) / rated.length;
  return value.toFixed(1);
}

function renderBrandShowcase(visibleProducts, featured, accountSpotlight, subscribers) {
  const avgRating = getAverageProductRating(visibleProducts);
  const featuredName = featured[0]?.name || "مختارات الواجهة";
  const accountName = accountSpotlight[0]?.name || "الحسابات المميزة";
  const categoryCount = Object.keys(CATEGORY_ROUTES).length;

  return `
    <section class="section-card brand-showcase">
      <div class="brand-showcase__hero">
        <div class="brand-showcase__copy">
          <span class="category-kicker">Brand world</span>
          <h2>واجهة أحدث، تنوع أعلى، ورسائل تسويقية أقوى تجعل المتجر يبدو كعلامة مكتملة لا مجرد صفحة بيع.</h2>
          <p>أضفت طبقة تعريف وتسويق أرقى داخل الصفحة الرئيسية لتقود العميل بين الأقسام والعروض والمنتجات المميزة، مع شعور أوضح بالفخامة والثقة والاختيار المتنوع.</p>
          <div class="chip-row">
            <span class="stat-chip">تنوع في العرض</span>
            <span class="stat-chip">قصص تسويقية أوضح</span>
            <span class="stat-chip">واجهة أحدث</span>
            <span class="stat-chip">موبايل أولًا</span>
          </div>
          <div class="hero-actions">
            <a class="primary-button" href="about.html">عن المتجر</a>
            <a class="ghost-button" href="admin-offers.html">العروض والحملات</a>
            <a class="ghost-button" href="https://api.whatsapp.com/send?phone=96876787356" target="_blank" rel="noopener">واتساب مباشر</a>
          </div>
        </div>
        <aside class="brand-showcase__panel">
          <article class="brand-stat">
            <strong>${categoryCount}</strong>
            <span>أقسام مستقلة ترفع التنوع</span>
          </article>
          <article class="brand-stat">
            <strong>${avgRating}</strong>
            <span>متوسط تقييم المنتجات</span>
          </article>
          <article class="brand-stat">
            <strong>${subscribers.length}</strong>
            <span>مهتمون بالعروض الجديدة</span>
          </article>
          <article class="brand-stat">
            <strong>${state.orders.length}</strong>
            <span>رحلات شراء محفوظة للتطوير</span>
          </article>
        </aside>
      </div>
      <div class="brand-showcase__grid">
        <article class="brand-note">
          <span class="tag">الهوية</span>
          <strong>فخامة أكثر اتزانًا</strong>
          <p>تحسين الواجهة لا يعتمد فقط على الزخرفة، بل على وضوح الهرم البصري، أقسام أقوى، ورسائل أقرب للعلامات الراقية.</p>
        </article>
        <article class="brand-note">
          <span class="tag">التنوع</span>
          <strong>مساحات عرض أكثر غنى</strong>
          <p>من ${escapeHtml(featuredName)} إلى ${escapeHtml(accountName)}، أصبح المتجر يعرض التنوع بصورة أشمل بدل الاكتفاء بكتالوج ثابت.</p>
        </article>
        <article class="brand-note">
          <span class="tag">الثقة</span>
          <strong>تفاصيل تخدم القرار</strong>
          <p>بطاقات أوضح، مراجعات، كوبونات، تتبع، ووسائل دعم متعددة تجعل الرحلة التسويقية أكثر إقناعًا للمستخدم.</p>
        </article>
        <article class="brand-note">
          <span class="tag">التحويل</span>
          <strong>رسائل تدفع للشراء</strong>
          <p>أعدت بناء الصفحة لتقود العميل من الإلهام إلى السلة والدفع بخطوات أقصر ونقاط ثقة أكثر حضورًا.</p>
        </article>
      </div>
    </section>
  `;
}

function renderMarketingSuite(featured, promoPicks, subscribers) {
  const spotlight = featured.slice(0, 3).map((item) => item.name);
  const couponPreview = state.coupons.slice(0, 3).map((coupon) => `${coupon.code} • ${coupon.percent || 0}%`);

  return `
    <section class="section-card marketing-suite">
      <div class="section-head">
        <div>
          <h2>طبقة تسويقية أحدث داخل المتجر</h2>
          <p>أضفت أقسامًا تساعد على بناء الانطباع، رفع الثقة، وتنشيط التحويل عبر العروض والاشتراك والرسائل التسويقية.</p>
        </div>
      </div>
      <div class="marketing-suite__grid">
        <article class="marketing-card marketing-card--feature">
          <span class="category-kicker">Campaign room</span>
          <h3>غرفة حملات جاهزة للتشغيل</h3>
          <p>العروض لم تعد مجرد كود خصم فقط، بل أصبحت مساحة سرد تسويقي مع عنوان ووصف وموعد انتهاء ومسار واضح للاستفادة منها.</p>
          <div class="chip-row">
            ${couponPreview.map((coupon) => `<span class="stat-chip">${escapeHtml(coupon)}</span>`).join("")}
          </div>
          <a class="ghost-button" href="admin-offers.html">إدارة الحملات</a>
        </article>
        <article class="marketing-card">
          <span class="category-kicker">VIP journey</span>
          <h3>نادي عملاء أكثر فخامة</h3>
          <p>المتجر أصبح مهيأ أكثر لولاء العملاء عبر الاشتراك، المحفوظات، الاقتراحات، والعروض الحصرية للمهتمين.</p>
          <div class="marketing-stats">
            <article><strong>${subscribers.length}</strong><span>مشترك</span></article>
            <article><strong>${state.favorites.length}</strong><span>محفوظات</span></article>
            <article><strong>${getCartCount()}</strong><span>عناصر بالسلة</span></article>
          </div>
        </article>
        <article class="marketing-card">
          <span class="category-kicker">Social proof</span>
          <h3>أدلة ثقة بصياغة أقوى</h3>
          <p>استخدمت الرسائل التسويقية لإبراز أفضل ما في المتجر: العروض، الدفع، الخدمة، وسرعة الوصول إلى العناصر الأهم.</p>
          <ul class="marketing-list">
            <li>إبراز العناصر الأكثر جذبًا في أول الصفحة</li>
            <li>ربط العروض مباشرة بالسلة والدفع</li>
            <li>تعزيز صفحات الدعم والتواصل داخل رحلة الشراء</li>
          </ul>
        </article>
        <article class="marketing-card">
          <span class="category-kicker">Merchandising</span>
          <h3>عرض أقوى للمنتجات المميزة</h3>
          <p>${spotlight.length ? `أبرز العناصر الحالية: ${escapeHtml(spotlight.join("، "))}.` : "يمكن توسيع هذه المساحة لاحقًا لعرض مختارات موسمية ومحدودة."}</p>
          <a class="ghost-button" href="accounts.html">شاهد المختارات</a>
        </article>
      </div>
    </section>
  `;
}

function getCampaignCountdown(dateValue) {
  if (!dateValue) return "";
  const end = new Date(dateValue);
  if (Number.isNaN(end.getTime())) return "";
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return "انتهت الحملة ويمكن تحديثها من لوحة الإدارة";
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const parts = [];
  if (days) parts.push(`${days} يوم`);
  if (hours || days) parts.push(`${hours} ساعة`);
  parts.push(`${minutes} دقيقة`);
  return parts.join(" • ");
}

function renderCampaignSpotlight() {
  const campaignTitle = String(state.contentSettings.campaignTitle || "").trim();
  const campaignText = String(state.contentSettings.campaignText || "").trim();
  if (!campaignTitle && !campaignText) return "";
  const countdown = getCampaignCountdown(state.contentSettings.campaignEndsAt);
  const href = String(state.contentSettings.campaignHref || "checkout.html").trim() || "checkout.html";
  const code = String(state.contentSettings.campaignCode || "").trim().toUpperCase();
  return `
    <section class="campaign-spotlight">
      <div class="campaign-spotlight__copy">
        <span class="category-kicker">حملة مباشرة</span>
        <h2>${escapeHtml(campaignTitle || "حملة خاصة داخل المتجر")}</h2>
        <p>${escapeHtml(campaignText || "فعّل عروض موسمية ورسائل أقوى من لوحة الإدارة لتظهر مباشرة داخل الواجهة.")}</p>
        <div class="chip-row">
          ${code ? `<span class="stat-chip">الكود • ${escapeHtml(code)}</span>` : ""}
          ${countdown ? `<span class="stat-chip">${escapeHtml(countdown)}</span>` : '<span class="stat-chip">بدون موعد انتهاء محدد</span>'}
          <span class="stat-chip">جاهزة للموبايل</span>
        </div>
      </div>
      <div class="campaign-spotlight__actions">
        <a class="primary-button" href="${escapeHtml(href)}">استفد من الحملة</a>
        ${code ? `<button class="ghost-button" type="button" data-action="copy-campaign-code" data-code="${escapeHtml(code)}">نسخ الكود</button>` : '<a class="ghost-button" href="admin-offers.html">تعديل الحملة</a>'}
      </div>
    </section>
  `;
}

function getCommandPaletteResults(query = "") {
  const normalized = String(query || "").trim().toLowerCase();
  const base = [
    { label: "الرئيسية", meta: "العودة إلى الواجهة الرئيسية", href: "index.html", icon: "fa-house", keywords: "home الرئيسية" },
    { label: "التحرير الموسمي", meta: "اختيارات منسقة وهدايا وإطلاقات خاصة", href: "edits.html", icon: "fa-sparkles", keywords: "edits editorial موسم تحرير" },
    { label: "نادي VIP", meta: "المستويات والنقاط والمكافآت الخاصة", href: "vip.html", icon: "fa-crown", keywords: "vip loyalty ولاء" },
    { label: "السلة", meta: "راجع العناصر قبل الدفع", href: "cart.html", icon: "fa-bag-shopping", keywords: "cart السلة" },
    { label: "الدفع", meta: "انتقل إلى صفحة الدفع", href: "checkout.html", icon: "fa-credit-card", keywords: "checkout الدفع" },
    { label: "تتبع الطلب", meta: "تتبع حالة طلبك", href: "track-order.html", icon: "fa-truck-fast", keywords: "tracking تتبع" },
    { label: "الحسابات", meta: "المنتجات الرقمية والحسابات", href: "accounts.html", icon: "fa-layer-group", keywords: "accounts الحسابات" },
    { label: "تواصل معنا", meta: "دعم سريع وواتساب", href: "contact.html", icon: "fa-headset", keywords: "contact support تواصل" }
  ];
  const categories = Object.entries(CATEGORY_ROUTES).map(([label, config]) => ({
    label,
    meta: "اذهب مباشرة إلى القسم",
    href: config.href,
    icon: "fa-compass",
    keywords: `${label} category قسم`
  }));
  const products = getVisibleProducts().slice(0, 10).map((item) => ({
    label: item.name,
    meta: `${item.category || "منتج"} • ${formatPrice(item.price)}`,
    href: `product.html?id=${encodeURIComponent(item.id)}`,
    icon: "fa-gem",
    keywords: `${item.name} ${item.category || ""} ${item.brand || ""}`
  }));
  const accounts = getVisibleAccounts().slice(0, 6).map((item) => ({
    label: item.name,
    meta: `حساب • ${formatPrice(item.price)}`,
    href: `product.html?id=${encodeURIComponent(item.id)}&type=account`,
    icon: "fa-id-card",
    keywords: `${item.name} ${item.accountType || ""} ${item.brand || ""}`
  }));
  const admin = isAdmin() ? [
    { label: "لوحة الأدمن", meta: "ملخص الإدارة", href: "admin.html", icon: "fa-shield-halved", keywords: "admin الأدمن" },
    { label: "إدارة المنتجات", meta: "تعديل المنتجات والمخزون", href: "admin-products.html", icon: "fa-box-open", keywords: "products products الإدارة" },
    { label: "التقارير", meta: "إحصائيات ومبيعات", href: "admin-reports.html", icon: "fa-chart-line", keywords: "reports التقارير" }
  ] : [];
  const entries = [...base, ...categories, ...products, ...accounts, ...admin];
  if (!normalized) return entries.slice(0, 10);
  return entries.filter((entry) => `${entry.label} ${entry.meta} ${entry.keywords || ""}`.toLowerCase().includes(normalized)).slice(0, 10);
}

function renderCommandPaletteResults(query = state.commandQuery) {
  const results = getCommandPaletteResults(query);
  if (!results.length) {
    return '<div class="empty-state"><strong>لا توجد نتائج مطابقة</strong><p>جرّب اسم منتج أو قسم أو صفحة مثل السلة أو الدفع أو الكميم.</p></div>';
  }
  return results.map((entry) => `
    <a class="command-item" href="${escapeHtml(entry.href)}">
      <span class="command-item__icon"><i class="fas ${escapeHtml(entry.icon)}"></i></span>
      <span class="command-item__copy">
        <strong>${escapeHtml(entry.label)}</strong>
        <span>${escapeHtml(entry.meta)}</span>
      </span>
      <span class="command-item__hint">Enter</span>
    </a>
  `).join("");
}

function renderCommandPalette() {
  return `
    <div class="command-palette ${state.commandPaletteOpen ? "is-open" : ""}" id="command-palette" aria-hidden="${state.commandPaletteOpen ? "false" : "true"}">
      <button class="command-palette__backdrop" type="button" data-action="close-command" aria-label="إغلاق البحث السريع"></button>
      <section class="command-palette__panel" aria-label="البحث السريع">
        <div class="command-palette__head">
          <div>
            <strong>بحث وأوامر سريعة</strong>
            <p>اكتب اسم منتج أو قسم أو صفحة، أو استخدم <kbd>Ctrl</kbd> + <kbd>K</kbd> لاحقًا للوصول السريع.</p>
          </div>
          <button class="ghost-button" type="button" data-action="close-command">إغلاق</button>
        </div>
        <div class="command-palette__search">
          <i class="fas fa-magnifying-glass"></i>
          <input class="control" id="command-palette-search" value="${escapeHtml(state.commandQuery || "")}" placeholder="ابحث عن منتج أو صفحة أو قسم">
        </div>
        <div class="command-palette__results" id="command-palette-results">
          ${renderCommandPaletteResults()}
        </div>
      </section>
    </div>
  `;
}

function refreshCommandPaletteResults() {
  const root = document.getElementById("command-palette-results");
  if (!root) return;
  root.innerHTML = renderCommandPaletteResults();
}

function getBundleCandidates(item) {
  const mapping = {
    "الكميم": ["المصار", "العطور"],
    "المصار": ["الكميم", "العطور"],
    "العصي": ["العطور", "الأحذية"],
    "الأحذية": ["العطور", "المصار"],
    "العطور": ["الكميم", "الأحذية"]
  };
  const targetCategories = mapping[item.category] || Object.keys(CATEGORY_ROUTES).filter((category) => category !== item.category).slice(0, 2);
  return targetCategories
    .map((category) => getVisibleProducts().find((entry) => entry.id !== item.id && entry.category === category && getStock(entry) > 0))
    .filter(Boolean)
    .slice(0, 2);
}

function renderBundleSuggestion(item) {
  const picks = getBundleCandidates(item);
  if (!picks.length) return "";
  const bundleItems = [item, ...picks];
  const total = bundleItems.reduce((sum, entry) => sum + Number(entry.price || 0), 0);
  return `
    <section class="section-card bundle-spotlight">
      <div class="section-head">
        <div>
          <h2>إكمال الإطلالة</h2>
          <p>باقة مختارة تلقائيًا حول هذا المنتج لرفع قيمة السلة وتسريع قرار الشراء.</p>
        </div>
        <div class="chip-row">
          <span class="stat-chip">${bundleItems.length} عناصر</span>
          <span class="stat-chip">${formatPrice(total)}</span>
        </div>
      </div>
      <div class="bundle-grid">
        ${bundleItems.map((entry) => `
          <article class="bundle-card">
            <strong>${escapeHtml(entry.name)}</strong>
            <span>${escapeHtml(entry.category || "منتج")}</span>
            <b>${formatPrice(entry.price)}</b>
          </article>
        `).join("")}
      </div>
      <div class="actions-row" style="margin-top:18px;">
        <button class="primary-button" type="button" data-add-bundle="${escapeHtml(bundleItems.map((entry) => entry.id).join("|"))}">إضافة الباقة كاملة</button>
        <span class="mini-note">تتم إضافة العناصر المتاحة فقط مع خياراتها الافتراضية.</span>
      </div>
    </section>
  `;
}

function getAverageRating(reviews = []) {
  if (!Array.isArray(reviews) || !reviews.length) return 0;
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  return total / reviews.length;
}

function renderProductEditorialSuite(item, type, reviews, stock, gallery, sizes) {
  const averageRating = getAverageRating(reviews);
  const shareUrl = window.location.href;
  const shareText = `${item.name} - ${formatPrice(item.price)} من متجر طَيّة`;
  const storyNotes = [
    item.collection ? `جزء من مجموعة ${item.collection}` : "مختار ضمن باقة المتجر الحديثة",
    item.material ? `خامة ${item.material} تمنح إحساسًا أوضح عند التصفح والاقتناء` : "التفاصيل المعروضة تساعد العميل على اتخاذ قرار أسرع",
    item.brand ? `منسوب إلى ${item.brand} مع عرض أوضح للهوية والستايل` : "مصمم ليتناغم مع بقية مختارات المتجر",
    stock > 0 ? "جاهز للطلب الآن مع شحن مرن وتأكيد واضح قبل الإتمام" : "يمكن حفظه أو طلب تنبيه التوفر لحين عودته"
  ];
  const serviceCards = [
    {
      title: "قصة المنتج",
      text: type === "account"
        ? "هذا العنصر يقدَّم داخل صفحة مستقلة بتفاصيل أوضح، صور أكثر، ومسار شراء مختصر يرفع الثقة قبل الإضافة للسلة."
        : "هذه القطعة معروضة بطريقة تحريرية أوضح حتى يشعر العميل بالقيمة والخامة والتناسق قبل الحسم النهائي."
    },
    {
      title: "جاهز للهدايا",
      text: "من السلة والدفع تقدر تفعّل تغليف الهدية وإضافة رسالة خاصة، مع حفظ العنوان للطلبات القادمة."
    },
    {
      title: "خدمة مباشرة",
      text: "دعم واتساب، مركز خدمة سريع، ومساعد ذكي داخل المتجر حتى لا يضيع العميل بين الأقسام قبل الشراء."
    }
  ];

  return `
    <section class="editorial-banner product-editorial">
      <div class="product-editorial__copy">
        <span class="category-kicker">Product editorial</span>
        <h2>تفاصيل أعمق تبني الرغبة والثقة قبل الإضافة للسلة.</h2>
        <p>طوّرنا صفحة المنتج لتكون أكثر من مجرد صورة وسعر: قصة أوضح، إشارات ثقة، مشاركة أسرع، ومؤشرات تساعد العميل على حسم قراره بثقة وهدوء.</p>
        <div class="chip-row">
          <span class="stat-chip">${gallery.length} صور</span>
          <span class="stat-chip">${sizes.length ? `${sizes.length} خيارات` : "خيار مباشر"}</span>
          <span class="stat-chip">${reviews.length ? `${averageRating.toFixed(1)} / 5` : "تقييمات قادمة"}</span>
          <span class="stat-chip">${stock > 0 ? "جاهز للطلب" : "تنبيه توفر"}</span>
        </div>
        <div class="product-editorial__social">
          <a class="ghost-button" href="https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}" target="_blank" rel="noopener">مشاركة واتساب</a>
          <a class="ghost-button" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener">مشاركة X</a>
          <button type="button" class="ghost-button" data-copy-url="${escapeHtml(shareUrl)}">نسخ الرابط</button>
        </div>
      </div>
      <div class="product-editorial__grid">
        <article class="product-story-card">
          <strong>لماذا هذا المنتج؟</strong>
          <div class="metric-table">
            ${storyNotes.map((note) => `<div class="metric-table__row"><span>${escapeHtml(note)}</span><strong>جاهز</strong></div>`).join("")}
          </div>
        </article>
        ${serviceCards.map((entry) => `
          <article class="product-story-card">
            <strong>${escapeHtml(entry.title)}</strong>
            <p class="faq-answer">${escapeHtml(entry.text)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProductQuestionsSection(item) {
  const questions = getProductQuestions(item.id);
  return `
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>الأسئلة والأجوبة</h2>
          <p>قسم مستقل داخل صفحة المنتج يساعد العميل على الحسم السريع قبل الشراء ويُظهر الأسئلة المتكررة بوضوح.</p>
        </div>
      </div>
      <div class="section-stack">
        ${questions.length ? questions.map((entry) => `
          <article class="qa-card">
            <strong>${escapeHtml(entry.question || "")}</strong>
            <p>${escapeHtml(entry.answer || "سيتم الرد على هذا السؤال قريبًا من فريق المتجر.")}</p>
            <span class="mini-note">${escapeHtml(entry.name || "زائر")} • ${escapeHtml(formatDate(entry.createdAt || new Date().toISOString()))}</span>
          </article>
        `).join("") : '<div class="empty-state"><strong>لا توجد أسئلة بعد</strong><p>يمكن للعميل أن يبدأ بالسؤال من النموذج التالي.</p></div>'}
        <form class="auth-card" id="product-question-form" data-product-id="${escapeHtml(item.id)}">
          <h3>اسأل عن المنتج</h3>
          <div class="form-grid form-grid--two" style="margin-top:12px;">
            <input class="control" name="name" placeholder="الاسم">
            <input class="control" name="question" placeholder="مثال: هل المقاس ثابت؟" required>
          </div>
          <button class="primary-button" type="submit">إرسال السؤال</button>
        </form>
      </div>
    </section>
  `;
}

function renderSavedForLaterSection(compact = false) {
  const metrics = { savedForLaterCount: 0, productQuestionCount: 0, giftOrders: 0 };
  const items = getSavedForLaterItemsDetailed();
  if (!items.length) return "";
  return `
    <section class="section-card ${compact ? "section-card--soft" : ""}">
      <div class="section-head">
        <div>
          <h2>محفوظ لوقت لاحق</h2>
          <p>انقل العناصر من السلة إلى هذا القسم حتى لا تضيع، ثم أعدها للشراء متى أردت.</p>
        </div>
        <div class="chip-row">
          <span class="stat-chip">${items.length} عناصر</span>
        </div>
      </div>
      <div class="saved-grid">
        ${items.map((item) => `
          <article class="saved-card">
            <a href="product.html?id=${encodeURIComponent(item.id)}${item.type === "account" ? "&type=account" : ""}">
              <strong>${escapeHtml(item.name)}</strong>
            </a>
            <span>${escapeHtml(item.category || (item.type === "account" ? "الحسابات" : "منتج"))}</span>
            <b>${formatPrice(item.price)}</b>
            <div class="actions-row actions-row--wrap">
              <button class="primary-button" type="button" data-move-to-cart="${escapeHtml(item.cartKey)}">أعده إلى السلة</button>
              <button class="ghost-button" type="button" data-remove-saved="${escapeHtml(item.cartKey)}">حذف</button>
              <div class="metric-table__row"><span>عناصر محفوظة لاحقًا</span><strong>${metrics.savedForLaterCount}</strong></div>
              <div class="metric-table__row"><span>أسئلة المنتجات</span><strong>${metrics.productQuestionCount}</strong></div>
              <div class="metric-table__row"><span>طلبات الهدايا</span><strong>${metrics.giftOrders}</strong></div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderSavedForLaterPanel(compact = false) {
  const items = getSavedForLaterItemsDetailed();
  if (!items.length) return "";
  return `
    <section class="section-card ${compact ? "section-card--tight" : ""}">
      <div class="section-head">
        <div>
          <h2>${compact ? "محفوظة لاحقًا" : "عناصر تحت المراجعة"}</h2>
          <p>${compact ? "ارجع لها لاحقًا أو أعدها مباشرة إلى السلة." : "العميل يقدر يحفظ القطع التي ينوي مراجعتها قبل الشراء النهائي."}</p>
        </div>
      </div>
      <div class="saved-grid">
        ${items.map((item) => `
          <article class="saved-card">
            <a href="product.html?id=${encodeURIComponent(item.id)}${item.type === "account" ? "&type=account" : ""}">
              <strong>${escapeHtml(item.name)}</strong>
            </a>
            <span>${escapeHtml(item.category || (item.type === "account" ? "الحسابات" : "منتج"))}</span>
            <b>${formatPrice(item.price)}</b>
            <div class="actions-row actions-row--wrap">
              <button class="primary-button" type="button" data-move-to-cart="${escapeHtml(item.cartKey)}">أعده إلى السلة</button>
              <button class="ghost-button" type="button" data-remove-saved="${escapeHtml(item.cartKey)}">حذف</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCartDeliveryPreview(pricing) {
  const region = SHIPPING_REGIONS[state.checkoutRegion || "om"] || SHIPPING_REGIONS.om;
  const method = region.methods.find((entry) => entry.key === state.checkoutMethod) || region.methods[0];
  return `
    <section class="section-card section-card--soft">
      <div class="section-head">
        <div>
          <h3>تقدير الشحن قبل الدفع</h3>
          <p>تجربة أسرع داخل السلة لمعرفة السوق وطريقة التوصيل والإجمالي المتوقع قبل الانتقال لصفحة الدفع.</p>
        </div>
      </div>
      <div class="form-grid form-grid--two">
        <select class="control" id="cart-region-preview">
          ${Object.entries(SHIPPING_REGIONS).map(([key, value]) => `<option value="${escapeHtml(key)}" ${key === state.checkoutRegion ? "selected" : ""}>${escapeHtml(value.label)}</option>`).join("")}
        </select>
        <select class="control" id="cart-method-preview">
          ${region.methods.map((entry) => `<option value="${escapeHtml(entry.key)}" ${entry.key === state.checkoutMethod ? "selected" : ""}>${escapeHtml(entry.label)} • ${entry.price ? formatPrice(entry.price) : "مجاني"}</option>`).join("")}
        </select>
      </div>
      <div class="metric-table" style="margin-top:16px;">
        <div class="metric-table__row"><span>السوق</span><strong>${escapeHtml(region.label)}</strong></div>
        <div class="metric-table__row"><span>طريقة التوصيل</span><strong>${escapeHtml(method?.label || "القياسي")}</strong></div>
        <div class="metric-table__row"><span>المدة المتوقعة</span><strong>${escapeHtml(method?.eta || "--")}</strong></div>
        <div class="metric-table__row"><span>الإجمالي المتوقع</span><strong>${formatPrice(pricing.total)}</strong></div>
      </div>
    </section>
  `;
}

function renderCartExperienceBand(pricing, items) {
  const freeShippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - pricing.subtotal);
  const compareCount = getCompareItems().length;
  return `
    <section class="trust-band trust-band--compact">
      <article>
        <strong>${freeShippingGap > 0 ? "اقترب من الشحن المجاني" : "الشحن المجاني مفعل"}</strong>
        <span>${freeShippingGap > 0 ? `أضف بقيمة ${formatPrice(freeShippingGap)} للوصول إلى الشحن المجاني.` : `سلتك تجاوزت ${FREE_SHIPPING_THRESHOLD} ر.ع وأصبحت جاهزة للشحن المجاني.`}</span>
      </article>
      <article>
        <strong>مراجعة أذكى قبل الدفع</strong>
        <span>${items.length} عنصر في السلة مع إجمالي مبدئي ${formatPrice(pricing.subtotal)} قبل الشحن والخصم.</span>
      </article>
      <article>
        <strong>مقارنة سريعة</strong>
        <span>${compareCount ? `لديك ${compareCount} عنصر${compareCount > 1 ? "ات" : ""} في المقارنة لتسريع القرار قبل الإتمام.` : "يمكنك مقارنة المنتجات من البطاقات أو صفحة المنتج قبل الحسم النهائي."}</span>
      </article>
      <article>
        <strong>حوافز إضافية</strong>
        <span>${state.coupons.length ? `يوجد ${state.coupons.length} عروض وكوبونات محفوظة يمكن تطبيقها من السلة أو الدفع.` : "أضف عروضًا من لوحة الإدارة لرفع التحويل ومتوسط قيمة الطلب."}</span>
      </article>
    </section>
  `;
}

function renderCartConversionSuite(pricing, items) {
  const freeShippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - pricing.subtotal);
  const addresses = loadJson(KEYS.addresses, []);
  const topCoupons = state.coupons.slice(0, 3);
  return `
    <section class="cart-conversion-grid">
      <article class="summary-card">
        <h3>دفعة تحويل إضافية</h3>
        <div class="metric-table" style="margin-top:14px;">
          <div class="metric-table__row"><span>العناصر الحالية</span><strong>${items.length}</strong></div>
          <div class="metric-table__row"><span>الإجمالي قبل الشحن</span><strong>${formatPrice(pricing.subtotal)}</strong></div>
          <div class="metric-table__row"><span>المتبقي للشحن المجاني</span><strong>${freeShippingGap > 0 ? formatPrice(freeShippingGap) : "مفعل"}</strong></div>
          <div class="metric-table__row"><span>عناوين محفوظة</span><strong>${addresses.length}</strong></div>
        </div>
      </article>
      <article class="summary-card">
        <h3>عروض جاهزة للتطبيق</h3>
        <p class="faq-answer">أضفنا طبقة تسويقية أوضح داخل السلة حتى يرى العميل قيمة الكوبونات والخصومات قبل مغادرة الصفحة.</p>
        <div class="chip-row" style="margin-top:14px;">
          ${topCoupons.length
            ? topCoupons.map((coupon) => `<span class="stat-chip">${escapeHtml(coupon.code)} • ${escapeHtml(String(coupon.percent || 0))}%</span>`).join("")
            : '<span class="stat-chip">أضف كوبونات من لوحة الأدمن</span>'}
        </div>
      </article>
      <article class="summary-card">
        <h3>لماذا يكمل العميل هنا؟</h3>
        <ul class="feature-list">
          <li>مراجعة سعر واضحة مع الشحن والخصم قبل الانتقال للدفع.</li>
          <li>حفظ العناصر لاحقًا بدون فقدانها من الرحلة الشرائية.</li>
          <li>اقتراحات ذكية لرفع قيمة السلة بطريقة طبيعية.</li>
        </ul>
      </article>
    </section>
  `;
}

function getOfferIntelligence(pricing, items) {
  const region = SHIPPING_REGIONS[state.checkoutRegion || "om"] || SHIPPING_REGIONS.om;
  const method = region.methods.find((entry) => entry.key === state.checkoutMethod) || region.methods[0];
  const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const freeShippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - pricing.subtotal);
  const quantityGap = Math.max(0, 4 - totalQty);
  const couponOptions = state.coupons.map((coupon) => {
    const minimum = Number(coupon.minimum || 0);
    const qualifies = pricing.subtotal >= minimum;
    const estimatedSavings = qualifies
      ? Number((((pricing.subtotal - pricing.bulkDiscount) * Number(coupon.percent || 0)) / 100).toFixed(2))
      : Number((((Math.max(pricing.subtotal, minimum) - pricing.bulkDiscount) * Number(coupon.percent || 0)) / 100).toFixed(2));
    return {
      ...coupon,
      minimum,
      qualifies,
      gap: Math.max(0, minimum - pricing.subtotal),
      estimatedSavings
    };
  });
  const bestCoupon = couponOptions
    .filter((coupon) => coupon.qualifies && coupon.estimatedSavings > 0)
    .sort((a, b) => b.estimatedSavings - a.estimatedSavings)[0] || null;
  const nextCoupon = couponOptions
    .filter((coupon) => !coupon.qualifies)
    .sort((a, b) => a.gap - b.gap || b.estimatedSavings - a.estimatedSavings)[0] || null;
  const targetGap = freeShippingGap > 0 ? freeShippingGap : (nextCoupon?.gap || 0);
  const topOffProducts = getVisibleProducts()
    .filter((product) => getStock(product) > 0 && !items.some((entry) => entry.id === product.id))
    .map((product) => ({
      ...product,
      score: targetGap > 0 ? Math.abs(Number(product.price || 0) - targetGap) : Number(product.price || 0)
    }))
    .sort((a, b) => a.score - b.score || Number(a.price || 0) - Number(b.price || 0))
    .slice(0, 3);
  const currentCouponCode = String(state.checkoutCoupon || "").trim().toUpperCase();
  const shippingValue = pricing.shipping === 0 ? Number(method?.price || 0) : 0;
  const totalSavings = Number((pricing.bulkDiscount + pricing.couponDiscount + shippingValue).toFixed(2));
  return {
    region,
    method,
    totalQty,
    freeShippingGap,
    quantityGap,
    bestCoupon,
    nextCoupon,
    topOffProducts,
    currentCouponCode,
    totalSavings
  };
}

function renderOfferStudio(pricing, items, context = "cart") {
  const intelligence = getOfferIntelligence(pricing, items);
  const freeShippingProgress = Math.min(100, Math.round((pricing.subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const quantityProgress = Math.min(100, Math.round((intelligence.totalQty / 4) * 100));
  const hasAppliedBestCoupon = intelligence.bestCoupon && intelligence.currentCouponCode === String(intelligence.bestCoupon.code || "").toUpperCase();
  const offerNarrative = intelligence.bestCoupon
    ? `أفضل كود متاح الآن هو ${intelligence.bestCoupon.code} ويوفر تقريبًا ${formatPrice(intelligence.bestCoupon.estimatedSavings)} على هذه السلة.`
    : intelligence.nextCoupon
      ? `أقرب عرض قابل للفتح هو ${intelligence.nextCoupon.code}. أضف ${formatPrice(intelligence.nextCoupon.gap)} ليصبح جاهزًا للتطبيق.`
      : intelligence.freeShippingGap > 0
        ? `أنت قريب من رفع قيمة الطلب. أضف ${formatPrice(intelligence.freeShippingGap)} لتفعيل الشحن المجاني.`
        : "السلة في وضع ممتاز بالفعل. تقدر الانتقال مباشرة إلى الدفع مع تجربة أكثر وضوحًا وثقة.";

  return `
    <section class="offer-studio">
      <article class="offer-card offer-card--highlight">
        <div class="offer-card__head">
          <div>
            <span class="category-kicker">ذكاء العروض</span>
            <h3>${context === "checkout" ? "قرار الشراء أصبح أوضح قبل التأكيد" : "مساعد العروض الذكي داخل السلة"}</h3>
          </div>
          <span class="tag">${intelligence.totalSavings > 0 ? `قيمة محفوظة ${formatPrice(intelligence.totalSavings)}` : "مسار ترقية جاهز"}</span>
        </div>
        <p>${offerNarrative}</p>
        <div class="chip-row">
          <span class="stat-chip">${intelligence.bestCoupon ? `أفضل كود: ${escapeHtml(intelligence.bestCoupon.code)}` : "بدون كود مفعّل"}</span>
          <span class="stat-chip">${intelligence.freeShippingGap > 0 ? `متبقي للشحن المجاني ${formatPrice(intelligence.freeShippingGap)}` : "الشحن المجاني مفعل"}</span>
          <span class="stat-chip">${intelligence.quantityGap > 0 ? `أضف ${intelligence.quantityGap} قطع لخصم الكمية` : "خصم الكمية مفعل"}</span>
        </div>
        <div class="actions-row" style="margin-top:16px;">
          ${intelligence.bestCoupon ? `
            <button class="${hasAppliedBestCoupon ? "ghost-button" : "primary-button"}" type="button" ${hasAppliedBestCoupon ? "disabled" : `data-action="apply-offer-code" data-code="${escapeHtml(intelligence.bestCoupon.code)}"`}>
              ${hasAppliedBestCoupon ? `الكود ${escapeHtml(intelligence.bestCoupon.code)} مفعّل` : `طبّق ${escapeHtml(intelligence.bestCoupon.code)}`}
            </button>
          ` : '<a class="primary-button" href="checkout.html">استكمل الطلب</a>'}
          <a class="ghost-button" href="${context === "checkout" ? "cart.html" : "checkout.html"}">${context === "checkout" ? "راجع السلة" : "انتقل إلى الدفع"}</a>
        </div>
      </article>

      <article class="offer-card">
        <h3>مسار الامتيازات</h3>
        <div class="offer-progress">
          <div class="offer-progress__row">
            <div>
              <strong>الشحن المجاني</strong>
              <span>${intelligence.freeShippingGap > 0 ? `أضف ${formatPrice(intelligence.freeShippingGap)} للوصول إلى الحد المجاني.` : "تم فتح الشحن المجاني لهذا الطلب."}</span>
            </div>
            <b>${intelligence.freeShippingGap > 0 ? `${freeShippingProgress}%` : "100%"}</b>
          </div>
          <div class="offer-progress__bar"><span style="width:${freeShippingProgress}%;"></span></div>
        </div>
        <div class="offer-progress">
          <div class="offer-progress__row">
            <div>
              <strong>خصم الكمية</strong>
              <span>${intelligence.quantityGap > 0 ? `أضف ${intelligence.quantityGap} قطع لتفعيل خصم الكمية التلقائي.` : "تم تفعيل خصم الكمية بالفعل."}</span>
            </div>
            <b>${intelligence.quantityGap > 0 ? `${quantityProgress}%` : "100%"}</b>
          </div>
          <div class="offer-progress__bar"><span style="width:${quantityProgress}%;"></span></div>
        </div>
      </article>

      <article class="offer-card">
        <h3>اقتراحات تكمل القيمة</h3>
        ${intelligence.topOffProducts.length ? `
          <div class="offer-picks">
            ${intelligence.topOffProducts.map((item) => `
              <article class="topoff-card">
                <img src="${escapeHtml(item.imgUrl || getGallery(item)[0] || "")}" alt="${escapeHtml(item.name)}" loading="lazy">
                <div>
                  <strong>${escapeHtml(item.name)}</strong>
                  <span>${formatPrice(item.price)} • ${escapeHtml(item.category || "منتج")}</span>
                </div>
                ${context === "checkout"
                  ? `<a class="ghost-button" href="product.html?id=${encodeURIComponent(item.id)}">افتح المنتج</a>`
                  : `<button class="ghost-button" type="button" data-add-cart="${escapeHtml(item.id)}" data-item-type="product">أضف سريعًا</button>`}
              </article>
            `).join("")}
          </div>
        ` : `
          <p class="faq-answer">السلة وصلت إلى مستوى قوي بالفعل. أكمل الطلب الآن أو استخدم هذه المساحة لاحقًا لعروض cross-sell أكثر تقدمًا.</p>
        `}
      </article>
    </section>
  `;
}

function renderCheckoutAssuranceBand(region, pricing) {
  const selectedMethod = region.methods.find((method) => method.key === state.checkoutMethod) || region.methods[0];
  return `
    <section class="trust-band trust-band--compact">
      <article>
        <strong>سوق الشحن الحالي</strong>
        <span>${escapeHtml(region.label)} مع ${escapeHtml(selectedMethod?.label || "الشحن القياسي")} ${selectedMethod?.eta ? `• ${escapeHtml(selectedMethod.eta)}` : ""}</span>
      </article>
      <article>
        <strong>إجمالي واضح قبل التأكيد</strong>
        <span>${formatPrice(pricing.total)} شاملًا الشحن والخصومات الحالية حتى لا يفاجأ العميل في آخر خطوة.</span>
      </article>
      <article>
        <strong>دفع بثقة أعلى</strong>
        <span>خيارات متنوعة تشمل PayPal وStripe والتحويل البنكي والدفع عند الاستلام حسب السوق المختار.</span>
      </article>
      <article>
        <strong>متابعة بعد الطلب</strong>
        <span>بعد الإتمام ينتقل العميل إلى حالة الطلب والتتبع من صفحة مستقلة بدل البقاء داخل نفس الشاشة.</span>
      </article>
    </section>
  `;
}

function renderCheckoutTrustSuite(region, pricing, items) {
  const selectedMethod = region.methods.find((method) => method.key === state.checkoutMethod) || region.methods[0];
  const supportsGift = items.some((item) => item.type === "product");
  return `
    <section class="checkout-trust-grid">
      <article class="summary-card">
        <h3>قبل تأكيد الطلب</h3>
        <div class="metric-table" style="margin-top:14px;">
          <div class="metric-table__row"><span>السوق الحالي</span><strong>${escapeHtml(region.label)}</strong></div>
          <div class="metric-table__row"><span>طريقة التوصيل</span><strong>${escapeHtml(selectedMethod?.label || "قياسي")}</strong></div>
          <div class="metric-table__row"><span>المدة المتوقعة</span><strong>${escapeHtml(selectedMethod?.eta || "--")}</strong></div>
          <div class="metric-table__row"><span>الإجمالي النهائي</span><strong>${formatPrice(pricing.total)}</strong></div>
        </div>
      </article>
      <article class="summary-card">
        <h3>تجربة دفع أهدأ</h3>
        <ul class="feature-list">
          <li>يمكن حفظ العنوان لتسريع الطلبات القادمة.</li>
          <li>الدفع مرن بين PayPal وStripe والتحويل البنكي والاستلام.</li>
          <li>بعد الإتمام تنتقل مباشرة إلى صفحة تتبع مستقلة.</li>
        </ul>
      </article>
      <article class="summary-card">
        <h3>طبقة خدمة إضافية</h3>
        <div class="chip-row">
          <span class="stat-chip">${supportsGift ? "تغليف هدية متاح" : "طلب مباشر سريع"}</span>
          <span class="stat-chip">دعم مباشر</span>
          <span class="stat-chip">رسائل تأكيد</span>
          <span class="stat-chip">حفظ البيانات</span>
        </div>
        <p class="faq-answer" style="margin-top:14px;">إذا احتاج العميل مراجعة أخيرة، تبقى كل البيانات واضحة داخل صفحة واحدة: العنوان، الشحن، الدفع، الخصم، والإجمالي النهائي.</p>
      </article>
    </section>
  `;
}

function renderCategoryPage(category) {
  const config = getListingState();
  const categoryItems = getVisibleProducts().filter((item) => item.category === category);
  const items = filterCatalog(categoryItems, config);
  const brandOptions = getBrandOptions(categoryItems);
  const startPrice = getCategoryStartingPrice(category);
  return `
    <section class="category-showcase">
      <article>
        <span class="category-kicker">Collection focus</span>
        <h2>${escapeHtml(category)}</h2>
        <p>صفحة غنية لهذا القسم، فيها بحث وترتيب وفلاتر ومحتوى أوضح، مع بداية سعر ومؤشرات ثقة سريعة.</p>
      </article>
      <div class="category-showcase__metrics">
        <article><strong>${items.total}</strong><span>منتج ظاهر</span></article>
        <article><strong>${brandOptions.length}</strong><span>علامات</span></article>
        <article><strong>${startPrice ? formatPrice(startPrice) : "--"}</strong><span>يبدأ من</span></article>
      </div>
    </section>
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>كتالوج ${escapeHtml(category)}</h2>
          <p>صفحة مستقلة لهذا القسم تشمل البحث، الفلترة، الترتيب، ومعاينة أوضح للعناصر داخل نفس السياق.</p>
        </div>
        <div class="chip-row">
          <span class="stat-chip">${items.total} منتج</span>
          <span class="stat-chip">Load more</span>
        </div>
      </div>
      ${renderCatalogToolbar(config, brandOptions)}
      ${renderCatalogGrid(items.visible)}
      ${renderLoadMore(items)}
    </section>
  `;
}

function renderAccountsPage() {
  const config = getListingState();
  const accounts = getVisibleAccounts();
  const items = filterCatalog(accounts, config);
  const brandOptions = getBrandOptions(accounts);
  return `
    <section class="category-showcase">
      <article>
        <span class="category-kicker">Digital collection</span>
        <h2>صفحة الحسابات</h2>
        <p>واجهة أهدأ لهذا القسم مع ترتيب أوضح وعرض بصري أفضل للعناصر الرقمية أو الحسابات الجاهزة.</p>
      </article>
      <div class="category-showcase__metrics">
        <article><strong>${items.total}</strong><span>عنصر</span></article>
        <article><strong>${brandOptions.length}</strong><span>مصادر</span></article>
        <article><strong>${accounts.filter((item) => item.featured).length}</strong><span>مميز</span></article>
      </div>
    </section>
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>صفحة الحسابات</h2>
          <p>قسم مستقل للحسابات مع صور كثيرة، أسعار، وصف كامل، وإدارة منفصلة من لوحة الأدمن.</p>
        </div>
      </div>
      ${renderCatalogToolbar(config, brandOptions, true)}
      ${renderCatalogGrid(items.visible, "account")}
      ${renderLoadMore(items)}
    </section>
  `;
}

function renderProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const type = params.get("type") === "account" ? "account" : "product";
  const item = type === "account" ? getAccountById(id) : getProductById(id);
  if (!item) return render404Page("المنتج غير موجود أو لم يعد متاحًا.");

  const gallery = getGallery(item);
  const related = (type === "account" ? getVisibleAccounts() : getVisibleProducts())
    .filter((entry) => entry.id !== item.id && String(entry.category || "") === String(item.category || ""))
    .slice(0, 4);
  const sizes = getSizes(item);
  const reviews = getItemReviews(item.id);
  const stock = getStock(item);
  const highlights = [
    `التوفر الحالي: ${stock > 0 ? "متاح للشحن أو الطلب" : "نفد مؤقتًا"}`,
    `الفئة: ${item.category || (type === "account" ? "الحسابات" : "المنتجات")}`,
    item.brand ? `العلامة: ${item.brand}` : "عرض منسق داخل المتجر",
    sizes.length ? `عدد الخيارات: ${sizes.length}` : "تفاصيل مباشرة بدون تعقيد"
  ];

  updateDocumentMeta(`${item.name} | طَيّة`, item.desc || "تفاصيل المنتج في متجر طَيّة");

  return `
    <section class="detail-grid">
      <article class="section-card">
        <div class="gallery-main"><img id="gallery-main-image" src="${escapeHtml(gallery[0] || item.imgUrl || "")}" alt="${escapeHtml(item.name)}" loading="lazy"></div>
        <div class="gallery-grid" style="margin-top:16px;">
          ${gallery.map((image, index) => `
            <button type="button" class="thumb-button ${index === 0 ? "is-active" : ""}" data-thumb-src="${escapeHtml(image)}">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(item.name)}" loading="lazy">
            </button>
          `).join("")}
        </div>
      </article>
      <aside class="summary-card" id="product-purchase-panel">
        <div class="tag-row">
          <span class="tag">${escapeHtml(item.category || (type === "account" ? "حسابات" : "عام"))}</span>
          ${item.brand ? `<span class="tag">${escapeHtml(item.brand)}</span>` : ""}
          ${stock > 0 ? `<span class="tag">متوفر</span>` : `<span class="tag">نفد</span>`}
        </div>
        <h2 style="margin-top:14px;">${escapeHtml(item.name)}</h2>
        <p class="price" style="margin-top:10px;">${formatPrice(item.price)}</p>
        <p class="mini-note">${escapeHtml(item.desc || "لا يوجد وصف إضافي بعد.")}</p>
        <div class="product-highlight-list">
          ${highlights.map((entry) => `<div class="product-highlight-pill">${escapeHtml(entry)}</div>`).join("")}
        </div>
        <div class="section-stack" style="margin-top:18px;">
          ${sizes.length ? `
            <div>
              <label for="detail-size" class="mini-note">المقاس أو الخيار</label>
              <select class="control" id="detail-size">
                ${sizes.map((size) => `<option value="${escapeHtml(size)}">${escapeHtml(size)}</option>`).join("")}
              </select>
            </div>
          ` : ""}
          <div>
            <label for="detail-quantity" class="mini-note">الكمية</label>
            <input class="control" id="detail-quantity" type="number" min="1" value="1">
          </div>
          <div class="actions-row">
            <button type="button" class="primary-button" data-add-cart="${escapeHtml(item.id)}" data-item-type="${type}">إضافة إلى السلة</button>
            <button type="button" class="ghost-button" data-buy-now="${escapeHtml(item.id)}" data-item-type="${type}">شراء الآن</button>
            <button type="button" class="ghost-button" data-favorite="${escapeHtml(item.id)}">حفظ</button>
          </div>
          <div class="actions-row">
            <a class="ghost-button" href="https://api.whatsapp.com/send?phone=96876787356&text=${encodeURIComponent(`مرحبا، أريد ${item.name}`)}" target="_blank" rel="noopener">واتساب</a>
            <a class="ghost-button" href="cart.html">السلة</a>
          </div>
        </div>
      </aside>
    </section>
    ${atelierSuite}
    <section class="product-assurance-grid">
      <article class="assurance-card"><strong>شراء أوضح</strong><p>صفحة المنتج الآن مستقلة ومصممة لتقود العميل مباشرة إلى السلة أو الشراء الآن بدون تشتيت.</p></article>
      <article class="assurance-card"><strong>تسليم مرن</strong><p>خيارات الشحن في صفحة الدفع مرتبطة بالسوق المختار مع تقدير للمدة وتكلفة واضحة.</p></article>
      <article class="assurance-card"><strong>ثقة أعلى</strong><p>المراجعات، المنتجات المشابهة، وواتساب كلها داخل نفس سياق المنتج لتقليل التردد قبل الشراء.</p></article>
    </section>
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>مراجعات المنتج</h2>
          <p>صفحة المنتج الآن مستقلة، لذلك صارت المراجعات ومعلومات الشراء أسهل وأوضح.</p>
        </div>
      </div>
      <div class="section-stack">
        ${reviews.length ? reviews.map((review) => `
          <article class="order-card">
            <div class="order-card__head">
              <strong>${escapeHtml(review.name || "عميل")}</strong>
              <span class="tag">${escapeHtml(String(review.rating || 5))}/5</span>
            </div>
            <p class="faq-answer">${escapeHtml(review.comment || "")}</p>
          </article>
        `).join("") : '<div class="empty-state"><strong>لا توجد مراجعات بعد</strong><p>يمكنك إضافة مراجعة من النموذج التالي.</p></div>'}
        <form class="auth-card" id="product-review-form" data-product-id="${escapeHtml(item.id)}">
          <h3>أضف مراجعتك</h3>
          <div class="form-grid form-grid--two" style="margin-top:12px;">
            <input class="control" name="name" placeholder="الاسم">
            <select class="control" name="rating">
              <option value="5">5 / 5</option>
              <option value="4">4 / 5</option>
              <option value="3">3 / 5</option>
              <option value="2">2 / 5</option>
              <option value="1">1 / 5</option>
            </select>
          </div>
          <textarea class="textarea" name="comment" placeholder="اكتب تعليقك هنا"></textarea>
          <button class="primary-button" type="submit">حفظ المراجعة</button>
        </form>
      </div>
    </section>
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>منتجات مشابهة</h2>
          <p>اقتراحات من نفس الفئة داخل صفحة مستقلة للمنتج.</p>
        </div>
      </div>
      ${renderCatalogGrid(related, type)}
    </section>
  `;
}

function renderProductPageV2() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const type = params.get("type") === "account" ? "account" : "product";
  const item = type === "account" ? getAccountById(id) : getProductById(id);
  if (!item) return render404Page("المنتج غير موجود أو لم يعد متاحًا.");

  rememberRecentlyViewed(item, type);
  const gallery = getGallery(item);
  const related = (type === "account" ? getVisibleAccounts() : getVisibleProducts())
    .filter((entry) => entry.id !== item.id && String(entry.category || "") === String(item.category || ""))
    .slice(0, 4);
  const personalized = getPersonalizedRecommendations(4, [item.id]);
  const recentViews = getRecentlyViewedItems(item.id).slice(0, 4);
  const sizes = getSizes(item);
  const reviews = getItemReviews(item.id);
  const stock = getStock(item);
  const averageRating = getAverageRating(reviews);
  const atelierSuite = renderProductAtelierSuite(item, type, stock, sizes, reviews, related, personalized);
  const highlightRows = [
    `التوفر الحالي: ${stock > 0 ? "متاح للشحن أو الطلب" : "نفد مؤقتًا"}`,
    `الفئة: ${item.category || (type === "account" ? "الحسابات" : "المنتجات")}`,
    item.brand ? `العلامة: ${item.brand}` : "عرض منسق داخل المتجر",
    sizes.length ? `عدد الخيارات: ${sizes.length}` : "شراء مباشر بدون تعقيد",
    reviews.length ? `متوسط التقييم: ${averageRating.toFixed(1)} / 5` : "قيّم المنتج بعد الشراء"
  ];

  updateDocumentMeta(`${item.name} | طَيّة`, item.desc || "تفاصيل المنتج في متجر طَيّة");

  return `
    <section class="detail-grid">
      <article class="section-card">
        <div class="gallery-main"><img id="gallery-main-image" src="${escapeHtml(gallery[0] || item.imgUrl || "")}" alt="${escapeHtml(item.name)}" loading="lazy"></div>
        <div class="gallery-grid" style="margin-top:16px;">
          ${gallery.map((image, index) => `
            <button type="button" class="thumb-button ${index === 0 ? "is-active" : ""}" data-thumb-src="${escapeHtml(image)}">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(item.name)}" loading="lazy">
            </button>
          `).join("")}
        </div>
      </article>
      <aside class="summary-card">
        <div class="tag-row">
          <span class="tag">${escapeHtml(item.category || (type === "account" ? "الحسابات" : "عام"))}</span>
          ${item.brand ? `<span class="tag">${escapeHtml(item.brand)}</span>` : ""}
          ${stock > 0 ? `<span class="tag">متوفر</span>` : `<span class="tag">نفد</span>`}
        </div>
        <h2 style="margin-top:14px;">${escapeHtml(item.name)}</h2>
        <p class="price" style="margin-top:10px;">${formatPrice(item.price)}</p>
        <p class="mini-note">${escapeHtml(item.desc || "لا يوجد وصف إضافي بعد.")}</p>
        <div class="product-highlight-list">
          ${highlightRows.map((entry) => `<div class="product-highlight-pill">${escapeHtml(entry)}</div>`).join("")}
        </div>
        <div class="stock-meter" style="margin-top:16px;">
          <div class="stock-meter__head"><strong>جاهزية المخزون</strong><span>${stock > 0 ? `${stock} متاح` : "غير متاح الآن"}</span></div>
          <div class="stock-meter__track"><span class="stock-meter__fill" style="width:${stock > 0 ? Math.max(12, Math.min(100, stock * 12)) : 0}%"></span></div>
        </div>
        <div class="section-stack" style="margin-top:18px;">
          ${sizes.length ? `
            <div>
              <label for="detail-size" class="mini-note">المقاس أو الخيار</label>
              <select class="control" id="detail-size">
                ${sizes.map((size) => `<option value="${escapeHtml(size)}">${escapeHtml(size)}</option>`).join("")}
              </select>
            </div>
          ` : ""}
          <div>
            <label for="detail-quantity" class="mini-note">الكمية</label>
            <input class="control" id="detail-quantity" type="number" min="1" value="1" ${stock === 0 ? "disabled" : ""}>
          </div>
          <div class="actions-row">
            ${stock > 0 ? `
              <button type="button" class="primary-button" data-add-cart="${escapeHtml(item.id)}" data-item-type="${type}">إضافة إلى السلة</button>
              <button type="button" class="ghost-button" data-buy-now="${escapeHtml(item.id)}" data-item-type="${type}">شراء الآن</button>
            ` : `
              <button type="button" class="primary-button" data-stock-alert="${escapeHtml(item.id)}" data-item-type="${type}">نبّهني عند التوفر</button>
            `}
            <button type="button" class="ghost-button" data-favorite="${escapeHtml(item.id)}">${state.favorites.includes(item.id) ? "محفوظ" : "حفظ"}</button>
            <button type="button" class="ghost-button" data-compare="${escapeHtml(item.id)}" data-item-type="${type}">${state.compare.some((entry) => entry.id === item.id) ? "في المقارنة" : "قارن"}</button>
          </div>
          <div class="actions-row">
            <a class="ghost-button" href="https://api.whatsapp.com/send?phone=96876787356&text=${encodeURIComponent(`مرحبا، أريد ${item.name}`)}" target="_blank" rel="noopener">واتساب</a>
            <button type="button" class="ghost-button" data-copy-url="${escapeHtml(window.location.href)}">نسخ الرابط</button>
            <a class="ghost-button" href="cart.html">السلة</a>
          </div>
        </div>
      </aside>
    </section>
    <section class="product-assurance-grid">
      <article class="assurance-card"><strong>قرار شراء أوضح</strong><p>صفحة المنتج الآن تجمع الصور والخيارات والمخزون ووسائل الإقناع داخل سياق واحد منظم.</p></article>
      <article class="assurance-card"><strong>تسليم مرن</strong><p>خيارات الشحن في صفحة الدفع مرتبطة بالسوق المختار مع مدة وتكلفة واضحة لكل خيار.</p></article>
      <article class="assurance-card"><strong>ثقة أعلى</strong><p>المراجعات، المنتجات المشابهة، والمشاهدات الأخيرة كلها داخل نفس المسار لتقليل التردد قبل الشراء.</p></article>
      <article class="assurance-card"><strong>مشاركة أسرع</strong><p>واتساب، نسخ الرابط، ومشاركة X أصبحت أقرب للعميل داخل نفس الصفحة لرفع الانتشار العضوي.</p></article>
    </section>
    ${renderProductEditorialSuite(item, type, reviews, stock, gallery, sizes)}
    ${type === "product" ? renderBundleSuggestion(item) : ""}
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>مراجعات المنتج</h2>
          <p>تعليقات حقيقية مع إمكانية إضافة مراجعة مباشرة من الصفحة نفسها.</p>
        </div>
      </div>
      <div class="section-stack">
        ${reviews.length ? reviews.map((review) => `
          <article class="order-card">
            <div class="order-card__head">
              <strong>${escapeHtml(review.name || "عميل")}</strong>
              <span class="tag">${escapeHtml(String(review.rating || 5))}/5</span>
            </div>
            <p class="faq-answer">${escapeHtml(review.comment || "")}</p>
          </article>
        `).join("") : '<div class="empty-state"><strong>لا توجد مراجعات بعد</strong><p>يمكنك إضافة مراجعة من النموذج التالي.</p></div>'}
        <form class="auth-card" id="product-review-form" data-product-id="${escapeHtml(item.id)}">
          <h3>أضف مراجعتك</h3>
          <div class="form-grid form-grid--two" style="margin-top:12px;">
            <input class="control" name="name" placeholder="الاسم">
            <select class="control" name="rating">
              <option value="5">5 / 5</option>
              <option value="4">4 / 5</option>
              <option value="3">3 / 5</option>
              <option value="2">2 / 5</option>
              <option value="1">1 / 5</option>
            </select>
          </div>
          <textarea class="textarea" name="comment" placeholder="اكتب تعليقك هنا"></textarea>
          <button class="primary-button" type="submit">حفظ المراجعة</button>
        </form>
      </div>
    </section>
    ${renderProductQuestionsSection(item)}
    ${related.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>منتجات مشابهة</h2>
            <p>اقتراحات من نفس الفئة لتوسيع خيارات العميل داخل نفس المسار.</p>
          </div>
        </div>
        ${renderCatalogGrid(related, type)}
      </section>
    ` : ""}
    ${personalized.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>قد يناسب ذوقك أيضًا</h2>
            <p>اقتراحات مخصصة بناءً على سلوكك داخل المتجر حتى تصبح الصفحة أكثر ذكاءً.</p>
          </div>
        </div>
        ${renderCatalogGrid(personalized, "mixed")}
      </section>
    ` : ""}
    ${recentViews.length ? `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>عد إلى ما شاهدته مؤخرًا</h2>
            <p>لمنع فقدان السياق أثناء التنقل بين المنتجات والأقسام.</p>
          </div>
        </div>
        ${renderCatalogGrid(recentViews, "mixed")}
      </section>
    ` : ""}
  `;
}

function renderProductAtelierSuite(item, type, stock, sizes, reviews, related, personalized) {
  const facts = [
    { label: "الخامة", value: item.material || (type === "account" ? "تسليم رقمي منظم" : "خامة مختارة") },
    { label: "اللون", value: item.color || "متناسق مع هوية المتجر" },
    { label: "المجموعة", value: item.collection || item.accountType || "Signature line" },
    { label: "التوفر", value: stock > 0 ? `${stock} جاهز الآن` : "نفد مؤقتًا" }
  ];
  const serviceCards = [
    {
      title: "خدمة ما قبل الشراء",
      body: stock > 0 ? "المخزون ظاهر بوضوح مع أزرار شراء مباشرة ومشاركة سريعة ونسخ للرابط." : "يمكن للعميل طلب تنبيه تلقائي عند توفر المنتج بدل فقدانه بعد الزيارة الأولى."
    },
    {
      title: "التوصيل والانطباع",
      body: type === "account" ? "العناصر الرقمية باتت تظهر كتجربة مستقلة وواضحة بدل اختلاطها مع المنتجات التقليدية." : "يمكن ربط هذه القطعة بسهولة مع شحن السوق المختار وتجربة هدايا ورسائل خاصة داخل الدفع."
    },
    {
      title: "الاقتراحات الذكية",
      body: `${related.length} عناصر مشابهة و${personalized.length} اقتراحات شخصية تجعل الصفحة أقرب إلى مستشار بيع فعلي.`
    },
    {
      title: "الثقة الاجتماعية",
      body: reviews.length ? `متوسط التقييم الحالي ${getAverageRating(reviews).toFixed(1)} من 5 مع مراجعات وأسئلة مباشرة داخل الصفحة.` : "الصفحة جاهزة لاستقبال المراجعات والأسئلة وبناء الثقة مع أول دفعة طلبات حقيقية."
    }
  ];

  return `
    <section class="atelier-suite">
      <div class="atelier-suite__hero">
        <div class="atelier-suite__copy">
          <span class="category-kicker">Product atelier</span>
          <h2>صفحة منتج مصممة لتقنع وتطمئن وتدفع للشراء، لا لتعرض المعلومات فقط.</h2>
          <p>أضفت طبقة عرض أرقى لهذا النوع من الصفحات: حقائق واضحة، خدمة مرافقة للشراء، ورسائل تجعل القرار أسهل على الجوال والكمبيوتر.</p>
          <div class="chip-row">
            <span class="stat-chip">${type === "account" ? "Digital delivery" : "Luxury product"}</span>
            <span class="stat-chip">${sizes.length ? `${sizes.length} خيارات متاحة` : "طلب مباشر"}</span>
            <span class="stat-chip">${reviews.length ? `${reviews.length} مراجعة` : "جاهز للمراجعات"}</span>
          </div>
        </div>
        <div class="atelier-facts">
          ${facts.map((fact) => `
            <article class="atelier-fact">
              <span>${escapeHtml(fact.label)}</span>
              <strong>${escapeHtml(fact.value)}</strong>
            </article>
          `).join("")}
        </div>
      </div>
      <div class="atelier-suite__grid">
        ${serviceCards.map((card) => `
          <article class="atelier-card">
            <strong>${escapeHtml(card.title)}</strong>
            <p>${escapeHtml(card.body)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProductStickyDock(item, type, stock) {
  const availability = stock > 0 ? `${stock} متاح` : "غير متاح الآن";
  const stockAction = stock > 0
    ? `
        <button type="button" class="primary-button" data-add-cart="${escapeHtml(item.id)}" data-item-type="${type}">إضافة للسلة</button>
        <button type="button" class="ghost-button" data-buy-now="${escapeHtml(item.id)}" data-item-type="${type}">شراء الآن</button>
      `
    : `<button type="button" class="primary-button" data-stock-alert="${escapeHtml(item.id)}" data-item-type="${type}">نبهني عند التوفر</button>`;

  return `
    <aside class="product-dock">
      <div class="product-dock__meta">
        <span class="tag">${escapeHtml(item.category || (type === "account" ? "الحسابات" : "منتج"))}</span>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${formatPrice(item.price)} • ${escapeHtml(availability)}</span>
      </div>
      <div class="product-dock__actions">
        ${stockAction}
        <a class="ghost-button" href="#product-purchase-panel">خيارات الشراء</a>
      </div>
    </aside>
  `;
}

function renderCartPage() {
  const items = getCartItemsDetailed();
  const pricing = getCartPricing();
  const savedItems = getSavedForLaterItemsDetailed();
  const suggestions = getVisibleProducts().filter((product) => !items.some((entry) => entry.id === product.id)).slice(0, 4);
  if (!items.length) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>السلة فارغة حاليًا</strong>
          <p>أضف منتجات من الصفحات المستقلة للأقسام ثم أكمل إلى صفحة الدفع المنفصلة.</p>
          <a class="primary-button" href="index.html">تصفح الأقسام</a>
        </div>
      </section>
      ${savedItems.length ? renderSavedForLaterPanel() : ""}
    `;
  }

  return `
    ${renderCartExperienceBand(pricing, items)}
    ${renderOfferStudio(pricing, items, "cart")}
    ${renderCartConversionSuite(pricing, items)}
    <section class="content-grid content-grid--sidebar">
      <div class="section-stack">
        ${items.map((item) => `
          <article class="cart-item">
            <a href="product.html?id=${encodeURIComponent(item.id)}${item.type === "account" ? "&type=account" : ""}" class="cart-item__media">
              <img src="${escapeHtml(item.imgUrl || getGallery(item)[0] || "")}" alt="${escapeHtml(item.name)}" loading="lazy">
            </a>
            <div class="cart-item__body">
              <div class="order-card__head">
                <div>
                  <strong>${escapeHtml(item.name)}</strong>
                  <p class="mini-note">${escapeHtml(item.category || (item.type === "account" ? "الحسابات" : "المنتجات"))}</p>
                </div>
                <span class="price">${formatPrice(item.price)}</span>
              </div>
              <div class="tag-row">
                ${item.size ? `<span class="tag">الخيار: ${escapeHtml(item.size)}</span>` : ""}
                <span class="tag">${escapeHtml(item.type === "account" ? "حساب" : "منتج")}</span>
              </div>
              <div class="actions-row" style="margin-top:16px;">
                <label class="mini-note" for="qty-${escapeHtml(item.cartKey)}">الكمية</label>
                <input
                  class="control qty-input"
                  id="qty-${escapeHtml(item.cartKey)}"
                  type="number"
                  min="1"
                  max="${Math.max(1, getStock(item))}"
                  value="${escapeHtml(String(item.quantity || 1))}"
                  data-cart-qty="${escapeHtml(item.cartKey)}"
                >
                <button class="ghost-button" type="button" data-save-later="${escapeHtml(item.cartKey)}">احفظه لاحقًا</button>
                <button class="ghost-button" type="button" data-remove-cart="${escapeHtml(item.cartKey)}">حذف</button>
              </div>
            </div>
          </article>
        `).join("")}
        ${renderSavedForLaterPanel(true)}
        ${suggestions.length ? `
          <section class="section-card section-card--soft">
            <div class="section-head">
              <div>
                <h3>قد تكمل الطلب بهذه المنتجات</h3>
                <p>اقتراحات سريعة قبل الانتقال إلى الدفع لرفع قيمة السلة بشكل ذكي.</p>
              </div>
            </div>
            ${renderCatalogGrid(suggestions)}
          </section>
        ` : ""}
      </div>
      <div class="section-stack">
        ${renderCartDeliveryPreview(pricing)}
        ${renderCheckoutSummary(pricing, true)}
      </div>
    </section>
  `;
}

function renderCheckoutPage() {
  const items = getCartItemsDetailed();
  if (!items.length) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>لا يمكن فتح الدفع بدون سلة</strong>
          <p>أضف منتجات أولًا من صفحات الأقسام أو من صفحة المنتج.</p>
          <a class="primary-button" href="cart.html">الذهاب إلى السلة</a>
        </div>
      </section>
    `;
  }

  state.checkoutRegion = state.checkoutRegion || "om";
  const region = SHIPPING_REGIONS[state.checkoutRegion] || SHIPPING_REGIONS.om;
  state.checkoutMethod = state.checkoutMethod || region.methods[0]?.key || "";
  const pricing = getCartPricing(state.checkoutRegion, state.checkoutMethod, state.checkoutCoupon);
  const paymentHint = renderPaymentHint(state.checkoutPayment || "cod");
  const addresses = loadJson(KEYS.addresses, []);

  return `
    <section class="checkout-steps">
      <div class="checkout-step is-complete"><span>1</span><strong>السلة</strong></div>
      <div class="checkout-step is-active"><span>2</span><strong>الدفع</strong></div>
      <div class="checkout-step"><span>3</span><strong>التتبع</strong></div>
    </section>
    ${renderCheckoutAssuranceBand(region, pricing)}
    ${renderCheckoutTrustSuite(region, pricing, items)}
    ${renderOfferStudio(pricing, items, "checkout")}
    <section class="content-grid content-grid--sidebar">
      <form class="section-card" id="checkout-form">
        <div class="section-head">
          <div>
            <h2>صفحة دفع مستقلة</h2>
            <p>بيانات العميل، العنوان، الشحن، الدفع، والكوبون داخل صفحة واحدة واضحة ومنظمة.</p>
          </div>
          <div class="chip-row">
            <span class="stat-chip">الشحن المجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع</span>
          </div>
        </div>

        <div class="form-grid form-grid--two">
          <div>
            <label class="mini-note" for="checkout-name">الاسم الكامل</label>
            <input class="control" id="checkout-name" name="name" value="${escapeHtml(state.customer.name || state.user?.displayName || "")}" required>
          </div>
          <div>
            <label class="mini-note" for="checkout-email">البريد الإلكتروني</label>
            <input class="control" id="checkout-email" name="email" type="email" value="${escapeHtml(state.customer.email || state.user?.email || "")}" required>
          </div>
          <div>
            <label class="mini-note" for="checkout-phone">رقم الهاتف</label>
            <input class="control" id="checkout-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${escapeHtml(state.customer.phone || state.user?.phoneNumber || "")}" required>
          </div>
          <div>
            <label class="mini-note" for="checkout-region">الدولة / السوق</label>
            <select class="control" id="checkout-region" name="region">
              ${Object.entries(SHIPPING_REGIONS).map(([key, value]) => `
                <option value="${escapeHtml(key)}" ${key === state.checkoutRegion ? "selected" : ""}>${escapeHtml(value.label)}</option>
              `).join("")}
            </select>
          </div>
        </div>

        <div class="form-grid form-grid--two" style="margin-top:18px;">
          <div>
            <label class="mini-note" for="checkout-state">الولاية / المدينة</label>
            <input class="control" id="checkout-state" name="wilayat" value="${escapeHtml(state.customer.wilayat || "")}" required>
          </div>
          <div>
            <label class="mini-note" for="checkout-address">العنوان التفصيلي</label>
            <input class="control" id="checkout-address" name="address" value="${escapeHtml(state.customer.address || "")}" required>
          </div>
        </div>

        ${addresses.length ? `
          <div class="section-stack" style="margin-top:18px;">
            <label class="mini-note" for="checkout-address-book">العناوين المحفوظة</label>
            <select class="control" id="checkout-address-book" data-address-book>
              <option value="">اختر عنوانًا محفوظًا</option>
              ${addresses.map((entry, index) => `
                <option value="${index}">${escapeHtml(entry.name || entry.wilayat || "عنوان محفوظ")} - ${escapeHtml(entry.wilayat || "")}</option>
              `).join("")}
            </select>
          </div>
        ` : ""}

        <div class="form-grid form-grid--two" style="margin-top:18px;">
          <div>
            <label class="mini-note" for="checkout-method">طريقة الشحن</label>
            <select class="control" id="checkout-method" name="deliveryType">
              ${region.methods.map((method) => `
                <option value="${escapeHtml(method.key)}" ${method.key === state.checkoutMethod ? "selected" : ""}>
                  ${escapeHtml(method.label)} - ${method.price ? formatPrice(method.price) : "مجانًا"} - ${escapeHtml(method.eta)}
                </option>
              `).join("")}
            </select>
          </div>
          <div>
            <label class="mini-note" for="checkout-payment">طريقة الدفع</label>
            <select class="control" id="checkout-payment" name="paymentMethod">
              <option value="cod" ${state.checkoutPayment === "cod" ? "selected" : ""}>الدفع عند الاستلام</option>
              <option value="paypal" ${state.checkoutPayment === "paypal" ? "selected" : ""}>PayPal</option>
              <option value="stripe" ${state.checkoutPayment === "stripe" ? "selected" : ""}>Stripe / Apple Pay</option>
              <option value="bank" ${state.checkoutPayment === "bank" ? "selected" : ""}>تحويل بنكي</option>
            </select>
          </div>
        </div>

        <div class="form-grid form-grid--two" style="margin-top:18px;">
          <div>
            <label class="mini-note" for="checkout-coupon">كود الخصم</label>
            <div class="inline-field">
              <input class="control" id="checkout-coupon" name="coupon" value="${escapeHtml(state.checkoutCoupon || "")}" placeholder="WELCOME10">
              <button type="button" class="ghost-button" data-apply-coupon>تطبيق</button>
            </div>
          </div>
          <div>
            <label class="mini-note" for="checkout-note">ملاحظة الطلب</label>
            <input class="control" id="checkout-note" name="note" placeholder="مثل: الرجاء التواصل قبل التوصيل">
          </div>
        </div>

        <div class="section-card section-card--soft" style="margin-top:18px;">
          <h3>خيارات إضافية للطلب</h3>
          <div class="form-grid form-grid--two" style="margin-top:12px;">
            <label class="switch-line"><input type="checkbox" name="giftWrap"> تغليف هدية فاخر</label>
            <label class="switch-line"><input type="checkbox" name="saveAddress"> حفظ هذا العنوان تلقائيًا</label>
          </div>
          <input class="control" name="giftMessage" placeholder="رسالة الهدية أو الإهداء" style="margin-top:14px;">
        </div>

        <div class="section-card section-card--soft" style="margin-top:18px;">
          <h3>تلميح الدفع</h3>
          <p class="faq-answer">${paymentHint}</p>
          <div class="chip-row" style="margin-top:12px;">
            <span class="stat-chip">Checkout منظم</span>
            <span class="stat-chip">مراجعة نهائية واضحة</span>
            <span class="stat-chip">تتبع بعد الطلب</span>
          </div>
        </div>

        <div class="actions-row" style="margin-top:22px;">
          <button class="primary-button" type="submit">تأكيد الطلب</button>
          <a class="ghost-button" href="cart.html">العودة إلى السلة</a>
        </div>
      </form>
      ${renderCheckoutSummary(pricing)}
    </section>
  `;
}

function renderContactPage() {
  return `
    <section class="content-grid content-grid--sidebar">
      <form class="section-card" id="contact-form">
        <div class="section-head">
          <div>
            <h2>تواصل معنا</h2>
            <p>صفحة مستقلة للدعم والاستفسارات مع رسائل نجاح وخطأ وإشعارات واضحة.</p>
          </div>
        </div>
        <div class="form-grid form-grid--two">
          <input class="control" name="name" placeholder="الاسم" required>
          <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" required>
        </div>
        <input class="control" name="subject" placeholder="الموضوع" style="margin-top:14px;" required>
        <textarea class="textarea" name="message" placeholder="اكتب رسالتك هنا" required></textarea>
        <div class="actions-row">
          <button class="primary-button" type="submit">إرسال الرسالة</button>
          <a class="ghost-button" href="https://api.whatsapp.com/send?phone=96876787356" target="_blank" rel="noopener">واتساب</a>
        </div>
      </form>
      <aside class="section-stack">
        <article class="summary-card">
          <h3>قنوات التواصل</h3>
          <div class="section-stack" style="margin-top:14px;">
            <div><strong>واتساب:</strong><p class="mini-note">+968 7678 7356</p></div>
            <div><strong>البريد:</strong><p class="mini-note">support@tayya.om</p></div>
            <div><strong>ساعات الرد:</strong><p class="mini-note">يوميًا من 10 صباحًا حتى 10 مساءً</p></div>
          </div>
        </article>
        <article class="summary-card">
          <h3>لماذا صفحة مستقلة؟</h3>
          <p class="faq-answer">لأن الزائر يصل مباشرة إلى صفحة الدعم بدون الضياع بين أقسام كثيرة داخل الصفحة الرئيسية.</p>
        </article>
      </aside>
    </section>
  `;
}

function renderFaqPage() {
  const faqs = [
    ["كيف يتم الشحن؟", "يمكنك اختيار شحن منزلي أو استلام من نقطة شحن أو خيارات خليجية ودولية بحسب السوق."],
    ["هل يوجد دفع عند الاستلام؟", "نعم، يوجد دفع عند الاستلام إضافة إلى PayPal وStripe والتحويل البنكي."],
    ["كيف أتابع طلبي؟", "من صفحة تتبع الطلب أو من صفحة حسابي بعد تسجيل الدخول."],
    ["هل الصور كثيرة داخل المنتج؟", "نعم، صفحة المنتج تدعم صورة رئيسية وصور فرعية ومعرضًا احترافيًا."]
  ];

  return `
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>الأسئلة الشائعة</h2>
          <p>هذه الصفحة مستقلة لتحسين الوصول وسهولة الفهرسة في محركات البحث.</p>
        </div>
      </div>
      <div class="faq-grid">
        ${faqs.map(([question, answer]) => `
          <article class="faq-card">
            <h3>${escapeHtml(question)}</h3>
            <p class="faq-answer">${escapeHtml(answer)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTrackOrderPage() {
  const query = state.trackQuery || new URLSearchParams(window.location.search).get("order") || "";
  const orders = state.orders.filter((order) => {
    if (!query) return false;
    const q = query.trim().toLowerCase();
    return [order.id, order.orderNumber, order.custPhone, order.custEmail].some((value) => String(value || "").toLowerCase().includes(q));
  });

  return `
    <section class="content-grid content-grid--sidebar">
      <form class="section-card" id="track-form">
        <div class="section-head">
          <div>
            <h2>تتبع الطلب</h2>
            <p>ابحث برقم الطلب أو البريد الإلكتروني أو رقم الهاتف.</p>
          </div>
        </div>
        <div class="inline-field">
          <input class="control" name="query" value="${escapeHtml(query)}" placeholder="مثال: TAY-123456" required>
          <button class="primary-button" type="submit">بحث</button>
        </div>
        <p class="mini-note" style="margin-top:12px;">إذا كنت مسجل الدخول فستظهر طلباتك أيضًا داخل صفحة الحساب.</p>
      </form>
      <div class="section-stack">
        ${query ? (orders.length ? orders.map((order) => renderTrackedOrderDetails(order)).join("") : `
          <article class="summary-card">
            <strong>لم يتم العثور على طلب</strong>
            <p class="mini-note">تأكد من كتابة رقم الطلب أو البريد الإلكتروني بشكل صحيح.</p>
          </article>
        `) : `
          <article class="summary-card">
            <strong>ابدأ بالبحث</strong>
            <p class="mini-note">أدخل رقم الطلب أو بيانات التواصل حتى تظهر لك الحالة.</p>
          </article>
        `}
      </div>
    </section>
  `;
}

function renderTrackedOrderDetails(order) {
  const progress = order.status === "تم التوصيل" ? 100 : order.status === "تم الشحن" ? 66 : 33;
  const paymentStatus = resolveOrderPaymentStatus(order);
  return `
    <article class="section-card">
      <div class="section-head">
        <div>
          <h2>${escapeHtml(order.orderNumber || order.id || "طلب")}</h2>
          <p>تم تطوير صفحة التتبع لتعرض الحالة، الشحن، الفاتورة، والعناصر داخل بطاقة أوضح.</p>
        </div>
        <span class="tag">${escapeHtml(order.status || "قيد المعالجة")}</span>
      </div>
      <div class="order-progress"><span style="width:${progress}%"></span></div>
      <div class="metric-table" style="margin-top:16px;">
        <div class="metric-table__row"><span>العميل</span><strong>${escapeHtml(order.custName || "عميل")}</strong></div>
        <div class="metric-table__row"><span>الدفع</span><strong>${escapeHtml(order.paymentMethodLabel || order.paymentMethod || "--")}</strong></div>
        <div class="metric-table__row"><span>حالة الدفع</span><strong>${escapeHtml(paymentStatus || "--")}</strong></div>
        <div class="metric-table__row"><span>الشحن</span><strong>${escapeHtml(order.deliveryType || "--")}</strong></div>
        <div class="metric-table__row"><span>الإجمالي</span><strong>${formatPrice(order.total || 0)}</strong></div>
      </div>
      <div class="tag-row" style="margin-top:16px;">
        ${order.marketLabel ? `<span class="tag">${escapeHtml(order.marketLabel)}</span>` : ""}
        ${order.deliveryEstimate ? `<span class="tag">المدة ${escapeHtml(order.deliveryEstimate)}</span>` : ""}
        ${order.giftWrap ? '<span class="tag">تغليف هدية</span>' : ""}
        ${order.loyaltyEarned ? `<span class="tag">+${escapeHtml(String(order.loyaltyEarned))} نقطة</span>` : ""}
      </div>
      ${order.paymentInstructions ? `<p class="mini-note" style="margin-top:14px;">${escapeHtml(order.paymentInstructions)}</p>` : ""}
      <div class="section-stack" style="margin-top:16px;">
        ${(order.items || []).map((item) => `
          <article class="order-card">
            <div class="order-card__head">
              <strong>${escapeHtml(item.name || item.id || "عنصر")}</strong>
              <span class="price">${formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}</span>
            </div>
            <p class="mini-note">الكمية: ${escapeHtml(String(item.quantity || 1))}${item.size ? ` • الخيار: ${escapeHtml(item.size)}` : ""}</p>
          </article>
        `).join("")}
      </div>
      <div class="actions-row" style="margin-top:18px;">
        ${order.paymentLink && !/تم السداد|تم التحصيل|تم التحقق/.test(paymentStatus) ? `<a class="primary-button" href="${escapeHtml(order.paymentLink)}" target="_blank" rel="noopener">${escapeHtml(order.paymentActionLabel || "إكمال الدفع")}</a>` : ""}
        <button class="ghost-button" type="button" data-download-invoice="${escapeHtml(order.id)}">تحميل الفاتورة</button>
        <button class="ghost-button" type="button" data-reorder="${escapeHtml(order.id)}">إعادة الطلب</button>
      </div>
    </article>
  `;
}

function renderLoginPage() {
  if (state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>أنت مسجل الدخول بالفعل</strong>
          <p>يمكنك الآن الانتقال إلى صفحة الحساب أو لوحة الأدمن إذا كنت مخولًا.</p>
          <div class="actions-row">
            <a class="primary-button" href="account.html">حسابي</a>
            ${isAdmin() ? '<a class="ghost-button" href="admin.html">الأدمن</a>' : ""}
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="content-grid content-grid--sidebar">
      <form class="auth-card" id="login-form">
        <div class="section-head">
          <div>
            <h2>تسجيل الدخول</h2>
            <p>صفحة منفصلة للدخول واسترجاع كلمة المرور وتسجيل الدخول عبر Google.</p>
          </div>
        </div>
        <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" required>
        <input class="control" name="password" type="password" placeholder="كلمة المرور" required>
        <div class="actions-row">
          <button class="primary-button" type="submit">دخول</button>
          <button class="ghost-button" type="button" data-social-login="google">Google</button>
          <button class="ghost-button" type="button" data-reset-password>استرجاع كلمة المرور</button>
        </div>
      </form>
      <aside class="summary-card">
        <h3>ليس لديك حساب؟</h3>
        <p class="faq-answer">أنشئ حسابًا جديدًا لتتبع الطلبات وحفظ العناوين والمراجعات والمفضلة.</p>
        <a class="primary-button" href="register.html">إنشاء حساب</a>
      </aside>
    </section>
  `;
}

function renderRegisterPage() {
  if (state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>تم تسجيل الدخول</strong>
          <p>يمكنك الآن الذهاب إلى صفحة الحساب لإدارة العناوين والطلبات.</p>
          <a class="primary-button" href="account.html">حسابي</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="content-grid content-grid--sidebar">
      <form class="auth-card" id="register-form">
        <div class="section-head">
          <div>
            <h2>إنشاء حساب جديد</h2>
            <p>بنية منظمة لتسجيل المستخدمين بدل وضعها داخل الصفحة الرئيسية.</p>
          </div>
        </div>
        <div class="form-grid form-grid--two">
          <input class="control" name="name" placeholder="الاسم الكامل" required>
          <input class="control" name="email" type="email" placeholder="البريد الإلكتروني" required>
        </div>
        <div class="form-grid form-grid--two" style="margin-top:14px;">
          <input class="control" name="phone" placeholder="رقم الهاتف">
          <input class="control" name="password" type="password" placeholder="كلمة المرور" required>
        </div>
        <button class="primary-button" type="submit">إنشاء الحساب</button>
      </form>
      <aside class="summary-card">
        <h3>لماذا التسجيل؟</h3>
        <p class="faq-answer">لإدارة الطلبات، حفظ العناوين، كتابة المراجعات، وتتبع مشترياتك لاحقًا.</p>
      </aside>
    </section>
  `;
}

function renderLoginPage() {
  if (state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>أنت مسجل الدخول بالفعل</strong>
          <p>يمكنك الآن الانتقال إلى صفحة الحساب أو لوحة الأدمن إذا كنت مخولًا.</p>
          <div class="actions-row">
            <a class="primary-button" href="account.html">حسابي</a>
            ${isAdmin() ? '<a class="ghost-button" href="admin.html">الأدمن</a>' : ""}
          </div>
        </div>
      </section>
    `;
  }

  const phoneHint = state.firebaseReady
    ? "أدخل رقمك بصيغة دولية مثل +968 ثم أكمل التحقق بالرمز."
    : `وضع محلي للتجربة: بعد إرسال الرمز استخدم ${LOCAL_PHONE_OTP}.`;
  const verifyHint = state.phoneAuth.step === "verify"
    ? `<p class="auth-note">تم إرسال الرمز إلى <strong>${escapeHtml(maskPhoneNumber(state.phoneAuth.phoneNumber))}</strong>. أدخل الرمز المكون من 6 أرقام لإكمال الدخول.</p>`
    : "";

  return `
    <section class="content-grid content-grid--sidebar">
      <div class="auth-stack">
        <form class="auth-card auth-card--stacked" id="login-form">
          <div class="section-head">
            <div>
              <h2>تسجيل الدخول</h2>
              <p>الدخول بالبريد وكلمة المرور أو عبر Google للوصول إلى الطلبات والعناوين والمفضلة.</p>
            </div>
            <span class="tag">Email</span>
          </div>
          <input class="control" name="email" type="email" autocomplete="email" placeholder="البريد الإلكتروني" required>
          <input class="control" name="password" type="password" autocomplete="current-password" placeholder="كلمة المرور" required>
          <div class="actions-row auth-actions">
            <button class="primary-button" type="submit">دخول</button>
            <button class="ghost-button" type="button" data-social-login="google">المتابعة عبر Google</button>
            <button class="ghost-button" type="button" data-reset-password>استرجاع كلمة المرور</button>
          </div>
        </form>

        <form class="auth-card auth-card--stacked" id="phone-auth-form">
          <div class="section-head">
            <div>
              <h3>الدخول برقم الهاتف</h3>
              <p>${escapeHtml(phoneHint)}</p>
            </div>
            <span class="tag">OTP</span>
          </div>
          <input class="control" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+968 9X XXX XXX" value="${escapeHtml(state.phoneAuth.phoneNumber || state.customer.phone || state.user?.phoneNumber || "")}" required>
          <div id="phone-auth-recaptcha" class="recaptcha-slot ${state.firebaseReady ? "" : "is-hidden"}"></div>
          <div class="actions-row auth-actions">
            <button class="primary-button" type="submit">${state.phoneAuth.step === "verify" ? "إعادة إرسال الرمز" : "إرسال الرمز"}</button>
          </div>
          ${verifyHint}
        </form>

        ${state.phoneAuth.step === "verify" ? `
          <form class="auth-card auth-card--stacked" id="phone-verify-form">
            <div class="section-head">
              <div>
                <h3>تأكيد الرمز</h3>
                <p>أدخل رمز التحقق القصير ثم انتقل مباشرة إلى صفحة الحساب.</p>
              </div>
            </div>
            <input class="control" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="123456" required>
            <div class="actions-row auth-actions">
              <button class="primary-button" type="submit">تأكيد الدخول</button>
              <button class="ghost-button" type="button" data-action="reset-phone-auth">تغيير الرقم</button>
            </div>
          </form>
        ` : ""}
      </div>
      <aside class="summary-card auth-summary">
        <h3>مسارات دخول جاهزة للمتجر الحقيقي</h3>
        <p class="faq-answer">صفحة الدخول أصبحت تدعم البريد وكلمة المرور وGoogle ورقم الهاتف مع OTP في نفس التجربة بدل الاعتماد على خيار واحد فقط.</p>
        <ul class="auth-benefits">
          <li>تعبئة بيانات الحساب لاحقًا من صفحة العميل.</li>
          <li>الاحتفاظ بالهاتف كهوية طلب عند عدم وجود بريد.</li>
          <li>إمكانية تمييز الأدمن بالبريد أو الهاتف من مكان مركزي.</li>
        </ul>
        <div class="actions-row">
          <a class="primary-button" href="register.html">إنشاء حساب</a>
          <a class="ghost-button" href="account.html">حسابي</a>
        </div>
      </aside>
    </section>
  `;
}

function renderRegisterPage() {
  if (state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>تم تسجيل الدخول</strong>
          <p>يمكنك الآن الذهاب إلى صفحة الحساب لإدارة العناوين والطلبات.</p>
          <a class="primary-button" href="account.html">حسابي</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="content-grid content-grid--sidebar">
      <form class="auth-card auth-card--stacked" id="register-form">
        <div class="section-head">
          <div>
            <h2>إنشاء حساب جديد</h2>
            <p>أنشئ حسابك بالبريد وكلمة المرور مع حفظ الهاتف كقناة تواصل وطلب أساسية.</p>
          </div>
        </div>
        <div class="form-grid form-grid--two">
          <input class="control" name="name" autocomplete="name" placeholder="الاسم الكامل" required>
          <input class="control" name="email" type="email" autocomplete="email" placeholder="البريد الإلكتروني" required>
        </div>
        <div class="form-grid form-grid--two" style="margin-top:14px;">
          <input class="control" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="رقم الهاتف">
          <input class="control" name="password" type="password" autocomplete="new-password" placeholder="كلمة المرور" required>
        </div>
        <div class="actions-row auth-actions">
          <button class="primary-button" type="submit">إنشاء الحساب</button>
          <button class="ghost-button" type="button" data-social-login="google">البدء عبر Google</button>
        </div>
      </form>
      <aside class="summary-card auth-summary">
        <h3>لماذا التسجيل؟</h3>
        <p class="faq-answer">لإدارة الطلبات، حفظ العناوين، كتابة المراجعات، وتتبع المشتريات لاحقًا من أي جهاز.</p>
        <ul class="auth-benefits">
          <li>يدعم المتجر لاحقًا Google والهاتف بدون تغيير بنية الصفحات.</li>
          <li>يبقى الهاتف متاحًا للدفع والتوصيل حتى إن كان الدخول عبر Google.</li>
        </ul>
      </aside>
    </section>
  `;
}

function renderCustomerPreferenceCard(orders) {
  const referralCode = getVipReferralCode();
  const delivered = orders.filter((order) => String(order.status || "").includes("توصيل")).length;
  return `
    <article class="summary-card">
      <h3>تفضيلاتك العالمية</h3>
      <div class="metric-table" style="margin-top:14px;">
        <div class="metric-table__row"><span>اللغة</span><strong>${escapeHtml(LANGUAGE_OPTIONS[state.language]?.label || "العربية")}</strong></div>
        <div class="metric-table__row"><span>العملة</span><strong>${escapeHtml(state.currency)}</strong></div>
        <div class="metric-table__row"><span>الثيم</span><strong>${escapeHtml(state.theme === "dark" ? "داكن" : "فاتح")}</strong></div>
        <div class="metric-table__row"><span>طلبات مكتملة</span><strong>${delivered}</strong></div>
      </div>
      <div class="actions-row" style="margin-top:16px;">
        <button class="ghost-button" type="button" data-action="toggle-language">بدّل اللغة</button>
        <button class="ghost-button" type="button" data-action="toggle-currency">بدّل العملة</button>
      </div>
      <div class="section-card section-card--soft" style="margin-top:16px;">
        <strong>رمز الإحالة</strong>
        <p class="faq-answer">${escapeHtml(referralCode)} يمكن استخدامه لاحقًا في حملات الإحالة أو العروض الخاصة.</p>
        <div class="actions-row">
          <button class="ghost-button" type="button" data-copy-url="${escapeHtml(referralCode)}">نسخ الرمز</button>
          <a class="ghost-button" href="vip.html">نادي VIP</a>
        </div>
      </div>
    </article>
  `;
}

function renderCustomerAccountPage() {
  if (!state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>يلزم تسجيل الدخول أولًا</strong>
          <p>صفحة الحساب مستقلة لإدارة الطلبات والعناوين والمفضلة بشكل منظم.</p>
          <div class="actions-row">
            <a class="primary-button" href="login.html">تسجيل الدخول</a>
            <a class="ghost-button" href="register.html">إنشاء حساب</a>
          </div>
        </div>
      </section>
    `;
  }

  const orders = getCurrentCustomerOrders();
  const favorites = state.favorites
    .map((id) => getProductById(id) || getAccountById(id))
    .filter(Boolean)
    .slice(0, 6);
  const addresses = loadJson(KEYS.addresses, []);
  const loyaltyPoints = getLoyaltyPoints(orders);

  return `
    <section class="stats-grid">
      <article class="stat-card"><strong>${orders.length}</strong><p class="mini-note">إجمالي الطلبات</p></article>
      <article class="stat-card"><strong>${loyaltyPoints}</strong><p class="mini-note">نقاط الولاء التقديرية</p></article>
      <article class="stat-card"><strong>${addresses.length}</strong><p class="mini-note">عناوين محفوظة</p></article>
      <article class="stat-card"><strong>${favorites.length}</strong><p class="mini-note">منتجات محفوظة</p></article>
    </section>
    <section class="content-grid content-grid--sidebar">
      <div class="section-stack">
        <form class="section-card" id="profile-form">
          <div class="section-head">
            <div>
              <h2>بيانات الحساب</h2>
              <p>تعديل سريع للبيانات الأساسية وحفظها محليًا لاستخدامها في صفحة الدفع.</p>
            </div>
          </div>
          <div class="form-grid form-grid--two">
            <input class="control" name="name" value="${escapeHtml(state.customer.name || state.user.displayName || "")}" placeholder="الاسم">
            <input class="control" name="email" type="email" value="${escapeHtml(state.customer.email || state.user.email || "")}" placeholder="البريد الإلكتروني">
            <input class="control" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${escapeHtml(state.customer.phone || state.user?.phoneNumber || "")}" placeholder="رقم الهاتف">
            <input class="control" name="wilayat" value="${escapeHtml(state.customer.wilayat || "")}" placeholder="الولاية / المدينة">
          </div>
          <input class="control" name="address" value="${escapeHtml(state.customer.address || "")}" placeholder="العنوان" style="margin-top:14px;">
          <div class="actions-row">
            <button class="primary-button" type="submit">حفظ البيانات</button>
            <button class="ghost-button" type="button" data-logout>تسجيل الخروج</button>
          </div>
        </form>

        <form class="section-card" id="address-form">
          <div class="section-head">
            <div>
              <h2>العناوين المحفوظة</h2>
              <p>أضف أكثر من عنوان لاستخدامها مباشرة في صفحة الدفع.</p>
            </div>
          </div>
          <div class="form-grid form-grid--two">
            <input class="control" name="name" placeholder="اسم العنوان">
            <input class="control" name="wilayat" placeholder="الولاية / المدينة">
          </div>
          <input class="control" name="address" placeholder="العنوان التفصيلي" style="margin-top:14px;">
          <button class="primary-button" type="submit">حفظ العنوان</button>
          ${addresses.length ? `
            <div class="section-stack" style="margin-top:18px;">
              ${addresses.map((entry, index) => `
                <article class="order-card">
                  <div class="order-card__head">
                    <strong>${escapeHtml(entry.name || "عنوان محفوظ")}</strong>
                    <button class="ghost-button" type="button" data-remove-address="${index}">حذف</button>
                  </div>
                  <p class="faq-answer">${escapeHtml(entry.wilayat || "")} - ${escapeHtml(entry.address || "")}</p>
                </article>
              `).join("")}
            </div>
          ` : ""}
        </form>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>طلباتي</h2>
              <p>تظهر هنا الطلبات التي أنشأتها مع حالات المعالجة والشحن والتوصيل.</p>
            </div>
          </div>
          <div class="section-stack">
            ${orders.length ? orders.map((order) => renderOrderCard(order)).join("") : `
              <div class="empty-state">
                <strong>لا توجد طلبات بعد</strong>
                <p>ابدأ الشراء من الأقسام ثم سيظهر سجل الطلبات هنا.</p>
              </div>
            `}
          </div>
        </section>
      </div>

      <aside class="section-stack">
        <article class="summary-card">
          <h3>المفضلة</h3>
          ${favorites.length ? renderCatalogGrid(favorites, "mixed", true) : `
            <p class="faq-answer">لم تحفظ أي منتج بعد.</p>
          `}
        </article>
      </aside>
    </section>
  `;
}

function renderCustomerAccountPageV2() {
  if (!state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>يلزم تسجيل الدخول أولًا</strong>
          <p>صفحة الحساب المطورة تجمع الطلبات والمحفوظات والعناوين والتنبيهات والولاء داخل مكان واحد.</p>
          <div class="actions-row">
            <a class="primary-button" href="login.html">تسجيل الدخول</a>
            <a class="ghost-button" href="register.html">إنشاء حساب</a>
          </div>
        </div>
      </section>
    `;
  }

  const orders = getCurrentCustomerOrders();
  const favorites = state.favorites
    .map((id) => getProductById(id) || getAccountById(id))
    .filter(Boolean)
    .slice(0, 6);
  const addresses = loadJson(KEYS.addresses, []);
  const loyaltyPoints = orders.reduce((sum, order) => sum + Math.round(Number(order.total || 0)), 0);
  const tier = getLoyaltyTier(loyaltyPoints);
  const pointsToNext = Math.max(0, Number(tier.nextTarget || 0) - loyaltyPoints);
  const stockAlerts = getStockAlerts(getCurrentCustomerEmail());
  const personalized = getPersonalizedRecommendations(4);
  const newsletterEntry = getNewsletterSubscribers().find((entry) => String(entry.email || "").trim().toLowerCase() === getCurrentCustomerEmail());
  const savedLater = getSavedForLaterItemsDetailed().slice(0, 4);
  const giftedOrders = orders.filter((order) => order.giftWrap).length;

  return `
    <section class="stats-grid">
      <article class="stat-card"><strong>${orders.length}</strong><p class="mini-note">إجمالي الطلبات</p></article>
      <article class="stat-card"><strong>${loyaltyPoints}</strong><p class="mini-note">نقاط الولاء</p></article>
      <article class="stat-card"><strong>${addresses.length}</strong><p class="mini-note">عناوين محفوظة</p></article>
      <article class="stat-card"><strong>${favorites.length}</strong><p class="mini-note">عناصر محفوظة</p></article>
    </section>
    <section class="content-grid content-grid--sidebar">
      <div class="section-stack">
        <article class="section-card loyalty-card loyalty-card--${escapeHtml(tier.theme)}">
          <div class="section-head">
            <div>
              <h2>مستوى الولاء</h2>
              <p>تمت ترقية صفحة الحساب لتشمل طبقة ولاء وتقدم واضح نحو المستوى التالي.</p>
            </div>
            <span class="tag">${escapeHtml(tier.label)}</span>
          </div>
          <div class="loyalty-progress">
            <div class="loyalty-progress__bar"><span style="width:${Math.max(8, Math.min(100, (loyaltyPoints / Math.max(tier.nextTarget || 1, 1)) * 100))}%"></span></div>
            <div class="metric-line"><span>المرحلة التالية</span><strong>${pointsToNext ? `${pointsToNext} نقطة` : "تم الوصول"}</strong></div>
          </div>
          <div class="actions-row" style="margin-top:16px;">
            <a class="ghost-button" href="vip.html">افتح نادي VIP</a>
            <button class="ghost-button" type="button" data-copy-url="${escapeHtml(getVipReferralCode())}">نسخ رمز الإحالة</button>
          </div>
        </article>

        <form class="section-card" id="profile-form">
          <div class="section-head">
            <div>
              <h2>بيانات الحساب</h2>
              <p>تعديل سريع للبيانات الأساسية وحفظها لاستخدامها تلقائيًا في صفحة الدفع.</p>
            </div>
          </div>
          <div class="form-grid form-grid--two">
            <input class="control" name="name" value="${escapeHtml(state.customer.name || state.user.displayName || "")}" placeholder="الاسم">
            <input class="control" name="email" type="email" value="${escapeHtml(state.customer.email || state.user.email || "")}" placeholder="البريد الإلكتروني">
            <input class="control" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${escapeHtml(state.customer.phone || state.user?.phoneNumber || "")}" placeholder="رقم الهاتف">
            <input class="control" name="wilayat" value="${escapeHtml(state.customer.wilayat || "")}" placeholder="الولاية / المدينة">
          </div>
          <input class="control" name="address" value="${escapeHtml(state.customer.address || "")}" placeholder="العنوان" style="margin-top:14px;">
          <div class="actions-row">
            <button class="primary-button" type="submit">حفظ البيانات</button>
            <button class="ghost-button" type="button" data-logout>تسجيل الخروج</button>
          </div>
        </form>

        <form class="section-card" id="address-form">
          <div class="section-head">
            <div>
              <h2>العناوين المحفوظة</h2>
              <p>يمكنك حفظ أكثر من عنوان واستخدامه مباشرة أثناء الطلب.</p>
            </div>
          </div>
          <div class="form-grid form-grid--two">
            <input class="control" name="name" placeholder="اسم العنوان">
            <input class="control" name="wilayat" placeholder="الولاية / المدينة">
          </div>
          <input class="control" name="address" placeholder="العنوان التفصيلي" style="margin-top:14px;">
          <button class="primary-button" type="submit">حفظ العنوان</button>
          ${addresses.length ? `
            <div class="section-stack" style="margin-top:18px;">
              ${addresses.map((entry, index) => `
                <article class="order-card">
                  <div class="order-card__head">
                    <strong>${escapeHtml(entry.name || "عنوان محفوظ")}</strong>
                    <button class="ghost-button" type="button" data-remove-address="${index}">حذف</button>
                  </div>
                  <p class="faq-answer">${escapeHtml(entry.wilayat || "")} - ${escapeHtml(entry.address || "")}</p>
                </article>
              `).join("")}
            </div>
          ` : ""}
        </form>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>طلباتي</h2>
              <p>مع إمكانية الرجوع للسلة مباشرة من الطلبات السابقة والاستفادة من التنقل الأسرع داخل الحساب.</p>
            </div>
          </div>
          <div class="section-stack">
            ${orders.length ? orders.map((order) => renderOrderCard(order)).join("") : `
              <div class="empty-state">
                <strong>لا توجد طلبات بعد</strong>
                <p>ابدأ الشراء من الأقسام ثم سيظهر سجل الطلبات هنا مع التتبع.</p>
              </div>
            `}
          </div>
        </section>
      </div>

      <aside class="section-stack">
        ${renderCustomerPreferenceCard(orders)}
        <article class="summary-card">
          <h3>المحفوظات</h3>
          ${favorites.length ? renderCatalogGrid(favorites, "mixed", true) : `<p class="faq-answer">لم تحفظ أي منتج بعد.</p>`}
        </article>
        <article class="summary-card">
          <h3>مركز التنبيهات</h3>
          <div class="alert-list">
            <article class="alert-item">
              <strong>اشتراك النشرة</strong>
              <p>${newsletterEntry ? "مفعل وجاهز لتلقي الجديد والعروض." : "غير مفعل بعد، ويمكن تفعيله من الصفحة الرئيسية."}</p>
            </article>
            <article class="alert-item">
              <strong>تنبيهات توفر المنتجات</strong>
              <p>${stockAlerts.length ? `لديك ${stockAlerts.length} طلب تنبيه محفوظ.` : "لا توجد طلبات تنبيه محفوظة حتى الآن."}</p>
            </article>
            <article class="alert-item">
              <strong>الطلبات المهداه</strong>
              <p>${giftedOrders ? `لديك ${giftedOrders} طلب${giftedOrders > 1 ? "ات" : ""} بهدية أو تغليف مميز.` : "لم تسجل أي طلبات هدايا بعد."}</p>
            </article>
          </div>
        </article>
        ${savedLater.length ? renderSavedForLaterPanel(true) : ""}
        ${personalized.length ? `
          <article class="summary-card">
            <h3>اقتراحات لحسابك</h3>
            ${renderCatalogGrid(personalized, "mixed", true)}
          </article>
        ` : ""}
      </aside>
    </section>
  `;
}

function renderAdminIntentSection(metrics, compact = false) {
  return `
    <section class="admin-watch-grid">
      <article class="summary-card">
        <h3>نوايا الشراء</h3>
        <div class="metric-table">
          <div class="metric-table__row"><span>عناصر محفوظة لاحقًا</span><strong>${metrics.savedForLaterCount}</strong></div>
          <div class="metric-table__row"><span>أسئلة المنتجات</span><strong>${metrics.productQuestionCount}</strong></div>
          <div class="metric-table__row"><span>طلبات الهدايا</span><strong>${metrics.giftOrders}</strong></div>
        </div>
      </article>
      <article class="summary-card">
        <h3>${compact ? "إشارة سريعة" : "فريق المتجر"}</h3>
        <p class="mini-note">${compact
          ? "تلخص هذه المؤشرات ما يسبق الشراء النهائي: الحفظ للمراجعة، الأسئلة قبل الطلب، واهتمام العملاء بطلبات الهدايا."
          : "هذه المؤشرات توضح ما الذي يجذب العميل قبل الدفع: الحفظ للمراجعة، الاستفسارات قبل الشراء، والطلبات ذات الطابع الهدية."}</p>
      </article>
    </section>
  `;
}

function renderAdminGrowthSuite(metrics, compact = false) {
  return `
    <section class="admin-growth-grid">
      <article class="section-card">
        <div class="section-head">
          <div>
            <h2>صحة التسويق</h2>
            <p>${compact ? "قراءة مختصرة لنبض العروض والنشرة والاهتمام." : "هل العروض والنشرة والاهتمام داخل المتجر تعمل بالشكل الذي يرفع العودة والشراء؟"}</p>
          </div>
        </div>
        <div class="metric-table">
          <div class="metric-table__row"><span>كوبونات نشطة</span><strong>${metrics.activeCoupons}</strong></div>
          <div class="metric-table__row"><span>مشتركو العروض</span><strong>${metrics.offerSubscribers}</strong></div>
          <div class="metric-table__row"><span>عناصر مفضلة</span><strong>${metrics.favoriteCount}</strong></div>
          <div class="metric-table__row"><span>طلبات بخصومات</span><strong>${metrics.discountedOrders}</strong></div>
        </div>
      </article>
      <article class="section-card">
        <div class="section-head">
          <div>
            <h2>جاهزية التحويل</h2>
            <p>${compact ? "منطقة القرار قبل الدفع." : "هذه المؤشرات توضح ما الذي يحدث مباشرة قبل الإتمام: حفظ، هدايا، شحن مجاني، وتحويل أفضل."}</p>
          </div>
        </div>
        <div class="metric-table">
          <div class="metric-table__row"><span>محفوظ لوقت لاحق</span><strong>${metrics.savedForLaterCount}</strong></div>
          <div class="metric-table__row"><span>طلبات الشحن المجاني</span><strong>${metrics.freeShippingOrders}</strong></div>
          <div class="metric-table__row"><span>طلبات الهدايا</span><strong>${metrics.giftOrders}</strong></div>
          <div class="metric-table__row"><span>متوسط الطلب</span><strong>${formatPrice(metrics.averageOrder)}</strong></div>
        </div>
      </article>
      <article class="section-card">
        <div class="section-head">
          <div>
            <h2>تشغيل وتنفيذ</h2>
            <p>${compact ? "صورة أسرع للطلبات والحالات." : "راقب أين تتكدس الطلبات، وأين يتحسن التسليم، وما يحتاج متابعة أسرع من الفريق."}</p>
          </div>
        </div>
        <div class="metric-table">
          <div class="metric-table__row"><span>قيد المعالجة</span><strong>${metrics.pendingOrders}</strong></div>
          <div class="metric-table__row"><span>تم الشحن</span><strong>${metrics.shippedOrders}</strong></div>
          <div class="metric-table__row"><span>تم التوصيل</span><strong>${metrics.deliveredOrders}</strong></div>
          <div class="metric-table__row"><span>مخزون منخفض</span><strong>${metrics.lowStock}</strong></div>
        </div>
      </article>
      <article class="section-card">
        <div class="section-head">
          <div>
            <h2>إشارات الفريق</h2>
            <p>${compact ? "أسئلة ورسائل وتنبيهات تحتاج استجابة." : "كل ما يحتاج متابعة سريعة من الدعم أو المبيعات أو إدارة المخزون في مكان واحد."}</p>
          </div>
        </div>
        <div class="metric-table">
          <div class="metric-table__row"><span>أسئلة المنتجات</span><strong>${metrics.productQuestionCount}</strong></div>
          <div class="metric-table__row"><span>طلبات تنبيه التوفر</span><strong>${metrics.stockAlertRequests}</strong></div>
          <div class="metric-table__row"><span>رسائل الدعم</span><strong>${metrics.inboxCount}</strong></div>
          <div class="metric-table__row"><span>عملاء متكررون</span><strong>${metrics.repeatCustomers}</strong></div>
        </div>
      </article>
    </section>
  `;
}

function renderAdminDashboardPageV2() {
  if (!isAdmin()) return renderAdminGate();
  const metrics = getDashboardMetrics();
  const recentOrders = state.orders.slice(0, 6);
  const lowStockItems = state.products.filter((item) => getStock(item) > 0 && getStock(item) <= 3).slice(0, 5);
  const inbox = getContactInbox().slice(0, 5);

  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin")}
      <div class="section-stack">
        ${renderAdminIntentSection(metrics)}
        <section class="stats-grid">
          <article class="stat-card"><strong>${metrics.totalOrders}</strong><p class="mini-note">إجمالي الطلبات</p></article>
          <article class="stat-card"><strong>${formatPrice(metrics.totalRevenue)}</strong><p class="mini-note">إجمالي المبيعات</p></article>
          <article class="stat-card"><strong>${metrics.subscribers}</strong><p class="mini-note">مشتركو النشرة</p></article>
          <article class="stat-card"><strong>${metrics.stockAlertRequests}</strong><p class="mini-note">طلبات تنبيه التوفر</p></article>
        </section>
        ${renderAdminGrowthSuite(metrics)}
        <section class="admin-watch-grid">
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>غرفة العمليات</h2>
                <p>قراءة سريعة لحركة المتجر من زاوية المبيعات والدعم والتسويق والمخزون.</p>
              </div>
            </div>
            <div class="metric-table">
              <div class="metric-table__row"><span>إيراد اليوم</span><strong>${formatPrice(metrics.todayRevenue)}</strong></div>
              <div class="metric-table__row"><span>إيراد الشهر</span><strong>${formatPrice(metrics.monthRevenue)}</strong></div>
              <div class="metric-table__row"><span>متوسط الطلب</span><strong>${formatPrice(metrics.averageOrder)}</strong></div>
              <div class="metric-table__row"><span>العملاء المتكررون</span><strong>${metrics.repeatCustomers}</strong></div>
              <div class="metric-table__row"><span>رسائل الدعم</span><strong>${metrics.inboxCount}</strong></div>
            </div>
          </article>
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>تنبيهات المخزون</h2>
                <p>أهم العناصر التي تحتاج متابعة أو إعادة تعبئة قريبة.</p>
              </div>
            </div>
            ${lowStockItems.length ? `
              <div class="alert-list">
                ${lowStockItems.map((item) => `
                  <article class="alert-item">
                    <strong>${escapeHtml(item.name)}</strong>
                    <p>${escapeHtml(item.category || "")} • المتبقي ${getStock(item)}</p>
                  </article>
                `).join("")}
              </div>
            ` : '<div class="empty-state"><strong>لا توجد عناصر منخفضة المخزون الآن</strong></div>'}
          </article>
        </section>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>آخر الطلبات</h2>
              <p>لوحة قيادة أسرع لقراءة الوضع الحالي للمتجر وإدارة الطلبات مباشرة.</p>
            </div>
          </div>
          <div class="section-stack">
            ${recentOrders.length ? recentOrders.map((order) => renderOrderCard(order, true)).join("") : '<div class="empty-state"><strong>لا توجد طلبات بعد</strong></div>'}
          </div>
        </section>
        <section class="admin-watch-grid">
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>أفضل المنتجات</h2>
                <p>حسب الطلبات والقطع المباعة.</p>
              </div>
            </div>
            ${renderMetricList(metrics.topProducts, "اسم المنتج", "إجمالي القطع")}
          </article>
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>صندوق الرسائل</h2>
                <p>آخر تواصلات العملاء المحفوظة محليًا من صفحة التواصل.</p>
              </div>
            </div>
            ${inbox.length ? `
              <div class="alert-list">
                ${inbox.map((entry) => `
                  <article class="alert-item">
                    <strong>${escapeHtml(entry.subject || "رسالة جديدة")}</strong>
                    <p>${escapeHtml(entry.name || "")} • ${escapeHtml(entry.email || "")}</p>
                  </article>
                `).join("")}
              </div>
            ` : '<div class="empty-state"><strong>لا توجد رسائل دعم محفوظة بعد</strong></div>'}
          </article>
        </section>
      </div>
    </section>
  `;
}

function renderAdminDashboardPage() {
  if (!isAdmin()) return renderAdminGate();
  const metrics = getDashboardMetrics();
  const recentOrders = state.orders.slice(0, 6);
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin")}
      <div class="section-stack">
        ${renderAdminIntentSection(metrics, true)}
        <section class="stats-grid">
          <article class="stat-card"><strong>${metrics.totalOrders}</strong><p class="mini-note">إجمالي الطلبات</p></article>
          <article class="stat-card"><strong>${formatPrice(metrics.totalRevenue)}</strong><p class="mini-note">إجمالي المبيعات</p></article>
          <article class="stat-card"><strong>${metrics.lowStock}</strong><p class="mini-note">منتجات منخفضة المخزون</p></article>
          <article class="stat-card"><strong>${metrics.totalCustomers}</strong><p class="mini-note">عملاء قاموا بطلبات</p></article>
        </section>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>آخر الطلبات</h2>
              <p>لوحة قيادة سريعة لقراءة الوضع الحالي للمتجر متعدد الصفحات.</p>
            </div>
          </div>
          <div class="section-stack">
            ${recentOrders.length ? recentOrders.map((order) => renderOrderCard(order, true)).join("") : `
              <div class="empty-state"><strong>لا توجد طلبات بعد</strong></div>
            `}
          </div>
        </section>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>أفضل المنتجات</h2>
              <p>قائمة مختصرة حسب الطلبات والمبيعات والمراجعات.</p>
            </div>
          </div>
          ${renderMetricList(metrics.topProducts, "اسم المنتج", "إجمالي القطع")}
        </section>
      </div>
    </section>
  `;
}

function renderAdminProductsPage() {
  if (!isAdmin()) return renderAdminGate();
  const editing = state.productEditId ? getProductById(state.productEditId) : null;
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-products")}
      <div class="section-stack">
        <form class="section-card" id="admin-product-form">
          <div class="section-head">
            <div>
              <h2>${editing ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
              <p>إدارة المنتجات في صفحة مستقلة بدل دمجها داخل الصفحة الرئيسية.</p>
            </div>
          </div>
          <input type="hidden" name="id" value="${escapeHtml(editing?.id || "")}">
          <div class="form-grid form-grid--two">
            <input class="control" name="name" placeholder="اسم المنتج" value="${escapeHtml(editing?.name || "")}" required>
            <input class="control" name="price" type="number" min="0" step="0.1" placeholder="السعر" value="${escapeHtml(String(editing?.price || ""))}" required>
            <select class="control" name="category" required>${renderCategoryOptions(editing?.category || "")}</select>
            <input class="control" name="brand" placeholder="الماركة" value="${escapeHtml(editing?.brand || "")}">
            <input class="control" name="color" placeholder="اللون" value="${escapeHtml(editing?.color || "")}">
            <input class="control" name="material" placeholder="الخامة" value="${escapeHtml(editing?.material || "")}">
            <input class="control" name="collection" placeholder="المجموعة" value="${escapeHtml(editing?.collection || "")}">
            <input class="control" name="imgUrl" placeholder="رابط الصورة الرئيسية" value="${escapeHtml(editing?.imgUrl || "")}">
          </div>
          <textarea class="textarea" name="desc" placeholder="وصف المنتج">${escapeHtml(editing?.desc || "")}</textarea>
          <textarea class="textarea" name="gallery" placeholder="روابط الصور الفرعية، كل رابط في سطر">${escapeHtml((editing?.gallery || []).join("\n"))}</textarea>
          <div class="form-grid form-grid--four">
            <input class="control" name="stock52" type="number" min="0" placeholder="مخزون 52" value="${escapeHtml(String(editing?.stockSizes?.[52] || ""))}">
            <input class="control" name="stock53" type="number" min="0" placeholder="مخزون 53" value="${escapeHtml(String(editing?.stockSizes?.[53] || ""))}">
            <input class="control" name="stock54" type="number" min="0" placeholder="مخزون 54" value="${escapeHtml(String(editing?.stockSizes?.[54] || ""))}">
            <input class="control" name="stock55" type="number" min="0" placeholder="مخزون 55" value="${escapeHtml(String(editing?.stockSizes?.[55] || ""))}">
          </div>
          <div class="actions-row">
            <button class="primary-button" type="submit">${editing ? "حفظ التعديل" : "إضافة المنتج"}</button>
            ${editing ? '<button class="ghost-button" type="button" data-clear-product-edit>إلغاء التعديل</button>' : ""}
          </div>
        </form>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>جميع المنتجات</h2>
              <p>تعديل سريع، حذف، وفتح صفحة المنتج مباشرة.</p>
            </div>
          </div>
          <div class="catalog-grid">
            ${state.products.map((item) => renderAdminItemCard(item, "product")).join("")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderAdminAccountsPage() {
  if (!isAdmin()) return renderAdminGate();
  const editing = state.accountEditId ? getAccountById(state.accountEditId) : null;
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-accounts")}
      <div class="section-stack">
        <form class="section-card" id="admin-account-form">
          <div class="section-head">
            <div>
              <h2>${editing ? "تعديل الحساب" : "إضافة حساب جديد"}</h2>
              <p>قسم مخصص لإدارة الحسابات كما طلبت، مع صور كثيرة وتفاصيل كاملة وسعر وحالة العرض.</p>
            </div>
          </div>
          <input type="hidden" name="id" value="${escapeHtml(editing?.id || "")}">
          <div class="form-grid form-grid--two">
            <input class="control" name="name" placeholder="اسم الحساب" value="${escapeHtml(editing?.name || "")}" required>
            <input class="control" name="price" type="number" min="0" step="0.1" placeholder="السعر" value="${escapeHtml(String(editing?.price || ""))}" required>
            <input class="control" name="accountType" placeholder="نوع الحساب" value="${escapeHtml(editing?.accountType || "")}">
            <select class="control" name="category">${renderCategoryOptions(editing?.category || "")}</select>
            <input class="control" name="brand" placeholder="العلامة / المصدر" value="${escapeHtml(editing?.brand || "")}">
            <input class="control" name="imgUrl" placeholder="رابط الصورة الرئيسية" value="${escapeHtml(editing?.imgUrl || "")}">
          </div>
          <textarea class="textarea" name="desc" placeholder="تفاصيل الحساب">${escapeHtml(editing?.desc || "")}</textarea>
          <textarea class="textarea" name="gallery" placeholder="صور كثيرة للحساب، كل رابط في سطر">${escapeHtml((editing?.gallery || []).join("\n"))}</textarea>
          <div class="form-grid form-grid--three">
            <label class="switch-line"><input type="checkbox" name="featured" ${editing?.featured ? "checked" : ""}> مميز</label>
            <label class="switch-line"><input type="checkbox" name="offer" ${editing?.offer ? "checked" : ""}> معروض</label>
            <label class="switch-line"><input type="checkbox" name="hidden" ${editing?.hidden ? "checked" : ""}> مخفي</label>
          </div>
          <div class="actions-row">
            <button class="primary-button" type="submit">${editing ? "حفظ الحساب" : "إضافة الحساب"}</button>
            ${editing ? '<button class="ghost-button" type="button" data-clear-account-edit>إلغاء التعديل</button>' : ""}
          </div>
        </form>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>قائمة الحسابات</h2>
            </div>
          </div>
          <div class="catalog-grid">
            ${state.accounts.map((item) => renderAdminItemCard(item, "account")).join("")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderAdminOrdersPage() {
  if (!isAdmin()) return renderAdminGate();
  const metrics = getDashboardMetrics();
  const customerInsights = getCustomerInsights();
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-orders")}
      <div class="section-stack">
        <section class="stats-grid">
          <article class="stat-card"><strong>${metrics.pendingOrders}</strong><p class="mini-note">طلبات تحتاج متابعة</p></article>
          <article class="stat-card"><strong>${metrics.pendingPayments}</strong><p class="mini-note">دفعات معلقة</p></article>
          <article class="stat-card"><strong>${metrics.settledPayments}</strong><p class="mini-note">دفعات مؤكدة</p></article>
          <article class="stat-card"><strong>${metrics.vipCustomers}</strong><p class="mini-note">عملاء VIP نشطون</p></article>
        </section>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>عملاء يحتاجون اهتمامًا</h2>
              <p>أفضل العملاء حسب الإنفاق والتكرار وحالة الدفع حتى تكون القرارات التشغيلية أسرع.</p>
            </div>
          </div>
          ${renderCustomerInsightCards(customerInsights)}
        </section>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>إدارة الطلبات</h2>
              <p>يمكنك تعديل الحالة لكل طلب والبحث فيه وتتبعه من هنا.</p>
            </div>
          </div>
          <input class="control" id="admin-order-search" placeholder="ابحث برقم الطلب أو العميل" value="${escapeHtml(state.orderSearch || "")}">
          <div class="section-stack" style="margin-top:16px;">
            ${getFilteredOrders().length ? getFilteredOrders().map((order) => renderOrderCard(order, true)).join("") : `
              <div class="empty-state"><strong>لا توجد طلبات مطابقة</strong></div>
            `}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderAdminOffersPage() {
  if (!isAdmin()) return renderAdminGate();
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-offers")}
      <div class="section-stack">
        <form class="section-card" id="admin-payment-form">
          <div class="section-head">
            <div>
              <h2>إعدادات الدفع والشحن</h2>
              <p>ضع روابط PayPal وStripe وبيانات التحويل البنكي الرسمية.</p>
            </div>
          </div>
          <div class="form-grid form-grid--two">
            <input class="control" name="paypalLink" value="${escapeHtml(state.paymentSettings.paypalLink || "")}" placeholder="رابط PayPal">
            <input class="control" name="stripeLink" value="${escapeHtml(state.paymentSettings.stripeLink || "")}" placeholder="رابط Stripe">
            <input class="control" name="bankAccountName" value="${escapeHtml(state.paymentSettings.bankAccountName || "")}" placeholder="اسم الحساب البنكي">
            <input class="control" name="bankName" value="${escapeHtml(state.paymentSettings.bankName || "")}" placeholder="اسم البنك">
            <input class="control" name="bankIban" value="${escapeHtml(state.paymentSettings.bankIban || "")}" placeholder="IBAN">
            <input class="control" name="bankNote" value="${escapeHtml(state.paymentSettings.bankNote || "")}" placeholder="ملاحظة التحويل">
          </div>
          <button class="primary-button" type="submit">حفظ الإعدادات</button>
        </form>

        <article class="summary-card">
          <h3>ملاحظات ربط الدفع</h3>
          <p class="faq-answer">يمكنك استخدام متغيرات داخل روابط Stripe وPayPal مثل <code>{order}</code> و<code>{amount}</code> و<code>{email}</code> و<code>{phone}</code> و<code>{name}</code> حتى تمرر بيانات الطلب إلى صفحة الدفع الخارجية أو رابط الدفع الجاهز.</p>
        </article>

        <form class="section-card" id="admin-content-form">
          <div class="section-head">
            <div>
              <h2>محتوى الصفحة الرئيسية</h2>
              <p>تعديل شريط الأخبار والنص الافتتاحي والحملة الحية والرسائل الرئيسية من لوحة مستقلة.</p>
            </div>
          </div>
          <input class="control" name="topRibbon" value="${escapeHtml(state.contentSettings.topRibbon || "")}" placeholder="شريط الأخبار">
          <input class="control" name="homeBadge" value="${escapeHtml(state.contentSettings.homeBadge || "")}" placeholder="شارة البداية" style="margin-top:14px;">
          <input class="control" name="homeTitle" value="${escapeHtml(state.contentSettings.homeTitle || "")}" placeholder="عنوان الصفحة الرئيسية" style="margin-top:14px;">
          <textarea class="textarea" name="homeText" placeholder="نص الصفحة الرئيسية">${escapeHtml(state.contentSettings.homeText || "")}</textarea>
          <div class="form-grid form-grid--two" style="margin-top:14px;">
            <input class="control" name="campaignTitle" value="${escapeHtml(state.contentSettings.campaignTitle || "")}" placeholder="عنوان الحملة">
            <input class="control" name="campaignCode" value="${escapeHtml(state.contentSettings.campaignCode || "")}" placeholder="كود الحملة">
            <input class="control" name="campaignEndsAt" value="${escapeHtml(state.contentSettings.campaignEndsAt || "")}" placeholder="موعد الانتهاء ISO أو تاريخ">
            <input class="control" name="campaignHref" value="${escapeHtml(state.contentSettings.campaignHref || "")}" placeholder="رابط زر الحملة">
          </div>
          <textarea class="textarea" name="campaignText" placeholder="وصف الحملة">${escapeHtml(state.contentSettings.campaignText || "")}</textarea>
          <button class="primary-button" type="submit">حفظ المحتوى</button>
        </form>

        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>مختبر الأكواد والعروض</h2>
              <p>إضافة أكواد خصم ديناميكية بدل الاعتماد على الأكواد الثابتة فقط.</p>
            </div>
          </div>
          <form class="form-grid form-grid--four" id="admin-coupon-form">
            <input class="control" name="code" placeholder="الكود" required>
            <input class="control" name="percent" type="number" min="0" max="100" placeholder="نسبة الخصم" required>
            <input class="control" name="minimum" type="number" min="0" step="0.1" placeholder="الحد الأدنى">
            <input class="control" name="label" placeholder="وصف العرض">
            <button class="primary-button" type="submit">إضافة كود</button>
          </form>
          <div class="section-stack" style="margin-top:18px;">
            ${state.coupons.map((coupon, index) => `
              <article class="order-card">
                <div class="order-card__head">
                  <strong>${escapeHtml(coupon.code)}</strong>
                  <button class="ghost-button" type="button" data-delete-coupon="${index}">حذف</button>
                </div>
                <p class="faq-answer">${escapeHtml(coupon.label || "عرض")} - خصم ${escapeHtml(String(coupon.percent || 0))}% - حد أدنى ${formatPrice(coupon.minimum || 0)}</p>
              </article>
            `).join("")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderAdminImagesPage() {
  if (!isAdmin()) return renderAdminGate();
  const uploads = loadJson("tayya_uploaded_images_v1", []);
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-images")}
      <div class="section-stack">
        <form class="section-card" id="admin-image-form">
          <div class="section-head">
            <div>
              <h2>إدارة الصور</h2>
              <p>رفع صور متعددة، ضغطها قبل الإرسال، ثم نسخ الروابط لاستخدامها في المنتجات والحسابات.</p>
            </div>
          </div>
          <input class="control" type="file" name="files" accept="image/*" multiple required>
          <button class="primary-button" type="submit">رفع الصور</button>
        </form>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>آخر الصور المرفوعة</h2>
            </div>
          </div>
          <div class="catalog-grid">
            ${uploads.length ? uploads.map((entry, index) => `
              <article class="catalog-card">
                <div class="catalog-card__media">
                  <img src="${escapeHtml(entry.url)}" alt="Upload ${index + 1}" loading="lazy">
                </div>
                <div class="catalog-card__body">
                  <strong>صورة ${index + 1}</strong>
                  <p class="mini-note">${escapeHtml(entry.url)}</p>
                  <button class="ghost-button" type="button" data-copy-url="${escapeHtml(entry.url)}">نسخ الرابط</button>
                </div>
              </article>
            `).join("") : '<div class="empty-state"><strong>لا توجد صور مرفوعة بعد</strong></div>'}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderAdminReportsPageV2() {
  if (!isAdmin()) return renderAdminGate();
  const metrics = getDashboardMetrics();
  const customerInsights = getCustomerInsights();
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-reports")}
      <div class="section-stack">
        <section class="stats-grid">
          <article class="stat-card"><strong>${formatPrice(metrics.todayRevenue)}</strong><p class="mini-note">مبيعات اليوم</p></article>
          <article class="stat-card"><strong>${formatPrice(metrics.monthRevenue)}</strong><p class="mini-note">مبيعات الشهر</p></article>
          <article class="stat-card"><strong>${formatPrice(metrics.averageOrder)}</strong><p class="mini-note">متوسط الطلب</p></article>
          <article class="stat-card"><strong>${metrics.repeatCustomers}</strong><p class="mini-note">عملاء متكررون</p></article>
        </section>
        <section class="stats-grid">
          <article class="stat-card"><strong>${metrics.pendingPayments}</strong><p class="mini-note">دفعات معلقة</p></article>
          <article class="stat-card"><strong>${metrics.settledPayments}</strong><p class="mini-note">دفعات مؤكدة</p></article>
          <article class="stat-card"><strong>${metrics.vipCustomers}</strong><p class="mini-note">عملاء VIP</p></article>
          <article class="stat-card"><strong>${metrics.offerSubscribers}</strong><p class="mini-note">مشتركو العروض</p></article>
        </section>
        ${renderAdminGrowthSuite(metrics, true)}
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>مؤشرات النمو والتفاعل</h2>
              <p>تقارير أعمق تشمل التسويق، الاهتمام، التفضيلات، والطلب حسب السوق والحالة.</p>
            </div>
            <div class="actions-row">
              <button class="ghost-button" type="button" data-export="orders">CSV الطلبات</button>
              <button class="ghost-button" type="button" data-export="products">CSV المنتجات</button>
              <button class="ghost-button" type="button" data-export="customers">CSV العملاء</button>
              <button class="ghost-button" type="button" data-export="newsletter">CSV النشرة</button>
            </div>
          </div>
          <div class="actions-row">
            <button class="ghost-button" type="button" data-export="questions">CSV الأسئلة</button>
            <button class="ghost-button" type="button" data-export="saved">CSV المحفوظات</button>
            <button class="ghost-button" type="button" data-export="alerts">CSV تنبيهات التوفر</button>
          </div>
          <div class="admin-watch-grid">
            <article class="summary-card">
              <h3>الأسواق</h3>
              ${renderMetricList(metrics.marketBreakdown, "السوق", "عدد الطلبات")}
            </article>
            <article class="summary-card">
              <h3>حالات الطلبات</h3>
              ${renderMetricList(metrics.statusBreakdown, "الحالة", "عدد الطلبات")}
            </article>
          </div>
        </section>
        <section class="admin-watch-grid">
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>أفضل الفئات</h2>
              </div>
            </div>
            ${renderMetricList(metrics.topCategories, "الفئة", "الإيراد")}
          </article>
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>أفضل العلامات</h2>
              </div>
            </div>
            ${renderMetricList(metrics.topBrands, "العلامة", "الطلب")}
          </article>
        </section>
        <section class="admin-watch-grid">
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>طرق الدفع</h2>
              </div>
            </div>
            ${renderMetricList(metrics.paymentMethods, "الطريقة", "عدد الطلبات")}
          </article>
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>حالات الدفع</h2>
              </div>
            </div>
            ${renderMetricList(metrics.paymentStatusBreakdown, "الحالة", "عدد الطلبات")}
          </article>
        </section>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>قائمة العملاء الأعلى قيمة</h2>
              <p>دمجت طبقة أوضح للعملاء حتى يصبح التقرير أقرب لإدارة CRM خفيفة داخل نفس المتجر.</p>
            </div>
          </div>
          ${renderCustomerInsightCards(customerInsights)}
        </section>
        <section class="admin-watch-grid">
          <article class="section-card">
            <div class="section-head">
              <div>
                <h2>الصحة التشغيلية</h2>
              </div>
            </div>
            <div class="metric-table">
              <div class="metric-table__row"><span>مشتركو النشرة</span><strong>${metrics.subscribers}</strong></div>
              <div class="metric-table__row"><span>طلبات تنبيه التوفر</span><strong>${metrics.stockAlertRequests}</strong></div>
              <div class="metric-table__row"><span>رسائل الدعم</span><strong>${metrics.inboxCount}</strong></div>
              <div class="metric-table__row"><span>منتجات منخفضة المخزون</span><strong>${metrics.lowStock}</strong></div>
            </div>
          </article>
        </section>
      </div>
    </section>
  `;
}

function renderAdminReportsPage() {
  if (!isAdmin()) return renderAdminGate();
  const metrics = getDashboardMetrics();
  return `
    <section class="admin-layout">
      ${renderAdminSidebar("admin-reports")}
      <div class="section-stack">
        <section class="stats-grid">
          <article class="stat-card"><strong>${formatPrice(metrics.todayRevenue)}</strong><p class="mini-note">مبيعات اليوم</p></article>
          <article class="stat-card"><strong>${formatPrice(metrics.monthRevenue)}</strong><p class="mini-note">مبيعات الشهر</p></article>
          <article class="stat-card"><strong>${formatPrice(metrics.averageOrder)}</strong><p class="mini-note">متوسط الطلب</p></article>
          <article class="stat-card"><strong>${metrics.repeatCustomers}</strong><p class="mini-note">عملاء متكررون</p></article>
        </section>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>أفضل الفئات</h2>
            </div>
            <div class="actions-row">
              <button class="ghost-button" type="button" data-export="orders">CSV الطلبات</button>
              <button class="ghost-button" type="button" data-export="products">CSV المنتجات</button>
              <button class="ghost-button" type="button" data-export="customers">CSV العملاء</button>
            </div>
          </div>
          ${renderMetricList(metrics.topCategories, "الفئة", "الإيراد")}
        </section>
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>طرق الدفع</h2>
            </div>
          </div>
          ${renderMetricList(metrics.paymentMethods, "الطريقة", "عدد الطلبات")}
        </section>
      </div>
    </section>
  `;
}

function render404Page(message = "الصفحة التي طلبتها غير موجودة أو تم نقلها.") {
  return `
    <section class="section-card">
      <div class="empty-state">
        <strong>404</strong>
        <p>${escapeHtml(message)}</p>
        <div class="actions-row">
          <a class="primary-button" href="index.html">الرئيسية</a>
          <a class="ghost-button" href="contact.html">تواصل معنا</a>
        </div>
      </div>
    </section>
  `;
}

function renderInfoPage(kind, sections = null) {
  if (Array.isArray(sections) && sections.length) {
    return `
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(kind)}</h2>
            <p>صفحة مستقلة لتحسين الوضوح والتصفح وSEO.</p>
          </div>
        </div>
        <div class="section-stack">
          ${sections.map((section) => `
            <article class="article-section">
              <h3>${escapeHtml(section.title || "")}</h3>
              <p>${escapeHtml(section.body || "")}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  const content = {
    about: {
      title: "من نحن",
      body: "طَيّة هو متجر عماني فاخر صمم ليقدم تجربة متعددة الصفحات أوضح وأسرع وأقرب للمتاجر العالمية، مع عناية خاصة بالموبايل والواجهة العربية."
    },
    terms: {
      title: "الشروط والأحكام",
      body: "باستخدامك للمتجر فإنك توافق على سياسات الطلب والدفع والشحن والإرجاع حسب ما يظهر أثناء إتمام الطلب."
    },
    privacy: {
      title: "سياسة الخصوصية",
      body: "نحفظ بيانات الطلب الأساسية لتحسين تجربة الشراء وتتبع الطلبات، ولا نشاركها إلا بما يلزم لتنفيذ الخدمة."
    }
  }[kind] || { title: "صفحة معلومات", body: "محتوى معلوماتي منظم في صفحة مستقلة." };

  return `
    <section class="section-card">
      <div class="section-head">
        <div>
          <h2>${escapeHtml(content.title)}</h2>
          <p>صفحة مستقلة لتحسين الوضوح والتصفح وSEO.</p>
        </div>
      </div>
      <article class="article-content">
        <p>${escapeHtml(content.body)}</p>
      </article>
    </section>
  `;
}

function renderAboutPageV2() {
  const visibleProducts = getVisibleProducts();
  const visibleAccounts = getVisibleAccounts();
  const subscribers = getNewsletterSubscribers();
  const averageRating = getAverageProductRating(visibleProducts);
  const bestCategory = Object.entries(
    visibleProducts.reduce((acc, item) => {
      const key = item.category || "عام";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];
  const heroProducts = visibleProducts.slice(0, 3);
  const promises = [
    "تنسيق بصري أهدأ وأكثر أناقة في الجوال والديسكتوب.",
    "صفحات مستقلة تسهّل التنقل وتوضح بنية المتجر.",
    "طبقة تسويق داخلية ترفع حضور العروض والثقة."
  ];

  return `
    <section class="section-card about-hero">
      <div class="about-hero__copy">
        <span class="category-kicker">Brand manifesto</span>
        <h2>طَيّة ليست مجرد متجر منتجات، بل واجهة علامة تريد أن تبدو أرقى، أوضح، وأكثر إقناعًا من أول زيارة.</h2>
        <p>طورت صفحة عن المتجر لتصبح مساحة تعريف حقيقية تشرح الرؤية، أسلوب العرض، ونوع التجربة التي نريد أن يشعر بها العميل: حديثة، متنوعة، فاخرة، وسهلة في نفس الوقت.</p>
        <div class="chip-row">
          <span class="stat-chip">هوية أوضح</span>
          <span class="stat-chip">تسويق أذكى</span>
          <span class="stat-chip">فخامة أحدث</span>
          <span class="stat-chip">تجربة أكثر تنوعًا</span>
        </div>
        <div class="hero-actions">
          <a class="primary-button" href="contact.html">تواصل معنا</a>
          <a class="ghost-button" href="accounts.html">استكشف المتجر</a>
          <a class="ghost-button" href="admin-offers.html">العروض والحملات</a>
        </div>
      </div>
      <aside class="about-hero__stats">
        <article><strong>${visibleProducts.length}</strong><span>منتجات معروضة</span></article>
        <article><strong>${visibleAccounts.length}</strong><span>حسابات رقمية</span></article>
        <article><strong>${averageRating}</strong><span>متوسط التقييم</span></article>
        <article><strong>${subscribers.length}</strong><span>مهتمون بالنشرة</span></article>
      </aside>
    </section>

    <section class="section-card about-manifesto">
      <div class="section-head">
        <div>
          <h2>لماذا أعدنا بناء صورة المتجر؟</h2>
          <p>لأن المتجر الحديث لا يكتفي بعرض المنتجات، بل يبني انطباعًا، ويقود العميل برسائل ذكية، ويجعل القرار أسهل وأسرع.</p>
        </div>
      </div>
      <div class="about-manifesto__grid">
        ${promises.map((item) => `
          <article class="manifesto-card">
            <strong>${escapeHtml(item)}</strong>
            <p>هذا الوعد أصبح حاضرًا داخل الواجهة، الأقسام، الصفحة الرئيسية، والسلة والدفع بطريقة أكثر تماسكًا من قبل.</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section-card about-pillars">
      <div class="section-head">
        <div>
          <h2>أعمدة العلامة</h2>
          <p>هذه هي الركائز التي جعلت المتجر يبدو أحدث وأكثر فخامة وتسويقًا.</p>
        </div>
      </div>
      <div class="about-pillars__grid">
        <article class="about-pillar">
          <span class="tag">الهوية</span>
          <strong>مظهر تحريري أكثر نضجًا</strong>
          <p>ابتعدت الواجهة عن الشكل المسطح واتجهت إلى طبقات بصرية أوضح، ظلال أهدأ، ومساحات تنفس أفضل.</p>
        </article>
        <article class="about-pillar">
          <span class="tag">التنوع</span>
          <strong>مساحات عرض متعددة</strong>
          <p>لم يعد العميل يرى كتالوجًا فقط، بل قصصًا وعروضًا ومختارات ومراجعات وتوصيات تتكامل مع بعضها.</p>
        </article>
        <article class="about-pillar">
          <span class="tag">التسويق</span>
          <strong>رسائل تحفز القرار</strong>
          <p>العروض، الكوبونات، الحملة الحالية، الاشتراك، والتوصيات أصبحت عناصر مرئية وواضحة بدل أن تبقى هامشية.</p>
        </article>
        <article class="about-pillar">
          <span class="tag">الثقة</span>
          <strong>خدمة ووضوح أكبر</strong>
          <p>التتبع، السلة، طرق الدفع، التواصل، والإدارة أصبحت تدعم شعورًا أوضح بالثقة والتنظيم.</p>
        </article>
      </div>
    </section>

    <section class="section-card about-journey">
      <div class="section-head">
        <div>
          <h2>رحلة المتجر من النظرة الأولى إلى الطلب</h2>
          <p>صممت الصفحة لتوضح كيف تعمل الواجهة الجديدة على مستوى الانطباع، العرض، والتحويل.</p>
        </div>
      </div>
      <div class="about-journey__grid">
        <article class="journey-step">
          <strong>1. الانطباع</strong>
          <p>افتتاحية أقوى، بانرات أجمل، ومساحات واضحة توصل هوية المتجر بسرعة.</p>
        </article>
        <article class="journey-step">
          <strong>2. الاكتشاف</strong>
          <p>أقسام أوضح، مختارات، اقتراحات، وعروض مدروسة تسرّع الوصول لما يريده العميل.</p>
        </article>
        <article class="journey-step">
          <strong>3. التحويل</strong>
          <p>سلة أوضح، دفع أسلس، وثقة أعلى عبر الشارات والخدمة والدعم المباشر.</p>
        </article>
      </div>
    </section>

    <section class="section-card about-lux-grid">
      <article class="about-lux-card">
        <span class="category-kicker">Store highlight</span>
        <h3>${escapeHtml(bestCategory?.[0] || "الفئة الأبرز")}</h3>
        <p>${bestCategory ? `هذه الفئة تضم ${bestCategory[1]} عنصرًا، وهي مثال جيد على كيف يدعم المتجر التنوع ويوزع الاهتمام بصريًا.` : "يمكن إبراز الفئة الأقوى هنا حسب ما يتم تحديثه في لوحة الإدارة."}</p>
      </article>
      <article class="about-lux-card">
        <span class="category-kicker">Merchandising</span>
        <h3>مختارات تستحق الواجهة</h3>
        <p>${heroProducts.length ? `من المختارات الحالية: ${escapeHtml(heroProducts.map((item) => item.name).join("، "))}.` : "يمكن توسيع هذه المساحة لاحقًا بعروض قصصية أو منتجات حصرية."}</p>
      </article>
      <article class="about-lux-card">
        <span class="category-kicker">Client promise</span>
        <h3>خدمة تعكس شكل المتجر</h3>
        <p>نفس مستوى العناية البصرية يظهر في السلة، الدعم، والتتبع، حتى يشعر العميل أن كل خطوة منسجمة مع صورة العلامة.</p>
      </article>
    </section>

    <section class="section-card about-cta-strip">
      <div>
        <span class="category-kicker">Next move</span>
        <h2>إذا أردت، نقدر نرفع المتجر أكثر بصريًا وتسويقيًا في المرحلة التالية.</h2>
        <p>الأساس صار جاهزًا الآن لطبقات أقوى مثل صفحات قصصية للمنتجات، حملات موسمية أرقى، وتجربة فاخرة أكثر في الدفع والسلة.</p>
      </div>
      <div class="hero-actions">
        <a class="primary-button" href="index.html">ارجع للرئيسية</a>
        <a class="ghost-button" href="contact.html">ابدأ معنا</a>
      </div>
    </section>
  `;
}

function renderCatalogToolbar(config, brandOptions = [], isAccounts = false) {
  return `
    <div class="toolbar">
      <input class="control" data-filter-field="search" value="${escapeHtml(config.search || "")}" placeholder="ابحث داخل القسم">
      <select class="control" data-filter-field="sort">
        <option value="latest" ${config.sort === "latest" ? "selected" : ""}>الأحدث</option>
        <option value="price-asc" ${config.sort === "price-asc" ? "selected" : ""}>السعر: الأقل أولًا</option>
        <option value="price-desc" ${config.sort === "price-desc" ? "selected" : ""}>السعر: الأعلى أولًا</option>
        <option value="popular" ${config.sort === "popular" ? "selected" : ""}>الأكثر طلبًا</option>
      </select>
      <select class="control" data-filter-field="brand">
        <option value="all">كل العلامات</option>
        ${brandOptions.map((brand) => `<option value="${escapeHtml(brand)}" ${config.brand === brand ? "selected" : ""}>${escapeHtml(brand)}</option>`).join("")}
      </select>
      <input class="control" data-filter-field="min" type="number" min="0" step="0.1" value="${escapeHtml(String(config.min || ""))}" placeholder="من سعر">
      <input class="control" data-filter-field="max" type="number" min="0" step="0.1" value="${escapeHtml(String(config.max || ""))}" placeholder="إلى سعر">
      ${!isAccounts ? `
        <select class="control" data-filter-field="size">
          <option value="all">كل المقاسات</option>
          ${["52", "53", "54", "55"].map((size) => `<option value="${size}" ${config.size === size ? "selected" : ""}>${size}</option>`).join("")}
        </select>
      ` : ""}
      <select class="control" data-filter-field="availability">
        <option value="all">كل الحالات</option>
        <option value="available" ${config.availability === "available" ? "selected" : ""}>المتوفر فقط</option>
        <option value="featured" ${config.availability === "featured" ? "selected" : ""}>المميز فقط</option>
      </select>
      <button type="button" class="ghost-button" data-reset-filters>إعادة الضبط</button>
    </div>
    ${renderSearchAssist(config, isAccounts)}
  `;
}

function renderSearchAssist(config, isAccounts = false) {
  const source = isAccounts ? getVisibleAccounts() : getVisibleProducts();
  const query = String(config.search || "").trim().toLowerCase();
  const matches = source
    .filter((item) => {
      if (!query) return true;
      return [item.name, item.brand, item.category, item.collection, item.color]
        .some((value) => String(value || "").toLowerCase().includes(query));
    })
    .slice(0, 6);
  if (!matches.length) return "";
  return `
    <div class="search-assist">
      <span class="mini-note">اقتراحات سريعة:</span>
      <div class="chip-row">
        ${matches.map((item) => `
          <button type="button" class="ghost-button ghost-button--chip" data-quick-search="${escapeHtml(item.name)}">
            ${escapeHtml(item.name)}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCatalogGrid(items, type = "product", compact = false) {
  if (!items.length) {
    return `
      <div class="empty-state">
        <strong>لا توجد عناصر مطابقة</strong>
        <p>جرّب تغيير الفلاتر أو البحث عن كلمة أخرى.</p>
      </div>
    `;
  }

  return `
    <div class="catalog-grid ${compact ? "catalog-grid--compact" : ""}">
      ${items.map((item) => renderCatalogCard(item, type === "mixed" ? (item.type || "product") : type)).join("")}
    </div>
  `;
}

function renderCatalogCard(item, type = "product") {
  const stock = getStock(item);
  const favorite = state.favorites.includes(item.id);
  const compare = state.compare.some((entry) => entry.id === item.id);
  return `
    <article class="catalog-card">
      <a class="catalog-card__media" href="product.html?id=${encodeURIComponent(item.id)}${type === "account" ? "&type=account" : ""}">
        <img src="${escapeHtml(item.imgUrl || getGallery(item)[0] || "")}" alt="${escapeHtml(item.name)}" loading="lazy">
        <div class="card-badges">
          ${item.featured ? '<span class="card-badge">مميز</span>' : ""}
          ${stock <= 3 && stock > 0 ? '<span class="card-badge card-badge--warn">متبقي قليل</span>' : ""}
          ${stock === 0 ? '<span class="card-badge card-badge--muted">نفد</span>' : ""}
        </div>
      </a>
      <div class="catalog-card__body">
        <div class="tag-row">
          <span class="tag">${escapeHtml(item.category || (type === "account" ? "الحسابات" : "عام"))}</span>
          ${item.brand ? `<span class="tag">${escapeHtml(item.brand)}</span>` : ""}
        </div>
        <a class="catalog-card__title" href="product.html?id=${encodeURIComponent(item.id)}${type === "account" ? "&type=account" : ""}">
          ${escapeHtml(item.name)}
        </a>
        <p class="mini-note">${escapeHtml((item.desc || "").slice(0, 90))}${(item.desc || "").length > 90 ? "..." : ""}</p>
        <div class="catalog-card__footer">
          <span class="price">${formatPrice(item.price)}</span>
          <div class="actions-row actions-row--wrap">
            <button class="ghost-button" type="button" data-favorite="${escapeHtml(item.id)}">${favorite ? "محفوظ" : "حفظ"}</button>
            <button class="ghost-button" type="button" data-compare="${escapeHtml(item.id)}" data-item-type="${escapeHtml(type)}">${compare ? "في المقارنة" : "قارن"}</button>
            <button class="primary-button" type="button" data-add-cart="${escapeHtml(item.id)}" data-item-type="${type}">إضافة</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderLoadMore(result) {
  if (result.visible.length >= result.total) return "";
  return `
    <div class="actions-row actions-row--center">
      <button class="ghost-button" type="button" data-load-more>تحميل المزيد</button>
    </div>
  `;
}

function renderCheckoutSummary(pricing, cartMode = false) {
  const totalSavings = Number((pricing.bulkDiscount + pricing.couponDiscount).toFixed(2));
  return `
    <aside class="summary-card">
      <h3>ملخص الطلب</h3>
      <div class="summary-list" style="margin-top:16px;">
        <div><span>الإجمالي قبل الشحن</span><strong>${formatPrice(pricing.subtotal)}</strong></div>
        <div><span>خصم الكمية</span><strong>${formatPrice(pricing.bulkDiscount)}</strong></div>
        <div><span>خصم الكوبون</span><strong>${formatPrice(pricing.couponDiscount)}</strong></div>
        <div><span>الشحن</span><strong>${formatPrice(pricing.shipping)}</strong></div>
        <div class="summary-total"><span>الإجمالي النهائي</span><strong>${formatPrice(pricing.total)}</strong></div>
      </div>
      <div class="summary-savings ${totalSavings > 0 ? "" : "summary-savings--muted"}">
        <strong>${totalSavings > 0 ? `وفرت ${formatPrice(totalSavings)}` : "ما زال هناك وفر إضافي ممكن"}</strong>
        <span>${totalSavings > 0 ? "يشمل خصم الكمية والكوبون الحالي قبل الانتقال إلى التأكيد النهائي." : "فعّل كوبونًا أو زد الكمية لرفع قيمة الطلب بشكل أذكى."}</span>
      </div>
      <p class="mini-note" style="margin-top:12px;">${escapeHtml(pricing.message)}</p>
      ${cartMode ? `
        <div class="actions-row" style="margin-top:18px;">
          <a class="primary-button" href="checkout.html">الانتقال إلى الدفع</a>
          <a class="ghost-button" href="index.html">تابع التسوق</a>
        </div>
      ` : ""}
    </aside>
  `;
}

function renderAdminSidebar(active) {
  const links = [
    ["admin.html", "لوحة الأدمن", "admin"],
    ["admin-products.html", "المنتجات", "admin-products"],
    ["admin-accounts.html", "الحسابات", "admin-accounts"],
    ["admin-orders.html", "الطلبات", "admin-orders"],
    ["admin-offers.html", "العروض والدفع", "admin-offers"],
    ["admin-images.html", "الصور", "admin-images"],
    ["admin-reports.html", "الإحصائيات", "admin-reports"]
  ];
  return `
    <aside class="admin-sidebar">
      ${links.map(([href, label, key]) => `
        <a href="${href}" class="${active === key ? "is-active" : ""}">${escapeHtml(label)}</a>
      `).join("")}
    </aside>
  `;
}

function renderAdminGate() {
  return `
    <section class="section-card">
      <div class="empty-state">
        <strong>الوصول محمي</strong>
        <p>هذه الصفحة مخصصة للأدمن فقط. سجّل الدخول بحساب الأدمن للمتابعة.</p>
        <div class="actions-row">
          <a class="primary-button" href="login.html">تسجيل الدخول</a>
          <a class="ghost-button" href="index.html">الرئيسية</a>
        </div>
      </div>
    </section>
  `;
}

function renderAdminItemCard(item, type) {
  const editAttr = type === "product" ? `data-edit-product="${escapeHtml(item.id)}"` : `data-edit-account="${escapeHtml(item.id)}"`;
  const deleteAttr = type === "product" ? `data-delete-product="${escapeHtml(item.id)}"` : `data-delete-account="${escapeHtml(item.id)}"`;
  return `
    <article class="catalog-card">
      <div class="catalog-card__media">
        <img src="${escapeHtml(item.imgUrl || getGallery(item)[0] || "")}" alt="${escapeHtml(item.name)}" loading="lazy">
      </div>
      <div class="catalog-card__body">
        <strong>${escapeHtml(item.name)}</strong>
        <p class="mini-note">${escapeHtml(item.category || "")}</p>
        <p class="price">${formatPrice(item.price)}</p>
        <div class="actions-row">
          <button class="ghost-button" type="button" ${editAttr}>تعديل</button>
          <button class="ghost-button" type="button" ${deleteAttr}>حذف</button>
          <a class="ghost-button" href="product.html?id=${encodeURIComponent(item.id)}${type === "account" ? "&type=account" : ""}">عرض</a>
        </div>
      </div>
    </article>
  `;
}

function renderMetricList(items, labelTitle, valueTitle) {
  if (!items.length) {
    return '<div class="empty-state"><strong>لا توجد بيانات كافية بعد</strong></div>';
  }
  return `
    <div class="metric-table">
      <div class="metric-table__head"><span>${escapeHtml(labelTitle)}</span><span>${escapeHtml(valueTitle)}</span></div>
      ${items.map((item) => `
        <div class="metric-table__row"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(String(item.value))}</strong></div>
      `).join("")}
    </div>
  `;
}

function renderOrderCard(order, adminMode = false) {
  const progress = order.status === "تم التوصيل" ? 100 : order.status === "تم الشحن" ? 66 : 33;
  const paymentStatus = resolveOrderPaymentStatus(order);
  return `
    <article class="order-card">
      <div class="order-card__head">
        <div>
          <strong>${escapeHtml(order.orderNumber || order.id || "طلب")}</strong>
          <p class="mini-note">${escapeHtml(order.custName || "")} - ${escapeHtml(formatDate(order.createdAt || order.date))}</p>
        </div>
        <span class="tag">${escapeHtml(order.status || "قيد المعالجة")}</span>
      </div>
      <div class="order-progress"><span style="width:${progress}%"></span></div>
      <p class="faq-answer">الإجمالي: ${formatPrice(order.total || 0)} • الدفع: ${escapeHtml(order.paymentMethodLabel || order.paymentMethod || "")} • الشحن: ${escapeHtml(order.deliveryType || "")}</p>
      <div class="tag-row">
        ${order.deliveryEstimate ? `<span class="tag">المدة: ${escapeHtml(order.deliveryEstimate)}</span>` : ""}
        ${order.giftWrap ? '<span class="tag">تغليف هدية</span>' : ""}
        ${order.marketLabel ? `<span class="tag">${escapeHtml(order.marketLabel)}</span>` : ""}
        ${paymentStatus ? `<span class="tag payment-pill">${escapeHtml(paymentStatus)}</span>` : ""}
        ${order.loyaltyEarned ? `<span class="tag">+${escapeHtml(String(order.loyaltyEarned))} نقطة</span>` : ""}
      </div>
      ${order.giftMessage ? `<p class="mini-note">رسالة الهدية: ${escapeHtml(order.giftMessage)}</p>` : ""}
      ${adminMode ? `
        <div class="actions-row">
          <select class="control" data-order-status="${escapeHtml(order.id)}">
            ${["قيد المعالجة", "تم الشحن", "تم التوصيل"].map((status) => `
              <option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>
            `).join("")}
          </select>
          <select class="control" data-payment-status="${escapeHtml(order.id)}">
            ${getPaymentStatusOptions(order.paymentMethod, paymentStatus).map((status) => `
              <option value="${status}" ${status === paymentStatus ? "selected" : ""}>${status}</option>
            `).join("")}
          </select>
          <a class="ghost-button" href="track-order.html?order=${encodeURIComponent(order.orderNumber || order.id)}">فتح التتبع</a>
        </div>
      ` : `
        <div class="actions-row">
          ${order.paymentLink && !/تم السداد|تم التحصيل|تم التحقق/.test(paymentStatus) ? `<a class="primary-button" href="${escapeHtml(order.paymentLink)}" target="_blank" rel="noopener">${escapeHtml(order.paymentActionLabel || "إكمال الدفع")}</a>` : ""}
          <a class="ghost-button" href="track-order.html?order=${encodeURIComponent(order.orderNumber || order.id)}">تتبع الطلب</a>
          <button class="ghost-button" type="button" data-download-invoice="${escapeHtml(order.id)}">الفاتورة</button>
          <button class="ghost-button" type="button" data-reorder="${escapeHtml(order.id)}">إعادة الطلب</button>
        </div>
      `}
    </article>
  `;
}

function hydratePageState() {
  const langConfig = LANGUAGE_OPTIONS[state.language] || LANGUAGE_OPTIONS.ar;
  document.documentElement.lang = state.language;
  document.documentElement.dir = langConfig.dir;
  document.body.classList.toggle("is-ltr", langConfig.dir === "ltr");
  document.body.classList.toggle("dark-mode", state.theme === "dark");
  document.body.classList.toggle("theme-dark", state.theme === "dark");
  const paymentSelect = document.getElementById("checkout-payment");
  if (paymentSelect && !paymentSelect.value) paymentSelect.value = state.checkoutPayment || "cod";
  if (route === "login") {
    void ensurePhoneRecaptcha();
  } else if (state.phoneAuth.recaptchaVerifier?.clear) {
    state.phoneAuth.recaptchaVerifier.clear();
    state.phoneAuth.recaptchaVerifier = null;
  }
}

function getHeroData() {
  const meta = ROUTE_META[route] || ROUTE_META["404"];
  const map = {
    home: {
      badge: state.contentSettings.homeBadge,
      title: state.contentSettings.homeTitle,
      text: state.contentSettings.homeText
    },
    edits: {
      badge: meta.eyebrow,
      title: "التحرير الموسمي",
      text: "صفحة مختارة بعناية تجمع الإطلاقات المميزة، الهدايا الراقية، والمسارات الأنسب لبناء طلب أعلى قيمة."
    },
    category: {
      badge: meta.eyebrow,
      title: routeCategory || "قسم مستقل",
      text: "كل قسم يفتح في صفحة مستقلة مع فلترة وترتيب وبحث داخلي."
    },
    accounts: {
      badge: meta.eyebrow,
      title: "صفحة الحسابات",
      text: "إدارة وعرض الحسابات في صفحة مستقلة واضحة مع صور كثيرة وتفاصيل كاملة."
    },
    product: {
      badge: meta.eyebrow,
      title: "صفحة تفاصيل المنتج",
      text: "معرض صور، وصف كامل، خيارات، مراجعات، وسلة واضحة."
    },
    cart: {
      badge: meta.eyebrow,
      title: "سلة التسوق",
      text: "راجع المنتجات وعدّل الكميات قبل الانتقال إلى الدفع."
    },
    checkout: {
      badge: meta.eyebrow,
      title: "صفحة الدفع",
      text: "بيانات العميل والشحن والدفع والكوبونات ضمن صفحة مستقلة ومنظمة."
    },
    login: {
      badge: meta.eyebrow,
      title: "دخول آمن",
      text: "سجّل دخولك للوصول إلى الطلبات والعناوين والمفضلة."
    },
    register: {
      badge: meta.eyebrow,
      title: "إنشاء حساب",
      text: "أنشئ حسابك لإدارة الطلبات وتتبعها وحفظ العناوين."
    },
    account: {
      badge: meta.eyebrow,
      title: "حسابي",
      text: "صفحة مستقلة لإدارة البيانات والعناوين والطلبات والمفضلة."
    },
    contact: {
      badge: meta.eyebrow,
      title: "نحن هنا لخدمتك",
      text: "تواصل معنا من صفحة مستقلة وواضحة."
    },
    faq: {
      badge: meta.eyebrow,
      title: "الأسئلة الشائعة",
      text: "إجابات سريعة ومنظمة على أهم الأسئلة."
    },
    about: {
      badge: meta.eyebrow,
      title: "عن متجر طَيّة",
      text: "متجر عماني فاخر بتجربة متعددة الصفحات وتنقل أسهل."
    },
    terms: {
      badge: meta.eyebrow,
      title: "الشروط والأحكام",
      text: "صفحة مستقلة توضح ضوابط الاستخدام والشراء."
    },
    privacy: {
      badge: meta.eyebrow,
      title: "سياسة الخصوصية",
      text: "تعرف كيف نتعامل مع بياناتك داخل المتجر."
    },
    "track-order": {
      badge: meta.eyebrow,
      title: "تتبع الطلب",
      text: "ابحث عن طلبك وتابع حالته خطوة بخطوة."
    },
    vip: {
      badge: meta.eyebrow,
      title: "نادي VIP",
      text: "مستوى الولاء، التقدم، المكافآت، والإحالات في صفحة مستقلة أكثر فخامة."
    },
    admin: {
      badge: meta.eyebrow,
      title: "لوحة التحكم",
      text: "تحكم كامل في المنتجات والحسابات والطلبات والعروض."
    },
    "admin-products": {
      badge: meta.eyebrow,
      title: "إدارة المنتجات",
      text: "أضف وعدّل واحذف المنتجات من صفحة مستقلة."
    },
    "admin-accounts": {
      badge: meta.eyebrow,
      title: "إدارة الحسابات",
      text: "قسم كامل لإدارة الحسابات وصورها وتفاصيلها."
    },
    "admin-orders": {
      badge: meta.eyebrow,
      title: "إدارة الطلبات",
      text: "متابعة حالات الطلبات وتحديثها من لوحة مستقلة."
    },
    "admin-offers": {
      badge: meta.eyebrow,
      title: "العروض وإعدادات الدفع",
      text: "عدّل طرق الدفع والعروض والمحتوى من مكان واحد."
    },
    "admin-images": {
      badge: meta.eyebrow,
      title: "إدارة الصور",
      text: "رفع الصور وضغطها وإدارتها بشكل مستقل."
    },
    "admin-reports": {
      badge: meta.eyebrow,
      title: "الإحصائيات والتقارير",
      text: "مبيعات يومية وشهرية وأفضل الفئات والعملاء."
    },
    "404": {
      badge: meta.eyebrow,
      title: "الصفحة غير موجودة",
      text: "يمكنك العودة للتصفح عبر الأقسام المنظمة."
    }
  };
  const current = map[route] || map["404"];
  const productQuestionCount = Object.values(state.productQuestions || {}).reduce((sum, entries) => {
    return sum + (Array.isArray(entries) ? entries.length : 0);
  }, 0);
  const savedForLaterCount = getSavedForLaterItemsDetailed().length;
  const giftOrders = state.orders.filter((order) => order.giftWrap).length;

  return {
    eyebrow: current.badge || meta.eyebrow || "TAYYA",
    title: current.title || document.body.dataset.title || "طَيّة",
    description: current.text || document.body.dataset.description || "",
    primary: meta.ctaPrimary || { href: "index.html", label: "الرئيسية" },
    secondary: meta.ctaSecondary || { href: "contact.html", label: "تواصل معنا" },
    asideTitle: route.startsWith("admin") ? "تشغيل منظم" : "تنقل أوضح",
    asideText: route.startsWith("admin")
      ? "كل المهام الإدارية صارت موزعة على صفحات مستقلة بدل التكدس في صفحة واحدة."
      : "الأقسام والمنتجات والسلة والدفع والحسابات أصبحت صفحات منفصلة فعلًا لتجربة مريحة وسريعة."
  };
}

function renderHeroStats() {
  const stats = [
    { value: getVisibleProducts().length, label: state.language === "en" ? "Products" : "منتجات" },
    { value: state.accounts.filter((item) => !item.hidden).length, label: state.language === "en" ? "Accounts" : "حسابات" },
    { value: getCartCount(), label: state.language === "en" ? "In cart" : "في السلة" },
    { value: state.orders.length, label: state.language === "en" ? "Orders" : "طلبات" }
  ];
  return stats.map((item) => `
    <article class="hero-stat">
      <strong>${escapeHtml(String(item.value))}</strong>
      <span>${escapeHtml(item.label)}</span>
    </article>
  `).join("");
}

function renderSupportWidget() {
  return `
    <aside class="support-widget">
      <strong>مركز الخدمة السريع</strong>
      <p>روابط مختصرة لأكثر الصفحات استخدامًا داخل المتجر.</p>
      <div class="support-widget__links">
        <a href="track-order.html"><i class="fas fa-truck-fast"></i><span>تتبع الطلب</span></a>
        <a href="contact.html"><i class="fas fa-headset"></i><span>تواصل</span></a>
        <a href="faq.html"><i class="fas fa-circle-question"></i><span>الأسئلة</span></a>
        <a href="https://api.whatsapp.com/send?phone=96876787356" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i><span>واتساب</span></a>
      </div>
    </aside>
  `;
}

function renderCompareTray() {
  const items = getCompareItems();
  if (!items.length) return "";
  return `
    <aside class="compare-tray" id="compare-tray">
      <div class="compare-tray__head">
        <div>
          <strong>مقارنة المنتجات</strong>
          <p>أضف حتى 4 عناصر وقارن السعر والفئة والعلامة والتوفر بسرعة.</p>
        </div>
        <span class="tag">${items.length}/4</span>
      </div>
      <div class="compare-tray__grid">
        ${items.map((item) => `
          <article class="compare-card">
            <div class="compare-card__top">
              <strong>${escapeHtml(item.name)}</strong>
              <button class="ghost-button" type="button" data-remove-compare="${escapeHtml(item.id)}">إزالة</button>
            </div>
            <div class="metric-table">
              <div class="metric-table__row"><span>السعر</span><strong>${formatPrice(item.price)}</strong></div>
              <div class="metric-table__row"><span>الفئة</span><strong>${escapeHtml(item.category || "عام")}</strong></div>
              <div class="metric-table__row"><span>العلامة</span><strong>${escapeHtml(item.brand || "غير محدد")}</strong></div>
              <div class="metric-table__row"><span>التوفر</span><strong>${getStock(item) > 0 ? "متوفر" : "نفد"}</strong></div>
            </div>
            <div class="actions-row">
              <a class="ghost-button" href="product.html?id=${encodeURIComponent(item.id)}${item.type === "account" ? "&type=account" : ""}">عرض</a>
              <button class="primary-button" type="button" data-add-cart="${escapeHtml(item.id)}" data-item-type="${escapeHtml(item.type || "product")}">إضافة</button>
            </div>
          </article>
        `).join("")}
      </div>
    </aside>
  `;
}

function renderBreadcrumbs() {
  const crumbs = [{ href: "index.html", label: t("home", "الرئيسية") }];
  if (route === "category" && routeCategory) crumbs.push({ href: currentFile(), label: getCategoryLabel(routeCategory) });
  if (route === "accounts") crumbs.push({ href: "accounts.html", label: t("accounts", "الحسابات") });
  if (route === "product") crumbs.push({ href: currentFile(), label: state.language === "en" ? "Product details" : "تفاصيل المنتج" });
  if (route === "cart") crumbs.push({ href: "cart.html", label: t("cart", "السلة") });
  if (route === "checkout") crumbs.push({ href: "checkout.html", label: state.language === "en" ? "Checkout" : "الدفع" });
  if (route === "account") crumbs.push({ href: "account.html", label: t("account", "حسابي") });
  if (route.startsWith("admin")) crumbs.push({ href: "admin.html", label: t("admin", "الأدمن") });
  if (["about", "contact", "faq", "terms", "privacy", "track-order", "login", "register"].includes(route)) {
    crumbs.push({ href: currentFile(), label: document.body.dataset.title || document.title });
  }
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${crumbs.map((crumb, index) => `
        <a href="${crumb.href}" class="${index === crumbs.length - 1 ? "is-current" : ""}">${escapeHtml(crumb.label)}</a>
      `).join("<span>/</span>")}
    </nav>
  `;
}

function bindEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeydown);
}

async function handleKeydown(event) {
  const active = document.activeElement;
  const typing = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement || active?.isContentEditable;

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    state.commandPaletteOpen = true;
    renderShell();
    await renderPage();
    return;
  }

  if (!typing && event.key === "/") {
    event.preventDefault();
    state.commandPaletteOpen = true;
    renderShell();
    await renderPage();
    return;
  }

  if (event.key === "Escape" && state.commandPaletteOpen) {
    event.preventDefault();
    state.commandPaletteOpen = false;
    state.commandQuery = "";
    renderShell();
    await renderPage();
    return;
  }

  if (event.key === "Escape" && (state.aiAssistantOpen || state.supportWidgetOpen || state.introOpen)) {
    event.preventDefault();
    state.aiAssistantOpen = false;
    state.supportWidgetOpen = false;
    if (state.introOpen) {
      state.introOpen = false;
      markStoreIntroSeen();
    }
    renderShell();
    await renderPage();
  }
}

async function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();

  switch (form.id) {
    case "login-form":
      await submitLogin(form);
      break;
    case "phone-auth-form":
      await submitPhoneAuth(form);
      break;
    case "phone-verify-form":
      await submitPhoneVerification(form);
      break;
    case "register-form":
      await submitRegister(form);
      break;
    case "contact-form":
      submitContact(form);
      break;
    case "newsletter-form":
      submitNewsletter(form);
      break;
    case "track-form":
      submitTrack(form);
      break;
    case "checkout-form":
      await submitCheckout(form);
      break;
    case "product-review-form":
      submitReview(form);
      break;
    case "product-question-form":
      submitProductQuestion(form);
      break;
    case "profile-form":
      submitProfile(form);
      break;
    case "address-form":
      submitAddress(form);
      break;
    case "admin-product-form":
      await submitAdminProduct(form);
      break;
    case "admin-account-form":
      await submitAdminAccount(form);
      break;
    case "admin-payment-form":
      submitAdminPayment(form);
      break;
    case "admin-content-form":
      submitAdminContent(form);
      break;
    case "admin-coupon-form":
      submitAdminCoupon(form);
      break;
    case "admin-image-form":
      await submitAdminImages(form);
      break;
    case "store-ai-form":
      submitStoreAi(form);
      break;
    default:
      break;
  }
}

async function handleClick(event) {
  const target = event.target instanceof Element ? event.target.closest("[data-add-cart], [data-add-bundle], [data-buy-now], [data-favorite], [data-compare], [data-remove-compare], [data-quick-search], [data-stock-alert], [data-reorder], [data-save-later], [data-move-to-cart], [data-remove-saved], [data-remove-cart], [data-load-more], [data-reset-filters], [data-apply-coupon], [data-social-login], [data-reset-password], [data-logout], [data-remove-address], [data-edit-product], [data-delete-product], [data-edit-account], [data-delete-account], [data-clear-product-edit], [data-clear-account-edit], [data-delete-coupon], [data-copy-url], [data-thumb-src], [data-export], [data-download-invoice], [data-action]") : null;
  if (!target) return;

  if (target.hasAttribute("data-thumb-src")) {
    const src = target.getAttribute("data-thumb-src") || "";
    const mainImage = document.getElementById("gallery-main-image");
    if (mainImage instanceof HTMLImageElement) {
      mainImage.src = src;
      document.querySelectorAll("[data-thumb-src]").forEach((thumb) => thumb.classList.remove("is-active"));
      target.classList.add("is-active");
    }
    return;
  }

  if (target.getAttribute("data-action") === "toggle-theme") {
    applyTheme(state.theme === "dark" ? "light" : "dark");
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "toggle-language") {
    applyLanguage(cycleLanguage());
    renderShell();
    await renderPage();
    notify(state.language === "en" ? "Language switched to English" : "تم التحويل إلى العربية");
    return;
  }

  if (target.getAttribute("data-action") === "toggle-currency") {
    state.currency = cycleCurrency();
    localStorage.setItem(KEYS.currency, state.currency);
    renderShell();
    await renderPage();
    notify(`تم تغيير العملة إلى ${state.currency}`);
    return;
  }

  if (target.getAttribute("data-action") === "install-app") {
    if (state.installPrompt) {
      await state.installPrompt.prompt();
      state.installPrompt = null;
      renderShell();
      await renderPage();
    } else {
      notify("خيار التثبيت غير متاح حاليًا على هذا المتصفح", "error");
    }
    return;
  }

  if (target.getAttribute("data-action") === "toggle-command") {
    state.commandPaletteOpen = true;
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "close-command") {
    state.commandPaletteOpen = false;
    state.commandQuery = "";
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "toggle-support") {
    state.supportWidgetOpen = !state.supportWidgetOpen;
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "toggle-ai") {
    ensureAiAssistantState();
    state.aiAssistantOpen = !state.aiAssistantOpen;
    state.supportWidgetOpen = state.aiAssistantOpen ? true : state.supportWidgetOpen;
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "close-ai") {
    state.aiAssistantOpen = false;
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "open-intro") {
    state.introOpen = true;
    state.supportWidgetOpen = true;
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "dismiss-intro") {
    state.introOpen = false;
    markStoreIntroSeen();
    renderShell();
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "ask-ai") {
    const prompt = target.getAttribute("data-prompt") || "";
    if (prompt) {
      submitStoreAiPrompt(prompt);
      renderShell();
      await renderPage();
    }
    return;
  }

  if (target.getAttribute("data-action") === "copy-campaign-code") {
    const code = target.getAttribute("data-code") || "";
    if (code) {
      await navigator.clipboard.writeText(code);
      notify("تم نسخ كود الحملة");
    }
    return;
  }

  if (target.getAttribute("data-action") === "apply-offer-code") {
    const code = String(target.getAttribute("data-code") || "").trim().toUpperCase();
    state.checkoutCoupon = code;
    await renderPage();
    notify(code ? `تم تطبيق ${code}` : "تم تحديث العرض");
    return;
  }

  if (target.getAttribute("data-action") === "scroll-compare") {
    const tray = document.getElementById("compare-tray");
    if (tray) {
      tray.classList.remove("is-highlighted");
      tray.scrollIntoView({ behavior: "smooth", block: "nearest" });
      window.setTimeout(() => tray.classList.add("is-highlighted"), 30);
      window.setTimeout(() => tray.classList.remove("is-highlighted"), 1800);
    } else {
      notify("أضف عناصر أولًا إلى المقارنة حتى تظهر اللوحة.");
    }
    return;
  }

  if (target.getAttribute("data-action") === "reset-phone-auth") {
    resetPhoneAuthState({ keepRecaptcha: false });
    await renderPage();
    return;
  }

  if (target.getAttribute("data-action") === "logout") {
    if (state.firebaseReady && state.auth && signOut) {
      await signOut(state.auth);
    }
    resetPhoneAuthState({ keepRecaptcha: false });
    state.user = null;
    localStorage.removeItem(KEYS.localUser);
    notify("تم تسجيل الخروج");
    renderShell();
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-add-cart")) {
    addCurrentItemToCart(target.getAttribute("data-add-cart"), target.getAttribute("data-item-type") || "product");
    return;
  }

  if (target.hasAttribute("data-add-bundle")) {
    addBundleToCart(target.getAttribute("data-add-bundle"));
    return;
  }

  if (target.hasAttribute("data-buy-now")) {
    addCurrentItemToCart(target.getAttribute("data-buy-now"), target.getAttribute("data-item-type") || "product");
    window.location.href = "checkout.html";
    return;
  }

  if (target.hasAttribute("data-favorite")) {
    toggleFavorite(target.getAttribute("data-favorite"));
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-compare")) {
    toggleCompare(target.getAttribute("data-compare"), target.getAttribute("data-item-type") || "product");
    renderShell();
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-remove-compare")) {
    removeCompareItem(target.getAttribute("data-remove-compare"));
    renderShell();
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-quick-search")) {
    const config = getListingState();
    config.search = target.getAttribute("data-quick-search") || "";
    config.visible = 8;
    saveListingState(config);
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-stock-alert")) {
    createStockAlert(target.getAttribute("data-stock-alert"), target.getAttribute("data-item-type") || "product");
    return;
  }

  if (target.hasAttribute("data-reorder")) {
    reorderItems(target.getAttribute("data-reorder"));
    renderShell();
    await renderPage();
    notify("تمت إضافة عناصر الطلب إلى السلة");
    return;
  }

  if (target.hasAttribute("data-save-later")) {
    moveCartItemToSaved(target.getAttribute("data-save-later"));
    renderShell();
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-move-to-cart")) {
    moveSavedToCart(target.getAttribute("data-move-to-cart"));
    renderShell();
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-remove-saved")) {
    removeSavedForLater(target.getAttribute("data-remove-saved"));
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-remove-cart")) {
    removeCartItem(target.getAttribute("data-remove-cart"));
    renderShell();
    await renderPage();
    notify("تم حذف العنصر من السلة");
    return;
  }

  if (target.hasAttribute("data-load-more")) {
    const config = getListingState();
    config.visible = Number(config.visible || 8) + 8;
    saveListingState(config);
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-reset-filters")) {
    saveListingState({ search: "", sort: "latest", brand: "all", min: "", max: "", size: "all", availability: "all", visible: 8 });
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-apply-coupon")) {
    const couponField = document.getElementById("checkout-coupon");
    state.checkoutCoupon = couponField instanceof HTMLInputElement ? couponField.value.trim().toUpperCase() : "";
    await renderPage();
    notify(state.checkoutCoupon ? "تم تحديث الكوبون" : "تم حذف الكوبون");
    return;
  }

  if (target.hasAttribute("data-social-login")) {
    await loginWithProvider(target.getAttribute("data-social-login") || "google");
    return;
  }

  if (target.hasAttribute("data-reset-password")) {
    const emailInput = document.querySelector('#login-form input[name="email"]');
    const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";
    if (!email) {
      notify("اكتب البريد الإلكتروني أولًا", "error");
      return;
    }
    if (state.firebaseReady && state.auth && sendPasswordResetEmail) {
      await sendPasswordResetEmail(state.auth, email);
      notify("تم إرسال رابط استرجاع كلمة المرور");
    } else {
      notify("وضع محلي: لا يمكن إرسال بريد فعلي الآن", "error");
    }
    return;
  }

  if (target.hasAttribute("data-logout")) {
    if (state.firebaseReady && state.auth && signOut) {
      await signOut(state.auth);
    }
    state.user = null;
    localStorage.removeItem(KEYS.localUser);
    notify("تم تسجيل الخروج");
    renderShell();
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-remove-address")) {
    const index = Number(target.getAttribute("data-remove-address"));
    const items = loadJson(KEYS.addresses, []);
    items.splice(index, 1);
    saveJson(KEYS.addresses, items);
    await renderPage();
    notify("تم حذف العنوان");
    return;
  }

  if (target.hasAttribute("data-edit-product")) {
    state.productEditId = target.getAttribute("data-edit-product") || "";
    await renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (target.hasAttribute("data-delete-product")) {
    const targetId = target.getAttribute("data-delete-product");
    if (state.firebaseReady && state.db) {
      await deleteDoc(doc(state.db, "products", targetId));
      await loadProducts(true);
    } else {
      state.products = state.products.filter((item) => item.id !== targetId);
      saveJson(KEYS.productsCache, state.products);
    }
    notify("تم حذف المنتج");
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-edit-account")) {
    state.accountEditId = target.getAttribute("data-edit-account") || "";
    await renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (target.hasAttribute("data-delete-account")) {
    const targetId = target.getAttribute("data-delete-account");
    if (state.firebaseReady && state.db) {
      await deleteDoc(doc(state.db, "accounts", targetId));
      await loadAccounts(true);
    } else {
      state.accounts = state.accounts.filter((item) => item.id !== targetId);
      saveJson(KEYS.accountsCache, state.accounts);
    }
    notify("تم حذف الحساب");
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-clear-product-edit")) {
    state.productEditId = "";
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-clear-account-edit")) {
    state.accountEditId = "";
    await renderPage();
    return;
  }

  if (target.hasAttribute("data-delete-coupon")) {
    state.coupons.splice(Number(target.getAttribute("data-delete-coupon")), 1);
    saveJson(KEYS.coupons, state.coupons);
    await renderPage();
    notify("تم حذف الكوبون");
    return;
  }

  if (target.hasAttribute("data-copy-url")) {
    const url = target.getAttribute("data-copy-url") || "";
    await navigator.clipboard.writeText(url);
    notify("تم نسخ الرابط");
    return;
  }

  if (target.hasAttribute("data-download-invoice")) {
    downloadInvoice(target.getAttribute("data-download-invoice"));
    return;
  }

  if (target.hasAttribute("data-export")) {
    exportData(target.getAttribute("data-export") || "orders");
    return;
  }
}

async function handleChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches("[data-filter-field]")) {
    const config = getListingState();
    const field = target.getAttribute("data-filter-field");
    config[field] = target.value;
    config.visible = 8;
    saveListingState(config);
    await renderPage();
    return;
  }

  if (target.matches("#checkout-region")) {
    state.checkoutRegion = target.value;
    const region = SHIPPING_REGIONS[state.checkoutRegion] || SHIPPING_REGIONS.om;
    state.checkoutMethod = region.methods[0]?.key || "";
    await renderPage();
    return;
  }

  if (target.matches("#checkout-method")) {
    state.checkoutMethod = target.value;
    await renderPage();
    return;
  }

  if (target.matches("#checkout-payment")) {
    state.checkoutPayment = target.value;
    await renderPage();
    return;
  }

  if (target.matches("#checkout-address-book")) {
    const addresses = loadJson(KEYS.addresses, []);
    const item = addresses[Number(target.value)];
    if (!item) return;
    const map = {
      "checkout-state": item.wilayat || "",
      "checkout-address": item.address || "",
      "checkout-name": item.name || state.customer.name || ""
    };
    Object.entries(map).forEach(([id, value]) => {
      const input = document.getElementById(id);
      if (input instanceof HTMLInputElement) input.value = value;
    });
    notify("تم تعبئة العنوان");
    return;
  }

  if (target.matches("#cart-region-preview")) {
    state.checkoutRegion = target.value;
    const region = SHIPPING_REGIONS[state.checkoutRegion] || SHIPPING_REGIONS.om;
    state.checkoutMethod = region.methods[0]?.key || "";
    await renderPage();
    return;
  }

  if (target.matches("#cart-method-preview")) {
    state.checkoutMethod = target.value;
    await renderPage();
    return;
  }

  if (target.matches("[data-order-status]")) {
    const orderId = target.getAttribute("data-order-status");
    const status = target.value;
    if (state.firebaseReady && state.db) {
      await updateDoc(doc(state.db, "orders", orderId), { status });
      await loadOrders(true);
    } else {
      state.orders = state.orders.map((order) => order.id === orderId ? { ...order, status } : order);
      saveJson(KEYS.ordersCache, state.orders);
    }
    notify("تم تحديث حالة الطلب");
    await renderPage();
    return;
  }
  if (target.matches("[data-payment-status]")) {
    const orderId = target.getAttribute("data-payment-status");
    const paymentStatus = target.value;
    if (state.firebaseReady && state.db) {
      await updateDoc(doc(state.db, "orders", orderId), { paymentStatus });
      await loadOrders(true);
    } else {
      state.orders = state.orders.map((order) => order.id === orderId ? { ...order, paymentStatus } : order);
      saveJson(KEYS.ordersCache, state.orders);
    }
    notify("تم تحديث حالة الدفع");
    await renderPage();
    return;
  }
}

async function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches("#command-palette-search")) {
    state.commandQuery = target.value;
    refreshCommandPaletteResults();
    return;
  }

  if (target.matches('[data-filter-field="search"]')) {
    const config = getListingState();
    config.search = target.value;
    config.visible = 8;
    saveListingState(config);
    await renderPage();
    const next = document.querySelector('[data-filter-field="search"]');
    if (next instanceof HTMLInputElement) {
      next.focus();
      next.selectionStart = next.selectionEnd = next.value.length;
    }
    return;
  }

  if (target.matches("[data-cart-qty]")) {
    updateCartQuantity(target.getAttribute("data-cart-qty"), target.value);
    renderShell();
    if (route === "cart" || route === "checkout") await renderPage();
    return;
  }

  if (target.matches("#admin-order-search")) {
    state.orderSearch = target.value;
    await renderPage();
    const newInput = document.getElementById("admin-order-search");
    if (newInput instanceof HTMLInputElement) {
      newInput.focus();
      newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
    }
  }
}

async function submitLogin(form) {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (state.firebaseReady && state.auth && signInWithEmailAndPassword) {
    await signInWithEmailAndPassword(state.auth, email, password);
  } else {
    state.user = { email, displayName: email.split("@")[0] || "مستخدم" };
    saveJson(KEYS.localUser, state.user);
  }
  notify("تم تسجيل الدخول");
  window.location.href = "account.html";
}

async function submitRegister(form) {
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");
  if (state.firebaseReady && state.auth && createUserWithEmailAndPassword) {
    const result = await createUserWithEmailAndPassword(state.auth, email, password);
    if (name && updateProfile) await updateProfile(result.user, { displayName: name });
  } else {
    state.user = { email, displayName: name || email.split("@")[0] || "مستخدم" };
    saveJson(KEYS.localUser, state.user);
  }
  state.customer = { ...state.customer, name, email, phone };
  saveJson(KEYS.customer, state.customer);
  notify("تم إنشاء الحساب");
  window.location.href = "account.html";
}

async function submitLogin(form) {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  let nextUser = null;

  if (state.firebaseReady && state.auth && signInWithEmailAndPassword) {
    const result = await signInWithEmailAndPassword(state.auth, email, password);
    nextUser = normalizeAuthUser(result.user);
  } else {
    nextUser = {
      email,
      displayName: email.split("@")[0] || "مستخدم",
      phoneNumber: getCurrentCustomerPhone(),
      providerIds: ["local-password"]
    };
  }

  state.user = nextUser;
  saveJson(KEYS.localUser, state.user);
  syncCustomerProfileFromUser(state.user);
  notify("تم تسجيل الدخول");
  window.location.href = "account.html";
}

async function submitRegister(form) {
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = sanitizePhoneInput(formData.get("phone") || "");
  const password = String(formData.get("password") || "");
  let nextUser = null;

  if (state.firebaseReady && state.auth && createUserWithEmailAndPassword) {
    const result = await createUserWithEmailAndPassword(state.auth, email, password);
    if (name && updateProfile) await updateProfile(result.user, { displayName: name });
    const normalized = normalizeAuthUser(result.user);
    nextUser = {
      ...normalized,
      displayName: name || normalized?.displayName || ""
    };
  } else {
    nextUser = {
      email,
      displayName: name || email.split("@")[0] || "مستخدم",
      phoneNumber: phone,
      providerIds: ["local-password"]
    };
  }

  state.user = nextUser;
  saveJson(KEYS.localUser, state.user);
  syncCustomerProfileFromUser(state.user);
  state.customer = { ...state.customer, name, email, phone };
  saveJson(KEYS.customer, state.customer);
  notify("تم إنشاء الحساب");
  window.location.href = "account.html";
}

async function submitPhoneAuth(form) {
  const formData = new FormData(form);
  const phone = sanitizePhoneInput(formData.get("phone") || "");
  if (!phone || !phone.startsWith("+") || normalizePhoneLookup(phone).length < 8) {
    notify("أدخل رقم الهاتف بصيغة دولية صحيحة مثل +968...", "error");
    return;
  }

  state.phoneAuth.phoneNumber = phone;

  if (!state.firebaseReady || !state.auth || !signInWithPhoneNumber) {
    state.phoneAuth.step = "verify";
    state.phoneAuth.localOtp = LOCAL_PHONE_OTP;
    state.phoneAuth.confirmationResult = null;
    notify(`وضع محلي: استخدم الرمز ${LOCAL_PHONE_OTP} لإكمال التجربة`, "error");
    await renderPage();
    return;
  }

  const verifier = await ensurePhoneRecaptcha();
  if (!verifier) {
    notify("تعذر تهيئة reCAPTCHA لتسجيل الهاتف", "error");
    return;
  }

  try {
    state.phoneAuth.confirmationResult = await signInWithPhoneNumber(state.auth, phone, verifier);
    state.phoneAuth.localOtp = "";
    state.phoneAuth.step = "verify";
    notify("تم إرسال رمز التحقق إلى هاتفك");
    await renderPage();
  } catch (error) {
    resetPhoneAuthState({ keepRecaptcha: false });
    console.error(error);
    notify("تعذر إرسال الرمز. تأكد من تفعيل Phone Auth والدومين داخل Firebase.", "error");
    await renderPage();
  }
}

async function submitPhoneVerification(form) {
  const formData = new FormData(form);
  const code = String(formData.get("code") || "").trim();
  if (code.length < 6) {
    notify("أدخل رمز تحقق من 6 أرقام", "error");
    return;
  }

  if (state.phoneAuth.localOtp) {
    if (code !== state.phoneAuth.localOtp) {
      notify("رمز التحقق المحلي غير صحيح", "error");
      return;
    }
    state.user = {
      phoneNumber: state.phoneAuth.phoneNumber,
      displayName: `عميل ${state.phoneAuth.phoneNumber.slice(-4)}`,
      providerIds: ["local-phone"]
    };
    saveJson(KEYS.localUser, state.user);
    syncCustomerProfileFromUser(state.user);
    resetPhoneAuthState({ keepRecaptcha: false });
    notify("تم تسجيل الدخول عبر الهاتف");
    window.location.href = "account.html";
    return;
  }

  if (!state.phoneAuth.confirmationResult) {
    notify("أعد إرسال الرمز أولًا", "error");
    return;
  }

  try {
    const result = await state.phoneAuth.confirmationResult.confirm(code);
    state.user = normalizeAuthUser(result.user);
    saveJson(KEYS.localUser, state.user);
    syncCustomerProfileFromUser(state.user);
    resetPhoneAuthState({ keepRecaptcha: false });
    notify("تم تسجيل الدخول عبر الهاتف");
    window.location.href = "account.html";
  } catch (error) {
    console.error(error);
    notify("رمز التحقق غير صحيح أو منتهي الصلاحية", "error");
  }
}

function submitContact(form) {
  const formData = new FormData(form);
  const inbox = loadJson(KEYS.contactInbox, []);
  inbox.unshift({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
    createdAt: new Date().toISOString()
  });
  saveJson(KEYS.contactInbox, inbox);
  form.reset();
  notify("تم إرسال رسالتك بنجاح");
}

function submitNewsletter(form) {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email) {
    notify("اكتب البريد الإلكتروني أولًا", "error");
    return;
  }
  const next = getNewsletterSubscribers().filter((entry) => String(entry.email || "").trim().toLowerCase() !== email);
  next.unshift({
    email,
    wantsNews: formData.get("news") === "on",
    wantsOffers: formData.get("offers") === "on",
    createdAt: new Date().toISOString()
  });
  state.newsletter = next;
  saveJson(KEYS.newsletter, state.newsletter);
  form.reset();
  notify("تم تفعيل الاشتراك في تحديثات المتجر");
  renderPage();
}

function submitTrack(form) {
  const formData = new FormData(form);
  state.trackQuery = String(formData.get("query") || "").trim();
  const url = new URL(window.location.href);
  if (state.trackQuery) url.searchParams.set("order", state.trackQuery);
  else url.searchParams.delete("order");
  window.history.replaceState({}, "", url.toString());
  renderPage();
}

function submitReview(form) {
  const formData = new FormData(form);
  const productId = form.dataset.productId || "";
  const items = state.reviews[productId] || [];
  items.unshift({
    name: String(formData.get("name") || "عميل"),
    rating: Number(formData.get("rating") || 5),
    comment: String(formData.get("comment") || "").trim(),
    createdAt: new Date().toISOString()
  });
  state.reviews[productId] = items.slice(0, 20);
  saveJson(KEYS.reviews, state.reviews);
  form.reset();
  notify("تم حفظ مراجعتك");
  renderPage();
}

function submitProductQuestion(form) {
  const formData = new FormData(form);
  const productId = form.dataset.productId || "";
  const question = String(formData.get("question") || "").trim();
  if (!productId || !question) {
    notify("اكتب السؤال أولًا", "error");
    return;
  }
  const items = getProductQuestions(productId);
  items.unshift({
    name: String(formData.get("name") || "زائر"),
    question,
    answer: "",
    createdAt: new Date().toISOString()
  });
  state.productQuestions[productId] = items.slice(0, 12);
  saveJson(KEYS.productQuestions, state.productQuestions);
  form.reset();
  notify("تم إرسال السؤال وسيظهر داخل صفحة المنتج");
  renderPage();
}

function submitProfile(form) {
  const formData = new FormData(form);
  state.customer = {
    ...state.customer,
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: sanitizePhoneInput(formData.get("phone") || ""),
    wilayat: String(formData.get("wilayat") || "").trim(),
    address: String(formData.get("address") || "").trim()
  };
  saveJson(KEYS.customer, state.customer);
  notify("تم حفظ بيانات الحساب");
}

function submitAddress(form) {
  const formData = new FormData(form);
  const items = loadJson(KEYS.addresses, []);
  items.unshift({
    name: String(formData.get("name") || "").trim(),
    wilayat: String(formData.get("wilayat") || "").trim(),
    address: String(formData.get("address") || "").trim()
  });
  saveJson(KEYS.addresses, items);
  form.reset();
  renderPage();
  notify("تم حفظ العنوان");
}

async function submitCheckout(form) {
  const items = getCartItemsDetailed();
  if (!items.length) {
    notify("السلة فارغة", "error");
    return;
  }

  const formData = new FormData(form);
  const regionKey = String(formData.get("region") || state.checkoutRegion || "om");
  const deliveryType = String(formData.get("deliveryType") || state.checkoutMethod || "");
  const paymentMethod = String(formData.get("paymentMethod") || state.checkoutPayment || "cod");
  const couponCode = String(formData.get("coupon") || state.checkoutCoupon || "").trim().toUpperCase();
  const pricing = getCartPricing(regionKey, deliveryType, couponCode);
  const region = SHIPPING_REGIONS[regionKey] || SHIPPING_REGIONS.om;
  const method = region.methods.find((item) => item.key === deliveryType) || region.methods[0];
  const orderNumber = createOrderNumber();
  const paymentMeta = getPaymentMeta(paymentMethod);

  const customer = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: sanitizePhoneInput(formData.get("phone") || ""),
    wilayat: String(formData.get("wilayat") || "").trim(),
    address: String(formData.get("address") || "").trim()
  };
  state.customer = { ...state.customer, ...customer };
  saveJson(KEYS.customer, state.customer);
  if (formData.get("saveAddress") === "on" && customer.address) {
    const addresses = loadJson(KEYS.addresses, []);
    const nextAddresses = [
      { name: customer.name || "العنوان الرئيسي", wilayat: customer.wilayat, address: customer.address },
      ...addresses.filter((entry) => `${entry.wilayat || ""}::${entry.address || ""}` !== `${customer.wilayat}::${customer.address}`)
    ].slice(0, 8);
    saveJson(KEYS.addresses, nextAddresses);
  }

  const loyaltyEarned = calculateLoyaltyReward(pricing.total, {
    paymentMethod,
    giftWrap: formData.get("giftWrap") === "on"
  });

  const payload = {
    orderNumber,
    status: "قيد المعالجة",
    createdAt: new Date().toISOString(),
    date: formatDate(new Date().toISOString()),
    custName: customer.name,
    custEmail: customer.email,
    custPhone: customer.phone,
    wilayat: customer.wilayat,
    address: customer.address,
    items: items.map((item) => ({
      id: item.id,
      type: item.type,
      name: item.name,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
      size: item.size || "",
      imgUrl: item.imgUrl || ""
    })),
    subtotal: pricing.subtotal,
    bulkDiscount: pricing.bulkDiscount,
    discount: pricing.couponDiscount,
    delivery: pricing.shipping,
    total: pricing.total,
    couponCode,
    paymentMethod,
    paymentMethodLabel: paymentMeta.label,
    deliveryType: method?.label || deliveryType,
    deliveryEstimate: method?.eta || "",
    marketKey: regionKey,
    marketLabel: region.label,
    note: String(formData.get("note") || "").trim(),
    giftWrap: formData.get("giftWrap") === "on",
    giftMessage: String(formData.get("giftMessage") || "").trim(),
    userEmail: state.user?.email || customer.email || "",
    userPhone: getCurrentCustomerPhone() || customer.phone || "",
    loyaltyEarned,
    vipTierLabel: getLoyaltyTier(getLoyaltyPoints() + loyaltyEarned).label
  };

  let orderId = `local-${Date.now()}`;
  const paymentLink = resolvePaymentLink(paymentMethod, { ...payload, id: orderId });
  payload.paymentLink = paymentLink;
  payload.paymentStatus = getInitialPaymentStatus(paymentMethod, paymentLink);
  payload.paymentActionLabel = getPaymentActionLabel(paymentMethod);
  payload.paymentInstructions = renderPaymentHint(paymentMethod);
  if (state.firebaseReady && state.db) {
    const added = await addDoc(collection(state.db, "orders"), payload);
    orderId = added.id;
    payload.paymentLink = resolvePaymentLink(paymentMethod, { ...payload, id: orderId });
    payload.paymentStatus = getInitialPaymentStatus(paymentMethod, payload.paymentLink);
    await updateDoc(doc(state.db, "orders", orderId), {
      paymentLink: payload.paymentLink,
      paymentStatus: payload.paymentStatus
    });
  }
  state.orders.unshift({ id: orderId, ...payload });
  saveJson(KEYS.ordersCache, state.orders);
  await reduceStockAfterOrder(items);
  persistCart([]);
  state.checkoutCoupon = "";
  notify(`تم إنشاء الطلب ${orderNumber}`);

  const paymentRedirectLink = resolvePaymentLink(paymentMethod, { ...payload, id: orderId });
  if (paymentRedirectLink) window.open(paymentRedirectLink, "_blank", "noopener");
  window.location.href = `track-order.html?order=${encodeURIComponent(orderNumber)}`;
}

async function submitAdminProduct(form) {
  const formData = new FormData(form);
  const payload = normalizeProduct({
    id: String(formData.get("id") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    price: Number(formData.get("price") || 0),
    category: String(formData.get("category") || "").trim(),
    brand: String(formData.get("brand") || "").trim(),
    color: String(formData.get("color") || "").trim(),
    material: String(formData.get("material") || "").trim(),
    collection: String(formData.get("collection") || "").trim(),
    imgUrl: String(formData.get("imgUrl") || "").trim(),
    desc: String(formData.get("desc") || "").trim(),
    gallery: parseMultiline(String(formData.get("gallery") || "")),
    stockSizes: {
      52: Number(formData.get("stock52") || 0),
      53: Number(formData.get("stock53") || 0),
      54: Number(formData.get("stock54") || 0),
      55: Number(formData.get("stock55") || 0)
    },
    createdAt: new Date().toISOString()
  });
  const id = String(formData.get("id") || "").trim();
  const docPayload = { ...payload };
  delete docPayload.id;
  if (state.firebaseReady && state.db) {
    if (id) await updateDoc(doc(state.db, "products", id), docPayload);
    else await addDoc(collection(state.db, "products"), docPayload);
    await loadProducts(true);
  } else {
    if (id) {
      state.products = state.products.map((item) => item.id === id ? { ...payload } : item);
    } else {
      state.products.unshift({ ...payload, id: `local-product-${Date.now()}` });
    }
    saveJson(KEYS.productsCache, state.products);
  }
  state.productEditId = "";
  await renderPage();
  form.reset();
  notify(id ? "تم تحديث المنتج" : "تمت إضافة المنتج");
}

async function submitAdminAccount(form) {
  const formData = new FormData(form);
  const payload = normalizeAccount({
    id: String(formData.get("id") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    price: Number(formData.get("price") || 0),
    category: String(formData.get("category") || "").trim(),
    accountType: String(formData.get("accountType") || "").trim(),
    brand: String(formData.get("brand") || "").trim(),
    imgUrl: String(formData.get("imgUrl") || "").trim(),
    desc: String(formData.get("desc") || "").trim(),
    gallery: parseMultiline(String(formData.get("gallery") || "")),
    featured: formData.get("featured") === "on",
    offer: formData.get("offer") === "on",
    hidden: formData.get("hidden") === "on",
    createdAt: new Date().toISOString()
  });
  const id = String(formData.get("id") || "").trim();
  const docPayload = { ...payload };
  delete docPayload.id;
  if (state.firebaseReady && state.db) {
    if (id) await updateDoc(doc(state.db, "accounts", id), docPayload);
    else await addDoc(collection(state.db, "accounts"), docPayload);
    await loadAccounts(true);
  } else {
    if (id) {
      state.accounts = state.accounts.map((item) => item.id === id ? { ...payload } : item);
    } else {
      state.accounts.unshift({ ...payload, id: `local-account-${Date.now()}` });
    }
    saveJson(KEYS.accountsCache, state.accounts);
  }
  state.accountEditId = "";
  await renderPage();
  form.reset();
  notify(id ? "تم تحديث الحساب" : "تمت إضافة الحساب");
}

function submitAdminPayment(form) {
  const formData = new FormData(form);
  state.paymentSettings = {
    paypalLink: String(formData.get("paypalLink") || "").trim(),
    stripeLink: String(formData.get("stripeLink") || "").trim(),
    bankAccountName: String(formData.get("bankAccountName") || "").trim(),
    bankName: String(formData.get("bankName") || "").trim(),
    bankIban: String(formData.get("bankIban") || "").trim(),
    bankNote: String(formData.get("bankNote") || "").trim()
  };
  saveJson(KEYS.payment, state.paymentSettings);
  notify("تم حفظ إعدادات الدفع");
}

function submitAdminContent(form) {
  const formData = new FormData(form);
  state.contentSettings = {
    topRibbon: String(formData.get("topRibbon") || "").trim(),
    homeBadge: String(formData.get("homeBadge") || "").trim(),
    homeTitle: String(formData.get("homeTitle") || "").trim(),
    homeText: String(formData.get("homeText") || "").trim(),
    campaignTitle: String(formData.get("campaignTitle") || "").trim(),
    campaignText: String(formData.get("campaignText") || "").trim(),
    campaignCode: String(formData.get("campaignCode") || "").trim().toUpperCase(),
    campaignEndsAt: String(formData.get("campaignEndsAt") || "").trim(),
    campaignHref: String(formData.get("campaignHref") || "").trim()
  };
  saveJson(KEYS.content, state.contentSettings);
  renderShell();
  renderPage();
  notify("تم حفظ محتوى الصفحة الرئيسية");
}

function submitAdminCoupon(form) {
  const formData = new FormData(form);
  state.coupons.unshift({
    code: String(formData.get("code") || "").trim().toUpperCase(),
    percent: Number(formData.get("percent") || 0),
    minimum: Number(formData.get("minimum") || 0),
    label: String(formData.get("label") || "").trim()
  });
  saveJson(KEYS.coupons, state.coupons);
  form.reset();
  renderPage();
  notify("تمت إضافة الكوبون");
}

async function submitAdminImages(form) {
  const formData = new FormData(form);
  const files = Array.from(formData.getAll("files")).filter((file) => file instanceof File);
  if (!files.length) {
    notify("اختر صورًا أولًا", "error");
    return;
  }
  const uploaded = await uploadFiles(files);
  const existing = loadJson("tayya_uploaded_images_v1", []);
  saveJson("tayya_uploaded_images_v1", [...uploaded, ...existing].slice(0, 60));
  form.reset();
  await renderPage();
  notify(`تم رفع ${uploaded.length} صورة`);
}

function addCurrentItemToCart(id, type) {
  const item = type === "account" ? getAccountById(id) : getProductById(id);
  if (!item) {
    notify("تعذر العثور على العنصر", "error");
    return;
  }
  const sizeField = document.getElementById("detail-size");
  const qtyField = document.getElementById("detail-quantity");
  const size = sizeField instanceof HTMLSelectElement ? sizeField.value : getSizes(item)[0] || "";
  const quantity = qtyField instanceof HTMLInputElement ? Math.max(1, Number(qtyField.value || 1)) : 1;
  upsertCartEntry(item, type, size, quantity);
  persistCart(state.cart);
  renderShell();
  renderPage();
  notify("تمت إضافة العنصر إلى السلة");
}

function upsertCartEntry(item, type, size, quantity = 1) {
  const existing = state.cart.find((entry) => entry.id === item.id && entry.size === size && entry.type === type);
  const max = Math.max(1, getStock(item, size));
  if (existing) existing.quantity = Math.min(max, Number(existing.quantity || 0) + quantity);
  else state.cart.push({
    id: item.id,
    type,
    name: item.name,
    price: Number(item.price || 0),
    size,
    quantity: Math.min(max, quantity),
    imgUrl: item.imgUrl || getGallery(item)[0] || ""
  });
}

function addBundleToCart(serializedIds) {
  const ids = String(serializedIds || "").split("|").map((item) => item.trim()).filter(Boolean);
  if (!ids.length) return;
  let added = 0;
  ids.forEach((id) => {
    const item = getProductById(id);
    if (!item) return;
    upsertCartEntry(item, "product", getSizes(item)[0] || "", 1);
    added += 1;
  });
  if (!added) {
    notify("تعذر إنشاء الباقة الآن", "error");
    return;
  }
  persistCart(state.cart);
  renderShell();
  renderPage();
  notify(`تمت إضافة ${added} عناصر إلى السلة`);
}

function moveCartItemToSaved(key) {
  const item = state.cart.find((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` === key);
  if (!item) return;
  state.cart = state.cart.filter((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` !== key);
  state.savedForLater = [
    item,
    ...state.savedForLater.filter((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` !== key)
  ].slice(0, 20);
  persistCart(state.cart);
  saveJson(KEYS.savedForLater, state.savedForLater);
  notify("تم حفظ العنصر لوقت لاحق");
}

function moveSavedToCart(key) {
  const item = state.savedForLater.find((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` === key);
  if (!item) return;
  state.savedForLater = state.savedForLater.filter((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` !== key);
  saveJson(KEYS.savedForLater, state.savedForLater);
  const source = item.type === "account" ? getAccountById(item.id) : getProductById(item.id);
  if (source) {
    upsertCartEntry(source, item.type || "product", item.size || getSizes(source)[0] || "", Number(item.quantity || 1));
    persistCart(state.cart);
    notify("أُعيد العنصر إلى السلة");
  } else {
    notify("العنصر لم يعد متاحًا كما كان", "error");
  }
}

function removeSavedForLater(key) {
  state.savedForLater = state.savedForLater.filter((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` !== key);
  saveJson(KEYS.savedForLater, state.savedForLater);
  notify("تم حذف العنصر من المحفوظات المؤقتة");
}

function toggleFavorite(id) {
  if (!id) return;
  if (state.favorites.includes(id)) state.favorites = state.favorites.filter((item) => item !== id);
  else state.favorites = [id, ...state.favorites];
  saveJson(KEYS.favorites, state.favorites);
  notify(state.favorites.includes(id) ? "تم حفظ المنتج" : "تمت إزالة الحفظ");
}

function toggleCompare(id, type = "product") {
  if (!id) return;
  const exists = state.compare.some((entry) => entry.id === id);
  if (exists) {
    state.compare = state.compare.filter((entry) => entry.id !== id);
    saveJson(KEYS.compare, state.compare);
    notify("تمت إزالة العنصر من المقارنة");
    return;
  }
  if (state.compare.length >= 4) {
    notify("يمكنك مقارنة 4 عناصر فقط في كل مرة", "error");
    return;
  }
  state.compare = [{ id, type }, ...state.compare];
  saveJson(KEYS.compare, state.compare);
  notify("تمت إضافة العنصر إلى المقارنة");
}

function removeCompareItem(id) {
  state.compare = state.compare.filter((entry) => entry.id !== id);
  saveJson(KEYS.compare, state.compare);
  notify("تم حذف العنصر من المقارنة");
}

function createStockAlert(id, type = "product") {
  const source = type === "account" ? getAccountById(id) : getProductById(id);
  if (!source) return;
  const email = getCurrentCustomerEmail() || prompt("أدخل بريدك الإلكتروني لتفعيل التنبيه") || "";
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) {
    notify("لا يمكن حفظ التنبيه بدون بريد إلكتروني", "error");
    return;
  }
  const next = getStockAlerts().filter((entry) => !(entry.id === id && String(entry.email || "").trim().toLowerCase() === normalizedEmail));
  next.unshift({
    id,
    type,
    name: source.name || "",
    email: normalizedEmail,
    createdAt: new Date().toISOString()
  });
  state.stockAlerts = next;
  saveJson(KEYS.stockAlerts, state.stockAlerts);
  notify("تم حفظ طلب التنبيه عند توفر المنتج");
}

function reorderItems(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId);
  if (!order?.items?.length) return;
  const nextCart = [...state.cart];
  order.items.forEach((entry) => {
    const cartKey = `${entry.id}::${entry.size || ""}::${entry.type || "product"}`;
    const current = nextCart.find((item) => `${item.id}::${item.size || ""}::${item.type || "product"}` === cartKey);
    if (current) current.quantity = Number(current.quantity || 0) + Number(entry.quantity || 1);
    else nextCart.push({
      id: entry.id,
      type: entry.type || "product",
      quantity: Number(entry.quantity || 1),
      size: entry.size || ""
    });
  });
  persistCart(nextCart);
}

function removeCartItem(key) {
  state.cart = state.cart.filter((item) => `${item.id}::${item.size || ""}::${item.type || "product"}` !== key);
  persistCart(state.cart);
}

function updateCartQuantity(key, value) {
  const item = state.cart.find((entry) => `${entry.id}::${entry.size || ""}::${entry.type || "product"}` === key);
  if (!item) return;
  item.quantity = Math.max(1, Number(value || 1));
  persistCart(state.cart);
}

async function loginWithGoogle() {
  if (state.firebaseReady && state.auth && GoogleAuthProvider && signInWithPopup) {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(state.auth, provider);
    notify("تم تسجيل الدخول عبر Google");
  } else {
    state.user = { email: "local-google@tayya.om", displayName: "Google Demo" };
    saveJson(KEYS.localUser, state.user);
    notify("تم تسجيل دخول محلي تجريبي");
  }
  window.location.href = "account.html";
}

async function loginWithGoogle() {
  if (state.firebaseReady && state.auth && GoogleAuthProvider && signInWithPopup) {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(state.auth, provider);
    state.user = normalizeAuthUser(result.user);
    saveJson(KEYS.localUser, state.user);
    syncCustomerProfileFromUser(state.user);
    notify("تم تسجيل الدخول عبر Google");
  } else {
    state.user = { email: "local-google@tayya.om", displayName: "Google Demo", providerIds: ["local-google"] };
    saveJson(KEYS.localUser, state.user);
    syncCustomerProfileFromUser(state.user);
    notify("تم تسجيل دخول محلي تجريبي");
  }
  window.location.href = "account.html";
}

async function loginWithProvider(providerName = "google") {
  const normalized = String(providerName || "google").toLowerCase();
  const isFacebook = normalized === "facebook";
  const Provider = isFacebook ? FacebookAuthProvider : GoogleAuthProvider;
  const label = isFacebook ? "Facebook" : "Google";

  if (state.firebaseReady && state.auth && Provider && signInWithPopup) {
    const provider = new Provider();
    const result = await signInWithPopup(state.auth, provider);
    state.user = normalizeAuthUser(result.user);
    saveJson(KEYS.localUser, state.user);
    syncCustomerProfileFromUser(state.user);
    notify(`تم تسجيل الدخول عبر ${label}`);
  } else {
    state.user = {
      email: `local-${normalized}@tayya.om`,
      displayName: `${label} Demo`,
      providerIds: [`local-${normalized}`]
    };
    saveJson(KEYS.localUser, state.user);
    syncCustomerProfileFromUser(state.user);
    notify(`تم تسجيل دخول محلي تجريبي عبر ${label}`);
  }
  window.location.href = "account.html";
}

async function reduceStockAfterOrder(items) {
  if (!state.firebaseReady || !state.db) {
    state.products = state.products.map((product) => {
      const orderItem = items.find((item) => item.type !== "account" && item.id === product.id);
      if (!orderItem) return product;
      const stockSizes = { ...(product.stockSizes || {}) };
      if (orderItem.size) {
        const current = Number(stockSizes[orderItem.size] || 0);
        stockSizes[orderItem.size] = Math.max(0, current - Number(orderItem.quantity || 1));
      }
      return { ...product, stockSizes };
    });
    saveJson(KEYS.productsCache, state.products);
    return;
  }
  for (const orderItem of items) {
    if (orderItem.type === "account") continue;
    const product = getProductById(orderItem.id);
    if (!product) continue;
    const stockSizes = { ...(product.stockSizes || {}) };
    if (orderItem.size) {
      const current = Number(stockSizes[orderItem.size] || 0);
      stockSizes[orderItem.size] = Math.max(0, current - Number(orderItem.quantity || 1));
    }
    await updateDoc(doc(state.db, "products", orderItem.id), { stockSizes });
  }
  await loadProducts(true);
}

function filterCatalog(items, config) {
  const query = String(config.search || "").trim().toLowerCase();
  const filtered = items.filter((item) => {
    const text = [
      item.name,
      item.category,
      item.brand,
      item.color,
      item.material,
      item.collection,
      item.desc,
      ...(item.tags || [])
    ].join(" ").toLowerCase();
    const searchMatch = !query || text.includes(query);
    const brandMatch = !config.brand || config.brand === "all" || String(item.brand || "") === String(config.brand);
    const minMatch = !config.min || Number(item.price || 0) >= Number(config.min);
    const maxMatch = !config.max || Number(item.price || 0) <= Number(config.max);
    const sizeMatch = !config.size || config.size === "all" || Number((item.stockSizes || {})[config.size] || 0) > 0;
    const stock = getStock(item);
    const availabilityMatch =
      !config.availability ||
      config.availability === "all" ||
      (config.availability === "available" && stock > 0) ||
      (config.availability === "featured" && item.featured);
    return searchMatch && brandMatch && minMatch && maxMatch && sizeMatch && availabilityMatch;
  });

  filtered.sort((a, b) => {
    if (config.sort === "price-asc") return Number(a.price || 0) - Number(b.price || 0);
    if (config.sort === "price-desc") return Number(b.price || 0) - Number(a.price || 0);
    if (config.sort === "popular") return getPopularityScore(b) - getPopularityScore(a);
    return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });

  const visibleCount = Number(config.visible || 8);
  return {
    total: filtered.length,
    visible: filtered.slice(0, visibleCount),
    all: filtered
  };
}

function getListingState() {
  const key = `tayya_listing_${route}_${routeCategory || "all"}`;
  if (!state.filters[key]) {
    state.filters[key] = loadJson(key, { search: "", sort: "latest", brand: "all", min: "", max: "", size: "all", availability: "all", visible: 8 });
  }
  return { ...state.filters[key] };
}

function saveListingState(config) {
  const key = `tayya_listing_${route}_${routeCategory || "all"}`;
  state.filters[key] = { ...config };
  saveJson(key, state.filters[key]);
}

function getVisibleProducts() {
  return state.products.filter((item) => !item.hidden);
}

function getVisibleAccounts() {
  return state.accounts.filter((item) => !item.hidden);
}

function getProductById(id) {
  return state.products.find((item) => item.id === id) || null;
}

function getAccountById(id) {
  return state.accounts.find((item) => item.id === id) || null;
}

function getCartItemsDetailed() {
  return state.cart.map((entry) => {
    const source = entry.type === "account" ? getAccountById(entry.id) : getProductById(entry.id);
    const merged = { ...(source || {}), ...entry };
    return {
      ...merged,
      cartKey: `${entry.id}::${entry.size || ""}::${entry.type || "product"}`
    };
  });
}

function getCartCount() {
  return state.cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function getCartPricing(regionKey = state.checkoutRegion || "om", methodKey = state.checkoutMethod || "", couponCode = state.checkoutCoupon || "") {
  const items = getCartItemsDetailed();
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
  const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const bulkDiscount = totalQty >= 4 ? Number((subtotal * 0.05).toFixed(2)) : 0;
  const coupon = state.coupons.find((item) => String(item.code || "").toUpperCase() === String(couponCode || "").toUpperCase());
  const couponDiscount = coupon && subtotal >= Number(coupon.minimum || 0)
    ? Number((((subtotal - bulkDiscount) * Number(coupon.percent || 0)) / 100).toFixed(2))
    : 0;
  const region = SHIPPING_REGIONS[regionKey] || SHIPPING_REGIONS.om;
  const method = region.methods.find((item) => item.key === methodKey) || region.methods[0];
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : Number(method?.price || 0);
  const total = Math.max(0, Number((subtotal - bulkDiscount - couponDiscount + shipping).toFixed(2)));
  const message = shipping === 0
    ? `مبروك، حصلت على شحن مجاني لأن المجموع تجاوز ${FREE_SHIPPING_THRESHOLD} ر.ع`
    : `أضف ${formatPrice(Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal))} لتحصل على شحن مجاني.`;
  return { subtotal, bulkDiscount, couponDiscount, shipping, total, message };
}

function getCurrentCustomerOrders() {
  if (!state.user) return [];
  const email = String(state.user.email || state.customer.email || "").toLowerCase();
  return state.orders.filter((order) => String(order.userEmail || order.custEmail || "").toLowerCase() === email);
}

function getCompareItems() {
  return (Array.isArray(state.compare) ? state.compare : [])
    .map((entry) => {
      const type = entry.type === "account" ? "account" : "product";
      const source = type === "account" ? getAccountById(entry.id) : getProductById(entry.id);
      return source ? { ...source, type } : null;
    })
    .filter(Boolean);
}

function getCurrentCustomerEmail() {
  return String(state.user?.email || state.customer.email || "").trim().toLowerCase();
}

function getCurrentCustomerOrders() {
  if (!state.user) return [];
  const email = getCurrentCustomerEmail();
  const phone = normalizePhoneLookup(getCurrentCustomerPhone());
  return state.orders.filter((order) => {
    const orderEmail = String(order.userEmail || order.custEmail || "").toLowerCase();
    const orderPhone = normalizePhoneLookup(order.userPhone || order.custPhone || "");
    return (email && orderEmail === email) || (phone && orderPhone === phone);
  });
}

function getCurrentCustomerEmail() {
  return String(state.user?.email || state.customer.email || "").trim().toLowerCase();
}

function getCurrentCustomerPhone() {
  return sanitizePhoneInput(state.user?.phoneNumber || state.customer.phone || "");
}

function getNewsletterSubscribers() {
  return Array.isArray(state.newsletter) ? state.newsletter : [];
}

function getContactInbox() {
  return Array.isArray(loadJson(KEYS.contactInbox, [])) ? loadJson(KEYS.contactInbox, []) : [];
}

function getStockAlerts(email = "") {
  const alerts = Array.isArray(state.stockAlerts) ? state.stockAlerts : [];
  if (!email) return alerts;
  const normalized = String(email || "").trim().toLowerCase();
  return alerts.filter((item) => String(item.email || "").trim().toLowerCase() === normalized);
}

function getSavedForLaterItemsDetailed() {
  return (Array.isArray(state.savedForLater) ? state.savedForLater : []).map((entry) => {
    const source = entry.type === "account" ? getAccountById(entry.id) : getProductById(entry.id);
    const merged = { ...(source || {}), ...entry };
    return {
      ...merged,
      cartKey: `${entry.id}::${entry.size || ""}::${entry.type || "product"}`
    };
  }).filter((entry) => entry.id);
}

function rememberRecentlyViewed(item, type = "product") {
  if (!item?.id) return;
  const next = [
    { id: item.id, type, viewedAt: new Date().toISOString() },
    ...state.recentViews.filter((entry) => !(entry.id === item.id && entry.type === type))
  ].slice(0, 14);
  state.recentViews = next;
  saveJson(KEYS.recentViews, state.recentViews);
}

function getRecentlyViewedItems(excludeId = "") {
  return state.recentViews
    .map((entry) => {
      const source = entry.type === "account" ? getAccountById(entry.id) : getProductById(entry.id);
      return source ? { ...source, type: entry.type || source.type || "product" } : null;
    })
    .filter(Boolean)
    .filter((item) => item.id !== excludeId);
}

function getPromoPicks(limit = 4) {
  return [...getVisibleProducts()]
    .sort((a, b) => {
      const aScore = (a.featured ? 5 : 0) + (getStock(a) > 0 && getStock(a) <= 3 ? 4 : 0) + getPopularityScore(a);
      const bScore = (b.featured ? 5 : 0) + (getStock(b) > 0 && getStock(b) <= 3 ? 4 : 0) + getPopularityScore(b);
      return bScore - aScore;
    })
    .slice(0, limit);
}

function getPersonalizedRecommendations(limit = 4, excludeIds = []) {
  const favoriteItems = state.favorites
    .map((id) => getProductById(id) || getAccountById(id))
    .filter(Boolean);
  const cartItems = getCartItemsDetailed();
  const recentItems = getRecentlyViewedItems();
  const interestCategories = [...favoriteItems, ...cartItems, ...recentItems]
    .map((item) => String(item.category || "").trim())
    .filter(Boolean);
  const interestBrands = [...favoriteItems, ...cartItems, ...recentItems]
    .map((item) => String(item.brand || "").trim())
    .filter(Boolean);
  const blocked = new Set(excludeIds.filter(Boolean));
  const pool = [...getVisibleProducts(), ...getVisibleAccounts()];

  const scored = pool
    .filter((item) => !blocked.has(item.id))
    .map((item) => {
      const categoryScore = interestCategories.includes(String(item.category || "").trim()) ? 5 : 0;
      const brandScore = interestBrands.includes(String(item.brand || "").trim()) ? 4 : 0;
      const favoriteScore = state.favorites.includes(item.id) ? -10 : 0;
      return {
        ...item,
        type: item.type || (getAccountById(item.id) ? "account" : "product"),
        score: categoryScore + brandScore + getPopularityScore(item) + favoriteScore
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

function getLoyaltyTier(points) {
  if (points >= 250) return { label: "Royal", nextTarget: 400, theme: "royal" };
  if (points >= 120) return { label: "Elite", nextTarget: 250, theme: "elite" };
  if (points >= 45) return { label: "Gold", nextTarget: 120, theme: "gold" };
  return { label: "Classic", nextTarget: 45, theme: "classic" };
}

function getLoyaltyPoints(orders = getCurrentCustomerOrders()) {
  return (Array.isArray(orders) ? orders : []).reduce((sum, order) => {
    const fallback = Math.round(Number(order.total || 0));
    return sum + Number(order.loyaltyEarned || fallback || 0);
  }, 0);
}

function getVipReferralCode() {
  const referralBase = String(getCurrentCustomerEmail() || getCurrentCustomerPhone() || "tayya").split("@")[0] || "tayya";
  return `TAYYA-${referralBase.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase() || "VIP"}`;
}

function getVipBenefits(tierLabel) {
  const map = {
    Classic: [
      "نقاط على كل طلب ومتابعة أوضح للطلبات",
      "وصول أسرع إلى العروض الموسمية",
      "حفظ العناوين والتفضيلات داخل الحساب"
    ],
    Gold: [
      "أولوية في العروض المحدودة وكود موسمي أقوى",
      "تنبيهات مبكرة للإطلاقات والهدايا",
      "مكافأة أعلى على الطلبات المتكررة"
    ],
    Elite: [
      "عروض خاصة للطلبات الأعلى قيمة",
      "اقتراحات شخصية ومسارات شراء أهدأ",
      "مراجعة أسرع للطلبات والتحويلات"
    ],
    Royal: [
      "أعلى أولوية في الإطلاقات والمختارات",
      "معاملة خاصة للهدايا والطلبات المميزة",
      "نادي عملاء فاخر جاهز للعروض الحصرية"
    ]
  };
  return map[tierLabel] || map.Classic;
}

function getVipMilestones() {
  return [
    { label: "Classic", target: 0, note: "بداية الرحلة مع مزايا الحساب الأساسية." },
    { label: "Gold", target: 45, note: "وصول أفضل للعروض الموسمية والمكافآت." },
    { label: "Elite", target: 120, note: "مزايا أقوى للعملاء المتكررين والطلبات الأعلى." },
    { label: "Royal", target: 250, note: "أعلى مستوى ولاء مع حضور أفخم داخل المتجر." }
  ];
}

function calculateLoyaltyReward(total, options = {}) {
  const amount = Math.max(0, Number(total || 0));
  let points = Math.max(1, Math.round(amount));
  if (options.giftWrap) points += 5;
  if (["paypal", "stripe"].includes(String(options.paymentMethod || ""))) points += 3;
  return points;
}

function getPaymentActionLabel(method) {
  const map = {
    cod: "الدفع عند الاستلام",
    paypal: "إكمال الدفع عبر PayPal",
    stripe: "إكمال الدفع عبر Stripe",
    bank: "تعليمات التحويل البنكي"
  };
  return map[method] || "متابعة الدفع";
}

function getInitialPaymentStatus(method, paymentLink = "") {
  if (method === "cod") return "الدفع عند الاستلام";
  if (method === "bank") return "بانتظار التحويل";
  return paymentLink ? "بانتظار السداد" : "بانتظار الربط";
}

function resolveOrderPaymentStatus(order) {
  return String(order?.paymentStatus || "").trim() || getInitialPaymentStatus(order?.paymentMethod, order?.paymentLink);
}

function getPaymentStatusOptions(method, currentStatus = "") {
  const map = {
    cod: ["الدفع عند الاستلام", "تم التحصيل", "ملغي"],
    paypal: ["بانتظار السداد", "تم السداد", "فشل الدفع"],
    stripe: ["بانتظار السداد", "تم السداد", "فشل الدفع"],
    bank: ["بانتظار التحويل", "تم التحقق", "مرفوض"]
  };
  return [...new Set([currentStatus, ...(map[method] || ["بانتظار المعالجة"])].filter(Boolean))];
}

function getCustomerInsights(limit = 6) {
  const grouped = Object.values(
    state.orders.reduce((acc, order) => {
      const key = String(order.userEmail || order.custEmail || order.userPhone || order.custPhone || order.id);
      if (!acc[key]) {
        acc[key] = {
          key,
          name: order.custName || "عميل",
          email: order.custEmail || order.userEmail || "",
          phone: order.custPhone || order.userPhone || "",
          orders: [],
          spend: 0,
          pendingPayments: 0,
          lastOrderAt: ""
        };
      }
      acc[key].orders.push(order);
      acc[key].spend += Number(order.total || 0);
      if (resolveOrderPaymentStatus(order).includes("بانتظار")) acc[key].pendingPayments += 1;
      if (!acc[key].lastOrderAt || String(order.createdAt || "") > String(acc[key].lastOrderAt)) {
        acc[key].lastOrderAt = order.createdAt || "";
      }
      return acc;
    }, {})
  ).map((entry) => {
    const loyaltyPoints = getLoyaltyPoints(entry.orders);
    return {
      ...entry,
      loyaltyPoints,
      tier: getLoyaltyTier(loyaltyPoints)
    };
  });

  return grouped
    .sort((a, b) => b.spend - a.spend || b.orders.length - a.orders.length)
    .slice(0, limit);
}

function renderCustomerInsightCards(insights = []) {
  if (!insights.length) {
    return '<div class="empty-state"><strong>لا توجد بيانات عملاء كافية بعد</strong></div>';
  }
  return `
    <div class="admin-customer-grid">
      ${insights.map((item) => `
        <article class="customer-insight-card">
          <div class="order-card__head">
            <div>
              <strong>${escapeHtml(item.name || "عميل")}</strong>
              <p class="mini-note">${escapeHtml(item.email || item.phone || "بدون بيانات تواصل")}</p>
            </div>
            <span class="tag">${escapeHtml(item.tier.label)}</span>
          </div>
          <div class="metric-table" style="margin-top:14px;">
            <div class="metric-table__row"><span>عدد الطلبات</span><strong>${item.orders.length}</strong></div>
            <div class="metric-table__row"><span>إجمالي الإنفاق</span><strong>${formatPrice(item.spend)}</strong></div>
            <div class="metric-table__row"><span>نقاط الولاء</span><strong>${item.loyaltyPoints}</strong></div>
            <div class="metric-table__row"><span>دفعات معلقة</span><strong>${item.pendingPayments}</strong></div>
          </div>
          <p class="mini-note" style="margin-top:12px;">آخر طلب: ${escapeHtml(formatDate(item.lastOrderAt || new Date().toISOString()))}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderVipClubPage() {
  if (!state.user) {
    return `
      <section class="section-card">
        <div class="empty-state">
          <strong>يلزم تسجيل الدخول أولًا</strong>
          <p>صفحة VIP تعرض النقاط والمكافآت والإحالات والامتيازات الخاصة، لذلك تحتاج حسابًا نشطًا.</p>
          <div class="actions-row">
            <a class="primary-button" href="login.html">تسجيل الدخول</a>
            <a class="ghost-button" href="register.html">إنشاء حساب</a>
          </div>
        </div>
      </section>
    `;
  }

  const orders = getCurrentCustomerOrders();
  const loyaltyPoints = getLoyaltyPoints(orders);
  const tier = getLoyaltyTier(loyaltyPoints);
  const pointsToNext = Math.max(0, Number(tier.nextTarget || 0) - loyaltyPoints);
  const benefits = getVipBenefits(tier.label);
  const milestones = getVipMilestones();
  const referralCode = getVipReferralCode();
  const vipCoupons = state.coupons.filter((coupon) => /vip|elite|royal/i.test(String(coupon.code || "") + " " + String(coupon.label || ""))).slice(0, 3);
  const personalized = getPersonalizedRecommendations(4);
  const giftedOrders = orders.filter((order) => order.giftWrap).length;
  const rewardEstimate = getCartCount() ? calculateLoyaltyReward(getCartPricing().total, { paymentMethod: state.checkoutPayment, giftWrap: false }) : 0;

  return `
    <section class="vip-salon">
      <article class="loyalty-card loyalty-card--${escapeHtml(tier.theme)} vip-salon__hero">
        <div class="section-head">
          <div>
            <span class="category-kicker">VIP club</span>
            <h2>نادي الولاء الخاص بك</h2>
            <p class="mini-note">واجهة مستقلة تعطي برنامج الولاء حضورًا حقيقيًا داخل المتجر، مع نقاط، مزايا، إحالات، ومكافآت أوضح.</p>
          </div>
          <span class="tag">${escapeHtml(tier.label)}</span>
        </div>
        <div class="stats-grid">
          <article class="stat-card"><strong>${loyaltyPoints}</strong><p class="mini-note">إجمالي النقاط</p></article>
          <article class="stat-card"><strong>${orders.length}</strong><p class="mini-note">طلبات مرتبطة بالحساب</p></article>
          <article class="stat-card"><strong>${giftedOrders}</strong><p class="mini-note">طلبات هدايا</p></article>
          <article class="stat-card"><strong>${rewardEstimate}</strong><p class="mini-note">نقاط متوقعة للطلب القادم</p></article>
        </div>
        <div class="loyalty-progress" style="margin-top:18px;">
          <div class="loyalty-progress__bar"><span style="width:${Math.max(10, Math.min(100, (loyaltyPoints / Math.max(tier.nextTarget || 1, 1)) * 100))}%"></span></div>
          <div class="metric-line"><span>حتى المستوى التالي</span><strong>${pointsToNext ? `${pointsToNext} نقطة` : "أنت في أعلى مستوى متاح"}</strong></div>
        </div>
        <div class="actions-row" style="margin-top:18px;">
          <button class="ghost-button" type="button" data-copy-url="${escapeHtml(referralCode)}">انسخ رمز الإحالة</button>
          <a class="ghost-button" href="account.html">العودة إلى الحساب</a>
        </div>
      </article>

      <article class="summary-card vip-salon__referral">
        <h3>الإحالة والمكافآت</h3>
        <p class="faq-answer">رمزك الحالي هو <strong>${escapeHtml(referralCode)}</strong>. جهزت هذه المساحة لبرامج الإحالة والعروض الخاصة حتى تكون جاهزة للتوسعة لاحقًا.</p>
        <div class="chip-row">
          <span class="stat-chip">Referral ready</span>
          <span class="stat-chip">VIP campaign ready</span>
        </div>
      </article>
    </section>

    <section class="vip-benefits-grid">
      ${benefits.map((benefit) => `
        <article class="section-card section-card--soft">
          <span class="category-kicker">Privilege</span>
          <h3>${escapeHtml(benefit)}</h3>
        </article>
      `).join("")}
    </section>

    <section class="content-grid content-grid--sidebar">
      <div class="section-stack">
        <section class="section-card">
          <div class="section-head">
            <div>
              <h2>رحلة المستويات</h2>
              <p>هذا المسار يجعل الولاء مفهومًا للعميل ويحوّل النقاط إلى تقدم بصري واضح.</p>
            </div>
          </div>
          <div class="vip-milestone-list">
            ${milestones.map((item) => `
              <article class="vip-milestone ${item.label === tier.label ? "is-current" : ""}">
                <div>
                  <strong>${escapeHtml(item.label)}</strong>
                  <p class="mini-note">${escapeHtml(item.note)}</p>
                </div>
                <span class="tag">${item.target}+</span>
              </article>
            `).join("")}
          </div>
        </section>

        ${personalized.length ? `
          <section class="section-card">
            <div class="section-head">
              <div>
                <h2>اختيارات تلائم مستواك</h2>
                <p>اقتراحات مرتبطة بسلوك التصفح والشراء حتى يبدو نادي VIP حيًا ومفيدًا.</p>
              </div>
            </div>
            ${renderCatalogGrid(personalized)}
          </section>
        ` : ""}
      </div>

      <aside class="section-stack">
        <article class="summary-card">
          <h3>عروض مناسبة للمستوى الحالي</h3>
          ${vipCoupons.length ? `
            <div class="section-stack" style="margin-top:14px;">
              ${vipCoupons.map((coupon) => `
                <article class="order-card">
                  <div class="order-card__head">
                    <strong>${escapeHtml(coupon.code)}</strong>
                    <span class="tag">${escapeHtml(String(coupon.percent || 0))}%</span>
                  </div>
                  <p class="mini-note">${escapeHtml(coupon.label || "عرض خاص")} • حد أدنى ${formatPrice(coupon.minimum || 0)}</p>
                </article>
              `).join("")}
            </div>
          ` : '<p class="faq-answer">لا توجد عروض VIP ظاهرة الآن، لكن الصفحة أصبحت جاهزة تمامًا لاستقبالها.</p>'}
        </article>

        <article class="summary-card">
          <h3>نشاط آخر الطلبات</h3>
          ${orders.length ? `
            <div class="metric-table" style="margin-top:14px;">
              ${orders.slice(0, 4).map((order) => `
                <div class="metric-table__row"><span>${escapeHtml(order.orderNumber || order.id)}</span><strong>${order.loyaltyEarned || Math.round(Number(order.total || 0))} نقطة</strong></div>
              `).join("")}
            </div>
          ` : '<p class="faq-answer">بعد أول طلب ستظهر هنا مكافآت كل عملية شراء.</p>'}
        </article>
      </aside>
    </section>
  `;
}

function getBrandOptions(items) {
  return [...new Set(items.map((item) => String(item.brand || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function getCategoryStartingPrice(category) {
  const prices = getVisibleProducts()
    .filter((item) => String(item.category || "") === String(category || ""))
    .map((item) => Number(item.price || 0))
    .filter((value) => value > 0)
    .sort((a, b) => a - b);
  return prices[0] || 0;
}

function getSizes(item) {
  const entries = Object.entries(item.stockSizes || {}).filter(([, value]) => Number(value || 0) > 0);
  return entries.length ? entries.map(([key]) => String(key)) : parseMultiline(item.sizes || "");
}

function getSizeValue(item) {
  return getSizes(item)[0] || "";
}

function getStock(item, size) {
  if (!item) return 0;
  if (!item.stockSizes) return Number(item.stock || 1);
  if (size) return Number(item.stockSizes[size] || 0);
  return Object.values(item.stockSizes).reduce((sum, value) => sum + Number(value || 0), 0);
}

function getGallery(item) {
  const gallery = Array.isArray(item.gallery) ? item.gallery : parseMultiline(item.gallery || "");
  const fallback = [item.imgUrl, item.image, item.image2, item.image3].filter(Boolean);
  return [...new Set([...fallback, ...gallery].filter(Boolean))];
}

function getItemReviews(itemId) {
  return Array.isArray(state.reviews[itemId]) ? state.reviews[itemId] : [];
}

function getProductQuestions(itemId) {
  return Array.isArray(state.productQuestions[itemId]) ? state.productQuestions[itemId] : [];
}

function getCoupons() {
  const saved = loadJson(KEYS.coupons, DEFAULT_COUPONS);
  return Array.isArray(saved) && saved.length ? saved : DEFAULT_COUPONS;
}

function getPaymentMeta(method) {
  const map = {
    cod: { label: "الدفع عند الاستلام" },
    paypal: { label: "PayPal" },
    stripe: { label: "Stripe / Apple Pay" },
    bank: { label: "تحويل بنكي" }
  };
  return map[method] || map.cod;
}

function renderPaymentHint(method) {
  if (method === "paypal") return state.paymentSettings.paypalLink ? "سيتم فتح رابط PayPal الرسمي بعد إنشاء الطلب مع حفظ حالة الدفع داخل المتابعة." : "اختر PayPal فقط بعد ضبط الرابط من لوحة الأدمن حتى يصبح المسار جاهزًا للإنتاج.";
  if (method === "stripe") return state.paymentSettings.stripeLink ? "سيتم فتح رابط Stripe أو Apple Pay بعد إنشاء الطلب مع حفظ حالة الدفع والمتابعة." : "أضف رابط Stripe من لوحة الأدمن لتفعيل مسار الدفع الإلكتروني الكامل.";
  if (method === "bank") return `التحويل على ${state.paymentSettings.bankName || "البنك"} - ${state.paymentSettings.bankIban || "أضف رقم IBAN من لوحة الأدمن"}.${state.paymentSettings.bankNote ? ` ${state.paymentSettings.bankNote}` : ""}`;
  return "الدفع عند الاستلام متاح حسب السوق وخيارات الشحن.";
}

function resolvePaymentLink(method, order) {
  if (method === "paypal") return interpolatePaymentLink(state.paymentSettings.paypalLink, order);
  if (method === "stripe") return interpolatePaymentLink(state.paymentSettings.stripeLink, order);
  return "";
}

function interpolatePaymentLink(link, order) {
  return String(link || "")
    .replaceAll("{order}", encodeURIComponent(order.orderNumber || order.id || ""))
    .replaceAll("{amount}", encodeURIComponent(String(order.total || 0)))
    .replaceAll("{email}", encodeURIComponent(order.custEmail || ""))
    .replaceAll("{phone}", encodeURIComponent(order.custPhone || ""))
    .replaceAll("{name}", encodeURIComponent(order.custName || ""));
}

function createOrderNumber() {
  return `TAY-${Date.now().toString().slice(-6)}`;
}

function getFilteredOrders() {
  const query = String(state.orderSearch || "").trim().toLowerCase();
  if (!query) return state.orders;
  return state.orders.filter((order) => {
    return [order.orderNumber, order.custName, order.custPhone, order.custEmail, order.status]
      .some((value) => String(value || "").toLowerCase().includes(query));
  });
}

function getDashboardMetrics() {
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const totalRevenue = state.orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const todayRevenue = state.orders
    .filter((order) => String(order.createdAt || "").slice(0, 10) === todayKey)
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  const monthRevenue = state.orders
    .filter((order) => String(order.createdAt || "").startsWith(monthKey))
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  const totalCustomers = new Set(state.orders.map((order) => String(order.custEmail || order.custPhone || order.id))).size;
  const repeatCustomers = Object.values(
    state.orders.reduce((acc, order) => {
      const key = String(order.custEmail || order.custPhone || order.id);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).filter((count) => count > 1).length;

  const topProducts = topEntries(
    state.orders.flatMap((order) => order.items || []),
    (item) => item.name || item.id,
    (item) => Number(item.quantity || 0)
  );
  const topCategories = topEntries(
    state.orders.flatMap((order) => (order.items || []).map((item) => ({ label: getProductById(item.id)?.category || getAccountById(item.id)?.category || "عام", value: Number(item.price || 0) * Number(item.quantity || 1) }))),
    (item) => item.label,
    (item) => item.value
  );
  const paymentMethods = topEntries(state.orders, (order) => order.paymentMethodLabel || order.paymentMethod || "غير محدد", () => 1);
  const paymentStatusBreakdown = topEntries(state.orders, (order) => resolveOrderPaymentStatus(order), () => 1);
  const statusBreakdown = topEntries(state.orders, (order) => order.status || "قيد المعالجة", () => 1);
  const marketBreakdown = topEntries(state.orders, (order) => order.marketLabel || order.marketKey || "عام", () => 1);
  const topBrands = topEntries(
    state.orders.flatMap((order) => (order.items || []).map((item) => ({
      label: getProductById(item.id)?.brand || getAccountById(item.id)?.brand || "غير محدد",
      value: Number(item.quantity || 0)
    }))),
    (item) => item.label,
    (item) => item.value
  );
  const productQuestionCount = Object.values(state.productQuestions || {}).reduce((sum, entries) => {
    return sum + (Array.isArray(entries) ? entries.length : 0);
  }, 0);
  const savedForLaterCount = getSavedForLaterItemsDetailed().length;
  const giftOrders = state.orders.filter((order) => order.giftWrap).length;
  const favoriteCount = Array.isArray(state.favorites) ? state.favorites.length : 0;
  const activeCoupons = state.coupons.length;
  const offerSubscribers = getNewsletterSubscribers().filter((entry) => entry.wantsOffers).length;
  const pendingOrders = state.orders.filter((order) => String(order.status || "").includes("قيد")).length;
  const pendingPayments = state.orders.filter((order) => resolveOrderPaymentStatus(order).includes("بانتظار")).length;
  const settledPayments = state.orders.filter((order) => /تم السداد|تم التحصيل|تم التحقق/.test(resolveOrderPaymentStatus(order))).length;
  const vipCustomers = getCustomerInsights(50).filter((entry) => ["Elite", "Royal"].includes(entry.tier.label)).length;
  const shippedOrders = state.orders.filter((order) => String(order.status || "").includes("شحن")).length;
  const deliveredOrders = state.orders.filter((order) => {
    const status = String(order.status || "");
    return status.includes("توصيل") || status.includes("مكتمل");
  }).length;
  const freeShippingOrders = state.orders.filter((order) => Number(order.delivery || 0) === 0).length;
  const discountedOrders = state.orders.filter((order) => Number(order.discount || 0) > 0 || Number(order.bulkDiscount || 0) > 0).length;

  return {
    totalOrders: state.orders.length,
    totalRevenue,
    todayRevenue,
    monthRevenue,
    averageOrder: state.orders.length ? totalRevenue / state.orders.length : 0,
    totalCustomers,
    repeatCustomers,
    lowStock: state.products.filter((item) => getStock(item) > 0 && getStock(item) <= 3).length,
    topProducts,
    topCategories,
    paymentMethods,
    paymentStatusBreakdown,
    statusBreakdown,
    marketBreakdown,
    topBrands,
    subscribers: getNewsletterSubscribers().length,
    stockAlertRequests: getStockAlerts().length,
    inboxCount: getContactInbox().length,
    productQuestionCount,
    savedForLaterCount,
    giftOrders,
    favoriteCount,
    activeCoupons,
    offerSubscribers,
    pendingOrders,
    pendingPayments,
    settledPayments,
    vipCustomers,
    shippedOrders,
    deliveredOrders,
    freeShippingOrders,
    discountedOrders
  };
}

function exportData(kind) {
  if (kind === "products") {
    const rows = [["ID", "Name", "Category", "Price", "Brand", "Stock"]].concat(
      state.products.map((item) => [item.id, item.name, item.category, item.price, item.brand, getStock(item)])
    );
    downloadCsv("products.csv", rows);
    return;
  }
  if (kind === "customers") {
    const rows = [["Email", "Name", "Phone", "Orders", "Revenue", "Loyalty Points", "Tier", "Pending Payments"]].concat(
      getCustomerInsights(200).map((entry) => [
        entry.email || "",
        entry.name || "",
        entry.phone || "",
        entry.orders.length,
        entry.spend,
        entry.loyaltyPoints,
        entry.tier.label,
        entry.pendingPayments
      ])
    );
    downloadCsv("customers.csv", rows);
    return;
  }
  if (kind === "newsletter") {
    const rows = [["Email", "News", "Offers", "Created At"]].concat(
      getNewsletterSubscribers().map((entry) => [entry.email, entry.wantsNews ? "Yes" : "No", entry.wantsOffers ? "Yes" : "No", entry.createdAt || ""])
    );
    downloadCsv("newsletter.csv", rows);
    return;
  }
  if (kind === "questions") {
    const rows = [["Product ID", "Customer", "Question", "Created At"]].concat(
      Object.entries(state.productQuestions || {}).flatMap(([productId, entries]) =>
        (Array.isArray(entries) ? entries : []).map((entry) => [
          productId,
          entry.name || "Visitor",
          entry.question || entry.text || "",
          entry.createdAt || ""
        ])
      )
    );
    downloadCsv("product-questions.csv", rows);
    return;
  }
  if (kind === "saved") {
    const rows = [["Item ID", "Type", "Size", "Created At"]].concat(
      (Array.isArray(state.savedForLater) ? state.savedForLater : []).map((entry) => [
        entry.id || "",
        entry.type || "product",
        entry.size || "",
        entry.createdAt || ""
      ])
    );
    downloadCsv("saved-for-later.csv", rows);
    return;
  }
  if (kind === "alerts") {
    const rows = [["Product ID", "Email", "Created At"]].concat(
      getStockAlerts().map((entry) => [entry.productId || "", entry.email || "", entry.createdAt || ""])
    );
    downloadCsv("stock-alerts.csv", rows);
    return;
  }
  const rows = [["Order", "Customer", "Email", "Phone", "Status", "Payment", "Payment Status", "Loyalty", "Total", "Date"]].concat(
    state.orders.map((order) => [order.orderNumber, order.custName, order.custEmail, order.custPhone, order.status, order.paymentMethodLabel || order.paymentMethod, resolveOrderPaymentStatus(order), order.loyaltyEarned || 0, order.total, order.createdAt])
  );
  downloadCsv("orders.csv", rows);
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadInvoice(orderId) {
  const order = state.orders.find((entry) => String(entry.id) === String(orderId));
  if (!order) {
    notify("تعذر العثور على الطلب لإنشاء الفاتورة", "error");
    return;
  }
  const paymentStatus = resolveOrderPaymentStatus(order);
  const rows = [
    `<h1>فاتورة ${escapeHtml(order.orderNumber || order.id || "طلب")}</h1>`,
    `<p>العميل: ${escapeHtml(order.custName || "عميل")}</p>`,
    `<p>التاريخ: ${escapeHtml(formatDate(order.createdAt || order.date || new Date().toISOString()))}</p>`,
    `<p>الدفع: ${escapeHtml(order.paymentMethodLabel || order.paymentMethod || "--")}</p>`,
    `<p>حالة الدفع: ${escapeHtml(paymentStatus || "--")}</p>`,
    `<p>الشحن: ${escapeHtml(order.deliveryType || "--")}</p>`,
    `${order.loyaltyEarned ? `<p>نقاط الولاء: +${escapeHtml(String(order.loyaltyEarned))}</p>` : ""}`,
    `<p>الإجمالي: ${escapeHtml(formatPrice(order.total || 0))}</p>`,
    `<hr>`,
    `<ul>${(order.items || []).map((item) => `<li>${escapeHtml(item.name || item.id || "عنصر")} - ${escapeHtml(String(item.quantity || 1))} x ${escapeHtml(formatPrice(item.price || 0))}</li>`).join("")}</ul>`
  ].join("");
  const html = `
    <!doctype html>
    <html lang="${escapeHtml(state.language)}" dir="${escapeHtml(LANGUAGE_OPTIONS[state.language]?.dir || "rtl")}">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(order.orderNumber || order.id || "Invoice")}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #24181b; }
          h1 { margin: 0 0 16px; }
          p, li { line-height: 1.8; }
        </style>
      </head>
      <body>${rows}</body>
    </html>
  `;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${order.orderNumber || order.id || "invoice"}.html`;
  link.click();
  URL.revokeObjectURL(url);
  notify("تم تنزيل الفاتورة");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function collectGallery(item) {
  return getGallery(item).join("\n");
}

async function uploadFiles(files) {
  if (!IMGBB_API_KEY) {
    notify("Image upload is disabled until a private upload endpoint is configured.", "error");
    return [];
  }

  const results = [];
  for (const file of files) {
    const compressed = await compressImageFile(file);
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
      reader.onerror = reject;
      reader.readAsDataURL(compressed);
    });
    const body = new FormData();
    body.append("key", IMGBB_API_KEY);
    body.append("image", data);
    const response = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body });
    const json = await response.json();
    if (json?.data?.url) {
      results.push({ url: json.data.url, deleteUrl: json.data.delete_url || "", createdAt: new Date().toISOString() });
    }
  }
  return results;
}

function compressImageFile(file) {
  return new Promise((resolve) => {
    const image = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      image.onload = () => {
        const ratio = Math.min(1, 1600 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(blob ? new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" }) : file), "image/webp", 0.82);
      };
      image.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  });
}

function normalizeProduct(item) {
  return {
    id: item.id || "",
    name: item.name || "منتج بدون اسم",
    price: Number(item.price || 0),
    category: item.category || "",
    brand: item.brand || "",
    color: item.color || "",
    material: item.material || "",
    collection: item.collection || "",
    imgUrl: item.imgUrl || item.image || "",
    gallery: Array.isArray(item.gallery) ? item.gallery : parseMultiline(item.gallery || item.images || ""),
    desc: item.desc || item.description || "",
    stockSizes: item.stockSizes || item.sizes || {},
    featured: Boolean(item.featured),
    hidden: Boolean(item.hidden),
    soldCount: Number(item.soldCount || 0),
    rating: Number(item.rating || 0),
    tags: Array.isArray(item.tags) ? item.tags : parseMultiline(item.tags || ""),
    createdAt: item.createdAt || new Date().toISOString(),
    type: "product"
  };
}

function normalizeAccount(item) {
  return {
    id: item.id || "",
    name: item.name || "حساب بدون اسم",
    price: Number(item.price || 0),
    category: item.category || "",
    brand: item.brand || "",
    accountType: item.accountType || item.type || "",
    imgUrl: item.imgUrl || item.image || "",
    gallery: Array.isArray(item.gallery) ? item.gallery : parseMultiline(item.gallery || item.images || ""),
    desc: item.desc || item.description || "",
    featured: Boolean(item.featured),
    hidden: Boolean(item.hidden),
    offer: Boolean(item.offer),
    createdAt: item.createdAt || new Date().toISOString(),
    type: "account"
  };
}

function renderSupportWidget() {
  return `
    <aside class="support-widget ${state.supportWidgetOpen ? "is-open" : ""}">
      <button class="support-widget__toggle" type="button" data-action="toggle-support" aria-expanded="${state.supportWidgetOpen ? "true" : "false"}" aria-label="مركز الخدمة السريع">
        <i class="fas fa-headset"></i>
        <span>${escapeHtml(t("support", "الخدمة"))}</span>
      </button>
      <div class="support-widget__panel">
        <strong>مركز الخدمة السريع</strong>
        <p>أيقونة صغيرة وحديثة تفتح لك أهم الخدمات مباشرة: التتبع، التواصل، الواتساب، التعريف بالمتجر، والمساعد الذكي.</p>
        <div class="support-widget__links">
          <a href="track-order.html"><i class="fas fa-truck-fast"></i><span>تتبع الطلب</span></a>
          <a href="contact.html"><i class="fas fa-headset"></i><span>تواصل</span></a>
          <a href="faq.html"><i class="fas fa-circle-question"></i><span>الأسئلة</span></a>
          <a href="https://api.whatsapp.com/send?phone=96876787356" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i><span>واتساب</span></a>
          <button type="button" data-action="open-intro"><i class="fas fa-store"></i><span>عن المتجر</span></button>
          <button type="button" data-action="toggle-language"><i class="fas fa-language"></i><span>${escapeHtml(LANGUAGE_OPTIONS[state.language]?.label || "العربية")}</span></button>
          <button type="button" data-action="toggle-currency"><i class="fas fa-coins"></i><span>${escapeHtml(state.currency)}</span></button>
          ${state.installPrompt ? `<button type="button" data-action="install-app"><i class="fas fa-download"></i><span>${escapeHtml(t("install", "ثبت التطبيق"))}</span></button>` : ""}
          <button type="button" data-action="toggle-ai"><i class="fas fa-sparkles"></i><span>المساعد الذكي</span></button>
        </div>
      </div>
    </aside>
  `;
}

function renderStoreIntroOverlay() {
  if (!state.introOpen) return "";
  return `
    <div class="store-intro">
      <button class="store-intro__backdrop" type="button" data-action="dismiss-intro" aria-label="إغلاق الافتتاحية"></button>
      <section class="store-intro__panel" aria-label="افتتاحية المتجر">
        <span class="category-kicker">House of TAYYA</span>
        <h2>طَيّة متجر عماني حديث ينسج الفخامة، التنوع، والهدايا المختارة داخل تجربة شراء أهدأ وأوضح.</h2>
        <p>استكشف الكميم، المصار، العصي، الأحذية، العطور، والمختارات المميزة داخل متجر متعدد الصفحات، بهوية بصرية أحدث، تفاصيل أدق، ومسار شراء يجعل القرار أسرع والثقة أعلى.</p>
        <div class="chip-row">
          <span class="stat-chip">متجر متعدد الصفحات</span>
          <span class="stat-chip">شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD} ر.ع</span>
          <span class="stat-chip">دفع متعدد</span>
          <span class="stat-chip">مساعد ذكي</span>
        </div>
        <div class="store-intro__grid">
          <article>
            <strong>هوية أوضح</strong>
            <p>واجهة افتتاحية أرقى، أقسام مستقلة، وصفحات منتج أهدأ بصريًا وأكثر إقناعًا.</p>
          </article>
          <article>
            <strong>الخدمة</strong>
            <p>واتساب، تتبع طلب، أسئلة شائعة، ومركز خدمة صغير وسريع يرافق العميل في كل صفحة.</p>
          </article>
          <article>
            <strong>البيع</strong>
            <p>عروض، كوبونات، تغليف هدايا، حفظ لاحقًا، مراجعات، وأسئلة تساعد على رفع التحويل.</p>
          </article>
        </div>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-action="dismiss-intro">ابدأ التصفح</button>
          <a class="ghost-button" href="about.html">تعرف علينا أكثر</a>
        </div>
      </section>
    </div>
  `;
}

function renderAiConcierge() {
  if (!state.aiAssistantOpen) return "";
  ensureAiAssistantState();
  const quickPrompts = [
    "اقترح لي أفضل المنتجات الآن",
    "كم باقي للشحن المجاني؟",
    "أريد هدية فاخرة",
    "ما أفضل العطور؟"
  ];
  return `
    <aside class="ai-concierge">
      <div class="ai-concierge__head">
        <div>
          <strong>المساعد الذكي</strong>
          <p>يرشدك داخل المتجر ويقترح عليك حسب السلة والصفحة الحالية.</p>
        </div>
        <button class="icon-button" type="button" data-action="close-ai" aria-label="إغلاق المساعد"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="ai-concierge__messages">
        ${state.aiMessages.map((entry) => `
          <article class="ai-message ai-message--${escapeHtml(entry.role || "assistant")}">
            <p>${escapeHtml(entry.text || "").replaceAll("\n", "<br>")}</p>
            ${Array.isArray(entry.links) && entry.links.length ? `
              <div class="chip-row">
                ${entry.links.map((link) => `<a class="ghost-button" href="${escapeHtml(link.href || "#")}">${escapeHtml(link.label || "افتح")}</a>`).join("")}
              </div>
            ` : ""}
          </article>
        `).join("")}
      </div>
      <div class="chip-row">
        ${quickPrompts.map((prompt) => `<button class="small-button" type="button" data-action="ask-ai" data-prompt="${escapeHtml(prompt)}">${escapeHtml(prompt)}</button>`).join("")}
      </div>
      <form class="ai-concierge__form" id="store-ai-form">
        <input class="control" name="question" placeholder="اسأل عن منتج، شحن، دفع، أو اطلب ترشيحًا ذكيًا" required>
        <button class="primary-button" type="submit">إرسال</button>
      </form>
    </aside>
  `;
}

function submitStoreAi(form) {
  const formData = new FormData(form);
  const question = String(formData.get("question") || "").trim();
  if (!question) {
    notify("اكتب سؤالك أولًا", "error");
    return;
  }
  submitStoreAiPrompt(question);
  renderShell();
  void renderPage();
}

function submitStoreAiPrompt(question) {
  ensureAiAssistantState();
  state.aiAssistantOpen = true;
  state.aiMessages = [
    ...state.aiMessages.slice(-9),
    { role: "user", text: question, links: [] }
  ];
  const answer = generateStoreAiReply(question);
  state.aiMessages.push(answer);
  saveJson(KEYS.aiMessages, state.aiMessages.slice(-10));
}

function generateStoreAiReply(question) {
  const query = String(question || "").trim().toLowerCase();
  const visibleProducts = getVisibleProducts();
  const topProducts = [...visibleProducts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a)).slice(0, 3);
  const pricing = getCartPricing();
  const currentItem = getCurrentContextItem();
  const categoryMap = [
    { pattern: /كميم|kummah/, category: "الكميم", href: "kummah.html" },
    { pattern: /مصار|massar/, category: "المصار", href: "massar.html" },
    { pattern: /عصي|عصا|sticks?/, category: "العصي", href: "sticks.html" },
    { pattern: /أحذية|احذية|shoes?/, category: "الأحذية", href: "shoes.html" },
    { pattern: /عطور|عطر|perfumes?/, category: "العطور", href: "perfumes.html" },
    { pattern: /حساب|accounts?/, category: "الحسابات", href: "accounts.html", type: "account" }
  ];

  if (/شحن|توصيل|delivery/.test(query)) {
    return {
      role: "assistant",
      text: pricing.subtotal >= FREE_SHIPPING_THRESHOLD
        ? `سلتك الحالية مؤهلة للشحن المجاني لأن الإجمالي وصل إلى ${formatPrice(pricing.subtotal)}.`
        : `حتى الآن إجمالي السلة ${formatPrice(pricing.subtotal)}، وتحتاج ${formatPrice(Math.max(0, FREE_SHIPPING_THRESHOLD - pricing.subtotal))} للوصول إلى الشحن المجاني.`,
      links: [{ href: "cart.html", label: "راجع السلة" }, { href: "checkout.html", label: "الدفع" }]
    };
  }

  if (/دفع|paypal|stripe|apple|google pay|بطاقة/.test(query)) {
    return {
      role: "assistant",
      text: "المتجر يدعم PayPal وStripe والتحويل البنكي والدفع عند الاستلام، ويمكنك اختيار الطريقة الأنسب لك داخل صفحة الدفع.",
      links: [{ href: "checkout.html", label: "افتح الدفع" }]
    };
  }

  if (/هدية|إهداء|gift/.test(query)) {
    return {
      role: "assistant",
      text: "أضفت لك خيار تغليف هدية ورسالة إهداء داخل صفحة الدفع، وهو مناسب جدًا للطلبات الخاصة والهدايا الفاخرة.",
      links: [{ href: "checkout.html", label: "اطلب كهدية" }]
    };
  }

  if (/خصم|كوبون|عرض/.test(query)) {
    const topCoupons = state.coupons.slice(0, 3).map((item) => `${item.code} (${item.percent || 0}%)`).join("، ");
    return {
      role: "assistant",
      text: topCoupons ? `أبرز الأكواد المتاحة الآن: ${topCoupons}. تقدر تستخدمها داخل السلة أو صفحة الدفع.` : "لا توجد أكواد ظاهرة الآن، لكن العروض الموسمية ما زالت مدعومة داخل المتجر.",
      links: [{ href: "cart.html", label: "تطبيق كوبون" }]
    };
  }

  const matchedCategory = categoryMap.find((entry) => entry.pattern.test(query));
  if (matchedCategory) {
    const items = (matchedCategory.type === "account" ? getVisibleAccounts() : visibleProducts)
      .filter((item) => item.category === matchedCategory.category)
      .slice(0, 2);
    return {
      role: "assistant",
      text: items.length
        ? `رشحت لك من قسم ${matchedCategory.category}: ${items.map((item) => item.name).join("، ")}.`
        : `يمكنك فتح قسم ${matchedCategory.category} مباشرة للتصفح.`,
      links: [{ href: matchedCategory.href, label: matchedCategory.category }].concat(
        items[0] ? [{ href: `product.html?id=${encodeURIComponent(items[0].id)}${items[0].type === "account" ? "&type=account" : ""}`, label: "أفضل ترشيح" }] : []
      )
    };
  }

  if (/أفضل|اقترح|رشح|اختيار|suggest|recommend/.test(query)) {
    if (currentItem) {
      const related = visibleProducts.filter((item) => item.category === currentItem.category && item.id !== currentItem.id).slice(0, 2);
      return {
        role: "assistant",
        text: related.length
          ? `بناءً على العنصر الحالي ${currentItem.name}، أقترح أيضًا: ${related.map((item) => item.name).join("، ")}.`
          : `العنصر الحالي ${currentItem.name} اختيار قوي، وأقدر أوجهك الآن إلى السلة أو منتجات مشابهة.`,
        links: [{ href: "cart.html", label: "السلة" }].concat(
          related[0] ? [{ href: `product.html?id=${encodeURIComponent(related[0].id)}`, label: "منتج مشابه" }] : []
        )
      };
    }
    return {
      role: "assistant",
      text: topProducts.length
        ? `أفضل الترشيحات الآن داخل المتجر: ${topProducts.map((item) => item.name).join("، ")}.`
        : "يمكنني ترشيح منتج أفضل إذا ذكرت لي القسم أو الميزانية أو نوع الهدية.",
      links: topProducts.slice(0, 2).map((item) => ({ href: `product.html?id=${encodeURIComponent(item.id)}`, label: item.name }))
    };
  }

  if (/تواصل|خدمة|واتساب|support/.test(query)) {
    return {
      role: "assistant",
      text: "يمكنك الوصول فورًا إلى التتبع والتواصل والواتساب من أيقونة الخدمة السريعة أسفل الصفحة.",
      links: [
        { href: "contact.html", label: "التواصل" },
        { href: "track-order.html", label: "تتبع الطلب" }
      ]
    };
  }

  if (/مقاس|size/.test(query) && currentItem?.stockSizes) {
    const options = Object.entries(currentItem.stockSizes).filter(([, stock]) => Number(stock) > 0).map(([size]) => size);
    return {
      role: "assistant",
      text: options.length ? `المقاسات أو الخيارات المتوفرة حاليًا في ${currentItem.name}: ${options.join("، ")}.` : `العنصر ${currentItem.name} يبدو غير متوفر بالمقاسات الآن.`,
      links: [{ href: window.location.pathname + window.location.search, label: "المنتج الحالي" }]
    };
  }

  return {
    role: "assistant",
    text: "أقدر أساعدك في اختيار منتج، توضيح الشحن والدفع، أو ترشيح هدية مناسبة. جرّب أن تسألني عن قسم معين أو ميزانية أو نوع الهدية.",
    links: [
      { href: "kummah.html", label: "الكميم" },
      { href: "perfumes.html", label: "العطور" }
    ]
  };
}

function getCurrentContextItem() {
  if (route !== "product") return null;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";
  const type = params.get("type") === "account" ? "account" : "product";
  return type === "account" ? getAccountById(id) : getProductById(id);
}

function needsOrders(page) {
  return ["checkout", "track-order", "account", "vip", "admin", "admin-orders", "admin-reports"].includes(page);
}

function sanitizePhoneInput(value) {
  return String(value || "").trim().replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
}

function normalizePhoneLookup(value) {
  return sanitizePhoneInput(value).replace(/\D/g, "");
}

function maskPhoneNumber(value) {
  const phone = sanitizePhoneInput(value);
  if (!phone) return "";
  if (phone.length <= 7) return phone;
  return `${phone.slice(0, 4)} ••• ${phone.slice(-3)}`;
}

function normalizeAuthUser(user) {
  if (!user) return null;
  return {
    uid: user.uid || "",
    email: String(user.email || "").trim(),
    phoneNumber: sanitizePhoneInput(user.phoneNumber || ""),
    displayName: String(user.displayName || "").trim(),
    photoURL: user.photoURL || "",
    emailVerified: Boolean(user.emailVerified),
    providerIds: Array.isArray(user.providerData) ? user.providerData.map((entry) => entry?.providerId).filter(Boolean) : []
  };
}

function getUserDisplayLabel() {
  return state.user?.displayName || state.user?.email || state.user?.phoneNumber || t("account", "حسابي");
}

function syncCustomerProfileFromUser(user = state.user) {
  if (!user) return;
  const nextCustomer = {
    ...state.customer,
    name: user.displayName || (user.email ? String(user.email).split("@")[0] : state.customer.name || ""),
    email: user.email || "",
    phone: sanitizePhoneInput(user.phoneNumber || "")
  };
  if (JSON.stringify(nextCustomer) !== JSON.stringify(state.customer)) {
    state.customer = nextCustomer;
    saveJson(KEYS.customer, state.customer);
  }
}

function resetPhoneAuthState({ keepRecaptcha = true } = {}) {
  if (!keepRecaptcha && state.phoneAuth.recaptchaVerifier?.clear) {
    state.phoneAuth.recaptchaVerifier.clear();
  }
  state.phoneAuth = {
    step: "request",
    phoneNumber: "",
    confirmationResult: null,
    recaptchaVerifier: keepRecaptcha ? state.phoneAuth.recaptchaVerifier : null,
    localOtp: ""
  };
}

async function ensurePhoneRecaptcha() {
  if (route !== "login" || !state.firebaseReady || !state.auth || !RecaptchaVerifier) return null;
  const container = document.getElementById("phone-auth-recaptcha");
  if (!(container instanceof HTMLElement)) return null;
  if (state.phoneAuth.recaptchaVerifier && container.childElementCount > 0) {
    return state.phoneAuth.recaptchaVerifier;
  }
  if (state.phoneAuth.recaptchaVerifier?.clear) {
    state.phoneAuth.recaptchaVerifier.clear();
  }
  container.innerHTML = "";
  const verifier = new RecaptchaVerifier(state.auth, "phone-auth-recaptcha", {
    size: "normal"
  });
  await verifier.render();
  state.phoneAuth.recaptchaVerifier = verifier;
  return verifier;
}

function isAdmin() {
  const email = String(state.user?.email || state.customer.email || "").trim().toLowerCase();
  const phone = normalizePhoneLookup(state.user?.phoneNumber || state.customer.phone || "");
  const emailMatch = ADMIN_EMAILS.map((entry) => String(entry || "").trim().toLowerCase()).includes(email);
  const phoneMatch = ADMIN_PHONES.map((entry) => normalizePhoneLookup(entry)).includes(phone);
  return emailMatch || phoneMatch;
}

function persistCart(items) {
  state.cart = [...items];
  saveJson(KEYS.cart, state.cart);
}

function notify(message, type = "success") {
  const root = document.getElementById("toast-stack");
  if (!root) return;
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  root.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add("is-visible");
  }, 30);
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function applyTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(KEYS.theme, state.theme);
  document.documentElement.dataset.theme = state.theme;
  document.body.classList.toggle("dark-mode", state.theme === "dark");
  document.body.classList.toggle("theme-dark", state.theme === "dark");
}

function updateDocumentMeta(title, description) {
  document.title = title || document.body.dataset.title || "طَيّة";
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement("meta");
    descriptionMeta.setAttribute("name", "description");
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute("content", description || document.body.dataset.description || "");
}

function activeClass(page) {
  return route === page || (page === "home" && currentFile().toLowerCase() === "index.html") ? "is-active" : "";
}

function currentFileMatches(name) {
  return currentFile().toLowerCase() === String(name || "").toLowerCase() ? "is-active" : "";
}

function currentFile() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path || "index.html";
}

function t(key, fallback = "") {
  return SHELL_I18N[state.language]?.[key] || fallback || key;
}

function getCurrentLocale() {
  return LANGUAGE_OPTIONS[state.language]?.locale || LANGUAGE_OPTIONS.ar.locale;
}

function getCurrentCurrency() {
  return CURRENCY_OPTIONS[state.currency] || CURRENCY_OPTIONS.OMR;
}

function getCategoryLabel(category) {
  const routeConfig = CATEGORY_ROUTES[category];
  if (!routeConfig) return category || "";
  return state.language === "en" ? (routeConfig.labelEn || routeConfig.label) : routeConfig.label;
}

function cycleLanguage() {
  return state.language === "ar" ? "en" : "ar";
}

function cycleCurrency() {
  const codes = Object.keys(CURRENCY_OPTIONS);
  const index = codes.indexOf(state.currency);
  return codes[(index + 1) % codes.length] || "OMR";
}

function applyLanguage(language) {
  state.language = language === "en" ? "en" : "ar";
  localStorage.setItem(KEYS.language, state.language);
  const option = LANGUAGE_OPTIONS[state.language] || LANGUAGE_OPTIONS.ar;
  document.documentElement.lang = state.language;
  document.documentElement.dir = option.dir;
  document.body.classList.toggle("is-ltr", option.dir === "ltr");
}

function formatPrice(value) {
  const currency = getCurrentCurrency();
  const amount = Number(value || 0) * Number(currency.rate || 1);
  const formatted = new Intl.NumberFormat(getCurrentLocale(), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number.isFinite(amount) ? amount : 0);
  return `${formatted} ${state.language === "en" ? currency.code : currency.label}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function withTimeout(promise, ms, fallbackValue) {
  return Promise.race([
    promise,
    new Promise((resolve) => window.setTimeout(() => resolve(fallbackValue), ms))
  ]);
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function parseMultiline(value) {
  if (!value) return [];
  return String(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getDateValue(value) {
  return new Date(value || 0).getTime() || 0;
}

function formatDate(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ar-OM", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function topEntries(items, keyGetter, valueGetter, metaGetter) {
  const map = new Map();
  items.forEach((item) => {
    const key = keyGetter(item);
    if (!key) return;
    const current = map.get(key) || { label: key, value: 0, count: 0, meta: null };
    current.value += Number(valueGetter(item) || 0);
    current.count += 1;
    if (metaGetter) current.meta = current.meta || metaGetter(item);
    map.set(key, current);
  });
  return [...map.values()].sort((a, b) => Number(b.value || 0) - Number(a.value || 0)).slice(0, 8);
}

function getPopularityScore(item) {
  const reviews = getItemReviews(item.id).length;
  return Number(item.soldCount || 0) * 3 + Number(item.rating || 0) * 2 + reviews;
}

function renderCategoryOptions(selected = "") {
  return Object.keys(CATEGORY_ROUTES).map((category) => `
    <option value="${escapeHtml(category)}" ${category === selected ? "selected" : ""}>${escapeHtml(category)}</option>
  `).join("");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => null);
  }
}

function renderHomePageV3() {
  const products = getVisibleProducts();
  const featured = [...products].sort((a, b) => getPopularityScore(b) - getPopularityScore(a));
  const heroItem = featured[0] || products[0] || DEMO_PRODUCTS[0];
  const heroImage = heroItem?.imgUrl || heroItem?.gallery?.[0] || "icon.svg";
  const categories = buildModernHomeCategories(products, heroImage);

  return `
    <section class="tayya-home">
      <section class="tayya-hero">
        <div class="tayya-hero__copy">
          <span class="tayya-kicker">متجر طيّة</span>
          <h1>متجر عماني فاخر لتجربة متعددة الصفحات</h1>
          <p>تجربة تسوق هادئة وسريعة لمنتجات مختارة بعناية، مع واجهة أوضح للجوال واللابتوب ومسار شراء مباشر.</p>
          <div class="hero-actions tayya-hero__actions">
            <a class="primary-button" href="kummah.html">تسوق الآن</a>
            <a class="ghost-button" href="about.html">من نحن</a>
          </div>
          <div class="tayya-hero__trust">
            <span><i class="fas fa-shield-heart"></i> دفع آمن</span>
            <span><i class="fas fa-truck-fast"></i> شحن سريع</span>
            <span><i class="fas fa-headset"></i> دعم 24/7</span>
          </div>
        </div>
        <figure class="tayya-hero__visual">
          <img src="${escapeHtml(heroImage)}" alt="${escapeHtml(heroItem?.name || "منتج مختار من طيّة")}">
          <figcaption>
            <span>مختار اليوم</span>
            <strong>${escapeHtml(heroItem?.name || "قطعة مختارة")}</strong>
            <small>${formatPrice(heroItem?.price || 0)}</small>
          </figcaption>
        </figure>
      </section>

      <section class="tayya-category-showcase" aria-label="تسوق حسب الفئة">
        <div class="section-head section-head--center">
          <div>
            <h2>تسوق حسب الفئة</h2>
            <p>الأقسام الأساسية في مساحة أخف وأسهل للمس.</p>
          </div>
        </div>
        <div class="tayya-category-grid">
          ${categories.map(renderModernHomeCategory).join("")}
        </div>
      </section>

      <section class="tayya-feature-band">
        <article><i class="fas fa-gem"></i><strong>منتجات أصلية</strong><span>اختيارات منتقاة بعناية</span></article>
        <article><i class="fas fa-wallet"></i><strong>دفع مرن</strong><span>تجربة دفع واضحة</span></article>
        <article><i class="fas fa-mobile-screen"></i><strong>جاهز للجوال</strong><span>مقاسات أهدأ وتنقل أسرع</span></article>
        <article><i class="fas fa-box-open"></i><strong>طلبات منظمة</strong><span>سلة وحساب وتتبع مستقل</span></article>
      </section>
    </section>
  `;
}

function buildModernHomeCategories(products, fallbackImage) {
  const findByCategory = (keyword) => products.find((item) => String(item.category || "").includes(keyword)) || products[0] || null;
  return [
    { href: "perfumes.html", label: "العطور", icon: "fa-spray-can-sparkles", item: findByCategory("العطور") },
    { href: "kummah.html", label: getCategoryLabel("الكميم"), icon: "fa-shirt", item: findByCategory("الكميم") },
    { href: "massar.html", label: getCategoryLabel("المصار"), icon: "fa-crown", item: findByCategory("المصار") },
    { href: "sticks.html", label: getCategoryLabel("العصي"), icon: "fa-wand-magic-sparkles", item: findByCategory("العصي") },
    { href: "shoes.html", label: getCategoryLabel("الأحذية"), icon: "fa-shoe-prints", item: findByCategory("الأحذية") },
    { href: "accounts.html", label: t("accounts", "الحسابات"), icon: "fa-layer-group", item: null }
  ].map((entry) => ({
    ...entry,
    image: entry.item?.imgUrl || entry.item?.gallery?.[0] || fallbackImage || "icon.svg"
  }));
}

function renderModernHomeCategory(entry) {
  return `
    <a class="tayya-category-card" href="${escapeHtml(entry.href)}">
      <span class="tayya-category-card__image"><img src="${escapeHtml(entry.image)}" alt=""></span>
      <span class="tayya-category-card__meta">
        <i class="fas ${escapeHtml(entry.icon)}"></i>
        <strong>${escapeHtml(entry.label)}</strong>
        <small>عرض المنتجات</small>
      </span>
    </a>
  `;
}

function renderLoginPage() {
  if (state.user) {
    return `
      <section class="section-card auth-portal auth-portal--signed">
        <div>
          <span class="tayya-kicker">حسابك</span>
          <h2>أنت مسجل الدخول بالفعل</h2>
          <p>انتقل إلى حسابك لمتابعة الطلبات والعناوين والمفضلة.</p>
        </div>
        <div class="actions-row">
          <a class="primary-button" href="account.html">حسابي</a>
          ${isAdmin() ? '<a class="ghost-button" href="admin.html">الأدمن</a>' : ""}
        </div>
      </section>
    `;
  }

  const phoneValue = state.phoneAuth.phoneNumber || state.customer.phone || state.user?.phoneNumber || "";
  const verifyBlock = state.phoneAuth.step === "verify" ? `
    <form class="auth-card auth-card--stacked auth-card--otp" id="phone-verify-form">
      <div class="section-head">
        <div>
          <span class="tayya-kicker">OTP</span>
          <h3>تأكيد الرمز</h3>
          <p>أدخل رمز التحقق المكون من 6 أرقام لإكمال الدخول.</p>
        </div>
      </div>
      <input class="control" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="123456" required>
      <div class="actions-row auth-actions">
        <button class="primary-button" type="submit">تأكيد الدخول</button>
        <button class="ghost-button" type="button" data-action="reset-phone-auth">تغيير الرقم</button>
      </div>
    </form>
  ` : "";

  return `
    <section class="auth-portal">
      <aside class="auth-portal__intro">
        <span class="tayya-kicker">دخول / إنشاء حساب</span>
        <h2>اختر الطريقة الأسهل لك</h2>
        <p>كل طرق الدخول في صفحة واحدة، بتصميم أخف على الجوال واللابتوب.</p>
        <div class="auth-method-grid">
          <button class="auth-method auth-method--google" type="button" data-social-login="google"><i class="fab fa-google"></i><span>Google</span></button>
          <button class="auth-method auth-method--facebook" type="button" data-social-login="facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></button>
          <a class="auth-method" href="#phone-auth-form"><i class="fas fa-mobile-screen"></i><span>رقم الجوال</span></a>
          <a class="auth-method" href="#login-form"><i class="fas fa-envelope"></i><span>البريد</span></a>
        </div>
      </aside>

      <div class="auth-portal__forms">
        <form class="auth-card auth-card--stacked" id="login-form">
          <div class="section-head">
            <div>
              <span class="tayya-kicker">Email</span>
              <h3>الدخول بالبريد</h3>
              <p>استخدم بريدك وكلمة المرور للوصول إلى حسابك.</p>
            </div>
          </div>
          <input class="control" name="email" type="email" autocomplete="email" placeholder="البريد الإلكتروني" required>
          <input class="control" name="password" type="password" autocomplete="current-password" placeholder="كلمة المرور" required>
          <div class="actions-row auth-actions">
            <button class="primary-button" type="submit">دخول</button>
            <button class="ghost-button" type="button" data-reset-password>استرجاع كلمة المرور</button>
          </div>
        </form>

        <form class="auth-card auth-card--stacked" id="phone-auth-form">
          <div class="section-head">
            <div>
              <span class="tayya-kicker">Phone</span>
              <h3>الدخول برقم الجوال</h3>
              <p>أدخل الرقم بصيغة دولية مثل +968 ثم أكمل التحقق بالرمز.</p>
            </div>
          </div>
          <input class="control" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+968 9X XXX XXX" value="${escapeHtml(phoneValue)}" required>
          <div id="phone-auth-recaptcha" class="recaptcha-slot ${state.firebaseReady ? "" : "is-hidden"}"></div>
          <button class="primary-button" type="submit">${state.phoneAuth.step === "verify" ? "إعادة إرسال الرمز" : "إرسال الرمز"}</button>
        </form>

        ${verifyBlock}

        <div class="auth-switch-card">
          <div>
            <strong>ليس لديك حساب؟</strong>
            <span>أنشئ حسابك خلال لحظات.</span>
          </div>
          <a class="ghost-button" href="register.html">إنشاء حساب</a>
        </div>
      </div>
    </section>
  `;
}

function renderRegisterPage() {
  if (state.user) {
    return `
      <section class="section-card auth-portal auth-portal--signed">
        <div>
          <span class="tayya-kicker">حسابك</span>
          <h2>تم تسجيل الدخول</h2>
          <p>يمكنك الآن إدارة العناوين والطلبات من صفحة الحساب.</p>
        </div>
        <a class="primary-button" href="account.html">حسابي</a>
      </section>
    `;
  }

  return `
    <section class="auth-portal">
      <aside class="auth-portal__intro">
        <span class="tayya-kicker">حساب جديد</span>
        <h2>بيانات قليلة وتجربة أسرع</h2>
        <p>ابدأ بالبريد أو استخدم حساب اجتماعي، ثم أكمل بيانات التوصيل من صفحة الحساب.</p>
        <div class="auth-method-grid">
          <button class="auth-method auth-method--google" type="button" data-social-login="google"><i class="fab fa-google"></i><span>Google</span></button>
          <button class="auth-method auth-method--facebook" type="button" data-social-login="facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></button>
        </div>
      </aside>

      <form class="auth-card auth-card--stacked auth-portal__forms" id="register-form">
        <div class="section-head">
          <div>
            <span class="tayya-kicker">Register</span>
            <h3>إنشاء حساب</h3>
            <p>احفظ طلباتك وعناوينك ومفضلاتك من مكان واحد.</p>
          </div>
        </div>
        <div class="form-grid form-grid--two">
          <input class="control" name="name" autocomplete="name" placeholder="الاسم الكامل" required>
          <input class="control" name="email" type="email" autocomplete="email" placeholder="البريد الإلكتروني" required>
        </div>
        <div class="form-grid form-grid--two">
          <input class="control" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="رقم الجوال">
          <input class="control" name="password" type="password" autocomplete="new-password" placeholder="كلمة المرور" required>
        </div>
        <div class="actions-row auth-actions">
          <button class="primary-button" type="submit">إنشاء الحساب</button>
          <a class="ghost-button" href="login.html">لدي حساب</a>
        </div>
      </form>
    </section>
  `;
}
