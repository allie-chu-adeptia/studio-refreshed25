import { AddUserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonialSectionType = defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  icon: AddUserIcon,
  fields: [
    defineField({
      name: 'testimonial',
      type: 'reference',
      to: [{type: 'testimonial'}],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Simple Centered', value: 'simpleCentered'},
          {title: 'Large Avatar', value: 'largeAvatar'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'testimonial.name',
      subtitle: 'TestimonialSection',
      media: 'testimonial.image',
    }
  }
})