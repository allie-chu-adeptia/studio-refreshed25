import { defineType, defineField, type Rule, type Slug } from 'sanity'

// Shared validation for our redirect slugs
const slugValidator = (rule: Rule) =>
  rule.required().custom((value: Slug) => {
    if (!value || !value.current) return "Can't be blank";
    if (!value.current.startsWith("/")) {
      return "The path must start with a /";
    }
    return true;
  });
  
export const redirectType = defineType({
    name: 'redirect',
    title: 'Redirect',
    type: 'document',
    description: 'Redirect for next.config.js',
    fields: [
        defineField({
            name: 'source',
            type: 'string',
            description: 'The slug cannot be blank and the path must start with /',
        }),
        defineField({
            name: 'destination',
            type: 'string',
            description: 'The slug cannot be blank and the path must start with /',
        }),
        defineField({
            name: 'permanent',
            type: 'boolean',
        }),
    ],
    // null / false makes it temporary (307)
    initialValue: {
	    permanent: true
	  },
})