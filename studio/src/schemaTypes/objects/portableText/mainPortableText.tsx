/* eslint-disable react/destructuring-assignment */
import {BsCardText, BsCircle, BsCircleFill} from 'react-icons/bs'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {LiaExternalLinkSquareAltSolid as internalLinkIcon} from 'react-icons/lia'
import {palette} from '../../palette'

const luxeNoirIcon = () => <BsCircleFill color={palette.luxeNoir.value} />
const luxeNoirDecorator = (props: any) => <span style={{color: palette.luxeNoir.value}}>{props.children}</span>

const coastalPineIcon = () => <BsCircleFill color={palette.coastalPine.value} />
const coastalPineDecorator = (props: any) => <span style={{color: palette.coastalPine.value}}>{props.children}</span>

const dustySageIcon = () => <BsCircleFill color={palette.dustySage.value} />
const dustySageDecorator = (props: any) => <span style={{color: palette.dustySage.value}}>{props.children}</span>

const linenClayIcon = () => <BsCircleFill color={palette.linenClay.value} />
const linenClayDecorator = (props: any) => <span style={{color: palette.linenClay.value}}>{props.children}</span>

const softOatIcon = () => <BsCircle color={palette.softOat.value} />
const softOatDecorator = (props: any) => (
  <span style={{color: palette.softOat.value, backgroundColor: palette.luxeNoir.value}}>{props.children}</span>
)

const HighlightIcon = () => <span style={{fontWeight: 'bold', color: palette.softOat.value}}> H </span>
const HighlightDecorator = (props: any) => (
  <span style={{backgroundColor: palette.coastalPine.value, color: palette.softOat.value}}>{props.children}</span>
)

export const mainPortableText = defineType({
  type: 'object',
  name: 'mainPortableText',
  title: 'Portable Text Block',
  icon: BsCardText,
  fields: [
    defineField({
      name: 'portableTextBlock',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'Block',
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {
                title: palette.luxeNoir.title,
                value: 'luxeNoir',
                icon: luxeNoirIcon,
                component: luxeNoirDecorator,
              },
              {
                title: palette.coastalPine.title,
                value: 'coastalPine',
                icon: coastalPineIcon,
                component: coastalPineDecorator,
              },
              {
                title: palette.dustySage.title,
                value: 'dustySage',
                icon: dustySageIcon,
                component: dustySageDecorator,
              },
              {
                title: palette.linenClay.title,
                value: 'linenClay',
                icon: linenClayIcon,
                component: linenClayDecorator,
              },
              {
                title: palette.softOat.title,
                value: 'softOat',
                icon: softOatIcon,
                component: softOatDecorator,
              },
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {
                title: 'Highlight',
                value: 'highlight',
                icon: HighlightIcon,
                component: HighlightDecorator,
              },
              {title: 'Strike', value: 'strike-through'},
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
        defineArrayMember({
          title: 'CTA',
          name: 'cta',
          type: 'cta',
        }),
        defineArrayMember({
          name: 'hr',
          title: 'HR',
          type: 'object',
          fields: [
            defineField({
              name: 'hr',
              title: 'hr',
              type: 'string',
              readOnly: true,
              initialValue: '--- Horizontal Rule ---',
            }),
            defineField({
              name: 'size',
              type: 'string',
              description: 'This value determines the spacing above and below the line.',
              initialValue: '25',
            }),
            defineField({
              name: 'width',
              type: 'string',
              description: 'This value is a percentage of the container.',
              initialValue: '70',
            }),
          ],
        }),
        defineArrayMember({
          name: 'contactInfo',
          title: 'Contact Information',
          type: 'contactInfo',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      blocks: 'portableTextBlock',
    },
    prepare(blocks) {
      const displayTitle = blocks?.blocks?.[0]?.children?.[0]?.text
      return {
        title: displayTitle || 'Portable Text Block',
      }
    },
  },
})

