import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const referencedContentSection: GuideSection = {
  id: 'referenced-content',
  title: 'Referenced content',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        Some sidebar areas are <strong>documents</strong> you maintain once — blog posts, photos in the
        album, and gear records. Page sections do not usually copy that content inline; they{' '}
        <strong>reference</strong> those documents and pull in the latest published version on the
        website.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>What is a reference?</GuideSubheading>
        <GuideParagraph>
          In Studio, a reference field looks like a picker: you search for an existing document and attach
          it. Think of it as “show this piece of content here” rather than retyping the same caption or
          re-uploading the same image in every place it appears.
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Edit once</strong> — update a post excerpt in <strong>Posts</strong> and every grid
              that references it updates after you publish.
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

      <Stack space={4}>
        <GuideSubheading>Where each document type can appear</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Posts</strong> — their own URL at <code>/posts/slug</code>; also selectable in a{' '}
              <strong>Posts Grid</strong> page section.
            </>,
            <>
              <strong>Photo Album</strong> (<code>photo</code> documents) — canonical photo records with
              location, gear, and camera settings. Photo Grid sections can embed photos inline or
              reference album entries depending on how the section is configured.
            </>,
            <>
              <strong>Gear</strong> — linked from Photo Album entries (camera/lens references) and used
              when EXIF auto-matching runs on upload.
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Your workflow</GuideSubheading>
        <GuideList
          items={[
            <>Create or edit the document in the sidebar (for example <strong>Posts</strong> or <strong>Photo Album</strong>).</>,
            <>Fill in the fields and <strong>Publish</strong> the document.</>,
            <>
              On a page, open the relevant section (Posts Grid, Photo Grid, etc.) and use the reference
              picker to add it.
            </>,
            <><strong>Publish</strong> the page (or Home/Blog document) so the live site picks up the link.</>,
          ]}
        />
        <GuideParagraph>
          If something is missing on the site, check both publishes: the referenced document <em>and</em>{' '}
          the page that points to it.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        A grid is only a <strong>window</strong> onto your library. Adding more posts or photos does not
        change existing pages until you add those references somewhere new.
      </GuideCallout>
    </Stack>
  ),
}
