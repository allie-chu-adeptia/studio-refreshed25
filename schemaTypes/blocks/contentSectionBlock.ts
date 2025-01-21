// A generic block of content with a header, subeader, and numerous content objects and images

import {UlistIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contentSectionType = defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerStyle',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
    defineField({
      name: 'styleAndLayout',
      title: 'Style and Layout',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              {title: 'Image Left', value: 'image-left'},
              {title: 'Image Right', value: 'image-right'},
              {title: 'Image Center', value: 'image-center'},
            ],
          },
          initialValue: 'image-center',
        }),
        defineField({
          name: 'background',
          title: 'Background', 
          type: 'backgroundStyle',
          validation: (Rule) => Rule.required(),
        }),
      ]
    }),
    defineField({
      name: 'subPoints',
      title: 'Sub Points',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Sub Point',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image'
          },
          {
            name: 'header',
            title: 'Header',
            type: 'string',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'subheader',
            title: 'Subheader',
            type: 'text',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'button',
          }
        ]
      }],
      description: 'Between 3 and 8 sub points',
      validation: (Rule) => Rule.min(3).max(8)
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'Content Section Block',
      media: 'image',
    },
  },
})
