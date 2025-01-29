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
      name: 'cta',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'cta'}]}],
      description: 'If selecting multiple, the first will be used as the primary CTA',
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
