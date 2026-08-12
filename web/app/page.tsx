import PageBuilder from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {homeQuery} from '@/sanity/lib/queries'
import type {PageBuilderInput} from '@/sanity/lib/types'

export default async function Page() {
  const {data: home} = await sanityFetch({query: homeQuery})

  // home and GetPageQueryResult share identical content[] projections — the cast is safe.
  return <PageBuilder page={home as PageBuilderInput} />
}
