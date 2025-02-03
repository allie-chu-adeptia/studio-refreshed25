import { WP_REST_API_Page } from "wp-types";
import { Page } from "../../../sanity.types";
import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import { SanityClient } from "@sanity/client";

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

type WP_REST_API_Page_Extended = WP_REST_API_Page & {
    yoast_head_json?: YoastHeadJSON;
}

type StagedPage = Omit<Page, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToMetadata(
    wpDoc: WP_REST_API_Page_Extended,
    client: SanityClient
): Promise<StagedPage> {

    const doc: StagedPage = {
        _id: `page-${wpDoc.id || uuid()}`,
        _type: 'page',
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

