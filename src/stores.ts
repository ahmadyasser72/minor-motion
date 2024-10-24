import type { TaskId } from "$lib/types";

import { persistentAtom } from "@nanostores/persistent";

const completed = persistentAtom<Set<TaskId>>(
  "completed-tasks",
  new Set<TaskId>(),
  {
    decode: (text) => new Set([...JSON.parse(text)]),
    encode: (tasks) => JSON.stringify([...tasks.values()]),
  }
);

export const tasks = {
  completed,
  complete: (task: TaskId) => {
    const tasks = completed.get();
    completed.set(tasks.add(task));
    completed.notify();
  },
  undo: (task: TaskId) => {
    const tasks = completed.get();
    tasks.delete(task);
    completed.set(tasks);
    completed.notify();
  },
};
