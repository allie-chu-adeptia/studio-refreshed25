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
    // defineField({
    //   name: 'body',
    //   title: 'Body',
    //   type: 'portableText',
    // }),
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
              {title: 'Aligned Left', value: 'left'},
              {title: 'Aligned Right', value: 'right'},
              {title: 'Aligned Center', value: 'center'},
            ],
          },
          initialValue: 'center',
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
            name: 'icon',
            title: 'Icon',
            type: 'iconPicker',
            options: {
              providers: ["fa"],
              outputFormat: 'react',
            }
          },
          {
            name: 'header',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'subheader',
            title: 'Body',
            type: 'text',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'button',
          }
        ],
        preview: {
          select: {
            title: 'header',
            subtitle: 'subheader',
            media: 'icon',
          }
        }
      }],
      description: 'Between 2 and 6 sub points. If image is present and not centered, up to 3 sub points will be displayed',
      validation: (Rule) => Rule.min(2).max(6)
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
