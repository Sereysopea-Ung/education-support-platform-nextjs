import { defineType, defineField } from 'sanity'

export const reportType = defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'reporttype',
      title: 'Type of Report',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }]
    })
  ]
});
