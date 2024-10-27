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
