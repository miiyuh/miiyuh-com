import { CollectionConfig } from 'payload'

const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  access: {
    read: () => true, // Allow public read access
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
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'galleryCollection',
      type: 'relationship',
      relationTo: 'gallery-collections',
      required: true,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      required: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default GalleryImages
