import {defineField, defineType} from 'sanity'
import {MdPhoto as icon} from 'react-icons/md'

export const photoItem = defineType({
  name: 'photoItem',
  title: 'Photo Item',
  type: 'object',
  icon,
  fieldsets: [
    {name: 'details', title: 'Details', options: {collapsible: true, collapsed: false}},
    {name: 'gear', title: 'Gear', options: {collapsible: true, collapsed: true}},
    {name: 'settings', title: 'Camera Settings', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'mainImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
      fieldset: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location (optional)',
      type: 'string',
      description: 'Example: The Screes, Wastwater, Lake District',
      fieldset: 'details',
    }),
    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'simplePortableText',
      fieldset: 'details',
    }),
    defineField({
      name: 'dateCaptured',
      title: 'Date captured (optional)',
      type: 'date',
      fieldset: 'details',
    }),

    // Fast entry (strings)
    defineField({
      name: 'cameraText',
      title: 'Camera (text)',
      type: 'string',
      description: 'Quick entry. Optional if using gear references.',
      fieldset: 'gear',
    }),
    defineField({
      name: 'lensText',
      title: 'Lens (text)',
      type: 'string',
      description: 'Quick entry. Optional if using gear references.',
      fieldset: 'gear',
    }),

    // Optional references (scales later, avoids typos)
    defineField({
      name: 'cameraRef',
      title: 'Camera (reference)',
      type: 'reference',
      to: [{type: 'gear'}],
      options: {
        filter: 'kind == $kind',
        filterParams: {kind: 'camera'},
      },
      fieldset: 'gear',
    }),
    defineField({
      name: 'lensRef',
      title: 'Lens (reference)',
      type: 'reference',
      to: [{type: 'gear'}],
      options: {
        filter: 'kind == $kind',
        filterParams: {kind: 'lens'},
      },
      fieldset: 'gear',
    }),

    defineField({
      name: 'focalLength',
      title: 'Focal length (mm)',
      type: 'number',
      fieldset: 'settings',
    }),
    defineField({
      name: 'aperture',
      title: 'Aperture',
      type: 'string',
      description: 'Example: f/8',
      fieldset: 'settings',
    }),
    defineField({
      name: 'shutterSpeed',
      title: 'Shutter speed',
      type: 'string',
      description: 'Example: 1/125, 0.5s',
      fieldset: 'settings',
    }),
    defineField({
      name: 'iso',
      title: 'ISO',
      type: 'number',
      fieldset: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'image',
    },
    prepare({title, location, media}) {
      return {
        title: title || location || 'Photo',
        subtitle: title && location ? location : undefined,
        media,
      }
    },
  },
})

