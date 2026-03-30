Ось акуратно перекладений і структурований PRD англійською — адаптований під реальний продакшн (не просто дослівний переклад, а більш «product-style» документ 👇)

---

# 📄 PRD: Motanka Dolls E-commerce Website

## 1. 🧭 Overview

**Product Name:**
Motanka Dolls Online Store

**Goal:**
Build a modern, visually appealing e-commerce website for selling traditional Ukrainian Motanka dolls, allowing users to browse products, view details, and add them to a cart.

**Target Audience:**

- People interested in Ukrainian culture
- Tourists / international buyers
- Customers looking for handmade gifts

---

## 2. 🎯 Core Features (MVP)

### 🔹 2.1 Navbar

**Components:**

- Logo
- Navigation links:
  - Home
  - Catalog
  - About
  - Contacts

- Cart icon

---

### 🔹 2.2 Hero Section

**Content:**

- Large image or background video
- Headline (e.g. _"Tradition that comes to life"_)
- Subheadline
- CTA button: **“Explore Collection”**

---

### 🔹 2.3 Product Listing

**Product Cards:**

- Image
- Title
- Price
- “Add to Cart” button

**Behavior:**

- Clicking on a product → navigates to product details page

---

### 🔹 2.4 Product Details Page

**Content:**

- Image gallery
- Product name
- Price
- Description
- “Add to Cart” button

**Optional:**

- Quantity selector

---

### 🔹 2.5 Cart

**Functionality:**

- List of added products
- Quantity adjustment
- Remove items
- Total price calculation

**UI Options:**

- Drawer (recommended for UX)
- Or dedicated page

---

### 🔹 2.6 Video Section

**Content:**

- Embedded video (YouTube or local)
- Short description/story

---

### 🔹 2.7 Contact / Registration Form

**Fields:**

- Name
- Email
- Message

**Integration:**

- Form submission via Formspree

---

### 🔹 2.8 Footer

**Content:**

- Contact info
- Social media links
- Copyright

---

## 3. 🧱 Tech Stack

### Frontend:

- Next.js
- Tailwind CSS
- shadcn/ui

### Other:

- Formspree (form handling)
- Zustand or React Context (cart state management)

---

## 4. 🧩 Page Architecture

```
/
├── Home
│   ├── Hero
│   ├── Products Preview
│   ├── Video Section
│   ├── Contact Form
│
├── /products
│   ├── Product List
│
├── /products/[id]
│   ├── Product Details
│
├── /cart
│   ├── Cart Page
```

---

## 5. 🔄 User Flow

1. User lands on homepage
2. Sees hero section → clicks “Explore Collection”
3. Browses products
4. Clicks on a product → opens product page
5. Adds product to cart
6. Opens cart
7. (Future step: checkout)

---

## 6. 🎨 UI/UX Principles

- Minimalist + ethnic aesthetic
- Large, high-quality images (critical for handmade products)
- Emotional storytelling (not just selling — conveying meaning)
- Mobile-first design

---

## 7. ⚙️ Non-functional Requirements

- Fast loading (SSR/SSG via Next.js)
- SEO optimized
- Fully responsive
- Simple and intuitive UX

---

## 8. 🚀 Future Improvements (Phase 2)

- Online payments (Stripe / LiqPay)
- User authentication
- Admin panel (product management)
- Reviews & ratings
- Filters & sorting

---

## 9. 📌 Open Questions

- Where will product data be stored? (JSON / CMS / Database)
- Is multi-language support required?
- Will shipping be integrated?

---

## 10. 🧠 Recommendations

- Start with **static JSON data** → fastest MVP
- Use **localStorage + Zustand** for cart
- Optimize images via `next/image`
- Avoid backend complexity at the beginning
