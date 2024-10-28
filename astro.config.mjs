// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

import auth from "auth-astro";

import { execSync } from "node:child_process";

const exec = (/** @type {string} */ cmd) => execSync(cmd).toString().trim();
process.env._GIT_HASH = exec("git rev-parse --short HEAD");
process.env._GITHUB_URL = exec("git remote get-url origin")
  .replace(/.*@/, "https://")
  .replace(".git", "");

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [svelte(), tailwind({ applyBaseStyles: false }), auth()],
  adapter: cloudflare(),
  vite: {
    // https://github.com/withastro/astro/issues/4416#issuecomment-2208336818
    define: { "process.env": process.env },
    // https://docs.astro.build/en/guides/integrations-guide/cloudflare/#nodejs-compatibility
    ssr: { external: ["node:child_process", "node:path"] },
  },
});
