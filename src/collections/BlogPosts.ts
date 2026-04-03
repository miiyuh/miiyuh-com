import { CollectionConfig } from 'payload'
import { blogEditor } from '../editor/richTextEditor'
import { isAdmin } from '../access/is-admin'

const revalidateBlogRoutes = async (
  doc?: {
    slug?: string
    publishedAt?: string | Date | null
  } | null
) => {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache')

    revalidatePath('/blog')
    revalidateTag('blog-published-tag-options', 'max')

    const slug = doc?.slug
    const publishedAt = doc?.publishedAt

    if (!slug || !publishedAt) {
      return
    }

    const [year, month] = new Date(publishedAt)
      .toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
      .split('-')

    if (!year || !month) {
      return
    }

    revalidatePath(`/blog/${year}/${month}/${slug}`)
  } catch {
    // Ignore revalidation errors in non-Next contexts (e.g., standalone scripts)
  }
}

const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'featured', '_status'],
    description: 'Create and manage blog posts with rich content',
    listSearchableFields: ['title', 'slug', 'excerpt'],
    pagination: {
      defaultLimit: 10,
      limits: [5, 10, 20, 50],
    },
    preview: (doc) => {
      if (!doc?.slug || !doc?.publishedAt) return ''
      const [year, month] = new Date(doc.publishedAt as string)
        .toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
        .split('-')
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
                  index: true,
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
                  index: true,
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
              index: true,
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
                  index: true,
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
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                  index: true,
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
      async ({ doc }) => {
        await revalidateBlogRoutes(doc)
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateBlogRoutes(doc)
      },
    ],
  },
}

export default BlogPosts
