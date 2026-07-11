import { GlobalConfig } from 'payload'
import { legalEditor } from '../editor/richTextEditor'
import { isAdmin } from '../access/is-admin'
import { revalidateGlobalHooks } from '../collections/shared'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  label: 'Privacy Policy',
  admin: {
    group: 'Legal',
    components: {
      elements: {
        beforeDocumentControls: ['@/payload-admin/DocumentLastUpdated'],
      },
    },
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    ...revalidateGlobalHooks('/privacy-policy'),
  },
  fields: [
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last updated',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
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
