// For pulling together pricing objects into an overview pricing page

import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pricingType = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  icon: TiersIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productPricing',
      title: 'Product Pricing',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productPricing'}]}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'Pricing Section Block',
    },
  },
})
