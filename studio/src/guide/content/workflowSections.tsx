import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {blogLandingSection} from './blogLandingSection'
import {ctaSection} from './ctaSection'
import {gearSection} from './gearSection'
import {imagesAltSection} from './imagesAltSection'
import {navigationSection} from './navigationSection'
import {photoAlbumSection} from './photoAlbumSection'
import {portableTextSection} from './portableTextSection'
import {presentationSection} from './presentationSection'
import {publishChecklistSection} from './publishChecklistSection'
import {referencedContentSection} from './referencedContentSection'
import {seoSettingsSection} from './seoSettingsSection'

const workflowSectionsBeforeSeo: GuideSection[] = [
  {
    id: 'introduction',
    title: 'Getting started',
    content: (
      <Stack gap={5}>
        <GuideParagraph>
          This site is managed in Sanity Studio. Most content changes follow the same workflow: edit a
          document, preview when helpful, then publish when you are ready.
        </GuideParagraph>

        <Stack gap={4}>
          <GuideSubheading>Where to find things</GuideSubheading>
          <GuideParagraph>
            Use the <strong>Content</strong> sidebar to open the area you need:
          </GuideParagraph>
          <GuideList
            items={[
              <>
                <strong>Home</strong> — homepage sections and SEO
              </>,
              <>
                <strong>Settings and Menus</strong> — header navigation, logo, favicon, default social
                image (see <strong>Navigation &amp; site settings</strong>)
              </>,
              <>
                <strong>Blog</strong> — blog landing page sections and SEO
              </>,
              <>
                <strong>Pages</strong> — site pages (About, Galleries, Contact, etc.)
              </>,
              <>
                <strong>Posts</strong> — blog articles at <code>/posts/slug</code>
              </>,
              <>
                <strong>Gear</strong> — cameras, lenses, and accessories (see <strong>Gear</strong>)
              </>,
              <>
                <strong>Photo Library</strong> — canonical photo library with collections (see <strong>Photo Library</strong>)
              </>,
              <>
                <strong>Editor guide</strong> — this help document (read-only)
              </>,
            ]}
          />
        </Stack>

        <GuideCallout tone="primary">
          This guide is read-only. It lives inside Studio so you always have help at hand — it is not
          stored as editable content in the CMS.
        </GuideCallout>

        <GuideCallout tone="caution" title="Site in progress">
          Some page sections may render with placeholder styling on the live site while frontend design
          catches up. You can still add and organize content in Studio — see individual section notes in{' '}
          <strong>Page builder</strong>.
        </GuideCallout>
      </Stack>
    ),
  },
  {
    id: 'draft-vs-published',
    title: 'Draft vs published',
    content: (
      <Stack gap={5}>
        <GuideParagraph>
          Sanity keeps two versions of your work: changes you are still editing (draft) and what visitors
          see on the live website (published).
        </GuideParagraph>

        <GuideList
          items={[
            <>
              <strong>Draft</strong> — saved in Studio but not on the public site until you publish.
            </>,
            <>
              <strong>Published</strong> — live on the website. New edits create a draft again until you
              publish a second time.
            </>,
            <>
              <strong>Discard changes</strong> — throws away unpublished edits and reverts to the last
              published version.
            </>,
            <>
              <strong>Unpublish</strong> — removes the document from the live site (use carefully).
            </>,
          ]}
        />

        <GuideCallout tone="positive" title="Tip">
          Visitors only see published content unless they are previewing with Presentation and Draft Mode
          enabled.
        </GuideCallout>
      </Stack>
    ),
  },
  presentationSection,
  {
    id: 'pages',
    title: 'Creating and editing pages',
    content: (
      <Stack gap={5}>
        <GuideSubheading>Create a new page</GuideSubheading>
        <GuideSteps
          steps={[
            <>Go to <strong>Pages</strong> and click <strong>Create new</strong>.</>,
            <>
              Set <strong>Title</strong> and <strong>Slug</strong> (the slug becomes the URL, e.g.{' '}
              <code>about</code> → <code>/about</code>).
            </>,
            <>
              Add <strong>Page sections</strong> — reorder blocks anytime with drag and drop.
            </>,
            <>
              Open the <strong>SEO</strong> tab and complete SEO settings (see{' '}
              <strong>SEO settings</strong> in this guide).
            </>,
            <><strong>Publish</strong>.</>,
          ]}
        />

        <GuideSubheading>Edit Home or Blog</GuideSubheading>
        <GuideParagraph>
          <strong>Home</strong> and <strong>Blog</strong> are single documents at the top of the sidebar
          — they use the same page sections and SEO tabs as regular pages.
        </GuideParagraph>

        <GuideCallout tone="positive" title="Tip">
          See <strong>SEO settings</strong> and <strong>Page builder</strong> below for more detail.
        </GuideCallout>
      </Stack>
    ),
  },
]

const workflowSectionsAfterSeo: GuideSection[] = [
  {
    id: 'posts',
    title: 'Blog posts',
    content: (
      <Stack gap={5}>
        <GuideSteps
          steps={[
            <>Go to <strong>Posts</strong> and click <strong>Create new</strong>.</>,
            <>
              In <strong>Post Settings</strong>: Title, Slug (becomes <code>/posts/your-slug</code>
              ), Overview, and Excerpt (required — used in cards and grids).
            </>,
            <>
              In <strong>Post Content</strong>: Header Image (recommended), optional Subheader, and Body
              (required).
            </>,
            <>
              Complete the <strong>SEO</strong> tab (see <strong>SEO settings</strong>).
            </>,
            <><strong>Publish</strong>.</>,
          ]}
        />
      </Stack>
    ),
  },
  blogLandingSection,
  photoAlbumSection,
  gearSection,
  referencedContentSection,
]

export const workflowSections: GuideSection[] = [
  ...workflowSectionsBeforeSeo,
  publishChecklistSection,
  seoSettingsSection,
  imagesAltSection,
  portableTextSection,
  navigationSection,
  ctaSection,
  ...workflowSectionsAfterSeo,
]
