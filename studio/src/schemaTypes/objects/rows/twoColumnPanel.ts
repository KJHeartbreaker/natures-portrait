import {defineField, defineType} from 'sanity'
import {palette} from '../../palette'

export const twoColumnPanel = defineType({
  name: 'twoColumnPanel',
  type: 'object',
  title: 'Panel',
  initialValue: {
    panelType: 'text',
    backgroundColor: palette.softOat.value,
    centerText: false,
  },
  fields: [
    defineField({
      name: 'panelType',
      title: 'Panel Type',
      type: 'string',
      description: 'Choose whether this panel shows an image or text on a solid background colour.',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Text', value: 'text'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.panelType !== 'image',
      validation: (rule) =>
        rule.custom((value: {asset?: {_ref?: string}} | undefined, context) => {
          const parent = context.parent as {panelType?: string} | undefined
          if (parent?.panelType === 'image' && !value?.asset?._ref) {
            return 'Please choose an image for this panel.'
          }
          return true
        }),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'mainPortableText',
      description:
        'The text content for this panel. You can organize headings, paragraphs, and other content as needed.',
      hidden: ({parent}) => parent?.panelType !== 'text',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      description: 'Solid background colour for this text panel, chosen from the site styleguide.',
      options: {
        list: [
          palette.luxeNoir,
          palette.coastalPine,
          palette.dustySage,
          palette.linenClay,
          palette.softOat,
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({parent}) => parent?.panelType !== 'text',
    }),
    defineField({
      name: 'centerText',
      title: 'Center Text',
      description:
        'If selected, the text content will be centered. If not selected, the text will be left aligned.',
      type: 'boolean',
      hidden: ({parent}) => parent?.panelType !== 'text',
    }),
  ],
  preview: {
    select: {
      panelType: 'panelType',
      image: 'image',
      blocks: 'content.portableTextBlock',
    },
    prepare({panelType, image, blocks}) {
      if (panelType === 'image') {
        return {
          title: 'Image Panel',
          subtitle: image?.alt ? `Alt: ${image.alt}` : 'No image selected',
          media: image,
        }
      }
      const text = blocks?.[0]?.children?.[0]?.text
      return {
        title: 'Text Panel',
        subtitle: text || 'No content yet',
      }
    },
  },
})
