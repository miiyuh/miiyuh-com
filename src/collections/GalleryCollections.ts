import { CollectionConfig } from 'payload'

const GalleryCollections: CollectionConfig = {
  slug: 'gallery-collections',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
}

export default GalleryCollections
