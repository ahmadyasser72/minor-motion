import { GoogleDrive } from "$lib/google-drive";
import type { GoogleDriveData, RemoteState, TugasId } from "$lib/types";

import { ActionError, defineAction } from "astro:actions";
import { getCollection } from "astro:content";
import { z } from "astro:schema";

import { getSession } from "auth-astro/server";

export const server = {
  sync: {
    get: defineAction({
      input: z.void(),
      handler: async (_, { request, cookies }): Promise<RemoteState> => {
        const session = (await getSession(request)) ?? false;

        if (!session) {
          const isLocalLogin = cookies.get("login")?.value === "local";
          return { login: isLocalLogin ? "local" : undefined };
        } else if (!session.valid) {
          return { login: "google-invalid" };
        }

        const drive = new GoogleDrive(session);
        const data = await drive.fetchData();
        console.log(data);

        const allTugasId = (await getCollection("tugas")).map((it) => it.slug);
        if (data !== undefined)
          data.completed_tasks = new Set(
            [...data.completed_tasks].filter((id) => allTugasId.includes(id))
          );

        return {
          data,
          login: "google",
          name: session.user?.name ?? undefined,
          email: session.user?.email ?? undefined,
          image: session.user?.image ?? undefined,
        };
      },
    }),
    set: defineAction({
      input: z.object({
        completed_tasks: z.array(z.string()),
        last_update: z.string().datetime(),
      }),
      handler: async ({ completed_tasks, last_update }, { request }) => {
        const session = (await getSession(request)) ?? false;
        if (!session) throw new ActionError({ code: "UNAUTHORIZED" });

        const allTugasId = (await getCollection("tugas")).map((it) => it.slug);
        for (const id of completed_tasks) {
          if (!allTugasId.includes(id as TugasId))
            throw new ActionError({ code: "BAD_REQUEST" });
        }

        const data = {
          completed_tasks: new Set([...completed_tasks]),
          last_update: new Date(last_update),
        } as GoogleDriveData;

        const drive = new GoogleDrive(session);
        const success = await drive.uploadData(data);

        if (!success) throw new ActionError({ code: "INTERNAL_SERVER_ERROR" });
      },
    }),
  },
};
