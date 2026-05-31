/* ============================================
   PRODUCTS.JS — Product data (Firestore), grid & modal
   ============================================ */

const Products = (function () {
  "use strict";

  /* -------- In-memory catalog (populated from Firestore) -------- */
  let catalog = [];


  /* -------- Helpers for i18n -------- */
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

  /* -------- Seed Firestore if empty -------- */
  async function seedIfEmpty() {
    try {
      const snapshot = await db.collection("products").limit(1).get();
      if (!snapshot.empty) return; // already seeded

      const batch = db.batch();
      SEED_PRODUCTS.forEach((p) => {
        const ref = db.collection("products").doc(p.id);
        batch.set(ref, {
          name: p.name,
          nameUk: p.nameUk || "",
          price: p.price,
          image: p.image,
          description: p.description,
          descriptionUk: p.descriptionUk || "",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (err) {
      console.error("Seed error:", err);
    }
  }

  /* -------- Load from Firestore -------- */
  async function loadFromFirestore() {
    try {
      const snapshot = await db
        .collection("products")
        .orderBy("createdAt", "asc")
        .get();
      catalog = snapshot.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }));
    } catch (err) {
      console.error("Load products error:", err);
      catalog = [];
    }
  }

  /* -------- Add product -------- */
  async function addProduct(data) {
    const ref = await db.collection("products").add({
      name: data.name,
      nameUk: data.nameUk || "",
      price: Number(data.price),
      image: data.image || "",
      description: data.description || "",
      descriptionUk: data.descriptionUk || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    catalog.push({ firestoreId: ref.id, ...data, price: Number(data.price) });
    renderGrid();
    updateAdminUI(typeof Auth !== "undefined" && Auth.isAdmin());
  }

  /* -------- Edit product -------- */
  async function editProduct(firestoreId, data) {
    await db.collection("products").doc(firestoreId).update({
      name: data.name,
      nameUk: data.nameUk || "",
      price: Number(data.price),
      image: data.image || "",
      description: data.description || "",
      descriptionUk: data.descriptionUk || "",
    });
    const idx = catalog.findIndex((p) => p.firestoreId === firestoreId);
    if (idx !== -1) {
      catalog[idx] = { ...catalog[idx], ...data, price: Number(data.price) };
    }
    renderGrid();
    updateAdminUI(typeof Auth !== "undefined" && Auth.isAdmin());
  }

  /* -------- Delete product -------- */
  async function deleteProduct(firestoreId) {
    await db.collection("products").doc(firestoreId).delete();
    catalog = catalog.filter((p) => p.firestoreId !== firestoreId);
    renderGrid();
    updateAdminUI(typeof Auth !== "undefined" && Auth.isAdmin());
  }

  /* -------- Render Product Grid -------- */
  function renderGrid() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const addToCartText = tSafe("products.addToCart");
    const quickViewText = tSafe("products.quickView");
    const editText = tSafe("admin.edit");
    const deleteText = tSafe("admin.delete");
    const adminMode = typeof Auth !== "undefined" && Auth.isAdmin();

    if (catalog.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);padding:3rem 0;">${tSafe("products.empty")}</p>`;
    } else {
      grid.innerHTML = catalog
        .map(
          (product) => `
        <article class="product-card fade-in-up" data-firestore-id="${product.firestoreId}">
          <div class="product-card__image">
            <img src="${product.image || "img/placeholder.png"}" alt="${getLocalizedName(product)}" loading="lazy">
            <div class="product-card__overlay">
              <span class="product-card__view-btn">${quickViewText}</span>
            </div>
          </div>
          <div class="product-card__info">
            <h3 class="product-card__name">${getLocalizedName(product)}</h3>
            <p class="product-card__price">${typeof Currency !== "undefined" ? Currency.format(product.price) : "$" + Number(product.price).toFixed(2)}</p>
            <button
              class="product-card__add-btn"
              data-action="add-to-cart"
              data-firestore-id="${product.firestoreId}"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              ${addToCartText}
            </button>
          </div>
          <div class="product-card__admin-controls${adminMode ? " visible" : ""}">
            <button class="product-card__edit-btn" data-action="edit-product" data-firestore-id="${product.firestoreId}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ${editText}
            </button>
            <button class="product-card__delete-btn" data-action="delete-product" data-firestore-id="${product.firestoreId}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              ${deleteText}
            </button>
          </div>
        </article>`,
        )
        .join("");
    }

    // Make new cards visible if grid already initialised
    if (grid.dataset.rendered) {
      grid.querySelectorAll(".fade-in-up").forEach(function (el) {
        el.classList.add("visible");
      });
    }
    grid.dataset.rendered = "true";
  }

  /* -------- Show/hide admin UI elements -------- */
  function updateAdminUI(isAdmin) {
    // Toggle admin controls on cards
    document.querySelectorAll(".product-card__admin-controls").forEach((el) => {
      el.classList.toggle("visible", isAdmin);
    });
    // Toggle add button
    const addBtn = document.getElementById("addProductBtn");
    if (addBtn) addBtn.classList.toggle("admin-visible", isAdmin);
  }

  /* -------- Find product by firestoreId -------- */
  function getByFirestoreId(firestoreId) {
    return catalog.find((p) => p.firestoreId === firestoreId) || null;
  }

  /* -------- Event delegation -------- */
  function initEvents() {
    // Product grid clicks
    document.getElementById("productsGrid")?.addEventListener("click", (e) => {
      // Add to cart
      const addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn) {
        e.stopPropagation();
        const id = addBtn.dataset.firestoreId;
        const product = getByFirestoreId(id);
        if (product) {
          Cart.addItem({
            id: product.firestoreId,
            name: getLocalizedName(product),
            price: Number(product.price),
            image: product.image,
          });
          addBtn.classList.add("added");
          addBtn.innerHTML = tSafe("products.added");
          setTimeout(() => {
            addBtn.classList.remove("added");
            addBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              ${tSafe("products.addToCart")}`;
          }, 1500);
        }
        return;
      }

      // Edit product (admin)
      const editBtn = e.target.closest('[data-action="edit-product"]');
      if (editBtn) {
        e.stopPropagation();
        const id = editBtn.dataset.firestoreId;
        const product = getByFirestoreId(id);
        if (product) ProductFormModal.openProductForm(product);
        return;
      }

      // Delete product (admin)
      const deleteBtn = e.target.closest('[data-action="delete-product"]');
      if (deleteBtn) {
        e.stopPropagation();
        const id = deleteBtn.dataset.firestoreId;
        DeleteConfirmModal.openDeleteConfirm(id);
        return;
      }

      // Card click → quick view (not on admin controls)
      const card = e.target.closest(".product-card");
      if (card && !e.target.closest(".product-card__admin-controls")) {
        const id = card.dataset.firestoreId;
        QuickViewModal.openModal(id);
      }
    });

  }

  /* -------- Init -------- */
  async function init() {
    await seedIfEmpty();
    await loadFromFirestore();
    renderGrid();
    initEvents();
    updateAdminUI(typeof Auth !== "undefined" && Auth.isAdmin());
  }

  return { init, catalog, getByFirestoreId, renderGrid, updateAdminUI };
})();
