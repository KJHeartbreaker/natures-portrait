import {getCliClient} from 'sanity/cli'
async function run() {
  const client = getCliClient({apiVersion: '2024-01-01'})
  await client.patch('98Rza5kdLYl7rLJRZUlo3A').set({title: 'Abstract Wave 5'}).commit()
  console.log('Renamed to Abstract Wave 5')
}
run().catch((e) => { console.error(e); process.exit(1) })
