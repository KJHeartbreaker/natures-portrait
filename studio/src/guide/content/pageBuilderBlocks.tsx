import type {ReactNode} from 'react'

import {
  GuideBlockDoc,
  GuideVariantDoc,
  guideVariantSectionId,
  type GuideBlockVariant,
} from '../components/GuideBlockDoc'
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

/** Same images the Page sections insert menu uses, served from `studio/static/page-builder-thumbnails/`. */
function thumbnail(schemaTypeName: string, alt: string, caption?: string): GuideScreenshotItem {
  return {src: `/static/page-builder-thumbnails/${schemaTypeName}.webp`, alt, caption}
}

// Ordered to match the Page sections insert menu.
const blocks: PageBuilderBlock[] = [
  {
    id: 'hero-banner',
    title: 'Hero Banner',
    whenToUse:
      'A full-width hero with an optional background image, heading, body copy, and an optional call-to-action. Best as the very first section on a page.',
    images: [
      thumbnail(
        'heroBanner',
        'Hero Banner example: full-width landscape photo with a heading in the lower left',
      ),
    ],
    fields: [
      'Heading: the main title (required)',
      'Background image: optional; a solid dark grey fills the hero when no image is set',
      'Size: Standard (600px tall) or X-large (800px tall) on large screens',
      'Copy: optional body text in Simple Portable Text',
      'CTA: optional link below the copy, in the same colour as the hero text',
      'Text colour: Light (white type for darker photos) or Dark (charcoal type for brighter photos)',
      'Text alignment: Left, Center, or Right; positions the copy block within the hero',
      'Disabled: hides the block on the live site without deleting it',
    ],
    gotchas: [
      'The background photo scrolls slower than the page (parallax), which gives it depth as visitors scroll.',
      'When a Hero Banner is the first section on a page, the site navigation starts transparent so the photo shows through, then turns into a solid dark bar as the visitor scrolls past.',
      'Right alignment works best with a heading and CTA only. Long right-aligned paragraphs are hard to read.',
      'Light text suits darker photos and Dark text suits bright or pale ones. If the photo is busy behind the text, use Light and let the built-in shading do the work.',
      'Set the image hotspot (click the image, then the crop icon) so the important part of the photo stays in frame on phones.',
    ],
  },
  {
    id: 'single-column-content-block',
    title: 'Single Column Content Block',
    whenToUse:
      'A single centred column of rich text: an introduction, an artist statement, print information, and so on.',
    images: [
      thumbnail(
        'singleColumnContentBlock',
        'Single Column Content Block example: a short centred paragraph about limited edition prints on a Linen Clay background',
      ),
    ],
    fields: [
      'Title: Studio-only label to help you find the section in a long list (not shown on the website)',
      'Content: full Portable Text (headings, lists, images, CTAs)',
      'Row Parameters → Optional Background Colour: any colour from the site palette (default Soft Oat)',
      'Disabled',
    ],
    gotchas: [
      'Text colour adjusts automatically to the background: light type on Luxe Noir, Coastal Pine, and Dusty Sage, dark type on the lighter colours.',
      'Row Parameters also has Skinny, Center Content, and Remove Bottom Padding. The current site design does not use them: the block is always centred at a comfortable reading width with standard spacing.',
    ],
  },
  {
    id: 'pull-quote',
    title: 'Pull Quote',
    whenToUse:
      'A full-width band with one large italic quote, a pause between photo-heavy sections. Use it sparingly: one per page is plenty.',
    images: [
      thumbnail(
        'pullQuote',
        'Pull Quote example: a short italic quote with a small attribution beneath it, centred on Dusty Sage',
      ),
    ],
    fields: [
      'Background Colour: Luxe Noir (default), Dusty Sage, or Coastal Pine',
      'Quote: the quote itself (required). Do not type quotation marks; the site adds them.',
      'Attribution: optional; who said it (shown in small capitals after a dash)',
      'Disabled',
    ],
    gotchas: ['Short quotes read best. Aim for one or two sentences.'],
  },
  {
    id: 'row-container',
    title: 'Two Column',
    whenToUse:
      'A side-by-side two-column section. Each column (panel) is either an image or text on a solid background colour. Stacks vertically on mobile.',
    images: [
      thumbnail(
        'rowContainer',
        'Two Column example: an ocean photo in the left panel and a heading, paragraph, and text link in the right panel',
      ),
    ],
    fields: [
      'Title: optional heading shown above the two columns',
      'Title Options: Hide Title (kept in Studio, hidden on the site), Center Title, and Title Colour',
      'Column Split: 40 / 60, 50 / 50 (default), or 60 / 40 width ratio on desktop',
      'Left Panel and Right Panel: each set to Image or Text',
      'Image panel: an image with alt text (required when the panel type is Image)',
      'Text panel: full Portable Text, a background colour from the site palette, and optional Center Text',
      'Disabled',
    ],
    gotchas: [
      'Hide Title keeps a label in the CMS but removes it from the live page, which is handy for organising sections.',
      'On mobile the Left Panel always appears first (above the Right Panel).',
      'Image panels stretch to match the height of the text panel beside them on desktop.',
    ],
    subsections: [
      {
        title: 'Image + Text',
        whenToUse:
          'The most common pattern: set one panel to Image and the other to Text. Use the Column Split to give the image or the copy more room.',
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
    id: 'photo-grid-container',
    title: 'Photo Grid',
    whenToUse:
      'A hand-picked grid of photos. Use it when you want to choose exactly which photos appear and in what order. To show a whole collection, link to its series page instead (see Series Grid and Featured Collection).',
    images: [
      thumbnail(
        'photoGridContainer',
        'Photo Grid example: three photos in a row (a wave, a mossy log, a snowy peak) under a small eyebrow label on Dusty Sage',
      ),
    ],
    fields: [
      'Eyebrow Label: optional small uppercase label above the grid; leave blank to hide it',
      'Title: Studio-only label (optional)',
      'Optional Background Colour: any colour from the site palette (default Soft Oat)',
      'Columns (desktop): 2, 3, or 4; phones stack automatically',
      'Gap (px): spacing between photos',
      'Show captions: shows each photo’s title (or its alt text if it has no title) under the image',
      'Photos: at least one is required',
      'Disabled',
    ],
    gotchas: [
      'Click Add photos to open a picker with thumbnails of the whole Photo Library, tick as many as you like, and add them in one go. Photos already in the grid are greyed out.',
      'Library photos can take a Title override or Description override just for this grid. Leave them blank to use the Photo Library values.',
      'Visitors can click any photo to open it larger, with its title, location, and camera details.',
      'Prefer photos from the Photo Library over uploading a one-off Photo Item, so captions and gear stay in one place.',
    ],
  },
  {
    id: 'featured-collection',
    title: 'Featured Collection',
    whenToUse:
      'Spotlights one series: a large photo on the left, a heading and short text on the right, and a link to the full series page.',
    images: [
      thumbnail(
        'featuredCollection',
        'Featured Collection example: a misty golden coastline photo on the left with a heading, italic subheading, short paragraph, and a "Explore the gallery" link on the right',
      ),
    ],
    fields: [
      'Eyebrow Label: small label above the section (defaults to "Featured Work")',
      'Heading and Subheading: the subheading shows in italic below the heading',
      'Body: short text in Simple Portable Text',
      'CTA Label: link text (defaults to "View the full series")',
      'Collection: the series the link goes to (its page at /series/collection-slug)',
      'Feature Photo: a photo from the Photo Library',
      'Disabled',
    ],
    gotchas: [
      'The link only appears once a Collection is chosen.',
      'The photo’s Location from the Photo Library shows as a small caption under the image.',
      'The Feature Photo does not have to belong to the collection, but it reads best when it does.',
    ],
  },
  {
    id: 'series-grid',
    title: 'Series Grid',
    whenToUse:
      'A row of portrait cards, one per collection, each linking to that series page. Good on Home as a way into the work.',
    images: [
      thumbnail(
        'seriesGrid',
        'Series Grid example: three tall photo cards titled Water, Black & White, and Mountains, each with a photo count',
      ),
    ],
    fields: [
      'Eyebrow Label: small label above the grid (defaults to "Series")',
      'Series: pick up to 4 collections',
      'Disabled',
    ],
    gotchas: [
      'Each card uses the collection’s Cover Photo, its Title, and the number of photos in it. Set a Cover Photo on every collection you show here.',
      'Cards appear three across on desktop and two across on phones.',
      'Clicking a card opens the series page (/series/collection-slug), which shows every photo in that collection.',
    ],
  },
  {
    id: 'auto-gallery',
    title: 'Auto Gallery',
    whenToUse:
      'The full gallery: every published photo in the Photo Library, with a row of collection filters across the top. Nothing to curate, since new photos appear automatically once published.',
    images: [
      thumbnail(
        'autoGallery',
        'Auto Gallery example: a row of filter labels (All, Abstracts, Black & White, Mountains, and more) above a three-column grid of captioned photos',
      ),
    ],
    fields: ['Disabled: the only setting; everything else comes from the Photo Library'],
    gotchas: [
      'The filters are your Collections, in alphabetical order, plus All. A photo shows under every collection it belongs to.',
      'Captions use each photo’s title, so give library photos a title.',
      'Use one Auto Gallery per site, usually on a Gallery page.',
    ],
  },
  {
    id: 'accordion',
    title: 'Accordion',
    whenToUse:
      'A collapsible list of questions and answers. Works well for FAQs, print care, or any content where visitors scan headings and open only what interests them.',
    images: [
      thumbnail(
        'accordion',
        'Accordion example: five questions about limited edition prints on the left and a tall sunset photo on the right',
      ),
    ],
    fields: [
      'Eyebrow Label: optional small uppercase label above the accordion (e.g. "FAQ")',
      'Background Colour: Soft Oat or Linen Clay',
      'Image: optional; adds a two-column layout with the accordion on the left (60%) and the image on the right (40%)',
      'Items: the list of questions; each has a Question (required) and an Answer',
      'Disabled',
    ],
    gotchas: [
      'With an image, the photo stays in view on desktop as visitors open and close items.',
      'Without an image the accordion sits at a comfortable reading width in the centre of the page.',
      'Answers support italic text only: no headings, lists, or links.',
    ],
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    whenToUse:
      'The contact form, with an optional photo beside it. Messages are emailed to Jill from naturesportrait.ca.',
    images: [
      thumbnail(
        'contactForm',
        'Contact Form example: "Get in touch" heading, name, email, and message fields, a Send message button, and email and Instagram links, with a seashell photo on the right',
      ),
    ],
    fields: [
      'Eyebrow Label and Heading: shown above the form',
      'Intro: short text above the form (bold, italic, and links)',
      'Contact Links: lines shown below the form, such as an email address or Instagram. Select the text, add a Link, and pick an icon (Email, Instagram, or none).',
      'Background Colour: Soft Oat or Linen Clay',
      'Email Subject: the subject line of the email Jill receives',
      'Button Label: text on the submit button (default "Send message")',
      'Success Message: shown to the visitor after their message is sent',
      'Image: optional photo to the right of the form (portrait orientation works best)',
      'Disabled',
    ],
    gotchas: [
      'Visitors fill in name, email, and message. Replies to the email go straight to the visitor.',
      'The form is protected by invisible reCAPTCHA, so there is nothing to set up in Studio.',
      'The footer links to /contact, so keep the contact form on a page with the slug contact.',
    ],
  },
]

export const pageBuilderSections: GuideSection[] = blocks.map(blockToGuideSection)
