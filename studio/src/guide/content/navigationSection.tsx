import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const navigationSection: GuideSection = {
  id: 'navigation',
  title: 'Navigation & site settings',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Settings and Menus</strong> is a single document for site-wide chrome: header menu,
        logo, favicon, and the default social sharing image. Changes apply everywhere after you{' '}
        <strong>Publish</strong> this document.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Add, reorder, or remove a menu link</GuideSubheading>
        <GuideSteps
          steps={[
            <>Open <strong>Settings and Menus</strong> in the Content sidebar.</>,
            <>
              In <strong>Menu Item list</strong>, click <strong>Add item</strong> (or the + control).
            </>,
            <>
              Choose <strong>Navigation Item</strong> for a single top-level link, or{' '}
              <strong>Navigation Dropdown</strong> for a link with a flyout submenu. You can also add
              the <strong>Blog</strong> landing page as a menu entry.
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

      <Stack space={4}>
        <GuideSubheading>Navigation Item vs Navigation Dropdown</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Navigation Item</strong> — one label in the header that goes to one destination
              (a page, post, external URL, etc.).
            </>,
            <>
              <strong>Navigation Dropdown</strong> — a parent label plus <strong>Dropdown Items</strong>:
              a list of additional CTAs shown when visitors hover or tap the menu.
            </>,
            <>
              <strong>Blog</strong> — adds a link to the Blog landing page document (slug configured on
              that document).
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Site logo and favicon</GuideSubheading>
        <GuideParagraph>
          <strong>Site logo</strong> appears in the header next to the site title and links home.{' '}
          <strong>Favicon</strong> is the browser tab icon — use a simplified square mark if the header
          logo is too detailed at small sizes. The site falls back to the logo when favicon is empty.
          Add alt text on both.
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Default social sharing image</GuideSubheading>
        <GuideParagraph>
          <strong>Open Graph Image</strong> is the fallback when a page or post does not set its own SEO
          social image. Page-level SEO images override this default; see <strong>SEO settings</strong>.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        After changing the menu or logo, publish <strong>Settings and Menus</strong> and check the live
        site header.
      </GuideCallout>
    </Stack>
  ),
}
