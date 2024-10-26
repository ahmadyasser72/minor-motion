import type { TaskId } from "$lib/types";
import { debounce } from "$lib/utils";

import { persisted } from "svelte-persisted-store";

import { get, readonly } from "svelte/store";

const completed = persisted("completed-tasks", new Set<TaskId>(), {
  serializer: {
    parse: (text) => new Set([...JSON.parse(text)]),
    stringify: (set) => JSON.stringify([...set.values()]),
  },
});

const _syncDataToGoogleDrive = async () => {
  const response = await fetch("/api/sync-data", {
    method: "POST",
    body: JSON.stringify([...get(completed).values()]),
    headers: { "content-type": "application/json" },
  });

  if (!response.ok) throw new Error(await response.text());
};

const syncDataToGoogleDrive = debounce(_syncDataToGoogleDrive, 5000);

export const tasks = {
  completed: readonly(completed),
  complete: async (task: TaskId) => {
    completed.update((completed) => completed.add(task));
    await syncDataToGoogleDrive();
  },
  undo: async (task: TaskId) => {
    completed.update((completed) => {
      completed.delete(task);
      return completed;
    });
    await syncDataToGoogleDrive();
  },
};

export { _syncDataToGoogleDrive as syncDataToGoogleDrive };
