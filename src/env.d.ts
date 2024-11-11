/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {}
}

interface ImportMetaEnv {
  readonly AUTH_SECRET: string;
  readonly AUTH_TRUST_HOST: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly UMAMI_WEBSITE_ID: string;

  readonly _GIT_HASH: string;
  readonly _GITHUB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
