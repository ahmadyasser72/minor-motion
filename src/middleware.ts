import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  // @ts-ignore trust
  context.locals.session = (await getSession(context.request)) ?? undefined;

  return next();
});
