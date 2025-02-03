import {postType} from './documents/postType'

// Block types
import {bentoType} from './blocks/bentoBlock'
import {caseStudyType} from './blocks/caseStudyBlock'
import {contentSectionType} from './blocks/contentSectionBlock'
import {ctaSectionType} from './blocks/ctaBlock'
import {faqType} from './blocks/faqBlock'
import {headerType} from './blocks/headerBlock'
import {logoType} from './blocks/logoBlock'
import {pricingType} from './blocks/pricingBlock'
import {relatedConnectorType} from './blocks/relatedConnectorBlock'
import {relatedResourceType} from './blocks/relatedResourceBlock'
import {statsType} from './blocks/statsBlock'
import {testimonialType} from './blocks/testimonialBlock'

// Document Types
// import {careerType} from './documents/careerDoc'
import {categoryType} from './documents/categoryDoc'
import {companyType} from './documents/companyDoc'
import {connectorType} from './documents/connectorDoc'
import {ctaType} from './documents/ctaDoc'
import {customerType} from './documents/customerDoc'
import {pageType} from './documents/pageDoc'
import {resourceType} from './documents/resourceDoc'
import {tagType} from './documents/tagDoc'
import {teamMemberType} from './documents/teamMemberDoc'
import {textSectionType} from './blocks/textSection'


// Object Types
import {backgroundStyle} from './objects/backgroundObj'
import {buttonType} from './objects/buttonObj'
import {contentType} from './objects/contentObj'
import {externalImageType} from './objects/externalImageObj'
import {headerStyle} from './objects/headerObj'
import {hubspotFormType} from './objects/hubspotObj'
import {metadataType} from './objects/metadataObj'
import {portableTextType} from './objects/portableTextObj'
import {productPricingType} from './objects/productPricingObj'
import {videoEmbedType} from './objects/videoEmbedObj'
import {tableObj} from './objects/tableObj'

export const schemaTypes = [
  // Block types
  bentoType,
  caseStudyType,
  contentSectionType,
  ctaSectionType,
  faqType,
  headerType,
  logoType,
  pricingType,
  relatedConnectorType,
  relatedResourceType,
  statsType,
  testimonialType,

  // Document Types
  // careerType,
  categoryType,
  companyType,
  connectorType,
  ctaType,
  customerType,
  pageType,
  postType,
  resourceType,
  tagType,
  teamMemberType,
  textSectionType,

  // Object Types
  backgroundStyle,
  buttonType,
  contentType,
  externalImageType,
  headerStyle,
  hubspotFormType,
  metadataType,
  portableTextType,
  productPricingType,
  videoEmbedType,
  tableObj,
]
