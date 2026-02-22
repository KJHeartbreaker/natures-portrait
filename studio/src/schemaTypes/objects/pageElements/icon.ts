import {defineField, defineType} from 'sanity'

export const icon = defineType({
  name: 'icon',
  type: 'image',
  title: 'Icon',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
    }),
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt',
    },
  },
})

