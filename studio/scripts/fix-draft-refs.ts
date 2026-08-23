/**
 * One-time fix: some collection.photos[] entries have _ref values with
 * "drafts." prefix (stored when the photo had never been published).
 * Strip the prefix so they point to the canonical document ID.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function run() {
  const collections = await client.fetch<Array<{_id: string; photos: Array<{_key: string; _ref: string; _type: string}>}>>(
    `*[_type == "collection" && defined(photos)]{_id, photos}`,
    {},
    {perspective: 'raw'},
  )

  for (const col of collections) {
    const badItems = (col.photos ?? []).filter((p) => p._ref?.startsWith('drafts.'))
    if (badItems.length === 0) continue

    console.log(`Fixing ${badItems.length} ref(s) in collection ${col._id}`)

    // Check which bare IDs actually exist as published documents
    const bareIds = badItems.map((p) => p._ref.replace(/^drafts\./, ''))
    const existing = await client.fetch<string[]>(
      `*[_id in $ids]._id`,
      {ids: bareIds},
    )
    const existingSet = new Set(existing)

    const patch = client.patch(col._id)
    let changed = false
    for (const item of badItems) {
      const cleanRef = item._ref.replace(/^drafts\./, '')
      if (existingSet.has(cleanRef)) {
        // Published doc exists — fix the ref
        patch.set({[`photos[_key=="${item._key}"]._ref`]: cleanRef})
        changed = true
      } else {
        // Photo not yet published — remove the entry so publish isn't blocked
        patch.unset([`photos[_key=="${item._key}"]`])
        console.log(`  Removing unpublished ref ${item._ref} (photo not yet published — re-add after publishing)`)
        changed = true
      }
    }
    if (changed) await patch.commit()
    console.log(`  ✓ Patched`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
