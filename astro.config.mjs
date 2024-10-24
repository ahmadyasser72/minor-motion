// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [svelte(), tailwind({ applyBaseStyles: false })],
  adapter: cloudflare(),
});