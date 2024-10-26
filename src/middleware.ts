import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  const session = (await getSession(context.request)) ?? undefined;
  // @ts-ignore trust
  context.locals.session = session;

  const loginCookie = context.cookies.get("login")?.value;
  if (session !== undefined) context.locals.login = "google";
  else if (loginCookie === "local") context.locals.login = "local";

  return next();
});
