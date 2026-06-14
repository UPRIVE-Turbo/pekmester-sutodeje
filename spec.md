# Pékmester Sütödéje — Weboldal Specifikáció

**Típus:** Egyoldalas magyar nyelvű landing page
**Iparág:** Pékség | **Város:** Hódmezővásárhely
**Web státusz:** Nincs működő weboldal (csak üres placeholder + Facebook)
**Elérhetőség:** Tel: +36 70 361 1028 | Email: vasarhelyicipo@gmail.com | FB: facebook.com/pekmester.sutodeje | Cím: Teleki u. 18, 6800 Hódmezővásárhely

---

Készíts egy magyar nyelvű, egyoldalas landing page-et egy pékségnek:

AZ ÜZLET ADATAI:
- Név: Pékmester Sütödéje
- Cím: Teleki u. 18, 6800 Hódmezővásárhely (további üzletek: Makói út 23, Szabadság tér 58)
- Telefon: +36 70 361 1028
- Email: vasarhelyicipo@gmail.com
- Facebook: facebook.com/pekmester.sutodeje
- Megjegyzés: A jelenlegi pekmester.hu csak egy üres template (nem működő) — teljes újratervezés
- Szolgáltatások: Friss pékáru, kenyér, péksütemény, sütemények

DESIGN:
- Stílus: Meleg, étvágygerjesztő, kézműves, otthonos
- Színek: Meleg barna (#7A4E2D) fejlécekhez, búzasárga (#E0A93C) kiemelésekhez, krém (#F8F1E4) háttérhez, sötétbarna (#3A2A1C) szöveghez
- Betűtípus: Barátságos serif címekhez (pl. Bitter vagy Merriweather), sans-serif szöveghez

FELÉPÍTÉS (egyetlen görgethető oldal):
1. Hero szekció: "Pékmester Sütödéje — Hódmezővásárhely", szlogen ("Friss, ropogós, kézzel sütve minden nap"), CTA: "Nézd meg kínálatunkat"
2. Kínálatunk: Kenyerek, péksütemények, sütemények, friss pékáru — kategóriánként rövid leírás
3. Rólunk: A pékség bemutatkozása, kézműves szemlélet, frissesség
4. Üzleteink: A 3 üzlet címe (Teleki u. 18, Makói út 23, Szabadság tér 58) nyitvatartással
5. Galéria: 6 kép placeholder (pékáruk, sütemények, üzlet)
6. Kapcsolat űrlap: Név, telefon, üzenet (érdeklődés / rendelés)
7. Elérhetőség: Telefon, email, üzletek, Google Maps
8. Lábléc: Facebook, telefon, cím, © 2026

HANGNEM: Meleg, közvetlen, étvágygerjesztő, helyi.

TECHNIKAI: Mobilbarát, reszponzív, képoptimalizálás. Telefonszám kattintható.

---

## Technikai követelmények
- **Stack:** Next.js 14+ (App Router) + Payload CMS 3.x (Postgres / @payloadcms/db-postgres) + Tailwind CSS
- **Nyelv:** Magyar (HU)
- **Hosting:** Vercel-kompatibilis
- **Responsive:** Mobile-first
- **SEO:** Meta tagek, Open Graph, magyar title/description
- **Térkép:** Google Maps embed (Hódmezővásárhely)

## Payload CMS — teljes szerkeszthetőség
- A weboldal MINDEN tartalma (szöveg, kép, link, adat) legyen szerkeszthető az admin panelről — semmi hardcode a komponensekben.
- A collection-ök és globálok számát és nevét TE döntöd el a konkrét design és tartalom alapján — illeszd a valós oldalhoz.
- Strukturált admin: magyar label-ek, `admin.group` csoportok, `useAsTitle`, `defaultColumns`, mező-leírások.
- Az űrlap egy beküldés-collection-be mentsen (név, telefon, email, üzenet, + ami a designon van).
