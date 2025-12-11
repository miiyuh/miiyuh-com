import { GlobalConfig } from 'payload'
import { legalEditor } from '../editor/richTextEditor'

export const TermsOfService: GlobalConfig = {
  slug: 'terms-of-service',
  label: 'Terms of Service',
  admin: {
    description: 'Manage the terms of service page content',
    group: 'Legal',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        description: 'Last updated date (shown at the top of the page)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      localized: true,
      editor: legalEditor,
      admin: {
        description: 'Terms of service content with full rich text support',
      },
    },
  ],
}
