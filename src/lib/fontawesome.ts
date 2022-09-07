import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  faTwitter,
  faGithub,
  faDiscord,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faSearch,
  faCalendarDay,
  faCaretDown as faSolidCaretDown,
  faHouse,
  faFile,
  faBlog,
  faSquareRss,
  faListCheck,
  faPaperPlane,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import {
  faLightbulb,
  faMoon,
  faSun,
  faClipboard,
} from '@fortawesome/free-regular-svg-icons'

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css'
// Prevent Font Awesome from adding its CSS since we did it manually above:
config.autoAddCss = false

// Import @fortawesome/free-brands-svg-icons
library.add(faTwitter, faGithub, faDiscord, faSpotify)

// Import @fortawesome/free-solid-svg-icons
library.add(
  faEnvelope,
  faSearch,
  faCalendarDay,
  faListCheck,
  faSolidCaretDown,
  faHouse,
  faFile,
  faSquareRss,
  faPaperPlane,
  faCheckSquare,
)

// Import @fortawesome/free-regular-svg-icons
library.add(faClock)

// Import @fortawesome/pro-regular-svg-icons
library.add(faLightbulb, faMoon, faClipboard)

// Import @fortawesome/pro-duotone-svg-icons
library.add(faSun)
