import type { CollectionEntry } from "astro:content";

export type SubjectId = CollectionEntry<"mata-kuliah">["id"];

export type TaskId = CollectionEntry<"tugas">["slug"];
export type TaskStatus = "normal" | "lewat";

export type DaftarTugas = Record<SubjectId, Array<[TaskId, TaskStatus]>>;
