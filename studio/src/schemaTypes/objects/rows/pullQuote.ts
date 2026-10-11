import {TbQuote as icon} from 'react-icons/tb'
import {defineField, defineType} from 'sanity'
import {palette} from '../../palette'

export const pullQuote = defineType({
  name: 'pullQuote',
  type: 'object',
  title: 'Pull Quote',
  icon,
  initialValue: {
    backgroundColor: palette.luxeNoir.value,
  },
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      options: {
        list: [palette.luxeNoir, palette.dustySage, palette.coastalPine],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Who said it — e.g. "Elliott Erwitt"',
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
      quote: 'quote',
      attribution: 'attribution',
      disabled: 'disabled',
    },
    prepare({quote, attribution, disabled}) {
      const title = attribution ? `Pull Quote — ${attribution}` : 'Pull Quote'
      const subtitle = quote ? `"${quote.slice(0, 80)}${quote.length > 80 ? '…' : ''}"` : 'No quote yet'
      return {
        title: disabled ? `*** DISABLED *** ${title}` : title,
        subtitle,
        media: icon,
      }
    },
  },
})
