// For creating unaligned content blocks with an image, header, and content

import {BlockquoteIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const bentoType = defineType({
  name: 'bentoSection',
  title: 'Bento Section',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
        validation: (Rule) => Rule.required(),
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
                    {title: 'Large Horizontal', value: 'Large Horizontal'},
                    {title: 'Large Vertical', value: 'Large Vertical'},
                    {title: 'Evenly Spaced', value: 'Evenly Spaced'},
                ],
            },
            initialValue: 'Large Horizontal',
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
      name: 'content',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Bento Block',
        fields: [
          {
            name: 'image',
            type: 'image',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'eyebrow',
            type: 'string',
          },
          {
            name: 'header',
            type: 'string', 
            validation: (Rule) => Rule.required()
          },
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'link',
            type: 'reference',
            to: [{type: 'page'}],
          }
        ],
      preview: {
        select: {
          title: 'header'
        }
      }
      }],
      description: "Add up to 6 bento blocks",
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'Bento Section',
    },
  },
})
