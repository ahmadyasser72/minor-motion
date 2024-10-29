import type { allHari } from "$lib/utils";

import type { CollectionEntry } from "astro:content";

export type MataKuliahId = CollectionEntry<"mata-kuliah">["id"];

export type TugasId = CollectionEntry<"tugas">["slug"];
export type TugasStatus = "normal" | "lewat";
export type TugasState = "sudah" | "belum" | "telat";

export type ListJadwal = Array<
  CollectionEntry<"mata-kuliah">["data"] & {
    id: MataKuliahId;
  }
>;
export type ListJadwalMap = Record<(typeof allHari)[number], ListJadwal>;
export type ListStatusTugas = Array<[TugasId, TugasStatus]>;
export type ListStatusTugasMap = Record<MataKuliahId, ListStatusTugas>;

export interface State {
  readonly login?: App.Locals["login"];
  completed_tasks: Set<TugasId>;
  last_update: Date;
}
