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
    }), 
    defineField({
        name: 'salary',
        title: 'Salary',
        type: 'number'
    }), 
    defineField({
        name: 'location',
        title: 'Location',
        type: 'number'
    }), 
    defineField({
        name: 'requirements',
        title: 'Requirements',
        type: 'array',
            of: [{ type: 'string' }],
    }),
    defineField({
        name: 'benefits',
        title: 'Benefits',
        type: 'array',
            of: [{ type: 'string' }],
    }),
    defineField({
        name: 'content',
        title: 'Content',
        type: 'string'  
    }),
    
    defineField({
        name: 'typeofjob',
        title: 'TypeOfJob',
        type: 'string'
    })]
});