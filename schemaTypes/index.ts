import {authorType} from './documents/authorType'
import {categoryType} from './singletons/categoryType'
import {externalImageType} from './singletons/externalImageType'
import {pageType} from './documents/pageType'
import {postType} from './documents/postType'
import {tagType} from './singletons/tagType'
import {portableTextType} from './singletons/portableTextType'

export const schemaTypes = [
  authorType,
  categoryType,
  pageType,
  postType,
  tagType,
  externalImageType,
  portableTextType
]