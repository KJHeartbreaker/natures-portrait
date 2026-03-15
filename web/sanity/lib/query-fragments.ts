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
  kind,
  arrow,
  anchor,
  link,
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
