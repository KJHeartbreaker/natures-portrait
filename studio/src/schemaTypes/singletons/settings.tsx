import {GiSettingsKnobs as icon} from 'react-icons/gi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings and Menus',
  type: 'document',
  icon,
  groups: [
    {name: 'site', title: 'Site', default: true},
    {name: 'journal', title: 'Journal page'},
  ],
  fields: [
    defineField({
      name: 'siteLogo',
      group: 'site',
      title: 'Site logo',
      type: 'image',
      description: 'Shown in the header next to the site title (links home).',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'siteFavicon',
      group: 'site',
      title: 'Favicon',
      type: 'image',
      description:
        'Browser tab icon. Use a simplified or alternate-colour square mark if the header logo is too detailed at small sizes. Falls back to the site logo when empty.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'menuItems',
      group: 'site',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      of: [
        defineArrayMember({type: 'navCTA'}),
        defineArrayMember({type: 'navDropdownCTA'}),
      ],
    }),
    defineField({
      name: 'ogImage',
      group: 'site',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
    defineField({
      name: 'journalSeo',
      type: 'seo',
      title: 'Journal page: search and sharing',
      description:
        'How the Journal page (the list of all entries) appears in Google and when it is shared. Leave any of these empty to keep the current wording.',
      group: 'journal',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
