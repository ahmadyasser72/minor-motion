import type { DefaultSession } from "@auth/core/types";

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    token: string;
  }
}
