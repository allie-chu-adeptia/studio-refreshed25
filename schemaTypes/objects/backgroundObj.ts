import { defineField, defineType } from "sanity";

export const backgroundStyle = defineType({
    name: 'backgroundStyle',
    title: 'Background Style',
    type: 'object',
    fields: [
        defineField({
            name: 'style',
            title: 'Style',
            type: 'string',
            options: {
                list: [
                {title: 'Light', value: 'light'},
                {title: 'Medium', value: 'medium'},
                {title: 'Dark', value: 'dark'},
                {title: 'Dark Accent', value: 'dark-accent'},
                {title: 'Light Accent', value: 'light-accent'},
                ],
            },
            initialValue: 'light',
        }),
    ]
})