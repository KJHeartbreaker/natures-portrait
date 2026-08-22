import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const photoAlbumSection: GuideSection = {
  id: 'photo-album',
  title: 'Photo Library',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        The <strong>Photo Library</strong> holds canonical photo records — one document per image with
        metadata, gear links, and camera settings. Photos can be organised into{' '}
        <strong>Collections</strong> (e.g. "Black &amp; White", "Grain Elevators") and displayed on
        pages through the <strong>Photo Grid</strong> or <strong>Collection Grid</strong> page sections.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Uploading a photo</GuideSubheading>
        <GuideSteps
          steps={[
            <>Go to <strong>Photo Library → All Photos</strong> and click <strong>Create new</strong>.</>,
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
            <>
              Optionally assign the photo to one or more <strong>Collections</strong> using the
              Collections field at the bottom of the form.
            </>,
            <><strong>Publish</strong> the photo document.</>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Collections</GuideSubheading>
        <GuideParagraph>
          Collections are a way to group photos by theme, subject, or style — for example "Black &amp;
          White", "Grain Elevators", or "Lake District". A photo can belong to any number of collections,
          or none at all.
        </GuideParagraph>
        <GuideSteps
          steps={[
            <>
              Go to <strong>Photo Library → Collections</strong> and click <strong>Create new</strong>.
            </>,
            <>Give the collection a <strong>Title</strong>. The slug fills in automatically.</>,
            <>Add an optional <strong>Description</strong>.</>,
            <><strong>Publish</strong> the collection.</>,
            <>
              Open any photo and use the <strong>Collections</strong> field to add it to the collection.
              You can do this from the photo document, or browse by collection in the Studio sidebar to
              see which photos are already in each group.
            </>,
          ]}
        />
        <GuideCallout tone="primary" title="Collections live on the photo, not the collection">
          You assign collection membership from each <strong>photo document</strong> — the collection
          itself has no list of photos to manage. To see all photos in a collection, click it in{' '}
          <strong>Photo Library → Collections</strong> in the sidebar.
        </GuideCallout>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Gear on photos</GuideSubheading>
        <GuideParagraph>
          Each photo can store camera and lens information two ways: quick text fields, or references to{' '}
          <strong>Gear</strong> documents. References are preferred when you want consistent naming
          across the site. EXIF matching uses <strong>EXIF match hints</strong> on gear rows when
          marketing names differ from camera metadata (for example ILCE-7M4 vs Sony A7 IV).
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Displaying photos on pages</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Photo Grid</strong> — manually curate a set of photos to display. Add them
              inline or pick from published library entries.
            </>,
            <>
              <strong>Collection Grid</strong> (coming soon) — pick a collection and all its photos
              display automatically. Use this to feature a specific theme without manually maintaining
              the list.
            </>,
            <>
              <strong>Hero</strong> and <strong>Multi Column Row</strong> — use standalone image
              fields, not necessarily library references.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="Library vs inline embed">
        Photo Library documents are the source of truth for metadata. If you embed a copy inline in
        a grid, updating the library entry later may not update the inline copy — prefer references
        when you want one place to maintain captions and gear.
      </GuideCallout>
    </Stack>
  ),
}
