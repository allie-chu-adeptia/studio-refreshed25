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
      name: 'content',
      title: 'Content',
      type: 'portableText',
    }),
    defineField({
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Large', value: 'large'},
        ]
      }
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'animation',
      title: 'Selected Animation',
      type: 'string',
      options: {
        list: [
          {title: 'First Mile Data Types', value: 'firstMileDataTypes'},
        ]
      }
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
        defineField({
          name: 'spacing',
          title: 'Spacing',
          type: 'string',
          options: {
            list: [
              {title: 'Tight Top', value: 'tight-top'},
              {title: 'Tight Bottom', value: 'tight-bottom'},
              {title: 'Tight Top and Bottom', value: 'tight-top-bottom'},
            ],
          },
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
      validation: (Rule) => Rule.min(2)
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
