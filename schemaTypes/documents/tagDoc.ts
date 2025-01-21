import {TagsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// For creating tags which can be used to categorize content
export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagsIcon,
  fields: [defineField({name: 'name', type: 'string'}), defineField({name: 'slug', type: 'slug'})],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
  },
})