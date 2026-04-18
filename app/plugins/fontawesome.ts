import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

// Icons are registered as `IconDefinition` objects in `~/constants/icons` and
// rendered through `AppIcon.vue`, not via the global `library`.

config.autoAddCss = false;

export default defineNuxtPlugin(() => {
  /* Font Awesome CSS + config only; see AppIcon + constants/icons */
});
