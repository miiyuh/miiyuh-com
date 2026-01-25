import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { buildConfig } from 'payload'

import Users from './src/collections/Users'
import Media from './src/collections/Media'
import GalleryCollections from './src/collections/GalleryCollections'
import BlogPosts from './src/collections/BlogPosts'
import Projects from './src/collections/Projects'
import AboutPage from './src/collections/AboutPage'
import Papers from './src/collections/Papers'
import { PrivacyPolicy } from './src/globals/PrivacyPolicy'
import { TermsOfService } from './src/globals/TermsOfService'
import { fullFeaturedEditor } from './src/editor/richTextEditor'

const isProd = process.env.NODE_ENV === 'production'

const requiredEnv = (key: string, fallback?: string): string => {
  const value = process.env[key]
  if (!value && !fallback) {
    const message = `Missing required environment variable: ${key}`
    if (isProd) {
      console.error(message)
      // Return a placeholder to allow build to continue
      return `MISSING_${key}`
    }
    throw new Error(message)
  }
  return value || fallback || ''
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - miiyuh.com CMS',
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig, locale }) => {
        // Generate preview URLs based on collection/global type
        const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
        
        let previewPath = ''
        
        const slug = collectionConfig?.slug || globalConfig?.slug
        
        if (slug === 'blog-posts') {
          const date = new Date(data.publishedAt || new Date())
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          previewPath = `/blog/${year}/${month}/${data.slug}`
        } else if (slug === 'projects') {
          previewPath = `/projects/${data.slug}`
        } else if (slug === 'gallery-collections') {
          previewPath = `/gallery/${data.slug}`
        } else if (slug === 'surveys') {
          // Generate slug from survey title
          const surveySlug = data.title
            ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            : ''
          previewPath = surveySlug ? `/surveys/${surveySlug}` : '/surveys'
        } else if (slug === 'privacy-policy') {
          previewPath = '/privacy-policy'
        } else if (slug === 'terms-of-service') {
          previewPath = '/terms-of-service'
        }
        
        const url = `${baseUrl}${previewPath}`
        
        // Add locale query parameter if localization is enabled
        if (locale?.code && locale.code !== 'en') {
          return `${url}?locale=${locale.code}`
        }
        
        return url
      },
      collections: ['blog-posts', 'projects', 'gallery-collections', 'surveys'],
      globals: ['privacy-policy', 'terms-of-service'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 812,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
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
  collections: [Users, Media, GalleryCollections, BlogPosts, Projects, Papers, AboutPage],
  globals: [PrivacyPolicy, TermsOfService],
  plugins: [
    // Form Builder plugin - creates Surveys collection with simplified admin
    formBuilderPlugin({
      fields: {
        // Simple question types with user-friendly overrides
        text: {
          labels: {
            singular: 'Short Answer',
            plural: 'Short Answers',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Question',
              required: true,
              localized: true,
              admin: {
                description: 'The question text shown to users',
              },
            },
            {
              name: 'name',
              type: 'text',
              label: 'Field ID',
              required: true,
              admin: {
                description: 'Auto-generated from your question (used internally)',
                condition: () => false, // Hide from admin - we'll auto-generate
              },
              hooks: {
                beforeValidate: [
                  ({ siblingData }) => {
                    // Auto-generate name from label
                    if (siblingData?.label) {
                      return siblingData.label
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '_')
                        .replace(/(^_|_$)/g, '')
                        .substring(0, 50)
                    }
                    return `field_${Date.now()}`
                  },
                ],
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder text',
              admin: {
                description: 'Hint text shown inside the field',
              },
            },
          ],
        },
        textarea: {
          labels: {
            singular: 'Long Answer',
            plural: 'Long Answers',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Question',
              required: true,
              localized: true,
              admin: {
                description: 'The question text shown to users',
              },
            },
            {
              name: 'name',
              type: 'text',
              label: 'Field ID',
              required: true,
              admin: {
                condition: () => false, // Hide from admin
              },
              hooks: {
                beforeValidate: [
                  ({ siblingData }) => {
                    if (siblingData?.label) {
                      return siblingData.label
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '_')
                        .replace(/(^_|_$)/g, '')
                        .substring(0, 50)
                    }
                    return `field_${Date.now()}`
                  },
                ],
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
            {
              name: 'placeholder',
              type: 'text',
              label: 'Placeholder text',
            },
          ],
        },
        select: {
          labels: {
            singular: 'Dropdown',
            plural: 'Dropdowns',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Question',
              required: true,
              localized: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                condition: () => false,
              },
              hooks: {
                beforeValidate: [
                  ({ siblingData }) => {
                    if (siblingData?.label) {
                      return siblingData.label
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '_')
                        .replace(/(^_|_$)/g, '')
                        .substring(0, 50)
                    }
                    return `field_${Date.now()}`
                  },
                ],
              },
            },
            {
              name: 'options',
              type: 'array',
              label: 'Choices',
              labels: {
                singular: 'Choice',
                plural: 'Choices',
              },
              minRows: 1,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Choice text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: () => false,
                  },
                  hooks: {
                    beforeValidate: [
                      ({ siblingData }) => {
                        if (siblingData?.label) {
                          return siblingData.label
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '_')
                            .replace(/(^_|_$)/g, '')
                        }
                        return `option_${Date.now()}`
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
          ],
        },
        checkbox: {
          labels: {
            singular: 'Checkbox',
            plural: 'Checkboxes',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Checkbox text',
              required: true,
              localized: true,
              admin: {
                description: 'Text shown next to the checkbox',
              },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                condition: () => false,
              },
              hooks: {
                beforeValidate: [
                  ({ siblingData }) => {
                    if (siblingData?.label) {
                      return siblingData.label
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '_')
                        .replace(/(^_|_$)/g, '')
                        .substring(0, 50)
                    }
                    return `field_${Date.now()}`
                  },
                ],
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Must be checked',
              defaultValue: false,
            },
          ],
        },
        email: {
          labels: {
            singular: 'Email Address',
            plural: 'Email Addresses',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Question',
              required: true,
              localized: true,
              defaultValue: 'Your email address',
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              defaultValue: 'email',
              admin: {
                condition: () => false,
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
          ],
        },
        number: {
          labels: {
            singular: 'Number',
            plural: 'Numbers',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Question',
              required: true,
              localized: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                condition: () => false,
              },
              hooks: {
                beforeValidate: [
                  ({ siblingData }) => {
                    if (siblingData?.label) {
                      return siblingData.label
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '_')
                        .replace(/(^_|_$)/g, '')
                        .substring(0, 50)
                    }
                    return `field_${Date.now()}`
                  },
                ],
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
              defaultValue: false,
            },
          ],
        },
        message: {
          labels: {
            singular: 'Info Text',
            plural: 'Info Texts',
          },
        },
        // Disable fields we don't need
        country: false,
        state: false,
        payment: false,
      },
      // Rename to Surveys for clarity
      formOverrides: {
        slug: 'surveys',
        labels: {
          singular: 'Survey',
          plural: 'Surveys',
        },
        admin: {
          group: 'Surveys',
          description: 'Create surveys and feedback forms',
          useAsTitle: 'title',
          defaultColumns: ['title', 'updatedAt'],
          livePreview: {
            url: ({ data }) => {
              const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
              if (data?.title) {
                const slug = data.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '')
                return `${baseUrl}/surveys/${slug}`
              }
              return `${baseUrl}/surveys`
            },
          },
        },
      },
      formSubmissionOverrides: {
        slug: 'survey-responses',
        labels: {
          singular: 'Survey Response',
          plural: 'Survey Responses',
        },
        admin: {
          group: 'Surveys',
          description: 'View responses to your surveys',
        },
      },
    }),
    // S3 Storage (production only)
    ...(isProd && process.env.R2_BUCKET_NAME ? [
      s3Storage({
        enabled: true,
        collections: {
          media: true,
        },
        bucket: process.env.R2_BUCKET_NAME,
        config: {
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
          },
          region: 'auto',
          endpoint: process.env.R2_ENDPOINT || '',
        },
      }),
    ] : []),
  ],
  editor: fullFeaturedEditor,
  db: mongooseAdapter({
    url: requiredEnv('DATABASE_URI'),
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://miiyuh.com',
  secret: requiredEnv('PAYLOAD_SECRET'),
  sharp,
})
