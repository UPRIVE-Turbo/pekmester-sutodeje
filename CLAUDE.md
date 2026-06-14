# Pékmester Sütödéje — Weboldal Projekt

Építs egy egyoldalas, magyar nyelvű landing page-et a(z) **Pékmester Sütödéje** (Pékség, Hódmezővásárhely) számára.
Stack: Next.js 14+ (App Router) + Payload CMS 3.x (Postgres / @payloadcms/db-postgres) + Tailwind CSS.

## Lépések

**1. AIDesigner design** — ELŐSZÖR hívd meg a `create_editor_session` toolt a cég nevével, jegyezd meg a session ID-t, MAJD `generate_design` (desktop 1440px, CSAK egy design — a reszponzivitást az AIDesigner kezeli). Finomításhoz `refine_design`. A `spec.md` a teljes design leírás, a `prompt.json` a színek/fontok/céges adatok.

**2. Frontend (PIXEL-PERFECT)** — a Next.js oldal PONTOSAN úgy nézzen ki mint az AIDesigner design. Ne tervezz újra. Tailwind a prompt.json színeivel/fontjaival. Minden szekció és elrendezés azonos a designnal. Az AIDesigner design ÖSSZES animációját és átmenetét (scroll-animációk, hover effektek, fade/slide-in, parallax, mikrointerakciók) implementáld le hűen — ha az AIDesigner exportál animáció-kódot vagy CSS-t, használd azt; ahol nincs explicit kód, reprodukáld az effektet (pl. Framer Motion vagy Tailwind/CSS animációkkal). Semmi animáció ne vesszen el.

**3. Képek** — az AIDesigner képeit használd, vagy ha nincs, VALÓDI stock fotó (Unsplash/Pexels) a cég iparágához. SOHA ne legyen üres `<img>` vagy csak alt text — ez demo oldal ügyfeleknek.

**4. Payload CMS — TE döntöd el a collection-öket** — nézd meg a designt és a tartalmat, és tervezd meg ahhoz illő collection/global struktúrát. A cél: a weboldal MINDEN szövege, képe, linkje, adata szerkeszthető legyen az admin panelről — semmi hardcode-olt tartalom a komponensekben. Minden szekcióhoz tartozzon CMS mező (hero cím/szlogen/CTA, szolgáltatások, rólunk szöveg, galéria, vélemények, kapcsolati adatok, nyitvatartás, social linkek, SEO meta, űrlap-beküldések). A collection-ök számát és nevét magadtól határozd meg a konkrét oldal alapján.

**5. Strukturált admin panel** — rendszerezd átláthatóan:
   - `admin.group`-okkal csoportosítsd a collection-öket (pl. "Tartalom", "Beállítások", "Megkeresések")
   - magyar `label`-ek minden collection-höz és mezőhöz (singular/plural)
   - `admin.useAsTitle` minden collection-nél, hasznos `defaultColumns` a listanézetben
   - mezőkhöz magyar `admin.description` ahol segít
   - logikus mezősorrend, `admin.position: 'sidebar'` a meta mezőknek
   - globálok (Settings, Kapcsolat) a `globals`-ban, ismétlődő tartalom collection-ben

**6. Seed + űrlap** — töltsd fel a CMS-t a prompt.json/spec.md adataival (valódi cégadatok + 3-5 szolgáltatás). Az űrlap server action/API route-tal mentsen a beküldés-collection-be (NE client fetch).

**7. Ellenőrzés** — `npm run build` és `npm run dev` hiba nélkül; design egyezik; minden kép valódi; admin panelről minden szerkeszthető; minden magyar; űrlap működik; telefonszámok kattinthatóak (tel:).

## Postgres
`payload.config.ts`-ben postgresAdapter `DATABASE_URI`-val, dev-ben `push: true`, prod-ban migrációk (`payload migrate:create` + `migrate`).
