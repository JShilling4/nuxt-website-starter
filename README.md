# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Icons

The site uses **`AppIcon`** with semantic names (for example `<AppIcon name="phone" />`). Implementations are registered in `app/constants/icons.ts`: each entry is either **Font Awesome** (`IconDefinition` objects, tree-shaken) or **Iconify** (strings consumed by **`NuxtIcon`** from `@nuxt/icon`). You can also use `<NuxtIcon name="collection:icon" />` directly when an icon is a one-off and does not need a shared semantic name.

### Adding a Font Awesome icon

1. Open `app/constants/icons.ts`.
2. Import the glyph you need from `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`, or `@fortawesome/free-brands-svg-icons` (import **only** the symbols you use so the client bundle stays small).
3. Add a key to **`ICONS_MAP`** with `fa(yourImportedIcon)`, for example `myNewIcon: fa(faMyNewIcon)`.
4. Use `<AppIcon name="myNewIcon" />` in Vue templates (kebab-case is not used for the `name` prop; use the camelCase key from the map).
5. If the icon is used for social or other data-driven cases, extend helpers such as `socialNetworkIconName` when you need to map data to an `AppIcon` name.

Font Awesome CSS and `autoAddCss` are configured in `app/plugins/fontawesome.ts`.

### Adding an Iconify icon (via `AppIcon`)

1. Pick the icon id on [Icones](https://icones.js.org/) (format `collection:icon`, for example `ph:phone`).
2. Install only that collection’s data package, for example `pnpm add -D @iconify-json/ph`. Avoid installing the full `@iconify/json` set unless you intentionally want every icon.
3. In `nuxt.config.ts`, under `icon.serverBundle.collections`, add the **collection prefix** (the part before `:` in the id, e.g. `ph` for `ph:phone`).
4. In `app/constants/iconify-client-bundle.ts`, append the **full** id string (e.g. `'ph:phone'`) to **`iconifyClientBundleIcons`**. That array is spread into `icon.clientBundle.icons` in `nuxt.config.ts` so icons referenced only through `AppIcon` are still bundled (static scan may miss dynamic names).
5. In `app/constants/icons.ts`, add a key to **`ICONS_MAP`** with `{ source: 'iconify', name: 'ph:phone' }` (use your real `collection:icon` value).
6. Use `<AppIcon name="yourKey" />` in templates.

### Using Iconify without the registry

For a single screen or experiment, you can use `<NuxtIcon name="collection:icon" />` directly. With `icon.clientBundle.scan` enabled in `nuxt.config.ts`, **literal** `name="…"` values in components are often picked up automatically; still install `@iconify-json/<collection>` and list the collection under `icon.serverBundle.collections` as above. If a name is built at runtime (string interpolation), add it to **`iconifyClientBundleIcons`** so it is included in the client bundle.
