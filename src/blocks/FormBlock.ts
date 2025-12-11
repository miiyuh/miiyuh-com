import type { Block } from 'payload'

/**
 * Form Block
 * 
 * A reusable block that allows editors to add forms to any page.
 * Editors select from pre-created forms in the Forms collection.
 */
export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  interfaceName: 'FormBlockType',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Select a form to display on this page',
      },
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
      defaultValue: false,
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, siblingData) => siblingData?.enableIntro,
        description: 'Optional content to display above the form',
      },
    },
  ],
}

export default FormBlock
