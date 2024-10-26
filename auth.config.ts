import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      token: token.access_token,
    }),
    jwt: ({ token, account }) => ({
      access_token: account?.access_token,
      ...token,
    }),
  },
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid profile https://www.googleapis.com/auth/drive.appdata",
        },
      },
    }),
  ],
});
