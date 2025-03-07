import fs from 'fs'
import path from 'path'
import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import type {PortableTextBlock, SanityClient} from 'sanity'
import type {WP_REST_API_Post} from 'wp-types'

import type {Resource} from '../../../sanity.types'
import {htmlToBlockContent} from './htmlToBlockContent'
import {sanityIdToImageReference} from './sanityIdToImageReference'
import {sanityUploadFromUrl} from './sanityUploadFromUrl'
import {wpImageFetch} from './wpImageFetch'
import { WordPressDataType } from '../types'

// Datasheet, White Paper, News, Blog, Video, and Tutorial Import

// Add memory usage logging
function logMemoryUsage() {
    const used = process.memoryUsage()
    writeToLog(`Memory usage:
      RSS: ${Math.round(used.rss / 1024 / 1024)}MB
      Heap Total: ${Math.round(used.heapTotal / 1024 / 1024)}MB
      Heap Used: ${Math.round(used.heapUsed / 1024 / 1024)}MB
      External: ${Math.round(used.external / 1024 / 1024)}MB`)
}

type StagedResource = Omit<Resource, '_createdAt' | '_updatedAt' | '_rev'>

interface YoastHeadJSON {
    title?: string;
    description?: string;
    primary_focus_keyword?: string;
    canonical?: string;
    robots?: {
        index?: string;
        follow?: string;
    };
}

type WP_REST_API_Post_Extended = WP_REST_API_Post & {
    yoast_head_json?: YoastHeadJSON;
}

// Create a logging utility
const logFile = path.join(process.cwd(), 'wp-migration-debug.log')

function writeToLog(message: string) {
  const timestamp = new Date().toISOString()
  const logMessage = `${timestamp}: ${message}\n`
  fs.appendFileSync(logFile, logMessage)
}

export async function transformToResource(
    wpDoc: WP_REST_API_Post_Extended,
    client: SanityClient,
    existingImages: Record<string, string> = {},
    wpType: WordPressDataType
): Promise<StagedResource> {
    try {
        logMemoryUsage()
        writeToLog(`\n=== Starting transformation for post ID: ${wpDoc.id} ===`)
        writeToLog(`Post type: ${wpType}`)
        writeToLog(`Post title: ${wpDoc.title?.rendered}`)
        writeToLog(`Raw WP document: ${JSON.stringify(wpDoc, null, 2)}`)
        
        const doc: StagedResource = {
            _id: `resource-${wpDoc.id || uuid()}`,
            _type: 'resource',
        }

        try {
            // Metadata
            doc.metadata = {
                _type: 'metadata',
                seoTitle: decode(wpDoc.yoast_head_json?.title || wpDoc.title?.rendered || ''),
                description: decode(wpDoc.yoast_head_json?.description || wpDoc.excerpt?.rendered || '').replace(/<[^>]*>/g, ''),
                focusKeyprase: wpDoc.yoast_head_json?.primary_focus_keyword || '',
                slug: {
                    _type: 'slug',
                    current: wpDoc.slug
                },
                advanced: {
                    canonicalUrl: '',
                    allowSearchResults: wpDoc.yoast_head_json?.robots?.index !== 'noindex',
                    followLinks: wpDoc.yoast_head_json?.robots?.follow !== 'nofollow'
                }
            }
        } catch (error) {
            writeToLog(`#Error# Error processing metadata for post ${wpDoc.id}: ${error}`)
        }

        try {
            // Title
            doc.title = decode(wpDoc.title?.rendered || 'Untitled').trim()
        } catch (error) {
            writeToLog(`#Error# Error processing title for post ${wpDoc.id}: ${error}`)
            doc.title = 'Untitled'
        }

        try {
            // Type
            // Map WordPress types to Sanity resource types
            const typeMap: Record<WordPressDataType, string> = {
                'datasheets': 'Datasheet',
                'white-papers': 'White Paper', 
                'ebooks': 'eBook',
                'news': 'News',
                'posts': 'Blog',
                'videos': 'Video',
                'tutorials': 'Tutorial',
                'categories': 'Category',
                'tags': 'Tag',
                'users': 'Team Member',
                'pages': 'Page',
                'connector': 'Connector',
                'case-study': 'Case Study',
                'infographics': 'Infographic',
                'webinars': 'Webinar'
            }

            doc.type = typeMap[wpType] as 'Datasheet' | 'White Paper' | 'eBook' | 'News' | 'Blog' | 'Video' | 'Tutorial'
        } catch (error) {
            writeToLog(`#Error# Error mapping type for post ${wpDoc.id}: ${error}`)
        }

        try {
            // Publish Date
            if (wpDoc.date) {
                doc.publishDate = wpDoc.date
            }
        } catch (error) {
            writeToLog(`#Error# Error processing publish date for post ${wpDoc.id}: ${error}`)
        }

        try {
            // Status
            if (wpDoc.status) {
                doc.status = 'Published'
            }
        } catch (error) {
            writeToLog(`#Error# Error processing status for post ${wpDoc.id}: ${error}`)
            doc.status = 'Draft'
        }

        try {
            // Featured Image
            if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
                if (existingImages[wpDoc.featured_media]) {
                    doc.featuredImage = sanityIdToImageReference(existingImages[wpDoc.featured_media])
                } else {
                    const metadata = await wpImageFetch(wpDoc.featured_media as number)

                    if (metadata?.source?.url) {
                        const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)

                        if (asset) {
                            doc.featuredImage = sanityIdToImageReference(asset._id)
                            existingImages[wpDoc.featured_media as number] = asset._id
                        }
                    }
                }
            } else {
                writeToLog(`[INFO] Post ${wpDoc.id} has no featured media`)
            }
        } catch (error) {
            writeToLog(`[ERROR] Error processing featured image for post ${wpDoc.id}: ${error}`)
        }

        try {
            // Excerpt
            doc.excerpt = wpDoc.excerpt?.rendered 
                ? decode(wpDoc.excerpt.rendered)
                    .replace(/<\/?p>/g, '')
                    .replace(/&#8217;/g, "'")
                    .trim()
                : ''
        } catch (error) {
            writeToLog(`#Error# Error processing excerpt for post ${wpDoc.id}: ${error}`)
            doc.excerpt = ''
        }

        try {
            // Category and Tag
            if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
                doc.category = wpDoc.categories.map((catId) => ({
                    _key: uuid(),
                    _type: 'reference',
                    _ref: `category-${catId}`,
                }))
            }
        } catch (error) {
            writeToLog(`#Error# Error processing categories/tags for post ${wpDoc.id}: ${error}`)
        }

        try {
            // Body
            if (wpDoc.content?.rendered) {
                doc.body = await htmlToBlockContent(wpDoc.content.rendered, client, existingImages)
            }
        } catch (error) {
            writeToLog(`#Error# Error processing body content for post ${wpDoc.id}: ${error}`)
            doc.body = []
        }

        try {
            // Resource Specific Fields: hubspot form, downloadable file, video, team member
            if (wpType === 'posts' && wpDoc.author) {
                doc.author = {
                    _type: 'reference',
                    _ref: `teamMember-${wpDoc.author}`
                }
            }
        } catch (error) {
            writeToLog(`#Error# Error processing author for post ${wpDoc.id}: ${error}`)
        }

        writeToLog(`Transformed document: ${JSON.stringify(doc, null, 2)}`)
        writeToLog(`=== Completed transformation for post ID: ${wpDoc.id} ===\n`)
        return doc
        
    } catch (error) {
        writeToLog(`[ERROR] Fatal error processing post ${wpDoc.id}: ${error}`)
        logMemoryUsage()
        writeToLog(`[ERROR] Stack trace: ${error instanceof Error ? error.stack : 'No stack trace'}`)
        throw error
    } finally {
        logMemoryUsage() // Log memory after each transformation
    }
}