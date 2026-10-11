import type {ReactNode} from 'react'

import {
  GuideBlockDoc,
  GuideVariantDoc,
  guideVariantSectionId,
  type GuideBlockVariant,
} from '../components/GuideBlockDoc'
import {GuideCallout} from '../components/GuideCallout'
import type {GuideScreenshotItem} from '../components/GuideScreenshot'
import type {GuideSection} from '../types'

type PageBuilderBlock = {
  id: string
  title: string
  whenToUse: string
  images?: GuideScreenshotItem[]
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
        images={block.images}
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
      'A full-width hero with an optional background image, heading, subheading, body copy, and an optional call-to-action. Best as the very first section on a page.',
    images: [
      {
        src: '/static/page-builder-thumbnails/heroBanner.png',
        alt: 'Hero Banner example — full-width landscape photo with a heading in the lower left',
      },
    ],
    fields: [
      'Hero Size — Standard (min 600px tall) or X-large (min 800px tall) on desktop',
      'Text — Light (white type on photo) or Dark (charcoal type on bright areas)',
      'Text alignment — Left, Center, or Right; positions the copy block within the hero',
      'Subheading — small uppercase label above the main heading',
      'Heading — the main title (required)',
      'Copy — optional body text in Simple Portable Text (italic supported)',
      'Background Image — optional; a solid dark grey fills the hero when no image is set',
      'Hero CTA — optional call-to-action link; Light or Dark pill style',
      'Disabled — hides the block on the live site without deleting it',
    ],
    gotchas: [
      'The hero background image scrolls at a slower speed than the page (parallax), giving the photo depth as visitors scroll down.',
      'When a Hero Banner is the first section on a page, the site navigation starts fully transparent so the photo shows through. It transitions to a solid dark bar as the visitor scrolls past the hero.',
      'Text alignment positions the entire copy block (heading + copy + CTA) within the hero — left anchors it to the left edge, center centres it, right pushes it to the right.',
      'Right alignment works best with a heading and CTA only — avoid body copy, as long right-aligned paragraphs are hard to read.',
      'Light text works on darker photos; Dark text on bright or pale areas. When the photo is busy behind the text, switch to Light tone and rely on the built-in gradient vignette.',
      'Hero copy uses Simple Portable Text — no headings or CTAs inside the copy field itself; use the separate Hero CTA field for the button.',
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
    title: 'Two Column',
    whenToUse:
      'A side-by-side two-column section. Each column (panel) is either an image or text on a solid background colour. Stacks vertically on mobile.',
    fields: [
      'Column Split — 40 / 60, 50 / 50 (default), or 60 / 40 width ratio on desktop',
      'Left Panel & Right Panel — each set to Image or Text',
      'Image panel — main image with alt text',
      'Text panel — full Portable Text, a background colour from the site palette, and optional Center Text',
      'Title — optional section heading with colour, centre, or Hide Title (hidden on site, visible in Studio)',
      'Disabled',
    ],
    gotchas: [
      'Hide Title keeps a label in the CMS but removes it from the live page — useful for organizing sections.',
      'On mobile the Left Panel always appears first (above the Right Panel).',
      'Image panels stretch to match the height of the text panel beside them on desktop.',
    ],
    subsections: [
      {
        title: 'Image + Text',
        whenToUse:
          'A common pattern: set one panel to Image and the other to Text. Use the Column Split to give the image or the copy more room.',
        fields: [
          'Pick a Column Split (e.g. 60 / 40 to favour the image)',
          'Set the text panel’s background colour from the site palette for contrast',
        ],
      },
      {
        title: 'Text + Text',
        whenToUse:
          'Set both panels to Text to place two blocks of copy side by side, each on its own background colour.',
        fields: ['Choose a background colour per panel from the site palette'],
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
  {
    id: 'accordion',
    title: 'Accordion',
    whenToUse:
      'A collapsible FAQ-style list of questions and answers. Works well for FAQs, process explanations, or any content where visitors scan headings and expand only what interests them.',
    fields: [
      'Eyebrow Label — optional small uppercase label above the accordion (e.g. "FAQ")',
      'Background Colour — Soft Oat (warm off-white) or Linen Clay (warm mid-tone)',
      'Image — optional; adds a two-column layout with the accordion on the left (60%) and the image fixed on the right (40%)',
      'Items — the list of questions; each item has a Question (required) and an Answer in Simple Portable Text',
      'Disabled',
    ],
    gotchas: [
      'Adding an image creates a side-by-side layout on desktop — the image stays in view as visitors open and close items.',
      'Without an image the accordion is constrained to a comfortable reading width in the centre of the page.',
      'Answers support italic text only — no headings, lists, or inline CTAs.',
    ],
  },
]

export const pageBuilderSections: GuideSection[] = blocks.map(blockToGuideSection)
