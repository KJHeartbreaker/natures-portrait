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
    defineField({
      name: 'coverPhoto',
      title: 'Cover Photo',
      type: 'reference',
      to: [{type: 'photo'}],
      description: 'The main photo shown in grid cards and previews',
      options: {
        filter: ({document}) => ({
          filter: '$collectionId in collections[]._ref',
          params: {collectionId: (document._id as string).replace(/^drafts\./, '')},
        }),
      },
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', media: 'coverPhoto.image'},
    prepare({title, slug, media}) {
      return {
        title: title || 'Untitled collection',
        subtitle: slug ? `/${slug}` : undefined,
        media,
      }
    },
  },
})
