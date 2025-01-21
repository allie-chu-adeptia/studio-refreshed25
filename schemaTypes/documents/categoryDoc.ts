import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// For adding category types
export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [defineField({name: 'name', type: 'string'}), defineField({name: 'slug', type: 'slug'})],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
  },
})