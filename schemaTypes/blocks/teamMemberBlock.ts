import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const teamMemberSectionType = defineType({
  name: 'teamMemberSection',
  title: 'Team Member Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'header',
      type: 'headerStyle',
    }),
    defineField({
      name: 'teamMembers',
      type: 'array',
      of: [{
        type: 'reference', 
        to: [{type: 'teamMember'}],
        options: {
          filter: `_type == "teamMember" && displayInManagement == true`
        },
      }]
    }),
  ],
  preview: {
    select: {
        title: 'header.header',
        subtitle: 'Team Member Section',
    },
  },
})