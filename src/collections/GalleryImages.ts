import type { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  labels: {
    singular: 'Galéria kép',
    plural: 'Galéria',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'image', 'order'],
    description: 'A "Galéria" szekció képei a főoldalon.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Kép',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Leírás (alt szöveg)',
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
