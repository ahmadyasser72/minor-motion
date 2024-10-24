import type { TaskId } from "$lib/types";

import { persisted } from "svelte-persisted-store";

import { readonly } from "svelte/store";

const completed = persisted("completed-tasks", new Set<TaskId>(), {
  serializer: {
    parse: (text) => new Set([...JSON.parse(text)]),
    stringify: (set) => JSON.stringify([...set.values()]),
  },
});

export const tasks = {
  completed: readonly(completed),
  complete: (task: TaskId) =>
    completed.update((completed) => completed.add(task)),
  undo: (task: TaskId) =>
    completed.update((completed) => {
      completed.delete(task);
      return completed;
    }),
};
