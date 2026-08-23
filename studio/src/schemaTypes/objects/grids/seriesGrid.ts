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
    },
    prepare({disabled}) {
      return {
        title: disabled ? '*** DISABLED *** Series Grid' : 'Series Grid',
      }
    },
  },
})
