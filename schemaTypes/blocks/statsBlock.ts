// For showing numbers in a content block

import {ChartUpwardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const statsType = defineType({
  name: 'statSection',
  title: 'Stat Section',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'background',
        title: 'Background', 
        type: 'backgroundStyle',
        validation: (Rule) => Rule.required(),
      }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'statName',
            title: 'Stat Name',
            type: 'string',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'statValue', 
            title: 'Stat Value',
            type: 'string',
            validation: (Rule) => Rule.required()
          }
        ]
      }],
      validation: (Rule) => Rule.required().min(3).max(4),
    }),
  ],
  preview: {
    select: {
        title: 'header.header',
        subtitle: 'Stats Section Block',
    },
  },
})
