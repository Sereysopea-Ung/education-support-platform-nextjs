import { defineField, defineType } from 'sanity';

export const feedbackType = defineType({
  name: 'feedback',
  title: 'Feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'feedbackText',
      title: 'Feedback Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(5).max(2000),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: { layout: 'radio', list: [1,2,3,4,5] },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
