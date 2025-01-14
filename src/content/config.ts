import { dayNames } from "$lib/utils.date";

import { defineCollection, reference, z } from "astro:content";

const time = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
});

const mata_kuliah = defineCollection({
  type: "data",
  schema: z.object({
    nama: z.string(),
    hidden: z.boolean().optional(),
    dosen: z.string().nullable(),
    hari: z.enum(dayNames),
    start: time,
    end: time,
  }),
});

const tugas = defineCollection({
  type: "content",
  schema: z.object({
    judul: z.string(),
    tipe: z.enum(["individu", "kelompok"]),
    "mata-kuliah": reference("mata-kuliah"),
    "batas-waktu": z.date(),
    "link-pengumpulan": z.string().url().optional().nullable(),
    "tempat-pengumpulan": z.enum([
      "e-learning",
      "google-classroom",
      "google-form",
      "ketua-kelas",
      "langsung",
    ]),
  }),
});

export const collections = { "mata-kuliah": mata_kuliah, tugas };
