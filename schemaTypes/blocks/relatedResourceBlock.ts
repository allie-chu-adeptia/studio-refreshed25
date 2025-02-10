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
      name: 'resourceTypes',
      title: 'Resource Types',
      description: "If left blank, all resource types will be displayed",
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Datasheet', value: 'Datasheet'},
          {title: 'White Paper', value: 'White Paper'}, 
          {title: 'eBook', value: 'eBook'},
          {title: 'Infographic', value: 'Infographic'},
          {title: 'News', value: 'News'},
          {title: 'Blog', value: 'Blog'},
          {title: 'Video', value: 'Video'},
          {title: 'Tutorial', value: 'Tutorial'}
        ]
      },
      hidden: ({parent}) => parent?.type === 'selected',
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
      title: 'title',
      subtitle: 'type',
    },
  },
})
