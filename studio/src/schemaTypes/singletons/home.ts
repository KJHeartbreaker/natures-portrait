import {GoHome as icon} from 'react-icons/go'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {BsSearch} from 'react-icons/bs'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: BsSearch,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'Homepage title.',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
      description: 'Configure how this page appears in search engines',
      group: 'seo',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Page sections',
      group: 'content',
      description: 'Add, edit, and reorder sections',
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName: string) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
            {name: 'list'},
          ],
        },
      },
      of: [
        defineArrayMember({type: 'heroBanner'}),
        defineArrayMember({type: 'singleColumnContentBlock'}),
        defineArrayMember({type: 'pullQuote'}),
        defineArrayMember({type: 'rowContainer'}),
        defineArrayMember({type: 'photoGridContainer'}),
        defineArrayMember({type: 'featuredCollection'}),
        defineArrayMember({type: 'seriesGrid'}),
        defineArrayMember({type: 'autoGallery'}),
        defineArrayMember({type: 'accordion'}),
        defineArrayMember({type: 'contactForm'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title,
      }
    },
  },
})

