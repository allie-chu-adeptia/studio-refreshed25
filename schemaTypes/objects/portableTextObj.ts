import {defineField} from 'sanity'

// Portable text object for creating rich text content
export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [{type: 'block'}, {type: 'image'}, {type: 'externalImage'}],
})
