import type {Resource} from '../../../sanity.types'

export function sanityIdToImageReference(id: string): Resource['featuredImage'] {
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: id},
  }
}