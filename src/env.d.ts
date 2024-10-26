/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    session?: {
      user: {
        name: string;
        image: string;
      };
      token: string;
    };
  }
}
