// For adding customer logos to a page

import {ComponentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const logoType = defineType({
  name: 'logoSection',
  title: 'Logo Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'logo',
      type: 'array',
      of: [{
        type: 'image',
      }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Logo Section'
      }
    }
  }
})
