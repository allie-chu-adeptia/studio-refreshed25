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

export async function transformToResource(
    wpDoc: WP_REST_API_Post_Extended,
    client: SanityClient,
    existingImages: Record<string, string> = {},
    wpType: WordPressDataType
): Promise<StagedResource> {
    const doc: StagedResource = {
        _id: `resource-${wpDoc.id}`,
        _type: 'resource',
    }

    // Metadata
    doc.metadata = {
        _type: 'metadata',
        seoTitle: decode(wpDoc.yoast_head_json?.title || wpDoc.title.rendered || ''),
        description: decode(wpDoc.yoast_head_json?.description || wpDoc.excerpt.rendered || '').replace(/<[^>]*>/g, ''),
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

    // Title
    doc.title = decode(wpDoc.title.rendered).trim()

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

    // Publish Date
    if (wpDoc.date) {
        doc.publishDate = wpDoc.date   
    }

    // Status
    if (wpDoc.status) {
        doc.status = 'Published'
    }

    // Featured Image
    if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
        console.log('Processing featured media:', wpDoc.featured_media);
        // Image exists already in dataset
        if (existingImages[wpDoc.featured_media]) {
            console.log('Using existing image:', existingImages[wpDoc.featured_media]);
            doc.featuredImage = sanityIdToImageReference(existingImages[wpDoc.featured_media])
        } else {
            // Retrieve image details from WordPress
            console.log('Fetching new image from WordPress');
            const metadata = await wpImageFetch(wpDoc.featured_media as number)
            console.log('Received metadata:', metadata);

            if (metadata?.source?.url) {
                console.log('Uploading image from URL:', metadata.source.url);
                // Upload to Sanity
                const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)
                console.log('Upload result:', asset?._id);

                if (asset) {
                    doc.featuredImage = sanityIdToImageReference(asset._id)
                    existingImages[wpDoc.featured_media as number] = asset._id
                }
            }
        }
    } else {
        console.log('No featured media found or invalid:', wpDoc.featured_media);
    }

    // Excerpt
    doc.excerpt = wpDoc.excerpt?.rendered 
        ? decode(wpDoc.excerpt.rendered)
            .replace(/<\/?p>/g, '')
            .replace(/&#8217;/g, "'")
            .trim()
        : ''

    // Category and Tag
    if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
        doc.category = wpDoc.categories.map((catId) => ({
            _key: uuid(),
            _type: 'reference',
            _ref: `category-${catId}`,
        }))
    }

    if (Array.isArray(wpDoc.tags) && wpDoc.tags.length) {
        doc.tag = wpDoc.tags.map((tagId) => ({
            _key: uuid(),
            _type: 'reference',
            _ref: `tag-${tagId}`,
        }))
    }

    // Body
    if (wpDoc.content) {
        doc.body = await htmlToBlockContent(wpDoc.content.rendered, client, existingImages)
    }

    // Resource Specific Fields: hubspot form, downloadable file, video, team member
    if (wpType === 'posts') {
        doc.author = {
            _type: 'reference',
            _ref: `teamMember-${wpDoc.author}`
        }
    }


    return doc
}