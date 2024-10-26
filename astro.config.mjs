// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [svelte(), tailwind({ applyBaseStyles: false }), auth()],
  adapter: cloudflare(),
});
