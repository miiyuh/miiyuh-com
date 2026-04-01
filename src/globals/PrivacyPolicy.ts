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
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/privacy-policy')
        } catch {
          // Ignore revalidation errors in non-Next contexts (e.g., standalone scripts)
        }
      },
    ],
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
