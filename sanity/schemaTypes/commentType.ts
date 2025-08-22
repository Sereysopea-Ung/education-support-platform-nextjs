import { defineType, defineField } from 'sanity'

export const commentType = defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        // Core content
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
            validation: (Rule) => Rule.required().min(1)
        }),

        // Relations
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'user' }],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'post',
            title: 'Post',
            type: 'reference',
            to: [{ type: 'post' }],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'parentComment',
            title: 'Parent Comment',
            type: 'reference',
            to: [{ type: 'comment' }],
            description: 'Optional: set only if this is a reply to another comment.'
        }),

        // Voting (aligned with postType)
        defineField({
            name: 'upvote',
            title: 'Upvotes',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Array of user identifiers (e.g., emails) who upvoted.'
        }),
        defineField({
            name: 'downvote',
            title: 'Downvotes',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Array of user identifiers (e.g., emails) who downvoted.'
        }),

        // Optional single attachment: image OR file
        defineField({
            name: 'attachmentUrl',
            title: 'Attachment URL',
            type: 'url',
            description: 'Direct URL to the uploaded attachment (image or file).',
        }),
        defineField({
            name: 'attachmentType',
            title: 'Attachment Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'File', value: 'file' },
                ],
                layout: 'radio'
            },
            description: 'Whether the attachment is an image or a generic file.'
        }),

        // Timestamps
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        })
    ],
    preview: {
        select: {
            title: 'text'
        }
    }
});
