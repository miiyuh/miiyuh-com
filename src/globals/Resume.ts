import { GlobalConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
import { revalidateGlobalHooks } from '../collections/shared'

export const Resume: GlobalConfig = {
  slug: 'resume',
  label: 'Resume',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    ...revalidateGlobalHooks('/'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'resume',
    },
    {
      name: 'pdf',
      label: 'Resume PDF',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
