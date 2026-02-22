import {FcTemplate as icon} from 'react-icons/fc'
import {defineField, defineType} from 'sanity'

export const heroTwoPanel = defineType({
  title: 'Hero Two Panel',
  name: 'heroTwoPanel',
  type: 'object',
  icon,
  initialValue: {
    size: 'standard',
    backgroundColor: '#057198',
  },
  fieldsets: [
    {
      title: 'Hero Settings',
      name: 'heroSettings',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Image Panel',
      name: 'imagePanel',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Copy Panel',
      name: 'copyPanel',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      title: 'Hero Size',
      name: 'size',
      type: 'string',
      description:
        'This establishes the height of the hero banner on desktop devices. Standard is 600px on XL screens, and X-large is 800px on XL screens.',
      options: {
        layout: 'radio',
        list: ['standard', 'x-large'],
        direction: 'horizontal',
      },
      fieldset: 'heroSettings',
    }),
    defineField({
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      description: 'The image for the image panel.',
      fieldset: 'imagePanel',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      description: 'Background colour for the copy panel.',
      options: {
        list: [
          {title: 'Blue', value: '#16abcc'},
          {title: 'Orange', value: '#ee6d08'},
          {title: 'Yellow', value: '#feca2d'},
          {title: 'White', value: '#ffffff'},
          {title: 'Dark Grey', value: '#323943'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'copyPanel',
    }),
    defineField({
      name: 'mainPortableText',
      type: 'mainPortableText',
      title: 'Content',
      description:
        'The content for the copy panel. You can organize headings, paragraphs, and other content as needed.',
      fieldset: 'copyPanel',
    }),
    defineField({
      name: 'centerText',
      title: 'Center Text',
      description:
        'If selected, the text content will be centered. If not selected, the text will be left aligned.',
      type: 'boolean',
      fieldset: 'copyPanel',
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Setting this to true will disable the component, but not delete it.',
      type: 'boolean',
      fieldset: 'heroSettings',
    }),
  ],
  preview: {
    select: {
      blocks: 'mainPortableText.portableTextBlock',
      photo: 'image',
      disabled: 'disabled',
    },
    prepare({blocks, photo, disabled}) {
      const displayTitle = blocks?.[0]?.children?.[0]?.text || 'Hero Two Panel'
      return {
        title: disabled ? `*** DISABLED *** Hero Two Panel: ${displayTitle}` : `Hero Two Panel: ${displayTitle}`,
        subtitle: blocks?.[0]?.children?.[0]?.text,
        media: photo,
      }
    },
  },
})

