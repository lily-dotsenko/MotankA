/* ============================================
   PARTIALS-LOADER.JS — Fetches HTML partials
   into placeholder elements
   ============================================ */

const PartialsLoader = (function () {
  "use strict";

  const partials = [
    { id: "navbar-placeholder", file: "partials/navbar.html" },
    { id: "hero-placeholder", file: "partials/hero.html" },
    { id: "products-placeholder", file: "partials/products.html" },
    { id: "about-placeholder", file: "partials/about.html" },
    { id: "traditions-placeholder", file: "partials/traditions.html" },
    { id: "video-placeholder", file: "partials/video.html" },
    { id: "contact-placeholder", file: "partials/contact.html" },
    { id: "footer-placeholder", file: "partials/footer.html" },
    { id: "modals-placeholder", file: "partials/modals.html" },
  ];

  async function load() {
    const promises = partials.map(async ({ id, file }) => {
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        const html = await res.text();
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      } catch (err) {
        console.error(err);
      }
    });

    await Promise.all(promises);
  }

  return { load };
})();
