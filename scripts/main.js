/* ============================================
   MAIN.JS — Partial loader, scroll, animations
   ============================================ */

(function () {
  "use strict";

  /* ========================================
     1. LOAD PARTIALS
     ======================================== */
  const partials = [
    { id: "navbar-placeholder", file: "partials/navbar.html" },
    { id: "hero-placeholder", file: "partials/hero.html" },
    { id: "products-placeholder", file: "partials/products.html" },
    { id: "about-placeholder", file: "partials/about.html" },
    { id: "traditions-placeholder", file: "partials/traditions.html" },
    { id: "video-placeholder", file: "partials/video.html" },
    { id: "contact-placeholder", file: "partials/contact.html" },
    { id: "footer-placeholder", file: "partials/footer.html" },
  ];

  async function loadPartials() {
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

  /* ========================================
     2. NAVBAR — scroll & mobile toggle
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
     3. SCROLL ANIMATIONS — Intersection Observer
     ======================================== */
  function initScrollAnimations() {
    const animatedEls = document.querySelectorAll(".fade-in-up");
    if (!animatedEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    animatedEls.forEach((el) => observer.observe(el));
  }

  /* ========================================
     4. VIDEO SECTION — play button overlay
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
     5. CONTACT FORM VALIDATION
     ======================================== */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      // Name
      const name = document.getElementById("contactName");
      const nameError = document.getElementById("nameError");
      if (name && name.value.trim().length < 2) {
        nameError.textContent =
          typeof I18n !== "undefined"
            ? I18n.t("validation.name")
            : "Please enter your name.";
        name.classList.add("error");
        valid = false;
      } else if (nameError) {
        nameError.textContent = "";
        name?.classList.remove("error");
      }

      // Email
      const email = document.getElementById("contactEmail");
      const emailError = document.getElementById("emailError");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value.trim())) {
        emailError.textContent =
          typeof I18n !== "undefined"
            ? I18n.t("validation.email")
            : "Please enter a valid email address.";
        email.classList.add("error");
        valid = false;
      } else if (emailError) {
        emailError.textContent = "";
        email?.classList.remove("error");
      }

      // Message
      const message = document.getElementById("contactMessage");
      const messageError = document.getElementById("messageError");
      if (message && message.value.trim().length < 10) {
        messageError.textContent =
          typeof I18n !== "undefined"
            ? I18n.t("validation.message")
            : "Message must be at least 10 characters.";
        message.classList.add("error");
        valid = false;
      } else if (messageError) {
        messageError.textContent = "";
        message?.classList.remove("error");
      }

      if (!valid) return;

      // Show success (in production, submit via fetch to Formspree)
      const success = document.getElementById("formSuccess");
      if (success) {
        success.classList.add("show");
        form.reset();
        setTimeout(() => success.classList.remove("show"), 4000);
      }
    });
  }

  /* ========================================
     5b. QUICK EMAIL CONTACT FORM
     ======================================== */
  function initQuickContactForm() {
    const form = document.getElementById("quickContactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("quickEmail");
      const errorEl = document.getElementById("quickEmailError");
      const successEl = document.getElementById("quickFormSuccess");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !emailRegex.test(email.value.trim())) {
        if (errorEl)
          errorEl.textContent =
            typeof I18n !== "undefined"
              ? I18n.t("validation.email")
              : "Please enter a valid email address.";
        email.classList.add("error");
        return;
      }

      if (errorEl) errorEl.textContent = "";
      email?.classList.remove("error");

      // Show success (in production, submit via fetch)
      if (successEl) {
        successEl.classList.add("show");
        form.reset();
        setTimeout(() => successEl.classList.remove("show"), 4000);
      }
    });
  }

  /* ========================================
     6. SCROLL-TO-TOP BUTTON
     ======================================== */
  function initScrollToTop() {
    // — inject styles —
    const style = document.createElement("style");
    style.textContent = `
      .scroll-top-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-white);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-md);
        opacity: 0;
        visibility: hidden;
        transform: translateY(12px);
        transition: opacity var(--transition-normal),
                    visibility var(--transition-normal),
                    transform var(--transition-normal),
                    background var(--transition-fast);
        z-index: 90;
      }
      .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .scroll-top-btn:hover {
        background: var(--color-primary-light);
      }
      .scroll-top-btn svg {
        width: 20px;
        height: 20px;
        stroke: currentColor;
        fill: none;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      @media (max-width: 768px) {
        .scroll-top-btn { bottom: 1.25rem; right: 1.25rem; width: 40px; height: 40px; }
      }
    `;
    document.head.appendChild(style);

    // — create button —
    const btn = document.createElement("button");
    btn.className = "scroll-top-btn";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(btn);

    // — show / hide on scroll —
    function toggle() {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    // — scroll to top on click (slow ease-out) —
    btn.addEventListener("click", () => {
      const start = window.scrollY;
      const duration = 1800;
      let t0 = null;

      function step(timestamp) {
        if (!t0) t0 = timestamp;
        const elapsed = timestamp - t0;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic for a gentle deceleration
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start * (1 - ease));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  /* ========================================
     7. SMOOTH SCROLL for anchor links
     ======================================== */
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--navbar-height",
          ),
        ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  /* ========================================
     INIT EVERYTHING
     ======================================== */
  async function init() {
    await loadPartials();

    // Initialise modules after partials are loaded
    Cart.init();
    Products.init();
    if (typeof I18n !== "undefined") I18n.init();
    initNavbar();
    initSmoothScroll();
    initScrollToTop();
    initVideoSection();
    initContactForm();
    initQuickContactForm();

    // Slight delay so DOM is painted before observing
    requestAnimationFrame(() => {
      initScrollAnimations();
    });
  }

  // Kick off
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
