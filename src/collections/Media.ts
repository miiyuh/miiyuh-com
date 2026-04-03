import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media File',
    plural: 'Media Library',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: isAdmin,
  },
  admin: {
    description: 'Upload and manage images and documents',
    group: 'Media',
    pagination: {
      defaultLimit: 12,
      limits: [12, 24, 48],
    },
  },
  upload: {
    // Uploads are handled by R2 in production via the s3Storage plugin
    // In development, files are stored locally
    staticDir: process.env.R2_BUCKET_NAME ? undefined : 'media',
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
}

export default Media
