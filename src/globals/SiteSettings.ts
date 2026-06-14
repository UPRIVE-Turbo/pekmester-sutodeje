import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Általános beállítások',
  admin: {
    group: 'Beállítások',
    description: 'Navigáció, szekciócímek, lábjegyzet és SEO beállítások.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Rövid név (menü, lábjegyzet)',
      defaultValue: 'Pékmester',
      required: true,
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigációs linkek',
      labels: {
        singular: 'Link',
        plural: 'Linkek',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            description: 'Pl. "#kinalat"',
          },
        },
      ],
      defaultValue: [
        { label: 'Kínálat', href: '#kinalat' },
        { label: 'Rólunk', href: '#rolunk' },
        { label: 'Üzleteink', href: '#uzletek' },
        { label: 'Kapcsolat', href: '#kapcsolat' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Kínálatunk szekció',
      fields: [
        {
          name: 'servicesTitle',
          type: 'text',
          label: 'Cím',
          defaultValue: 'Mindennapi kenyerünk',
        },
        {
          name: 'servicesDescription',
          type: 'textarea',
          label: 'Leírás',
          defaultValue:
            'Pékmestereink hajnaltól dolgoznak, hogy a legjobb minőségű pékáru kerüljön a család asztalára. Válogass hagyományos és különleges termékeink közül.',
        },
        {
          name: 'servicesLinkText',
          type: 'text',
          label: 'Link szövege',
          defaultValue: 'Rendelés leadása',
        },
        {
          name: 'servicesLinkHref',
          type: 'text',
          label: 'Link célja',
          defaultValue: '#kapcsolat',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Üzleteink szekció',
      fields: [
        {
          name: 'storesEyebrow',
          type: 'text',
          label: 'Felirat (kis cím)',
          defaultValue: 'Hol találsz minket?',
        },
        {
          name: 'storesTitle',
          type: 'text',
          label: 'Cím',
          defaultValue: 'Üzleteink Hódmezővásárhelyen',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Galéria szekció',
      fields: [
        {
          name: 'galleryTitle',
          type: 'text',
          label: 'Cím',
          defaultValue: 'Képek a mindennapokból',
        },
        {
          name: 'galleryDescription',
          type: 'textarea',
          label: 'Leírás',
          defaultValue:
            'Belepillantás a kulisszák mögé: ropogós héjak, foszlós bélzetek és szorgos kezek.',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Lábjegyzet',
      fields: [
        {
          name: 'footerText',
          type: 'text',
          label: 'Copyright szöveg',
          defaultValue: '© 2026 Pékmester Sütödéje. Hódmezővásárhely. Minden jog fenntartva.',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        {
          name: 'seo',
          type: 'group',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta cím',
              defaultValue: 'Pékmester Sütödéje | Friss pékáru Hódmezővásárhelyen',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta leírás',
              defaultValue:
                'Friss, ropogós, kézzel sütött kenyér, péksütemény és sütemény Hódmezővásárhelyen. Három üzlet, mindennapi frissesség.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Megosztási kép (Open Graph)',
            },
          ],
        },
      ],
    },
  ],
}
