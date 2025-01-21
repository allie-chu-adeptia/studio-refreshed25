// For creating various types of content with the structure image, header, description

import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contentType = defineType({
  name: 'content',
  title: 'Content',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image'
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subheader',
      title: 'Subheader', 
      type: 'text',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    })
  ]
})

