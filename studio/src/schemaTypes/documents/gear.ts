import {defineField, defineType} from 'sanity'
import {GiPhotoCamera as icon} from 'react-icons/gi'

export const gear = defineType({
  name: 'gear',
  title: 'Gear',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          {title: 'Camera', value: 'camera'},
          {title: 'Lens', value: 'lens'},
          {title: 'Accessory', value: 'accessory'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'camera',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nickname',
      title: 'Nickname (optional)',
      type: 'string',
      description: 'Shown in the Studio only to help Jill recognize this item.',
    }),
    defineField({
      name: 'notes',
      title: 'Notes (optional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
      description: 'Optional reference link (e.g. manufacturer page).',
    }),
  ],
  preview: {
    select: {
      kind: 'kind',
      brand: 'brand',
      model: 'model',
      nickname: 'nickname',
    },
    prepare({kind, brand, model, nickname}) {
      const title = `${brand || ''} ${model || ''}`.trim() || 'Gear'
      const subtitleParts = [kind, nickname].filter(Boolean)
      return {
        title,
        subtitle: subtitleParts.join(' · '),
      }
    },
  },
})

