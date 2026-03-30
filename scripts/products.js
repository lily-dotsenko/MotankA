/* ============================================
   PRODUCTS.JS — Product data, grid & modal
   ============================================ */

const Products = (function () {
  "use strict";

  /* -------- Product Data -------- */
  const catalog = [
    {
      id: 1,
      name: "Poltavska Bereghynia",
      price: 140.0,
      image: "img/poltavska_bereghynia.PNG",
      description:
        "This motanka is crafted in the medieval style of the Poltava region, with the utmost attention to the authenticity of the fabrics, style and colours. Materials: authentic antique hand-woven hemp cloth, hand embroidery. An ancient Slavic talisman symbolising harmony and prosperity in the home, and offering general protection against evil forces. Charmed. The shirt is one of the oldest items of clothing, traditionally sewn and embroidered by women. The kersetka \u2013 a sleeveless shirt \u2013 was made from factory-produced fabric, with a high waist and \u2018whiskers on the back\u2019, cut away at the waist and gathered into fine pleats. The right side was wider and overlapped the left. The apron was decorated with embroidery that matched the shirts. The skirt is held up by a belt \u2013 a sash. Height: 45 cm.",
    },
    {
      id: 2,
      name: "Bereghynia",
      price: 120.0,
      image: "img/bereghynia.PNG",
      description:
        "An ancient Slavic talisman for harmony and domestic well-being, offering general protection against evil forces. Imbued with protective and talismanic incantations. The shirt served as the sole item of clothing for both girls and boys. Men\u2019s and women\u2019s shirts were sewn from cloth of varying quality, depending on their intended use and the family\u2019s wealth. As for the colour of the embroidery, red was combined with blue, and less frequently with black. A distinctive feature of Poltava embroidery is the combination of floral and geometric patterns. The upper garment consisted of a kersetka \u2013 a sleeveless tunic made from factory-produced fabric, sewn with a high neckline and \u2018whiskers\u2019 at the back, with a fitted waist gathered into small pleats. The necklace was the most common women\u2019s chest ornament, with the most prized made from expensive natural materials \u2013 coral and pearls.",
    },
    {
      id: 3,
      name: "Volynska Bereghynia",
      price: 150.0,
      image: "img/volynska_bereghynia.PNG",
      description:
        "The traditional Volyn women\u2019s attire comprised: a shirt, a bodice, waistwear (skirts and aprons), outerwear, belts \u2013 \u2018krayky\u2019, footwear and headwear. The entire ensemble was complemented by jewellery. The shirt formed the basis, with patterns dominated by geometric elements \u2013 diamonds or flowers. Embroidery was mainly done in black and red thread. The bodice was worn over the shirt, covering the upper part of the figure, and was usually sleeveless, decorated with strips of different fabric, braid and embroidery. Skirts were often worn in red with ribbons sewn onto the hem. At the waist, the fabric was gathered into small pleats and a sash was sewn on. Over the skirt they wore an apron, made in the same style as the skirt and decorated with embroidery harmonising with the shirts. A significant element supporting the skirt was the belt \u2013 the \u2018krayka\u2019.",
    },
    {
      id: 4,
      name: "Mother and Daughter",
      price: 200.0,
      image: "img/mother_and_doughter.PNG",
      description:
        "The Motanka doll \u2018The Guide\u2019 is a talisman for mother and child. The mother helps her little one take their first steps, whilst supporting them and protecting them from evil and misfortune \u2013 a guide through life. This doll was responsible for the well-being of the home and the relationships between family members. Height: 40 cm and 28 cm.",
    },
    {
      id: 5,
      name: "Odeska Bereghynia",
      price: 160.0,
      image: "img/odeska_bereghynia.PNG",
      description:
        "A guardian spirit from the Odessa region. The traditional Kodym sharafan \u2013 a skirt worn with a bodice, usually in blue or cherry red. The kraika \u2013 a narrow sash used to hold the garment in place, up to 3\u201315 cm wide and up to 3 metres long. Ribbons \u2013 bindi \u2013 multicoloured ribbons with which girls decorated the entire ensemble, attaching them in large numbers to the sash or to the wreath at the nape of the neck. Height: 48 cm.",
    },
    {
      id: 6,
      name: "Poltavska",
      price: 135.0,
      image: "img/poltavska.PNG",
      description:
        "A motanka crafted in the traditional Poltava style, reflecting the rich heritage of the region. The clothing features authentic hand-woven fabrics and delicate embroidery. The shirt is sewn in the age-old tradition, adorned with floral and geometric patterns characteristic of Poltava craft. Red embroidery is combined with blue accents, creating a vibrant yet harmonious look. The kersetka \u2013 a sleeveless upper garment \u2013 is fitted at the waist with fine pleats. The apron is embellished with needlework that echoes the ornamentation of the shirt. A charmed talisman of domestic harmony. Height: 45 cm.",
    },
    {
      id: 7,
      name: "Volynska",
      price: 145.0,
      image: "img/Volynska.PNG",
      description:
        "A motanka dressed in the traditional attire of the Volyn region. The shirt forms the foundation of the ensemble, embroidered with geometric diamond and floral elements in black and red thread. Over the shirt sits a sleeveless bodice, decorated with strips of contrasting fabric and braid. The red skirt features ribbons along the hem, gathered at the waist into small pleats and secured with a sewn-on sash. An apron completes the look, styled to match the skirt and adorned with embroidery that harmonises with the shirt. The ensemble is tied together by the \u2018krayka\u2019 \u2013 the traditional Volyn belt.",
    },
    {
      id: 8,
      name: "Bereghynia Motanka",
      price: 130.0,
      image: "img/bereghynia_motanka.png",
      description:
        "Bereghynia \u2013 the guardian spirit of the home and family. This motanka embodies the ancient Slavic tradition of protection and harmony. Handcrafted from natural materials with careful attention to authentic technique, she carries the energy of generations of women who created these dolls as sacred talismans. Imbued with protective incantations, she watches over the household, shielding it from misfortune and bringing peace to all who dwell within. A timeless symbol of Ukrainian spiritual heritage.",
    },
    {
      id: 9,
      name: "Poltavska Motanka",
      price: 155.0,
      image: "img/poltavska_motanka.png",
      description:
        "A charmed motanka crafted in the beloved Poltava tradition. This doll embodies the rich artistic heritage of the region, with meticulous attention to authentic embroidery and hand-woven fabrics. The layered clothing reflects centuries of craft knowledge \u2013 from the finely pleated kersetka to the embellished apron adorned with patterns matching the shirt. Red and blue embroidery weave together in floral and geometric designs, creating a harmonious symbol of domestic prosperity and protection. A beloved guardian of the hearth and home.",
    },
  ];

  /* -------- Helpers for i18n -------- */
  function getLocalizedName(product) {
    if (typeof I18n !== "undefined" && I18n.getLang() === "uk") {
      var tr = I18n.getProductTranslation(product.id);
      if (tr && tr.name) return tr.name;
    }
    return product.name;
  }

  function getLocalizedDescription(product) {
    if (typeof I18n !== "undefined" && I18n.getLang() === "uk") {
      var tr = I18n.getProductTranslation(product.id);
      if (tr && tr.description) return tr.description;
    }
    return product.description;
  }

  function tSafe(key) {
    return typeof I18n !== "undefined" ? I18n.t(key) : key;
  }

  /* -------- Render Product Grid -------- */
  function renderGrid() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const addToCartText = tSafe("products.addToCart");
    const quickViewText = tSafe("products.quickView");

    grid.innerHTML = catalog
      .map(
        (product) => `
      <article class="product-card fade-in-up" data-product-id="${product.id}">
        <div class="product-card__image">
          <img src="${product.image}" alt="${getLocalizedName(product)}" loading="lazy">
          <div class="product-card__overlay">
            <span class="product-card__view-btn">${quickViewText}</span>
          </div>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__name">${getLocalizedName(product)}</h3>
          <p class="product-card__price">$${product.price.toFixed(2)}</p>
          <button
            class="product-card__add-btn"
            data-action="add-to-cart"
            data-product-id="${product.id}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            ${addToCartText}
          </button>
        </div>
      </article>`,
      )
      .join("");

    // If re-rendering after init, make new cards visible immediately
    if (grid.dataset.rendered) {
      grid.querySelectorAll(".fade-in-up").forEach(function (el) {
        el.classList.add("visible");
      });
    }
    grid.dataset.rendered = "true";
  }

  /* -------- Modal -------- */
  function openModal(productId) {
    const product = catalog.find((p) => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("productModal");
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalImage").alt = getLocalizedName(product);
    document.getElementById("modalName").textContent =
      getLocalizedName(product);
    document.getElementById("modalPrice").textContent =
      `$${product.price.toFixed(2)}`;
    document.getElementById("modalDescription").textContent =
      getLocalizedDescription(product);
    document.getElementById("modalAddToCart").dataset.productId = product.id;
    document.getElementById("modalAddToCart").textContent =
      tSafe("cart.addToCart");

    modal.classList.add("active");
    modal.querySelector(".modal").scrollTop = 0;
    document.body.classList.add("no-scroll");
  }

  function closeModal() {
    document.getElementById("productModal")?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  /* -------- Find product by id -------- */
  function getById(id) {
    return catalog.find((p) => p.id === id) || null;
  }

  /* -------- Event delegation -------- */
  function initEvents() {
    // Product grid clicks (delegation)
    document.getElementById("productsGrid")?.addEventListener("click", (e) => {
      // Add to cart button
      const addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn) {
        e.stopPropagation();
        const id = Number(addBtn.dataset.productId);
        const product = getById(id);
        if (product) {
          Cart.addItem(product);
          // Button feedback
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

      // Card click → open modal
      const card = e.target.closest(".product-card");
      if (card) {
        const id = Number(card.dataset.productId);
        openModal(id);
      }
    });

    // Modal close
    document
      .getElementById("modalClose")
      ?.addEventListener("click", closeModal);
    document.getElementById("productModal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Modal add to cart
    document
      .getElementById("modalAddToCart")
      ?.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.productId);
        const product = getById(id);
        if (product) {
          Cart.addItem(product);
          closeModal();
          Cart.openDrawer();
        }
      });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* -------- Init -------- */
  function init() {
    renderGrid();
    initEvents();
  }

  return { init, catalog, getById, renderGrid };
})();
