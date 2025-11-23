import { GlobalConfig } from 'payload'

export const LegalPages: GlobalConfig = {
    slug: 'legal-pages',
    label: 'Legal Pages',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'privacyPolicy',
            label: 'Privacy Policy',
            type: 'richText',
            required: true,
        },
        {
            name: 'termsOfService',
            label: 'Terms of Service',
            type: 'richText',
            required: true,
        },
    ],
}

