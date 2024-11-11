import { GoogleDrive } from "$lib/google-drive";
import type { GoogleDriveData, RemoteState } from "$lib/types";

import type { APIRoute } from "astro";

import { getSession } from "auth-astro/server";
import * as devalue from "devalue";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  const jsonResponse = (body: RemoteState) =>
    new Response(devalue.stringify(body), {
      headers: { "content-type": "application/json" },
    });

  const session = (await getSession(request)) ?? false;
  if (!session) {
    const isLocalLogin = cookies.get("login")?.value === "local";
    return jsonResponse({
      login: isLocalLogin ? "local" : undefined,
    });
  } else if (!session.valid) {
    return jsonResponse({ login: "google-invalid" });
  }

  const drive = new GoogleDrive(session);
  const data = await drive.fetchData();

  return jsonResponse({
    data,
    login: "google",
    name: session.user?.name ?? undefined,
    email: session.user?.email ?? undefined,
    image: session.user?.image ?? undefined,
  });
};

export const POST: APIRoute = async ({ request }) => {
  const session = (await getSession(request)) ?? false;
  if (!session)
    return new Response("401 Unauthorized: session tidak valid", {
      status: 401,
    });

  const data: GoogleDriveData = await request.text().then(devalue.parse);
  const drive = new GoogleDrive(session);
  const success = await drive.uploadData(data);

  return success
    ? new Response("200 OK")
    : new Response("500 Internal Error", { status: 500 });
};
