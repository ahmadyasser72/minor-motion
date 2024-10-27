import { GoogleDrive } from "$lib/google-drive";

import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  // @ts-ignore trust
  context.locals.session = (await getSession(context.request)) ?? undefined;

  const login = context.cookies.get("login")?.value;
  if (login === "local") context.locals.login = "local";
  else if (context.locals.session !== undefined) {
    context.locals.login = "google";
    context.locals.session.drive = new GoogleDrive(context.locals.session);
  }

  return next();
});
