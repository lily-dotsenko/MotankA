/* ============================================
   PRODUCT-SEED-DATA.JS — Default catalog seeded
   to Firestore on first run
   ============================================ */

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
