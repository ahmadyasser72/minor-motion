import type { allHari } from "$lib/utils";

import type { CollectionEntry } from "astro:content";

export enum StatusTugas {
  terlambat,
  belum,
  sudah,
}

export type MataKuliahId = CollectionEntry<"mata-kuliah">["id"];
export type TugasId = CollectionEntry<"tugas">["slug"];
export type Tugas = CollectionEntry<"tugas">["data"] & { id: TugasId };

export type ListJadwal = Array<
  CollectionEntry<"mata-kuliah">["data"] & {
    id: MataKuliahId;
  }
>;
export type MapListJadwal = Record<(typeof allHari)[number], ListJadwal>;

export type ListTugasLewat = Array<[TugasId, boolean]>;
export type MapListTugasLewat = Record<MataKuliahId, ListTugasLewat>;

export type ListBatasWaktuTugas = Array<[TugasId, Date]>;

export interface BreadcrumbItem {
  label?: string;
  href?: string | undefined;
  children?: Omit<BreadcrumbItem, "children">[];
}

export interface State {
  readonly login?: App.Locals["login"];
  completed_tasks: Set<TugasId>;
  last_update: Date;
}
