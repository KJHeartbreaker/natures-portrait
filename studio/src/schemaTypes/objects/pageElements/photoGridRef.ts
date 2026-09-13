import {defineField, defineType} from 'sanity'
import {MdPhoto as icon} from 'react-icons/md'

export const photoGridRef = defineType({
  name: 'photoGridRef',
  title: 'Photo (from Library)',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'reference',
      to: [{type: 'photo'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleOverride',
      title: 'Title override',
      type: 'string',
      description: 'Leave blank to use the title from the Photo Library.',
    }),
    defineField({
      name: 'descriptionOverride',
      title: 'Description override',
      type: 'simplePortableText',
      description: 'Leave blank to use the description from the Photo Library.',
    }),
  ],
  preview: {
    select: {
      title: 'titleOverride',
      photoTitle: 'photo.title',
      photoLocation: 'photo.location',
      media: 'photo.image',
    },
    prepare({title, photoTitle, photoLocation, media}) {
      return {
        title: title || photoTitle || photoLocation || 'Photo',
        subtitle: title && (photoTitle || photoLocation) ? (photoTitle || photoLocation) : undefined,
        media,
      }
    },
  },
})
