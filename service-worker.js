self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("Layout-Engine").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./css/styles.css",
        "./js/app.js"
        "./js/Formatter.js"
        "./js/layoutEngine.js"
        "./js/svgRenderer.js"
        ".js/projectManager.js"
        "./js/pdfGenerator.js"
      ]);
    })
  );
});
