import { defineField, defineType } from "sanity";

export const headerStyle = defineType({
    name: 'headerStyle',
    title: 'Header Style',
    type: 'object',
    fields: [
        defineField({
            name: 'eyebrow',
            title: 'Eyebrow',
            type: 'string',
        }),
        defineField({
            name: 'header',
            title: 'Header',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subheader',
            title: 'Subheader',
            type: 'text',
        }),
    ]
})