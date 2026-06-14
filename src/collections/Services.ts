import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatás',
    plural: 'Kínálatunk',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
    description: 'A "Kínálatunk" szekció kártyái a főoldalon.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Cím',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Leírás',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: 'Ikon',
      admin: {
        description: 'A kártyán megjelenő ikon.',
      },
      options: [
        { label: 'Kenyér', value: 'bread' },
        { label: 'Kifli / Croissant', value: 'croissant' },
        { label: 'Torta / Sütemény', value: 'cake' },
        { label: 'Szív (kézműves)', value: 'heart' },
        { label: 'Búzaszem', value: 'wheat' },
        { label: 'Kávé', value: 'coffee' },
      ],
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
