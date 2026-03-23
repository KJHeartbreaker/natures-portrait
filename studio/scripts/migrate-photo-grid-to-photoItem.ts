import {getCliClient} from 'sanity/cli'

type AnyObject = Record<string, any>

type PhotoGridBlock = {
  _key: string
  _type: 'photoGridContainer'
  images?: AnyObject[]
}

type DocWithPhotoGrids = {
  _id: string
  _type: string
  grids: PhotoGridBlock[]
}

function isMainImage(item: AnyObject) {
  return item?._type === 'mainImage'
}

function isPhotoItem(item: AnyObject) {
  return item?._type === 'photoItem'
}

function toPhotoItemFromMainImage(mainImage: AnyObject) {
  return {
    _type: 'photoItem',
    _key: mainImage._key,
    image: mainImage,
  }
}

async function run() {
  const client = getCliClient({apiVersion: '2025-09-25'}).withConfig({
    useCdn: false,
  })

  const query = /* groq */ `
    *[
      _type in ["home","page","blogLandingPage"] &&
      count(content[_type=="photoGridContainer" && count(images[_type=="mainImage"])>0]) > 0
    ]{
      _id,
      _type,
      "grids": content[_type=="photoGridContainer" && count(images[_type=="mainImage"])>0]{
        _key,
        _type,
        images
      }
    }
  `

  const docs = await client.fetch<DocWithPhotoGrids[]>(query)

  if (!docs.length) {
    // eslint-disable-next-line no-console
    console.log('No documents need migration. ✅')
    return
  }

  // eslint-disable-next-line no-console
  console.log(`Found ${docs.length} document(s) with legacy photo grids.`)

  for (const doc of docs) {
    for (const grid of doc.grids) {
      const images = Array.isArray(grid.images) ? grid.images : []
      const legacy = images.filter(isMainImage)
      if (!legacy.length) continue

      const migratedImages = images
        .map((item) => {
          if (isPhotoItem(item)) return item
          if (isMainImage(item)) return toPhotoItemFromMainImage(item)
          return item
        })
        // remove anything that isn't a photoItem after migration
        .filter(isPhotoItem)

      // Patch just this grid's images array
      await client
        .patch(doc._id)
        .set({
          [`content[_key=="${grid._key}"].images`]: migratedImages,
        })
        .commit({
          // Let Studio continue to work while user publishes later
          autoGenerateArrayKeys: false,
        })

      // eslint-disable-next-line no-console
      console.log(
        `Migrated ${legacy.length} item(s) in ${doc._type} ${doc._id} grid ${grid._key}`,
      )
    }
  }

  // eslint-disable-next-line no-console
  console.log('Migration complete. ✅')
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})

