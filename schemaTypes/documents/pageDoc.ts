import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'icon',
      type: 'image'
    }),
    // defineField({
    //   name: 'tag',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'tag'}], options: {disableNew: true}}]
    // }),
    defineField({
      name: 'category',
      type: 'array', 
      of: [{type: 'reference', to: [{type: 'category'}], 
        options: {disableNew: true, 
          filter: ({document}) => {
            return {
              filter: '_type == "category" && !(name match "DEP-*")'
            }
          }
        }
      }]
    }),
    defineField({
      name: 'block',
      type: 'array',
      of: [
        {type: 'caseStudy', options: {modal: true}},
        {type: 'relatedResource', options: {modal: true}},
        {type: 'relatedConnector', options: {modal: true}},
        {type: 'faq', options: {modal: true}},
        {type: 'pricing', options: {modal: true}},
        {type: 'contentSection', options: {modal: true}},
        {type: 'ctaSection', options: {modal: true}},
        {type: 'headerSection', options: {modal: true}},
        {type: 'statSection', options: {modal: true}},
        {type: 'logoSection', options: {modal: true}},
        {type: 'bentoSection', options: {modal: true}},
        {type: 'textSection', options: {modal: true}},
        {type: 'testimonialSection', options: {modal: true}},
        {type: 'contentSectionCarousel', options: {modal: true}},
        {type: 'careerSection', options: {modal: true}},
        {type: 'teamMemberSection', options: {modal: true}},
      ],
      validation: (Rule) => Rule.required(),
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'metadata.slug.current',
    }
  }
})
