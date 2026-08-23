import {MdPhotoLibrary as icon} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export const featuredCollection = defineType({
  name: 'featuredCollection',
  title: 'Featured Collection',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Displayed in italic below the heading',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simplePortableText',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Defaults to "View the full series"',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      description: 'The series this block links to',
    }),
    defineField({
      name: 'photo',
      title: 'Feature Photo',
      type: 'reference',
      to: [{type: 'photo'}],
      description: 'The main image displayed for this feature',
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
      media: 'photo.image',
      disabled: 'disabled',
    },
    prepare({title, subtitle, media, disabled}) {
      return {
        title: disabled ? `*** DISABLED *** ${title}` : (title || 'Featured Collection'),
        subtitle,
        media,
      }
    },
  },
})
