import { CollectionConfig } from 'payload'
import { projectEditor } from '../editor/richTextEditor'
import { isAdmin } from '../access/is-admin'
import { revalidateCollectionHooks } from './shared'

const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: ({ req }) => req.user?.role === 'admin',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', '_status'],
    group: 'Content',
    listSearchableFields: ['name', 'slug', 'description'],
    pagination: {
      defaultLimit: 10,
      limits: [5, 10, 20, 50],
    },
    preview: (doc) => {
      if (!doc?.slug) return ''
      return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/projects/${doc.slug}`
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      index: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      options: [
        {
          label: 'Side Project',
          value: 'side-project',
        },
        {
          label: 'University Project',
          value: 'university-project',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: projectEditor,
    },
    {
      name: 'projectDetails',
      type: 'group',
      admin: {
        condition: (data) => data.category === 'side-project',
      },
      fields: [
        {
          name: 'techStack',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'tech',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'In Development', value: 'in-development' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        },
        {
          name: 'githubUrl',
          type: 'text',
        },
        {
          name: 'liveUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'universityDetails',
      type: 'group',
      admin: {
        condition: (data) => data.category === 'university-project',
      },
      fields: [
        {
          name: 'course',
          type: 'text',
        },
        {
          name: 'semester',
          type: 'text',
        },
        {
          name: 'grade',
          type: 'text',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      index: true,
      defaultValue: 0,
    },
    {
      name: 'externalLink',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
  hooks: {
    ...revalidateCollectionHooks((doc) => {
      const paths = ['/projects']
      if (doc?.slug) {
        paths.push(`/projects/${doc.slug}`)
      }
      return paths
    }),
  },
}

export default Projects
