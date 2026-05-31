/* ============================================
   QUICK-VIEW-MODAL.JS — Product quick-view modal
   ============================================ */

const QuickViewModal = (function () {
  "use strict";

  function getLocalizedName(product) {
    if (typeof I18n !== "undefined" && I18n.getLang() === "uk") {
      if (product.nameUk) return product.nameUk;
    }
    return product.name;
  }

  function getLocalizedDescription(product) {
    if (typeof I18n !== "undefined" && I18n.getLang() === "uk") {
      if (product.descriptionUk) return product.descriptionUk;
    }
    return product.description;
  }

  function tSafe(key) {
    return typeof I18n !== "undefined" ? I18n.t(key) : key;
  }

  function openModal(firestoreId) {
    const product = Products.getByFirestoreId(firestoreId);
    if (!product) return;

    const modal = document.getElementById("productModal");
    document.getElementById("modalImage").src = product.image || "";
    document.getElementById("modalImage").alt = getLocalizedName(product);
    document.getElementById("modalName").textContent = getLocalizedName(product);
    document.getElementById("modalPrice").textContent =
      typeof Currency !== "undefined"
        ? Currency.format(product.price)
        : "$" + Number(product.price).toFixed(2);
    document.getElementById("modalDescription").textContent = getLocalizedDescription(product);
    document.getElementById("modalAddToCart").dataset.firestoreId = product.firestoreId;
    document.getElementById("modalAddToCart").textContent = tSafe("cart.addToCart");

    modal.classList.add("active");
    modal.querySelector(".modal").scrollTop = 0;
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    document.getElementById("productModal")?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  function init() {
    document.getElementById("modalClose")?.addEventListener("click", closeModal);
    document.getElementById("productModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    document.getElementById("modalAddToCart")?.addEventListener("click", (e) => {
      const id = e.target.dataset.firestoreId;
      const product = Products.getByFirestoreId(id);
      if (product) {
        Cart.addItem({
          id: product.firestoreId,
          name: getLocalizedName(product),
          price: Number(product.price),
          image: product.image,
        });
        closeModal();
        Cart.openDrawer();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  return { init, openModal, closeModal };
})();
