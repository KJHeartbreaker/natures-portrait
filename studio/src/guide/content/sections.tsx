import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
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
        The page builder is the <strong>Page sections</strong> field on <strong>Home</strong>,{' '}
        <strong>Blog</strong>, and <strong>Pages</strong>. Each entry in the list is one section on the
        live page — hero, multi-column row, posts grid, photo grid, and so on. Sections stack top to
        bottom in the order you arrange them in Studio.
      </GuideParagraph>

      <Stack gap={4}>
        <GuideSubheading>Choosing a section (insert menu)</GuideSubheading>
        <GuideSteps
          steps={[
            <>
              Open a page document and scroll to <strong>Page sections</strong>.
            </>,
            <>
              Click <strong>Add item…</strong> (or the + control at the bottom of the list).
            </>,
            <>
              The insert menu opens as a <strong>grid of previews</strong> when thumbnails are available
              — each matches a section type (Hero Banner, Multi Column Row, Photo Grid, etc.). Use search
              or switch to <strong>list</strong> view if you prefer.
            </>,
            <>
              Click the section you want. It is added to the page and opens so you can fill in fields.
            </>,
          ]}
        />
        <GuideParagraph>
          Not every document has every section type. For example, regular <strong>Pages</strong> include{' '}
          <strong>Multi Column Row</strong> but the <strong>Blog</strong> landing page does not. Check the
          insert menu for what is available on the document you are editing.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Populating a section</GuideSubheading>
        <GuideParagraph>
          After you add a section, click it in the list to expand it. There are two common patterns:
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Content lives inside the section</strong> — headings, portable text, and images
              typed directly in that block (Hero Banner, Single Column Content Block, Multi Column Row).
            </>,
            <>
              <strong>Content is referenced from elsewhere</strong> — you pick existing{' '}
              <strong>Posts</strong> or photos and the site pulls in their published data (Posts Grid).
              See <strong>Referenced content</strong>.
            </>,
          ]}
        />
        <GuideParagraph>
          Fill in the fields, then <strong>Publish</strong> the page. If a grid looks empty, publish the
          referenced documents too.
        </GuideParagraph>
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Arranging sections on the page</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Order</strong> — drag sections by the handle on the left. First in the list is the
              top of the page.
            </>,
            <>
              <strong>Collapse</strong> — click the section header to fold it closed while you work on
              another block.
            </>,
            <>
              Prefer <strong>Disabled</strong> over delete when you might turn a block back on later.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="positive" title="Disabled sections">
        Most blocks include a <strong>Disabled</strong> checkbox. When checked, the section stays in
        Studio but does not render on the live site.
      </GuideCallout>

      <GuideCallout tone="primary" title="Preview before publish">
        Use <strong>Presentation</strong> to see how stacked sections look on the real site layout.
        Section order in Studio matches scroll order on the page.
      </GuideCallout>

      <Stack gap={3}>
        <GuideSubheading>Section types (detail)</GuideSubheading>
        <GuideParagraph>
          Each type below has its own guide entry with key fields and tips.
        </GuideParagraph>
      </Stack>
    </Stack>
  ),
  children: pageBuilderSections,
}

export const guideSections: GuideSection[] = [...workflowSections, pageBuilderParent]
