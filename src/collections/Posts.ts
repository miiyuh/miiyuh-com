import { CollectionConfig } from 'payload'

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true, // Allow public read access
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (!doc?.slug || !doc?.publishedAt) return ''
      const date = new Date(doc.publishedAt as string)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/blog/${year}/${month}/${doc.slug}`
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      required: false,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
}

export default Posts
