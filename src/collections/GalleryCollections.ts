import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
import { slugField, revalidateCollectionHooks } from './shared'

const GalleryCollections: CollectionConfig = {
  slug: 'gallery-collections',
  labels: {
    singular: 'Gallery Album',
    plural: 'Gallery Albums',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: ({ req }) => req.user?.role === 'admin',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'imageCount', 'status'],
    group: 'Gallery',
    listSearchableFields: ['title', 'slug', 'description'],
    pagination: {
      defaultLimit: 12,
      limits: [12, 24, 48],
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Album Info',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  index: true,
                  admin: {
                    width: '50%',
                  },
                },
                slugField({
                  fieldName: 'slug',
                  width: '50%',
                }),
              ],
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'albumDate',
                  type: 'date',
                  required: true,
                  index: true,
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayOnly',
                      displayFormat: 'd MMM yyyy',
                    },
                  },
                },
                {
                  name: 'status',
                  type: 'select',
                  index: true,
                  options: [
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                  ],
                  defaultValue: 'draft',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Album Images',
              labels: {
                singular: 'Image',
                plural: 'Images',
              },
              minRows: 1,
              admin: {
                description: 'First 3 images are used as the album cover stack. Drag to reorder.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'tags',
                  type: 'array',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'imageCount',
      type: 'number',
      virtual: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return data?.images?.length || 0
          },
        ],
      },
    },
  ],
  hooks: {
    ...revalidateCollectionHooks((doc) => {
      const paths = ['/gallery']
      if (doc?.slug) {
        paths.push(`/gallery/${doc.slug}`)
      }
      return paths
    }),
  },
}

export default GalleryCollections
