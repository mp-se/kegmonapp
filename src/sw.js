self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open("Demo")
    .then(cache => cache.addAll([
      "index.html",
      "config.html",
      "about.html",
      "manifest.json",
      "kegmonapp.js",
      "sw.js",
      "bootstrap/bootstrap.min.css", // v5.2.3
      "bootstrap/bootstrap.min.css.map", 
      "bootstrap/bootstrap.bundle.min.js", 
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