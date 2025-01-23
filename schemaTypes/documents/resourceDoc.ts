// THe base type for creating all other resource types

import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Datasheet', value: 'Datasheet'},
          {title: 'White Paper', value: 'White Paper'},
          {title: 'eBook', value: 'eBook'},
          {title: 'Infographic', value: 'Infographic'},
          {title: 'News', value: 'News'},
          {title: 'Blog', value: 'Blog'},
          {title: 'Video', value: 'Video'},
          {title: 'Tutorial', value: 'Tutorial'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Published', value: 'Published'},
          {title: 'Draft', value: 'Draft'},
          {title: 'Pending', value: 'Pending'},
          {title: 'Private', value: 'Private'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
    }),
    defineField({
      name: 'excerpt',
      type: 'string',
      description: 'Brief summary limited to 200 characters',
    }),
    defineField({
      name: 'category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}], options: {disableNew: true}}],
    }),
    defineField({
      name: 'tag',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}], options: {disableNew: true}}],
    }),
    defineField({
      name: 'body',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'HSForm',
      type: 'reference',
      to: [{type: 'hubspotForm'}],
      description: 'If a form is selected here, users will need to fill it out to access this content',
      hidden: ({document}) => !['Datasheet', 'White Paper', 'eBook'].includes(document?.type as string),
    }),
    defineField({
      name: 'downloadFile',
      title: 'Downloadable File',
      type: 'file',
      hidden: ({document}) => !['Datasheet', 'White Paper', 'eBook'].includes(document?.type as string),
      }),
    defineField({
      name: 'video',
      type: 'videoEmbed',
      hidden: ({document}) => !['Video', 'Tutorial'].includes(document?.type as string),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'teamMember'}],
      hidden: ({document}) => document?.type !== 'Blog',
      options: {disableNew: true},
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'teamMember.name',
      media: 'featuredImage'
    },
  },
})
