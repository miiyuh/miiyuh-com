import { CollectionConfig } from 'payload'

const AboutPage: CollectionConfig = {
  slug: 'about-entries',
  labels: {
    singular: 'About Entry',
    plural: 'About Entries',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startDate', 'endDate', 'isCurrent'],
    description: 'Manage education, experience, and volunteering entries for the About page',
    listSearchableFields: ['title', 'subtitle', 'description'],
    group: 'Pages',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Experience', value: 'experience' },
        { label: 'Volunteering', value: 'volunteering' },
      ],
      admin: {
        description: 'Type of entry',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main title (e.g., institution name, company, or activity)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Subtitle (e.g., degree name, job title)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the entry',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo/image (1:1 aspect ratio, or contained within if vertical/horizontal)',
      },
    },
    {
      name: 'startDate',
      type: 'text',
      admin: {
        description: 'Start date in MM/YYYY format (e.g., "02/2024")',
      },
    },
    {
      name: 'endDate',
      type: 'text',
      admin: {
        description: 'End date in MM/YYYY format (e.g., "05/2024"), or "Present" for ongoing',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this a current/active entry?',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Tags/skills/modules related to this entry',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional external link',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
}

export default AboutPage
