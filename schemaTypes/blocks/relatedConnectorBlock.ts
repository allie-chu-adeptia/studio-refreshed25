// For displaying a list of related connectors

import {EqualIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const relatedConnectorType = defineType({
  name: 'relatedConnector',
  title: 'Related Connectors',
  type: 'object',
  icon: EqualIcon,
  fields: [
    defineField({
        name: 'header',
        title: 'Header',
        type: 'headerStyle',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'connector',
      title: 'Connectors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'connector'}]}],
      validation: (Rule) => Rule.required().custom((value) => {
        if (!value) return true
        if (![6, 9, 12].includes(value.length)) {
          return 'Must select 6, 9 or 12 connectors'
        }
        return true
      }),
    }),
  ],
  preview: {
    select: {
      title: 'header.header',
      subtitle: 'Related Connector Block',
    },
  },
})
