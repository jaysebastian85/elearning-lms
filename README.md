# EduLMS - Sistem E-Learning & Akademik Kampus Pintar

EduLMS adalah aplikasi web modern all-in-one untuk sistem manajemen pembelajaran (LMS) dan portal akademik mahasiswa yang dirancang dengan standar UI/UX modern, interaktif, responsif, dan siap pakai.

---

## 🌟 Fitur Utama

1. **Sistem Autentikasi Mahasiswa (Login Guard)**
   - Proteksi akses: Mahasiswa wajib login dengan NIM & Kata Sandi sebelum dapat mengakses sistem.
   - Dilengkapi **Akun Demo Cepat (1-Click)** untuk pengujian langsung tanpa perlu mengetik manual:
     - **Akun 1**: Budi Pratama Santoso (NIM: `2024101001` / Sandi: `123`) - S1 Teknik Informatika (Sem 5, IPK 3.84)
     - **Akun 2**: Siti Nur Aminah (NIM: `2024101002` / Sandi: `123`) - S1 Sistem Informasi (Sem 3, IPK 3.78)
   - Sesi tersimpan aman di `localStorage` (tetap login saat browser di-refresh).

2. **Dashboard Akademik Interaktif**
   - Kartu Metrik KPI: IPK Kumulatif, Total SKS yang diambil, Persentase Kehadiran Kuliah, dan Tugas Aktif.
   - **Jadwal Kuliah Hari Ini**: Indikator kelas hari ini lengkap dengan tombol cepat *"Presensi Sekarang"* dan *"Buka Kelas"*.
   - Ringkasan progress modul dan daftar batas waktu tugas kuliah terdekat.

3. **Modul LMS & Perkuliahan**
   - Katalog mata kuliah lengkap dengan detail dosen, SKS, jadwal, dan ruangan.
   - Halaman detail mata kuliah dengan daftar pertemuan (Sesi 1 s/d 16), materi slide/PDF, dan video pembelajaran.
   - Pencarian real-time berdasarkan nama matakuliah atau dosen pengampu.

4. **Presensi / Absensi Mahasiswa Online**
   - Pencatatan kehadiran digital per pertemuan dan mata kuliah.
   - Status presensi: **Hadir**, **Izin**, dan **Sakit** dilengkapi kolom catatan/keterangan.
   - Simulasi verifikasi geolokasi GPS kampus (*"Kampus Utama - Radius 50m Terverifikasi"*).
   - Perhitungan otomatis persentase kehadiran untuk syarat mengikuti UTS/UAS (batas aman ≥ 75%).

5. **Pengisian Kartu Rencana Studi (KRS)**
   - Fitur pemilihan mata kuliah semester baru.
   - **Indikator Beban SKS Dinamis**: Kuota maksimal 24 SKS dengan validasi otomatis jika melebihi batas.
   - Aksi: Tambah mata kuliah, Hapus dari rencana, dan Ajukan ke Dosen PA.
   - **Cetak KRS Resmi (Print to PDF)**: Format resmi kop surat universitas lengkap dengan tanda tangan digital Dosen Pembimbing Akademik dan Mahasiswa.

6. **Tugas & Pengumpulan Berkas (Assignments)**
   - Filter status: *Semua*, *Belum Dikumpulkan*, *Menunggu Dinilai*, dan *Selesai*.
   - **Modal Upload Modern**: Area *Drag & Drop* untuk file (.pdf, .docx, .zip, .rar), validasi batas ukuran (maks 15MB), animasi progress bar pengunggahan, dan catatan mahasiswa.
   - Tampilan status pengumpulan, tanggal submit, nilai numerik dari dosen, serta review/feedback dosen.

7. **Profil Mahasiswa & Kartu Mahasiswa Digital**
   - Visualisasi Kartu Tanda Mahasiswa (KTM) digital.
   - Data diri lengkap, status akademik, semester, dan kontak dosen PA.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini bersifat **standalone tanpa dependensi runtime rumit** (zero-build/zero-config). Cukup buka file `index.html` langsung di browser apapun:

1. Buka File Explorer di Windows.
2. Navigasikan ke direktori:
   ```
   C:\Users\fajar\.gemini\antigravity\scratch\elearning-lms
   ```
3. Klik ganda file `index.html` (atau klik kanan -> *Open with* -> Google Chrome / Microsoft Edge / Firefox).
4. Aplikasi akan langsung berjalan dengan tampilan penuh.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5 & Semantic Markup**
- **Tailwind CSS v3 (CDN)** untuk tata letak modern, utility styling, dan responsivitas mobile & desktop.
- **Lucide Icons** untuk ikon grafis yang tajam dan konsisten.
- **Modern JavaScript (ES6+)** untuk manajemen state reaktif, event handling, filter real-time, dan persistensi `localStorage`.
- **Custom CSS** untuk glassmorphism, scrollbar estetik, serta layout cetak dokumen resmi KRS.

---

## 💾 Reset Data
Jika Anda ingin mengembalikan data simulasi (absensi, tugas, dan KRS) kembali ke pengaturan pabrik, klik tombol **"Reset Demo"** di bilah navigasi atas.
