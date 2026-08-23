import {MdGridView as icon} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const seriesGrid = defineType({
  name: 'seriesGrid',
  title: 'Series Grid',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'collections',
      title: 'Series',
      type: 'array',
      description: 'Choose up to 4 collections to display as cards',
      validation: (Rule) => Rule.max(4),
      of: [defineArrayMember({type: 'reference', to: [{type: 'collection'}]})],
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Setting this to true will disable the component, but not delete it.',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      disabled: 'disabled',
      c0: 'collections.0.title',
      c1: 'collections.1.title',
      c2: 'collections.2.title',
      c3: 'collections.3.title',
      media: 'collections.0.coverPhoto.image',
    },
    prepare({disabled, c0, c1, c2, c3, media}) {
      const names = [c0, c1, c2, c3].filter(Boolean).join(', ')
      return {
        title: disabled ? '*** DISABLED *** Series Grid' : 'Series Grid',
        subtitle: names || undefined,
        media,
      }
    },
  },
})
