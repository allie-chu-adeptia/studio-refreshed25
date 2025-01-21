// For uploading videos and video embeds

import {defineField, defineType} from 'sanity'

export const videoEmbedType = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'YouTube', value: 'youtube'}
        ],
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID',
      type: 'string',
      description: 'Add YouTube video ID (last part of URL)',
      hidden: ({parent}) => parent?.platform !== 'youtube',
    }),
    defineField({
      name: 'vimeoId',
      title: 'Vimeo ID',
      type: 'string',
      description: 'Add Vimeo video ID (last part of URL)',
      hidden: ({parent}) => parent?.platform !== 'vimeo',
    }),
  ],
})

