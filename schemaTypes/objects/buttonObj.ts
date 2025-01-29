// Button object for creating buttons

import {CubeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const buttonType = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'URL link to an external page',
      hidden: ({parent}) => !!parent?.link
    }),
    defineField({
      name: 'link',
      title: 'Link', 
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Link to an internal page',
      options: {
        disableNew: true
      },
      hidden: ({parent}) => !!parent?.url
    })
  ],
})
