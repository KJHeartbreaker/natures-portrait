import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const navigationSection: GuideSection = {
  id: 'navigation',
  title: 'Navigation & site settings',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        <strong>Settings and Menus</strong> is a single document for site-wide chrome: header menu,
        logo, favicon, and the default social sharing image. Changes apply everywhere after you{' '}
        <strong>Publish</strong> this document.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Add, reorder, or remove a menu link</GuideSubheading>
        <GuideSteps
          steps={[
            <>Open <strong>Settings and Menus</strong> in the Content sidebar.</>,
            <>
              In <strong>Menu Item list</strong>, click <strong>Add item</strong> (or the + control).
            </>,
            <>
              Choose <strong>Navigation Item</strong> for a single top-level link, or{' '}
              <strong>Navigation Dropdown</strong> for a link with a flyout submenu.
            </>,
            <>
              Fill in the <strong>CTA</strong> fields (label and destination) — see{' '}
              <strong>Call to action (CTA)</strong> in this guide.
            </>,
            <>Drag items to reorder them. The order in Studio is the order in the header.</>,
            <>To remove a link, open the item and delete it from the list, then <strong>Publish</strong>.</>,
          ]}
        />
      </Stack>

      <GuideShot
        file="menu-list.webp"
        alt="The Menu Item list in Settings and Menus, showing About, Gallery, FAQ, and Contact, with Add item below"
        caption="The header menu, top to bottom in the same order as left to right on the site. About is a dropdown; the subtitle lists its items."
      />

      <Stack gap={4}>
        <GuideSubheading>Navigation Item vs Navigation Dropdown</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Navigation Item</strong> — one label in the header that goes to one destination
              (a page, journal entry, external URL, etc.).
            </>,
            <>
              <strong>Navigation Dropdown</strong> — a parent label plus <strong>Dropdown Items</strong>:
              a list of additional CTAs shown when visitors hover or tap the menu.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Site logo and favicon</GuideSubheading>
        <GuideParagraph>
          <strong>Site logo</strong> appears in the header next to the site title and links home.{' '}
          <strong>Favicon</strong> is the browser tab icon — use a simplified square mark if the header
          logo is too detailed at small sizes. The site falls back to the logo when favicon is empty.
          Add alt text on both.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Default social sharing image</GuideSubheading>
        <GuideParagraph>
          <strong>Open Graph Image</strong> is the fallback when a page or post does not set its own SEO
          social image. Page-level SEO images override this default; see <strong>SEO settings</strong>.
          Use a 1200×630 px image and add alt text.
        </GuideParagraph>
        <GuideParagraph>
          Inside the Open Graph Image there is also a <strong>metadataBase</strong> field. It holds
          the site&apos;s address (<code>https://naturesportrait.ca</code>) so search engines and social
          sites get full links. Set it once when the site goes live and leave it alone after that.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Footer</GuideSubheading>
        <GuideParagraph>
          The footer (artist name, year, and links to Instagram, Prints, and Contact) is built into the
          site and is not edited in Studio. It needs published pages with the slugs{' '}
          <code>prints</code> and <code>contact</code>.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        After changing the menu or logo, publish <strong>Settings and Menus</strong> and check the live
        site header.
      </GuideCallout>
    </Stack>
  ),
}
