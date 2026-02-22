/* eslint-disable react/destructuring-assignment */
import {BsCardText, BsCircle, BsCircleFill} from 'react-icons/bs'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {LiaExternalLinkSquareAltSolid as internalLinkIcon} from 'react-icons/lia'

const cmmYellowIcon = () => <BsCircleFill color="#feca2d" />
const cmmYellowDecorator = (props: any) => <span style={{color: '#feca2d'}}>{props.children}</span>

const cmmBlueIcon = () => <BsCircleFill color="#057198" />
const cmmBlueDecorator = (props: any) => <span style={{color: '#057198'}}>{props.children}</span>

const cmmDarkBlueIcon = () => <BsCircleFill color="#013b63" />
const cmmDarkBlueDecorator = (props: any) => <span style={{color: '#013b63'}}>{props.children}</span>

const cmmOrangeIcon = () => <BsCircleFill color="#ee6d08" />
const cmmOrangeDecorator = (props: any) => <span style={{color: '#ee6d08'}}>{props.children}</span>

const cmmWhiteIcon = () => <BsCircle />
const cmmWhiteDecorator = (props: any) => (
  <span style={{color: 'white', backgroundColor: '#333333'}}>{props.children}</span>
)

const HighlightIcon = () => <span style={{fontWeight: 'bold', color: 'yellow'}}> H </span>
const HighlightDecorator = (props: any) => <span style={{backgroundColor: 'yellow'}}>{props.children}</span>

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
                title: 'Yellow',
                value: 'cmmYellow',
                icon: cmmYellowIcon,
                component: cmmYellowDecorator,
              },
              {
                title: 'Orange',
                value: 'cmmOrange',
                icon: cmmOrangeIcon,
                component: cmmOrangeDecorator,
              },
              {
                title: 'Blue',
                value: 'cmmBlue',
                icon: cmmBlueIcon,
                component: cmmBlueDecorator,
              },
              {
                title: 'Dark Blue',
                value: 'cmmDarkBlue',
                icon: cmmDarkBlueIcon,
                component: cmmDarkBlueDecorator,
              },
              {
                title: 'White',
                value: 'cmmWhite',
                icon: cmmWhiteIcon,
                component: cmmWhiteDecorator,
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

