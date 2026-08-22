import {stegaClean} from '@sanity/client/stega'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {createImageUrlBuilder} from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url'
import type {
  PortableTextInternalLink,
  PortableTextMarkLink,
  ResolvedLandingPage,
} from '@/sanity/lib/types'

const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

// Create an image URL builder using the client
// Export a function that can be used to get image URLs
function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

export function resolveOpenGraphImage(
  image?: SanityImageSource | null,
  width = 1200,
  height = 627,
) {
  if (!image) return
  const url = urlForImage(image)?.width(width).height(height).fit('crop').url()
  if (!url) return
  return {url, alt: (image as {alt?: string})?.alt || '', width, height}
}

/** Square-cropped PNG URLs for favicon / apple-touch-icon from the site logo. */
export function resolveSiteIcons(image?: SanityImageSource | null) {
  if (!image) return undefined

  const squareIcon = (size: number) => {
    const url = urlForImage(image)?.width(size).height(size).fit('crop').auto('format').url()
    return url ? {url, sizes: `${size}x${size}`, type: 'image/png' as const} : undefined
  }

  const icon16 = squareIcon(16)
  const icon32 = squareIcon(32)
  const appleUrl = urlForImage(image)?.width(180).height(180).fit('crop').auto('format').url()

  if (!icon32) return undefined

  return {
    icon: [icon16, icon32].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    apple: appleUrl
      ? [{url: appleUrl, sizes: '180x180', type: 'image/png' as const}]
      : undefined,
  }
}

export type CtaLike = {
  _type?: 'cta'
  title?: string | null
  kind?: string | null
  arrow?: boolean | null
  anchor?: string | null
  link?: string | null
  fileDownload?: {
    _type?: string
    asset?: {
      url?: string | null
    } | null
  } | null
  landingPage?: ResolvedLandingPage | null
}

function resolveLandingPageHref(landingPage: ResolvedLandingPage): string | null {
  if (!landingPage?.slug) return null
  switch (landingPage._type) {
    case 'post':
      return `/posts/${landingPage.slug}`
    case 'page':
    case 'blogLandingPage':
      return `/${landingPage.slug}`
    default:
      return null
  }
}

// Resolve URL/href for common link-like objects used in this project.
export function linkResolver(link: PortableTextMarkLink | CtaLike | undefined) {
  if (!link) return null

  // Portable Text external link annotation
  if ('href' in link && typeof link.href === 'string') return link.href

  // Portable Text internal link annotation
  if ('item' in link) {
    const item = (link as PortableTextInternalLink).item
    if (item?.slug) {
      if (item._type === 'post') return `/posts/${item.slug}`
      if (item._type === 'page' || item._type === 'blogLandingPage') return `/${item.slug}`
      return `/${item.slug}`
    }
  }

  // CTA object (or CTA-like, after GROQ projection)
  if ('anchor' in link || 'link' in link || 'landingPage' in link) {
    const cta = link as CtaLike

    if (cta.anchor) return cta.anchor
    if (cta.link) return cta.link
    if (cta.landingPage) return resolveLandingPageHref(cta.landingPage)
  }

  return null
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}

/** Strip stega metadata so layout fields (e.g. textTone) compare and render correctly. */
export function cleanStegaData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data
  }
  if (typeof data === 'string') {
    return stegaClean(data) as T
  }
  if (Array.isArray(data)) {
    return data.map(cleanStegaData) as T
  }
  if (typeof data === 'object') {
    const cleaned = {} as T
    for (const [key, value] of Object.entries(data)) {
      ;(cleaned as Record<string, unknown>)[key] = cleanStegaData(value)
    }
    return cleaned
  }
  return data
}
