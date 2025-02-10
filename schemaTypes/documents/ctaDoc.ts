// For creating various CTAs which can be used across the site

import {ExpandIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'document',
  icon: ExpandIcon,
  fields: [
    defineField({
      name: 'campaignTitle',
      title: 'Campaign Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerStyle',
    }),
    defineField({
      name: 'buttonText', 
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      description: 'This is the style of the CTA banner and buttons to maintain consistency for each campaign',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Tertiary', value: 'tertiary'},
        ]
      }
    }),
    defineField({
      name: 'pageReference',
      title: 'Page Reference',
      type: 'reference',
      to: [{type: 'page'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'campaignTitle',
    },
  },
})
