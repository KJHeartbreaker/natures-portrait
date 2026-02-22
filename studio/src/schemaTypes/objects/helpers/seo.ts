import {defineField, defineType} from 'sanity'
import {CharacterCounterInput} from '../../../components/CharacterCounterInput'

/**
 * SEO Object Schema
 * Reusable SEO fields for pages, posts, and other content types
 * Based on Sanity SEO best practices: https://www.sanity.io/seo-with-sanity
 */
export const seo = defineType({
  name: 'seo',
  type: 'object',
  title: 'SEO Settings',
  description: 'Search engine optimization settings for this page',
  fields: [
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description:
        'Title tag for search engines. Should be 50-60 characters. If left empty, the page title will be used.',
      components: {
        input: CharacterCounterInput,
      },
      validation: (rule) =>
        rule
          .max(65)
          .warning('SEO titles should be 65 characters or less to avoid truncation in search results'),
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'Meta Description',
      description:
        'Description that appears in search engine results. Should be 150-155 characters. This helps users understand what your page is about.',
      rows: 3,
      components: {
        input: CharacterCounterInput,
      },
      validation: (rule) =>
        rule
          .max(155)
          .warning('Meta descriptions should be 155 characters or less to avoid truncation in search results'),
    }),
    defineField({
      name: 'noindex',
      type: 'boolean',
      title: 'Hide from Search Engines',
      description:
        'When enabled, this page will not appear in search engine results. Use for thank you pages, private content, or duplicate pages.',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description:
        "Optional: Use this only if this page's content also exists at another URL and you want search engines to treat that other URL as the primary version. Leave blank in most cases.",
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Social Sharing Image',
      description:
        'Image displayed when this page is shared on social media (Facebook, Twitter, LinkedIn, etc.). Recommended size: 1200x630 pixels. If not set, the page hero image or site default will be used.',
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
              // Check if parent image has an asset reference
              const parent = context.parent as {asset?: {_ref?: string}} | undefined
              if (parent?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'seoTitle',
      noindex: 'noindex',
    },
    prepare({title, noindex}) {
      return {
        title: title || 'Default title',
        subtitle: noindex ? 'Noindex enabled' : 'SEO settings',
      }
    },
  },
})

