import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  CodeBlock,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

const CalloutBlock: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
        { label: 'Tip', value: 'tip' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        placeholder: 'Optional title...',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'Callout content...',
      },
    },
  ],
}

const BannerBlock: Block = {
  slug: 'banner',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter(
            (feature) =>
              feature.key !== 'relationship' &&
              feature.key !== 'upload' &&
              feature.key !== 'blocks'
          ),
        ],
      }),
    },
  ],
}

function baseTextFeatures() {
  return [
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),
    ParagraphFeature(),
    HorizontalRuleFeature(),
    FixedToolbarFeature(),
  ]
}

function baseFormattingFeatures() {
  return [
    ...baseTextFeatures(),
    StrikethroughFeature(),
    LinkFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
  ]
}

function baseAlignmentFeatures() {
  return [
    AlignFeature(),
    IndentFeature(),
  ]
}

const codeBlockLanguages = {
  plaintext: 'Plain Text',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  markdown: 'Markdown',
  bash: 'Bash/Shell',
  sql: 'SQL',
  yaml: 'YAML',
}

const extendedCodeBlockLanguages = {
  ...codeBlockLanguages,
  python: 'Python',
  dockerfile: 'Dockerfile',
  graphql: 'GraphQL',
}

export const fullFeaturedEditor = lexicalEditor({
  features: () => [
    ...baseFormattingFeatures(),
    SubscriptFeature(),
    SuperscriptFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    ...baseAlignmentFeatures(),
    ChecklistFeature(),
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
        },
      ],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
            {
              name: 'altText',
              type: 'text',
              label: 'Alt Text',
            },
          ],
        },
      },
    }),
    RelationshipFeature({
      enabledCollections: ['blog-posts', 'projects', 'gallery-collections'],
    }),
    EXPERIMENTAL_TableFeature(),
    BlocksFeature({
      blocks: [
        CalloutBlock,
        BannerBlock,
        CodeBlock({
          defaultLanguage: 'typescript',
          languages: extendedCodeBlockLanguages,
        }),
      ],
    }),
  ],
  admin: {
    placeholder: 'Start writing your content...',
  },
})

export const simpleEditor = lexicalEditor({
  features: () => [
    ...baseTextFeatures(),
    LinkFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
  ],
  admin: {
    placeholder: 'Enter text...',
  },
})

export const blogEditor = lexicalEditor({
  features: () => [
    ...baseFormattingFeatures(),
    SubscriptFeature(),
    SuperscriptFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4'],
    }),
    ...baseAlignmentFeatures(),
    ChecklistFeature(),
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow', 'sponsored', 'ugc'],
        },
      ],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
            {
              name: 'altText',
              type: 'text',
              label: 'Alt Text',
              required: true,
            },
          ],
        },
      },
    }),
    RelationshipFeature({
      enabledCollections: ['blog-posts', 'projects'],
    }),
    EXPERIMENTAL_TableFeature(),
    BlocksFeature({
      blocks: [
        CalloutBlock,
        BannerBlock,
        CodeBlock({
          defaultLanguage: 'typescript',
          languages: codeBlockLanguages,
        }),
      ],
    }),
  ],
  admin: {
    placeholder: 'Start writing your blog post...',
  },
})

export const legalEditor = lexicalEditor({
  features: () => [
    ...baseTextFeatures(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'],
    }),
    BlockquoteFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ...baseAlignmentFeatures(),
    LinkFeature(),
    EXPERIMENTAL_TableFeature(),
  ],
  admin: {
    placeholder: 'Enter legal document content...',
  },
})

export const projectEditor = lexicalEditor({
  features: () => [
    ...baseFormattingFeatures(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4'],
    }),
    ...baseAlignmentFeatures(),
    ChecklistFeature(),
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
        },
      ],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
            {
              name: 'altText',
              type: 'text',
              label: 'Alt Text',
            },
          ],
        },
      },
    }),
    EXPERIMENTAL_TableFeature(),
    BlocksFeature({
      blocks: [
        CalloutBlock,
        CodeBlock({
          defaultLanguage: 'typescript',
          languages: codeBlockLanguages,
        }),
      ],
    }),
  ],
  admin: {
    placeholder: 'Document your project...',
  },
})
