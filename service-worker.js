const CACHE_NAME = "tayya-cache-v31";
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
  "./account.html",
  "./vip.html",
  "./admin.html",
  "./admin-products.html",
  "./admin-accounts.html",
  "./admin-orders.html",
  "./admin-offers.html",
  "./admin-images.html",
  "./admin-reports.html",
  "./404.html",
  "./edits.html",
  "./mandoos.html",
  "./boot-guard.js",
  "./storefront.css",
  "./storefront.js",
  "./luxury-upgrade.css",
  "./luxury-upgrade.js",
  "./luxury-commerce.css",
  "./luxury-commerce.js",
  "./luxury-growth.css",
  "./luxury-growth.js",
  "./luxury-odyssey.css",
  "./luxury-odyssey.js",
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
  "./mandoos-sitemap.xml"
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
