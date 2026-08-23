/**
 * Migrates collection membership from photo→collections[] to collection→photos[].
 *
 * Before: each photo document has a `collections: [{_ref: collectionId}]` array.
 * After:  each collection document has a `photos: [{_type:'reference', _ref: photoId}]` array.
 *
 * Run with: npx sanity exec scripts/migrate-collection-membership.ts -- --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({useCdn: false})

async function run() {
  // 1. Fetch all photos that have at least one collection assignment.
  const photos = await client.fetch<Array<{_id: string; collections: string[]}>>(
    `*[_type == "photo" && defined(collections) && length(collections) > 0]{
      _id, "collections": collections[]._ref
    }`,
  )

  if (photos.length === 0) {
    console.log('No photos with collection membership found. Nothing to migrate.')
    return
  }

  // 2. Build a map of collectionId → photoId[]
  const membershipMap = new Map<string, string[]>()
  for (const photo of photos) {
    for (const collectionId of photo.collections ?? []) {
      if (!membershipMap.has(collectionId)) membershipMap.set(collectionId, [])
      membershipMap.get(collectionId)!.push(photo._id)
    }
  }

  console.log(`\nMigrating membership for ${membershipMap.size} collection(s):\n`)

  // 3. Patch each collection with its photos[] array.
  for (const [collectionId, photoIds] of membershipMap) {
    const photosArray = photoIds.map((id, i) => ({
      _type: 'reference' as const,
      _key: `migrated_${i}`,
      _ref: id,
    }))

    await client
      .patch(collectionId)
      .set({photos: photosArray})
      .commit()

    console.log(`  ✅  ${collectionId} ← [${photoIds.join(', ')}]`)
  }

  // 4. Clear collections[] from all photos.
  console.log(`\nClearing collections[] from ${photos.length} photo(s):\n`)
  for (const photo of photos) {
    await client.patch(photo._id).unset(['collections']).commit()
    console.log(`  ✅  ${photo._id}`)
  }

  console.log('\nMigration complete. ✅')
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
