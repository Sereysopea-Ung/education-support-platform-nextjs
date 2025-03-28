import {defineType, defineField} from 'sanity'
export const postType = defineType({
    name:'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'author',
            type: 'reference',
            to: {type: 'user'}
        }),
        defineField({
            name:'id',
            type:'number'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            }
        }),
        defineField({
            name:'pitch',
            title:'Pitch',
            type: 'text'
        }),
        defineField({
            name:'postimage',
            title:'Post Image',
            type: 'image'
        }),
        defineField({
            name:'upvote',
            title:'Up votes',
            type: 'number'
        }),
        defineField({
            name:'comments',
            title:'Comments',
            type: 'number'
        })
    ]
});
