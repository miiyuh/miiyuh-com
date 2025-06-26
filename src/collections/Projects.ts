import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
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
      label: 'Project Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "my-project")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Project Content',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        {
          label: 'Academic',
          value: 'academic',
        },
        {
          label: 'Personal',
          value: 'personal',
        },
        {
          label: 'Professional',
          value: 'professional',
        },
        {
          label: 'Open Source',
          value: 'open-source',
        },
        {
          label: 'Research Papers',
          value: 'papers',
        },
      ],
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'List the technologies, languages, or tools used in this project',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Main image for this project',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
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
      admin: {
        description: 'Additional images showcasing the project',
      },
    },
    {
      name: 'links',
      type: 'group',
      label: 'Project Links',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
          admin: {
            placeholder: 'https://github.com/username/repo',
          },
        },
        {
          name: 'demo',
          type: 'text',
          label: 'Live Demo URL',
          admin: {
            placeholder: 'https://project-demo.com',
          },
        },
        {
          name: 'documentation',
          type: 'text',
          label: 'Documentation URL',
          admin: {
            placeholder: 'https://docs.project.com',
          },
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Leave empty if project is ongoing',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        description: 'Display this project prominently on the projects page',
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
