import type { State, Tugas, TugasId, TugasState } from "$lib/types";
import { debounce } from "$lib/utils";

import { derived, get } from "svelte/store";

import * as devalue from "devalue";
import { persisted } from "svelte-persisted-store";
import { toast } from "svelte-sonner";

const state = persisted<State>(
  "state",
  { completed_tasks: new Set(), last_update: new Date(0) },
  {
    serializer: devalue,
    beforeRead: (state) => ({
      ...state,
      login: sessionStorage.getItem("login") as State["login"],
    }),
  }
);

const _updateGoogleDriveData = async () => {
  const { login, completed_tasks, last_update } = get(state);

  if (login !== "google") return;

  toast.promise(
    async () => {
      const response = await fetch("/api/sync-data", {
        method: "POST",
        body: devalue.stringify({ completed_tasks, last_update }),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) throw await response.text();
    },
    {
      duration: 3000,
      loading: "Sedang sinkronisasi data ke server...",
      success: "Sinkronisasi selesai!",
      error: (err) => err as string,
    }
  );
};

const updateGoogleDriveData = debounce(_updateGoogleDriveData, 1000);

export const tasks = derived(state, ($state) => ({
  getTugasState: (data: Tugas): TugasState => {
    if ($state.completed_tasks.has(data.id)) return "sudah";
    else if (new Date() > data["batas-waktu"]) return "telat";
    else return "belum";
  },
  isDone: (id: TugasId) => $state.completed_tasks.has(id),
  done: async (id: TugasId) => {
    $state.completed_tasks.add(id);
    $state.last_update = new Date();
    state.set($state);

    await updateGoogleDriveData();
  },
  undo: async (id: TugasId) => {
    $state.completed_tasks.delete(id);
    $state.last_update = new Date();
    state.set($state);

    await updateGoogleDriveData();
  },
}));

export { state, _updateGoogleDriveData as updateGoogleDriveData };
