import { CollectionConfig } from 'payload'

const Papers: CollectionConfig = {
  slug: 'papers',
  labels: {
    singular: 'Academic Paper',
    plural: 'Academic Papers',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'status'],
    description: 'Manage academic papers and research documents',
    group: 'Content',
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
              admin: {
                description: 'Title of the academic paper',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL-friendly identifier',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')
                    }
                    return value
                  },
                ],
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
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
              admin: {
                description: 'Brief abstract or summary of the paper',
              },
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
              admin: {
                description: 'Upload the PDF document',
              },
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
              admin: {
                description: 'Link to external publication (e.g., arXiv, IEEE)',
              },
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
              admin: {
                description: 'Digital Object Identifier',
              },
            },
            {
              name: 'conference',
              type: 'text',
              admin: {
                description: 'Conference or journal name',
                condition: (data) => data.category !== 'other',
              },
            },
            {
              name: 'citationCount',
              type: 'number',
              admin: {
                description: 'Number of citations (optional)',
                step: 1,
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Display on homepage or featured section',
              },
            },
            {
              name: 'status',
              type: 'select',
              required: true,
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
    afterChange: [
      async ({ doc, operation }) => {
        console.log(`[Audit] Paper "${doc.title}" was ${operation}d at ${new Date().toISOString()}`)
      },
    ],
  },
}

export default Papers
