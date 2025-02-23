import type { SanityDocumentLike } from 'sanity'
import { createOrReplace, defineMigration } from 'sanity/migrate'
import pLimit from 'p-limit'
import { sanityFetchImages } from './lib/sanityFetchImages'
import { createClient } from '@sanity/client'

import { sanityUploadFromUrl } from './lib/sanityUploadFromUrl'

import { wpDataTypeFetch } from './lib/wpDataTypeFetch'
import { WP_REST_API_Post } from 'wp-types'
import { transformToBlog } from './lib/transformToBlog'

const limit = pLimit(5)

// This will import `post` documents into Sanity from the WordPress API
export default defineMigration({
  title: 'Import WP',

  async *migrate(docs, context) {
    const client = createClient(context.client.config())
    const existingImages = await sanityFetchImages(client)


    const wpType = 'posts'
    let page = 1
    let hasMore = true

    while (hasMore) {
      try {
        const wpData = await wpDataTypeFetch(wpType, page)

        if (Array.isArray(wpData) && wpData.length) {
          const docs = wpData.map((wpDoc) =>
            limit(async () => {
              wpDoc = wpDoc as WP_REST_API_Post
              const doc = await transformToBlog(wpDoc, client, existingImages)
              return doc
            })
          )
          const resolvedDocs = await Promise.all(docs)
          const validDocs = resolvedDocs.filter(Boolean)
          yield validDocs.map((doc) => createOrReplace(doc))
        
          page++

        } else {
          hasMore = false
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error)
        // Stop the loop in case of an error
        hasMore = false
      }
    }
  },
})