/* ============================================
   DELETE-CONFIRM-MODAL.JS — Delete confirmation modal
   ============================================ */

const DeleteConfirmModal = (function () {
  "use strict";

  function getLocalizedName(product) {
    if (typeof I18n !== "undefined" && I18n.getLang() === "uk") {
      if (product.nameUk) return product.nameUk;
    }
    return product.name;
  }

  let pendingDeleteId = null;

  function openDeleteConfirm(firestoreId) {
    pendingDeleteId = firestoreId;
    const product = Products.getByFirestoreId(firestoreId);
    const overlay = document.getElementById("deleteConfirmModal");
    const nameEl = document.getElementById("deleteProductName");

    if (!overlay) return;
    if (nameEl) nameEl.textContent = product ? `"${getLocalizedName(product)}"` : "";

    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeDeleteConfirm() {
    const overlay = document.getElementById("deleteConfirmModal");
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    pendingDeleteId = null;
  }

  function handleDeleteConfirm() {
    if (!pendingDeleteId) return;
    const btn = document.getElementById("deleteConfirmBtn");
    if (btn) btn.disabled = true;

    Products.deleteProduct(pendingDeleteId)
      .then(() => {
        closeDeleteConfirm();
      })
      .catch((err) => {
        console.error("Delete error:", err);
      })
      .finally(() => {
        if (btn) btn.disabled = false;
      });
  }

  function init() {
    document.getElementById("deleteCancelBtn")?.addEventListener("click", closeDeleteConfirm);
    document.getElementById("deleteConfirmBtn")?.addEventListener("click", handleDeleteConfirm);
    document.getElementById("deleteConfirmModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeDeleteConfirm();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDeleteConfirm();
    });
  }

  return { init, openDeleteConfirm, closeDeleteConfirm };
})();
