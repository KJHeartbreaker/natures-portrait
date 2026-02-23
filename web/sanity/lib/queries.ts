import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    menuItems[]{
      ...,
      _type == "navCTA" => {
        ...,
        cta{
          ...,
          "landingPage": landingPageRoute->{
            _type,
            "slug": slug.current
          }
        }
      },
      _type == "navDropdownCTA" => {
        ...,
        cta{
          ...,
          "landingPage": landingPageRoute->{
            _type,
            "slug": slug.current
          }
        },
        subnav[]{
          ...,
          "landingPage": landingPageRoute->{
            _type,
            "slug": slug.current
          }
        }
      }
    },
    ogImage{
      ...,
      alt,
      metadataBase
    }
  }
`)

export const homeQuery = defineQuery(`
  *[_type == "home" && _id == "home"][0]{
    _id,
    _type,
    title,
    overview,
    seo,
    content[]{
      ...,
      cta{
        ...,
        "landingPage": landingPageRoute->{
          _type,
          "slug": slug.current
        }
      }
    }
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    slug,
    title,
    overview,
    seo,
    content[]{
      ...,
      cta{
        ...,
        "landingPage": landingPageRoute->{
          _type,
          "slug": slug.current
        }
      }
    }
  }
`)

export const sitemapData = defineQuery(`
  *[_type in ["page", "post"] && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

const postFields = /* groq */ `
  _id,
  _type,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  image,
  _updatedAt,
`

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(_updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(_updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    seo,
    overview,
    excerpt,
    image,
    subheader,
    body,
    _updatedAt
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
