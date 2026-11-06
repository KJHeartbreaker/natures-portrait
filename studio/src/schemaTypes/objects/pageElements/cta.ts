import {defineField, defineType, type Path} from 'sanity'

const DESTINATIONS = ['landingPageRoute', 'link', 'anchor', 'fileDownload'] as const

/**
 * A navigation dropdown reuses this type for its own label (Settings → menuItems[] → cta),
 * but the site only reads the title there: the label opens the dropdown and never links.
 * Detect that position so the destination fields and their warning are skipped.
 */
function isDropdownLabel(path: Path | undefined, document: unknown): boolean {
  if (!path || path[0] !== 'menuItems' || path[2] !== 'cta') return false
  const segment = path[1]
  const key = typeof segment === 'object' && segment && '_key' in segment ? segment._key : null
  const items = (document as {menuItems?: Array<{_key?: string; _type?: string}>} | undefined)
    ?.menuItems
  return items?.find((item) => item._key === key)?._type === 'navDropdownCTA'
}

const hiddenOnDropdownLabel = ({path, document}: {path: Path; document?: unknown}) =>
  isDropdownLabel(path, document)

export const cta = defineType({
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  fieldsets: [
    {
      title: 'Link to',
      name: 'destination',
      description:
        'Fill in one of these. If more than one is set, the anchor link wins, then the external link, the page, and the file.',
    },
  ],
  validation: (Rule) =>
    Rule.custom((value: Record<string, unknown> | undefined, context) => {
      if (!value) return true
      if (isDropdownLabel(context.path, context.document)) return true
      const set = DESTINATIONS.filter((key) => {
        const v = value[key]
        if (key === 'fileDownload') return Boolean((v as {asset?: unknown} | undefined)?.asset)
        return Boolean(v)
      })
      if (set.length === 0) return 'Choose where this link goes, or it won’t appear on the site.'
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
      hidden: hiddenOnDropdownLabel,
      type: 'reference',
      description: 'A page or journal entry on this site',
      fieldset: 'destination',
      to: [{type: 'page'}, {type: 'post'}],
    }),
    defineField({
      title: 'External link',
      name: 'link',
      hidden: hiddenOnDropdownLabel,
      type: 'string',
      description: 'Example: https://www.instagram.com/natures.portrait.photography/',
      fieldset: 'destination',
    }),
    defineField({
      title: 'Anchor link',
      name: 'anchor',
      hidden: hiddenOnDropdownLabel,
      type: 'string',
      description:
        'Example: #my-link for same page linking, or https://www.mywebsite.com/#my-link for linking to anchors on other pages',
      fieldset: 'destination',
    }),
    defineField({
      title: 'Downloadable file',
      name: 'fileDownload',
      hidden: hiddenOnDropdownLabel,
      type: 'file',
      fieldset: 'destination',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'landingPageRoute.slug.current',
      file: 'fileDownload.asset.originalFilename',
      link: 'link',
      anchor: 'anchor',
    },
    prepare({title, landingPage, file, link, anchor}) {
      let subtitle = 'Not set'
      if (file) subtitle = `File: ${file}`
      if (landingPage) subtitle = `Page: /${landingPage}`
      if (link) subtitle = `External: ${link}`
      if (anchor) subtitle = `Anchor: ${anchor}`
      return {title, subtitle}
    },
  },
})
