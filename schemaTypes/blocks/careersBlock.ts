// For adding a careers section to a page

import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const careerType = defineType({
  name: 'careerSection',
  title: 'Career Section', 
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
    }),
    defineField({
      name: 'careers',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})