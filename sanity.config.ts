import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {BookIcon, AddCircleIcon, BasketIcon, CaseIcon, CheckmarkCircleIcon, UsersIcon, CogIcon, BarChartIcon, DocumentPdfIcon, TrendUpwardIcon, AddDocumentIcon, DocumentVideoIcon, UserIcon} from '@sanity/icons'
import { iconPicker } from 'sanity-plugin-icon-picker';
import sanityClient from './sanity.client'
import { Page } from './sanity.types'

export default defineConfig({
  name: 'default',
  title: 'Adeptia',

  projectId: '5ujtwa6a',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) => 
        S.list()
          .title('Content')
          .items([
            // Regular document types
            S.documentTypeListItem('company'),
            S.documentTypeListItem('connector').title('Connectors'),
            S.documentTypeListItem('customer'),
            S.documentTypeListItem('page'),
            S.listItem()
              .title('Resources')
              .icon(AddCircleIcon)
              .child(
                S.list()
                  .title('Resources')
                  .items([
                    S.listItem()
                      .title('Datasheets')
                      .icon(BarChartIcon)
                      .child(
                        S.documentList()
                          .title('Datasheets')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "Datasheet"')
                          .menuItems([
                            S.orderingMenuItem({
                              name: 'titleAsc',
                              title: 'Title A-Z',
                              by: [{field: 'title', direction: 'asc'}]
                            }),
                            S.orderingMenuItem({
                              name: 'publishDateAsc',
                              title: 'Publish Date ascending',
                              by: [{field: 'publishDate', direction: 'asc'}]
                            })
                          ])
                      ),
                    S.listItem()
                      .title('White Papers')
                      .icon(DocumentPdfIcon)    
                      .child(
                        S.documentList()
                          .title('White Papers')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "White Paper"')
                          .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('eBooks')
                      .icon(BookIcon)
                      .child(
                        S.documentList()
                          .title('eBooks')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "eBook"')
                          .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                      ),
                    S.listItem()
                    .title('Infographics')
                    .icon(CaseIcon)
                    .child(
                      S.documentList()
                        .title('Infographics')
                        .schemaType('resource')
                        .filter('_type == "resource" && type == "Infographic"')
                        .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                    ),
                    S.listItem()
                      .title('News')
                      .icon(TrendUpwardIcon)
                      .child(
                        S.documentList()
                          .title('News')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "News"')
                          .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('Blog Posts')
                      .icon(AddDocumentIcon)
                      .child(
                        S.documentList()
                          .title('Blog Posts')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "Blog"')
                          .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('Videos')
                      .icon(DocumentVideoIcon)
                      .child(
                        S.documentList()
                          .title('Videos')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "Video"')
                          .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('Tutorials')
                      .icon(DocumentVideoIcon)
                      .child(
                        S.documentList()
                          .title('Tutorials')
                          .schemaType('resource')
                          .filter('_type == "resource" && type == "Tutorial"')
                          .defaultOrdering([{field: 'publishDate', direction: 'asc'}])
                      )
                  ])
              ),
            S.listItem()
              .title('Team')
              .icon(UsersIcon)
              .child(
                S.list()
                  .title('Team')
                  .items([
                    S.listItem()
                      .title('Management')
                      .icon(UserIcon)
                      .child(
                        S.documentList()
                          .title('Management')
                          .schemaType('teamMember')
                          .filter('_type == "teamMember" && displayInManagement == true')
                      ),
                    S.listItem()
                      .title('Authors')
                      .icon(UserIcon)
                      .child(
                        S.documentList()
                          .title('Authors')
                          .schemaType('teamMember')
                          .filter('_type == "teamMember" && displayInManagement != true')
                      )
                  ])
              ),
            
            // Helper Objects group
            S.listItem()
              .title('Helper Objects')
              .child(
                S.list()
                  .title('Helper Objects')
                  .items([
                    S.documentTypeListItem('category'),
                    S.documentTypeListItem('cta'),
                    S.documentTypeListItem('tag'),
                    S.documentTypeListItem('hubspotForm'),
                  ])
              ),
          ])
    }),
    visionTool(),
    iconPicker(),
  ],

  schema: {
    types: schemaTypes,
  },
})
