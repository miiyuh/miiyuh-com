import type { Access } from 'payload'

type AuthUser = {
  id?: string | number
  role?: string
}

export const isAdmin: Access = ({ req }) => {
  const user = req.user as AuthUser | undefined
  return user?.role === 'admin'
}
