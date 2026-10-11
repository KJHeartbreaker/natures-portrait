import type {PortableTextBlock} from 'next-sanity'
import {GetPageQueryResult} from '@/sanity.types'
import type {SanityImageCrop, SanityImageHotspot} from '@/sanity.types'

export type ContactFormBlock = {
  _key: string
  _type: 'contactForm'
  eyebrow?: string | null
  heading?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intro?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contactLinks?: any
  backgroundColor?: string | null
  emailSubject?: string | null
  submitLabel?: string | null
  successMessage?: string | null
  disabled?: boolean | null
  image?: {
    _type?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
    crop?: SanityImageCrop | null
    hotspot?: SanityImageHotspot | null
    asset?: {
      _id: string
      _type: string
      url?: string | null
      metadata?: {
        dimensions?: {width: number; height: number; aspectRatio: number} | null
        lqip?: string | null
        blurhash?: string | null
      } | null
    } | null
  } | null
}

export type PageSection =
  | NonNullable<NonNullable<GetPageQueryResult>['content']>[number]
  | ContactFormBlock

export type ExtractPageSectionType<T extends PageSection['_type']> = Extract<PageSection, {_type: T}>

/**
 * Minimal shape required by PageBuilder — satisfied by both HomeQueryResult and GetPageQueryResult.
 * Use this as the prop type whenever PageBuilder needs to accept either document.
 */
export type PageBuilderInput = {
  _id: string
  _type: string
  content?: PageSection[] | null
} | null

export type PortableTextLink = {
  _type: 'link'
  href?: string
  blank?: boolean
}

export type PortableTextInternalLink = {
  _type: 'internalLink'
  item?: {
    _type?: 'page' | 'post' | 'blogLandingPage'
    slug?: string
  } | null
}

export type PortableTextMarkLink = PortableTextLink | PortableTextInternalLink

export type ResolvedLandingPage = {
  _type?: 'page' | 'post' | 'blogLandingPage'
  slug?: string | null
} | null
