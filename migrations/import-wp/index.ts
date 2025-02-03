import {createClient} from '@sanity/client'
import pLimit from 'p-limit'
import {createOrReplace, defineMigration} from 'sanity/migrate'
import type {WP_REST_API_Post, WP_REST_API_Term, WP_REST_API_User, WP_REST_API_Page} from 'wp-types'

import {getDataTypes} from './lib/getDataTypes'
import {sanityFetchImages} from './lib/sanityFetchImages'
import {transformToCat, transformtoConnector, transformToTag, transformToTeamMember} from './lib/transformtoBasic'
import {wpDataTypeFetch} from './lib/wpDataTypeFetch'
import {transformToResource} from './lib/transformtoResource'
import {transformToPost} from './lib/transformToPost'
import {transformToMetadata} from './lib/transformToMetadata'
const limit = pLimit(5)
import {checkpointManager} from './lib/checkpoint'

// Add image imports, parallelized and limited
export default defineMigration({
  title: 'Import WP JSON data',

  async *migrate(docs, context) {
    
    // Create a full client to handle image uploads
    const client = createClient(context.client.config())

    // Create an in-memory image cache to avoid re-uploading images
    const existingImages = await sanityFetchImages(client)

    const {wpType} = getDataTypes(process.argv)
    
    let page = 1
    let hasMore = true

    while (hasMore) {
      try {
        let wpData = await wpDataTypeFetch(wpType, page)

        if (Array.isArray(wpData) && wpData.length) {
          // Create an array of concurrency-limited promises to stage documents
          const docs = wpData.map((wpDoc) =>
            limit(async () => {
              // if (wpType === 'posts') {
              //   wpDoc = wpDoc as WP_REST_API_Post
              //   const doc = await transformToPost(wpDoc, client, existingImages)
              //   return doc
              // } else 
              if (wpType === 'pages') {
                wpDoc = wpDoc as WP_REST_API_Page
                const doc = await transformToMetadata(wpDoc, client)
                return doc
              } else if (wpType === 'categories') {
                wpDoc = wpDoc as WP_REST_API_Term
                const doc = await transformToCat(wpDoc, client, existingImages)
                return doc
              } else if (wpType === 'tags') {
                wpDoc = wpDoc as WP_REST_API_Term
                const doc = await transformToTag(wpDoc, client, existingImages)
                return doc
              } else if (wpType === 'users') {
                wpDoc = wpDoc as WP_REST_API_User
                const doc = await transformToTeamMember(wpDoc, client, existingImages)
                return doc
              } else if (wpType === 'datasheets' 
                || wpType === 'ebooks' 
                || wpType === 'infographics'
                || wpType === 'posts'
                || wpType === 'news' 
                || wpType === 'tutorials' 
                || wpType === 'videos' 
                || wpType === 'webinars' 
                || wpType === 'white-papers') {
                wpDoc = wpDoc as WP_REST_API_Post
                const doc = await transformToResource(wpDoc, client, existingImages, wpType)
                return doc
              } else if (wpType === 'case-study') {
                wpDoc = wpDoc as WP_REST_API_Post
                // TODO
              } else if (wpType === 'connector') {
                wpDoc = wpDoc as WP_REST_API_Post
                const doc = await transformtoConnector(wpDoc, client, existingImages)
                return doc
              }
              
              hasMore = false
              throw new Error(`Unhandled WordPress type: ${wpType}`)
            }),
          )

          // Resolve all documents concurrently, throttled by p-limit
          const resolvedDocs = await Promise.all(docs)

          yield resolvedDocs.map((doc) => createOrReplace(doc))
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