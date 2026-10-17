import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
import { resolveMediaSrc } from '../utils/media'
import { deleteJxlAfterDelete, generateJxlAfterChange } from './shared/media-jxl'

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
    admin: ({ req }) => req.user?.role === 'admin',
  },
  admin: {
    group: 'Media',
    pagination: {
      defaultLimit: 12,
      limits: [12, 24, 48],
    },
  },
  hooks: {
    afterChange: [generateJxlAfterChange],
    afterDelete: [deleteJxlAfterDelete],
  },
  upload: {
    staticDir: process.env.R2_BUCKET_NAME ? undefined : 'media',
    // Smallest JPEG XL variant, falling back to the regular thumbnail until
    // the variants exist (they are generated just after upload).
    adminThumbnail: ({ doc }) => {
      const jxl = (doc.jxl as { filename?: string }[] | undefined)?.[0]
      if (jxl?.filename) return resolveMediaSrc({ filename: jxl.filename }) ?? null
      const thumb = (doc.sizes as { thumbnail?: { url?: string | null } } | undefined)?.thumbnail
      return thumb?.url ?? (doc.url as string | undefined) ?? null
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
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
    // Explicit list instead of `image/*`: the prebuilt sharp has no libjxl,
    // so a JPEG XL (or HEIC) original could not be resized. Upload JPEG/PNG
    // and the JXL variants are generated automatically.
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
      'image/tiff',
      'application/pdf',
    ],
  },
  fields: [
    {
      name: 'jxl',
      label: 'JPEG XL variants',
      type: 'array',
      admin: {
        readOnly: true,
        initCollapsed: true,
        description: 'Generated automatically a few seconds after upload. Served to browsers that support JPEG XL.',
      },
      fields: [
        { name: 'filename', type: 'text', required: true },
        { name: 'width', type: 'number', required: true },
        { name: 'height', type: 'number', required: true },
        { name: 'filesize', type: 'number' },
      ],
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describes the image for screen readers and accessibility. Required for every upload.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      required: false,
      localized: true,
      admin: {
        description: 'Optional visible caption or credit shown beneath the image where it is displayed on the site.',
      },
    },
    {
      name: 'focalPoint',
      label: 'Focal point',
      type: 'point',
      admin: {
        condition: (data) => {
          return data?.mimeType?.startsWith('image/')
        },
      },
    },
  ],
}

export default Media
