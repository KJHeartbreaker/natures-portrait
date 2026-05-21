import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const publishChecklistSection: GuideSection = {
  id: 'publish-checklist',
  title: 'Before you publish',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        Use this quick checklist whenever you are about to <strong>Publish</strong> — not just save a
        draft. Saving keeps work in Studio; publishing makes it live on the website.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Every page or post</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>SEO tab</strong> — meta description filled in (see <strong>SEO settings</strong>)
            </>,
            <>
              <strong>Images</strong> — alt text on uploaded images (see <strong>Images &amp; alt text</strong>)
            </>,
            <>
              <strong>Preview</strong> — optional but recommended: open <strong>Presentation</strong>, enable Draft Mode, and spot-check layout
            </>,
            <>
              Click <strong>Publish</strong> when you are ready for visitors to see the change
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Pages with grids or photo content</GuideSubheading>
        <GuideList
          items={[
            <>
              Referenced documents (<strong>Posts</strong>, <strong>Photo Album</strong> entries) are{' '}
              <strong>published</strong> themselves — see <strong>Referenced content</strong>
            </>,
            <>
              <strong>Posts Grid</strong> and <strong>Photo Grid</strong> sections only show content
              you pick in the section — publish both the section&apos;s parent page and each referenced
              document
            </>,
            <>
              Photo Album uploads with EXIF — review auto-filled gear and camera settings before publishing
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="Draft vs published">
        Draft Mode in Presentation shows unpublished edits in preview only. Publishing is what updates
        the public site.
      </GuideCallout>
    </Stack>
  ),
}
