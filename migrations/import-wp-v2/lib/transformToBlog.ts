import { decode } from 'html-entities'
import type { WP_REST_API_Post } from 'wp-types'
import { uuid } from '@sanity/uuid'
import type { Resource } from '../../../sanity.types'
import { htmlToBlockContent } from '../../../migrations/import-wp/lib/htmlToBlockContent'
import type { SanityClient } from 'sanity'
import { sanityIdToImageReference } from './sanityIdToImageReference'
import { sanityUploadFromUrl } from './sanityUploadFromUrl'
import { wpImageFetch } from './wpImageFetch'



// Remove these keys because they'll be created by Content Lake
type StagedResource = Omit<Resource, '_createdAt' | '_updatedAt' | '_rev'>

// Metadata header
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


export async function transformToBlog(
    wpDoc: WP_REST_API_Post_Extended,
    client: SanityClient,
    existingImages: Record<string, string> = {},

): Promise<StagedResource> {
    const doc: StagedResource = {
        _id: `resource-${wpDoc.id}`,
        _type: 'resource',
        type: 'Blog'
    }

    doc.title = decode(wpDoc.title.rendered || 'Untitled').trim()

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

    // if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
    //     doc.category = wpDoc.categories.map((catId) => ({
    //         _key: uuid(),
    //         _type: 'reference',
    //         _ref: `category-${catId}`,
    //     }))
    // }

    if (wpDoc.date) {
        doc.publishDate = wpDoc.date
    }

    doc.status = 'Published'

    if (wpDoc.excerpt?.rendered) {
        doc.excerpt = decode(wpDoc.excerpt.rendered)
            .replace(/<\/?p>/g, '')
            .replace(/&#8217;/g, "'")
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
    }

    if (wpDoc.content?.rendered) {
        doc.body = await htmlToBlockContent(wpDoc.content.rendered, client, existingImages)
    }

    if (wpDoc.author) {
        if (wpDoc.author == 44) {
            doc.author = {
                _type: 'reference',
                _ref: '29712fe2-1d04-47c9-a6f6-e4ce8b6e02a1'
            }
        } else if (wpDoc.author == 35 || wpDoc.author == 36 || wpDoc.author == 22) {
            doc.author = {
                _type: 'reference',
                _ref: 'teamMember-32'
            }
        } else {
            doc.author = {
                _type: 'reference',
                _ref: `teamMember-${wpDoc.author}`,
            }
        }
    } else {
        doc.author = {
            _type: 'reference',
            _ref: `teamMember-${wpDoc.author}`,
        }
    }

    if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
        // Image exists already in dataset
        if (existingImages[wpDoc.featured_media]) {
            doc.featuredImage = sanityIdToImageReference(existingImages[wpDoc.featured_media])
        } else {
            // Retrieve image details from WordPress
            const metadata = await wpImageFetch(wpDoc.featured_media)

            if (metadata?.source?.url) {
                console.log('Metadata URL found')
                // Upload to Sanity
                const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)

                if (asset) {
                    doc.featuredImage = sanityIdToImageReference(asset._id)
                    existingImages[wpDoc.featured_media] = asset._id
                }
            }
        }
    }


    return doc
}