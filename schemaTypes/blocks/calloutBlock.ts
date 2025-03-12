// For showing numbers in a content block

import { PinIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const calloutType = defineType({
    name: 'calloutSection',
    title: 'Callout Section',
    type: 'object',
    icon: PinIcon,
    fields: [
        defineField({
            name: 'header',
            title: 'Header',
            type: 'headerStyle',
        }),
        defineField({
            name: 'background',
            title: 'Background',
            type: 'backgroundStyle',
        }),
        defineField({
            name: 'calloutPoint',
            description: 'Add up to 5 callout points',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'calloutHeader',
                        title: 'Callout Header',
                        type: 'string',
                    },
                    {
                        name: 'calloutBody',
                        title: 'Callout Body',
                        type: 'string',
                    },
                ]
            }],
        }),
    ],
    preview: {
        select: {
            title: 'header.header',
            subtitle: 'Callout Section',
        },
    },
})
