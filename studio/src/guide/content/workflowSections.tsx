import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
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
          This is where you edit everything on naturesportrait.ca: the words, the photos, the menu, and
          the journal. Nothing you do here reaches the website until you press{' '}
          <strong>Publish</strong>, so feel free to click around and explore.
        </GuideParagraph>

        <GuideShot
          file="studio-overview.webp"
          alt="Studio with the Content sidebar on the left and the Home document open on the right"
          caption="The Content sidebar (left) lists everything you can edit. The tools along the top switch between editing (Structure) and previewing the site (Presentation)."
        />

        <Stack gap={4}>
          <GuideSubheading>What is in the sidebar</GuideSubheading>
          <GuideList
            items={[
              <>
                <strong>Home</strong>: the homepage
              </>,
              <>
                <strong>Settings and Menus</strong>: the header menu, logo, and browser-tab icon (see{' '}
                <strong>Navigation &amp; site settings</strong>)
              </>,
              <>
                <strong>Pages</strong>: every other page (About, Gallery, Prints, Contact, FAQ, and so
                on)
              </>,
              <>
                <strong>Journal Entries</strong>: your journal posts
              </>,
              <>
                <strong>Gear</strong>: your cameras and lenses
              </>,
              <>
                <strong>Photo Library</strong>: every photo, and the Collections (series) they belong to
              </>,
              <>
                <strong>Editor guide</strong>: this guide
              </>,
            ]}
          />
        </Stack>

        <Stack gap={4}>
          <GuideSubheading>The tools along the top</GuideSubheading>
          <GuideList
            items={[
              <>
                <strong>Structure</strong>: where you edit. This is where you will spend most of your
                time.
              </>,
              <>
                <strong>Presentation</strong>: shows the website with your unpublished changes, so you
                can check how things look before you publish (see <strong>Presentation mode</strong>).
              </>,
              <>
                <strong>Media</strong>, <strong>Vision</strong>, and <strong>Releases</strong>: you can
                ignore these.
              </>,
            ]}
          />
        </Stack>

        <GuideCallout tone="positive" title="New here?">
          Read <strong>Draft vs published</strong> and <strong>Before you publish</strong> first. After
          that, look things up as you need them: <strong>Photo Library</strong> for adding photos,{' '}
          <strong>Journal entries</strong> for writing posts, and <strong>Page builder</strong> for
          changing what a page shows.
        </GuideCallout>

        <GuideCallout tone="primary">
          You cannot change this guide from Studio. If something here is out of date, let your developer know.
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
          Every page, post, and photo has two versions: the <strong>draft</strong> you are working on,
          and the <strong>published</strong> version visitors see. Studio saves your draft
          automatically as you type, so there is no Save button. Nothing changes on the website until
          you press <strong>Publish</strong>.
        </GuideParagraph>

        <Stack gap={4}>
          <GuideSubheading>Publishing</GuideSubheading>
          <GuideParagraph>
            The <strong>Publish</strong> button is at the bottom right of every document. It is grey
            when there is nothing new to publish, and becomes clickable as soon as you change something.
            The two chips at the top left, <strong>Published</strong> and <strong>Draft</strong>, show
            which versions exist.
          </GuideParagraph>
          <GuideShot
            file="document-actions.webp"
            alt="The bottom of a document, with the Publish button and the ⋯ menu open showing Duplicate and Delete"
            caption="The ⋯ next to Publish opens Duplicate and Delete. When a page has unpublished edits, Discard changes appears in this menu too."
          />
        </Stack>

        <Stack gap={4}>
          <GuideSubheading>Taking something off the website</GuideSubheading>
          <GuideSteps
            steps={[
              <>
                Click the <strong>Published</strong> chip at the top left of the document.
              </>,
              <>
                A red <strong>Unpublish</strong> button appears where Publish normally is. Click it to
                take the document off the website. It stays in Studio so you can publish it again later.
              </>,
              <>
                Click the <strong>Draft</strong> chip to go back to editing.
              </>,
            ]}
          />
          <GuideShot
            file="unpublish.webp"
            alt="A page with the Published chip selected and a red Unpublish button at the bottom right"
            caption="With the Published chip selected you are looking at the live version (the bar at the top turns green), and the Unpublish button appears."
          />
        </Stack>

        <Stack gap={4}>
          <GuideSubheading>Deleting</GuideSubheading>
          <GuideParagraph>
            <strong>Delete</strong> (in the <strong>⋯</strong> menu next to Publish) removes the
            document from Studio and the website. If a menu link or another page still points to it,
            Studio tells you and asks you to remove that link first. When in doubt, unpublish instead.
          </GuideParagraph>
        </Stack>

        <Stack gap={4}>
          <GuideSubheading>Going back to an earlier version</GuideSubheading>
          <GuideParagraph>
            Studio keeps every published version. Open the <strong>⋯</strong> menu at the{' '}
            <em>top</em> right of the document and choose <strong>History</strong>. Click any version
            in the list to see what the document looked like then, and restore it if you need to.
          </GuideParagraph>
          <GuideShot
            file="history-menu.webp"
            alt="The document menu at the top right, with History highlighted"
          />
          <GuideShot
            file="history-panel.webp"
            alt="The History panel listing published versions with who published them and when"
            caption="Each row is one publish. Close the panel with the × at its top right."
          />
        </Stack>
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
            <>
              Click <strong>Pages</strong> in the sidebar, then the <strong>+</strong> at the top of
              the list.
            </>,
            <>
              Type a <strong>Title</strong>, then click <strong>Generate</strong> next to{' '}
              <strong>Slug</strong>. The slug is the page&apos;s web address: <code>about</code> becomes{' '}
              <code>naturesportrait.ca/about</code>.
            </>,
            <>
              Add <strong>Page sections</strong>: a hero, text, photos, and so on (see{' '}
              <strong>Page builder</strong>).
            </>,
            <>
              Click the <strong>SEO</strong> tab and write a short description (see{' '}
              <strong>SEO settings</strong>).
            </>,
            <>
              <strong>Publish</strong>. To make the page easy to find, add it to the header menu (see{' '}
              <strong>Navigation &amp; site settings</strong>).
            </>,
          ]}
        />
        <GuideShot
          file="pages-list.webp"
          alt="The Pages list with the + button highlighted at the top"
          caption="The + at the top of any list creates a new item of that kind."
        />
        <GuideShot
          file="page-editor.webp"
          alt="A page open for editing, with the Content and SEO tabs and the Slug Generate button highlighted"
          caption="Content holds the title, slug, and sections; SEO holds what search engines show. All fields shows both at once."
        />

        <GuideSubheading>Edit Home</GuideSubheading>
        <GuideParagraph>
          <strong>Home</strong> is at the top of the sidebar. It works like any other page but has no
          slug, because it is the front page.
        </GuideParagraph>

        <GuideSubheading>Pages the site expects</GuideSubheading>
        <GuideParagraph>
          The footer always links to <code>/prints</code> and <code>/contact</code>, so keep published
          pages with the slugs <code>prints</code> and <code>contact</code>. If you change either slug,
          the footer link breaks. The header menu is separate and fully editable.
        </GuideParagraph>

        <GuideSubheading>Remove a page</GuideSubheading>
        <GuideParagraph>
          Unpublish it to take it off the site but keep it, or delete it to remove it completely (see{' '}
          <strong>Draft vs published</strong>). Either way, take it out of the header menu too.
        </GuideParagraph>
      </Stack>
    ),
  },
]

const workflowSectionsAfterSeo: GuideSection[] = [
  {
    id: 'journal',
    title: 'Journal entries',
    content: (
      <Stack gap={5}>
        <GuideParagraph>
          <strong>Journal Entries</strong> are the posts listed on <code>/journal</code>, newest first.
          Each one also has its own page at <code>/journal/your-slug</code>.
        </GuideParagraph>

        <Stack gap={4}>
          <GuideSubheading>Write a new entry</GuideSubheading>
          <GuideSteps
            steps={[
              <>
                Click <strong>Journal Entries</strong> in the sidebar, then the <strong>+</strong> at
                the top of the list. A new entry opens on the <strong>SEO</strong> tab, so click{' '}
                <strong>Post Settings</strong> first.
              </>,
              <>
                In <strong>Post Settings</strong>: <strong>Title</strong>, <strong>Slug</strong> (click{' '}
                <strong>Generate</strong>), <strong>Published Date</strong>, and{' '}
                <strong>Excerpt</strong> (required).
              </>,
              <>
                Turn on <strong>Featured</strong> to give the entry a full-width row on the journal page.
                Any number of entries can be featured.
              </>,
              <>
                In <strong>Post Content</strong>: <strong>Header Image</strong> (recommended, with alt
                text), <strong>Lede</strong>, and <strong>Body</strong> (required).
              </>,
              <>
                Back on the <strong>SEO</strong> tab, add a meta description (see{' '}
                <strong>SEO settings</strong>).
              </>,
              <>
                <strong>Publish</strong>.
              </>,
            ]}
          />
          <GuideShot
            file="journal-entry.webp"
            alt="The Journal Entries list beside an open entry, with the SEO, Post Settings, and Post Content tabs highlighted"
            caption="Entries are split across three tabs. Featured entries show a star in the list."
          />
          <GuideShot
            file="journal-settings.webp"
            alt="The Post Settings tab showing Title, Slug with a Generate button, and the Excerpt editor"
            caption="Post Settings. The Excerpt uses the simple text editor: bold, italic, lists, and links."
          />
        </Stack>

        <Stack gap={4}>
          <GuideSubheading>How the fields are used</GuideSubheading>
          <GuideList
            items={[
              <>
                <strong>Published Date</strong> — sets the order on <code>/journal</code> and the date
                shown on the entry. If it is empty, the date the entry was created is used.
              </>,
              <>
                <strong>Lede</strong> — one or two lines under the title on the entry page, and the
                summary on the journal list.
              </>,
              <>
                <strong>Excerpt</strong> — the short summary shown on the journal list when there is no
                Lede.
              </>,
              <>
                <strong>Header Image</strong> — the large image at the top of the entry and its image on
                the journal list.
              </>,
              <>
                If the <strong>SEO</strong> tab is left empty, search results use the Lede as the
                description and social shares use the site&apos;s default image, so fill in the SEO tab
                for each entry.
              </>,
            ]}
          />
        </Stack>

        <Stack gap={4}>
          <GuideSubheading>Remove an entry</GuideSubheading>
          <GuideList
            items={[
              <>
                <strong>Unpublish</strong> takes it off the website but keeps it in Studio, so you can
                bring it back later. Click the <strong>Published</strong> chip at the top of the entry,
                then the red <strong>Unpublish</strong> button.
              </>,
              <>
                <strong>Delete</strong> removes it for good. Studio warns you if a menu item or CTA still
                links to it; remove those links first.
              </>,
            ]}
          />
        </Stack>

        <GuideCallout tone="positive" title="Linking to an entry">
          Any CTA or <strong>Internal Link</strong> in Portable Text can point to a Journal Entry. Pick
          it by title and the site builds the address for you.
        </GuideCallout>
      </Stack>
    ),
  },
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
