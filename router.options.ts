import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";

// Reset scroll on every client-side navigation (and history back/forward via this handler).
export default {
  scrollBehavior(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalizedLoaded,
    _savedPosition: { left: number; top: number } | null,
  ) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" as const };
    }
    return { top: 0, left: 0 };
  },
};
