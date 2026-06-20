import { CollectionConfig } from 'payload'
import { blogEditor } from '../editor/richTextEditor'
import { isAdmin } from '../access/is-admin'
import { slugField } from './shared'

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
    // Ignore revalidation errors in non-Next contexts
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
    admin: ({ req }) => req.user?.role === 'admin',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'featured', '_status'],
    group: 'Content',
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
                  },
                },
                slugField({
                  fieldName: 'slug',
                  width: '40%',
                }),
              ],
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
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
                  },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'metaDescription',
              type: 'text',
              localized: true,
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
