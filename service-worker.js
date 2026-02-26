self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("layout-engine-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./css/styles.css",
        "./js/app.js"
      ]);
    })
  );
});