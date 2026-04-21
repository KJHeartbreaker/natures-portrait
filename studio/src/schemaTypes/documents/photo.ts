import {defineField, defineType} from 'sanity'
import {MdPhotoAlbum as icon} from 'react-icons/md'

import {PhotoAlbumImageInput} from '../../components/PhotoAlbumImageInput'

/**
 * Canonical photo records for reuse across the site.
 * Fields mirror `photoItem` today; after a content migration, embeds will reference this type instead of inlining that object.
 */
export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
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
      type: 'albumMainImage',
      description:
        'After upload, EXIF fills empty fields and tries to link Camera / Lens gear when the match is unambiguous. Add “EXIF match hints” on a gear row (e.g. ILCE-7M4) when marketing names differ from EXIF. Re-apply overwrites linked refs when you use the button.',
      components: {
        input: PhotoAlbumImageInput,
      },
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
  orderings: [
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Date captured (newest)',
      name: 'dateCapturedDesc',
      by: [{field: 'dateCaptured', direction: 'desc'}],
    },
    {
      title: 'Date captured (oldest)',
      name: 'dateCapturedAsc',
      by: [{field: 'dateCaptured', direction: 'asc'}],
    },
    {
      title: 'Last edited',
      name: 'updatedDesc',
      by: [{field: '_updatedAt', direction: 'desc'}],
    },
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
