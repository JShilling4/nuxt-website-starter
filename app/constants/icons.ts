import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBars,
  faBolt,
  faCheck,
  faChevronDown,
  faCircleCheck,
  faCircleChevronRight,
  faCommentDollar,
  faDroplet,
  faEnvelope,
  faFilter,
  faFlask,
  faFaucet,
  faGaugeHigh,
  faHammer,
  faHandshake,
  faHouse,
  faIndustry,
  faLayerGroup,
  faLink,
  faLocationDot,
  faMagnifyingGlass,
  faPhone,
  faRotate,
  faShieldHalved,
  faSliders,
  faSolarPanel,
  faStar,
  faTractor,
  faUsers,
  faWater,
  faWind,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import type { SocialMediaLink } from "~/constants/company";

/**
 * Semantic icon names used in templates. The map below is the only place that
 * ties these names to a specific icon set (Font Awesome today; swap here later).
 */
export const ICONS = {
  arrowRight: faArrowRight,
  bars: faBars,
  bolt: faBolt,
  check: faCheck,
  chevronDown: faChevronDown,
  circleCheck: faCircleCheck,
  circleChevronRight: faCircleChevronRight,
  commentDollar: faCommentDollar,
  droplet: faDroplet,
  envelope: faEnvelope,
  facebook: faFacebook,
  filter: faFilter,
  flask: faFlask,
  faucet: faFaucet,
  gaugeHigh: faGaugeHigh,
  hammer: faHammer,
  handshake: faHandshake,
  house: faHouse,
  industry: faIndustry,
  layerGroup: faLayerGroup,
  link: faLink,
  locationDot: faLocationDot,
  magnifyingGlass: faMagnifyingGlass,
  phone: faPhone,
  rotate: faRotate,
  shieldHalved: faShieldHalved,
  sliders: faSliders,
  solarPanel: faSolarPanel,
  star: faStar,
  tractor: faTractor,
  users: faUsers,
  water: faWater,
  wind: faWind,
  wrench: faWrench,
} as const satisfies Record<string, IconDefinition>;

export type AppIconName = keyof typeof ICONS;

export function socialNetworkIconName(social: SocialMediaLink): AppIconName {
  if (social.name.toLowerCase() === "facebook") {
    return "facebook";
  }
  return "link";
}
