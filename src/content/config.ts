import { z, defineCollection, reference } from "astro:content";

const time = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
});

const mata_kuliah = defineCollection({
  type: "data",
  schema: z.object({
    nama: z.string(),
    dosen: z.string().nullable(),
    hari: z.enum([
      "senin",
      "selasa",
      "rabu",
      "kamis",
      "jum'at",
      "sabtu",
      "minggu",
    ]),
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
    "link-pengumpulan": z.string().url(),
    "tempat-pengumpulan": z.enum([
      "e-learning",
      "google-classroom",
      "ketua-kelas",
      "langsung",
    ]),
  }),
});

export const collections = { "mata-kuliah": mata_kuliah, tugas };
