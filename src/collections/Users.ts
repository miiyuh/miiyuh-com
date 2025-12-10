import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  auth: {
    loginWithUsername: true,
  },
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'email', 'role', 'updatedAt'],
    description: 'Manage CMS user accounts and permissions',
    group: 'Admin',
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data?.username && typeof data.username === 'string') {
          data.username = data.username.trim().toLowerCase()
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data }) => {
        return data
      },
    ],
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique username (normalized to lowercase)',
      },
      validate: (val: unknown) => {
        if (!val || typeof val !== 'string') return 'Username is required'
        const value = val.trim().toLowerCase()
        if (value.length < 3) return 'Username must be at least 3 characters'
        if (value.length > 32) return 'Username must be at most 32 characters'
        if (!/^[a-z0-9-]+$/.test(value)) return 'Only lowercase letters, numbers, and hyphens are allowed'
        return true
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      access: {
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}

export default Users
