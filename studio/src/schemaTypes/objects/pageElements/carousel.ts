import {GiCarousel as icon} from 'react-icons/gi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const carousel = defineType({
  name: 'carousel',
  type: 'object',
  icon,
  title: 'Carousel',
  fields: [
    defineField({
      name: 'carouselImages',
      type: 'array',
      title: 'Carousel Images',
      of: [defineArrayMember({type: 'mainImage'})],
    }),
  ],
  preview: {
    select: {
      image0: 'carouselImages.0.alt',
      image1: 'carouselImages.1.alt',
      image2: 'carouselImages.2.alt',
      image3: 'carouselImages.3.alt',
    },
    prepare({image0, image1, image2, image3}) {
      const images = [image0, image1, image2].filter(Boolean)
      const subtitle = images.length > 0 ? `${images.join(', ')}` : ''
      const hasMoreImages = Boolean(image3)

      return {
        title: hasMoreImages ? `${subtitle}…` : subtitle,
      }
    },
  },
})

