/* ============================================
   PRODUCT-FORM-MODAL.JS — Add / Edit product modal
   ============================================ */

const ProductFormModal = (function () {
  "use strict";

  function tSafe(key) {
    return typeof I18n !== "undefined" ? I18n.t(key) : key;
  }

  let editingFirestoreId = null;

  function openProductForm(product) {
    editingFirestoreId = product ? product.firestoreId : null;
    const overlay = document.getElementById("productFormModal");
    const titleEl = document.getElementById("productFormTitle");
    const submitBtn = document.getElementById("productFormSubmit");

    if (!overlay) return;

    document.getElementById("productFormId").value = editingFirestoreId || "";
    document.getElementById("pfName").value = product ? product.name : "";
    document.getElementById("pfNameUk").value = product ? product.nameUk || "" : "";
    document.getElementById("pfPrice").value = product ? product.price : "";
    document.getElementById("pfImage").value = product ? product.image : "";
    document.getElementById("pfDescription").value = product ? product.description || "" : "";
    document.getElementById("pfDescriptionUk").value = product ? product.descriptionUk || "" : "";

    updateImagePreview(product ? product.image : "");

    if (titleEl)
      titleEl.textContent = product ? tSafe("admin.editProduct") : tSafe("admin.addProduct");
    if (submitBtn) submitBtn.textContent = tSafe("admin.save");

    const errEl = document.getElementById("productFormError");
    if (errEl) errEl.textContent = "";

    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
    setTimeout(() => document.getElementById("pfName").focus(), 100);
  }

  function closeProductForm() {
    const overlay = document.getElementById("productFormModal");
    if (overlay) {
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
    editingFirestoreId = null;
  }

  function updateImagePreview(url) {
    const preview = document.getElementById("pfImagePreview");
    const img = document.getElementById("pfImagePreviewImg");
    if (!preview || !img) return;
    if (url && url.trim()) {
      img.src = url.trim();
      preview.classList.add("visible");
    } else {
      preview.classList.remove("visible");
      img.src = "";
    }
  }

  function handleProductFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("pfName").value.trim();
    const price = document.getElementById("pfPrice").value.trim();
    const errEl = document.getElementById("productFormError");
    const submitBtn = document.getElementById("productFormSubmit");

    if (!name || !price || isNaN(Number(price)) || Number(price) < 0) {
      if (errEl) errEl.textContent = tSafe("admin.formError");
      return;
    }

    const data = {
      name,
      nameUk: document.getElementById("pfNameUk").value.trim(),
      price: Number(price),
      image: document.getElementById("pfImage").value.trim(),
      description: document.getElementById("pfDescription").value.trim(),
      descriptionUk: document.getElementById("pfDescriptionUk").value.trim(),
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = tSafe("admin.saving");
    }

    const action = editingFirestoreId
      ? Products.editProduct(editingFirestoreId, data)
      : Products.addProduct(data);

    action
      .then(() => {
        closeProductForm();
      })
      .catch((err) => {
        console.error("Save product error:", err);
        if (errEl) errEl.textContent = tSafe("admin.saveError");
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = tSafe("admin.save");
        }
      });
  }

  function init() {
    document.getElementById("addProductBtn")?.addEventListener("click", () => {
      openProductForm(null);
    });

    document.getElementById("productFormClose")?.addEventListener("click", closeProductForm);
    document.getElementById("productFormCancel")?.addEventListener("click", closeProductForm);
    document.getElementById("productFormModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeProductForm();
    });
    document.getElementById("productForm")?.addEventListener("submit", handleProductFormSubmit);

    document.getElementById("pfImage")?.addEventListener("input", (e) => {
      updateImagePreview(e.target.value);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProductForm();
    });
  }

  return { init, openProductForm, closeProductForm };
})();
