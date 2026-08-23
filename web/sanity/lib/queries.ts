import {defineQuery} from 'next-sanity'
import {ctaProjection, gearProjection, imageProjection, portableTextProjection} from '@/sanity/lib/query-fragments'

// TODO(decision): `photoGridContainer.images` currently allows BOTH `photoItem` and raw `mainImage`.
// Because that creates two possible shapes, the Photo Grid projections in `homeQuery` and `getPageQuery`
// normalize with: `"image": coalesce(image, @){ ${imageProjection} }`.
// If we later restrict Studio to ONLY `photoItem`, update both projections to use `image{ ${imageProjection} }`
// and remove the `coalesce(image, @)` normalization.
export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    siteLogo{
      ${imageProjection}
    },
    menuItems[]{
      _key,
      _type,
      _type == "navCTA" => {
        _key,
        _type,
        cta{
          ${ctaProjection}
        }
      },
      _type == "navDropdownCTA" => {
        _key,
        _type,
        cta{
          ${ctaProjection}
        },
        subnav[]{
          _key,
          ${ctaProjection}
        }
      },
      // Defensive: in case this array contains references (or embedded documents)
      _type == "reference" => @->{
        _id,
        _type,
        title,
        "slug": slug.current
      },
      _type == "blogLandingPage" => {
        _id,
        _type,
        title,
        "slug": slug.current
      }
    },
    ogImage{
      ${imageProjection},
      metadataBase
    }
  }
`)

/**
 * A lean settings query for metadata only.
 */
export const settingsMetaQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    siteLogo{
      ${imageProjection}
    },
    siteFavicon{
      ${imageProjection}
    },
    ogImage{
      ${imageProjection},
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
    seo{
      seoTitle,
      seoDescription,
      noindex,
      canonicalUrl,
      ogImage{
        ${imageProjection}
      }
    },
    content[]{
      _key,
      _type,
      _type == "heroBanner" => {
        size,
        subheading,
        textTone,
        textAlign,
        tintBehindCopy,
        copyTint,
        ctaTone,
        heading,
        copy{
          ${portableTextProjection}
        },
        image{
          ${imageProjection}
        },
        cta{
          ${ctaProjection}
        },
        disabled
      },
      _type == "heroTwoPanel" => {
        size,
        backgroundColor,
        image{
          ${imageProjection}
        },
        mainPortableText{
          ${portableTextProjection}
        },
        centerText,
        disabled
      },
      _type == "pullQuote" => {
        quote,
        attribution,
        disabled
      },
      _type == "singleColumnContentBlock" => {
        title,
        backgroundColor,
        removeBottomPadding,
        skinny,
        centerContent,
        contentBlock{
          portableTextBlock{
            ${portableTextProjection}
          }
        },
        disabled
      },
      _type == "rowContainer" => {
        title,
        hideTitle,
        centerTitle,
        titleColor,
        split,
        leftPanel{
          panelType,
          image{
            ${imageProjection}
          },
          content{
            ${portableTextProjection}
          },
          backgroundColor,
          centerText
        },
        rightPanel{
          panelType,
          image{
            ${imageProjection}
          },
          content{
            ${portableTextProjection}
          },
          backgroundColor,
          centerText
        },
        disabled
      },
      _type == "postsGridContainer" => {
        backgroundColor,
        "posts": posts[]{
          _type == "reference" => @->{
            _id,
            _type,
            title,
            "slug": slug.current,
            excerpt,
            image{
              ${imageProjection}
            },
            _updatedAt
          }
        }[_type != "reference" || @->._id != null]
      },
      _type == "photoGridContainer" => {
        title,
        backgroundColor,
        columns,
        gap,
        showCaptions,
        images[]{
          _key,
          _type,
          title,
          location,
          description{
            ${portableTextProjection}
          },
          dateCaptured,
          cameraText,
          lensText,
          cameraRef->{
            ${gearProjection}
          },
          lensRef->{
            ${gearProjection}
          },
          "image": coalesce(image, @){
            ${imageProjection}
          },
        },
        disabled
      },
      _type == "featuredCollection" => {
        heading,
        subheading,
        body{
          ${portableTextProjection}
        },
        ctaLabel,
        collection->{
          _id,
          title,
          "slug": slug.current,
        },
        photo->{
          _id,
          "image": image{
            ${imageProjection}
          },
          title,
          location,
          dateCaptured,
        },
        disabled
      },
      _type == "seriesGrid" => {
        collections[]->{
          _id,
          title,
          "slug": slug.current,
          coverPhoto->{
            _id,
            "image": image{
              ${imageProjection}
            }
          },
          "photoCount": count(*[_type == "photo" && ^._id in collections[]._ref])
        },
        disabled
      }
    }
  }
`)

/**
 * Lean home query for layout metadata/header.
 */
export const homeMetaQuery = defineQuery(`
  *[_type == "home" && _id == "home"][0]{
    _id,
    _type,
    title,
    overview,
    seo{
      seoTitle,
      seoDescription,
      noindex,
      canonicalUrl
    }
  }
`)

export const getPageQuery = defineQuery(`
  *[_type in ["page","blogLandingPage"] && slug.current == $slug][0]{
    _id,
    _type,
    slug,
    title,
    overview,
    seo{
      seoTitle,
      seoDescription,
      noindex,
      canonicalUrl,
      ogImage{
        ${imageProjection}
      }
    },
    content[]{
      _key,
      _type,
      _type == "heroBanner" => {
        size,
        subheading,
        textTone,
        textAlign,
        tintBehindCopy,
        copyTint,
        ctaTone,
        heading,
        copy{
          ${portableTextProjection}
        },
        image{
          ${imageProjection}
        },
        cta{
          ${ctaProjection}
        },
        disabled
      },
      _type == "heroTwoPanel" => {
        size,
        backgroundColor,
        image{
          ${imageProjection}
        },
        mainPortableText{
          ${portableTextProjection}
        },
        centerText,
        disabled
      },
      _type == "pullQuote" => {
        quote,
        attribution,
        disabled
      },
      _type == "singleColumnContentBlock" => {
        title,
        backgroundColor,
        removeBottomPadding,
        skinny,
        centerContent,
        contentBlock{
          portableTextBlock{
            ${portableTextProjection}
          }
        },
        disabled
      },
      _type == "rowContainer" => {
        title,
        hideTitle,
        centerTitle,
        titleColor,
        split,
        leftPanel{
          panelType,
          image{
            ${imageProjection}
          },
          content{
            ${portableTextProjection}
          },
          backgroundColor,
          centerText
        },
        rightPanel{
          panelType,
          image{
            ${imageProjection}
          },
          content{
            ${portableTextProjection}
          },
          backgroundColor,
          centerText
        },
        disabled
      },
      _type == "postsGridContainer" => {
        backgroundColor,
        "posts": posts[]{
          _type == "reference" => @->{
            _id,
            _type,
            title,
            "slug": slug.current,
            excerpt,
            image{
              ${imageProjection}
            },
            _updatedAt
          }
        }[_type != "reference" || @->._id != null]
      },
      _type == "photoGridContainer" => {
        title,
        backgroundColor,
        columns,
        gap,
        showCaptions,
        images[]{
          _key,
          _type,
          title,
          location,
          description{
            ${portableTextProjection}
          },
          dateCaptured,
          cameraText,
          lensText,
          cameraRef->{
            ${gearProjection}
          },
          lensRef->{
            ${gearProjection}
          },
          "image": coalesce(image, @){
            ${imageProjection}
          },
        },
        disabled
      },
      _type == "featuredCollection" => {
        heading,
        subheading,
        body{
          ${portableTextProjection}
        },
        ctaLabel,
        collection->{
          _id,
          title,
          "slug": slug.current,
        },
        photo->{
          _id,
          "image": image{
            ${imageProjection}
          },
          title,
          location,
          dateCaptured,
        },
        disabled
      },
      _type == "seriesGrid" => {
        collections[]->{
          _id,
          title,
          "slug": slug.current,
          coverPhoto->{
            _id,
            "image": image{
              ${imageProjection}
            }
          },
          "photoCount": count(*[_type == "photo" && ^._id in collections[]._ref])
        },
        disabled
      }
    }
  }
`)

export const getCollectionQuery = defineQuery(`
  *[_type == "collection" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    description{
      ${portableTextProjection}
    },
    "photos": *[_type == "photo" && ^._id in collections[]._ref] | order(_updatedAt desc) {
      _id,
      _key,
      _type,
      title,
      location,
      dateCaptured,
      cameraText,
      lensText,
      description{
        ${portableTextProjection}
      },
      cameraRef->{
        ${gearProjection}
      },
      lensRef->{
        ${gearProjection}
      },
      "image": image{
        ${imageProjection}
      }
    }
  }
`)

export const sitemapData = defineQuery(`
  *[_type in ["page", "post", "blogLandingPage"] && defined(slug.current)] | order(_type asc) {
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
  *[_type in ["page","blogLandingPage"] && defined(slug.current)]
  {"slug": slug.current}
`)
