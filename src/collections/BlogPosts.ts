import { CollectionConfig } from 'payload'
import { blogEditor } from '../editor/richTextEditor'
import { isAdmin, isAdminOrPublished } from '../access/is-admin'
import { allLocaleRoutePaths } from '../lib/locale'
import { getBlogPostPath } from '../utils/blog-path'
import { slugField } from './shared'

type BlogRouteDoc = {
  slug?: string
  publishedAt?: string | Date | null
} | null | undefined

// Revalidates the list, the cached post data (unstable_cache tag "blog-posts"),
// and the post URL — plus the previous URL when the slug or date changed.
const revalidateBlogRoutes = async (doc: BlogRouteDoc, previousDoc?: BlogRouteDoc) => {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache')

    allLocaleRoutePaths('/blog').forEach((path) => revalidatePath(path))
    revalidateTag('blog-published-tag-options', 'max')
    revalidateTag('blog-posts', 'max')

    const postPaths = new Set<string>()
    for (const d of [doc, previousDoc]) {
      if (d?.slug && d.publishedAt) postPaths.add(getBlogPostPath(d.slug, d.publishedAt))
    }
    postPaths.forEach((p) => allLocaleRoutePaths(p).forEach((path) => revalidatePath(path)))
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
    read: isAdminOrPublished,
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
                  label: 'Title',
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
              label: 'Excerpt',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Cover image',
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
                  label: 'Published at',
                  required: true,
                  index: true,
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                      displayFormat: "yyyy-MM-dd HH:mm '(MYT)'",
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
              label: 'Meta title',
              localized: true,
            },
            {
              name: 'metaDescription',
              type: 'text',
              label: 'Meta description',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateBlogRoutes(doc, previousDoc)
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
