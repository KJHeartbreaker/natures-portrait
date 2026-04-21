import {defineField, defineType} from 'sanity'

/**
 * Same as `mainImage`, but requests EXIF / camera tags / GPS on upload so the Photo Album
 * input can map metadata into document fields. Only use where that behaviour is intended.
 */
export const albumMainImage = defineType({
  name: 'albumMainImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette', 'exif', 'image', 'location'],
  },
  initialValue: {
    overlay: 'noOverlay',
  },
  fields: [
    defineField({
      name: 'width',
      type: 'number',
      title: 'Width',
      description:
        'Width and height are helpful so that the CDN serves the correct image size, and maintains aspect ratio. Populate these fields with a pixel value',
    }),
    defineField({
      name: 'height',
      type: 'number',
      title: 'Height',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility. Describe what the image shows.',
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const parent = context.parent as {asset?: {_ref?: string}} | undefined
          if (parent?.asset?._ref && !alt) {
            return 'Alternative text is required for SEO and accessibility.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt',
    },
  },
})
