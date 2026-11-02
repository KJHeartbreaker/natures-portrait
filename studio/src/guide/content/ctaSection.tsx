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
              <strong>Page</strong> — reference a <strong>Page</strong> or <strong>Journal Entry</strong>;
              the site builds the correct URL.
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

      <GuideCallout tone="primary" title="One destination per CTA">
        Fill in only one link option — Studio shows a warning if none or more than one is set. CTAs in
        page content appear as an underlined text link with an arrow; menu links don’t get the arrow.
      </GuideCallout>
    </Stack>
  ),
}
