// For creating customer pages which will be used to display customer stories and testimonials

import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const customerType = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyName',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      type: 'image',
    }),
    defineField({
      name: 'hideIdentifiableInfo',
      title: 'Hide Identifiable Information',
      type: 'boolean',
      description: 'When enabled, customer logo and name will be hidden',
      initialValue: true
    }),
    defineField({
      name: 'size',
      type: 'string',
      options: {
        list: [
          {title: 'Small Business', value: 'Small Business'},
          {title: 'Mid Market', value: 'Mid Market'}, 
          {title: 'Enterprise', value: 'Enterprise'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'connector',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'connector'}]}],
    }),
    // defineField({
    //     name: 'tag',
    //     type: 'array',
    //     of: [{type: 'reference', to: [{type: 'tag'}]}],
    // }),
    defineField({
        name: 'category',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'testimonial',
      type: 'array',
      of: [
        {type: 'testimonial'}
      ],
    }),
    defineField({
      name: 'hasCaseStudy',
      type: 'boolean',
    }),
    defineField({
      name: 'challenge',
      type: 'portableText',
      hidden: ({document}) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'solution',
      type: 'portableText',
      hidden: ({document}) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'body',
      type: 'portableText',
      hidden: ({document}) => !document?.hasCaseStudy,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'industry',
      media: 'logo',
    },
  },
})
