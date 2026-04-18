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

/** How to add icons: see the **Icons** section in the project `README.md`. */

export type IconRegistryEntry =
  | { source: "fontawesome"; icon: IconDefinition }
  | { source: "iconify"; name: string };

function fa(icon: IconDefinition): Extract<IconRegistryEntry, { source: "fontawesome" }> {
  return { source: "fontawesome", icon };
}

/** Semantic keys for `<AppIcon name="…" />`. Steps to add entries: README **Icons**. */
const ICONS_MAP = {
  arrowRight: fa(faArrowRight),
  bars: fa(faBars),
  bolt: fa(faBolt),
  check: fa(faCheck),
  chevronDown: fa(faChevronDown),
  circleCheck: fa(faCircleCheck),
  circleChevronRight: fa(faCircleChevronRight),
  commentDollar: fa(faCommentDollar),
  droplet: fa(faDroplet),
  envelope: fa(faEnvelope),
  facebook: fa(faFacebook),
  filter: fa(faFilter),
  flask: fa(faFlask),
  faucet: fa(faFaucet),
  gaugeHigh: fa(faGaugeHigh),
  hammer: fa(faHammer),
  handshake: fa(faHandshake),
  house: fa(faHouse),
  industry: fa(faIndustry),
  layerGroup: fa(faLayerGroup),
  link: fa(faLink),
  locationDot: fa(faLocationDot),
  magnifyingGlass: fa(faMagnifyingGlass),
  phone: fa(faPhone),
  rotate: fa(faRotate),
  shieldHalved: fa(faShieldHalved),
  sliders: fa(faSliders),
  solarPanel: fa(faSolarPanel),
  star: fa(faStar),
  tractor: fa(faTractor),
  users: fa(faUsers),
  water: fa(faWater),
  wind: fa(faWind),
  wrench: fa(faWrench),
} as const;

export type AppIconName = keyof typeof ICONS_MAP;

/** Lookup table; values are typed as `IconRegistryEntry` so Iconify rows type-check. */
export const ICONS: Record<AppIconName, IconRegistryEntry> = ICONS_MAP;

export function socialNetworkIconName(social: SocialMediaLink): AppIconName {
  if (social.name.toLowerCase() === "facebook") {
    return "facebook";
  }
  return "link";
}
