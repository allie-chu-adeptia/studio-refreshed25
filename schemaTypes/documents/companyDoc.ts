// For adding information related to Adeptia that will be used across the site

import {TriangleOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const companyType = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: TriangleOutlineIcon,
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'locationName',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'address',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'termsOfService',
      title: 'Terms of Service',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cookieConsent',
      title: 'Cookie Consent',
      type: 'portableText',
    }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        {
          name: 'linkedIn',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'twitter',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
    },
  },
})
