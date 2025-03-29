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
    })]
});