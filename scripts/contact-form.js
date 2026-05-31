/* ============================================
   CONTACT-FORM.JS — Contact & quick-email
   form validation
   ============================================ */

const ContactForm = (function () {
  "use strict";

  /* ========================================
     Full Contact Form
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

      const success = document.getElementById("formSuccess");
      if (success) {
        success.classList.add("show");
        form.reset();
        setTimeout(() => success.classList.remove("show"), 4000);
      }
    });
  }

  /* ========================================
     Quick Email Contact Form
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

      if (successEl) {
        successEl.classList.add("show");
        form.reset();
        setTimeout(() => successEl.classList.remove("show"), 4000);
      }
    });
  }

  function init() {
    initContactForm();
    initQuickContactForm();
  }

  return { init };
})();
