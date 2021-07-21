const CACHE_NAME = "cache-v2"
const urlsToCache = [
    "/",
    "/index.js",
    "index.css",
    "favicon-196.png",
    "apple-icon-180.png",
    "manifest-icon-192.png",
    "manifest-icon-512.png"
]
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache)   
        })
    )
})

self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(response => response ?? fetch(event.request)));
});
