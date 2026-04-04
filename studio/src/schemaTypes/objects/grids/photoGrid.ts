import {TfiLayoutGrid3Alt as icon} from 'react-icons/tfi'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {palette} from '../../palette'

export const photoGridContainer = defineType({
  name: 'photoGridContainer',
  type: 'object',
  title: 'Photo Grid',
  icon,
  description: 'A simple responsive grid of photos (great for portfolios).',
  initialValue: {
    backgroundColor: palette.softOat.value,
    columns: 3,
    gap: 12,
    showCaptions: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Studio-only label to help identify this section (optional).',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Optional Background Colour',
      type: 'string',
      options: {
        list: [palette.luxeNoir, palette.coastalPine, palette.dustySage, palette.linenClay, palette.softOat],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'columns',
      title: 'Columns (desktop)',
      type: 'number',
      description: 'Used as a hint for layout. Mobile will stack automatically.',
      options: {
        list: [2, 3, 4],
      },
      validation: (Rule) => Rule.min(2).max(4),
    }),
    defineField({
      name: 'gap',
      title: 'Gap (px)',
      type: 'number',
      options: {
        list: [0, 6, 12, 18, 24],
      },
      validation: (Rule) => Rule.min(0).max(48),
    }),
    defineField({
      name: 'showCaptions',
      title: 'Show captions',
      type: 'boolean',
      description: 'When enabled, shows alt text under each photo (placeholder for captions).',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      // TODO(decision): decide whether this array should allow both `photoItem` and raw `mainImage`.
      // Today it supports both, which is flexible, but it creates two possible data shapes for the frontend.
      // If we standardize on `photoItem` only, remove `mainImage` here (and simplify the GROQ projection accordingly).
      of: [defineArrayMember({type: 'photoItem'}), defineArrayMember({type: 'mainImage'})],
      validation: (Rule) => Rule.min(1),
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
      title: 'title',
      image0: 'images.0.image',
      t1: 'images.1.title',
      t2: 'images.2.title',
      t3: 'images.3.title',
      disabled: 'disabled',
    },
    prepare({title, image0, t1, t2, t3, disabled}) {
      const image1 = t1
      const image2 = t2
      const image3 = t3
      const subs = [image1, image2].filter(Boolean)
      const subtitle = subs.length ? subs.join(', ') : 'Add photos'
      const hasMore = Boolean(image3)
      const baseTitle = title ? `Photo Grid: ${title}` : 'Photo Grid'
      return {
        title: disabled ? `*** DISABLED *** ${baseTitle}` : baseTitle,
        subtitle: hasMore ? `${subtitle}…` : subtitle,
        media: image0 || icon,
      }
    },
  },
})

