import {defineType, defineField} from 'sanity'

export const jobType = defineType({
    name:'job',
    title: 'Job',
    type:'document',
    fields:[defineField({
        name: 'jobTitle',
        title: 'JobTitle',
        type: 'string',
        validation: (Rule)=> Rule.required()
    }),
    defineField({
        name: 'companyName',
        title: 'CompanyName',
        type: 'string'
    }),
    defineField({
        name: 'numberOfApplication',
        title: 'NumberOfApplication',
        type: 'number'
    })]
});