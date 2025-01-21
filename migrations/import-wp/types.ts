import type {
    WP_REST_API_Categories,
    WP_REST_API_Pages,
    WP_REST_API_Posts,
    WP_REST_API_Tags,
    WP_REST_API_Users,
  } from 'wp-types'
  
  export type WordPressDataType = 
    | 'categories' 
    | 'posts' 
    | 'pages' 
    | 'tags' 
    | 'users'
    | 'datasheets'
    | 'ebooks'
    | 'infographics'
    | 'tutorials'
    | 'videos'
    | 'webinars'
    | 'white-papers'
    | 'case-study'
    | 'connector'
    | 'news'
  
  export type WordPressDataTypeResponses = {
    categories: WP_REST_API_Categories
    posts: WP_REST_API_Posts
    pages: WP_REST_API_Pages
    tags: WP_REST_API_Tags
    users: WP_REST_API_Users
    datasheets: WP_REST_API_Posts
    ebooks: WP_REST_API_Posts
    infographics: WP_REST_API_Posts
    tutorials: WP_REST_API_Posts
    videos: WP_REST_API_Posts
    webinars: WP_REST_API_Posts
    whitepapers: WP_REST_API_Posts
    'case-study': WP_REST_API_Posts
    connector: WP_REST_API_Posts
    news: WP_REST_API_Posts
  }
  
  export type SanitySchemaType = 'category' | 'post' | 'page' | 'tag' | 'resource' | 'connector' | 'teamMember' | 'customer'