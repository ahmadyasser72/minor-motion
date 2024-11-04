import { getCollection, type CollectionEntry } from "astro:content";

export const getMataKuliah = (
  filter?: (entry: CollectionEntry<"mata-kuliah">) => boolean
) =>
  getCollection(
    "mata-kuliah",
    (mataKuliah) =>
      mataKuliah.data.hidden !== true && (filter?.(mataKuliah) ?? true)
  );
