import type { DefaultSession } from "@auth/core/types";
import type { DefaultJWT } from "@auth/core/jwt";

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    token: string;
    valid: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}
