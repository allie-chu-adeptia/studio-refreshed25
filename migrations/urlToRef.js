import { createClient } from '@sanity/client'

const client = createClient({
    projectId: '5ujtwa6a',
    dataset: 'production',
    apiVersion: '2024-02-27',
    useCdn: false,
    token: process.env.SANITY_API_EDIT_TOKEN
})

// Helper function to extract slug from URL
const getSlugFromUrl = (url) => {
    // First check if it's just a path starting with /
    if (url.startsWith('/')) {
        const slug = url.split('/').filter(Boolean).pop() || ''
        return slug
    }

    try {
        const urlObj = new URL(url)
        if (urlObj.hostname === 'www.adeptia.com' || urlObj.hostname === 'adeptia.com') {
            // Get the last segment of the path
            const slug = urlObj.pathname.split('/').filter(Boolean).pop() || ''
            return slug
        }
        return null
    } catch (e) {
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
    const slugMap = pages.reduce((acc, page) => {
        if (page.slug) {
            acc[page.slug] = page._id
        }
        return acc
    }, {})
    return slugMap
}

// Process Portable Text blocks recursively
const processPortableText = (block, slugMap) => {
    if (block._type === 'block' && block.markDefs) {
        block.markDefs = block.markDefs.map(markDef => {
            if (markDef._type === 'link' && markDef.href) {
                const slug = getSlugFromUrl(markDef.href)

                if (slug && slugMap[slug]) {
                    return {
                        _key: markDef._key,
                        _type: 'internalLink',
                        reference: {
                            _type: 'reference',
                            _ref: slugMap[slug]
                        }
                    }
                } else if (!slug) {
                    return {
                        _key: markDef._key,
                        _type: 'link',
                        href: markDef.href,
                        blank: true
                    }
                } else {
                    const manualSlugMapping = {
                        'adeptia-connect-application-connectors': 'connectors',
                        'compare-adeptia-product-tiers': 'pricing',
                        'How-Adeptia-Connect-Works': '/',
                        'request-demo': 'adeptia-connect-demo',
                        'self-service-integration-empower-business-users': 'resources'
                    }

                    if (manualSlugMapping[slug]) {
                        const mappedSlug = manualSlugMapping[slug]
                        if (slugMap[mappedSlug]) {
                            return {
                                _key: markDef._key,
                                _type: 'internalLink',
                                reference: {
                                    _type: 'reference',
                                    _ref: slugMap[mappedSlug]
                                }
                            }
                        }
                    } else {
                        return {
                            _key: markDef._key,
                            _type: 'internalLink',
                            reference: {
                                _type: 'reference',
                                _ref: slugMap['/']
                            }
                        }
                    }
                }
                return markDef
            }
            return markDef
        })
    }
    return block
}

// Fetch all resources with body content
const fetchDocuments = async () => {
    const docs = await client.fetch(`*[_type == "resource" && type == "Blog" && defined(body)] | order(publishDate desc)[701...900] {
    _id,
    _rev,
    body
  }`)
    return docs
}

const buildPatches = (docs, slugMap) => {
    const patches = docs.map(doc => ({
        id: doc._id,
        patch: {
            set: {
                body: doc.body.map(block => processPortableText(block, slugMap))
            },
            // This will only patch if the document hasn't been modified since we fetched it
            ifRevisionID: doc._rev
        }
    }))
    return patches
}

const createTransaction = patches => {
    return patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())
}

const commitTransaction = async tx => {
    const result = await tx.commit()
    return result
}

const migrateNextBatch = async () => {
    try {
        const documents = await fetchDocuments()
        const slugMap = await fetchPages()

        const patches = buildPatches(documents, slugMap)

        if (patches.length === 0) {
            return null
        }ß
        const transaction = createTransaction(patches)
        await commitTransaction(transaction)
    } catch (error) {
        console.error('Error during migration:', error)
        throw error
    }
}

// Run migration
migrateNextBatch().catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
})