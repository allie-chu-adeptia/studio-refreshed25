import { InfoOutlineIcon } from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// For creating metadata for pages
export const metadataType = defineType({
    name: 'metadata',
    title: 'Metadata',
    type: 'object',
    icon: InfoOutlineIcon,
    options: {
      collapsible: true,
      collapsed: true,
    },
    fields: [
      defineField({
        name: 'seoTitle',
        title: 'SEO Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Meta description should be between 150-160 characters for optimal SEO',
      }),
      defineField({
        name: 'focusKeyprase',
        title: 'Focus Keyphrase',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'metadata.seoTitle',
          slugify: input => input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200)
        }
      }),
      defineField({
        name: 'advanced',
        title: 'Advanced',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true,
        },
        fields: [
          {
            name: 'breadcrumbsTitle',
            title: 'Breadcrumbs Title',
            type: 'string'
          },
          {
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url'
          },
          {
            name: 'allowSearchResults',
            title: 'Allow search engines to show this content in search results?',
            type: 'boolean',
            initialValue: true
          },
          {
            name: 'followLinks', 
            title: 'Should search engines follow links on this content?',
            type: 'boolean',
            initialValue: true
          }
        ]
      })
    ],
  })