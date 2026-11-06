import {defineField, defineType, type Path} from 'sanity'

const DESTINATIONS = ['landingPageRoute', 'siteSection', 'link', 'anchor', 'fileDownload'] as const

/**
 * A navigation dropdown reuses this type for its own label (Settings → menuItems[] → cta).
 * There the destination is optional: with one, the label links to it and a separate
 * chevron opens the dropdown; without one, the label just opens the dropdown.
 */
function isDropdownLabel(path: Path | undefined, document: unknown): boolean {
  if (!path || path[0] !== 'menuItems' || path[2] !== 'cta') return false
  const segment = path[1]
  const key = typeof segment === 'object' && segment && '_key' in segment ? segment._key : null
  const items = (document as {menuItems?: Array<{_key?: string; _type?: string}>} | undefined)
    ?.menuItems
  return items?.find((item) => item._key === key)?._type === 'navDropdownCTA'
}

export const cta = defineType({
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  fieldsets: [
    {
      title: 'Link to',
      name: 'destination',
      description:
        'Fill in one of these. If more than one is set, the anchor link wins, then the external link, the page, the site section, and the file.',
    },
  ],
  validation: (Rule) =>
    Rule.custom((value: Record<string, unknown> | undefined, context) => {
      if (!value) return true
      const set = DESTINATIONS.filter((key) => {
        const v = value[key]
        if (key === 'fileDownload') return Boolean((v as {asset?: unknown} | undefined)?.asset)
        return Boolean(v)
      })
      if (set.length === 0 && !isDropdownLabel(context.path, context.document))
        return 'Choose where this link goes, or it won’t appear on the site.'
      if (set.length > 1) return 'Use only one link option.'
      return true
    }).warning(),
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Page',
      name: 'landingPageRoute',
      type: 'reference',
      description: 'A page or journal entry on this site',
      fieldset: 'destination',
      to: [{type: 'page'}, {type: 'post'}],
    }),
    defineField({
      title: 'Site section',
      name: 'siteSection',
      type: 'string',
      description: 'A built-in section of the site that isn’t a Page, like the list of all journal entries',
      fieldset: 'destination',
      options: {
        list: [{title: 'Journal (all entries)', value: 'journal'}],
      },
    }),
    defineField({
      title: 'External link',
      name: 'link',
      type: 'string',
      description: 'Example: https://www.instagram.com/natures.portrait.photography/',
      fieldset: 'destination',
    }),
    defineField({
      title: 'Anchor link',
      name: 'anchor',
      type: 'string',
      description:
        'Example: #my-link for same page linking, or https://www.mywebsite.com/#my-link for linking to anchors on other pages',
      fieldset: 'destination',
    }),
    defineField({
      title: 'Downloadable file',
      name: 'fileDownload',
      type: 'file',
      fieldset: 'destination',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'landingPageRoute.slug.current',
      siteSection: 'siteSection',
      file: 'fileDownload.asset.originalFilename',
      link: 'link',
      anchor: 'anchor',
    },
    prepare({title, landingPage, siteSection, file, link, anchor}) {
      let subtitle = 'Not set'
      if (file) subtitle = `File: ${file}`
      if (siteSection) subtitle = `Section: /${siteSection}`
      if (landingPage) subtitle = `Page: /${landingPage}`
      if (link) subtitle = `External: ${link}`
      if (anchor) subtitle = `Anchor: ${anchor}`
      return {title, subtitle}
    },
  },
})
