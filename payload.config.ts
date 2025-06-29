import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Media } from './src/collections/Media'
import { Gallery } from './src/collections/Gallery'
import { Projects } from './src/collections/Projects'
import { BlogPosts } from './src/collections/BlogPosts'
import { Users } from './src/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Server URL configuration for Vercel deployment
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 
             process.env.VERCEL_BRANCH_URL ||
             process.env.VERCEL_URL ||
             'http://localhost:3000',
             
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Admin configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Miiyuh Admin',
    },
  },
  
  // CORS configuration
  cors: process.env.NODE_ENV === 'production' ? [
    process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
    process.env.VERCEL_BRANCH_URL || '',
    process.env.VERCEL_URL || '',
    'https://preview.miiyuh.com',
    'https://miiyuh.com'
  ].filter(Boolean) : undefined,

  // Define and configure your collections in this array
  collections: [
    Users,
    Media,
    Gallery,
    Projects,
    BlogPosts,
  ],

  // Storage plugins
  plugins: [
    // Always include Vercel Blob plugin, but conditionally configure it
    vercelBlobStorage({
      collections: {
        media: true, // Enable for media collection
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '', // Empty token for local dev
    }),
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    // Optimize for serverless/Vercel
    connectOptions: {
      maxPoolSize: 5, // Maintain up to 5 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxIdleTimeMS: 10000, // Close connections after 10 seconds of inactivity
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  
  // Email configuration using nodemailer adapter
  email: nodemailerAdapter({
    defaultFromAddress: 'admin@miiyuh.com',
    defaultFromName: 'Miiyuh Admin',
    // Use SMTP if environment variables are provided, otherwise use ethereal.email for development
    ...(process.env.SMTP_HOST && {
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  }),
  
  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})