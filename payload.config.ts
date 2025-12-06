import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'

import Users from './src/collections/Users'
import Media from './src/collections/Media'
import GalleryCollections from './src/collections/GalleryCollections'
import Posts from './src/collections/Posts'
import Projects from './src/collections/Projects'
import AboutPage from './src/collections/AboutPage'
import Papers from './src/collections/Papers'
import { LegalPages } from './src/globals/LegalPages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - miiyuh CMS',
    },
  },
  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'ms',
        label: 'Malay (Malaysia)',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, GalleryCollections, Posts, Projects, Papers, AboutPage],
  globals: [LegalPages],
  plugins: process.env.NODE_ENV === 'production' ? [
    s3Storage({
      enabled: true,
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT || '',
      },
    }),
  ] : [],
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
})
