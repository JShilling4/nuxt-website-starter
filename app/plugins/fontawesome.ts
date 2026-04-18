import "@fortawesome/fontawesome-svg-core/styles.css";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBars,
  faBolt,
  faCheck,
  faCircleChevronRight,
  faStar,
  faCircleCheck,
  faCommentDollar,
  faDroplet,
  faFilter,
  faFlask,
  faGaugeHigh,
  faHammer,
  faHandshake,
  faLayerGroup,
  faHouse,
  faIndustry,
  faLocationDot,
  faMagnifyingGlass,
  faPhone,
  faEnvelope,
  faFaucet,
  faChevronDown,
  faRotate,
  faShieldHalved,
  faLink,
  faSliders,
  faSolarPanel,
  faTractor,
  faUsers,
  faWater,
  faWind,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFacebook,
  faArrowRight,
  faBars,
  faBolt,
  faCheck,
  faCircleChevronRight,
  faStar,
  faCircleCheck,
  faCommentDollar,
  faDroplet,
  faFilter,
  faFlask,
  faGaugeHigh,
  faHammer,
  faHandshake,
  faHouse,
  faIndustry,
  faLocationDot,
  faMagnifyingGlass,
  faPhone,
  faEnvelope,
  faFaucet,
  faChevronDown,
  faLayerGroup,
  faRotate,
  faShieldHalved,
  faLink,
  faSliders,
  faSolarPanel,
  faTractor,
  faUsers,
  faWater,
  faWind,
  faWrench,
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
