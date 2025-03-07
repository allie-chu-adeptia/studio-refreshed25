import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import type {PortableTextBlock, SanityClient} from 'sanity'
import type {WP_REST_API_Post} from 'wp-types'

import type {Resource} from '../../../sanity.types'
import {htmlToBlockContent} from './htmlToBlockContent'
import {sanityIdToImageReference} from './sanityIdToImageReference'
import {sanityUploadFromUrl} from './sanityUploadFromUrl'
import {wpImageFetch} from './wpImageFetch'

// Remove these keys because they'll be created by Content Lake
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

export async function transformToPost(
    wpDoc: WP_REST_API_Post_Extended,
    client: SanityClient,
    existingImages: Record<string, string> = {},
): Promise<StagedResource | null> {
    try {
        if (!wpDoc || !wpDoc.id) {
            console.error('Invalid WordPress document')
            return null
        }

        const doc: StagedResource = {
            _id: `resource-${wpDoc.id}`,
            _type: 'resource',
            type: 'Blog'
        }

        doc.title = decode(wpDoc.title.rendered).trim()

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

        if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
            doc.category = wpDoc.categories.map((catId) => ({
                _key: uuid(),
                _type: 'reference',
                _ref: `category-${catId}`,
            }))
        }

        // if (Array.isArray(wpDoc.tags) && wpDoc.tags.length) {
        //     doc.tags = wpDoc.tags.map((tagId) => ({
        //         _key: uuid(),
        //         _type: 'reference',
        //         _ref: `tag-${tagId}`,
        //     }))
        // }

        if (wpDoc.author) {
            doc.author = {
                _type: 'reference',
                _ref: `author-${wpDoc.author}`,
            }
        }

        if (wpDoc.date) {
            doc.publishDate = wpDoc.date   
        }

        // if (wpDoc.modified) {
        //     doc.modified = wpDoc.modified
        // }

        // if (wpDoc.status) {
        //     doc.status = wpDoc.status as StagedPost['status']
        // }

        doc.featured = false

        if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
            try {
                // Image exists already in dataset
                if (existingImages[wpDoc.featured_media]) {
                    doc.featuredImage = sanityIdToImageReference(existingImages[wpDoc.featured_media])
                } else {
                    // Retrieve image details from WordPress
                    const metadata = await wpImageFetch(wpDoc.featured_media)
                    if (metadata?.source?.url) {
                        // Upload to Sanity
                        const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)
                        if (asset) {
                            doc.featuredImage = sanityIdToImageReference(asset._id)
                            existingImages[wpDoc.featured_media] = asset._id
                        }
                    }
                }
            } catch (error) {
                console.error(`Error processing featured image for post ${wpDoc.id}:`, error)
                // Continue without featured image rather than failing the whole transform
            }
        }

        if (wpDoc.content) {
            doc.body = await htmlToBlockContent(wpDoc.content.rendered, client, existingImages)
            doc.excerpt = wpDoc.excerpt?.rendered 
                ? decode(wpDoc.excerpt.rendered)
                    .replace(/<\/?p>/g, '')
                    .replace(/&#8217;/g, "'")
                    .trim()
                : ''
        }

        if (!doc.body) {
            console.warn(`Post ${wpDoc.id} has no content`)
        }

        return doc
    } catch (error) {
        console.error(`Error transforming post ${wpDoc.id}:`, error)
        console.error('WP document:', JSON.stringify(wpDoc, null, 2))
        return null
    }
}