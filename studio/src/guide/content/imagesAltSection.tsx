import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const imagesAltSection: GuideSection = {
  id: 'images-and-alt-text',
  title: 'Images & alt text',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        Images need short, accurate <strong>alternative text (alt text)</strong> so the site is
        accessible and search engines understand what the image shows. Studio will prompt you when alt
        text is required.
      </GuideParagraph>

      <GuideCallout tone="critical" title="Rule of thumb">
        If an image is uploaded and used on the site, add alt text before you publish — unless the
        image is purely decorative and your developer has set it up that way (rare for a photography
        site).
      </GuideCallout>

      <Stack gap={4}>
        <GuideSubheading>Where you add alt text</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Image</strong> fields (Hero Banner backgrounds, Two Column image panels, Accordion
              images, journal Header Images). Open the image and fill in{' '}
              <strong>Alternative text</strong>
            </>,
            <>
              <strong>Portable text</strong> — images embedded in body copy have their own alt field on
              the image block
            </>,
            <>
              <strong>SEO → Social Sharing Image</strong> — alt is required when an OG image is set
            </>,
            <>
              <strong>Settings and Menus</strong> — site logo, favicon, and default Open Graph image
            </>,
            <>
              <strong>Photo Library</strong>: alt text on each photo. Every grid, gallery, and series
              page that shows the photo uses it
            </>,
          ]}
        />
      </Stack>

      <GuideShot
        file="image-field.webp"
        alt="An image field showing a heron photo with the crop button highlighted, and the Alternative text field below it"
        caption="Alternative text sits right under the image. The crop button (top right of the image) opens the hotspot and crop tool."
      />

      <Stack gap={4}>
        <GuideSubheading>Adding or replacing an image</GuideSubheading>
        <GuideList
          items={[
            <>
              On an empty image field, drag a file onto it, or click <strong>Upload</strong>. Use{' '}
              <strong>Select</strong> to reuse an image you have uploaded before.
            </>,
            <>
              To replace or remove an image, click the <strong>⋯</strong> at its top right.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Keeping the subject in frame (hotspot and crop)</GuideSubheading>
        <GuideParagraph>
          The site shows the same photo at different shapes: wide on a laptop, tall on a phone,
          square in some grids. Tell Studio which part of the photo matters most and it will keep that
          part in view.
        </GuideParagraph>
        <GuideSteps
          steps={[
            <>
              Click the crop button at the top right of the image.
            </>,
            <>
              Drag the <strong>circle</strong> over the subject (the heron, the peak, the barn). Drag
              its edge to resize it.
            </>,
            <>
              Optionally drag the corners of the <strong>rectangle</strong> to crop out parts of the
              photo you never want shown.
            </>,
            <>
              Check the previews underneath (3:4, square, 16:9, panorama), then close the panel.
            </>,
          ]}
        />
        <GuideShot
          file="hotspot-crop.webp"
          alt="The Edit hotspot and crop panel, with an oval over the heron and four preview shapes below"
          caption="The oval is the hotspot; the corner handles are the crop. The previews show how each shape will be framed."
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Writing good alt text</GuideSubheading>
        <GuideList
          items={[
            <>Describe what is in the image, not “image of” or the filename.</>,
            <>
              Example: <em>Golden light on mountain ridges above Wastwater at dawn</em> — not{' '}
              <em>DSC_1234.jpg</em>
            </>,
            <>Keep it concise — usually one sentence.</>,
            <>If the image is a logo linking home, say what it represents.</>,
          ]}
        />
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Alt text is for people using screen readers and for SEO. It is not the same as a caption in body
        copy — you can have both where the design allows captions.
      </GuideCallout>
    </Stack>
  ),
}
