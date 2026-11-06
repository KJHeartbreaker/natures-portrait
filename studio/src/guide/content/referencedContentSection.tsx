import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const referencedContentSection: GuideSection = {
  id: 'referenced-content',
  title: 'Referenced content',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        Some sidebar areas are <strong>documents</strong> you maintain once: journal entries, photos and
        collections in the Photo Library, and gear. Page sections do not usually copy that content inline; they{' '}
        <strong>reference</strong> those documents and pull in the latest published version on the
        website.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>What is a reference?</GuideSubheading>
        <GuideParagraph>
          In Studio, a reference field looks like a picker: you search for an existing document and attach
          it. Think of it as “show this piece of content here” rather than retyping the same caption or
          re-uploading the same image in every place it appears.
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Edit once</strong>: update a photo&apos;s title in the <strong>Photo Library</strong>{' '}
              and every grid, gallery, and series page that shows it updates after you publish.
            </>,
            <>
              <strong>Stay consistent</strong> — the same title, image, and wording everywhere that
              document is used.
            </>,
            <>
              <strong>Pick and choose</strong> — each page section decides <em>which</em> documents to
              show.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Where each document type can appear</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Journal Entries</strong>: their own page at <code>/journal/slug</code>, listed on{' '}
              <code>/journal</code>, and available as a destination for CTAs, menu items, and internal
              links.
            </>,
            <>
              <strong>Photos</strong>: shown by Photo Grid, Featured Collection, Auto Gallery, and every
              series page they belong to.
            </>,
            <>
              <strong>Collections</strong>: their own series page at <code>/series/slug</code>, a card
              in Series Grid, the link target of Featured Collection, and a filter in Auto Gallery.
            </>,
            <>
              <strong>Gear</strong>: linked from photos (camera and lens) and shown in the photo
              viewer. Also used when EXIF auto-matching runs on upload.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Your workflow</GuideSubheading>
        <GuideList
          items={[
            <>Create or edit the document in the sidebar (for example a photo or collection in the <strong>Photo Library</strong>).</>,
            <>Fill in the fields and <strong>Publish</strong> the document.</>,
            <>
              On a page, open the relevant section (Photo Grid, Series Grid, Featured Collection) and
              use its picker to add it.
            </>,
            <><strong>Publish</strong> the page (or Home) so the live site picks up the link.</>,
          ]}
        />
        <GuideParagraph>
          If something is missing on the site, check both publishes: the referenced document <em>and</em>{' '}
          the page that points to it.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Hand-picked sections (Photo Grid, Series Grid, Featured Collection) only show what you picked.
        New photos appear on their own only in <strong>Auto Gallery</strong>, and on a series page
        once they are added to that collection.
      </GuideCallout>
    </Stack>
  ),
}
