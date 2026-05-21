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
    tintBehindCopy: false,
    ctaTone: 'light',
  },
  fieldsets: [
    {
      title: 'Hero Copy',
      name: 'heroCopy',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Hero CTA',
      name: 'heroCTA',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      title: 'Hero Size',
      name: 'size',
      type: 'string',
      description:
        'This establishes the height of the hero banner. Standard is 600px on XL screens, and X-large is 800px on XL screens.',
      options: {
        layout: 'radio',
        list: ['standard', 'x-large'],
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'Subheading',
      name: 'subheading',
      type: 'string',
      fieldset: 'heroCopy',
    }),
    defineField({
      name: 'textTone',
      title: 'Text',
      type: 'string',
      description:
        'Light: white type on the photo. Dark: rich charcoal type. With tint on, a soft shape sits behind the headline and copy only—a dark splash for light text, a light splash for dark text.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        direction: 'horizontal',
      },
      fieldset: 'heroCopy',
    }),
    defineField({
      name: 'tintBehindCopy',
      title: 'Tint behind copy',
      type: 'boolean',
      description:
        'Adds a very subtle glow on the type so it separates from the photo (faint halo—no box or overlay on the image). Off: clean type with no halo.',
      fieldset: 'heroCopy',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      description: 'Horizontal position of the headline, copy, and CTA.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        direction: 'horizontal',
      },
      fieldset: 'heroCopy',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
      fieldset: 'heroCopy',
    }),
    defineField({
      title: 'Copy',
      name: 'copy',
      type: 'simplePortableText',
      fieldset: 'heroCopy',
    }),
    defineField({
      name: 'image',
      type: 'mainImage',
      title: 'Background Image',
      description:
        'If no background image is uploaded, the background colour will be dark grey. For the hero images, a height is not required.',
      fieldset: 'heroImage',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      fieldset: 'heroCTA',
    }),
    defineField({
      name: 'ctaTone',
      title: 'CTA style',
      type: 'string',
      description:
        'Light: pale pill with dark text—stands out on bright areas of the photo. Dark: black pill with white text—stands out on darker areas.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        direction: 'horizontal',
      },
      fieldset: 'heroCTA',
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
      title: 'heading',
      subtitle: 'subheading',
      photo: 'image',
      content: 'content.0.children',
      disabled: 'disabled',
    },
    prepare({title, photo, content, disabled}) {
      return {
        title: disabled ? `*** DISABLED *** Hero Banner: ${title}` : `Hero Banner: ${title}`,
        subtitle: content && content[0]?.text,
        media: photo,
      }
    },
  },
})
