import {defineType} from 'sanity'

// External image object for uploading external urls
export const externalImageType = defineType({
  name: 'externalImage',
  title: 'External Image',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
})