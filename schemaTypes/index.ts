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
import {testimonialSectionType} from './blocks/testimonialBlock'
import {contentSectionCarouselType} from './blocks/contentSectionCarouselBlock'
import {careerType} from './blocks/careersBlock'
import {teamMemberSectionType} from './blocks/teamMemberBlock'

// Document Types
import {categoryType} from './documents/categoryDoc'
import {companyType} from './documents/companyDoc'
import {connectorType} from './documents/connectorDoc'
import {ctaType} from './documents/ctaDoc'
import {customerType} from './documents/customerDoc'
import {pageType} from './documents/pageDoc'
import {resourceType} from './documents/resourceDoc'
import {teamMemberType} from './documents/teamMemberDoc'
import {textSectionType} from './blocks/textSection'
import {testimonialType} from './documents/testimonialDoc'


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
import {redirectType} from './documents/redirectDoc'

export const schemaTypes = [
  // Block types
  careerType,
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
  testimonialSectionType,
  contentSectionCarouselType,
  teamMemberSectionType,
  
  // Document Types
  // careerType,
  categoryType,
  companyType,
  connectorType,
  ctaType,
  customerType,
  pageType,
  resourceType,
  teamMemberType,
  textSectionType,
  testimonialType,
  redirectType,

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
