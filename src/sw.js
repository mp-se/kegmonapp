self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open("Demo")
    .then(cache => cache.addAll([
      "index.html",
      "config.html",
      "about.html",
      "inventory.html",
      "manifest.json",
      "kegmonapp.js",
      "sw.js",
      "beer-${image}", // dummy image used by template
      "images/beer-color-0.png",
      "images/beer-color-2.png",
      "images/beer-color-4.png",
      "images/beer-color-12.png",
      "images/beer-color-18.png",
      "images/beer-color-24.png",
      "images/beer-color-30.png",
      "images/beer-color-40.png",
      "bootstrap/bootstrap.min.css", // v5.2.3
      "bootstrap/bootstrap.min.css.map", // v5.2.3
      "bootstrap/bootstrap.bundle.min.js", // v5.2.3
      "jquery/jquery.min.js" // v3.6.3
    ]))
    .catch(err => console.error(err))
  );
});

self.addEventListener("activate", evt => self.clients.claim());

// LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
/*self.addEventListener("fetch", evt => evt.respondWith(
  caches.match(evt.request).then(res => res || fetch(evt.request))
));*/

// LOAD WITH NETWORK FIRST, FALLBACK TO CACHE IF OFFLINE
self.addEventListener("fetch", evt => evt.respondWith(
  fetch(evt.request).catch(() => caches.match(evt.request))
));