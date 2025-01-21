// For listing product features for a particular product

import {DiamondIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productPricingType = defineType({
  name: 'productPricing',
  title: 'Product pricing',
  type: 'object',
  icon: DiamondIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
    defineField({
      name: 'description',
      title: 'Description', 
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'content'}]}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
