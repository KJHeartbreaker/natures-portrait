import {FcFlashOn as icon} from 'react-icons/fc'
import {defineField, defineType} from 'sanity'

export const heroBanner = defineType({
  title: 'Hero Banner',
  name: 'heroBanner',
  type: 'object',
  icon,
  initialValue: {
    size: 'standard',
    textTone: 'light',
    textAlign: 'left',
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'mainImage',
      title: 'Background image',
      description: 'Without an image, the background is dark grey.',
    }),
    defineField({
      title: 'Size',
      name: 'size',
      type: 'string',
      description: 'Height of the hero on large screens: Standard is 600px, X-large is 800px.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'X-large', value: 'x-large'},
        ],
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'Copy',
      name: 'copy',
      type: 'simplePortableText',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      description: 'Optional link shown below the copy, in the same colour as the hero text.',
    }),
    defineField({
      name: 'textTone',
      title: 'Text colour',
      type: 'string',
      description: 'Light: white type, for darker photos. Dark: charcoal type, for brighter photos.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      description:
        'Right works best with only a heading and CTA — right-aligned paragraphs are hard to read.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Hides this section on the site without deleting it.',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      photo: 'image',
      disabled: 'disabled',
    },
    prepare({title, photo, disabled}) {
      return {
        title: disabled ? `*** DISABLED *** Hero Banner: ${title}` : `Hero Banner: ${title}`,
        media: photo,
      }
    },
  },
})
