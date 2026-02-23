import {GetPageQueryResult} from '@/sanity.types'

export type PageSection = NonNullable<NonNullable<GetPageQueryResult>['content']>[number]
export type ExtractPageSectionType<T extends PageSection['_type']> = Extract<PageSection, {_type: T}>

export type PortableTextLink = {
  _type: 'link'
  href?: string
  blank?: boolean
}

export type ResolvedLandingPage = {
  _type?: 'page' | 'post' | 'blogLandingPage'
  slug?: string
} | null
