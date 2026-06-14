import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Kapcsolat & Elérhetőség',
  admin: {
    group: 'Beállítások',
    description: 'A "Kapcsolat" szekció űrlapja és elérhetőségi adatok a főoldalon és a lábjegyzetben.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'formTitle',
      type: 'text',
      label: 'Űrlap címe',
      defaultValue: 'Írj nekünk!',
    },
    {
      name: 'formDescription',
      type: 'textarea',
      label: 'Űrlap leírása',
      defaultValue:
        'Kérdésed van, esetleg nagyobb rendelést adnál le? Küldj üzenetet, és hamarosan felvesszük veled a kapcsolatot.',
    },
    {
      name: 'formSuccessMessage',
      type: 'text',
      label: 'Sikeres beküldés üzenete',
      defaultValue: 'Köszönjük az üzenetet! Hamarosan válaszolunk.',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonszám',
      required: true,
      defaultValue: '+36 70 361 1028',
      admin: {
        description: 'Megjelenítendő formátum, pl. "+36 70 361 1028". A tel: link automatikusan generálódik.',
      },
    },
    {
      name: 'email',
      type: 'text',
      label: 'E-mail cím',
      required: true,
      defaultValue: 'vasarhelyicipo@gmail.com',
    },
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'Facebook link',
      defaultValue: 'https://www.facebook.com/pekmester.sutodeje',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps embed URL',
      admin: {
        description: 'A Google Maps "Térkép beágyazása" iframe src attribútumának értéke.',
      },
    },
  ],
}
