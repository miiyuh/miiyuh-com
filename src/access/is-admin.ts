import type { Access } from 'payload'

type AuthUser = {
  id?: string | number
  role?: string
}

export const isAdmin: Access = ({ req }) => {
  const user = req.user as AuthUser | undefined
  return user?.role === 'admin'
}

// For collections with drafts: admins see everything, everyone else only
// published docs (otherwise `?draft=true` on the REST/GraphQL API leaks drafts)
export const isAdminOrPublished: Access = ({ req }) => {
  if (req.user?.role === 'admin') return true
  return { _status: { equals: 'published' } }
}
