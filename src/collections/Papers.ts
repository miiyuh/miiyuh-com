import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
import { slugField, revalidateCollectionHooks } from './shared'

const Papers: CollectionConfig = {
  slug: 'papers',
  labels: {
    singular: 'Academic Paper',
    plural: 'Academic Papers',
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
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
    group: 'Content',
    listSearchableFields: ['title', 'slug', 'abstract'],
    pagination: {
      defaultLimit: 10,
      limits: [5, 10, 20, 50],
    },
    preview: (doc) => {
      if (!doc?.slug) return ''
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/papers/${doc.slug}`
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Paper Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              index: true,
            },
            slugField({
              fieldName: 'slug',
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  index: true,
                  options: [
                    { label: 'Computer Science', value: 'computer-science' },
                    { label: 'Data Science', value: 'data-science' },
                    { label: 'Machine Learning', value: 'machine-learning' },
                    { label: 'Software Engineering', value: 'software-engineering' },
                    { label: 'Other', value: 'other' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'publishedDate',
                  type: 'date',
                  required: true,
                  index: true,
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
              ],
            },
            {
              name: 'abstract',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'authors',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'affiliation',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Documents',
          fields: [
            {
              name: 'pdfFile',
              type: 'upload',
              relationTo: 'media',
              required: true,
              filterOptions: {
                mimeType: { contains: 'pdf' },
              },
            },
            {
              name: 'supplementaryFiles',
              type: 'array',
              label: 'Supplementary Files',
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'externalLink',
              type: 'text',
            },
          ],
        },
        {
          label: 'Metadata',
          fields: [
            {
              name: 'keywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'doi',
              type: 'text',
              label: 'DOI',
            },
            {
              name: 'conference',
              type: 'text',
              admin: {
                condition: (data) => data.category !== 'other',
              },
            },
            {
              name: 'citationCount',
              type: 'number',
              admin: {
                step: 1,
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              index: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    ...revalidateCollectionHooks((doc) => {
      const paths = ['/papers']
      if (doc?.slug) {
        paths.push(`/papers/${doc.slug}`)
      }
      return paths
    }),
  },
}

export default Papers
