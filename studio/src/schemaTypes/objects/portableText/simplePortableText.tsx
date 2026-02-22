import {defineArrayMember, defineField, defineType} from 'sanity'
import {LiaExternalLinkSquareAltSolid as internalLinkIcon} from 'react-icons/lia'

export const simplePortableText = defineType({
  type: 'object',
  name: 'simplePortableText',
  title: 'Simple Portable Text Block',
  fields: [
    defineField({
      name: 'portableTextBlock',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'Block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new window',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                icon: internalLinkIcon,
                title: 'Internal Link',
                fields: [
                  {
                    name: 'item',
                    type: 'reference',
                    to: [{type: 'page'}, {type: 'post'}, {type: 'blogLandingPage'}],
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
})

