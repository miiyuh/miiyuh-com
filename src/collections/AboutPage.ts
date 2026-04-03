import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'

const AboutPage: CollectionConfig = {
  slug: 'about-entries',
  labels: {
    singular: 'About Entry',
    plural: 'About Entries',
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
    defaultColumns: ['title', 'type', 'startDate', 'endDate', 'isCurrent'],
    description: 'Manage education, experience, and volunteering entries for the About page',
    listSearchableFields: ['title', 'subtitle', 'description'],
    pagination: {
      defaultLimit: 20,
      limits: [10, 20, 50],
    },
    group: 'Pages',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      index: true,
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
      index: true,
      admin: {
        description: 'Main title (e.g., institution name, company, or activity)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      index: true,
      admin: {
        description: 'Subtitle (e.g., degree name, job title)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      index: true,
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
        initCollapsed: true,
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          index: true,
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
      index: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        } catch {
          // Ignore revalidation errors in non-Next contexts (e.g., standalone scripts)
        }
      },
    ],
    afterDelete: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        } catch {
          // Ignore revalidation errors in non-Next contexts (e.g., standalone scripts)
        }
      },
    ],
  },
}

export default AboutPage
