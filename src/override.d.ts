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

// object.* type hack
declare global {
  interface ObjectConstructor {
    // https://stackoverflow.com/a/73913412
    entries<T extends object>(o: T): { [K in keyof T]: [K, T[K]] }[keyof T][];
    keys<T extends object>(o: T): (keyof T)[];

    // https://stackoverflow.com/a/76176570
    fromEntries<const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
      entries: T
    ): { [K in T[number] as K[0]]: K[1] };
  }
}
