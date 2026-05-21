import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const gearSection: GuideSection = {
  id: 'gear',
  title: 'Gear',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Gear</strong> documents describe cameras, lenses, and accessories. They support Photo
        Album EXIF auto-linking and give you consistent labels for equipment shown with your work.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Creating a gear entry</GuideSubheading>
        <GuideSteps
          steps={[
            <>Go to <strong>Gear</strong> and click <strong>Create new</strong>.</>,
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

      <Stack space={4}>
        <GuideSubheading>EXIF match hints</GuideSubheading>
        <GuideParagraph>
          When you upload to Photo Album, the system tries to match camera and lens EXIF strings to gear
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
