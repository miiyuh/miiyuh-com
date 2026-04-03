import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'

const isFirstUser = async (req: { payload: { find: Function } }): Promise<boolean> => {
  const existingUsers = await req.payload.find({
    collection: 'users',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  return existingUsers.totalDocs === 0
}

const isAdminOrFirstUser = async ({ req }: { req: { user?: { role?: string }; payload: { find: Function } } }) => {
  if (req.user?.role === 'admin') {
    return true
  }

  return isFirstUser(req)
}

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  auth: {
    loginWithUsername: true,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'email', 'role', 'updatedAt'],
    description: 'Manage CMS user accounts and permissions',
    group: 'Admin',
  },
  access: {
    read: isAdmin,
    create: isAdminOrFirstUser,
    update: isAdmin,
    delete: isAdmin,
    admin: isAdmin,
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
      async ({ data, req, operation }) => {
        if (operation === 'create' && req && (await isFirstUser(req))) {
          return {
            ...data,
            role: 'admin',
          }
        }

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
        create: isAdmin,
        update: isAdmin,
      },
    },
  ],
}

export default Users
