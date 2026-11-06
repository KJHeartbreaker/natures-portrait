import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import { sanityFetch } from '@/sanity/lib/live'
import { autoGalleryQuery, getPageQuery, pagesSlugs } from '@/sanity/lib/queries'
import type { PageBuilderInput } from '@/sanity/lib/types'
import { seoMetadata } from '@/app/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  return seoMetadata(page?.seo, {title: page?.title})
}

export default async function Page(props: Props) {
  const params = await props.params
  const { data: page } = await sanityFetch({ query: getPageQuery, params })

  if (!page?._id) notFound()

  const hasAutoGallery = page.content?.some((b) => b._type === 'autoGallery' && !b.disabled)
  const autoGalleryData = hasAutoGallery
    ? (await sanityFetch({ query: autoGalleryQuery, stega: false })).data
    : null

  // Every page needs one H1. Most get it from a hero banner or an H1 in rich text;
  // when neither is present, fall back to a visually hidden H1 with the page title.
  const hasVisibleH1 =
    page.content?.some(
      (b) => b._type === 'heroBanner' && !b.disabled && Boolean((b as {heading?: string}).heading),
    ) || JSON.stringify(page.content ?? []).includes('"style":"h1"')

  return (
    <div className="mb-12">
      {!hasVisibleH1 && page.title ? <h1 className="sr-only">{page.title}</h1> : null}
      <PageBuilderPage page={page as PageBuilderInput} autoGalleryData={autoGalleryData} />
    </div>
  )
}
