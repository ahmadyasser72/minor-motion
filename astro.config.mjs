// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

import AstroPWA from "@vite-pwa/astro";
import auth from "auth-astro";

import { execSync } from "node:child_process";

const exec = (/** @type {string} */ cmd) => execSync(cmd).toString().trim();
const _GIT_HASH = exec("git rev-parse --short HEAD");
const _GITHUB_URL = exec("git remote get-url origin")
  .replace(/.*@/, "https://")
  .replace(".git", "");

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    svelte(),
    tailwind({ applyBaseStyles: false }),
    auth({ injectEndpoints: false }),
    AstroPWA({
      registerType: "prompt",
      workbox: {
        // https://github.com/vite-pwa/astro/issues/35#issuecomment-2068031978
        globIgnores: ["**/_worker.js/**/*"],
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
        navigateFallback: "/",
        navigateFallbackDenylist: [new RegExp("/api/")],
      },
      manifest: {
        id: "/",
        name: "minor-motion",
        short_name: "minor-motion",
        description: "Aplikasi tracking tugas",
        lang: "id-ID",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/calendar-desktop.webp",
            sizes: "2560x1440",
            form_factor: "wide",
            label: "Calendar dengan highlight pada tanggal yang terdapat tugas",
          },
          {
            src: "/screenshots/calendar-mobile.webp",
            sizes: "828x1792",
            form_factor: "narrow",
            label: "Calendar dengan highlight pada tanggal yang terdapat tugas",
          },
          {
            src: "/screenshots/jadwal-desktop.webp",
            sizes: "2560x1440",
            form_factor: "wide",
            label: "Jadwal harian dengan penanda jumlah tugas",
          },
          {
            src: "/screenshots/jadwal-mobile.webp",
            sizes: "828x1792",
            form_factor: "narrow",
            label: "Jadwal harian dengan penanda jumlah tugas",
          },
          {
            src: "/screenshots/list-tugas-desktop.webp",
            sizes: "2560x1440",
            form_factor: "wide",
            label: "Daftar list tugas",
          },
          {
            src: "/screenshots/list-tugas-mobile.webp",
            sizes: "828x1792",
            form_factor: "narrow",
            label: "Daftar list tugas",
          },
          {
            src: "/screenshots/detail-tugas-desktop.webp",
            sizes: "2560x1440",
            form_factor: "wide",
            label: "Detail sebuah tugas",
          },
          {
            src: "/screenshots/detail-tugas-mobile.webp",
            sizes: "828x1792",
            form_factor: "narrow",
            label: "Detail sebuah tugas",
          },
        ],
      },
    }),
  ],
  adapter: cloudflare(),
  vite: {
    // https://github.com/withastro/astro/issues/4416#issuecomment-2208336818
    define: {
      "process.env": process.env,
      "import.meta.env._GIT_HASH": JSON.stringify(_GIT_HASH),
      "import.meta.env._GITHUB_URL": JSON.stringify(_GITHUB_URL),
    },
    // https://docs.astro.build/en/guides/integrations-guide/cloudflare/#nodejs-compatibility
    ssr: { external: ["node:child_process", "node:path"] },
  },
});
