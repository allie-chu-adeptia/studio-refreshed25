// For creating team members which will be used to display team member profiles

import {AddUserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: AddUserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
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
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'profilePic',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayInManagement',
      title: 'Display in Management',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      type: 'portableText',
      hidden: ({document}) => !document?.displayInManagement,
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      hidden: ({document}) => !document?.displayInManagement,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'profilePic',
    },
  },
})
