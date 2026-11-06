import {defineArrayMember, defineField, defineType} from 'sanity'

export const navDropdownCTA = defineType({
  type: 'object',
  name: 'navDropdownCTA',
  title: 'Navigation Dropdown',
  fields: [
    defineField({
      title: 'Label',
      name: 'cta',
      type: 'cta',
      description: 'The name shown in the menu. It opens the dropdown, so it doesn’t link anywhere.',
      validation: (Rule) =>
        Rule.custom((value: {title?: string} | undefined) =>
          value?.title?.trim() ? true : 'Give the dropdown a title.',
        ),
    }),
    defineField({
      type: 'array',
      title: 'Dropdown Items',
      name: 'subnav',
      description: 'The links that appear when the dropdown opens.',
      of: [defineArrayMember({type: 'cta'})],
      validation: (Rule) => Rule.required().min(1).error('Add at least one link to the dropdown.'),
    }),
  ],
  preview: {
    select: {
      title: 'cta',
      subnav0: 'subnav.0.title',
      subnav1: 'subnav.1.title',
      subnav2: 'subnav.2.title',
      subnav3: 'subnav.3.title',
      subnav4: 'subnav.4.title',
    },
    prepare({title, subnav0, subnav1, subnav2, subnav3, subnav4}) {
      const subs = [subnav0, subnav1, subnav2, subnav3].filter(Boolean)
      const subtitle = subs.length > 0 ? `${subs.join(', ')}` : ''
      const hasMoreSubs = Boolean(subnav4)

      return {
        title: title?.title,
        subtitle: hasMoreSubs ? `${subtitle}…` : subtitle,
      }
    },
  },
})

