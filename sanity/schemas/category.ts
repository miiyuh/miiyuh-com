import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(50)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Attack on Titan (Red)', value: '#dc2626' },
          { title: 'Photography (Blue)', value: '#2563eb' },
          { title: 'Coding (Green)', value: '#16a34a' },
          { title: 'Personal (Purple)', value: '#9333ea' },
          { title: 'Tutorial (Orange)', value: '#ea580c' },
          { title: 'Review (Pink)', value: '#db2777' }
        ]
      },
      validation: (Rule) => Rule.required()
    })
  ],  preview: {
    select: {
      title: 'title',
      description: 'description'
    }
  }
})
