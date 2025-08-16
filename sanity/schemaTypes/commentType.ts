import { defineType, defineField } from 'sanity'

export const commentType = defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string'
        }),
        defineField({
            name: 'level',
            type: 'number',
            title: 'Level',
            validation: Rule => Rule.min(1).required()
        }),
        defineField({
            name: 'parentId',
            type: 'reference',
            title: 'ParentId',
            to: [{ type: 'post' }, { type: 'comment' }],
            options: {
                filter: ({ document }) => {
                    if (!document?.level) {
                        return { filter: '_type in ["post", "comment"]' }; // Show all options if level is not defined
                    }
                    return {
                        filter: '_type == $type',
                        params: { type: document.level === 1 ? 'post' : 'comment' }
                    };
                }
            }
        }),
        defineField({
            name:'PostId',
            title:'postId',
            type: 'string'
        }),
        defineField({
            name:'upvote',
            title: 'Upvote',
            type: 'number'
        }),
        defineField({
            name: 'downVote',
            title: 'DownVote',
            type: 'number'
        })
    ],
    preview: {
        select: {
            title: 'text'
        }
    }
});
