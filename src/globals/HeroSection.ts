import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero szekció',
  admin: {
    group: 'Tartalom',
    description: 'A főoldal legfelső, teljes képernyős szekciója.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Felirat (badge)',
      defaultValue: 'Hódmezővásárhely',
    },
    {
      name: 'titleLine1',
      type: 'text',
      label: 'Cím - 1. sor',
      required: true,
      defaultValue: 'Friss, ropogós,',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Cím - kiemelt sor',
      required: true,
      defaultValue: 'kézzel sütve',
      admin: {
        description: 'Ez a sor dőlt, búzasárga színnel jelenik meg.',
      },
    },
    {
      name: 'titleLine2',
      type: 'text',
      label: 'Cím - 3. sor',
      required: true,
      defaultValue: 'minden nap.',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Alcím szöveg',
      defaultValue:
        'A Pékmester Sütödéje az igazi, hagyományos ízek és a megalkuvást nem tűrő minőség otthona. Kézműves pékáruink egyenesen a kemencéből.',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Gomb felirata',
      defaultValue: 'Nézd meg kínálatunkat',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'Gomb célja (link)',
      defaultValue: '#kinalat',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Háttérkép',
      required: true,
    },
    {
      name: 'marqueeItems',
      type: 'array',
      label: 'Futószalag elemei',
      labels: {
        singular: 'Elem',
        plural: 'Elemek',
      },
      admin: {
        description: 'A hero alatti futó szövegsor elemei.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
