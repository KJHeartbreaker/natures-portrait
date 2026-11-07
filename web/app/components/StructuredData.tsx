import {sanityFetch} from '@/sanity/lib/live'
import {homeMetaQuery, settingsMetaQuery} from '@/sanity/lib/queries'
import {ARTIST_NAME, GOOGLE_BUSINESS_URL, INSTAGRAM_URL, SITE_NAME, SITE_TAGLINE} from '@/app/lib/site'

export default async function StructuredData() {
  const [{data: home}, {data: settings}] = await Promise.all([
    sanityFetch({query: homeMetaQuery, stega: false}),
    sanityFetch({query: settingsMetaQuery, stega: false}),
  ])
  const siteUrl = settings?.ogImage?.metadataBase || undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': '#artist',
        name: ARTIST_NAME,
        jobTitle: 'Fine Art Photographer',
        sameAs: [INSTAGRAM_URL, GOOGLE_BUSINESS_URL],
      },
      {
        '@type': 'WebSite',
        name: home?.title || SITE_NAME,
        alternateName: SITE_TAGLINE,
        ...(siteUrl ? {url: siteUrl} : {}),
        author: {'@id': '#artist'},
        publisher: {'@id': '#artist'},
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
    />
  )
}
