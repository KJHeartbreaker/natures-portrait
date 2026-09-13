/**
 * Migrates the Gallery page's photoGridContainer images[] from inline photoItem objects
 * to photoGridRef references pointing at Photo Library documents.
 *
 * Match strategy: image.asset._ref (unique per image file).
 * Skips unmatched items and reports them at the end.
 */
import {getCliClient} from 'sanity/cli'
import {nanoid} from 'nanoid'

// getCliClient picks up SANITY_API_READ_TOKEN which blocks writes; use the CLI auth token directly
import {readFileSync} from 'fs'
import {homedir} from 'os'
import {join} from 'path'
import {createClient} from '@sanity/client'

const {projectId, dataset} = (() => {
  const cli = getCliClient({apiVersion: '2024-01-01'}) as unknown as {config: () => {projectId: string; dataset: string}}
  return cli.config()
})()

const cliConfig = JSON.parse(readFileSync(join(homedir(), '.config/sanity/config.json'), 'utf-8'))
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: cliConfig.authToken,
})

async function run() {
  // 1. Fetch the Gallery page
  const galleryPage = await client.fetch(
    `*[_type == "page" && slug.current == "gallery"][0]{
      _id,
      content[]{
        _key,
        _type,
        _type == "photoGridContainer" => {
          images[]{
            _key,
            _type,
            title,
            "assetRef": image.asset._ref
          }
        }
      }
    }`,
  )

  if (!galleryPage) {
    console.error('Gallery page not found — is there a page with slug "gallery"?')
    process.exit(1)
  }

  console.log(`Found gallery page: ${galleryPage._id}`)

  // 2. Fetch all Photo Library documents with their asset refs
  const photos: Array<{_id: string; title: string; assetRef: string}> = await client.fetch(
    `*[_type == "photo"]{ _id, title, "assetRef": image.asset._ref }`,
  )

  console.log(`Found ${photos.length} photos in Photo Library`)

  const photoByAssetRef = new Map(photos.map((p) => [p.assetRef, p]))

  // 3. Find the photoGridContainer block(s)
  const contentBlocks: Array<{_key: string; _type: string; images?: Array<{_key: string; _type: string; title?: string; assetRef?: string}>}> = galleryPage.content ?? []
  const gridBlocks = contentBlocks.filter((b) => b._type === 'photoGridContainer')

  if (gridBlocks.length === 0) {
    console.error('No photoGridContainer block found on the Gallery page.')
    process.exit(1)
  }

  const skipped: Array<{title?: string; assetRef?: string}> = []
  let converted = 0

  for (const gridBlock of gridBlocks) {
    const images = gridBlock.images ?? []
    console.log(`\nProcessing photoGridContainer (key: ${gridBlock._key}) with ${images.length} images`)

    const newImages = images.map((img) => {
      if (img._type === 'photoGridRef') {
        // Already migrated
        return img
      }

      const photo = img.assetRef ? photoByAssetRef.get(img.assetRef) : undefined
      if (!photo) {
        skipped.push({title: img.title, assetRef: img.assetRef})
        console.warn(`  SKIP: "${img.title}" (asset: ${img.assetRef?.slice(0, 20)}...) — no Photo Library match`)
        return img
      }

      converted++
      console.log(`  CONVERT: "${img.title}" → Photo Library doc ${photo._id} ("${photo.title}")`)
      return {
        _key: img._key || nanoid(),
        _type: 'photoGridRef',
        photo: {
          _type: 'reference',
          _ref: photo._id,
        },
      }
    })

    // 4. Patch the draft version (Sanity requires editing drafts, not published docs directly)
    const draftId = galleryPage._id.startsWith('drafts.')
      ? galleryPage._id
      : `drafts.${galleryPage._id}`

    // Ensure a draft exists by creating it from the published doc if needed
    const draftExists = await client.fetch(`*[_id == $id][0]._id`, {id: draftId})
    if (!draftExists) {
      const published = await client.getDocument(galleryPage._id)
      if (published) {
        await client.createOrReplace({...published, _id: draftId})
        console.log(`  Created draft from published doc`)
      }
    }

    await client
      .patch(draftId)
      .set({
        [`content[_key=="${gridBlock._key}"].images`]: newImages,
      })
      .commit()

    console.log(`  Patched draft ${draftId} block ${gridBlock._key}`)
  }

  console.log(`\nDone. Converted: ${converted}, Skipped: ${skipped.length}`)
  if (skipped.length > 0) {
    console.log('Skipped items (no Photo Library match):')
    skipped.forEach((s) => console.log(`  - "${s.title}" (asset: ${s.assetRef})`))
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
