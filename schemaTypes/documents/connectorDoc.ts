// For creating a connector page

import {ProjectsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const connectorType = defineType({
  name: 'connector',
  title: 'Connector',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'subpage',
      title: 'Has Subpage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}], 
        options: {disableNew: true, 
          filter: ({document}) => {
            return {
              filter: '_type == "category" && !(name match "DEP-*")'
            }
          }
        }
      }]
    }),
    defineField({
      name: 'body',
      title: 'Additional Details',
      type: 'portableText'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
