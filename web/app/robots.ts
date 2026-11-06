import type {MetadataRoute} from 'next'
import {headers} from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host')
  return {
    rules: {userAgent: '*', allow: '/', disallow: ['/api/']},
    sitemap: `https://${host}/sitemap.xml`,
  }
}
