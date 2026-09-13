import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function run() {
  const doc = await client.create({
    _type: 'photo',
    image: {
      _type: 'albumMainImage',
      asset: {
        _type: 'reference',
        _ref: 'image-8a08ccbc961a6a8af594ff70f8249df4a46a84da-1600x1067-jpg',
      },
    },
    title: 'Abstract Wave 4',
    location: 'Kananaskis Country, Alberta',
  })

  console.log(`Created photo document: ${doc._id}`)
  console.log(`Title: ${doc.title}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
