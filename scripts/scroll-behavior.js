/* ============================================
   SCROLL-BEHAVIOR.JS — Scroll animations,
   scroll-to-top button, smooth anchor scroll
   ============================================ */

const ScrollBehavior = (function () {
  "use strict";

  /* ========================================
     Scroll Animations — Intersection Observer
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
     Scroll-to-Top Button
     Styles live in utilities.css
     ======================================== */
  function initScrollToTop() {
    const btn = document.createElement("button");
    btn.className = "scroll-top-btn";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(btn);

    function toggle() {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    btn.addEventListener("click", () => {
      const start = window.scrollY;
      const duration = 1800;
      let t0 = null;

      function step(timestamp) {
        if (!t0) t0 = timestamp;
        const elapsed = timestamp - t0;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start * (1 - ease));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  /* ========================================
     Smooth Scroll for anchor links
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

  function init() {
    initSmoothScroll();
    initScrollToTop();
    requestAnimationFrame(() => {
      initScrollAnimations();
    });
  }

  return { init };
})();
