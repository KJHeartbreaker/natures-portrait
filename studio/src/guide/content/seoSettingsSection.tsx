import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const seoSettingsSection: GuideSection = {
  id: 'seo-settings',
  title: 'SEO settings',
  content: (
    <Stack gap={5}>
      <GuideParagraph>
        Strong SEO helps people discover your photography and writing when they search. Every important
        page and post should have thoughtful SEO filled in before you publish.
      </GuideParagraph>

      <GuideCallout tone="critical" title="Before you publish">
        Open the <strong>SEO</strong> tab on every page and post. Meta description should be filled
        in for search and social previews — treat SEO as part of the publish checklist, not an
        afterthought.
      </GuideCallout>

      <Stack gap={4}>
        <GuideSubheading>Where to find SEO settings</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Pages</strong>, <strong>Home</strong>, and <strong>Blog</strong> — SEO tab on
              the document
            </>,
            <>
              <strong>Posts</strong> — SEO tab (default group on post documents)
            </>,
            <>
              <strong>Settings and Menus</strong> — default social sharing image used when a page does
              not set its own
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>What each field does</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>SEO Title</strong> — The blue link text in Google search results. Aim for about{' '}
              <strong>50–60 characters</strong> (65 max). If you leave it blank, the page title is used
              instead.
            </>,
            <>
              <strong>Meta Description</strong> — The short summary under the title in search results.
              Aim for about <strong>150–155 characters</strong>. Write for humans: what will they see
              on this page?
            </>,
            <>
              <strong>Hide from Search Engines (noindex)</strong> — Turn on only when a page should{' '}
              <em>not</em> appear in Google. Leave off for normal marketing pages and blog posts.
            </>,
            <>
              <strong>Canonical URL</strong> — Almost always leave blank. Use only when the same content
              lives at two URLs and you want Google to treat another URL as the official one.
            </>,
            <>
              <strong>Social Sharing Image</strong> — Shown when someone shares the page on social
              platforms. Recommended size: <strong>1200×630 px</strong>. Add <strong>alt text</strong>{' '}
              on the image (required when an image is set). If empty, the site falls back to the default
              from Settings and Menus.
            </>,
          ]}
        />
      </Stack>

      <Stack gap={4}>
        <GuideSubheading>Character counters</GuideSubheading>
        <GuideParagraph>
          SEO Title and Meta Description show a live character count in Studio. Stay in the green —
          text that is too long gets cut off in search results with “...”.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Write unique meta descriptions per page. For a photography site, mention location, subject, or
        project when it fits naturally.
      </GuideCallout>
    </Stack>
  ),
}
