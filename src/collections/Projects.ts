import { CollectionConfig } from 'payload'
import { projectEditor } from '../editor/richTextEditor'
import { isAdmin } from '../access/is-admin'
import { revalidateCollectionHooks, slugField } from './shared'

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
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
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
          titleField: 'name',
          width: '40%',
        }),
      ],
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
      type: 'row',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
      ],
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
      label: 'Project details',
      admin: {
        condition: (data) => data.category === 'side-project',
      },
      fields: [
        {
          name: 'techStack',
          type: 'array',
          label: 'Tech stack',
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
          label: 'GitHub URL',
        },
        {
          name: 'liveUrl',
          type: 'text',
          label: 'Live URL',
        },
      ],
    },
    {
      name: 'universityDetails',
      type: 'group',
      label: 'University details',
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
      label: 'External link',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
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
          type: 'textarea',
          label: 'Meta description',
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
