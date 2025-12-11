import {
  lexicalEditor,
  // Default features (included by default)
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
  // Additional features (not included by default)
  FixedToolbarFeature,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  // Code block
  CodeBlock,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

// Custom Callout Block for rich text
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

// Custom Banner Block for rich text
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

// Full-featured rich text editor configuration
export const fullFeaturedEditor = lexicalEditor({
  features: () => [
    // Text formatting features
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),

    // Structure features
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // List features
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),

    // Alignment and indentation
    AlignFeature(),
    IndentFeature(),

    // Link feature with custom fields
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
          admin: {
            description:
              'The rel attribute defines the relationship between the linked resource and the current document.',
          },
        },
      ],
    }),

    // Upload feature with caption support
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
              admin: {
                placeholder: 'Optional image caption...',
              },
            },
            {
              name: 'altText',
              type: 'text',
              label: 'Alt Text',
              admin: {
                placeholder: 'Descriptive alt text for accessibility...',
              },
            },
          ],
        },
      },
    }),

    // Relationship feature
    RelationshipFeature({
      enabledCollections: ['blog-posts', 'projects', 'gallery-collections'],
    }),

    // Fixed toolbar (always visible at the top)
    FixedToolbarFeature(),

    // Table support (experimental)
    EXPERIMENTAL_TableFeature(),

    // Blocks feature with custom blocks and code block
    BlocksFeature({
      blocks: [
        CalloutBlock,
        BannerBlock,
        CodeBlock({
          defaultLanguage: 'typescript',
          languages: {
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
            python: 'Python',
            bash: 'Bash/Shell',
            sql: 'SQL',
            yaml: 'YAML',
            dockerfile: 'Dockerfile',
            graphql: 'GraphQL',
          },
        }),
      ],
    }),
  ],
  admin: {
    placeholder: 'Start writing your content...',
  },
})

// Simplified editor for shorter content (e.g., descriptions, comments)
export const simpleEditor = lexicalEditor({
  features: () => [
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    ParagraphFeature(),
    LinkFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    FixedToolbarFeature(),
  ],
  admin: {
    placeholder: 'Enter text...',
  },
})

// Blog-specific editor with all features optimized for blog posts
export const blogEditor = lexicalEditor({
  features: () => [
    // All text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),

    // Structure
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4'], // H1 is typically the post title
    }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),

    // Alignment
    AlignFeature(),
    IndentFeature(),

    // Links with SEO options
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow', 'sponsored', 'ugc'],
          admin: {
            description: 'SEO-related link attributes.',
          },
        },
      ],
    }),

    // Media
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

    // Related content
    RelationshipFeature({
      enabledCollections: ['blog-posts', 'projects'],
    }),

    // Fixed toolbar (always visible at the top)
    FixedToolbarFeature(),

    // Tables
    EXPERIMENTAL_TableFeature(),

    // Custom blocks
    BlocksFeature({
      blocks: [
        CalloutBlock,
        BannerBlock,
        CodeBlock({
          defaultLanguage: 'typescript',
          languages: {
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
            python: 'Python',
            bash: 'Bash/Shell',
            sql: 'SQL',
            yaml: 'YAML',
          },
        }),
      ],
    }),
  ],
  admin: {
    placeholder: 'Start writing your blog post...',
  },
})

// Legal document editor (for privacy policy, terms of service)
export const legalEditor = lexicalEditor({
  features: () => [
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'],
    }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    AlignFeature(),
    IndentFeature(),
    LinkFeature(),
    FixedToolbarFeature(),
    EXPERIMENTAL_TableFeature(),
  ],
  admin: {
    placeholder: 'Enter legal document content...',
  },
})

// Project documentation editor
export const projectEditor = lexicalEditor({
  features: () => [
    // Text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),

    // Structure
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4'],
    }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),

    // Alignment
    AlignFeature(),
    IndentFeature(),

    // Links
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

    // Media
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

    // Toolbars
    FixedToolbarFeature(),

    // Tables
    EXPERIMENTAL_TableFeature(),

    // Code blocks for technical documentation
    BlocksFeature({
      blocks: [
        CalloutBlock,
        CodeBlock({
          defaultLanguage: 'typescript',
          languages: {
            plaintext: 'Plain Text',
            javascript: 'JavaScript',
            typescript: 'TypeScript',
            jsx: 'JSX',
            tsx: 'TSX',
            html: 'HTML',
            css: 'CSS',
            json: 'JSON',
            bash: 'Bash/Shell',
            sql: 'SQL',
            yaml: 'YAML',
            dockerfile: 'Dockerfile',
          },
        }),
      ],
    }),
  ],
  admin: {
    placeholder: 'Document your project...',
  },
})
