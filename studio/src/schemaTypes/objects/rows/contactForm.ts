import {TbMail as icon} from 'react-icons/tb'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {palette} from '../../palette'

const linkAnnotation = (withIcon: boolean) => ({
  name: 'link',
  type: 'object' as const,
  title: 'Link',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: (Rule: any) => Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
    },
    {title: 'Open in new tab', name: 'blank', type: 'boolean'},
    ...(withIcon
      ? [
          {
            title: 'Icon',
            name: 'icon',
            type: 'string',
            options: {
              list: [
                {title: 'None', value: 'none'},
                {title: 'Email', value: 'email'},
                {title: 'Instagram', value: 'instagram'},
              ],
              layout: 'radio',
              direction: 'horizontal',
            },
            initialValue: 'none',
          },
        ]
      : []),
  ],
})

export const contactForm = defineType({
  name: 'contactForm',
  type: 'object',
  title: 'Contact Form',
  icon,
  initialValue: {
    backgroundColor: palette.softOat.value,
    submitLabel: 'Send message',
    successMessage: "Thank you — I'll be in touch soon.",
    emailSubject: 'New message from naturesportrait.ca',
  },
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow Label', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      description: 'Appears above the form. Plain text with optional bold/italic and links.',
      of: [
        defineArrayMember({
          type: 'block',
          lists: [],
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [linkAnnotation(false)],
          },
        }),
      ],
    }),
    defineField({
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      description: 'Appears below the form. Add email, Instagram, or other links — pick an icon for each.',
      of: [
        defineArrayMember({
          type: 'block',
          lists: [],
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [linkAnnotation(true)],
          },
        }),
      ],
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
      name: 'emailSubject',
      title: 'Email Subject',
      type: 'string',
      description: 'Subject line of the email Jill receives when someone submits this form.',
    }),
    defineField({
      name: 'submitLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Text on the submit button.',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      description: 'Shown to the visitor after a successful submission.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional image displayed to the right of the form (portrait orientation works best).',
      options: {hotspot: true},
    }),
    defineField({name: 'disabled', title: 'Disabled', type: 'boolean'}),
  ],
  preview: {
    select: {heading: 'heading', disabled: 'disabled'},
    prepare({heading, disabled}) {
      return {
        title: disabled ? `*** DISABLED *** Contact Form` : 'Contact Form',
        subtitle: heading,
      }
    },
  },
})
