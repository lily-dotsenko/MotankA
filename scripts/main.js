/* ============================================
   MAIN.JS — Navbar, video section, app init
   ============================================ */

(function () {
  "use strict";

  /* ========================================
     NAVBAR — scroll & mobile toggle
     ======================================== */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    const links = document.querySelectorAll(".navbar__link");

    if (!navbar) return;

    // Scroll effect
    function onScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check

    // Mobile toggle
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        menu.classList.toggle("active");
      });

      // Close on link click
      links.forEach((link) => {
        link.addEventListener("click", () => {
          toggle.classList.remove("active");
          menu.classList.remove("active");
        });
      });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section[id]");
    function highlightLink() {
      const scrollY = window.scrollY + 120;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const link = document.querySelector(`.navbar__link[href="#${id}"]`);
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        }
      });
    }
    window.addEventListener("scroll", highlightLink, { passive: true });
  }

  /* ========================================
     VIDEO SECTION — play button overlay
     ======================================== */
  function initVideoSection() {
    const overlay = document.getElementById("videoOverlay");
    const playBtn = document.getElementById("videoPlayBtn");
    const video = document.querySelector(".video-section__video");

    if (!overlay || !playBtn || !video) return;

    function play() {
      video.play();
      overlay.classList.add("hidden");
    }

    overlay.addEventListener("click", play);

    // Show overlay again when video ends
    video.addEventListener("ended", () => {
      overlay.classList.remove("hidden");
    });
  }

  /* ========================================
     INIT EVERYTHING
     ======================================== */
  async function init() {
    await PartialsLoader.load();

    // Initialise modules after partials are loaded
    Cart.init();
    await Products.init();
    QuickViewModal.init();
    ProductFormModal.init();
    DeleteConfirmModal.init();
    if (typeof I18n !== "undefined") I18n.init();
    if (typeof Currency !== "undefined") Currency.init();
    if (typeof Auth !== "undefined") Auth.init();
    initNavbar();
    initVideoSection();
    ScrollBehavior.init();
    ContactForm.init();
  }

  // Kick off
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
