const CACHE_NAME = "tayya-cache-v38";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./kummah.html",
  "./massar.html",
  "./sticks.html",
  "./shoes.html",
  "./perfumes.html",
  "./accounts.html",
  "./product.html",
  "./cart.html",
  "./checkout.html",
  "./about.html",
  "./contact.html",
  "./faq.html",
  "./terms.html",
  "./privacy.html",
  "./track-order.html",
  "./login.html",
  "./register.html",
  "./forgot-password.html",
  "./account.html",
  "./admin.html",
  "./admin-products.html",
  "./admin-accounts.html",
  "./admin-orders.html",
  "./admin-offers.html",
  "./admin-images.html",
  "./admin-reports.html",
  "./404.html",
  "./edits.html",
  "./boot-guard.js",
  "./firebase-config.example.js",
  "./firebase-store.js",
  "./firestore.rules.example",
  "./storefront.css",
  "./storefront.js",
  "./luxury-upgrade.css",
  "./luxury-upgrade.js",
  "./luxury-commerce.css",
  "./luxury-commerce.js",
  "./luxury-growth.css",
  "./luxury-growth.js",
  "./luxury-facelift.css",
  "./luxury-facelift.js",
  "./luxury-atelier.css",
  "./luxury-atelier.js",
  "./luxury-panorama.css",
  "./luxury-panorama.js",
  "./luxury-navigation.css",
  "./luxury-navigation.js",
  "./site.webmanifest",
  "./icon.svg",
  "./robots.txt",
  "./mandoos-sitemap.xml",
  "./assets/products/kummah-shop.jpg",
  "./assets/products/kummah-souq.jpg",
  "./assets/products/khanjar-belt.jpg",
  "./assets/products/khanjar-belt-2.jpg",
  "./assets/products/silver-cane-clean.jpg",
  "./assets/products/walking-stick-2.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/firebase-config.js")) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned)).catch(() => null);
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
