// For adding customer logos to a page

import {ComponentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const textSectionType = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
    }),
    defineField({
      name: 'text',
      type: 'portableText',
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
    },
  },
})

