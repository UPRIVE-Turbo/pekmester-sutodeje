import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  label: 'Rólunk szekció',
  admin: {
    group: 'Tartalom',
    description: 'A "Rólunk" szekció a főoldalon.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Cím',
      required: true,
      defaultValue: 'Hagyomány és szenvedély minden falatban.',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Szövegbekezdések',
      labels: {
        singular: 'Bekezdés',
        plural: 'Bekezdések',
      },
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'quote',
      type: 'text',
      label: 'Idézet',
      defaultValue: 'A jó kenyér a lisztnél kezdődik, de a szívben érlelődik.',
    },
    {
      name: 'quoteAuthor',
      type: 'text',
      label: 'Idézet szerzője',
      defaultValue: 'A Pékmester',
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      label: 'Nagy kép',
      required: true,
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      label: 'Kis átfedő kép',
      required: true,
    },
  ],
}
