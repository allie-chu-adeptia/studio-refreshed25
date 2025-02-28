/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Table = {
  _type: 'table'
  columns?: Array<{
    header?: string
    cells?: Array<string>
    _key: string
  }>
}

export type ProductPricing = {
  _type: 'productPricing'
  name?: string
  button?: Button
  description?: string
  content?: Array<{
    header?: string
    subheader?: string
    icon?: {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
    }
    _key: string
  }>
}

export type PortableText = Array<
  | {
      children?: Array<{
        marks?: Array<string>
        text?: string
        _type: 'span'
        _key: string
      }>
      style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
      listItem?: 'bullet' | 'number'
      markDefs?: Array<
        | {
            reference?:
              | {
                  _ref: string
                  _type: 'reference'
                  _weak?: boolean
                  [internalGroqTypeReferenceTo]?: 'resource'
                }
              | {
                  _ref: string
                  _type: 'reference'
                  _weak?: boolean
                  [internalGroqTypeReferenceTo]?: 'page'
                }
              | {
                  _ref: string
                  _type: 'reference'
                  _weak?: boolean
                  [internalGroqTypeReferenceTo]?: 'connector'
                }
              | {
                  _ref: string
                  _type: 'reference'
                  _weak?: boolean
                  [internalGroqTypeReferenceTo]?: 'customer'
                }
            _type: 'internalLink'
            _key: string
          }
        | {
            href?: string
            blank?: boolean
            _type: 'link'
            _key: string
          }
      >
      level?: number
      _type: 'block'
      _key: string
    }
  | {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
      _key: string
    }
  | ({
      _key: string
    } & ExternalImage)
  | ({
      _key: string
    } & Table)
>

export type ExternalImage = {
  _type: 'externalImage'
  url?: string
}

export type Content = {
  _type: 'content'
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  header?: string
  subheader?: string
  button?: Button
}

export type Redirect = {
  _id: string
  _type: 'redirect'
  _createdAt: string
  _updatedAt: string
  _rev: string
  source?: string
  destination?: string
  permanent?: boolean
}

export type TextSection = {
  _type: 'textSection'
  header?: HeaderStyle
  text?: PortableText
}

export type Tag = {
  _id: string
  _type: 'tag'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
}

export type Post = {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  metadata?: Metadata
  date?: string
  modified?: string
  status?:
    | 'publish'
    | 'future'
    | 'draft'
    | 'pending'
    | 'private'
    | 'trash'
    | 'auto-draft'
    | 'inherit'
  content?: PortableText
  excerpt?: PortableText
  featuredMedia?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  featuredMediaAlt?: string
  featured?: boolean
  author?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'teamMember'
  }
  categories?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
}

export type Cta = {
  _id: string
  _type: 'cta'
  _createdAt: string
  _updatedAt: string
  _rev: string
  campaignTitle?: string
  header?: HeaderStyle
  buttonText?: string
  displayStyle?: 'primary' | 'secondary' | 'tertiary'
  pageReference?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'page'
  }
}

export type Company = {
  _id: string
  _type: 'company'
  _createdAt: string
  _updatedAt: string
  _rev: string
  companyName?: string
  body?: PortableText
  locations?: Array<{
    locationName?: string
    address?: string
    _key: string
  }>
  termsOfService?: PortableText
  privacyPolicy?: PortableText
  socials?: {
    linkedIn?: string
    twitter?: string
  }
}

export type Category = {
  _id: string
  _type: 'category'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
}

export type TestimonialSection = {
  _type: 'testimonialSection'
  testimonial?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'testimonial'
  }
  layout?: 'simpleCentered' | 'largeAvatar'
}

export type Testimonial = {
  _id: string
  _type: 'testimonial'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  title?: string
  picture?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  companyLogo?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  quote?: string
}

export type StatSection = {
  _type: 'statSection'
  header?: HeaderStyle
  background?: BackgroundStyle
  stats?: Array<{
    statName?: string
    leadingUnit?: string
    statValue?: number
    trailingUnit?: string
    _key: string
  }>
}

export type RelatedResource = {
  _type: 'relatedResource'
  type?: 'latest' | 'selected'
  resourceTypes?: Array<string>
  resource?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'resource'
  }>
}

export type RelatedConnector = {
  _type: 'relatedConnector'
  header?: HeaderStyle
  connector?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'connector'
  }>
}

export type Pricing = {
  _type: 'pricing'
  header?: HeaderStyle
  productPricing?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'productPricing'
  }>
}

export type LogoSection = {
  _type: 'logoSection'
  logo?: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
    _key: string
  }>
}

export type HeaderSection = {
  _type: 'headerSection'
  header?: HeaderStyle
  background?: BackgroundStyle
  cta?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'cta'
  }>
  content?: Array<{
    title?: string
    subhead?: string
    _key: string
  }>
}

export type Faq = {
  _type: 'faq'
  header?: HeaderStyle
  displayStyle?: 'accordion' | 'inline'
  content?: Array<{
    question?: string
    answer?: string
    _key: string
  }>
}

export type CtaSection = {
  _type: 'ctaSection'
  cta?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'cta'
  }>
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}

export type ContentSection = {
  _type: 'contentSection'
  header?: HeaderStyle
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  button?: Button
  styleAndLayout?: {
    layout?: 'left' | 'right' | 'center'
    background?: BackgroundStyle
  }
  subPoints?: Array<{
    icon?: IconPicker
    header?: string
    subheader?: string
    button?: Button
    _key: string
  }>
}

export type CaseStudy = {
  _type: 'caseStudy'
  customer?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'customer'
  }>
}

export type BentoSection = {
  _type: 'bentoSection'
  header?: HeaderStyle
  styleAndLayout?: {
    layout?: 'Large Horizontal' | 'Large Vertical' | 'Evenly Spaced'
    background?: BackgroundStyle
  }
  content?: Array<{
    image?: {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
    }
    eyebrow?: string
    header?: string
    text?: string
    link?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'page'
    }
    _key: string
  }>
}

export type Page = {
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  _rev: string
  metadata?: Metadata
  title?: string
  parent?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'page'
  }
  icon?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  category?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  block?: Array<
    | ({
        _key: string
      } & CaseStudy)
    | ({
        _key: string
      } & RelatedResource)
    | ({
        _key: string
      } & RelatedConnector)
    | ({
        _key: string
      } & Faq)
    | ({
        _key: string
      } & Pricing)
    | ({
        _key: string
      } & ContentSection)
    | ({
        _key: string
      } & CtaSection)
    | ({
        _key: string
      } & HeaderSection)
    | ({
        _key: string
      } & StatSection)
    | ({
        _key: string
      } & LogoSection)
    | ({
        _key: string
      } & BentoSection)
    | ({
        _key: string
      } & TextSection)
    | ({
        _key: string
      } & TestimonialSection)
  >
}

export type Resource = {
  _id: string
  _type: 'resource'
  _createdAt: string
  _updatedAt: string
  _rev: string
  metadata?: Metadata
  title?: string
  type?:
    | 'Datasheet'
    | 'White Paper'
    | 'eBook'
    | 'Infographic'
    | 'News'
    | 'Blog'
    | 'Video'
    | 'Tutorial'
  publishDate?: string
  status?: 'Published' | 'Draft' | 'Pending' | 'Private'
  featured?: boolean
  featuredImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  excerpt?: string
  category?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  body?: PortableText
  HSForm?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'hubspotForm'
  }
  downloadFile?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
    }
    _type: 'file'
  }
  video?: VideoEmbed
  author?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'teamMember'
  }
}

export type TeamMember = {
  _id: string
  _type: 'teamMember'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  title?: string
  profilePic?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  displayInManagement?: boolean
  body?: PortableText
  linkedIn?: string
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type VideoEmbed = {
  _type: 'videoEmbed'
  platform?: 'vimeo' | 'youtube'
  youtubeId?: string
  vimeoId?: string
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type HubspotForm = {
  _id: string
  _type: 'hubspotForm'
  _createdAt: string
  _updatedAt: string
  _rev: string
  description?: string
  formID?: string
  sfdcCampaignId?: string
}

export type Connector = {
  _id: string
  _type: 'connector'
  _createdAt: string
  _updatedAt: string
  _rev: string
  metadata?: Metadata
  name?: string
  logo?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  featured?: boolean
  subpage?: boolean
  categories?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  body?: PortableText
}

export type Customer = {
  _id: string
  _type: 'customer'
  _createdAt: string
  _updatedAt: string
  _rev: string
  metadata?: Metadata
  title?: string
  companyName?: string
  logo?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  featuredImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  hideIdentifiableInfo?: boolean
  size?: 'Small Business' | 'Mid Market' | 'Enterprise'
  industry?: string
  description?: string
  connector?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'connector'
  }>
  category?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'category'
  }>
  testimonial?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'testimonial'
  }>
  hasCaseStudy?: boolean
  challenge?: PortableText
  solution?: PortableText
  body?: PortableText
}

export type Button = {
  _type: 'button'
  title?: string
  url?: string
  link?:
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'page'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'resource'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'customer'
      }
}

export type Metadata = {
  _type: 'metadata'
  seoTitle?: string
  description?: string
  focusKeyprase?: string
  slug?: Slug
  advanced?: {
    breadcrumbsTitle?: string
    canonicalUrl?: string
    allowSearchResults?: boolean
    followLinks?: boolean
  }
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type BackgroundStyle = {
  _type: 'backgroundStyle'
  style?: 'light' | 'medium' | 'dark' | 'dark-accent' | 'light-accent'
}

export type HeaderStyle = {
  _type: 'headerStyle'
  eyebrow?: string
  header?: string
  subheader?: string
  layout?: 'centered' | 'left-aligned' | 'right-aligned'
  anchorID?: string
}

export type IconPicker = {
  _type: 'iconPicker'
  provider?: string
  name?: string
  svg?: string
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | Geopoint
  | Table
  | ProductPricing
  | PortableText
  | ExternalImage
  | Content
  | Redirect
  | TextSection
  | Tag
  | Post
  | Cta
  | Company
  | Category
  | TestimonialSection
  | Testimonial
  | StatSection
  | RelatedResource
  | RelatedConnector
  | Pricing
  | LogoSection
  | HeaderSection
  | Faq
  | CtaSection
  | ContentSection
  | CaseStudy
  | BentoSection
  | Page
  | Resource
  | TeamMember
  | Slug
  | VideoEmbed
  | SanityFileAsset
  | HubspotForm
  | Connector
  | Customer
  | Button
  | Metadata
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | BackgroundStyle
  | HeaderStyle
  | IconPicker
export declare const internalGroqTypeReferenceTo: unique symbol
