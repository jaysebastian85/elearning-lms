# EduLMS - Sistem E-Learning & Akademik Kampus Pintar (Multi-Role)

EduLMS adalah aplikasi web modern all-in-one untuk Sistem Informasi Akademik (SIAKAD) dan Sistem Manajemen Pembelajaran (LMS) kampus. Aplikasi mendukung 3 role pengguna utama (**Mahasiswa**, **Dosen**, dan **Akademik/Admin**) dalam satu basis kode dan basis data terintegrasi (`localStorage`), dengan antarmuka modern, interaktif, responsif, dan siap pakai tanpa proses build (*zero-build / zero-config*).

---

## 👥 Sistem Autentikasi & Akun Demo

Aplikasi dilengkapi tab **Quick Login 1-Click** pada halaman masuk untuk mempermudah perpindahan role secara instan:

| Role | Identitas (NIM / NIDN / NIP / Username) | Kata Sandi | Nama Pengguna | Program Studi / Jabatan |
|---|---|---|---|---|
| **Mahasiswa** | `2024101001` | `123` | Budi Pratama Santoso | S1 Teknik Informatika (Sem 5) |
| **Mahasiswa** | `2024101002` | `123` | Siti Nur Aminah | S1 Sistem Informasi (Sem 3) |
| **Dosen** | `0012057801` | `123` | Dr. Ir. Hendra Setiawan, M.T. | Dosen Tetap Teknik Informatika |
| **Dosen** | `0028098302` | `123` | Maya Kusuma, S.Kom., M.Cs. | Dosen Tetap Sistem Informasi |
| **Akademik / Admin** | `admin` *(atau `198504122010011002`)* | `123` | Bambang Sudarsono, S.Sos., M.M. | Kepala Bagian Administrasi Akademik |

---

## 📸 Fitur Penggantian Foto Profil (Untuk Seluruh Role)

Setiap pengguna (Mahasiswa, Dosen, maupun Admin) dapat mengganti foto profil mereka dengan cara:
1. Klik tombol **ikon kamera** pada avatar di bilah navigasi samping (*sidebar*) atau kartu profil.
2. Tiga metode penggantian foto:
   - **Unggah Berkas Lokal**: Pilih foto dari perangkat komputer/ponsel. Berkas akan otomatis dikompresi dan di-resize maksimal 350x350 piksel via HTML5 Canvas agar hemat memori `localStorage`.
   - **Pilih Avatar Preset**: Tersedia 8 pilihan avatar ilustrasi modern pria dan wanita.
   - **Tautan URL Gambar**: Masukkan tautan web gambar langsung dengan fitur live preview.
3. Tombol **"Kembalikan Default"** untuk mengembalikan foto bawaan akun.
4. Foto langsung tersinkronisasi di seluruh elemen header, sidebar, dashboard, dan kartu identitas digital (KTM / Kartu Dosen / Kartu Pegawai).

---

## 🌟 Fitur Berdasarkan Role

### 1. 🎓 Portal Mahasiswa
- **Dashboard Mahasiswa**: Metrik KPI (IPK Kumulatif, SKS, Kehadiran %, Tugas Aktif), pengumuman kampus, jadwal kuliah hari ini, dan batas tugas terdekat.
- **Katalog & Detail Perkuliahan (LMS)**: Daftar mata kuliah yang diambil, rincian sesi pertemuan 1-16, unduh materi perkuliahan, dan tautan video pembelajaran.
- **Presensi / Absensi Mandiri**: Konfirmasi kehadiran kuliah harian dengan simulasi verifikasi lokasi GPS kampus.
- **Pengisian KRS**: Pemilihan mata kuliah semester aktif, kalkulasi batas beban SKS (maks 24 SKS), status persetujuan KRS oleh Dosen PA / Akademik, serta fitur **Cetak KRS Resmi (Print to PDF)** lengkap dengan kop universitas dan tanda tangan digital.
- **Pengumpulan Tugas**: Unggah berkas tugas (PDF/ZIP/DOCX), input catatan tugas, status pengumpulan, dan melihat nilai serta umpan balik dari Dosen.
- **Profil & KTM Digital**: Kartu Tanda Mahasiswa digital lengkap dengan barcode dan detail status akademik.

### 2. 👨‍🏫 Dashboard Dosen
- **Dashboard Dosen**:
  - Ringkasan KPI: Jumlah kelas yang diajar, total mahasiswa bimbingan/diampu, jumlah tugas aktif, dan notifikasi akademik.
  - Kartu pintas aksi cepat untuk buka presensi baru dan input nilai.
- **Manajemen Kelas**:
  - Daftar mata kuliah yang diampu lengkap dengan kode, ruang, jadwal, dan kuota.
  - Modal peninjauan daftar mahasiswa dalam tiap kelas secara detail.
- **Manajemen Absensi**:
  - Pembuatan sesi pertemuan kuliah baru (Pertemuan 1 s/d 16) dengan topik materi dan tanggal.
  - Pemilihan status kehadiran per mahasiswa: **Hadir**, **Izin**, **Sakit**, dan **Alfa**.
  - Tombol cepat **"Tandai Semua Hadir"** untuk efisiensi pengajar.
  - Rekapitulasi persentase kehadiran masing-masing mahasiswa di kelas.
- **Manajemen Tugas**:
  - Pembuatan tugas baru dengan judul, deskripsi petunjuk pengerjaan, deadline pengumpulan, dan target kelas mata kuliah.
  - Melihat daftar tugas yang dikumpulkan mahasiswa secara real-time.
  - Simulasi unduh berkas tugas mahasiswa.
  - Penilaian numerik (skala 0 - 100) dan input umpan balik/catatan evaluasi dosen.
- **Input Nilai**:
  - Filter mata kuliah dan kelas yang menjadi tanggung jawab dosen.
  - Input komponen nilai: **Tugas (30%)**, **UTS (30%)**, dan **UAS (40%)**.
  - Kalkulasi otomatis nilai akhir dan konversi grade huruf (A, B+, B, C+, C, D, E) secara real-time.
  - Fitur **Simpan Draf** dan tombol **"Publikasikan Nilai"** agar nilai langsung dapat dilihat oleh mahasiswa terkait.

### 3. 🏛️ Dashboard Akademik / Admin
- **Dashboard Akademik**:
  - Ringkasan statistik kampus: Total Mahasiswa Aktif, Total Dosen Pengajar, Total Mata Kuliah, Kelas Perkuliahan Aktif.
  - Kontrol pembukaan & penutupan periode pengisian KRS secara global dengan tombol toggle status.
- **Manajemen Mahasiswa**:
  - Tambah mahasiswa baru dengan form lengkap (NIM, Nama, Email, Program Studi, Semester, Status).
  - Edit data profil mahasiswa.
  - Nonaktifkan akun atau hapus data mahasiswa.
  - Fitur pencarian instan berdasarkan nama atau NIM.
- **Manajemen Dosen**:
  - Tambah dosen baru (NIDN/NIP, Nama, Gelar, Email, Program Studi, Keahlian).
  - Edit data dosen dan status keaktifan.
  - Hapus data dosen dari sistem.
- **Manajemen Mata Kuliah**:
  - Tambah mata kuliah baru (Kode MK, Nama MK, Bobot SKS, Semester, Program Studi, Deskripsi Silabus).
  - Edit dan hapus mata kuliah.
- **Manajemen Semester & Kelas Perkuliahan**:
  - Buka kelas perkuliahan baru: tentukan mata kuliah, kelas (A/B/C), dosen pengampu, hari & jam, ruangan, serta kuota kapasitas mahasiswa.
  - Edit jadwal & dosen pengampu kelas perkuliahan.
- **Manajemen KRS (Fitur Utama Akademik)**:
  - Melihat daftar pengajuan KRS mahasiswa dari seluruh program studi.
  - Filter pengajuan berdasarkan status: *Semua*, *Menunggu Persetujuan*, *Disetujui*, dan *Perlu Revisi*.
  - Modal review mendalam: memeriksa seluruh daftar mata kuliah yang diajukan beserta total SKS.
  - Tombol **"Setujui & Validasi KRS"** atau **"Tolak / Minta Revisi"** yang langsung memperbarui status KRS di dashboard mahasiswa secara real-time.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini berbasis web murni (*pure client-side vanilla JavaScript*) tanpa memerlukan instalasi Node.js, Python, ataupun database eksternal:

1. Buka File Explorer di komputer Anda.
2. Navigasikan ke folder:
   ```
   c:\Users\fajar\.gemini\antigravity\scratch\elearning-lms
   ```
3. Klik ganda file **`index.html`** untuk membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
4. Pilih salah satu akun pada tab **Quick Login Demo** untuk langsung menguji fitur Mahasiswa, Dosen, atau Akademik/Admin.

---

## 🛠️ Arsitektur & Teknologi

- **Single HTML & Single JS Architecture**: Seluruh role terintegrasi rapi pada `index.html` dan `app.js` tanpa merombak arsitektur awal.
- **Role-Based Access Control (RBAC)**: Validasi izin akses di level state dan navigasi untuk memastikan pengguna hanya dapat melihat dan mengeksekusi fitur yang sesuai dengan wewenangnya.
- **Tailwind CSS**: Mempertahankan palet warna konsisten (Indigo/Emerald/Purple/Rose/Slate), tipografi modern, dan layout responsif.
- **Lucide Icons**: Ratusan ikon vektor interaktif untuk representasi visual aksi antarmuka.
- **Local Storage State Persistence**: Sinkronisasi data real-time antara input Dosen (tugas, absensi, nilai) dengan portal Mahasiswa, serta keputusan verifikasi KRS oleh Admin dengan status mahasiswa.
- **HTML5 Canvas Image Processor**: Pengurangan resolusi dan ukuran file gambar avatar secara otomatis di memori peramban sebelum disimpan ke persistent storage.

---

## 🔄 Reset Data Simulasi
Untuk mengembalikan seluruh data kelas, nilai, absensi, KRS, akun pengguna, dan foto profil kembali ke kondisi awal (default), klik tombol **"Reset Demo"** di bilah navigasi kanan atas.
