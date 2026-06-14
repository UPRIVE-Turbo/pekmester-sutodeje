# Weboldal frissítés — meglévő oldal hozzáigazítása az új követelményekhez

⚠️ FONTOS: Ez egy MÁR ELKÉSZÜLT oldal frissítése. A vizuális DIZÁJN ALAPJA (layout, színek,
tipográfia, szekciók kinézete) MÁR JÓ — azt NE tervezd újra. De az ANIMÁCIÓKAT az eredeti
AIDesigner designból kell pótolni (lásd lent), mert a régi implementáció kihagyhatta őket.

## Mit kell frissíteni

### 1. Animációk pótlása az EREDETI AIDesigner design alapján
A korai oldalak gyakran kihagyták az AIDesigner design animációit. Ezeket pótolni kell az
eredeti designból — az AIDesigner MCP-nek vannak erre beépített discovery tooljai:

**Hogyan érd el az eredeti designt:**
- Ha van 6-karakteres pairing kód (a felhasználó megnyitja az AIDesigner editort és onnan
  másolja): hívd a `link_editor_session` toolt a kóddal — ezzel rácsatlakozol a meglévő
  projektre.
- Ha van elmentett session ID (`aidesigner-session.txt` vagy `prompt.json`): azzal csatlakozz.
- Csatlakozás után: `list_canvases` → kilistázza a session összes designját (legújabb elöl).
  Válaszd ki az oldalhoz tartozót (vagy `find_canvas` természetes nyelvű kereséssel,
  pl. "a kezdőoldal").
- `get_canvas` a canvas ID-val → megkapod a teljes HTML-t + metaadatot, BENNE az animációkkal,
  átmenetekkel, effektekkel. Vedd át ezeket hűen.
- Alternatíva: `extract_canvas_design` a design adatainak kinyeréséhez.

**Ha semmilyen módon nem érhető el az eredeti design** (nincs kód, nincs session ID):
NE generálj új designt — a meglévő dizájnhoz illő szokásos animációkat add hozzá
(scroll-triggered fade/slide-in szekciónként, hover effektek gombokon/kártyákon/képeken,
finom hero parallax, mikrointerakciók).

**Implementálás:** TISZTA CSS animációk (Tailwind animációk, CSS @keyframes, transition,
IntersectionObserver a scroll-triggerhez). NE használj Framer Motiont vagy más animációs
könyvtárat. A meglévő layout/színek NE
változzanak, csak az animációs réteg kerüljön rá.

### 2. Teljes szerkeszthetőség (CMS)
A weboldal MINDEN tartalma (szöveg, kép, link, adat) legyen szerkeszthető az admin
panelről — semmi hardcode-olt szöveg/kép a komponensekben. Ahol jelenleg hardcode-olt
tartalom van, mozgasd át Payload CMS-be (collection vagy global), és a komponens onnan
olvassa. Minden szekcióhoz tartozzon CMS mező: hero cím/szlogen/CTA, szolgáltatások,
rólunk, galéria, vélemények, kapcsolat, nyitvatartás, social linkek, SEO meta.

### 3. Collection struktúra (TE döntöd el)
Nézd meg a meglévő oldalt és tartalmat, és tervezd meg/igazítsd a hozzá illő
collection/global struktúrát. A collection-ök számát és nevét magad határozd meg.
Ha a jelenlegi struktúra hiányos (nem fed le minden szekciót), egészítsd ki.

### 4. orderable: true — sorrendezhető rekordok
Minden collection-nél ahol a rekordok sorrendje számít a weboldalon (szolgáltatások,
galéria, vélemények, csapat), állítsd be a Payload beépített `orderable: true` opciót a
CollectionConfig-ban — ez drag-and-drop sorrendezést ad az admin panelen (fractional
indexing-gel kezelt `_order` mező). A frontenden `sort: '_order'`-rel kérd le a rekordokat.
Postgres: az `orderable` egy `_order` oszlopot ad — dev-ben `push: true` automatikusan
létrehozza; ha a collection-ben már vannak rekordok és migráció kell, generálj migrációt
(`payload migrate:create` + `migrate`).

### 5. Strukturált admin panel
Rendszerezd átláthatóan:
- `admin.group`-okkal csoportosítsd a collection-öket (pl. "Tartalom", "Beállítások", "Megkeresések")
- magyar `label`-ek minden collection-höz és mezőhöz (singular/plural)
- `admin.useAsTitle` minden collection-nél, hasznos `defaultColumns` a listanézetben
- mezőkhöz magyar `admin.description` ahol segít
- logikus mezősorrend, `admin.position: 'sidebar'` a meta mezőknek
- globálok (Settings, Kapcsolat) a `globals`-ban, ismétlődő tartalom collection-ben

### 6. Képek
Ellenőrizd, hogy minden kép helyén VALÓDI kép van, nem üres placeholder vagy csak alt text.
Ahol üres, tegyél be valódi képet (a meglévő AIDesigner képeket, vagy Unsplash/Pexels stock
fotót a cég iparágához).

## Amit NE csinálj
- NE generálj teljesen ÚJ designt az AIDesigner-ben (a meglévő dizájn-alap marad)
- NE változtasd meg a layout-ot, színeket, tipográfiát, szekció-sorrendet
- NE törölj meglévő működő funkciót (pl. űrlap-beküldés)

## Ellenőrzés
- `npm run build` és `npm run dev` hiba nélkül fut
- a dizájn alapja VÁLTOZATLAN (ugyanúgy néz ki), de az animációk MOST MŰKÖDNEK
- minden tartalom szerkeszthető az admin panelről
- a sorrendezhető collection-ök `orderable: true`-val működnek (drag-and-drop az adminban)
- minden szöveg magyar, űrlap működik, telefonszámok kattinthatóak
