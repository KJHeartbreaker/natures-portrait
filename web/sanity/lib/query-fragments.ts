/**
 * Composable GROQ fragments for reusable projections.
 * Keep these string-only (no imports) so queries stay consistent and small.
 */
 
export const imageProjection = `
  _type,
  alt,
  width,
  height,
  crop,
  hotspot,
  asset->{
    _id,
    _type,
    url,
    metadata{
      dimensions{
        width,
        height,
        aspectRatio
      },
      lqip,
      blurhash,
      palette{
        dominant{
          background
        }
      }
    }
  }
`
 
export const fileDownloadProjection = `
  _type,
  asset->{
    _id,
    _type,
    url
  }
`
 
export const ctaProjection = `
  _type,
  title,
  anchor,
  link,
  siteSection,
  fileDownload{
    ${fileDownloadProjection}
  },
  "landingPage": landingPageRoute->{
    _id,
    _type,
    "slug": slug.current,
    title
  }
`
 
export const portableTextMarkDefsProjection = `
  markDefs[]{
    _key,
    _type,
    _type == "internalLink" => {
      item->{
        _id,
        _type,
        "slug": slug.current,
        title
      }
    },
    _type == "link" => {
      href,
      blank
    },
    _type != "internalLink" && _type != "link" => @
  }
`
 
export const portableTextProjection = `
  portableTextBlock[]{
    ...,
    _type == "cta" => {
      ${ctaProjection}
    },
    _type == "image" => {
      ...,
      alt,
      crop,
      hotspot,
      asset->{
        _id,
        _type,
        metadata{
          dimensions{
            width,
            height,
            aspectRatio
          },
          lqip,
          blurhash
        }
      }
    },
    ${portableTextMarkDefsProjection}
  }
`

export const gearProjection = `
  _id,
  _type,
  kind,
  brand,
  model,
  nickname,
  notes,
  link
`

// Series (collection documents) a photo belongs to, for the lightbox's
// "Series" links. Evaluated inside a photo document projection, so `^._id`
// is the photo. Only series with a slug can be linked to.
export const photoSeriesProjection = `
  "series": *[_type == "collection" && references(^._id) && defined(slug.current)] | order(title asc){
    _id,
    title,
    "slug": slug.current
  }
`
