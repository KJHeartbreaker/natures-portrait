import type {Metadata} from 'next'

import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type SeoFields = {
  seoTitle?: string | null
  seoDescription?: string | null
  noindex?: boolean | null
  canonicalUrl?: string | null
  ogImage?: Parameters<typeof resolveOpenGraphImage>[0]
} | null

export function seoMetadata(
  seo: SeoFields | undefined,
  fallback: {title?: string | null; description?: string | null} = {},
): Metadata {
  const ogImage = resolveOpenGraphImage(seo?.ogImage)
  const title = seo?.seoTitle || fallback.title
  const description = seo?.seoDescription || fallback.description

  return {
    ...(title ? {title} : {}),
    ...(description ? {description} : {}),
    ...(seo?.canonicalUrl ? {alternates: {canonical: seo.canonicalUrl}} : {}),
    ...(seo?.noindex ? {robots: {index: false, follow: true}} : {}),
    ...(ogImage ? {openGraph: {images: [ogImage]}} : {}),
  }
}
