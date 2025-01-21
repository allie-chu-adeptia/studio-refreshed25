// For creating page headers

import {DocumentRemoveIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const headerType = defineType({
  name: 'headerSection',
  title: 'Header Section',
  type: 'object',
  icon: DocumentRemoveIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
        name: 'background',
        title: 'Background', 
        type: 'backgroundStyle',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      description: 'Up to three cards',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            type: 'image',
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'subhead',
            type: 'text',
          }
        ]
      }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'Header Section Block',
      media: 'image'
    }
  }
})
