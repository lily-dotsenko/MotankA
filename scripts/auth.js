/* ============================================
   AUTH.JS — Admin authentication (Firebase)
   ============================================ */

const Auth = (function () {
  "use strict";

  const ADMIN_EMAIL = "callmelilyfer@gmail.com";

  /* -------- State -------- */
  let currentUser = null;

  /* -------- Helpers -------- */
  function tSafe(key) {
    return typeof I18n !== "undefined" ? I18n.t(key) : key;
  }

  function isAdmin() {
    return !!(currentUser && currentUser.email === ADMIN_EMAIL);
  }

  function getCurrentUser() {
    return currentUser;
  }

  /* -------- Login -------- */
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  /* -------- Logout -------- */
  function logout() {
    return auth.signOut();
  }

  /* -------- Update navbar UI -------- */
  function updateNavbarUI() {
    const loginBtn = document.getElementById("adminLoginBtn");
    const logoutBtn = document.getElementById("adminLogoutBtn");
    const adminBadge = document.getElementById("adminBadge");

    if (!loginBtn) return;

    if (isAdmin()) {
      loginBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-flex";
      if (adminBadge) adminBadge.style.display = "inline-block";
    } else {
      loginBtn.style.display = "inline-flex";
      if (logoutBtn) logoutBtn.style.display = "none";
      if (adminBadge) adminBadge.style.display = "none";
    }

    // Show/hide admin controls in product grid
    if (typeof Products !== "undefined" && Products.updateAdminUI) {
      Products.updateAdminUI(isAdmin());
    }
  }

  /* -------- Open / Close login modal -------- */
  function openLoginModal() {
    const modal = document.getElementById("adminLoginModal");
    if (modal) {
      modal.classList.add("active");
      document.body.classList.add("no-scroll");
      const emailInput = modal.querySelector("#adminEmail");
      if (emailInput) setTimeout(() => emailInput.focus(), 100);
    }
  }

  function closeLoginModal() {
    const modal = document.getElementById("adminLoginModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.classList.remove("no-scroll");
      clearLoginError();
      document.getElementById("adminEmail").value = "";
      document.getElementById("adminPassword").value = "";
    }
  }

  function clearLoginError() {
    const err = document.getElementById("adminLoginError");
    if (err) err.textContent = "";
  }

  /* -------- Handle login form submit -------- */
  function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    const errEl = document.getElementById("adminLoginError");
    const btn = document.getElementById("adminLoginSubmit");

    if (!email || !password) {
      if (errEl) errEl.textContent = tSafe("auth.fillAllFields");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = tSafe("auth.loggingIn");
    }

    login(email, password)
      .then(() => {
        closeLoginModal();
      })
      .catch((err) => {
        let msg = tSafe("auth.loginError");
        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/invalid-credential" ||
          err.code === "auth/user-not-found"
        ) {
          msg = tSafe("auth.wrongCredentials");
        } else if (err.code === "auth/too-many-requests") {
          msg = tSafe("auth.tooManyRequests");
        }
        if (errEl) errEl.textContent = msg;
      })
      .finally(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = tSafe("auth.loginBtn");
        }
      });
  }

  /* -------- Init events -------- */
  function initEvents() {
    // Open login modal
    const loginBtn = document.getElementById("adminLoginBtn");
    if (loginBtn) loginBtn.addEventListener("click", openLoginModal);

    // Close login modal
    const closeBtn = document.getElementById("adminLoginModalClose");
    if (closeBtn) closeBtn.addEventListener("click", closeLoginModal);

    // Click outside to close
    const modal = document.getElementById("adminLoginModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeLoginModal();
      });
    }

    // Login form submit
    const form = document.getElementById("adminLoginForm");
    if (form) form.addEventListener("submit", handleLoginSubmit);

    // Logout
    const logoutBtn = document.getElementById("adminLogoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logout().catch((err) => console.error("Logout error:", err));
      });
    }

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLoginModal();
    });
  }

  /* -------- Init -------- */
  function init() {
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
      currentUser = user;
      updateNavbarUI();
    });

    initEvents();
  }

  return { init, isAdmin, getCurrentUser, login, logout, updateNavbarUI };
})();
