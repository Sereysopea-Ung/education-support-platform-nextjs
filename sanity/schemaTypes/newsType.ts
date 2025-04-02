import { defineType, defineField } from 'sanity';

export const newsType = defineType({
    name: 'news', // The name of the document type
    title: 'News', // The title to display in the Sanity Studio
    type: 'document', // This is a document type
    fields: [
        defineField({
            name: 'author', // Name of the field
            type: 'reference', // Reference to another document type (user)
            to: { type: 'user' }, // The referenced document type is 'user'
        }),
        defineField({
            name: 'newsTitle', // Field for the news title
            title: 'News Title', // Displayed title for this field in the Sanity Studio
            type: 'string', // This field expects a string input
            validation: (Rule) => Rule.required(), // Make this field required
        }),
        defineField({
            name: 'pitch', // Field for the pitch/summary of the article
            title: 'Pitch', // Displayed title for this field
            type: 'text', // This is a text field for longer descriptions
        }),
        defineField({
            name: 'read', // Field for counting how many times the article was read
            title: 'Read', // Displayed title for this field
            type: 'number', // This is a number field for the read count
        }),
    ],
});
