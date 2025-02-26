// Migration script to convert publishDate strings to dates
import client from 'part-config/sanity-client'

// Fetch all resources with string publishDates
const fetchDocuments = () =>
  client.fetch(
    `*[_type == "resource" && defined(publishDate) && string(publishDate) match "*"]`
  )

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      insert: { 
        replace: { publishDate: new Date(doc.publishDate) }
      },
      // Alternatively, if you want ISO format:
      // set: { publishDate: doc.publishDate + 'T00:00:00Z' },
      ifRevisionID: doc._rev
    }
  }))

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})