import {
  StatusTugas,
  type State,
  type Tugas,
  type TugasId,
  type GoogleUser,
} from "$lib/types";

import { derived } from "svelte/store";

import * as devalue from "devalue";
import { persisted } from "svelte-persisted-store";

export const googleUser = persisted<GoogleUser>("user-data", {});
export const state = persisted<State>(
  "state",
  { completed_tasks: new Set(), last_update: new Date(0) },
  { serializer: devalue }
);

export const tasks = derived(state, ($state) => ({
  getTugasState: (data: Pick<Tugas, "id" | "batas-waktu">): StatusTugas => {
    if ($state.completed_tasks.has(data.id)) return StatusTugas.sudah;
    else if (new Date() > data["batas-waktu"]) return StatusTugas.terlambat;
    else return StatusTugas.belum;
  },
  isDone: (id: TugasId) => $state.completed_tasks.has(id),
  done: (id: TugasId) => {
    $state.completed_tasks.add(id);
    $state.last_update = new Date();
    state.set($state);
  },
  undo: (id: TugasId) => {
    $state.completed_tasks.delete(id);
    $state.last_update = new Date();
    state.set($state);
  },
}));
