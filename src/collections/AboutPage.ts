import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
import { revalidateCollectionHooks } from './shared'
import { simpleEditor } from '../editor/richTextEditor'

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
    group: 'Content',
    listSearchableFields: ['title', 'subtitle'],
    pagination: {
      defaultLimit: 20,
      limits: [10, 20, 50],
    },
  },
  orderable: true,
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
      label: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Organization / institution',
      admin: {
        description:
          'Company name (Experience), institution (Education), or organization name (Volunteering) — depends on the entry type above.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: simpleEditor,
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
      label: 'Start date',
      admin: {
        description: 'MM/YYYY format (e.g. "02/2024")',
      },
    },
    {
      name: 'endDate',
      type: 'text',
      label: 'End date',
      admin: {
        description: 'MM/YYYY format (e.g. "05/2024"), or "Present" for ongoing',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      label: 'Currently active',
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
  ],
  hooks: {
    ...revalidateCollectionHooks(() => ['/']),
  },
}

export default AboutPage
