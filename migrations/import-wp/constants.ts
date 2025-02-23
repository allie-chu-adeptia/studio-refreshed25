import type {SanitySchemaType, WordPressDataType} from './types'

export const BASE_URL = `https://adeptia.com/wp-json/wp/v2`
export const PER_PAGE = 100

export const WP_TYPE_TO_SANITY_SCHEMA_TYPE: Record<WordPressDataType, SanitySchemaType> = {
    categories: 'category',
    posts: 'post',
    pages: 'page',
    tags: 'tag',
    users: 'teamMember',
    datasheets: 'resource',
    ebooks: 'resource',
    infographics: 'resource',
    tutorials: 'resource',
    videos: 'resource',
    webinars: 'resource',
    'white-papers': 'resource',
    'case-study': 'customer',
    connector: 'connector',
    news: 'resource',
    // media: 'sanity.imageAsset',
  }
  