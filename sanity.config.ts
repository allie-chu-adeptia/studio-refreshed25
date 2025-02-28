// 'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {BookIcon, AddCircleIcon, BasketIcon, CaseIcon, CheckmarkCircleIcon, UsersIcon, CogIcon, BarChartIcon, DocumentPdfIcon, TrendUpwardIcon, AddDocumentIcon, DocumentVideoIcon, UserIcon, TagIcon, ChevronRightIcon, DoubleChevronRightIcon, ImageIcon, LinkIcon} from '@sanity/icons'
import { iconPicker } from 'sanity-plugin-icon-picker';
import { presentationTool } from 'sanity/presentation'
import sanityClient from './sanity.client'
import { Page } from './sanity.types'

export default defineConfig({
  name: 'default',
  title: 'Adeptia',

  projectId: '5ujtwa6a',
  dataset: 'production',
  apiVersion: "2025-02-26",

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
            // S.documentTypeListItem('page'),
            S.listItem()
              .title('Pages')
              .icon(BookIcon)
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Parent Pages')
                      .icon(ChevronRightIcon)
                      .child(
                        S.documentList()
                          .title('Parent Pages')
                          .schemaType('page')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "page" && !defined(parent)')
                      ),
                    S.listItem()
                      .title('Product Pages')
                      .icon(DoubleChevronRightIcon)
                      .child(
                        S.documentList()
                          .title('Product Pages')
                          .schemaType('page')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "page" && defined(parent) && parent->metadata.slug.current == "products"')
                      ),
                    S.listItem()
                      .title('Solutions Pages')
                      .icon(DoubleChevronRightIcon)
                      .child(
                        S.documentList()
                          .title('Solutions Pages')
                          .schemaType('page')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "page" && defined(parent) && parent->metadata.slug.current == "solutions"')
                      ),
                    S.listItem()
                      .title('Industry Pages')
                      .icon(DoubleChevronRightIcon)
                      .child(
                        S.documentList()
                          .title('Industry Pages')
                          .schemaType('page')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "page" && defined(parent) && parent->metadata.slug.current == "industry"')
                    ),
                    S.listItem()
                      .title('Use Case Pages')
                      .icon(DoubleChevronRightIcon)
                      .child(
                        S.documentList()
                          .title('Use Case Pages')
                          .schemaType('page')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "page" && defined(parent) && parent->metadata.slug.current == "use-case"')
                      ),
                    S.listItem()
                      .title('Support Pages')
                      .icon(DoubleChevronRightIcon)
                      .child(
                        S.documentList()
                          .title('Support Pages')
                          .schemaType('page')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "page" && defined(parent) && parent->metadata.slug.current == "support"')
                      )
                  ])
              ),
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
                          .apiVersion('v2025-02-19')
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
                          .apiVersion('v2025-02-19')
                          .filter('_type == "resource" && type == "White Paper"')
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
                      .title('eBooks')
                      .icon(BookIcon)
                      .child(
                        S.documentList()
                          .title('eBooks')
                          .schemaType('resource')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "resource" && type == "eBook"')
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
                    .title('Infographics')
                    .icon(CaseIcon)
                    .child(
                      S.documentList()
                        .title('Infographics')
                        .schemaType('resource')
                        .apiVersion('v2025-02-19')
                        .filter('_type == "resource" && type == "Infographic"')
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
                      .title('News')
                      .icon(TrendUpwardIcon)
                      .child(
                        S.documentList()
                          .title('News')
                          .schemaType('resource')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "resource" && type == "News"')
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
                      .title('Blog Posts')
                      .icon(AddDocumentIcon)
                      .child(
                        S.documentList()
                          .title('Blog Posts')
                          .schemaType('resource')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "resource" && type == "Blog"')
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
                      .title('Videos')
                      .icon(DocumentVideoIcon)
                      .child(
                        S.documentList()
                          .title('Videos')
                          .schemaType('resource')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "resource" && type == "Video"')
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
                      .title('Tutorials')
                      .icon(DocumentVideoIcon)
                      .child(
                        S.documentList()
                          .title('Tutorials')
                          .schemaType('resource')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "resource" && type == "Tutorial"')
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
                          .apiVersion('v2025-02-19')
                          .filter('_type == "teamMember" && displayInManagement == true')
                      ),
                    S.listItem()
                      .title('Authors')
                      .icon(UserIcon)
                      .child(
                        S.documentList()
                          .title('Authors')
                          .schemaType('teamMember')
                          .apiVersion('v2025-02-19')
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
                    S.listItem()
                      .title('Categories')
                      .icon(TagIcon)
                      .child(
                        S.documentList()
                          .title('Categories')
                          .schemaType('category')
                          .apiVersion('v2025-02-19')
                          .filter('_type == "category" && !(name match "DEP-*")')
                      ),
                    S.documentTypeListItem('cta'),
                    S.documentTypeListItem('hubspotForm'),
                    S.documentTypeListItem('testimonial'),
                    S.documentTypeListItem('sanity.imageAsset').icon(ImageIcon),
                    S.documentTypeListItem('redirect').icon(LinkIcon)
                  ])
              ),
          ])
    }),
    // presentationTool({
    //   previewUrl: {
    //     previewMode: {
    //       enable: '/api/draft-mode/enable',
    //     },
    //   },
    // }),
    visionTool(),
    iconPicker(),
  ],

  schema: {
    types: schemaTypes,
  },
})
