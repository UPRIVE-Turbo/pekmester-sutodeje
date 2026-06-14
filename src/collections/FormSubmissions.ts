import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Üzenet',
    plural: 'Megkeresések',
  },
  admin: {
    group: 'Megkeresések',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'message', 'createdAt'],
    description: 'A kapcsolatfelvételi űrlapon beérkezett üzenetek.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Név',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefonszám',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Üzenet',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Státusz',
      defaultValue: 'new',
      options: [
        { label: 'Új', value: 'new' },
        { label: 'Felvettük a kapcsolatot', value: 'contacted' },
        { label: 'Lezárva', value: 'done' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
