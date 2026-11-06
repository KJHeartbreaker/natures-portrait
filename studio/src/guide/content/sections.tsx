import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideShot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {pageBuilderSections} from './pageBuilderBlocks'
import {workflowSections} from './workflowSections'

const pageBuilderParent: GuideSection = {
  id: 'page-builder',
  title: 'Page builder',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        Every page, including Home, is built from <strong>sections</strong> stacked top to bottom: a
        hero photo, a block of text, a quote, a grid of photos, and so on. You will find them in the{' '}
        <strong>Page sections</strong> list on each page. The order of the list is the order on the
        page.
      </GuideParagraph>

      <GuideShot
        file="page-sections.webp"
        alt="The Page sections list on the About page, with drag handles, ⋯ menus, and the Add item button highlighted"
        caption="Left: drag handles for reordering. Right: each section's ⋯ menu. Bottom: Add item."
      />

      <Stack gap={4}>
        <GuideSubheading>Add a section</GuideSubheading>
        <GuideSteps
          steps={[
            <>
              Open the page and scroll to <strong>Page sections</strong>.
            </>,
            <>
              Click <strong>Add item…</strong> under the list. A menu of previews opens; each one is a
              real example of that section on the site.
            </>,
            <>
              Click the one you want. It is added to the bottom of the list and opens so you can fill
              it in.
            </>,
            <>
              Drag it into place, then <strong>Publish</strong> the page.
            </>,
          ]}
        />
        <GuideShot
          file="insert-menu.webp"
          alt="The Add item menu showing preview images of all ten section types"
          caption="All ten section types. Each one has its own entry at the end of this guide."
        />
        <GuideParagraph>
          To add a section somewhere in the middle, use <strong>Add item before…</strong> or{' '}
          <strong>Add item after…</strong> from the <strong>⋯</strong> menu of a neighbouring
          section.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Edit a section</GuideSubheading>
        <GuideParagraph>
          Click a section in the list and its fields open in a panel. Close it with the{' '}
          <strong>×</strong> at the top right when you are done; your changes are kept. Some fields
          start folded (a small ▸ next to the name): click the name to open them.
        </GuideParagraph>
        <GuideShot
          file="section-dialog.webp"
          alt="A Two Column section open in a panel, showing Title, Title Options, Column Split, and the Left Panel"
          caption="The path at the top shows which section you are in."
        />
        <GuideParagraph>
          Some sections hold their own words and images (Hero Banner, Single Column Content Block,
          Pull Quote, Two Column, Accordion, Contact Form). Others show photos or collections from the
          Photo Library (Photo Grid, Featured Collection, Series Grid, Auto Gallery); see{' '}
          <strong>Referenced content</strong>.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Move, copy, hide, or remove a section</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Move</strong>: drag the dotted handle on the left of a section up or down.
            </>,
            <>
              <strong>Duplicate</strong>, <strong>Remove</strong>, and <strong>Copy</strong> (for
              pasting into another page) are in the section&apos;s <strong>⋯</strong> menu.
            </>,
            <>
              <strong>Hide without deleting</strong>: open the section and tick{' '}
              <strong>Disabled</strong>. It stays in the list marked <code>*** DISABLED ***</code> but
              does not appear on the website. Untick it to bring it back.
            </>,
          ]}
        />
        <GuideShot
          file="section-item-menu.webp"
          alt="A section's ⋯ menu open, showing Remove, Copy, Duplicate, Add item before, and Add item after"
        />
      </Stack>

      <GuideCallout tone="primary" title="Check before you publish">
        Open the page in <strong>Presentation</strong> to see how the sections look together, on a
        laptop and at phone width.
      </GuideCallout>
    </Stack>
  ),
  children: pageBuilderSections,
}

export const guideSections: GuideSection[] = [...workflowSections, pageBuilderParent]
