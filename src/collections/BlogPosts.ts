import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'updatedAt'],
    preview: ({ slug, collection }) => {
      const params = new URLSearchParams({
        slug: String(slug || ''),
        collection: String(collection),
        path: `/blog/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || '',
      })
      return `/preview?${params.toString()}`
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Published posts are public, drafts require authentication
      if (user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "my-blog-post")',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      required: true,
      admin: {
        description: 'Short summary of the blog post for previews',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Main image for this blog post',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Author',
      required: true,
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      fields: [
        {
          name: 'category',
          type: 'select',
          options: [
            {
              label: 'Technology',
              value: 'technology',
            },
            {
              label: 'Design',
              value: 'design',
            },
            {
              label: 'Photography',
              value: 'photography',
            },
            {
              label: 'Personal',
              value: 'personal',
            },
            {
              label: 'Tutorial',
              value: 'tutorial',
            },
            {
              label: 'Review',
              value: 'review',
            },
          ],
          required: true,
        },
      ],
      minRows: 1,
      admin: {
        description: 'Select categories for this blog post',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Add tags to help categorize and search for this post',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      defaultValue: false,
      admin: {
        description: 'Display this post prominently on the blog page',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
