// For pulling in case studies to a page

import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'customer'}]}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'customer.0.title',
      media: 'customer.0.logo',
      subtitle: 'Case Study Block',
    },
  },
})
