import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const portableTextSection: GuideSection = {
  id: 'portable-text',
  title: 'Portable Text',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        <strong>Portable Text</strong> is the rich text editor used across the site for body copy,
        hero copy, and column content. You type in Studio; the website renders headings, lists, links,
        brand colours, and special blocks consistently.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Two editor types on this site</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Full Portable Text</strong> (<em>Portable Text Block</em>) — headings H1–H5,
              brand palette colours, images, CTAs, horizontal rules, and contact info blocks. Used in
              page sections, posts, and multi-column rows.
            </>,
            <>
              <strong>Simple Portable Text</strong> — paragraphs with <strong>bold</strong>,{' '}
              <em>italic</em>, bullet/numbered lists, and links only. Used for hero copy, excerpts,
              and shorter fields.
            </>,
          ]}
        />
        <GuideParagraph>
          If you do not see colour buttons or the option to insert a CTA, you are in a Simple field —
          that is expected for that location.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Brand colours on text (full editor)</GuideSubheading>
        <GuideParagraph>
          Select the words you want to colour, then click one colour in the toolbar:
        </GuideParagraph>
        <GuideList
          items={[
            <><strong>Luxe Noir</strong> — deep charcoal</>,
            <><strong>Coastal Pine</strong> — forest green</>,
            <><strong>Dusty Sage</strong> — muted sage</>,
            <><strong>Linen Clay</strong> — warm neutral</>,
            <><strong>Soft Oat</strong> — light cream (best on dark backgrounds)</>,
          ]}
        />
        <GuideSteps
          steps={[
            <>Highlight the text (do not colour entire paragraphs unless intentional).</>,
            <>Click a single colour button — the text preview updates in the editor.</>,
            <>
              Use <strong>Soft Oat</strong> only on dark section backgrounds so it stays readable.
            </>,
          ]}
        />
        <GuideCallout tone="caution" title="One colour at a time">
          Apply <strong>only one brand colour</strong> to the same span of text. To change colour,
          select the text and apply the new colour once.
        </GuideCallout>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Links</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>URL</strong> — external link (https, http, mailto, tel). Optional “open in new
              window” for external sites.
            </>,
            <>
              <strong>Internal Link</strong> — pick a <strong>Page</strong>, <strong>Post</strong>, or{' '}
              <strong>Blog</strong> document; the site builds the correct path.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Blocks you can insert (full editor only)</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Image</strong> — upload or choose from the library; add <strong>alt text</strong>
            </>,
            <>
              <strong>CTA</strong> — button or text link (see <strong>Call to action (CTA)</strong>)
            </>,
            <>
              <strong>HR</strong> (horizontal rule) — decorative divider; optional width and spacing
            </>,
            <>
              <strong>Contact Information</strong> — phone and email block (frontend styling may still
              be in progress)
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Where you will use Portable Text</GuideSubheading>
        <GuideList
          items={[
            <>Page sections: Single Column Content Block, Multi Column Row, Hero Two Panel copy panel</>,
            <>Blog: post <strong>Body</strong> (full); <strong>Excerpt</strong> (simple)</>,
            <>Hero Banner: <strong>Copy</strong> field (simple)</>,
            <>Photo Album: optional <strong>Description</strong> (simple)</>,
          ]}
        />
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Write for scanning: short paragraphs, headings for sections, and lists where you have several
        points. Publish the parent page or post after editing so the live site updates.
      </GuideCallout>
    </Stack>
  ),
}
