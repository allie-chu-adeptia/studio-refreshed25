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
        // console.log(`Found Adeptia URL: ${url} -> extracted slug: ${slug}`)
        return slug
    }

    try {
        const urlObj = new URL(url)
        if (urlObj.hostname === 'www.adeptia.com' || urlObj.hostname === 'adeptia.com') {
            // Get the last segment of the path
            const slug = urlObj.pathname.split('/').filter(Boolean).pop() || ''
            // console.log(`Found Adeptia URL: ${url} -> extracted slug: ${slug}`)
            return slug
        }
        // console.log(`External URL found (not Adeptia): ${url}`)
        return null
    } catch (e) {
        // console.error('Invalid URL:', url, e)
        return null
    }
}

// Fetch all pages to build a slug lookup map
const fetchPages = async () => {
    // console.log('Fetching all pages to build slug lookup map...')
    const pages = await client.fetch(`
    *[_type in ["page", "resource", "connector", "customer"]] {
      _id,
      "slug": metadata.slug.current
    }
  `)
    // console.log(`Found ${pages.length} total pages`)
    const slugMap = pages.reduce((acc, page) => {
        if (page.slug) {
            acc[page.slug] = page._id
        }
        return acc
    }, {})
    // console.log(`Built slug map with ${Object.keys(slugMap).length} entries`)
    return slugMap
}

// Process Portable Text blocks recursively
const processPortableText = (block, slugMap) => {
    if (block._type === 'block' && block.markDefs) {
        block.markDefs = block.markDefs.map(markDef => {
            if (markDef._type === 'link' && markDef.href) {
                const slug = getSlugFromUrl(markDef.href)

                if (slug && slugMap[slug]) {
                    // console.log(`Converting URL to internal reference: ${markDef.href} -> ${slugMap[slug]}`)
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
                    // console.log(`Keeping external link: ${markDef.href}`)
                    // Keep as external link
                    return {
                        _key: markDef._key,
                        _type: 'link',
                        href: markDef.href,
                        blank: true
                    }
                } else {
                    // Manual mapping for specific slugs that need custom handling
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
                            console.log(`Manual mapping: ${slug} -> ${mappedSlug} (${slugMap[mappedSlug]})`)
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
                        console.log(`No mapping found for slug: ${slug}, Mapping to home page`)
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
                // If slug exists but no matching page, keep original link
                return markDef
            }
            return markDef
        })
    }
    return block
}

// Fetch all resources with body content
const fetchDocuments = async () => {
    // console.log('Fetching documents to process...')
    const docs = await client.fetch(`*[_type == "resource" && type == "Blog" && defined(body)] | order(publishDate desc)[701...900] {
    _id,
    _rev,
    body
  }`)
    // console.log(`Found ${docs.length} documents to process`)
    return docs
}

const buildPatches = (docs, slugMap) => {
    // console.log('Building patches for documents...')
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
    // console.log(`Built ${patches.length} patches`)
    return patches
}

const createTransaction = patches => {
    // console.log('Creating transaction...')
    return patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())
}

const commitTransaction = async tx => {
    // console.log('Committing transaction...')
    const result = await tx.commit()
    // console.log('Transaction committed successfully')
    return result
}

const migrateNextBatch = async () => {
    try {
        const documents = await fetchDocuments()
        const slugMap = await fetchPages()

        const patches = buildPatches(documents, slugMap)

        if (patches.length === 0) {
            // console.log('No more documents to migrate!')
            return null
        }

        // console.log(
        //     // `Migrating batch:\n %s`,
        //     patches.map(patch => `${patch.id}`).join('\n')
        // )

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