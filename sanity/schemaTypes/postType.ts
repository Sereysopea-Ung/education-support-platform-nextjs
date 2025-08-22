import { defineType, defineField } from 'sanity';

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({ 
            name: 'author',
            type: 'reference',
            to: { type: 'user' },
        }),
        defineField({
            name: 'isVerified',  
            title: 'IsVerified',
            type: 'boolean', 
            initialValue: false
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'pitch',
            title: 'Pitch',
            type: 'text',
        }),
        defineField({ 
            name: 'postImages',
            title: 'Sanity Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'images',
            title: 'Cloudinary Image URLs',
            type: 'array',
            of: [{ type: 'url' }],
        }), 
        defineField({
            name: 'files',
            title: 'File URLs',
            type: 'array',
            of: [{ type: 'url' }],
        }),
        defineField({
            name: 'upvote',
            title: 'Upvotes',
            type: 'array',
            of: [{type:'string'}]
        }),
        defineField({
            name: 'downvote',
            title: 'Downvotes',
            type: 'array',
            of: [{type:'string'}]
        }),
        defineField({
            name: 'typePost',
            title: 'TypePost',
            type: 'string',
        }),
        defineField({
            name: 'major',
            title: 'Majors',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'subject',
            title: 'Subjects',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'authorEmail',
            title: 'Author Email',
            type: 'string',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
        }),
        defineField({
            name: 'text',
            title: 'Post Text',
            type: 'string',
        }),
    ], 
    preview: {
        select: {
            title: 'title',
        },
    },
}); 
