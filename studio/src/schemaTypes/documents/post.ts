import {defineArrayMember, defineField, defineType} from 'sanity'
import {BsSearch} from 'react-icons/bs'
import {VscSettings} from 'react-icons/vsc'
import {TbMeat} from 'react-icons/tb'
import {TbNotebook as icon} from 'react-icons/tb'

export const post = defineType({
  name: 'post',
  title: 'Journal Entry',
  type: 'document',
  icon,
  groups: [
    {
      title: 'SEO',
      name: 'seo',
      icon: BsSearch,
      default: true,
    },
    {
      title: 'Post Settings',
      name: 'postSettings',
      icon: VscSettings,
    },
    {
      title: 'Post Content',
      name: 'postContent',
      icon: TbMeat,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'postSettings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'postSettings',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
      description: 'Configure how this post appears in search engines',
      group: 'seo',
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader. Should be fewer than 160 characters.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      group: 'postSettings',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
      description:
        'This field will appear in places where this post is linked. For example, in a related resources grid.',
      group: 'postSettings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Header Image',
      type: 'mainImage',
      options: {
        hotspot: true,
      },
      group: 'postContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      group: 'postSettings',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Featured entries appear as full-width rows on the journal index.',
      type: 'boolean',
      initialValue: false,
      group: 'postSettings',
    }),
    defineField({
      name: 'subheader',
      title: 'Lede',
      description: 'Opening sentence shown beneath the title. Keep it to one or two lines.',
      type: 'string',
      group: 'postContent',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'mainPortableText',
      group: 'postContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      publishedAt: 'publishedAt',
      featured: 'featured',
    },
    prepare({title, media, publishedAt, featured}) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
        : 'No date set'
      const subtitle = featured ? `★ Featured · ${date}` : date
      return {title, media, subtitle}
    },
  },
})
