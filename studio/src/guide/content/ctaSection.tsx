import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const ctaSection: GuideSection = {
  id: 'cta',
  title: 'Call to action (CTA)',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        CTAs are reusable button or text links used in heroes, portable text, and the header menu. Each
        CTA has a <strong>Title</strong> (label) and one destination type.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Destination options</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Landing page</strong> — reference a <strong>Page</strong>, <strong>Post</strong>, or{' '}
              <strong>Blog</strong> document; the site builds the correct URL.
            </>,
            <>
              <strong>External link</strong> — full URL (for example a gallery on another platform).
            </>,
            <>
              <strong>Anchor link</strong> — same-page jump (<code>#section-id</code>) or anchor on
              another page.
            </>,
            <>
              <strong>Downloadable file</strong> — uploads a file visitors can download.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Display options</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Kind</strong> — <strong>Button</strong> (pill) or <strong>Link</strong> (inline text
              style).
            </>,
            <>
              <strong>Arrow Icon</strong> — optional arrow on button CTAs.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="One destination per CTA">
        Fill in only one link type. If multiple are set, preview behaviour may be unpredictable — pick
        the single destination you intend.
      </GuideCallout>
    </Stack>
  ),
}
