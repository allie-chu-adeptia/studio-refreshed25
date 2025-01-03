import {decode} from 'html-entities'
import type {SanityClient} from 'sanity'
import type {WP_REST_API_Term, WP_REST_API_User} from 'wp-types'

import type {Category, Tag, Author} from '../../../sanity.types'

// Remove these keys because they'll be created by Content Lake
type StagedCategory = Omit<Category, '_createdAt' | '_updatedAt' | '_rev'>
type StagedTag = Omit<Tag, '_createdAt' | '_updatedAt' | '_rev'>
type StagedAuthor = Omit<Author, '_createdAt' | '_updatedAt' | '_rev'>
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


export async function transformToAuthor(
    wpDoc: WP_REST_API_User,
    client: SanityClient,
    existingImages: Record<string, string> = {},
): Promise<StagedAuthor> {
    const doc: StagedAuthor = {
      _id: `author-${wpDoc.id}`,
      _type: 'author',
    }

    doc.name = decode(wpDoc.name).trim()

    if (wpDoc.slug) {
        doc.slug = {_type: 'slug', current: wpDoc.slug}
    }

    return doc
}