/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}

// Environment variables for project configuration
const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
)
const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET',
)

// Origins Presentation may navigate to (URLPattern syntax). The preview origin is added automatically.
const presentationAllowOrigins = [
  'http://localhost:*',
  'http://127.0.0.1:*',
  'https://natures-portrait-web.vercel.app',
]

/** Website origin only — not /api/draft-mode/enable, not the Studio host. */
function getPreviewOrigin(): string {
  const raw = process.env.SANITY_STUDIO_PREVIEW_URL
  if (!raw) return 'http://localhost:3000'

  const trimmed = raw.trim()
  const withProtocol = (() => {
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(trimmed)) return `http://${trimmed}`
    return `https://${trimmed}`
  })()

  try {
    const url = new URL(withProtocol)
    if (url.pathname.includes('/api/draft-mode')) {
      console.warn(
        'SANITY_STUDIO_PREVIEW_URL should be the website origin only (e.g. http://localhost:3000), not the draft-mode API path.',
        {SANITY_STUDIO_PREVIEW_URL: raw, origin: url.origin},
      )
    }
    return url.origin
  } catch {
    console.warn('Invalid SANITY_STUDIO_PREVIEW_URL, falling back to localhost', {
      SANITY_STUDIO_PREVIEW_URL: raw,
    })
    return 'http://localhost:3000'
  }
}

const previewOrigin = getPreviewOrigin()

console.info('[Presentation] preview origin:', previewOrigin, {
  fromEnv: process.env.SANITY_STUDIO_PREVIEW_URL || '(default http://localhost:3000)',
})

if (previewOrigin.endsWith('.sanity.studio')) {
  console.warn(
    'SANITY_STUDIO_PREVIEW_URL points at the Studio. It must be the website origin (where /api/draft-mode/enable lives).',
    {previewOrigin},
  )
}

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/posts/${slug}` : undefined
    case 'page':
    case 'blogLandingPage':
      return slug ? `/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Natures Portrait',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      allowOrigins: presentationAllowOrigins,
      previewUrl: {
        initial: `${previewOrigin}/`,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/visual-editing/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "home" && _id == "home"`,
          },
          {
            route: '/:slug',
            filter: `(_type in ["page","blogLandingPage"] && slug.current == $slug) || _id == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `(_type == "post" && slug.current == $slug) || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/visual-editing/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          home: defineLocations({
            locations: [homeLocation],
            message: 'This is the homepage',
            tone: 'positive',
          }),
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          blogLandingPage: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('blogLandingPage', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug)!,
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    media(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
