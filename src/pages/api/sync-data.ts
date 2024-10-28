import type { GoogleDriveData } from "$lib/google-drive";

import type { APIRoute } from "astro";

import * as devalue from "devalue";

export const POST: APIRoute = async ({ request, locals }) => {
  const { session } = locals;
  if (session === undefined)
    return new Response("401 Unauthorized: session tidak valid", {
      status: 401,
    });

  const data: GoogleDriveData = await request.text().then(devalue.parse);
  const success = await session.drive.uploadData(data);

  return success
    ? new Response("200 OK")
    : new Response("500 Internal Error", { status: 500 });
};
