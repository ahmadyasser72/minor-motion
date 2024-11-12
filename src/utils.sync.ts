import type { GoogleDriveData, RemoteState, State } from "./types";

import * as devalue from "devalue";

export const fetchRemoteData = async (): Promise<RemoteState> => {
  const response = await fetch("/api/sync-data");
  return response.text().then(devalue.parse);
};

export const updateGoogleDriveData = async (local: State) => {
  const data: GoogleDriveData = {
    completed_tasks: local.completed_tasks,
    last_update: local.last_update,
  };

  const response = await fetch("/api/sync-data", {
    method: "POST",
    body: devalue.stringify(data),
    headers: { "content-type": "application/json" },
  });

  if (!response.ok) throw await response.text();
};
