import { GlobalConfig } from 'payload'
import { legalEditor } from '../editor/richTextEditor'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  label: 'Privacy Policy',
  admin: {
    description: 'Manage the privacy policy page content',
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
        description: 'Privacy policy content with full rich text support',
      },
    },
  ],
}
