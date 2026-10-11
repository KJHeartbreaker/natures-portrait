import {GetPageQueryResult} from '@/sanity.types'

export type PageSection = NonNullable<NonNullable<GetPageQueryResult>['content']>[number]
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
