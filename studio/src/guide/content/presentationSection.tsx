import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const presentationSection: GuideSection = {
  id: 'presentation',
  title: 'Presentation mode',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        <strong>Presentation</strong> shows your website inside Studio, including changes you have not
        published yet. It is the easiest way to edit: look at the page, click the thing you want to
        change, and edit it on the right. Visitors still see the published site until you press{' '}
        <strong>Publish</strong>.
      </GuideParagraph>

      <GuideShot
        file="presentation.webp"
        alt="Presentation mode: the homepage preview on the left and the Home document on the right"
        caption="The website on the left, the page you are editing on the right. Top left: the Edit switch. Top right of the preview: the phone-size button."
      />

      <Stack gap={4}>
        <GuideSubheading>Edit by clicking the page</GuideSubheading>
        <GuideSteps
          steps={[
            <>
              Click <strong>Presentation</strong> in the bar at the top of Studio. The homepage opens.
            </>,
            <>
              Go to the page you want by clicking links in the preview, as you would on the real site.
            </>,
            <>
              Make sure the <strong>Edit</strong> switch at the top left is on. Hovering over the page
              then outlines anything you can edit.
            </>,
            <>
              Click a heading, paragraph, or photo. The matching fields open on the right.
            </>,
            <>
              Make your change. The preview updates within a second or two.
            </>,
            <>
              When it looks right, click <strong>Publish</strong> at the bottom right.
            </>,
          ]}
        />
        <GuideShot
          file="presentation-hover.webp"
          alt="The hero section outlined in blue with a small Nature's Portrait label in its lower left corner"
          caption="Hovering outlines the section under the pointer and labels which document it belongs to."
        />
        <GuideShot
          file="presentation-click.webp"
          alt="After clicking the hero heading, its Hero Banner fields are open in the right-hand panel"
          caption="Clicking the hero heading opened that Hero Banner's fields on the right."
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Check how it looks on a phone</GuideSubheading>
        <GuideParagraph>
          Click the phone icon at the top right of the preview to see the page at phone width. Click it
          again to go back. Most visitors will see the site on a phone, so it is worth a quick look
          before you publish.
        </GuideParagraph>
        <GuideShot
          file="presentation-mobile.webp"
          alt="The homepage previewed at phone width in the middle of the Presentation tool"
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Good to know</GuideSubheading>
        <GuideList
          items={[
            <>
              Turn the <strong>Edit</strong> switch off when you want to click links in the preview
              without opening fields.
            </>,
            <>
              Some things on a page come from somewhere else. Clicking a photo in a gallery, for
              example, may open that photo&apos;s own record in the Photo Library rather than the page.
              That is expected: edit and publish it there.
            </>,
            <>
              The menu at the top right of Studio says <strong>Drafts</strong>. That means the preview
              includes unpublished changes. Leave it on Drafts.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="caution" title="If the preview will not load">
        Click the refresh arrow next to the address bar first. If it still shows an error such as
        “Unable to connect”, the problem is on the hosting side, not in your content. Let your
        developer know.
      </GuideCallout>
    </Stack>
  ),
}
