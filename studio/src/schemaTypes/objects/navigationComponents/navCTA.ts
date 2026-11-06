import {defineField, defineType} from 'sanity'

export const navCTA = defineType({
  type: 'object',
  name: 'navCTA',
  title: 'Navigation Item',
  fields: [
    defineField({
      title: 'CTA',
      name: 'cta',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'cta.title',
      landingPage: 'cta.landingPageRoute.slug.current',
      siteSection: 'cta.siteSection',
      route: 'cta.route',
      link: 'cta.link',
    },
    prepare({title, landingPage, siteSection, route, link}) {
      let subtitle = 'Not set'
      if (siteSection) {
        subtitle = `Route: /${siteSection}`
      }
      if (landingPage) {
        subtitle = `Route: /${landingPage}`
      }
      if (route) {
        subtitle = `Route: ${route}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title,
        subtitle,
      }
    },
  },
})

