import { Access } from 'payload/types';

export const isAdminOrHasAccessToContent: Access = ({ req: { user } }) => {
  // If user has role of 'admin', return true
  // Or, if this is content created by the current user, return true
  if (user && (user.role === 'admin' || user.id === user.id)) {
    return true;
  }

  // Otherwise, only show published content
  return {
    status: {
      equals: 'published',
    },
  };
};

// Used for collections where you want only admins to edit
export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin';
};

// Used for collections that should be readable by all
export const isAdminOrPublished: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') {
    return true;
  }

  return {
    status: {
      equals: 'published',
    },
  };
};
