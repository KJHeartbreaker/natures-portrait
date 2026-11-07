import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdCollections as icon} from 'react-icons/md'
import {CollectionPhotosPicker} from '../../components/CollectionPhotosPicker'

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
      type: 'text',
      rows: 3,
      description:
        'A sentence or two about this series. Shown under the series title, and used in Google results and when the page is shared. Search results show about the first 155 characters. Leave empty to use a short automatic line ("… a series of 12 photographs by Jill Genereux").',
      validation: (Rule) =>
        Rule.max(300).warning('Keep it short: a sentence or two reads best under the title.'),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Photos in this collection. A photo can appear in multiple collections.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'photo'}]})],
      components: {input: CollectionPhotosPicker},
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
