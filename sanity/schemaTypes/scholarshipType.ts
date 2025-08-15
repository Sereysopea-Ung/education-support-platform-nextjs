import {defineType, defineField} from 'sanity'

export const scholarshipType = defineType({
    name:'scholarship',
    title: 'Scholarship',
    type:'document',
    fields:[defineField({
        name: 'scholarshipTitle',
        title: 'ScholarshipTitle',
        type: 'string',
        validation: (Rule)=> Rule.required()
    }),
    defineField({
        name: 'forApplicant',
        title: 'ForApplicant',
        type: 'string' 
    }),
    defineField({
        name: 'amountOfMoney',
        title: 'AmountOfMoney',
        type: 'number'
    }),
    defineField({
        name: 'typeofcoverage',
        title: 'TypeOfCoverage',
        type: 'string',
        options: {
            list: [
                { title: 'Full Coverage', value: 'Full Coverage' },
                { title: 'Partial Coverage', value: 'Partial Coverage' },
                { title: 'No Coverage', value: 'No Coverage' },
            ],
        },
    })]
});