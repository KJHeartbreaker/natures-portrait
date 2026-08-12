'use client'

import {SanityDocument} from 'next-sanity'
import {useLayoutEffect} from 'react'
import {useOptimistic} from 'next-sanity/hooks'

import BlockRenderer from '@/app/components/BlockRenderer'
import {cleanStegaData, dataAttr} from '@/sanity/lib/utils'
import {PageBuilderInput, PageSection} from '@/sanity/lib/types'

type PageBuilderPageProps = {
  page: PageBuilderInput
}

type PageData = {
  _id: string
  _type: string
  content?: PageSection[]
}

function mergeSection(existing: PageSection, incoming: PageSection): PageSection {
  return {...existing, ...incoming}
}

function RenderSections({
  sections,
  page,
}: {
  sections: PageSection[]
  page: NonNullable<PageBuilderInput>
}) {
  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `content`,
      }).toString()}
    >
      {sections.map((block: PageSection) => (
        <BlockRenderer
          key={block._key}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  )
}

function RenderEmptyState({page}: {page: NonNullable<PageBuilderInput>}) {
  return (
    <div
      className="container mt-10"
      data-sanity={dataAttr({
        id: page._id,
        type: 'page',
        path: `content`,
      }).toString()}
    >
      <div className="prose">
        <h2 className="">This page has no content!</h2>
        <p className="">Open the page in Sanity Studio to add content.</p>
      </div>
    </div>
  )
}

/**
 * Renders the page builder blocks from the `content` field.
 * Accepts any document shape that satisfies PageBuilderInput — including both
 * the home singleton and regular page/blogLandingPage documents.
 */
export default function PageBuilder({page}: PageBuilderPageProps) {
  const cleanedPage = page ? cleanStegaData(page) : page

  const sections = useOptimistic<
    PageSection[] | undefined,
    SanityDocument<PageData>
  >(cleanedPage?.content || [], (currentSections, action) => {
    if (action.id !== page?._id) {
      return currentSections
    }

    if (action.document.content) {
      const cleanedContent = cleanStegaData(action.document.content) as PageSection[]
      return cleanedContent.map((incoming) => {
        const existing = currentSections?.find((s) => s._key === incoming?._key)
        if (!existing) return incoming
        return mergeSection(existing, incoming)
      })
    }

    return currentSections
  })

  const firstType = sections?.[0]?._type
  useLayoutEffect(() => {
    const hasHero = firstType === 'heroBanner' || firstType === 'heroTwoPanel'
    document.body.dataset.hasHero = hasHero ? 'true' : 'false'
    return () => {
      delete document.body.dataset.hasHero
    }
  }, [firstType])

  if (!cleanedPage) return null

  return sections && sections.length > 0 ? (
    <RenderSections sections={sections} page={cleanedPage} />
  ) : (
    <RenderEmptyState page={cleanedPage} />
  )
}
