---
judul: Latihan 3 - Aplikasi Pengelola Kontak
tipe: individu
mata-kuliah: pbo-2
batas-waktu: 2024-11-24T22:00:00+08:00
link-pengumpulan: https://elearning.uniska-bjm.ac.id/mod/assign/view.php?id=40203
tempat-pengumpulan: e-learning
---

> https://drive.google.com/file/d/107UW9UZi2DFzhNVmcyrvKAHtSVj4cYVt/view

1. Deskripsi Program:

   - Aplikasi menyimpan informasi kontak seperti nama, nomor telepon, dan kategori kontak ke dalam database SQLite.
   - Pengguna dapat menambahkan, mengedit, menghapus kontak tersimpan.
   - Kontak dapat dikelompokkan berdasarkan kategori yang dipilih dari JComboBox, seperti keluarga, teman, atau kerja.

2. Komponen GUI: JFrame, JPanel, JLabel, JTextField, JButton, JList, JComboBox, JTable, JScrollPane

3. Logika Program: database SQLite, fitur CRUD (Create, Read, Update, Delete)

4. Events:

   - ActionListener untuk tombol Tambah, Edit, Hapus, dan Cari Kontak.
   - ItemListener untuk JComboBox kategori kontak

5. Variasi:

   - Tambahkan fitur pencarian kontak berdasarkan nama atau nomor telepon, lalu tampilkan hasilnya di JTable
   - Buat validasi input untuk memastikan nomor telepon yang dimasukkan hanya berisi angka dan memiliki panjang yang sesuai
   - Sediakan fitur untuk mengekspor daftar kontak ke file CSV dan mengimpor kontak dari file CSV ke database.

## Indikator penilaian

| No  | Komponen         | Persentase |
| --- | ---------------- | ---------- |
| 1   | Komponen GUI     | 20         |
| 2   | Logika program   | 30         |
| 3   | Events           | 15         |
| 4   | Kesesuaian UI    | 15         |
| 5   | Memenuhi variasi | 20         |
|     | Total            | 100        |
