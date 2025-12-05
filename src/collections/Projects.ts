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
        description: 'Name of the project',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "utilities-my", "library-management")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Side Project',
          value: 'side-project',
        },
        {
          label: 'University Project',
          value: 'university-project',
        },
        {
          label: 'Research Paper',
          value: 'research-paper',
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
        description: 'Lucide icon name (e.g., "Globe", "Wrench", "BookOpen") or emoji fallback',
      },
    },
    {
      name: 'image',
      type: 'relationship',
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
      admin: {
        description: 'Detailed content for the project page',
      },
    },
    // Research paper specific fields
    {
      name: 'paperDetails',
      type: 'group',
      admin: {
        description: 'Research paper specific fields',
        condition: (data) => data.category === 'research-paper',
      },
      fields: [
        {
          name: 'author',
          type: 'text',
          defaultValue: 'miiyuh',
          admin: {
            description: 'Paper author',
          },
        },
        {
          name: 'year',
          type: 'text',
          admin: {
            description: 'Publication year',
          },
        },
        {
          name: 'abstract',
          type: 'textarea',
          admin: {
            description: 'Paper abstract',
          },
        },
        {
          name: 'keywords',
          type: 'array',
          admin: {
            description: 'Keywords/tags for the paper',
          },
          fields: [
            {
              name: 'keyword',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'pages',
          type: 'number',
          admin: {
            description: 'Number of pages',
          },
        },
        {
          name: 'pdfFile',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload the PDF file',
          },
        },
      ],
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
