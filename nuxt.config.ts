import type { Nitro, NitroConfig } from "nitropack";

// https://nuxt.com/docs/api/configuration/nuxt-config

function stripUseAppConfigFromNitroImportPresets(nitroConfig: NitroConfig) {
  const imports = nitroConfig.imports;
  if (!imports || !("presets" in imports)) {
    return;
  }
  const presets = imports.presets;
  if (!Array.isArray(presets) || !presets.length) {
    return;
  }
  imports.presets = presets.map((preset) => {
    if (typeof preset === "string" || !preset || typeof preset !== "object") {
      return preset;
    }
    if (!("imports" in preset) || !Array.isArray(preset.imports)) {
      return preset;
    }
    return {
      ...preset,
      imports: preset.imports.filter((entry) => {
        if (typeof entry === "string") {
          return entry !== "useAppConfig";
        }
        if (entry && typeof entry === "object" && "name" in entry) {
          return (entry as { name?: string }).name !== "useAppConfig";
        }
        return true;
      }),
    };
  });
}

export default defineNuxtConfig({
  // https://github.com/nuxt/nuxt/issues/34812 — nitropack adds `useAppConfig` to import presets
  // inside `createNitro` *after* `nitro:config`, so a Nitro module (runs before `createUnimport`)
  // strips the preset entry and keeps `@nuxt/nitro-server`'s `imports.imports` override.
  nitro: {
    modules: [
      function dedupeNitroUseAppConfigPreset(nitro: Nitro) {
        stripUseAppConfigFromNitroImportPresets(nitro.options);
      },
    ],
  },
  runtimeConfig: {
    // Site key is public (browser). Use NUXT_PUBLIC_* so Nuxt can override at runtime.
    // Netlify: add the same variable for Build and Production (or "All contexts") so SSR/build see it.
    public: {
      recaptchaSiteKey:
        process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY ||
        process.env.RECAPTCHA_SITE_KEY ||
        "",
    },
  },
  modules: ["@nuxt/image", "@nuxt/eslint"],
  app: {
    head: {
      title: "Placeholder Title",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content: "Placeholder meta description",
        },
      ],
      link: [],
    },
  },
  image: {
    quality: 94,
  },
  css: ["/styles/main.scss"],
  vite: {
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/vue-fontawesome",
        "@fortawesome/free-brands-svg-icons",
        "@fortawesome/free-solid-svg-icons",
      ],
    },
  },
  compatibilityDate: "2026-04-02",
  devtools: { enabled: true },
  // Netlify form detection only scans static HTML in the publish dir at deploy
  // time; SSR-only routes never hit disk, so prerender /contact so the form is found.
  routeRules: {
    "/contact": { prerender: true },
  },
});
