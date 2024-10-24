import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const entries = await getCollection("mata-kuliah").then((values) =>
    values.map(({ id, data }) => ({ id, ...data }))
  );

  return new Response(JSON.stringify({ data: entries }), {
    headers: { "content-type": "application/json" },
  });
};
