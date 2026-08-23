import {getCliClient} from 'sanity/cli'

const client = getCliClient({useCdn: false})

async function run() {
  const photos = await client.fetch<Array<{_id: string; title: string; collections: string[]}>>(
    `*[_type == "photo" && defined(collections) && length(collections) > 0]{
      _id, title, "collections": collections[]._ref
    }`,
  )

  const collections = await client.fetch<Array<{_id: string; title: string}>>(
    `*[_type == "collection"]{ _id, title }`,
  )

  console.log(`\nCollections (${collections.length}):`)
  for (const c of collections) console.log(`  ${c._id}  "${c.title}"`)

  console.log(`\nPhotos with collection membership (${photos.length}):`)
  for (const p of photos) console.log(`  ${p._id}  "${p.title}"  → [${p.collections.join(', ')}]`)
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
