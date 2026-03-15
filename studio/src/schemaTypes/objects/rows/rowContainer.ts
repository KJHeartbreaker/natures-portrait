import {TbColumns2 as icon} from 'react-icons/tb'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {palette} from '../../palette'

export const rowContainer = defineType({
  name: 'rowContainer',
  type: 'object',
  title: 'Multi Column Row',
  icon,
  fieldsets: [
    {
      title: 'Row Parameters',
      name: 'rowParams',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Title Options',
      name: 'titleOptions',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  initialValue: {
    row: 'twoColumn',
    backgroundColor: palette.softOat.value,
    overlay: 'noOverlay',
    centerTitle: false,
    hideTitle: false,
    // Must match the allowed `options.list` values (hex codes).
    titleColor: palette.luxeNoir.value,
    condensedCopy: false,
    centerCopy: false,
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'hideTitle',
      title: 'Hide Title',
      description:
        'If selected, the title will appear in the CMS, but not on the website. This is useful for identifying page sections.',
      type: 'boolean',
      fieldset: 'titleOptions',
    }),
    defineField({
      name: 'centerTitle',
      title: 'Center Title',
      description: 'If not seleted, the title will be left aligned.',
      type: 'boolean',
      fieldset: 'titleOptions',
    }),
    defineField({
      name: 'titleColor',
      title: 'Title Colour',
      type: 'string',
      description: 'Default is Dark Grey.',
      options: {
        list: [
          palette.luxeNoir,
          palette.coastalPine,
          palette.dustySage,
          palette.linenClay,
          palette.softOat,
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'titleOptions',
    }),
    defineField({
      title: 'Content Row',
      description: 'How many columns in this row?',
      type: 'string',
      name: 'row',
      options: {
        list: [
          {title: 'Two Column', value: 'twoColumn'},
          {title: 'Three Column', value: 'threeColumn'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'removeBottomPadding',
      title: 'Remove Bottom Padding',
      type: 'boolean',
      description:
        'Content Blocks have space by default, this option removes the extra space below the content if selected.',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'condensedCopy',
      type: 'boolean',
      title: 'Condensed Copy',
      description:
        'Selecting this checkbox will reduce the width of the copy block within the container, and center it within the container.',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'centerCopy',
      type: 'boolean',
      title: 'Centered Copy',
      description: 'Selecting this checkbox will center align the text within the copy block.',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'image',
      type: 'mainImage',
      title: 'Optional Background Image',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'overlay',
      type: 'string',
      title: 'Overlay',
      description: 'This value will only be applied if a background image has been selected.',
      options: {
        list: [
          {title: 'None', value: 'noOverlay'},
          {title: 'Dark', value: 'darkOverlay'},
          {title: 'Blue', value: 'blueOverlay'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Optional Background Colour',
      type: 'string',
      description:
        'If no background image is uploaded, you can choose a background colour. If no selection is made, the default is white.',
      options: {
        list: [
          palette.luxeNoir,
          palette.coastalPine,
          palette.dustySage,
          palette.linenClay,
          palette.softOat,
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'rowContent',
      type: 'array',
      title: 'Row Content',
      of: [
        defineArrayMember({type: 'carousel'}),
        defineArrayMember({
          type: 'mainImage',
          options: {hotspot: true},
        }),
        defineArrayMember({type: 'mainPortableText'}),
      ],
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
      row: 'row',
      content: 'rowContent',
      image: 'image',
      disabled: 'disabled',
    },
    prepare({title, row, disabled, image, ...rowContent}) {
      let rowType
      if (row === 'twoColumn') {
        rowType = 'Two Column Row'
      }
      if (row === 'threeColumn') {
        rowType = 'Three Column Row'
      }
      if (row === 'fourColumn') {
        rowType = 'Four Column Row'
      }

      const subs = Object.values(rowContent).filter(Boolean)

      const gatheredSubs = subs[0]?.map((sub: any) => {
        let conditionalSub

        switch (sub._type) {
          case 'mainPortableText':
            conditionalSub = sub.portableTextBlock?.[0]?.children?.[0]?.text
            break

          case 'mainImage':
            conditionalSub = sub.alt ? `Alt Text: ${sub.alt}` : 'Update this!'
            break

          default:
            conditionalSub = 'Update this!'
            break
        }

        return conditionalSub
      })

      const subtitles = gatheredSubs?.length > 0 ? `${gatheredSubs.join(', ')}` : ''
      const baseTitle = title ? `${rowType}: ${title}` : `${rowType}`

      // Try to get image from background image, or from rowContent
      let previewImage = image?.asset ? image : null
      if (!previewImage && subs[0]) {
        // Look for first image in rowContent - check carousel or mainImage
        const firstImage = subs[0].find(
          (sub: any) => sub._type === 'carousel' || sub._type === 'mainImage',
        )
        if (firstImage?._type === 'carousel' && firstImage?.carouselImages?.[0]?.asset) {
          previewImage = firstImage.carouselImages[0]
        } else if (firstImage?._type === 'mainImage' && firstImage?.asset) {
          previewImage = firstImage
        }
      }

      return {
        title: disabled ? `*** DISABLED *** ${baseTitle}` : baseTitle,
        subtitle: `${subtitles}`,
        media: previewImage || icon,
      }
    },
  },
})

