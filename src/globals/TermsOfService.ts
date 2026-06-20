import { GlobalConfig } from 'payload'
import { legalEditor } from '../editor/richTextEditor'
import { isAdmin } from '../access/is-admin'
import { revalidateGlobalHooks } from '../collections/shared'

export const TermsOfService: GlobalConfig = {
  slug: 'terms-of-service',
  label: 'Terms of Service',
  admin: {
    group: 'Legal',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    ...revalidateGlobalHooks('/terms-of-service'),
  },
  fields: [
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
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
    },
  ],
}
