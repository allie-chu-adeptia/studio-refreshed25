import { LinkIcon } from '@sanity/icons'
import {defineField} from 'sanity'

// Portable text object for creating rich text content
export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [
    {type: 'block',
      marks: {
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            icon: LinkIcon,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'resource' },
                  { type: 'page' },
                  { type: 'connector' },
                  { type: 'customer' },
                ]
              }
            ]
          }
        ]
      }
    }, 
    {type: 'image'}, 
    {type: 'externalImage'},
  ],
})
