import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
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
        and inserted images consistently.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Two editor types on this site</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Full Portable Text</strong>: paragraphs, headings H1–H5, quotes, lists, links,
              and inserted blocks (images, CTAs, dividers). Used in Single Column Content Blocks, Two
              Column text panels, and the Body of Journal Entries.
            </>,
            <>
              <strong>Simple Portable Text</strong>: paragraphs with <strong>bold</strong>,{' '}
              <em>italic</em>, bullet and numbered lists, and links only. Used for Hero copy, Featured
              Collection body, journal Excerpts, and photo Descriptions.
            </>,
          ]}
        />
        <GuideParagraph>
          If you do not see the style menu or the option to insert an image or CTA, you are in a Simple
          field. That is expected there.
        </GuideParagraph>
        <GuideShot
          file="pt-toolbar.webp"
          alt="The full text editor with its toolbar highlighted: style menu, formatting buttons, ⋯, CTA, HR, and another ⋯"
          caption="The full editor's toolbar. Click into the text first; the buttons are greyed out until you do."
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Text styles and formatting (full editor)</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Style menu</strong>: Paragraph, H1–H5, and Quote. Use one H1 at most per page
              (the page title usually covers it) and H2/H3 for sections within it.
            </>,
            <>
              <strong>Bold</strong>, <em>Italic</em>, <strong>Underline</strong>, and{' '}
              <strong>Strike</strong>.
            </>,
            <>
              <strong>Highlight</strong> (the <strong>H</strong> button): light text on a Coastal Pine
              band. Use it for a word or short phrase, not whole paragraphs.
            </>,
            <>
              <strong>Bullet</strong> and <strong>Numbered</strong> lists.
            </>,
          ]}
        />
        <GuideParagraph>
          Text colour is set by the section, not by the editor: on a dark background the text turns
          light automatically.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Links</GuideSubheading>
        <GuideParagraph>
          Select the text, then choose a link type from the toolbar. In a narrow panel the list and
          link buttons are tucked into the <strong>⋯</strong> next to the formatting buttons.
        </GuideParagraph>
        <GuideShot
          file="pt-overflow.webp"
          alt="The ⋯ menu in the text toolbar open, showing Bullet, Number, URL, and Internal Link"
          caption="With a word selected, the ⋯ menu holds the list buttons and both link types."
        />
        <GuideList
          items={[
            <>
              <strong>URL</strong>: a web address (https), email (<code>mailto:</code>), or phone
              number (<code>tel:</code>). Turn on “Open in new window” for other websites.
            </>,
            <>
              <strong>Internal Link</strong>: pick a <strong>Page</strong> or{' '}
              <strong>Journal Entry</strong> and the site builds the correct address. Use this rather
              than pasting a naturesportrait.ca URL, so links survive slug changes.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Blocks you can insert (full editor only)</GuideSubheading>
        <GuideParagraph>
          Put the cursor where you want the block, then use the buttons at the right of the toolbar.{' '}
          <strong>CTA</strong> and <strong>HR</strong> are shown directly; <strong>Image</strong> is in
          the <strong>⋯</strong> after them.
        </GuideParagraph>
        <GuideShot
          file="pt-insert.webp"
          alt="The right-hand ⋯ in the text toolbar open, showing Image, next to the CTA and HR buttons"
        />
        <GuideList
          items={[
            <>
              <strong>Image</strong>: upload or choose from the media library, and add{' '}
              <strong>alt text</strong>.
            </>,
            <>
              <strong>CTA</strong>: an underlined text link with an arrow (see{' '}
              <strong>Call to action (CTA)</strong>).
            </>,
            <>
              <strong>HR</strong>: a hairline divider between parts of the text.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Other text fields</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Accordion</strong> answers: italic only.
            </>,
            <>
              <strong>Contact Form</strong> intro and contact links: bold, italic, and links. Contact
              links also have an icon option (see <strong>Contact Form</strong>).
            </>,
            <>
              <strong>Pull Quote</strong>: plain text, with no formatting.
            </>,
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
