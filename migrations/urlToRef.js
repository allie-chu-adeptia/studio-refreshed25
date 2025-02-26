import client from 'part-config/sanity-client'

// Helper function to extract slug from URL
const getSlugFromUrl = (url) => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'www.adeptia.com' || urlObj.hostname === 'adeptia.com') {
      // Remove leading and trailing slashes and return path
      return urlObj.pathname.replace(/^\/|\/$/g, '')
    }
    return null
  } catch (e) {
    console.error('Invalid URL:', url)
    return null
  }
}

// Fetch all pages to build a slug lookup map
const fetchPages = async () => {
  const pages = await client.fetch(`
    *[_type in ["page", "resource", "connector", "customer"]] {
      _id,
      "slug": metadata.slug.current
    }
  `)
  return pages.reduce((acc, page) => {
    if (page.slug) {
      acc[page.slug] = page._id
    }
    return acc
  }, {})
}

// Process Portable Text blocks recursively
const processPortableText = (block, slugMap) => {
  if (block._type === 'block' && block.markDefs) {
    block.markDefs = block.markDefs.map(markDef => {
      if (markDef._type === 'link' && markDef.href) {
        const slug = getSlugFromUrl(markDef.href)
        
        if (slug && slugMap[slug]) {
          // Convert to internal link
          return {
            _key: markDef._key,
            _type: 'internalLink',
            reference: {
              _type: 'reference',
              _ref: slugMap[slug]
            }
          }
        } else if (!slug) {
          // Keep as external link
          return {
            _key: markDef._key,
            _type: 'link',
            href: markDef.href,
            blank: true
          }
        }
        // If slug exists but no matching page, keep original link
        return markDef
      }
      return markDef
    })
  }
  return block
}

// Fetch all resources with body content
const fetchDocuments = () =>
  client.fetch(`*[_type == "resource" && defined(body)] {
    _id,
    _rev,
    body
  }`)

const buildPatches = (docs, slugMap) =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: {
        body: doc.body.map(block => processPortableText(block, slugMap))
      },
      // This will only patch if the document hasn't been modified since we fetched it
      ifRevisionID: doc._rev
    }
  }))

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const slugMap = await fetchPages()
  
  const patches = buildPatches(documents, slugMap)
  
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id}`).join('\n')
  )
  
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
}

// Run migration
migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})