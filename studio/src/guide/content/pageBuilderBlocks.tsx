import type {ReactNode} from 'react'

import {
  GuideBlockDoc,
  GuideVariantDoc,
  guideVariantSectionId,
  type GuideBlockVariant,
} from '../components/GuideBlockDoc'
import {GuideCallout} from '../components/GuideCallout'
import type {GuideSection} from '../types'

type PageBuilderBlock = {
  id: string
  title: string
  whenToUse: string
  fields?: string[]
  gotchas?: string[]
  subsections?: GuideBlockVariant[]
  callout?: ReactNode
}

function blockToGuideSection(block: PageBuilderBlock): GuideSection {
  const children = block.subsections?.map((subsection) => ({
    id: guideVariantSectionId(block.id, subsection.title),
    title: subsection.title,
    content: <GuideVariantDoc variant={subsection} />,
  }))

  return {
    id: block.id,
    title: block.title,
    content: (
      <GuideBlockDoc
        whenToUse={block.whenToUse}
        fields={block.fields}
        gotchas={block.gotchas}
        callout={block.callout}
      />
    ),
    children: children && children.length > 0 ? children : undefined,
  }
}

const blocks: PageBuilderBlock[] = [
  {
    id: 'hero-banner',
    title: 'Hero Banner',
    whenToUse:
      'A full-width hero with optional background image, heading, subheading, body copy, and an optional call-to-action. Best for the top of a page.',
    fields: [
      'Hero Size — Standard (600px) or X-large (800px) on XL screens',
      'Subheading, Heading, Copy — text tone (Light/Dark), alignment, optional tint behind copy',
      'Background Image — optional; dark grey fallback when empty',
      'Hero CTA — optional button with Light or Dark pill style',
      'Disabled — hide on the live site without deleting',
    ],
    gotchas: [
      'Light text works on darker photos; Dark text on brighter areas. Use tint behind copy for busy backgrounds.',
      'Hero copy uses Simple Portable Text — no headings or CTAs inside the copy field itself (use the separate CTA field).',
    ],
  },
  {
    id: 'hero-two-panel',
    title: 'Hero Two Panel',
    whenToUse:
      'A split hero: image on one side and a coloured copy panel on the other. Good for feature pages with strong visuals.',
    fields: [
      'Hero Size — Standard or X-large',
      'Image panel — main image with alt text',
      'Copy panel — background colour from the site palette (Luxe Noir, Coastal Pine, Dusty Sage, Linen Clay, Soft Oat)',
      'Content — full Portable Text (headings, lists, colours, CTAs)',
      'Center Text — vertically centre copy in the panel',
      'Disabled',
    ],
  },
  {
    id: 'single-column-content-block',
    title: 'Single Column Content Block',
    whenToUse:
      'A flexible single-column section for rich text, with optional background colour and layout tweaks.',
    fields: [
      'Title — Studio-only label (does not appear on the website)',
      'Content — full Portable Text',
      'Optional Background Colour — site palette',
      'Skinny / Center Content / Remove Bottom Padding',
      'Disabled',
    ],
    gotchas: [
      'The internal Title field helps you identify sections in a long page list — it is not shown to visitors.',
    ],
  },
  {
    id: 'row-container',
    title: 'Multi Column Row',
    whenToUse:
      'Two- or three-column layouts with shared row settings. Put portable text, images, or carousels inside each column.',
    fields: [
      'Content Row — Two Column or Three Column',
      'Row Content — per-column blocks (Portable Text, Image, Carousel)',
      'Title — optional section heading with colour, centre, or Hide Title (hidden on site, visible in Studio)',
      'Optional background image or colour; overlay when a background image is set',
      'Condensed Copy / Centered Copy / Remove Bottom Padding',
      'Disabled',
    ],
    gotchas: [
      'Hide Title keeps a label in the CMS but removes it from the live page — useful for organizing sections.',
      'Column count is set once per row — pick Two Column or Three Column under Content Row.',
    ],
    subsections: [
      {
        title: 'Two Column',
        whenToUse:
          'Set Content Row to Two Column. Row content fills two side-by-side columns on desktop (stacked on mobile).',
        fields: [
          'Add two items to Row Content — typically Portable Text and/or Image in each column',
        ],
      },
      {
        title: 'Three Column',
        whenToUse:
          'Set Content Row to Three Column. Row content fills three columns on desktop (stacked on mobile).',
        fields: ['Add up to three column blocks in Row Content'],
      },
    ],
  },
  {
    id: 'posts-grid-container',
    title: 'Posts Grid',
    whenToUse:
      'Displays a curated set of blog posts you pick from the Posts library. Good for “latest writing” or featured articles on Home, Blog, or any page.',
    fields: [
      'Posts — reference picker; add published Post documents',
      'Optional Background Colour — site palette',
    ],
    gotchas: [
      'Each post must be published to appear on the live site.',
      'The grid shows data from the Post document (title, excerpt, header image) — edit the post itself to change what appears.',
    ],
    callout: (
      <GuideCallout tone="caution" title="Frontend note">
        Posts Grid layout on the live site may still show placeholder styling while design work
        continues. Content and references still save correctly in Studio.
      </GuideCallout>
    ),
  },
  {
    id: 'photo-grid-container',
    title: 'Photo Grid',
    whenToUse:
      'A responsive grid of photos — ideal for portfolios and gallery sections on Home, Blog, or Pages.',
    fields: [
      'Title — Studio-only label (optional)',
      'Photos — add Photo items (inline metadata) or standalone images',
      'Columns (desktop) — 2, 3, or 4; mobile stacks automatically',
      'Gap (px) — spacing between images',
      'Show captions — uses alt text under each photo when enabled',
      'Optional Background Colour',
      'Disabled',
    ],
    gotchas: [
      'Photo Grid supports both inline photo items and raw images — prefer Photo Album references when you want one canonical record per image.',
      'At least one photo is required.',
    ],
    callout: (
      <GuideCallout tone="caution" title="Frontend note">
        Photo Grid layout on the live site may still show placeholder styling while design work
        continues.
      </GuideCallout>
    ),
  },
]

export const pageBuilderSections: GuideSection[] = blocks.map(blockToGuideSection)
