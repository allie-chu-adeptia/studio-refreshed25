// For creating testimonials, which are attributed to a customer

import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title', 
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
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
