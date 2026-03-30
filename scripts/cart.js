/* ============================================
   CART.JS — Cart logic with localStorage
   ============================================ */

const Cart = (function () {
  "use strict";

  const STORAGE_KEY = "motanka_cart";

  /* -------- State -------- */
  let items = [];

  /* -------- Helpers -------- */
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      items = data ? JSON.parse(data) : [];
    } catch {
      items = [];
    }
  }

  /* -------- Public API -------- */
  function getItems() {
    return items;
  }

  function getCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotal() {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function addItem(product) {
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    save();
    render();
    updateBadge();
  }

  function removeItem(productId) {
    items = items.filter((i) => i.id !== productId);
    save();
    render();
    updateBadge();
  }

  function updateQty(productId, delta) {
    const item = items.find((i) => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeItem(productId);
      return;
    }
    save();
    render();
    updateBadge();
  }

  /* -------- Render cart drawer content -------- */
  function render() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    if (!container || !totalEl) return;

    if (items.length === 0) {
      var emptyText =
        typeof I18n !== "undefined"
          ? I18n.t("cart.empty")
          : "Your cart is empty";
      container.innerHTML = `
        <div class="cart-drawer__empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p>${emptyText}</p>
        </div>`;
      totalEl.textContent = "$0.00";
      return;
    }

    container.innerHTML = items
      .map((item) => {
        // Get localized name if available
        var displayName = item.name;
        if (
          typeof Products !== "undefined" &&
          typeof I18n !== "undefined" &&
          I18n.getLang() === "uk"
        ) {
          var tr = I18n.getProductTranslation(item.id);
          if (tr && tr.name) displayName = tr.name;
        }
        return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${displayName}">
        </div>
        <div class="cart-item__details">
          <p class="cart-item__name">${displayName}</p>
          <p class="cart-item__price">$${item.price.toFixed(2)}</p>
          <div class="cart-item__controls">
            <button class="cart-item__qty-btn" data-action="decrease" data-id="${item.id}">−</button>
            <span class="cart-item__qty">${item.qty}</span>
            <button class="cart-item__qty-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-action="remove" data-id="${item.id}">✕</button>
      </div>`;
      })
      .join("");

    totalEl.textContent = `$${getTotal().toFixed(2)}`;
  }

  /* -------- Badge -------- */
  function updateBadge() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;
    const count = getCount();
    badge.textContent = count;
    badge.classList.remove("bump");
    // Force reflow for animation restart
    void badge.offsetWidth;
    badge.classList.add("bump");
  }

  /* -------- Drawer open / close -------- */
  function openDrawer() {
    document.getElementById("cartDrawer")?.classList.add("active");
    document.getElementById("cartOverlay")?.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeDrawer() {
    document.getElementById("cartDrawer")?.classList.remove("active");
    document.getElementById("cartOverlay")?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  /* -------- Event delegation for cart drawer -------- */
  function initEvents() {
    // Toggle cart
    document
      .getElementById("cartToggle")
      ?.addEventListener("click", openDrawer);
    document
      .getElementById("cartClose")
      ?.addEventListener("click", closeDrawer);
    document
      .getElementById("cartOverlay")
      ?.addEventListener("click", closeDrawer);

    // Cart item actions (delegation)
    document.getElementById("cartItems")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === "increase") updateQty(id, 1);
      else if (action === "decrease") updateQty(id, -1);
      else if (action === "remove") removeItem(id);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  /* -------- Init -------- */
  function init() {
    load();
    initEvents();
    render();
    updateBadge();
  }

  return {
    init,
    addItem,
    removeItem,
    updateQty,
    getItems,
    getCount,
    getTotal,
    openDrawer,
    closeDrawer,
    render,
    updateBadge,
  };
})();
