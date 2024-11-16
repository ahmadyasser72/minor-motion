import type { dayNames } from "$lib/utils.date";

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
export type MapListJadwal = Record<(typeof dayNames)[number], ListJadwal>;

export type ListTugasLewat = Array<[TugasId, boolean]>;
export type MapListTugasLewat = Record<MataKuliahId, ListTugasLewat>;

export type ListBatasWaktuTugas = Array<[TugasId, Date]>;

export interface BreadcrumbItem {
  label?: string;
  href?: string | undefined;
  children?: Omit<BreadcrumbItem, "children">[];
}

export interface GoogleDriveData {
  completed_tasks: Set<TugasId>;
  last_update: Date;
}

export interface GoogleUser {
  readonly name?: string;
  readonly image?: string;
}

export interface State extends GoogleDriveData {
  readonly login?: "local" | "google";
}

export interface RemoteState {
  readonly login: State["login"] | "google-invalid";

  readonly name?: string;
  readonly email?: string;
  readonly image?: string;

  readonly data?: GoogleDriveData;
}
