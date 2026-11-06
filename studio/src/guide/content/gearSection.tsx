import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const gearSection: GuideSection = {
  id: 'gear',
  title: 'Gear',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        <strong>Gear</strong> documents describe cameras, lenses, and accessories. Photos link to them,
        the photo viewer on the site shows the camera and lens, and new uploads use them for EXIF
        auto-linking.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Creating a gear entry</GuideSubheading>
        <GuideSteps
          steps={[
            <>Click <strong>Gear</strong> in the sidebar, then the <strong>+</strong> at the top of the list.</>,
            <>
              Choose <strong>Kind</strong> — Camera, Lens, or Accessory.
            </>,
            <>
              Enter <strong>Brand</strong> and <strong>Model</strong> (required).
            </>,
            <>
              Optional: <strong>Nickname</strong> (Studio-only label), <strong>EXIF match hints</strong>{' '}
              (tags that appear in uploaded photo metadata), <strong>Notes</strong>, and <strong>Link</strong>{' '}
              to a manufacturer page.
            </>,
            <><strong>Publish</strong>.</>,
          ]}
        />
      </Stack>

      <GuideShot
        file="gear-document.webp"
        alt="A gear entry for a Sony A7 IV camera, with Kind, Brand, Model, Nickname, and EXIF match hints fields"
      />

      <Stack gap={4}>
        <GuideSubheading>EXIF match hints</GuideSubheading>
        <GuideParagraph>
          When you upload to the Photo Library, Studio tries to match camera and lens EXIF strings to gear
          documents. If your gear uses a marketing name but EXIF shows an internal code, add hints on the
          gear row — for example <code>ILCE-7M4</code> or <code>100-400mm</code>. Matching is
          case-insensitive and only auto-links when the match is unambiguous.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Set up gear documents before bulk-uploading photos. Re-apply EXIF on existing uploads after adding
        new hints.
      </GuideCallout>
    </Stack>
  ),
}
