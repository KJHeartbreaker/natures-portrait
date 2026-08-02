import {defineField, defineType} from 'sanity'
import {MdCollections as icon} from 'react-icons/md'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'simplePortableText',
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare({title, slug}) {
      return {
        title: title || 'Untitled collection',
        subtitle: slug ? `/${slug}` : undefined,
      }
    },
  },
})
