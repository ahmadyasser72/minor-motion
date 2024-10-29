import type { CollectionEntry } from "astro:content";

export type SubjectId = CollectionEntry<"mata-kuliah">["id"];

export type TaskId = CollectionEntry<"tugas">["slug"];
export type TaskStatus = "normal" | "lewat";
export type TaskState = "sudah" | "belum" | "telat";

export type DaftarTugas = Record<SubjectId, Array<[TaskId, TaskStatus]>>;

export interface State {
  readonly login?: App.Locals["login"];
  completed_tasks: Set<TaskId>;
  last_update: Date;
}
