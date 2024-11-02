# minor-motion

https://minor-motion.pages.dev

Aplikasi web tracking tugas dengan fitur-fitur seperti tracking tugas (sudah/belum), listing tugas, calendar tugas, sinkronisasi data dengan login google, dll.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Deployment to Cloudflare Pages](#deployment-to-cloudflare-pages)
- [License](#license)

---

## Overview

Aplikasi web tracking tugas ini menggunakan library/teknologi berikut:

- [Astro](https://astro.build/) **(full-stack)**: Framework web yang mudah integrasi pembuatan kontennya (konten disini adalah data tugas).
- [Svelte 5](https://svelte.dev/) **(frontend)**: Framework UI interaktif yang mudah digunakan.
- [Tailwind CSS](https://tailwindcss.com/) **(frontend)**: Framework CSS Atomic.
- [shadcn/ui](https://ui.shadcn.com/) **(frontend)**: Komponen UI tambahan.
- [Google Drive API V3](https://developers.google.com/drive/api/reference/rest/v3) **(backend)**: Bila login Google akan menggunakan scope [appdata](https://developers.google.com/drive/api/guides/appdata) untuk menyimpan data user.
- [Umami](https://umami.is/) **(analytics)**: Public share url umami [disini](https://eu.umami.is/share/oW5KJW0dHx8i2EEx/minor-motion.pages.dev).
- [Cloudflare Pages](https://pages.cloudflare.com/) **(hosting)**: Mudah digunakan dengan github karena bisa deploy otomatis setiap commit.

## Features

Berikut fitur-fitur dari [minor-motion](https://minor-motion.pages.dev):

- Tracking tugas (sudah/belum), tugas yang telat akan dibedakan.
- [Calendar tugas](https://minor-motion.pages.dev/calendar) yang menandai tugas pada hari tenggatnya.
- [Listing jadwal](https://minor-motion.pages.dev/jadwal) berisi jadwal harian disertai jumlah tugas pada tiap mata kuliah (bila ada).
- Listing tugas berdasarkan mata kuliah (bisa dibuka melalui listing jadwal, [contoh](https://minor-motion.pages.dev/tugas/pbo-2/)).
- Halaman tugas berisi penanda selesai, deskripsi tugas, link pengumpulan, dan detail tugas lainnya ([contoh](https://minor-motion.pages.dev/tugas/pbo-2/latihan-1)).
- Login menggunakan Google untuk sinkronisasi data antar perangkat.
- Open source (bebas bisa kontribusi code atau menambah data tugas).

## Installation

Ada beberapa step yang harus diikuti untuk self-host aplikasi web ini.

1. **Clone repository GitHub:**

   ```bash
   git clone https://github.com/ahmadyasser72/minor-motion.git
   ```

2. **Buat file `.env` berdasarkan `.env.example`**

   ```bash
   cp .env.example .env
   ```

   ```bash
   # buat dengan cara ketik openssl rand -hex 32
   AUTH_SECRET=""
   AUTH_TRUST_HOST=true

   # silahkan cari tutorial membuat client id & client secret
   # untuk google drive api v3 scope appdata
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   # buat di https://umami.is/
   UMAMI_WEBSITE_ID=""
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the app locally:**

   ```bash
   npm run build && npx wrangler pages dev
   # atau untuk mode development
   npm run dev
   ```

## Deployment to Cloudflare Pages

Ada beberapa step tambahan untuk deploy ke Cloudflare Pages. Sebelum memulai ini diharuskan sudah memiliki akun Cloudflare ([buat disini](https://dash.cloudflare.com/)) dan sudah login di `wrangler` (ketik `npx wrangler login` untuk login).

1. **Buat project Cloudflare Pages:**

   ```bash
   npx wrangler pages project create <nama-project>
   ```

2. **Update nama project di `wrangler.toml`:**

   ```diff
   -name = "minor-motion"
   +name = "<nama-project>
   ```

3. **Update environment variable di `wrangler.toml`:**

   ```toml
   [env.production.vars]
   AUTH_TRUST_HOST = "true"
   UMAMI_WEBSITE_ID = "" # isikan sama seperti sebelumnya
   ```

4. **Tambah secrets, isikan seperti file `.env` sebelumnya**:

   ```bash
   npx wrangler pages secret put AUTH_SECRET
   npx wrangler pages secret put GOOGLE_CLIENT_ID
   npx wrangler pages secret put GOOGLE_CLIENT_SECRET
   ```

5. **Build dan deploy:**

   ```bash
   npm run build && npx wrangler pages deploy
   ```

## License

Aplikasi ini menggunakan lisensi AGPL. Artinya orang yang menggunakan aplikasi ini harus mempublikasikan source codenya juga bila membuat versi modifikasi yang digunakan secara publik.
