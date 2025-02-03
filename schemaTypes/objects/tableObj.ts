import { InsertAboveIcon} from '@sanity/icons'

export const tableObj = {
    name: 'table',
    type: 'object',
    icon: InsertAboveIcon,
    title: 'Table',
    fields: [
        {
            name: 'columns',
            type: 'array',
            title: 'Columns',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'header',
                        type: 'string',
                        title: 'Header',
                    },
                    {
                        name: 'cells',
                        type: 'array',
                        title: 'Cells',
                        of: [{ type: 'text' }]
                    }
                ]
            }]
        }
    ],
    preview: {
        select: {
            title: 'Table',
        },
    },
  }