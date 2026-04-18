/**
 * Iconify names used with `{ source: 'iconify', name: '…' }` in `icons.ts`.
 *
 * Full checklist: **Icons** section in the project `README.md`.
 *
 * @nuxt/icon cannot always infer these when they flow through `AppIcon`; list
 * each name here so it can be included in the client bundle when you use
 * `clientBundle.icons` in `nuxt.config.ts`.
 *
 * When you add a collection (e.g. `ph:phone`), install the data package:
 * `pnpm add -D @iconify-json/ph` and add that collection prefix under
 * `icon.serverBundle.collections` in `nuxt.config.ts`.
 */
export const iconifyClientBundleIcons: readonly string[] = [];
