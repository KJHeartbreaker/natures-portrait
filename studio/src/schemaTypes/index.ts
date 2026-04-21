// Singletons
import {blogLandingPage} from './singletons/blog'
import {home} from './singletons/home'
import {settings} from './singletons/settings'

// Documents
import {gear} from './documents/gear'
import {photo} from './documents/photo'
import {page} from './documents/page'
import {post} from './documents/post'

// Objects - Grids
import {postsGridContainer} from './objects/grids/postsGrid'
import {photoGridContainer} from './objects/grids/photoGrid'

// Objects - Helpers
import {seo} from './objects/helpers/seo'

// Objects - Navigation Components
import {navCTA} from './objects/navigationComponents/navCTA'
import {navDropdownCTA} from './objects/navigationComponents/navDropdownCTA'

// Objects - Page Elements
import {carousel} from './objects/pageElements/carousel'
import {cta} from './objects/pageElements/cta'
import {heroBanner} from './objects/pageElements/heroBanner'
import {heroTwoPanel} from './objects/pageElements/heroTwoPanel'
import {icon} from './objects/pageElements/icon'
import {albumMainImage} from './objects/pageElements/albumMainImage'
import {mainImage} from './objects/pageElements/mainImage'
import {photoItem} from './objects/pageElements/photoItem'

// Objects - Portable Text
import {mainPortableText} from './objects/portableText/mainPortableText'
import {simplePortableText} from './objects/portableText/simplePortableText'

// Objects - Custom Components
import {contactInfo} from './objects/customComponents/contactInfo'

// Objects - Rows
import {rowContainer} from './objects/rows/rowContainer'
import {singleColumnContentBlock} from './objects/rows/singleColumnContentBlock'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  blogLandingPage,
  home,
  // Documents
  page,
  post,
  gear,
  photo,
  // Objects - Grids
  postsGridContainer,
  photoGridContainer,
  // Objects - Helpers
  seo,
  // Objects - Navigation Components
  navCTA,
  navDropdownCTA,
  // Objects - Page Elements
  carousel,
  cta,
  heroBanner,
  heroTwoPanel,
  icon,
  mainImage,
  albumMainImage,
  photoItem,
  // Objects - Portable Text
  mainPortableText,
  simplePortableText,
  // Objects - Custom Components
  contactInfo,
  // Objects - Rows
  rowContainer,
  singleColumnContentBlock,
]
