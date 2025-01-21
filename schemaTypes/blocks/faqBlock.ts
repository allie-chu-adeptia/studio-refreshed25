// For creating a FAQ section

import {EyeOpenIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'object',
  icon: EyeOpenIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Accordion', value: 'accordion'},
          {title: 'Inline', value: 'inline'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{
        title: 'Question and Answer',
        type: 'object',
        fields: [
          {
            name: 'question',
            type: 'string',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'answer',
            type: 'text',
            validation: (Rule) => Rule.required()
          }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'FAQ Section Block',
    },
  },
})
