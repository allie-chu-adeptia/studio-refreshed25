import {defineField, defineType} from 'sanity'
import {AsteriskIcon} from '@sanity/icons'

export const contentSectionCarouselType = defineType({
    name: 'contentSectionCarousel',
    title: 'Content Section Carousel',
    type: 'object',
    icon: AsteriskIcon,
    fields: [
        defineField({
            name: 'header',
            title: 'Header',
            type: 'headerStyle',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'carouselItems',
            title: 'Carousel Items',
            type: 'array',
            of: [{type: 'contentSection'}],
            description: 'Add up to five items to the carousel',
            validation: (Rule) => Rule.max(5),
        }),
    ],
    preview: {
        select: {
            title: 'header.header',
        },
    },
})
