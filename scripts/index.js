/* ============================================
   INDEX.JS — Main JS entry point
   Loads all app scripts sequentially so that
   each module runs only after its dependencies
   are ready (Firebase compat globals, etc.)
   ============================================ */

(function () {
  "use strict";

  var scripts = [
    "scripts/firebase-config.js",
    "scripts/i18n.js",
    "scripts/cart.js",
    "scripts/product-seed-data.js",
    "scripts/products.js",
    "scripts/quick-view-modal.js",
    "scripts/product-form-modal.js",
    "scripts/delete-confirm-modal.js",
    "scripts/auth.js",
    "scripts/partials-loader.js",
    "scripts/scroll-behavior.js",
    "scripts/contact-form.js",
    "scripts/main.js",
  ];

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement("script");
      el.src = src;
      el.onload = resolve;
      el.onerror = function () {
        reject(new Error("Failed to load script: " + src));
      };
      document.body.appendChild(el);
    });
  }

  scripts.reduce(function (chain, src) {
    return chain.then(function () {
      return loadScript(src);
    });
  }, Promise.resolve());
})();
