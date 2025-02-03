// For displaying a list of related resources

import {EqualIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const relatedResourceType = defineType({
  name: 'relatedResource',
  title: 'Related Resources',
  type: 'object',
  icon: EqualIcon,
  fields: [
    // defineField({
    //     name: 'header',
    //     title: 'Header',
    //     type: 'headerStyle',
    //     validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: 'tag',
    //   title: 'Tags',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'tag'}]}],
    // }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Latest', value: 'latest'},
          {title: 'Selected', value: 'selected'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resource',
      title: 'Resources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
      validation: (Rule) => Rule.max(3),
      hidden: ({parent}) => parent?.type === 'latest',
    }),
  ],
  preview: {
    select: {
      title: 'type',
      subtitle: 'Related Resource Block',
    },
  },
})
