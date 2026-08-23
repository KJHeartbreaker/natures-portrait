import {defineArrayMember, defineField, defineType} from 'sanity'
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
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Photos in this collection. A photo can appear in multiple collections.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'photo'}]})],
    }),
    defineField({
      name: 'coverPhoto',
      title: 'Cover Photo',
      type: 'reference',
      to: [{type: 'photo'}],
      description: 'The main photo shown in grid cards and previews',
      options: {
        filter: ({document}) => {
          const photos = (document.photos as Array<{_ref: string}> | undefined) ?? []
          const refs = photos.map((p) => p._ref).filter(Boolean)
          if (refs.length === 0) return {filter: 'false'}
          return {filter: '_id in $refs', params: {refs}}
        },
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
