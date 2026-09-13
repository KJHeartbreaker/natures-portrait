import {MdPhotoLibrary as icon} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export const autoGallery = defineType({
  name: 'autoGallery',
  title: 'Auto Gallery',
  type: 'object',
  icon,
  description: 'Displays all published photos from the Photo Library with collection filters. No manual curation needed.',
  fields: [
    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Setting this to true will disable the component, but not delete it.',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {disabled: 'disabled'},
    prepare({disabled}) {
      return {
        title: disabled ? '*** DISABLED *** Auto Gallery' : 'Auto Gallery',
        subtitle: 'All published photos · filterable by collection',
      }
    },
  },
})
