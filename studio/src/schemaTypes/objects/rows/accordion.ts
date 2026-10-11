import {TbLayoutList as icon} from 'react-icons/tb'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {palette} from '../../palette'

export const accordion = defineType({
  name: 'accordion',
  type: 'object',
  title: 'Accordion',
  icon,
  initialValue: {
    backgroundColor: palette.softOat.value,
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      options: {
        list: [palette.softOat, palette.linenClay],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image (optional — creates a 60/40 layout)',
      type: 'mainImage',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'accordionItem',
          type: 'object',
          title: 'Item',
          options: {
            modal: {type: 'dialog', width: 'medium'},
          },
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [],
                  lists: [],
                  marks: {
                    decorators: [{title: 'Italic', value: 'em'}],
                    annotations: [],
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {question: 'question'},
            prepare({question}) {
              return {title: question ?? 'Untitled item'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
      items: 'items',
      image: 'image',
      disabled: 'disabled',
    },
    prepare({eyebrow, items, image, disabled}) {
      const count = Array.isArray(items) ? items.length : 0
      const title = eyebrow ?? 'Accordion'
      const subtitle = `${count} item${count !== 1 ? 's' : ''}${image ? ' · with image' : ''}`
      return {
        title: disabled ? `*** DISABLED *** ${title}` : title,
        subtitle,
        media: icon,
      }
    },
  },
})
