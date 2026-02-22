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
      route: 'cta.route',
      link: 'cta.link',
    },
    prepare({title, landingPage, route, link}) {
      let subtitle = 'Not set'
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

