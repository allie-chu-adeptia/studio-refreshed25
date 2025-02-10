// For creating testimonials, which are attributed to a customer

import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title', 
      type: 'string',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Simple Centered', value: 'simpleCentered'},
          {title: 'Large Avatar', value: 'largeAvatar'},
        ],
      },
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'portableText',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'Testimonial Block',
      media: 'picture',
    },
  },
})
