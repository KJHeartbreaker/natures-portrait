'use client'

import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'

import BlockRenderer from '@/app/components/BlockRenderer'
import {GetPageQueryResult} from '@/sanity.types'
import {dataAttr} from '@/sanity/lib/utils'
import {PageSection} from '@/sanity/lib/types'

type PageBuilderPageProps = {
  page: GetPageQueryResult
}

type PageData = {
  _id: string
  _type: string
  content?: PageSection[]
}

/**
 * The PageBuilder component is used to render the blocks from the `content` field in the Page type in your Sanity Studio.
 */

function RenderSections({
  sections,
  page,
}: {
  sections: PageSection[]
  page: GetPageQueryResult
}) {
  if (!page) {
    return null
  }
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

function RenderEmptyState({page}: {page: GetPageQueryResult}) {
  if (!page) {
    return null
  }

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

export default function PageBuilder({page}: PageBuilderPageProps) {
  const sections = useOptimistic<
    PageSection[] | undefined,
    SanityDocument<PageData>
  >(page?.content || [], (currentSections, action) => {
    // The action contains updated document data from Sanity
    // when someone makes an edit in the Studio

    // If the edit was to a different document, ignore it
    if (action.id !== page?._id) {
      return currentSections
    }

    // If there are sections in the updated document, use them
    if (action.document.content) {
      // Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
      return action.document.content.map(
        (section) => currentSections?.find((s) => s._key === section?._key) || section,
      )
    }

    // Otherwise keep the current sections
    return currentSections
  })

  return sections && sections.length > 0 ? (
    <RenderSections sections={sections} page={page} />
  ) : (
    <RenderEmptyState page={page} />
  )
}
