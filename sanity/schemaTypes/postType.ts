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
            title: 'Post Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt text',
                            type: 'string',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'upvote',
            title: 'Upvotes',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'downvote',
            title: 'Downvotes',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'typePost',
            title: 'TypePost',
            type: 'string',
        }),
        defineField({
            name: 'files',
            title: 'Uploaded Files',
            type: 'array',
            of: [
                {
                    type: 'file',
                    fields: [
                        {
                            name: 'alt',
                            title: 'File Description',
                            type: 'string',
                        },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
});
