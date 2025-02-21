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
        defineField({
            name: 'layout',
            title: 'Header Alignment',
            type: 'string',
            options: {
                list: ['centered', 'left-aligned', 'right-aligned'],
            },
            initialValue: 'centered',
        }),
        defineField({
            name: 'anchorID',
            title: 'Anchor ID',
            type: 'string',
            description: 'This is the ID for the anchor tag on the header. It can be used to link to the header from another page.'
        })
    ]
})