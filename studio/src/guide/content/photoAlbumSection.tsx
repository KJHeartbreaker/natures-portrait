import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const photoAlbumSection: GuideSection = {
  id: 'photo-album',
  title: 'Photo Album',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Photo Album</strong> holds canonical photo records — one document per image with
        metadata, gear links, and camera settings. Use it as your library; page sections like{' '}
        <strong>Photo Grid</strong> can display photos you select or embed inline.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Uploading a photo</GuideSubheading>
        <GuideSteps
          steps={[
            <>Go to <strong>Photo Album</strong> and click <strong>Create new</strong>.</>,
            <>
              Upload the image in the <strong>Photo</strong> field. After upload, EXIF data can fill
              empty camera settings and try to link matching <strong>Gear</strong> documents.
            </>,
            <>
              Review auto-filled fields (focal length, aperture, shutter speed, ISO, date captured).
              Use <strong>Re-apply EXIF</strong> on the image input if you update gear hints or re-upload.
            </>,
            <>
              Add optional <strong>Title</strong>, <strong>Location</strong>, and{' '}
              <strong>Description</strong> for captions and search.
            </>,
            <><strong>Publish</strong> the photo document.</>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Gear on photos</GuideSubheading>
        <GuideParagraph>
          Each photo can store camera and lens information two ways: quick text fields, or references to{' '}
          <strong>Gear</strong> documents. References are preferred when you want consistent naming
          across the site. EXIF matching uses <strong>EXIF match hints</strong> on gear rows when
          marketing names differ from camera metadata (for example ILCE-7M4 vs Sony A7 IV).
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Using photos on pages</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Photo Grid</strong> — add photos directly in the section (inline items) or pick
              from published album entries depending on how you build the grid.
            </>,
            <>
              <strong>Hero</strong> and <strong>Multi Column Row</strong> — use standalone image fields,
              not necessarily album references.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="Library vs page embed">
        Photo Album documents are the source of truth for metadata. If you embed a copy inline in a grid,
        updating the album entry later may not update the inline copy — prefer references when you want
        one place to maintain captions and gear.
      </GuideCallout>
    </Stack>
  ),
}
