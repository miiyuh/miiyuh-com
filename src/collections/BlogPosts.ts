import { CollectionConfig } from 'payload'
import { blogEditor } from '../editor/richTextEditor'

const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'featured', '_status'],
    description: 'Create and manage blog posts with rich content',
    listSearchableFields: ['title', 'slug', 'excerpt'],
    preview: (doc) => {
      if (!doc?.slug || !doc?.publishedAt) return ''
      const date = new Date(doc.publishedAt as string)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/blog/${year}/${month}/${doc.slug}`
    },
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
          label: 'Content',
          description: 'Main blog post content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    width: '60%',
                    placeholder: 'Enter post title...',
                  },
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: {
                    width: '40%',
                    description: 'URL-friendly identifier',
                    placeholder: 'my-blog-post',
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
              ],
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                placeholder: 'Brief summary of the post...',
                description: 'Short description shown in listings',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Featured image for the post (16:9 recommended)',
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
              editor: blogEditor,
            },
          ],
        },
        {
          label: 'Settings',
          description: 'Post settings and metadata',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'publishedAt',
                  type: 'date',
                  required: true,
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                    description: 'Publication date and time',
                  },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                    description: 'Display on homepage as featured post',
                  },
                },
              ],
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                description: 'Add tags to categorize the post',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., technology, tutorial',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Search engine optimization settings',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'Custom title for search engines (defaults to post title)',
                placeholder: 'Custom SEO title...',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Description for search engines (defaults to excerpt)',
                placeholder: 'Custom meta description...',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        console.log(`[Audit] Blog post "${doc.title}" was ${operation}d at ${new Date().toISOString()}`)
      },
    ],
  },
}

export default BlogPosts
