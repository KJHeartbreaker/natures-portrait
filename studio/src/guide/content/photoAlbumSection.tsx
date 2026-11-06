import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideScreenshot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const photoAlbumSection: GuideSection = {
  id: 'photo-album',
  title: 'Photo Library',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        The <strong>Photo Library</strong> is the home for every photograph on the site: one document
        per image, with its title, location, gear, and camera settings. Photos are grouped into{' '}
        <strong>Collections</strong> (for example "Water", "Mountains", or "Black &amp; White"), and each
        collection gets its own series page on the website.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Uploading a photo</GuideSubheading>
        <GuideSteps
          steps={[
            <>
              Go to <strong>Photo Library → All Photos</strong> and click the <strong>+</strong> at the
              top of the list.
            </>,
            <>
              Upload the image in the <strong>Photo</strong> field and add <strong>Alternative
              text</strong>. After upload, the photo&apos;s EXIF data fills any empty camera settings
              and tries to link matching <strong>Gear</strong> documents.
            </>,
            <>
              Review the auto-filled <strong>Gear</strong> and <strong>Camera Settings</strong> (focal
              length, aperture, shutter speed, ISO, date captured). Use <strong>Re-apply EXIF</strong>{' '}
              on the image if you add new gear hints or replace the file.
            </>,
            <>
              Add a <strong>Title</strong>, <strong>Location</strong>, and optional{' '}
              <strong>Description</strong>. The title is the caption in galleries, and the location
              appears in the photo viewer and under Featured Collection images.
            </>,
            <>
              <strong>Publish</strong> the photo.
            </>,
            <>
              Add it to one or more collections (see below).
            </>,
          ]}
        />
        <GuideShot
          file="photo-document.webp"
          alt="The All Photos list beside an open photo record showing the photo and its EXIF note"
          caption="Photo Library → All Photos. Click + at the top of the list to add a photo."
        />
        <GuideShot
          file="photo-exif.webp"
          alt="Below the photo: Alternative text, the Re-apply EXIF to fields button, and the Details section with Title and Location"
          caption="Alt text and the Re-apply EXIF button sit right under the photo, followed by Title and Location."
        />
        <GuideShot
          file="photo-gear.webp"
          alt="The Gear section of a photo with camera and lens text fields and linked Sony A7 IV and Sigma lens records"
          caption="The Gear section (click to open it). Camera and Lens (reference) link to your Gear records."
        />
        <GuideParagraph>
          The <strong>Referenced by</strong> panel at the bottom of each photo lists every collection,
          page, and section that uses it. Check it before deleting a photo.
        </GuideParagraph>
        <GuideShot
          file="photo-referenced-by.webp"
          alt="The Referenced by panel listing the Mountains and Panorama collections"
          caption="This photo is in two collections. Click the arrow on the right to open one."
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Collections</GuideSubheading>
        <GuideParagraph>
          A collection groups photos by theme, subject, or place. A photo can belong to any number of
          collections, or none. Every collection has a series page at{' '}
          <code>/series/collection-slug</code> showing all of its photos.
        </GuideParagraph>
        <GuideSteps
          steps={[
            <>
              Go to <strong>Photo Library → Collections</strong> and click the <strong>+</strong> at the
              top of the list (or open an existing collection).
            </>,
            <>
              Give it a <strong>Title</strong>. Click <strong>Generate</strong> next to{' '}
              <strong>Slug</strong> to create the web address.
            </>,
            <>
              Under <strong>Photos</strong>, click <strong>Add photos…</strong>. A picker opens with
              thumbnails of the whole library: tick as many as you like and add them in one go. Photos
              already in the collection are greyed out.
            </>,
            <>
              Drag photos to reorder them. The order here is the order on the series page.
            </>,
            <>
              Choose a <strong>Cover Photo</strong>. Only photos already in the collection can be
              picked, and it is the image used on Series Grid cards.
            </>,
            <>
              <strong>Publish</strong> the collection.
            </>,
          ]}
        />
        <GuideShot
          file="collection-photos.webp"
          alt="The bottom of a collection: its photo list, the Add item and Add photos… buttons, and the Cover Photo"
          caption="Use Add photos… (not Add item) to pick several at once. The Cover Photo sits underneath."
        />
        <GuideShot
          file="collection-picker.webp"
          alt="The Add photos to collection picker: a grid of photos with checkboxes, some marked Added, and an Add photos button"
          caption="Tick the photos you want, then click Add photos at the bottom right. Faded photos marked Added are already in the collection."
        />
        <GuideCallout tone="primary" title="Membership lives on the collection">
          You add photos to a collection from the <strong>collection document</strong>, not from the
          photo. To remove a photo from a collection, open the collection and remove it from the{' '}
          <strong>Photos</strong> list. The photo itself stays in the library.
        </GuideCallout>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Showing photos on pages</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Auto Gallery</strong>: every published photo, filterable by collection. Nothing
              to maintain.
            </>,
            <>
              <strong>Series Grid</strong>: up to four collection cards, each linking to its series
              page.
            </>,
            <>
              <strong>Featured Collection</strong>: one large photo plus text, linking to one series.
            </>,
            <>
              <strong>Photo Grid</strong>: a hand-picked set of photos in an order you choose.
            </>,
            <>
              <strong>Hero Banner</strong>, <strong>Two Column</strong>, and{' '}
              <strong>Accordion</strong> have their own image fields and do not use the library.
            </>,
          ]}
        />
        <GuideScreenshot
          src="/static/page-builder-thumbnails/seriesGrid.webp"
          alt="Series Grid on the site: three collection cards, each with a cover photo, title, and photo count"
          caption="A Series Grid uses each collection's Cover Photo, Title, and photo count."
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Gear on photos</GuideSubheading>
        <GuideParagraph>
          Each photo can store its camera and lens two ways: quick text fields, or references to{' '}
          <strong>Gear</strong> documents. References are better when you want the same naming
          everywhere. EXIF matching uses <strong>EXIF match hints</strong> on gear documents when
          marketing names differ from what the camera records (for example ILCE-7M4 vs Sony A7 IV).
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Finding photos">
        In <strong>All Photos</strong>, use the sort menu to order by title, date captured, or last
        edited, and the search box to find a photo by title or location.
      </GuideCallout>
    </Stack>
  ),
}
