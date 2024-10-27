import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
  const { session } = locals;
  if (session === undefined)
    return new Response("401 Unauthorized: session tidak valid", {
      status: 401,
    });

  const data = await request.json();
  const success = await session.drive.uploadCompletedTasks(data);

  if (success)
    return new Response("200 OK: data google-drive berhasil diupdate");
  else
    return new Response("500 Internal Error: gagal update data google drive", {
      status: 500,
    });
};
