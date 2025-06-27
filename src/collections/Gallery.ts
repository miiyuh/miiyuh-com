import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Item',
    plural: 'Gallery',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        {
          label: 'Photography',
          value: 'photography',
        },
        {
          label: 'Artwork',
          value: 'artwork',
        },
        {
          label: 'Digital Art',
          value: 'digital-art',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'photography',
      required: true,
    },
    {
      name: 'subcategory',
      type: 'text',
      label: 'Subcategory',
      admin: {
        description: 'Optional subcategory (e.g., "2025 Japan Trip", "Attack on Titan", etc.)',
      },
    },
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      defaultValue: () => new Date().getFullYear(),
      admin: {
        description: 'Year when the content was created or captured',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 0, // Allow empty arrays for testing
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
        },
      ],
      required: false, // Make the entire images array optional
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        description: 'Display this item prominently on the gallery page',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Add tags to help categorize and search for this item',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
