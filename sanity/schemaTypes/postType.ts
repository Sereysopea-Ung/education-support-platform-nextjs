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
                source: 'title', // Assuming 'title' exists as a string field
                maxLength: 96,
            },
        }),
        defineField({
            name: 'title', // Adding title field as a string
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'pitch',
            title: 'Pitch',
            type: 'text',
        }),
        defineField({
            name: 'postImage',
            title: 'Post Image',
            type: 'image',
        }),
        defineField({
            name: 'upvote',
            title: 'Upvotes',
            type: 'number',
        }),
        defineField({
            name: 'downvote',
            title: 'Downvotes',
            type: 'number',
        }),
        defineField({
            name: 'typePost',
            title: 'TypePost',
            type: 'string',
        }),
        defineField({
            name: 'pdfFile',
            title: 'PDF File',
            type: 'file',
            options: {
                accept: 'application/pdf',
            },
        }),
    ],
    preview: {
        select: {
            title: 'title', // Change this to 'title' or 'slug.current' if you prefer the slug
        },
    },
});
