import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    preview: (doc) => {
      if (!doc?.slug) return ''
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/projects/${doc.slug}`
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the project or organization',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "shingeki", "2alpha")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Personal Organization',
          value: 'personal',
        },
        {
          label: 'Academic Work',
          value: 'academic',
        },
      ],
      admin: {
        description: 'Category of the project',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown on the projects listing page',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: false,
      admin: {
        description: 'Emoji icon for academic projects (e.g., 🎓, 📄)',
        condition: (data) => data.category === 'academic',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Logo image for personal organizations',
        condition: (data) => data.category === 'personal',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      admin: {
        description: 'Detailed content for the project page',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      admin: {
        description: 'Order in which the project appears (lower numbers appear first)',
      },
      defaultValue: 0,
    },
    {
      name: 'externalLink',
      type: 'text',
      required: false,
      admin: {
        description: 'External URL if this project links outside the site',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this project on the homepage or other prominent locations',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
}

export default Projects
