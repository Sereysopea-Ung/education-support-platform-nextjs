import {defineType, defineField} from 'sanity'
export const commentType = defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields:[defineField({
        name: 'text',
        title: 'Text',
        type: 'string'
    }),
    defineField({
        name: 'id',
        title: 'Id',
        type: 'string'
    })]
})