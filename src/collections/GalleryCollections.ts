import { CollectionConfig } from 'payload'

const GalleryCollections: CollectionConfig = {
  slug: 'gallery-collections',
  labels: {
    singular: 'Gallery Album',
    plural: 'Gallery Albums',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'imageCount', 'status', 'updatedAt'],
    description: 'Create and manage photo albums with multiple images',
    group: 'Gallery',
    listSearchableFields: ['title', 'slug', 'description'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Album Info',
          description: 'Basic album information',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: 'e.g., Japan Trip 2025',
                  },
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: {
                    width: '50%',
                    description: 'URL-friendly identifier (e.g., japan-trip-2025)',
                    placeholder: 'japan-trip-2025',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ value, data }) => {
                        // Auto-generate slug from title if empty
                        if (!value && data?.title) {
                          return data.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '')
                        }
                        return value
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              required: false,
              admin: {
                placeholder: 'Brief description of this album...',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'displayOrder',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    width: '50%',
                    description: 'Lower numbers appear first',
                  },
                },
                {
                  name: 'status',
                  type: 'select',
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
          description: 'Upload and manage album images',
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
                description: 'First three (3) images will be used as album cover stack. Drag to reorder.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description: 'Select or upload an image',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: false,
                      admin: {
                        width: '50%',
                        placeholder: 'Image title (optional)',
                      },
                    },
                    {
                      name: 'displayOrder',
                      type: 'number',
                      defaultValue: 0,
                      admin: {
                        width: '50%',
                        description: 'Order within album',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: false,
                  admin: {
                    placeholder: 'Image description (shown in lightbox)',
                  },
                },
                {
                  name: 'tags',
                  type: 'array',
                  admin: {
                    description: 'Add tags for filtering',
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                    },
                  ],
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
    // Virtual field to show image count in list view
    {
      name: 'imageCount',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Total images in this album',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return siblingData?.images?.length || 0
          },
        ],
        afterRead: [
          ({ data }) => {
            return data?.images?.length || 0
          },
        ],
      },
    },
  ],
  hooks: {
    // Auto-set displayOrder for new images
    beforeChange: [
      ({ data }) => {
        if (data?.images) {
          data.images = data.images.map((img: { displayOrder?: number }, index: number) => ({
            ...img,
            displayOrder: img.displayOrder ?? index,
          }))
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        console.log(
          `[Audit] Gallery "${doc.title}" was ${operation}d at ${new Date().toISOString()}`,
        )
      },
    ],
  },
}

export default GalleryCollections
