import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
import { revalidateCollectionHooks } from './shared'

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
    group: 'Pages',
    listSearchableFields: ['title', 'subtitle', 'description'],
    pagination: {
      defaultLimit: 20,
      limits: [10, 20, 50],
    },
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
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '1:1 aspect ratio recommended; will be contained within if vertical/horizontal',
      },
    },
    {
      name: 'startDate',
      type: 'text',
      admin: {
        description: 'MM/YYYY format (e.g. "02/2024")',
      },
    },
    {
      name: 'endDate',
      type: 'text',
      admin: {
        description: 'MM/YYYY format (e.g. "05/2024"), or "Present" for ongoing',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        initCollapsed: true,
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
    },
    {
      name: 'order',
      type: 'number',
      index: true,
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
  hooks: {
    ...revalidateCollectionHooks(() => ['/']),
  },
}

export default AboutPage
