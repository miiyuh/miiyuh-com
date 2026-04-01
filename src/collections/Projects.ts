import { CollectionConfig } from 'payload'
import { projectEditor } from '../editor/richTextEditor'

const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', '_status'],
    description: 'Manage portfolio projects, side projects, and university work',
    listSearchableFields: ['name', 'slug', 'description'],
    pagination: {
      defaultLimit: 10,
      limits: [5, 10, 20, 50],
    },
    preview: (doc) => {
      if (!doc?.slug) return ''
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/projects/${doc.slug}`
    },
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      index: true,
      admin: {
        description: 'Name of the project',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "utilities-my", "library-management")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      options: [
        {
          label: 'Side Project',
          value: 'side-project',
        },
        {
          label: 'University Project',
          value: 'university-project',
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
      localized: true,
      index: true,
      admin: {
        description: 'Short description shown on the projects listing page',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Icon image for the project (1:1 square, like a favicon)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Cover image or logo for the project',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      localized: true,
      editor: projectEditor,
      admin: {
        description: 'Detailed content for the project page',
      },
    },
    // Side project specific fields
    {
      name: 'projectDetails',
      type: 'group',
      admin: {
        description: 'Side project specific fields',
        condition: (data) => data.category === 'side-project',
      },
      fields: [
        {
          name: 'techStack',
          type: 'array',
          admin: {
            description: 'Technologies used in the project',
          },
          fields: [
            {
              name: 'tech',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'In Development', value: 'in-development' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        },
        {
          name: 'githubUrl',
          type: 'text',
          admin: {
            description: 'GitHub repository URL',
          },
        },
        {
          name: 'liveUrl',
          type: 'text',
          admin: {
            description: 'Live project URL',
          },
        },
      ],
    },
    // University project specific fields
    {
      name: 'universityDetails',
      type: 'group',
      admin: {
        description: 'University project specific fields',
        condition: (data) => data.category === 'university-project',
      },
      fields: [
        {
          name: 'course',
          type: 'text',
          admin: {
            description: 'Course name or code',
          },
        },
        {
          name: 'semester',
          type: 'text',
          admin: {
            description: 'Semester (e.g., "Fall 2024")',
          },
        },
        {
          name: 'grade',
          type: 'text',
          admin: {
            description: 'Grade received (optional)',
          },
        },
      ],
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
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          required: false,
          localized: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        console.log(
          `[Audit] Project "${doc.name}" was ${operation}d at ${new Date().toISOString()}`,
        )
      },
    ],
  },
}

export default Projects
