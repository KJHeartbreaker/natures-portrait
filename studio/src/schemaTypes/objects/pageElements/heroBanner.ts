import {FcFlashOn as icon} from 'react-icons/fc'
import {defineField, defineType} from 'sanity'

export const heroBanner = defineType({
  title: 'Hero Banner',
  name: 'heroBanner',
  type: 'object',
  icon,
  initialValue: {
    size: 'standard',
    subHeadingColor: 'orange',
    headingColor: 'white',
    copyColor: 'white',
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
      name: 'subHeadingColor',
      title: 'Subheading Colour',
      type: 'string',
      options: {
        list: ['white', 'orange', 'blue', 'yellow', 'grey33'],
        layout: 'radio',
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
      name: 'headingColor',
      title: 'Heading Colour',
      type: 'string',
      options: {
        list: ['white', 'orange', 'blue', 'yellow', 'grey33'],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'heroCopy',
    }),
    defineField({
      title: 'Copy',
      name: 'copy',
      type: 'simplePortableText',
      fieldset: 'heroCopy',
    }),
    defineField({
      name: 'copyColor',
      title: 'Copy Colour',
      type: 'string',
      options: {
        list: ['white', 'orange', 'blue', 'yellow', 'grey33'],
        layout: 'radio',
        direction: 'horizontal',
      },
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
      name: 'overlay',
      type: 'string',
      title: 'Overlay',
      options: {
        list: [
          {title: 'None', value: 'noOverlay'},
          {title: 'Dark', value: 'darkOverlay'},
          {title: 'Blue', value: 'blueOverlay'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'heroImage',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
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

