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
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          slugify: input => input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200)
        }
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}], options: {disableNew: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
