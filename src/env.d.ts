/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    session?: Session;
    login?: "local" | "google";
  }

  type BaseSession = import("@auth/core/types").Session;
  interface Session extends BaseSession {
    drive: import("$lib/google-drive").GoogleDrive;
  }
}

interface ImportMetaEnv {
  readonly AUTH_SECRET: string;
  readonly AUTH_TRUST_HOST: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;

  readonly _GIT_HASH: string;
  readonly _GITHUB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
