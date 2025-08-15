import { defineType, defineField } from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isVerified',
      title: 'Is Verified',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'profile_pic',
      type: 'image'
    }),
    defineField({
      name: 'bio',
      type: 'text'
    }),
    defineField({
      name: 'verificationToken',
      title: 'Verification Token',
      type: 'string'
    }),
    defineField({
      name: 'followers',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'role',
      type: 'string'
    }),
    defineField({
      name: 'major',
      type: 'string'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) =>
        Rule.min(1).max(5).error('Year must be between 1 and 5')
    }),
    defineField({
      name: 'id',
      type: 'string' 
    }),
    defineField({
      name: 'department',
      type: 'string'
    }),
    defineField({
      name: 'experience',
      type: 'number'
    }),
    defineField({
      name: 'term',
      type: 'boolean'
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' }
        ],
        layout: 'radio'
      },
      initialValue: 'active'
    }),
    defineField({ 
      name: 'lastActive',
      title: 'Last Active',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'username'
    }
  }
})
