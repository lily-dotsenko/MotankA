/* ============================================
   PRODUCTS.JS — Product data (Firestore), grid & modal
   ============================================ */

const Products = (function () {
  "use strict";

  /* -------- In-memory catalog (populated from Firestore) -------- */
  let catalog = [];

  /* -------- Seed data (9 original products) — written once to Firestore -------- */
  const SEED_PRODUCTS = [
    {
      id: "seed-1",
      name: "Poltavska Bereghynia",
      nameUk: "Полтавська Берегиня",
      price: 140.0,
      image: "img/poltavska_bereghynia.PNG",
      description:
        "This motanka is crafted in the medieval style of the Poltava region, with the utmost attention to the authenticity of the fabrics, style and colours. Materials: authentic antique hand-woven hemp cloth, hand embroidery. An ancient Slavic talisman symbolising harmony and prosperity in the home, and offering general protection against evil forces. Charmed. The shirt is one of the oldest items of clothing, traditionally sewn and embroidered by women. The kersetka \u2013 a sleeveless shirt \u2013 was made from factory-produced fabric, with a high waist and \u2018whiskers on the back\u2019, cut away at the waist and gathered into fine pleats. The right side was wider and overlapped the left. The apron was decorated with embroidery that matched the shirts. The skirt is held up by a belt \u2013 a sash. Height: 45 cm.",
      descriptionUk:
        "Ця мотанка виготовлена в середньовічному стилі Полтавського регіону з особливою увагою до автентичності тканин, стилю та кольорів. Матеріали: автентична старовинна ручнотканна конопляна тканина, ручна вишивка. Давній слов'янський оберег, що символізує гармонію та процвітання в домі, захисний від злих сил. Зашептана.",
    },
    {
      id: "seed-2",
      name: "Bereghynia",
      nameUk: "Берегиня",
      price: 120.0,
      image: "img/bereghynia.PNG",
      description:
        "An ancient Slavic talisman for harmony and domestic well-being, offering general protection against evil forces. Imbued with protective and talismanic incantations. The shirt served as the sole item of clothing for both girls and boys. Men\u2019s and women\u2019s shirts were sewn from cloth of varying quality, depending on their intended use and the family\u2019s wealth. As for the colour of the embroidery, red was combined with blue, and less frequently with black. A distinctive feature of Poltava embroidery is the combination of floral and geometric patterns.",
      descriptionUk:
        "Давній слов'янський оберег на гармонію та домашнє благополуччя, що забезпечує загальний захист від злих сил. Наповнена захисними та охоронними замовляннями.",
    },
    {
      id: "seed-3",
      name: "Volynska Bereghynia",
      nameUk: "Волинська Берегиня",
      price: 150.0,
      image: "img/volynska_bereghynia.PNG",
      description:
        "The traditional Volyn women\u2019s attire comprised: a shirt, a bodice, waistwear (skirts and aprons), outerwear, belts \u2013 \u2018krayky\u2019, footwear and headwear. The entire ensemble was complemented by jewellery. The shirt formed the basis, with patterns dominated by geometric elements \u2013 diamonds or flowers. Embroidery was mainly done in black and red thread.",
      descriptionUk:
        "Традиційний волинський жіночий одяг включав: сорочку, корсет, поясний одяг (спідниці та фартухи), верхній одяг, пояси — 'крайки', взуття та головні убори.",
    },
    {
      id: "seed-4",
      name: "Mother and Daughter",
      nameUk: "Мати та Донька",
      price: 200.0,
      image: "img/mother_and_doughter.PNG",
      description:
        "The Motanka doll \u2018The Guide\u2019 is a talisman for mother and child. The mother helps her little one take their first steps, whilst supporting them and protecting them from evil and misfortune \u2013 a guide through life. This doll was responsible for the well-being of the home and the relationships between family members. Height: 40 cm and 28 cm.",
      descriptionUk:
        "Лялька-мотанка 'Провідниця' — оберег для матері та дитини. Мати допомагає своєму малюку зробити перші кроки, підтримує та захищає від лиха — провідниця по життю. Висота: 40 см та 28 см.",
    },
    {
      id: "seed-5",
      name: "Odeska Bereghynia",
      nameUk: "Одеська Берегиня",
      price: 160.0,
      image: "img/odeska_bereghynia.PNG",
      description:
        "A guardian spirit from the Odessa region. The traditional Kodym sharafan \u2013 a skirt worn with a bodice, usually in blue or cherry red. The kraika \u2013 a narrow sash used to hold the garment in place, up to 3\u201315 cm wide and up to 3 metres long. Height: 48 cm.",
      descriptionUk:
        "Дух-охоронець Одеського регіону. Традиційний кодимський сарафан — спідниця з корсажем, зазвичай синього або вишневого кольору. Висота: 48 см.",
    },
    {
      id: "seed-6",
      name: "Poltavska",
      nameUk: "Полтавська",
      price: 135.0,
      image: "img/poltavska.PNG",
      description:
        "A motanka crafted in the traditional Poltava style, reflecting the rich heritage of the region. The clothing features authentic hand-woven fabrics and delicate embroidery. Red embroidery is combined with blue accents, creating a vibrant yet harmonious look. A charmed talisman of domestic harmony. Height: 45 cm.",
      descriptionUk:
        "Мотанка, виготовлена в традиційному полтавському стилі, що відображає багату спадщину регіону. В одязі використані автентичні ручнотканні тканини та ніжна вишивка. Висота: 45 см.",
    },
    {
      id: "seed-7",
      name: "Volynska",
      nameUk: "Волинська",
      price: 145.0,
      image: "img/Volynska.PNG",
      description:
        "A motanka dressed in the traditional attire of the Volyn region. The shirt forms the foundation of the ensemble, embroidered with geometric diamond and floral elements in black and red thread. Over the shirt sits a sleeveless bodice, decorated with strips of contrasting fabric and braid.",
      descriptionUk:
        "Мотанка, одягнена в традиційний одяг Волинського регіону. Сорочка є основою ансамблю, вишита геометричними ромбами та квітковими елементами чорно-червоною ниткою.",
    },
    {
      id: "seed-8",
      name: "Bereghynia Motanka",
      nameUk: "Берегиня Мотанка",
      price: 130.0,
      image: "img/bereghynia_motanka.png",
      description:
        "Bereghynia \u2013 the guardian spirit of the home and family. This motanka embodies the ancient Slavic tradition of protection and harmony. Handcrafted from natural materials with careful attention to authentic technique, she carries the energy of generations of women who created these dolls as sacred talismans.",
      descriptionUk:
        "Берегиня — дух-охоронець дому та родини. Ця мотанка втілює давню слов'янську традицію захисту та гармонії. Виготовлена вручну з природних матеріалів з ретельною увагою до автентичної техніки.",
    },
    {
      id: "seed-9",
      name: "Poltavska Motanka",
      nameUk: "Полтавська Мотанка",
      price: 155.0,
      image: "img/poltavska_motanka.png",
      description:
        "A charmed motanka crafted in the beloved Poltava tradition. This doll embodies the rich artistic heritage of the region, with meticulous attention to authentic embroidery and hand-woven fabrics. A beloved guardian of the hearth and home.",
      descriptionUk:
        "Зашептана мотанка, виготовлена в улюбленій полтавській традиції. Ця лялька втілює багату художню спадщину регіону з ретельною увагою до автентичної вишивки та ручнотканних тканин.",
    },
  ];

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

  /* -------- Product Form Modal -------- */
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

    // Image preview
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
      ? editProduct(editingFirestoreId, data)
      : addProduct(data);

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

  /* -------- Delete Confirm Modal -------- */
  let pendingDeleteId = null;

  function openDeleteConfirm(firestoreId) {
    pendingDeleteId = firestoreId;
    const product = getByFirestoreId(firestoreId);
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

    deleteProduct(pendingDeleteId)
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

  /* -------- Modal (quick view) -------- */
  function openModal(firestoreId) {
    const product = getByFirestoreId(firestoreId);
    if (!product) return;

    const modal = document.getElementById("productModal");
    document.getElementById("modalImage").src = product.image || "";
    document.getElementById("modalImage").alt = getLocalizedName(product);
    document.getElementById("modalName").textContent = getLocalizedName(product);
    document.getElementById("modalPrice").textContent = typeof Currency !== "undefined" ? Currency.format(product.price) : "$" + Number(product.price).toFixed(2);
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
        if (product) openProductForm(product);
        return;
      }

      // Delete product (admin)
      const deleteBtn = e.target.closest('[data-action="delete-product"]');
      if (deleteBtn) {
        e.stopPropagation();
        const id = deleteBtn.dataset.firestoreId;
        openDeleteConfirm(id);
        return;
      }

      // Card click → quick view (not on admin controls)
      const card = e.target.closest(".product-card");
      if (card && !e.target.closest(".product-card__admin-controls")) {
        const id = card.dataset.firestoreId;
        openModal(id);
      }
    });

    // Quick view modal close
    document.getElementById("modalClose")?.addEventListener("click", closeModal);
    document.getElementById("productModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Quick view modal add to cart
    document.getElementById("modalAddToCart")?.addEventListener("click", (e) => {
      const id = e.target.dataset.firestoreId;
      const product = getByFirestoreId(id);
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

    // Add product button
    document.getElementById("addProductBtn")?.addEventListener("click", () => {
      openProductForm(null);
    });

    // Product form modal
    document.getElementById("productFormClose")?.addEventListener("click", closeProductForm);
    document.getElementById("productFormCancel")?.addEventListener("click", closeProductForm);
    document.getElementById("productFormModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeProductForm();
    });
    document.getElementById("productForm")?.addEventListener("submit", handleProductFormSubmit);

    // Image URL preview update
    document.getElementById("pfImage")?.addEventListener("input", (e) => {
      updateImagePreview(e.target.value);
    });

    // Delete confirm modal
    document.getElementById("deleteCancelBtn")?.addEventListener("click", closeDeleteConfirm);
    document.getElementById("deleteConfirmBtn")?.addEventListener("click", handleDeleteConfirm);
    document.getElementById("deleteConfirmModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeDeleteConfirm();
    });

    // Close all modals on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeProductForm();
        closeDeleteConfirm();
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
