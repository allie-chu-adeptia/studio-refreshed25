// For creating Hubspot forms for reuse across the site

import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const hubspotFormType = defineType({
  name: 'hubspotForm',
  title: 'Hubspot Form',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Internal field to help identify what this form is used for',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formID',
      title: 'Form ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sfdcCampaignId',
      title: 'SFDC Campaign ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'description',
    },
  },
})
