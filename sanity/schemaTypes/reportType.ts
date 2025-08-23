import { defineType, defineField } from 'sanity'

export const reportType = defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'reason',
      title: 'Reason',
      type: 'string',
      options: {
        list: [
          { title: 'Spam', value: 'spam' },
          { title: 'Harassment or Bullying', value: 'harassment' },
          { title: 'Hate Speech', value: 'hate_speech' },
          { title: 'Violence or Threats', value: 'violence' },
          { title: 'False Information', value: 'false_info' },
          { title: 'Inappropriate Content', value: 'inappropriate' },
          { title: 'Copyright Violation', value: 'copyright' },
          { title: 'Other', value: 'other' },
        ], 
        layout: 'radio'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Additional Details',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'target',
      title: 'Target (Post or Comment)',
      type: 'reference',
      to: [
        { type: 'post' },
        { type: 'comment' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: [
        { title: 'Pending', value: 'pending' },
        { title: 'Reviewed', value: 'reviewed' },
        { title: 'Resolved', value: 'resolved' },
      ]},
      initialValue: 'pending',
    }),
  ]
});
