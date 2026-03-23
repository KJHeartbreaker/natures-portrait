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
      name: 'seo',
      title: 'SEO',
      icon: BsSearch,
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'Homepage title.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description: 'Used both for the <meta> description tag for SEO, and the homepage subheader.',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: [
              {title: 'Italic', value: 'em'},
              {title: 'Strong', value: 'strong'},
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
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
      description: 'Add, edit, and reorder sections',
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName: string) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.png`,
            },
            {name: 'list'},
          ],
        },
      },
      of: [
        defineArrayMember({type: 'heroBanner'}),
        defineArrayMember({type: 'heroTwoPanel'}),
        defineArrayMember({type: 'singleColumnContentBlock'}),
        defineArrayMember({type: 'rowContainer'}),
        defineArrayMember({type: 'postsGridContainer'}),
        defineArrayMember({type: 'photoGridContainer'}),
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

