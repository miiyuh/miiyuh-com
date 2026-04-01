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
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/terms-of-service')
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
        description: 'Terms of service content with full rich text support',
      },
    },
  ],
}
