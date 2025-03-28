import {defineType, defineField} from 'sanity'
export const userType = defineType({
    name:'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'username',
            title: 'Username',
            type: 'string',
            validation: (Rule)=> Rule.required()
        }),
        defineField({
            name: 'isVerified',
            title: 'IsVerified',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'password',
            title: 'Password',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name:'email',
            type:'string',
            validation: (Rule)=>Rule.required()
        }),
        defineField({
            name:'name',
            title:'Email',
            type:'string',
            validation: (Rule)=>Rule.required()
        }),
        defineField({
            name:'profile_pic',
            type:'image'
        }),
        defineField({
            name:'bio',
            type:'text'
        }),
        defineField({
            name: 'verificationToken',
            title: 'VerificationToken',
            type: 'string'
        }),
        defineField({
            name:'followers',
            type: 'array',
            of: [{type:'string'}]
        }),
        defineField({
            name:'role',
            type: 'string'
        }),
        defineField({
            name:'major',
            type: 'string'
        })
    ],
    preview: {
        select: {
            title: 'username'
        }
    }
});