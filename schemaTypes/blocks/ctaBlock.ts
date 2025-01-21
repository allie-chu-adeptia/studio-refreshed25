// For creating a section of call to action

import {ExpandIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  icon: ExpandIcon,
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
                    {title: 'Centered', value: 'centered'},
                    {title: 'Left-aligned', value: 'left-aligned'},
                    {title: 'Split', value: 'split'},
                ],
            },
            initialValue: 'centered',
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
      name: 'cta',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'cta'}]}],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),
    defineField({
      name: 'image',
      type: 'image',
      hidden: ({parent}) => parent?.styleAndLayout?.layout !== 'left-aligned'
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'CTA Section Block',
      media: 'image',
    },
  },
})
