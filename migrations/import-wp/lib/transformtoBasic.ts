import {decode} from 'html-entities'
import type {SanityClient} from 'sanity'
import type {WP_REST_API_Term, WP_REST_API_Post, WP_REST_API_User} from 'wp-types'

import type {Category, Tag, Connector, TeamMember} from '../../../sanity.types'
import { sanityIdToImageReference } from './sanityIdToImageReference'
import { wpImageFetch } from './wpImageFetch'
import { sanityUploadFromUrl } from './sanityUploadFromUrl'

// Remove these keys because they'll be created by Content Lake
type StagedCategory = Omit<Category, '_createdAt' | '_updatedAt' | '_rev'>
type StagedTag = Omit<Tag, '_createdAt' | '_updatedAt' | '_rev'>
type StagedConnector = Omit<Connector, '_createdAt' | '_updatedAt' | '_rev'>
type StagedTeamMember = Omit<TeamMember, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToCat(
    wpDoc: WP_REST_API_Term,
    client: SanityClient,
    existingImages: Record<string, string> = {},
): Promise<StagedCategory> {
    const doc: StagedCategory = {
      _id: `category-${wpDoc.id}`,
      _type: 'category',
    }

    doc.name = decode(wpDoc.name).trim()

    if (wpDoc.slug) {
        doc.slug = {_type: 'slug', current: wpDoc.slug}
    }

    return doc
}

export async function transformToTag(
    wpDoc: WP_REST_API_Term,
    client: SanityClient,
    existingImages: Record<string, string> = {},
): Promise<StagedTag> {
    const doc: StagedTag = {
      _id: `tag-${wpDoc.id}`,
      _type: 'tag',
    }

    doc.name = decode(wpDoc.name).trim()

    if (wpDoc.slug) {
        doc.slug = {_type: 'slug', current: wpDoc.slug}
    }

    return doc
}

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

export async function transformToConnector(
    wpDoc: WP_REST_API_Post_Extended,
    client: SanityClient,
    existingImages: Record<string, string> = {},
): Promise<StagedConnector> {
    const doc: StagedConnector = {
      _id: `connector-${wpDoc.id}`,
      _type: 'connector',
    }

    doc.name = decode(wpDoc.title.rendered).trim()
    
    doc.featured = false

    if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
        // Image exists already in dataset
        if (existingImages[wpDoc.featured_media]) {
            doc.logo = sanityIdToImageReference(existingImages[wpDoc.featured_media])
        } else {
            // Retrieve image details from WordPress
            const metadata = await wpImageFetch(wpDoc.featured_media as number)

            if (metadata?.source?.url) {
                // Upload to Sanity
                const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)

                if (asset) {
                    doc.logo = sanityIdToImageReference(asset._id)
                    existingImages[wpDoc.featured_media as number] = asset._id
                }
            }
        }
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
        console.error(`Error processing metadata for post ${wpDoc.id}: ${error}`)
    }

    return doc
}


export async function transformToTeamMember(
    wpDoc: WP_REST_API_User,
    client: SanityClient,
    existingImages: Record<string, string> = {},
): Promise<StagedTeamMember> {
    const doc: StagedTeamMember = {
      _id: `teamMember-${wpDoc.id}`,
      _type: 'teamMember',
    }

    doc.name = decode(wpDoc.name).trim()

    if (wpDoc.slug) {
        doc.slug = {_type: 'slug', current: wpDoc.slug}
    }

    doc.displayInManagement = false

    return doc
}