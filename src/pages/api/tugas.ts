import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const subject = url.searchParams.get("subject");
  const entries = await getCollection("tugas").then((values) =>
    values
      .filter(
        ({ data }) => subject === null || data["mata-kuliah"].id === subject
      )
      .map(({ slug: id, data }) => ({ id, ...data }))
  );

  return new Response(JSON.stringify({ data: entries }), {
    headers: { "content-type": "application/json" },
  });
};
