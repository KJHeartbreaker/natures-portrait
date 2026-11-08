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

// Fields of a Photo Grid block (`photoGridContainer`). Used by the page builder
// queries and inside journal post bodies. Photos from the Photo Library
// (`photoGridRef`) are dereferenced so they share one shape with inline `photoItem`s.
export const photoGridContainerProjection = `
  eyebrow,
  title,
  backgroundColor,
  columns,
  gap,
  showCaptions,
  "images": images[]{
    _key,
    _type,
    _type == "photoGridRef" => {
      "_key": _key,
      "_type": _type,
      "title": coalesce(titleOverride, photo->.title),
      "location": photo->.location,
      "dateCaptured": photo->.dateCaptured,
      "description": coalesce(descriptionOverride, photo->.description){
        ${portableTextProjection}
      },
      "cameraText": photo->.cameraText,
      "lensText": photo->.lensText,
      "cameraRef": photo->.cameraRef->{ ${gearProjection} },
      "lensRef": photo->.lensRef->{ ${gearProjection} },
      "image": photo->.image{ ${imageProjection} },
      "photoId": photo._ref,
      "series": *[_type == "collection" && references(^.photo._ref) && defined(slug.current)] | order(title asc){
        _id,
        title,
        "slug": slug.current
      },
    },
    _type == "photoItem" => {
      "_key": _key,
      "_type": _type,
      title,
      location,
      dateCaptured,
      description{ ${portableTextProjection} },
      cameraText,
      lensText,
      cameraRef->{ ${gearProjection} },
      lensRef->{ ${gearProjection} },
      "image": coalesce(image, @){ ${imageProjection} },
    },
  },
  disabled
`

// Journal post body: the shared rich text plus the layout blocks only posts allow.
export const postBodyProjection = `
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
    _type == "photoGridContainer" => {
      _key,
      _type,
      ${photoGridContainerProjection}
    },
    ${portableTextMarkDefsProjection}
  }
`
