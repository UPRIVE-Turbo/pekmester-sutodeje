import type { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'stores',
  labels: {
    singular: 'Üzlet',
    plural: 'Üzleteink',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'name',
    defaultColumns: ['name', 'address', 'order'],
    description: 'Az "Üzleteink" szekció kártyái a főoldalon.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Üzlet neve',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Alcím',
      admin: {
        description: 'Pl. "Sütöde & Mintabolt"',
      },
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Cím',
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Nyitvatartás',
      labels: {
        singular: 'Nyitvatartási sor',
        plural: 'Nyitvatartási sorok',
      },
      fields: [
        {
          name: 'days',
          type: 'text',
          required: true,
          label: 'Napok',
          admin: {
            description: 'Pl. "Hétfő - Péntek"',
          },
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'Időpont',
          admin: {
            description: 'Pl. "05:30 - 18:00" vagy "Zárva"',
          },
        },
      ],
    },
    {
      name: 'showOpenBadge',
      type: 'checkbox',
      label: 'Nyitva jelzés megjelenítése',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Zöld pulzáló jelzés a kártyán (pl. a főüzletnek).',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sorrend',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Kisebb szám előrébb jelenik meg.',
      },
    },
  ],
}
