import { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
    skipValidation: false,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      required: false,
      localized: true,
    },
    {
      name: 'focalPoint',
      type: 'point',
      admin: {
        description: 'Set focal point for responsive image cropping',
        condition: (data) => {
          return data?.mimeType?.startsWith('image/')
        },
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        console.log(
          `[Audit] Media "${doc.filename}" was ${operation}d at ${new Date().toISOString()}`,
        )
      },
    ],
  },
}

export default Media
