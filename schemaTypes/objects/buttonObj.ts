// Button object for creating buttons

import {CubeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const buttonType = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
