import {TbColumns2 as icon} from 'react-icons/tb'
import {defineField, defineType} from 'sanity'
import {palette} from '../../palette'

export const rowContainer = defineType({
  name: 'rowContainer',
  type: 'object',
  title: 'Two Column',
  icon,
  fieldsets: [
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
    split: '50-50',
    centerTitle: false,
    hideTitle: false,
    // Must match the allowed `options.list` values (hex codes).
    titleColor: palette.luxeNoir.value,
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Optional heading shown above the two columns.',
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
      description: 'If not selected, the title will be left aligned.',
      type: 'boolean',
      fieldset: 'titleOptions',
    }),
    defineField({
      name: 'titleColor',
      title: 'Title Colour',
      type: 'string',
      description: 'Default is Luxe Noir.',
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
      title: 'Column Split',
      description: 'The width ratio of the left and right columns on desktop. Default is 50 / 50.',
      type: 'string',
      name: 'split',
      options: {
        list: [
          {title: '40 / 60', value: '40-60'},
          {title: '50 / 50', value: '50-50'},
          {title: '60 / 40', value: '60-40'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'leftPanel',
      title: 'Left Panel',
      type: 'twoColumnPanel',
    }),
    defineField({
      name: 'rightPanel',
      title: 'Right Panel',
      type: 'twoColumnPanel',
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
      split: 'split',
      disabled: 'disabled',
      leftType: 'leftPanel.panelType',
      rightType: 'rightPanel.panelType',
      leftImage: 'leftPanel.image',
      rightImage: 'rightPanel.image',
      leftBlocks: 'leftPanel.content.portableTextBlock',
      rightBlocks: 'rightPanel.content.portableTextBlock',
    },
    prepare({
      title,
      split,
      disabled,
      leftType,
      rightType,
      leftImage,
      rightImage,
      leftBlocks,
      rightBlocks,
    }) {
      const describePanel = (
        panelType: string | undefined,
        blocks: {children?: {text?: string}[]}[] | undefined,
      ) => {
        if (panelType === 'image') return 'Image'
        const text = blocks?.[0]?.children?.[0]?.text
        return text ? `Text: ${text}` : 'Text'
      }

      const ratio = split ? split.replace('-', ' / ') : '50 / 50'
      const baseTitle = title ? `Two Column (${ratio}): ${title}` : `Two Column (${ratio})`
      const subtitle = `${describePanel(leftType, leftBlocks)} · ${describePanel(rightType, rightBlocks)}`

      const previewImage = leftImage?.asset ? leftImage : rightImage?.asset ? rightImage : null

      return {
        title: disabled ? `*** DISABLED *** ${baseTitle}` : baseTitle,
        subtitle,
        media: previewImage || icon,
      }
    },
  },
})
