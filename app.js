/**
 * EduLMS Kampus Pintar - Full Application Logic
 * Modern E-Learning & Academic Information System
 * Multi-Role: Mahasiswa, Dosen, Akademik / Admin
 */

// ==========================================
// 1. DATA INITIALIZATION & LOCALSTORAGE
// ==========================================

const STORAGE_KEYS = {
  USER: 'edulms_user',
  USERS_LIST: 'edulms_users_list',
  COURSES: 'edulms_courses',
  ATTENDANCE: 'edulms_attendance',
  KRS: 'edulms_krs',
  ASSIGNMENTS: 'edulms_assignments',
  NOTIFICATIONS: 'edulms_notifications',
  STUDENTS: 'edulms_students_list',
  LECTURERS: 'edulms_lecturers_list',
  CLASSES: 'edulms_classes_list',
  ACADEMIC_SETTINGS: 'edulms_academic_settings',
  GRADES: 'edulms_student_grades',
  KRS_SUBMISSIONS: 'edulms_krs_submissions',
  CUSTOM_AVATARS: 'edulms_custom_avatars'
};

const DEFAULT_USERS = [
  {
    role: "mahasiswa",
    nim: "2024101001",
    password: "123",
    name: "Budi Pratama Santoso",
    email: "budi.santoso@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    fakultas: "Fakultas Ilmu Komputer",
    semester: 5,
    ipk: 3.84,
    sksLulus: 88,
    maxSks: 24,
    dosenPa: "Dr. Ir. Hendra Setiawan, M.T.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+62 812-3456-7890"
  },
  {
    role: "mahasiswa",
    nim: "2024101002",
    password: "123",
    name: "Siti Nur Aminah",
    email: "siti.aminah@univ-nusantara.ac.id",
    prodi: "S1 Sistem Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    semester: 3,
    ipk: 3.78,
    sksLulus: 48,
    maxSks: 24,
    dosenPa: "Maya Kusuma, S.Kom., M.Cs.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "+62 821-9876-5432"
  },
  {
    role: "dosen",
    nidn: "0012057801",
    nim: "0012057801",
    password: "123",
    name: "Dr. Ir. Hendra Setiawan, M.T.",
    email: "hendra.setiawan@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    fakultas: "Fakultas Ilmu Komputer",
    jabatan: "Dosen Lektor Kepala",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+62 811-2233-4455",
    taughtCourses: ["IF501", "IF502"]
  },
  {
    role: "dosen",
    nidn: "0028098302",
    nim: "0028098302",
    password: "123",
    name: "Maya Kusuma, S.Kom., M.Cs.",
    email: "maya.kusuma@univ-nusantara.ac.id",
    prodi: "S1 Sistem Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    jabatan: "Dosen Lektor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+62 813-8899-7766",
    taughtCourses: ["IF503", "IF505"]
  },
  {
    role: "admin",
    nip: "198504122010011002",
    nim: "admin",
    password: "123",
    name: "Bambang Sudarsono, S.Sos., M.M.",
    email: "akademik@univ-nusantara.ac.id",
    divisi: "Biro Administrasi Akademik & Kemahasiswaan (BAAK)",
    fakultas: "Rektorat / Universitas Nusantara Teknologi",
    jabatan: "Kepala Sub Bagian BAAK",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+62 812-9988-7711"
  }
];

const DEFAULT_STUDENTS = [
  {
    nim: "2024101001",
    name: "Budi Pratama Santoso",
    email: "budi.santoso@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    semester: 5,
    ipk: 3.84,
    sksLulus: 88,
    status: "Aktif",
    dosenPa: "Dr. Ir. Hendra Setiawan, M.T.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    nim: "2024101002",
    name: "Siti Nur Aminah",
    email: "siti.aminah@univ-nusantara.ac.id",
    prodi: "S1 Sistem Informasi",
    semester: 3,
    ipk: 3.78,
    sksLulus: 48,
    status: "Aktif",
    dosenPa: "Maya Kusuma, S.Kom., M.Cs.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    nim: "2024101003",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    semester: 5,
    ipk: 3.65,
    sksLulus: 84,
    status: "Aktif",
    dosenPa: "Dr. Ir. Hendra Setiawan, M.T.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    nim: "2024101004",
    name: "Rian Hidayat",
    email: "rian.hidayat@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    semester: 5,
    ipk: 3.52,
    sksLulus: 82,
    status: "Aktif",
    dosenPa: "Dr. Ir. Hendra Setiawan, M.T.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    nim: "2024101005",
    name: "Putri Ayu Larasati",
    email: "putri.larasati@univ-nusantara.ac.id",
    prodi: "S1 Sistem Informasi",
    semester: 3,
    ipk: 3.90,
    sksLulus: 52,
    status: "Aktif",
    dosenPa: "Maya Kusuma, S.Kom., M.Cs.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  }
];

const DEFAULT_LECTURERS = [
  {
    nidn: "0012057801",
    name: "Dr. Ir. Hendra Setiawan, M.T.",
    email: "hendra.setiawan@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    jabatan: "Dosen Lektor Kepala",
    courses: "Pemrograman Web Lanjut, Rekayasa Perangkat Lunak",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    nidn: "0028098302",
    name: "Maya Kusuma, S.Kom., M.Cs.",
    email: "maya.kusuma@univ-nusantara.ac.id",
    prodi: "S1 Sistem Informasi",
    jabatan: "Dosen Lektor",
    courses: "Basis Data Lanjut, Jaringan Komputer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    nidn: "0015037503",
    name: "Prof. Dr. Agus Wibowo, M.Sc.",
    email: "agus.wibowo@univ-nusantara.ac.id",
    prodi: "S1 Teknik Informatika",
    jabatan: "Guru Besar / Profesor",
    courses: "Kecerdasan Buatan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    nidn: "0009118804",
    name: "Rina Marlina, S.T., M.Kom.",
    email: "rina.marlina@univ-nusantara.ac.id",
    prodi: "S1 Sistem Informasi",
    jabatan: "Asisten Ahli",
    courses: "Manajemen Proyek TI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
];

const DEFAULT_CLASSES = [
  { code: "IF501-A", courseId: "IF501", courseName: "Pemrograman Web Lanjut", schedule: "Senin, 08:00 - 10:30", room: "Lab Komputer 3", lecturer: "Dr. Ir. Hendra Setiawan, M.T.", quota: 35, enrolled: 28 },
  { code: "IF502-A", courseId: "IF502", courseName: "Rekayasa Perangkat Lunak", schedule: "Selasa, 10:45 - 13:15", room: "Ruang 402 (Gedung B)", lecturer: "Dr. Ir. Hendra Setiawan, M.T.", quota: 35, enrolled: 30 },
  { code: "IF503-A", courseId: "IF503", courseName: "Basis Data Lanjut", schedule: "Rabu, 08:00 - 10:30", room: "Lab Basis Data", lecturer: "Maya Kusuma, S.Kom., M.Cs.", quota: 35, enrolled: 32 },
  { code: "IF504-A", courseId: "IF504", courseName: "Kecerdasan Buatan", schedule: "Kamis, 13:30 - 16:00", room: "Ruang 301 (Gedung A)", lecturer: "Prof. Dr. Agus Wibowo, M.Sc.", quota: 35, enrolled: 25 },
  { code: "IF505-A", courseId: "IF505", courseName: "Jaringan Komputer", schedule: "Jumat, 08:00 - 10:30", room: "Lab Jaringan", lecturer: "Maya Kusuma, S.Kom., M.Cs.", quota: 30, enrolled: 27 },
  { code: "IF506-A", courseId: "IF506", courseName: "Manajemen Proyek TI", schedule: "Jumat, 13:30 - 15:10", room: "Ruang 405 (Gedung B)", lecturer: "Rina Marlina, S.T., M.Kom.", quota: 40, enrolled: 35 }
];

const DEFAULT_ACADEMIC_SETTINGS = {
  activeSemester: "Semester Ganjil 2026/2027",
  isKrsOpen: true,
  isAcademicPeriodOpen: true,
  krsDeadline: "30 November 2026"
};

const DEFAULT_GRADES = [
  { nim: "2024101001", studentName: "Budi Pratama Santoso", courseId: "IF501", tugas: 92, uts: 88, uas: 90, nilaiAkhir: 89.8, grade: "A", isPublished: true },
  { nim: "2024101003", studentName: "Ahmad Fauzi", courseId: "IF501", tugas: 85, uts: 80, uas: 84, nilaiAkhir: 82.7, grade: "A-", isPublished: true },
  { nim: "2024101004", studentName: "Rian Hidayat", courseId: "IF501", tugas: 78, uts: 75, uas: 80, nilaiAkhir: 77.9, grade: "B+", isPublished: true },
  { nim: "2024101001", studentName: "Budi Pratama Santoso", courseId: "IF502", tugas: 95, uts: 90, uas: 92, nilaiAkhir: 92.1, grade: "A", isPublished: true },
  { nim: "2024101002", studentName: "Siti Nur Aminah", courseId: "IF503", tugas: 90, uts: 86, uas: 88, nilaiAkhir: 87.8, grade: "A", isPublished: true },
  { nim: "2024101005", studentName: "Putri Ayu Larasati", courseId: "IF503", tugas: 94, uts: 92, uas: 95, nilaiAkhir: 93.8, grade: "A", isPublished: true }
];

const DEFAULT_KRS_SUBMISSIONS = [
  {
    nim: "2024101001",
    name: "Budi Pratama Santoso",
    prodi: "S1 Teknik Informatika",
    semester: 5,
    selectedCodes: ["IF501", "IF502", "IF503", "IF504", "IF505", "IF506"],
    totalSks: 17,
    status: "Disetujui Dosen PA",
    submittedAt: "10 Nov 2026, 14:30 WIB",
    notes: "Pengajuan rencana studi semester 5 telah divalidasi dan disetujui Dosen PA."
  },
  {
    nim: "2024101002",
    name: "Siti Nur Aminah",
    prodi: "S1 Sistem Informasi",
    semester: 3,
    selectedCodes: ["IF503", "IF505", "IF506"],
    totalSks: 8,
    status: "Diajukan",
    submittedAt: "12 Nov 2026, 09:15 WIB",
    notes: "Mohon validasi KRS semester 3."
  },
  {
    nim: "2024101003",
    name: "Ahmad Fauzi",
    prodi: "S1 Teknik Informatika",
    semester: 5,
    selectedCodes: ["IF501", "IF502", "IF504"],
    totalSks: 9,
    status: "Menunggu Persetujuan",
    submittedAt: "13 Nov 2026, 11:00 WIB",
    notes: "Pengajuan KRS tahap 1."
  }
];

const AVATAR_PRESETS = [
  { name: "Mahasiswa 1 (Pria)", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswa 2 (Kacamata)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswi 1 (Wanita)", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswa 3 (Studio)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswi 2 (Kreatif)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswi 3 (Formal)", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswa 4 (Tech)", url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80" },
  { name: "Mahasiswi 4 (Senyum)", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80" }
];

const ORIGINAL_AVATARS = {
  "2024101001": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "2024101002": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "0012057801": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "0028098302": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  "admin": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
};

const INITIAL_COURSES = [
  {
    id: "IF501",
    code: "IF501",
    name: "Pemrograman Web Lanjut",
    sks: 3,
    lecturer: "Dr. Ir. Hendra Setiawan, M.T.",
    schedule: "Senin, 08:00 - 10:30",
    room: "Lab Komputer 3 (Gedung B)",
    color: "from-blue-600 to-indigo-700",
    attendanceRate: 92,
    totalMeetings: 16,
    meetingsDone: 10,
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    description: "Mempelajari pengembangan aplikasi web modern full-stack menggunakan arsitektur REST API, microservices, state management, dan cloud deployment.",
    meetings: [
      { num: 1, title: "Pengantar Framework Modern & Next-Gen Web", date: "15 Sep 2026", status: "Hadir", materials: "Slide Pertemuan 1 (PDF), Repository GitHub", video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" },
      { num: 2, title: "Arsitektur REST API & JWT Authentication", date: "22 Sep 2026", status: "Hadir", materials: "Modul Praktikum Auth & Security", video: "" },
      { num: 3, title: "State Management & React Hooks In-Depth", date: "29 Sep 2026", status: "Hadir", materials: "Slide Materi 3 & Code Example", video: "" },
      { num: 4, title: "Database Optimization & ORM Prisma", date: "06 Okt 2026", status: "Hadir", materials: "Cheatsheet SQL & Migration Guide", video: "" },
      { num: 5, title: "Microservices & Docker Containerization", date: "13 Okt 2026", status: "Izin", materials: "Dockerfile Template & Guide", video: "" },
      { num: 6, title: "CI/CD Pipeline dengan GitHub Actions", date: "20 Okt 2026", status: "Hadir", materials: "CI/CD Configuration Sample", video: "" },
      { num: 7, title: "Review Pra-UTS & Code Review", date: "27 Okt 2026", status: "Hadir", materials: "Kisi-kisi & Contoh Kasus UTS", video: "" },
      { num: 8, title: "Ujian Tengah Semester (UTS)", date: "03 Nov 2026", status: "Hadir", materials: "Soal UTS Praktikum", video: "" },
      { num: 9, title: "WebSocket & Real-time Communication", date: "10 Nov 2026", status: "Hadir", materials: "Socket.io Architecture Guide", video: "" },
      { num: 10, title: "Serverless & Cloud Function Deployment", date: "17 Nov 2026", status: "Belum Dimulai", materials: "Cloud Provider Overview", video: "" },
      { num: 11, title: "Web Performance & Lighthouse Optimization", date: "24 Nov 2026", status: "Belum Dimulai", materials: "Modul Optimasi Web", video: "" },
      { num: 12, title: "Progress Proyek Akhir Mahasiswa", date: "01 Des 2026", status: "Belum Dimulai", materials: "Template Laporan Akhir", video: "" }
    ]
  },
  {
    id: "IF502",
    code: "IF502",
    name: "Kecerdasan Buatan & Machine Learning",
    sks: 3,
    lecturer: "Prof. Bambang Suryono, Ph.D.",
    schedule: "Selasa, 13:00 - 15:30",
    room: "Ruang Teater 2 (Gedung A)",
    color: "from-purple-600 to-pink-600",
    attendanceRate: 100,
    totalMeetings: 16,
    meetingsDone: 9,
    banner: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
    description: "Konsep dasar kecerdasan buatan, supervised & unsupervised learning, deep learning neural networks, dan implementasi scikit-learn & PyTorch.",
    meetings: [
      { num: 1, title: "Foundations of Artificial Intelligence", date: "16 Sep 2026", status: "Hadir", materials: "Intro to AI & Python Setup", video: "" },
      { num: 2, title: "Linear Regression & Gradient Descent", date: "23 Sep 2026", status: "Hadir", materials: "Jupyter Notebook Linear Regression", video: "" },
      { num: 3, title: "Classification & Logistic Regression", date: "30 Sep 2026", status: "Hadir", materials: "Classification Metrics Slides", video: "" },
      { num: 4, title: "Decision Trees & Random Forests", date: "07 Okt 2026", status: "Hadir", materials: "Tree Algorithm Notebook", video: "" },
      { num: 5, title: "Clustering Algorithms (K-Means & DBSCAN)", date: "14 Okt 2026", status: "Hadir", materials: "Unsupervised Learning Guide", video: "" },
      { num: 6, title: "Introduction to Artificial Neural Networks", date: "21 Okt 2026", status: "Hadir", materials: "Deep Learning Primer", video: "" },
      { num: 7, title: "Convolutional Neural Networks (CNN) for Vision", date: "28 Okt 2026", status: "Hadir", materials: "PyTorch Vision Handbook", video: "" },
      { num: 8, title: "Ujian Tengah Semester (UTS)", date: "04 Nov 2026", status: "Hadir", materials: "Project Defense UTS", video: "" },
      { num: 9, title: "Natural Language Processing & Transformers", date: "11 Nov 2026", status: "Hadir", materials: "Transformer Architecture & LLMs", video: "" },
      { num: 10, title: "Prompt Engineering & RAG Implementation", date: "18 Nov 2026", status: "Belum Dimulai", materials: "Vector Database & Embeddings", video: "" }
    ]
  },
  {
    id: "IF503",
    code: "IF503",
    name: "Rekayasa Perangkat Lunak Terapan",
    sks: 3,
    lecturer: "Maya Kusuma, S.Kom., M.Cs.",
    schedule: "Rabu, 10:00 - 12:30",
    room: "Ruang Kelas 402",
    color: "from-emerald-600 to-teal-700",
    attendanceRate: 88,
    totalMeetings: 16,
    meetingsDone: 9,
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    description: "Metodologi Agile/Scrum, requirement engineering, pemodelan sistem UML, software architecture pattern, dan automated unit testing.",
    meetings: [
      { num: 1, title: "Software Development Lifecycle & Agile Scrum", date: "17 Sep 2026", status: "Hadir", materials: "Agile Manifesto & Jira Walkthrough", video: "" },
      { num: 2, title: "User Stories & Acceptance Criteria", date: "24 Sep 2026", status: "Hadir", materials: "Template SRS & Use Case Doc", video: "" },
      { num: 3, title: "Domain Driven Design & Clean Architecture", date: "01 Okt 2026", status: "Hadir", materials: "Architecture Pattern Slides", video: "" },
      { num: 4, title: "Test Driven Development (TDD)", date: "08 Okt 2026", status: "Sakit", materials: "Jest & Mocking Best Practices", video: "" },
      { num: 5, title: "Code Refactoring & Design Patterns", date: "15 Okt 2026", status: "Hadir", materials: "Gang of Four Catalog", video: "" }
    ]
  },
  {
    id: "IF504",
    code: "IF504",
    name: "Keamanan Jaringan & Cyber Security",
    sks: 3,
    lecturer: "Reza Pratama, M.T., CEH",
    schedule: "Kamis, 08:00 - 10:30",
    room: "Lab Cyber Security & Forensik",
    color: "from-rose-600 to-red-700",
    attendanceRate: 90,
    totalMeetings: 16,
    meetingsDone: 10,
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    description: "Fundamental ethical hacking, network vulnerability assessment, cryptography, OWASP Top 10 vulnerabilities, dan incident response.",
    meetings: [
      { num: 1, title: "Cyber Threat Landscape & CIA Triad", date: "18 Sep 2026", status: "Hadir", materials: "Security Overview & Virtual Lab Setup", video: "" },
      { num: 2, title: "Cryptography: Symmetric & Asymmetric Encryption", date: "25 Sep 2026", status: "Hadir", materials: "RSA, AES & Hashing Lab", video: "" },
      { num: 3, title: "Network Scanning & Port Enumeration", date: "02 Okt 2026", status: "Hadir", materials: "Nmap & Wireshark Cheatsheet", video: "" },
      { num: 4, title: "Web Vulnerabilities: SQL Injection & XSS", date: "09 Okt 2026", status: "Hadir", materials: "OWASP Top 10 Defense Guide", video: "" }
    ]
  },
  {
    id: "IF505",
    code: "IF505",
    name: "Cloud Computing & DevOps",
    sks: 3,
    lecturer: "David Kurniawan, M.T.",
    schedule: "Jumat, 09:00 - 11:30",
    room: "Ruang Online Zoom / Cloud Lab",
    color: "from-amber-500 to-orange-600",
    attendanceRate: 100,
    totalMeetings: 16,
    meetingsDone: 8,
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    description: "Arsitektur cloud IaaS, PaaS, SaaS, container orchestration dengan Kubernetes, Infrastructure as Code (Terraform), dan monitoring.",
    meetings: [
      { num: 1, title: "Cloud Fundamentals & AWS/GCP Overview", date: "19 Sep 2026", status: "Hadir", materials: "Cloud Essentials PDF", video: "" },
      { num: 2, title: "Compute & Virtual Machines in Cloud", date: "26 Sep 2026", status: "Hadir", materials: "VPC & Security Group Setup", video: "" }
    ]
  },
  {
    id: "IF506",
    code: "IF506",
    name: "Etika Profesi & Kewirausahaan IT",
    sks: 2,
    lecturer: "Dra. Hj. Ratna Sari, M.M.",
    schedule: "Jumat, 13:30 - 15:10",
    room: "Ruang 204 (Gedung C)",
    color: "from-teal-600 to-cyan-700",
    attendanceRate: 95,
    totalMeetings: 16,
    meetingsDone: 8,
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
    description: "Etika profesi informatika, hak cipta & HAKI, hukum UU ITE, dan pembentukan startup teknologi melalui Business Model Canvas (BMC).",
    meetings: [
      { num: 1, title: "Kode Etik Profesi IT & ACM/IEEE Standards", date: "19 Sep 2026", status: "Hadir", materials: "Slide Etika Profesi", video: "" }
    ]
  }
];

const INITIAL_ASSIGNMENTS = [
  {
    id: "TUGAS-01",
    courseId: "IF501",
    courseName: "Pemrograman Web Lanjut",
    title: "Implementasi REST API & JWT Authentication",
    description: "Buatlah backend service menggunakan Node.js/Express atau FastAPI yang mengimplementasikan auth JWT, role-based access control (Admin & Mahasiswa), refresh token, dan enkripsi password bcrypt. Lampirkan file project (ZIP) dan dokumentasi Postman Collection.",
    deadline: "2026-11-18T23:59:00",
    status: "Belum Dikumpulkan", // 'Belum Dikumpulkan' | 'Menunggu Dinilai' | 'Selesai'
    maxScore: 100,
    score: null,
    lecturerFeedback: null,
    submittedFile: null,
    submittedAt: null,
    notes: ""
  },
  {
    id: "TUGAS-02",
    courseId: "IF502",
    courseName: "Kecerdasan Buatan & Machine Learning",
    title: "Eksplorasi Algoritma Klasifikasi & Confusion Matrix",
    description: "Analisis dataset publik (misal Kaggle Iris/Heart Disease) menggunakan Logistic Regression, SVM, dan Random Forest. Berikan perbandingan metrik akurasi, precision, recall, F1-score serta visualisasi Confusion Matrix.",
    deadline: "2026-11-20T23:59:00",
    status: "Belum Dikumpulkan",
    maxScore: 100,
    score: null,
    lecturerFeedback: null,
    submittedFile: null,
    submittedAt: null,
    notes: ""
  },
  {
    id: "TUGAS-03",
    courseId: "IF503",
    courseName: "Rekayasa Perangkat Lunak Terapan",
    title: "Pemodelan Arsitektur UML & Dokumen SRS Agile",
    description: "Susun dokumen Software Requirement Specification (SRS) untuk studi kasus Sistem Perpustakaan Digital Kampus. Buatlah Use Case Diagram, Activity Diagram, Sequence Diagram, dan ERD terintegrasi.",
    deadline: "2026-11-08T23:59:00",
    status: "Selesai",
    maxScore: 100,
    score: 96,
    lecturerFeedback: "Sangat luar biasa! Sequence diagram sangat detail dan pemisahan arsitektur domain logic sangat rapi. Pertahankan kualitas ini.",
    submittedFile: {
      name: "Tugas3_RPL_BudiSantoso_2024101001.pdf",
      size: "3.4 MB",
      type: "application/pdf"
    },
    submittedAt: "2026-11-07 14:22:10",
    notes: "Sudah dilengkapi dengan lampiran skema basis data normalisasi 3NF."
  },
  {
    id: "TUGAS-04",
    courseId: "IF504",
    courseName: "Keamanan Jaringan & Cyber Security",
    title: "Laporan Security Vulnerability Audit (OWASP Top 10)",
    description: "Lakukan penetrasi simulasi pada lingkungan DVWA (Damn Vulnerable Web App) untuk celah SQLi dan Reflected XSS. Tuliskan metodologi exploit, bukti screenshot (PoC), dan rekomendasi patch mitigasi.",
    deadline: "2026-11-22T23:59:00",
    status: "Menunggu Dinilai",
    maxScore: 100,
    score: null,
    lecturerFeedback: null,
    submittedFile: {
      name: "Security_Audit_Report_Budi_2024101001.pdf",
      size: "4.8 MB",
      type: "application/pdf"
    },
    submittedAt: "2026-11-13 20:15:45",
    notes: "Sudah mencantumkan bypass payload dan perbaikan parameter query."
  }
];

const KATALOG_KRS = [
  { code: "IF501", name: "Pemrograman Web Lanjut", sks: 3, semester: 5, lecturer: "Dr. Ir. Hendra Setiawan, M.T.", schedule: "Senin, 08:00 - 10:30", capacity: "40/40 (Penuh)", room: "Lab Komputer 3" },
  { code: "IF502", name: "Kecerdasan Buatan & Machine Learning", sks: 3, semester: 5, lecturer: "Prof. Bambang Suryono, Ph.D.", schedule: "Selasa, 13:00 - 15:30", capacity: "38/40", room: "Ruang Teater 2" },
  { code: "IF503", name: "Rekayasa Perangkat Lunak Terapan", sks: 3, semester: 5, lecturer: "Maya Kusuma, S.Kom., M.Cs.", schedule: "Rabu, 10:00 - 12:30", capacity: "35/40", room: "Ruang 402" },
  { code: "IF504", name: "Keamanan Jaringan & Cyber Security", sks: 3, semester: 5, lecturer: "Reza Pratama, M.T., CEH", schedule: "Kamis, 08:00 - 10:30", capacity: "36/40", room: "Lab Cyber" },
  { code: "IF505", name: "Cloud Computing & DevOps", sks: 3, semester: 5, lecturer: "David Kurniawan, M.T.", schedule: "Jumat, 09:00 - 11:30", capacity: "39/40", room: "Cloud Lab" },
  { code: "IF506", name: "Etika Profesi & Kewirausahaan IT", sks: 2, semester: 5, lecturer: "Dra. Hj. Ratna Sari, M.M.", schedule: "Jumat, 13:30 - 15:10", capacity: "30/40", room: "Ruang 204" },
  { code: "IF507", name: "Big Data Analytics & Data Warehousing", sks: 3, semester: 5, lecturer: "Dr. Wahyu Wibowo, S.Si., M.Sc.", schedule: "Sabtu, 08:00 - 10:30", capacity: "25/40", room: "Lab Data" },
  { code: "IF508", name: "Pengembangan Aplikasi Mobile (Flutter)", sks: 3, semester: 5, lecturer: "Anugrah Perkasa, M.Kom.", schedule: "Kamis, 13:00 - 15:30", capacity: "32/40", room: "Lab Mobile" },
  { code: "IF509", name: "Internet of Things (IoT) & Embedded System", sks: 3, semester: 5, lecturer: "Ir. Gunawan Santoso, M.T.", schedule: "Rabu, 14:00 - 16:30", capacity: "28/40", room: "Lab Hardware" },
  { code: "IF510", name: "Interaksi Manusia & Komputer (UI/UX Design)", sks: 2, semester: 5, lecturer: "Jessica Amanda, M.Ds.", schedule: "Senin, 13:00 - 14:40", capacity: "34/40", room: "Lab Multimedia" }
];

// App State
let state = {
  currentUser: null,
  activeTab: 'dashboard',
  selectedCourseId: null,
  courses: [],
  assignments: [],
  students: [],
  lecturers: [],
  classes: [],
  academicSettings: { ...DEFAULT_ACADEMIC_SETTINGS },
  grades: [],
  krsSubmissions: [],
  selectedKrsCodes: ["IF501", "IF502", "IF503", "IF504", "IF505", "IF506"], // Default 17 SKS
  krsStatus: "Disetujui Dosen PA", // 'Draft' | 'Diajukan' | 'Disetujui Dosen PA'
  notifications: [
    { id: 1, title: "Tugas Baru", desc: "Tugas 1 Pemrograman Web Lanjut telah dibuka.", time: "2 jam lalu", read: false },
    { id: 2, title: "Nilai Diterbitkan", desc: "Dosen RPL telah memberikan nilai 96 untuk Tugas 3.", time: "1 hari lalu", read: false },
    { id: 3, title: "Pengumuman KRS", desc: "Periode validasi KRS semester ganjil berakhir pada 30 November.", time: "2 hari lalu", read: true }
  ]
};

const ROLE_PERMISSIONS = {
  mahasiswa: ['dashboard', 'courses', 'course-detail', 'attendance', 'krs', 'assignments', 'profile'],
  dosen: ['dosen-dashboard', 'dosen-classes', 'dosen-attendance', 'dosen-assignments', 'dosen-grades', 'profile'],
  admin: ['admin-dashboard', 'admin-students', 'admin-lecturers', 'admin-courses', 'admin-classes', 'admin-krs', 'profile']
};

// ==========================================
// 2. LIFECYCLE & STORAGE HELPERS
// ==========================================

function initApp() {
  loadFromStorage();
  checkAuth();
  setupEventListeners();
  setupLiveTime();
  if (window.lucide) {
    lucide.createIcons();
  }
}

function loadFromStorage() {
  // Load custom avatars map
  const savedAvatars = localStorage.getItem(STORAGE_KEYS.CUSTOM_AVATARS);
  if (savedAvatars) {
    try {
      const avatarMap = JSON.parse(savedAvatars);
      DEFAULT_USERS.forEach(u => {
        const id = u.nim || u.nidn || u.nip;
        if (id && avatarMap[id]) u.avatar = avatarMap[id];
      });
      DEFAULT_STUDENTS.forEach(s => {
        if (avatarMap[s.nim]) s.avatar = avatarMap[s.nim];
      });
      DEFAULT_LECTURERS.forEach(l => {
        if (avatarMap[l.nidn]) l.avatar = avatarMap[l.nidn];
      });
    } catch(e) {}
  }

  const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
  if (savedUser) {
    state.currentUser = JSON.parse(savedUser);
  }

  const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
  state.courses = savedCourses ? JSON.parse(savedCourses) : INITIAL_COURSES;

  const savedAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  state.assignments = savedAssignments ? JSON.parse(savedAssignments) : INITIAL_ASSIGNMENTS;

  const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  state.students = savedStudents ? JSON.parse(savedStudents) : DEFAULT_STUDENTS;

  const savedLecturers = localStorage.getItem(STORAGE_KEYS.LECTURERS);
  state.lecturers = savedLecturers ? JSON.parse(savedLecturers) : DEFAULT_LECTURERS;

  const savedClasses = localStorage.getItem(STORAGE_KEYS.CLASSES);
  state.classes = savedClasses ? JSON.parse(savedClasses) : DEFAULT_CLASSES;

  const savedAcademic = localStorage.getItem(STORAGE_KEYS.ACADEMIC_SETTINGS);
  state.academicSettings = savedAcademic ? JSON.parse(savedAcademic) : { ...DEFAULT_ACADEMIC_SETTINGS };

  const savedGrades = localStorage.getItem(STORAGE_KEYS.GRADES);
  state.grades = savedGrades ? JSON.parse(savedGrades) : DEFAULT_GRADES;

  const savedKrsSubmissions = localStorage.getItem(STORAGE_KEYS.KRS_SUBMISSIONS);
  state.krsSubmissions = savedKrsSubmissions ? JSON.parse(savedKrsSubmissions) : DEFAULT_KRS_SUBMISSIONS;

  const savedKrs = localStorage.getItem(STORAGE_KEYS.KRS);
  if (savedKrs) {
    const parsedKrs = JSON.parse(savedKrs);
    state.selectedKrsCodes = parsedKrs.selectedKrsCodes || state.selectedKrsCodes;
    state.krsStatus = parsedKrs.krsStatus || state.krsStatus;
  }
}

function saveToStorage() {
  if (state.currentUser) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.currentUser));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(state.courses));
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(state.assignments));
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(state.students));
  localStorage.setItem(STORAGE_KEYS.LECTURERS, JSON.stringify(state.lecturers));
  localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(state.classes));
  localStorage.setItem(STORAGE_KEYS.ACADEMIC_SETTINGS, JSON.stringify(state.academicSettings));
  localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(state.grades));
  localStorage.setItem(STORAGE_KEYS.KRS_SUBMISSIONS, JSON.stringify(state.krsSubmissions));
  localStorage.setItem(STORAGE_KEYS.KRS, JSON.stringify({
    selectedKrsCodes: state.selectedKrsCodes,
    krsStatus: state.krsStatus
  }));
}

// ==========================================
// 3. AUTHENTICATION & ROLE CONTROLLER
// ==========================================

function switchLoginDemoTab(role) {
  const mhsTab = document.getElementById('btn-login-tab-mhs');
  const dosenTab = document.getElementById('btn-login-tab-dosen');
  const adminTab = document.getElementById('btn-login-tab-admin');
  const mhsList = document.getElementById('demo-list-mahasiswa');
  const dosenList = document.getElementById('demo-list-dosen');
  const adminList = document.getElementById('demo-list-admin');

  [mhsTab, dosenTab, adminTab].forEach(btn => {
    if (btn) {
      btn.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
      btn.classList.add('hover:text-slate-900');
    }
  });
  [mhsList, dosenList, adminList].forEach(el => {
    if (el) el.classList.add('hidden');
  });

  if (role === 'mahasiswa') {
    if (mhsTab) { mhsTab.classList.add('bg-white', 'text-indigo-600', 'shadow-sm'); mhsTab.classList.remove('hover:text-slate-900'); }
    if (mhsList) mhsList.classList.remove('hidden');
  } else if (role === 'dosen') {
    if (dosenTab) { dosenTab.classList.add('bg-white', 'text-indigo-600', 'shadow-sm'); dosenTab.classList.remove('hover:text-slate-900'); }
    if (dosenList) dosenList.classList.remove('hidden');
  } else if (role === 'admin') {
    if (adminTab) { adminTab.classList.add('bg-white', 'text-indigo-600', 'shadow-sm'); adminTab.classList.remove('hover:text-slate-900'); }
    if (adminList) adminList.classList.remove('hidden');
  }
  if (window.lucide) lucide.createIcons();
}

function quickLoginUser(identifier) {
  const nimInput = document.getElementById('login-nim');
  const passInput = document.getElementById('login-password');
  if (nimInput && passInput) {
    nimInput.value = identifier;
    passInput.value = '123';
    handleLogin(identifier, '123');
  }
}

function quickLogin(index) {
  const target = DEFAULT_USERS[index];
  if (target) {
    quickLoginUser(target.nim || target.nidn || target.nip);
  }
}

function checkAuth() {
  const authContainer = document.getElementById('auth-container');
  const mainAppContainer = document.getElementById('main-app-container');

  if (!state.currentUser) {
    authContainer.classList.remove('hidden');
    mainAppContainer.classList.add('hidden');
  } else {
    authContainer.classList.add('hidden');
    mainAppContainer.classList.remove('hidden');
    renderUserIdentity();
    
    // Validate that current activeTab matches role permissions
    const userRole = state.currentUser.role || 'mahasiswa';
    const allowed = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.mahasiswa;
    if (!state.activeTab || !allowed.includes(state.activeTab)) {
      state.activeTab = userRole === 'dosen' ? 'dosen-dashboard' : (userRole === 'admin' ? 'admin-dashboard' : 'dashboard');
    }
    navigate(state.activeTab);
  }
}

function handleLogin(nimQuery, password) {
  const q = (nimQuery || '').trim().toLowerCase();
  
  // Find in DEFAULT_USERS or state.students / state.lecturers
  let user = DEFAULT_USERS.find(u => {
    const matchId = (u.nim && u.nim.toLowerCase() === q) || 
                    (u.nidn && u.nidn.toLowerCase() === q) || 
                    (u.nip && u.nip.toLowerCase() === q) || 
                    (u.email && u.email.toLowerCase() === q) ||
                    (u.role === 'admin' && q === 'admin');
    return matchId && u.password === password;
  });

  // If newly added student logged in
  if (!user && state.students) {
    const st = state.students.find(s => (s.nim.toLowerCase() === q || s.email.toLowerCase() === q) && (s.password ? s.password === password : password === '123'));
    if (st) {
      user = {
        role: "mahasiswa",
        ...st,
        password: st.password || "123",
        fakultas: "Fakultas Ilmu Komputer",
        maxSks: 24
      };
    }
  }

  // If newly added lecturer logged in
  if (!user && state.lecturers) {
    const lec = state.lecturers.find(l => (l.nidn.toLowerCase() === q || l.email.toLowerCase() === q) && (l.password ? l.password === password : password === '123'));
    if (lec) {
      user = {
        role: "dosen",
        ...lec,
        password: lec.password || "123",
        fakultas: "Fakultas Ilmu Komputer",
        nim: lec.nidn,
        taughtCourses: ["IF501"]
      };
    }
  }
  
  if (user) {
    state.currentUser = { ...user };
    const userRole = user.role || 'mahasiswa';
    state.activeTab = userRole === 'dosen' ? 'dosen-dashboard' : (userRole === 'admin' ? 'admin-dashboard' : 'dashboard');
    saveToStorage();
    showToast('success', 'Login Berhasil', `Selamat datang, ${user.name}!`);
    checkAuth();
  } else {
    showToast('error', 'Login Gagal', 'NIM/NIDN/NIP atau Kata Sandi yang Anda masukkan tidak sesuai.');
    const card = document.getElementById('login-card');
    if (card) {
      card.classList.add('animate-shake');
      setTimeout(() => card.classList.remove('animate-shake'), 600);
    }
  }
}

function handleLogout() {
  state.currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.USER);
  showToast('info', 'Sampai Jumpa', 'Anda telah berhasil keluar dari sistem LMS.');
  checkAuth();
}

function renderUserIdentity() {
  const user = state.currentUser;
  if (!user) return;

  // Header and sidebar text bindings
  document.querySelectorAll('.bind-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.bind-user-nim').forEach(el => el.textContent = user.nim || user.nidn || user.nip || '-');
  document.querySelectorAll('.bind-user-prodi').forEach(el => el.textContent = user.prodi || user.divisi || 'Universitas Nusantara');
  document.querySelectorAll('.bind-user-semester').forEach(el => el.textContent = user.semester ? `Semester ${user.semester}` : (user.jabatan || 'Staf'));
  document.querySelectorAll('.bind-user-avatar').forEach(el => {
    if (el.tagName === 'IMG') el.src = user.avatar;
  });
  if (user.ipk !== undefined) {
    document.querySelectorAll('.bind-user-ipk').forEach(el => el.textContent = typeof user.ipk === 'number' ? user.ipk.toFixed(2) : user.ipk);
  }
  if (user.dosenPa) {
    document.querySelectorAll('.bind-user-dosen-pa').forEach(el => el.textContent = user.dosenPa);
  }

  // Role Badge in Header
  const roleBadge = document.getElementById('user-role-badge');
  if (roleBadge) {
    if (user.role === 'dosen') {
      roleBadge.textContent = 'Dosen Pengampu';
      roleBadge.className = 'px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200';
    } else if (user.role === 'admin') {
      roleBadge.textContent = 'Admin BAAK';
      roleBadge.className = 'px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-800 border border-purple-200';
    } else {
      roleBadge.textContent = 'Mahasiswa';
      roleBadge.className = 'px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200';
    }
  }

  // Toggle Nav Groups in Sidebar (Desktop & Mobile)
  const navMhs = document.getElementById('nav-group-mahasiswa');
  const navDosen = document.getElementById('nav-group-dosen');
  const navAdmin = document.getElementById('nav-group-admin');
  const mNavMhs = document.getElementById('mobile-nav-group-mahasiswa');
  const mNavDosen = document.getElementById('mobile-nav-group-dosen');
  const mNavAdmin = document.getElementById('mobile-nav-group-admin');

  [navMhs, navDosen, navAdmin, mNavMhs, mNavDosen, mNavAdmin].forEach(el => {
    if (el) el.classList.add('hidden');
  });

  if (user.role === 'dosen') {
    if (navDosen) navDosen.classList.remove('hidden');
    if (mNavDosen) mNavDosen.classList.remove('hidden');
  } else if (user.role === 'admin') {
    if (navAdmin) navAdmin.classList.remove('hidden');
    if (mNavAdmin) mNavAdmin.classList.remove('hidden');
  } else {
    if (navMhs) navMhs.classList.remove('hidden');
    if (mNavMhs) mNavMhs.classList.remove('hidden');
  }

  // Sidebar mini role indicator
  const sidebarRoleIndicator = document.getElementById('sidebar-role-indicator');
  if (sidebarRoleIndicator) {
    if (user.role === 'dosen') {
      sidebarRoleIndicator.innerHTML = `
        <span class="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">Dosen Aktif</span>
        <span class="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full truncate">NIDN: ${user.nidn || user.nim}</span>
      `;
    } else if (user.role === 'admin') {
      sidebarRoleIndicator.innerHTML = `
        <span class="text-[10px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full">Admin BAAK</span>
        <span class="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">Sistem</span>
      `;
    } else {
      sidebarRoleIndicator.innerHTML = `
        <span class="bind-user-semester text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">Sem ${user.semester || 5}</span>
        <span class="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">IPK: <span class="bind-user-ipk">${user.ipk ? (typeof user.ipk === 'number' ? user.ipk.toFixed(2) : user.ipk) : '3.84'}</span></span>
      `;
    }
  }
}

// ==========================================
// 4. NAVIGATION & ROLE-BASED ROUTING
// ==========================================

function navigate(tabId, param = null) {
  const user = state.currentUser;
  const userRole = user ? user.role : 'mahasiswa';
  const allowedTabs = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.mahasiswa;

  // Role Access Guard
  if (!allowedTabs.includes(tabId)) {
    const fallbackTab = userRole === 'dosen' ? 'dosen-dashboard' : (userRole === 'admin' ? 'admin-dashboard' : 'dashboard');
    showToast('error', 'Akses Terbatas', 'Akun Anda tidak memiliki izin untuk membuka menu tersebut.');
    return navigate(fallbackTab);
  }

  state.activeTab = tabId;
  if (param) state.selectedCourseId = param;

  // Update nav sidebar styles
  document.querySelectorAll('.nav-link').forEach(btn => {
    const target = btn.dataset.tab;
    if (target === tabId) {
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100', 'hover:text-slate-900');
    } else {
      btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100', 'hover:text-slate-900');
    }
  });

  // Hide all sections
  document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));

  // Show active section
  const activeSection = document.getElementById(`section-${tabId}`);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    activeSection.classList.add('fade-in');
  }

  // Close mobile sidebar if open
  closeMobileMenu();

  // Route-specific renderers
  switch (tabId) {
    // Mahasiswa Routes
    case 'dashboard':
      renderDashboard();
      break;
    case 'courses':
      renderCourses();
      break;
    case 'course-detail':
      renderCourseDetail(state.selectedCourseId);
      break;
    case 'attendance':
      renderAttendanceSection();
      break;
    case 'krs':
      renderKrsSection();
      break;
    case 'assignments':
      renderAssignmentsSection();
      break;

    // Dosen Routes
    case 'dosen-dashboard':
      renderDosenDashboard();
      break;
    case 'dosen-classes':
      renderDosenClasses();
      break;
    case 'dosen-attendance':
      renderDosenAttendance();
      break;
    case 'dosen-assignments':
      renderDosenAssignments();
      break;
    case 'dosen-grades':
      renderDosenGrades();
      break;

    // Admin Routes
    case 'admin-dashboard':
      renderAdminDashboard();
      break;
    case 'admin-students':
      renderAdminStudents();
      break;
    case 'admin-lecturers':
      renderAdminLecturers();
      break;
    case 'admin-courses':
      renderAdminCourses();
      break;
    case 'admin-classes':
      renderAdminClasses();
      break;
    case 'admin-krs':
      renderAdminKrs();
      break;

    // Shared Profile Route
    case 'profile':
      renderProfileSection();
      break;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 5. VIEW RENDERERS
// ==========================================

// --- DASHBOARD ---
function renderDashboard() {
  const user = state.currentUser;
  if (!user) return;

  const totalSks = calculateSelectedSks();
  const activeCourses = state.courses.length;
  const pendingTasks = state.assignments.filter(a => a.status === 'Belum Dikumpulkan').length;

  // Stats cards
  const elIpk = document.getElementById('stat-ipk');
  const elSks = document.getElementById('stat-sks');
  const elCourses = document.getElementById('stat-courses');
  const elTasks = document.getElementById('stat-tasks');
  const elAttendanceRate = document.getElementById('stat-attendance');

  if (elIpk) elIpk.textContent = user.ipk.toFixed(2);
  if (elSks) elSks.textContent = `${totalSks} SKS`;
  if (elCourses) elCourses.textContent = `${activeCourses} Matkul`;
  if (elTasks) elTasks.textContent = `${pendingTasks} Perlu Dikirim`;

  // Calculate average attendance
  const avgAtt = Math.round(state.courses.reduce((acc, c) => acc + c.attendanceRate, 0) / (state.courses.length || 1));
  if (elAttendanceRate) elAttendanceRate.textContent = `${avgAtt}%`;

  // Render Today's Schedule
  const scheduleContainer = document.getElementById('dashboard-schedule-container');
  if (scheduleContainer) {
    scheduleContainer.innerHTML = `
      <div class="space-y-3">
        <div class="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition hover:shadow-sm">
          <div class="flex items-start space-x-3">
            <div class="p-2.5 rounded-lg bg-indigo-600 text-white font-bold flex flex-col items-center justify-center min-w-[54px]">
              <span class="text-xs uppercase tracking-wider">Senin</span>
              <span class="text-base leading-none mt-0.5">08:00</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">Hari Ini</span>
                <span class="text-xs text-slate-500 font-medium">3 SKS • Lab Komputer 3</span>
              </div>
              <h4 class="font-bold text-slate-800 text-base mt-0.5">Pemrograman Web Lanjut</h4>
              <p class="text-xs text-slate-500">Dr. Ir. Hendra Setiawan, M.T. • Pertemuan 10</p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center">
            <button onclick="openAttendanceModal('IF501', 10)" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition">
              <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
              Presensi Sekarang
            </button>
            <button onclick="navigate('course-detail', 'IF501')" class="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition">
              Buka Kelas
            </button>
          </div>
        </div>

        <div class="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition hover:shadow-sm">
          <div class="flex items-start space-x-3">
            <div class="p-2.5 rounded-lg bg-slate-100 text-slate-700 font-bold flex flex-col items-center justify-center min-w-[54px]">
              <span class="text-xs uppercase tracking-wider">Selasa</span>
              <span class="text-base leading-none mt-0.5">13:00</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">Besok</span>
                <span class="text-xs text-slate-500 font-medium">3 SKS • Ruang Teater 2</span>
              </div>
              <h4 class="font-bold text-slate-800 text-base mt-0.5">Kecerdasan Buatan & Machine Learning</h4>
              <p class="text-xs text-slate-500">Prof. Bambang Suryono, Ph.D. • Pertemuan 10</p>
            </div>
          </div>
          <button onclick="navigate('course-detail', 'IF502')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg self-end sm:self-center transition">
            Lihat Materi
          </button>
        </div>
      </div>
    `;
  }

  // Render Course Cards Grid in Dashboard
  const coursesGrid = document.getElementById('dashboard-courses-grid');
  if (coursesGrid) {
    coursesGrid.innerHTML = state.courses.slice(0, 4).map(c => `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
        <div class="h-28 relative overflow-hidden bg-gradient-to-r ${c.color}">
          <img src="${c.banner}" alt="${c.name}" class="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 p-4 flex flex-col justify-between text-white">
            <div class="flex justify-between items-start">
              <span class="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-black/30 backdrop-blur-md">${c.code}</span>
              <span class="px-2 py-0.5 rounded text-xs font-semibold bg-white/20 backdrop-blur-md">${c.sks} SKS</span>
            </div>
            <div class="text-xs text-white/90 truncate">${c.schedule}</div>
          </div>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">${c.name}</h3>
            <p class="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <i data-lucide="user" class="w-3.5 h-3.5"></i>
              ${c.lecturer}
            </p>

            <div class="mt-4">
              <div class="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Progress Materi</span>
                <span>${c.meetingsDone}/${c.totalMeetings} Sesi</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div class="bg-indigo-600 h-2 rounded-full transition-all duration-500" style="width: ${(c.meetingsDone / c.totalMeetings) * 100}%"></div>
              </div>
            </div>
          </div>

          <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div class="text-xs font-semibold ${c.attendanceRate >= 80 ? 'text-emerald-600' : 'text-amber-600'} flex items-center gap-1">
              <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i>
              Hadir: ${c.attendanceRate}%
            </div>
            <button onclick="navigate('course-detail', '${c.id}')" class="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Masuk Kelas
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Upcoming Tasks in Dashboard
  const tasksContainer = document.getElementById('dashboard-tasks-container');
  if (tasksContainer) {
    const activeTasks = state.assignments.filter(a => a.status !== 'Selesai');
    if (activeTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <i data-lucide="check-circle" class="w-10 h-10 mx-auto text-emerald-500 mb-2"></i>
          <p class="text-sm font-medium text-slate-600">Semua tugas Anda telah selesai dikerjakan!</p>
        </div>
      `;
    } else {
      tasksContainer.innerHTML = activeTasks.map(t => {
        const isSubmitted = t.status === 'Menunggu Dinilai';
        return `
          <div class="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div class="flex items-start gap-3">
              <div class="p-2.5 rounded-lg ${isSubmitted ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}">
                <i data-lucide="${isSubmitted ? 'clock' : 'file-text'}" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="text-xs font-semibold text-indigo-600">${t.courseName}</span>
                <h4 class="font-bold text-slate-800 text-sm mt-0.5">${t.title}</h4>
                <p class="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>Batas: ${formatDateTime(t.deadline)}</span>
                  <span>•</span>
                  <span class="font-medium ${isSubmitted ? 'text-amber-600' : 'text-rose-600'}">${t.status}</span>
                </p>
              </div>
            </div>
            <button onclick="openUploadModal('${t.id}')" class="px-3.5 py-2 text-xs font-bold rounded-lg ${isSubmitted ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'} transition flex items-center justify-center gap-1.5">
              <i data-lucide="${isSubmitted ? 'eye' : 'upload-cloud'}" class="w-3.5 h-3.5"></i>
              ${isSubmitted ? 'Lihat Pengumpulan' : 'Upload Jawaban'}
            </button>
          </div>
        `;
      }).join('');
    }
  }
}

// --- COURSES LIST ---
function renderCourses() {
  const container = document.getElementById('courses-list-grid');
  const searchInput = document.getElementById('courses-search-input');
  const query = (searchInput ? searchInput.value : '').toLowerCase();

  const filtered = state.courses.filter(c => 
    c.name.toLowerCase().includes(query) || 
    c.code.toLowerCase().includes(query) || 
    c.lecturer.toLowerCase().includes(query)
  );

  if (container) {
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
          <i data-lucide="search-x" class="w-12 h-12 mx-auto text-slate-300 mb-3"></i>
          <p class="text-base font-semibold text-slate-600">Tidak ada mata kuliah yang cocok.</p>
          <p class="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(c => `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group">
          <div class="h-36 relative overflow-hidden bg-gradient-to-r ${c.color}">
            <img src="${c.banner}" alt="${c.name}" class="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 p-5 flex flex-col justify-between text-white">
              <div class="flex justify-between items-start">
                <span class="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md">${c.code}</span>
                <span class="px-2.5 py-1 rounded text-xs font-bold bg-white/20 backdrop-blur-md">${c.sks} SKS</span>
              </div>
              <div>
                <p class="text-xs font-medium text-white/80">${c.schedule}</p>
                <p class="text-xs text-white/70 truncate">${c.room}</p>
              </div>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors">${c.name}</h3>
              <p class="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
                <i data-lucide="user-check" class="w-4 h-4 text-indigo-500"></i>
                ${c.lecturer}
              </p>
              <p class="text-xs text-slate-600 mt-3 line-clamp-2">${c.description}</p>

              <div class="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Kemajuan Pembelajaran</span>
                  <span>${c.meetingsDone} dari ${c.totalMeetings} Sesi</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div class="bg-indigo-600 h-2 rounded-full" style="width: ${(c.meetingsDone / c.totalMeetings) * 100}%"></div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 text-xs font-bold ${c.attendanceRate >= 80 ? 'text-emerald-600' : 'text-amber-600'}">
                <i data-lucide="pie-chart" class="w-4 h-4"></i>
                Absensi: ${c.attendanceRate}%
              </div>
              <button onclick="navigate('course-detail', '${c.id}')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                Akses Materi
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

// --- COURSE DETAIL ---
function renderCourseDetail(courseId) {
  const course = state.courses.find(c => c.id === courseId) || state.courses[0];
  if (!course) return;

  const header = document.getElementById('course-detail-header');
  if (header) {
    header.innerHTML = `
      <div class="rounded-3xl overflow-hidden relative bg-gradient-to-r ${course.color} text-white shadow-lg p-6 sm:p-8">
        <img src="${course.banner}" alt="${course.name}" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none">
        <div class="relative z-10">
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <button onclick="navigate('courses')" class="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold flex items-center gap-1 transition">
              <i data-lucide="arrow-left" class="w-3 h-3"></i>
              Kembali ke Daftar Matkul
            </button>
            <span class="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold uppercase tracking-wider">${course.code}</span>
            <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">${course.sks} SKS</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-black tracking-tight">${course.name}</h1>
          <p class="text-sm text-white/90 mt-2 max-w-2xl">${course.description}</p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20 text-xs">
            <div class="flex items-center gap-2.5">
              <div class="p-2 rounded-lg bg-white/20 backdrop-blur-md"><i data-lucide="user" class="w-4 h-4"></i></div>
              <div>
                <p class="text-white/70">Dosen Pengampu</p>
                <p class="font-bold text-white text-sm">${course.lecturer}</p>
              </div>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="p-2 rounded-lg bg-white/20 backdrop-blur-md"><i data-lucide="calendar" class="w-4 h-4"></i></div>
              <div>
                <p class="text-white/70">Jadwal Perkuliahan</p>
                <p class="font-bold text-white text-sm">${course.schedule}</p>
              </div>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="p-2 rounded-lg bg-white/20 backdrop-blur-md"><i data-lucide="map-pin" class="w-4 h-4"></i></div>
              <div>
                <p class="text-white/70">Ruangan</p>
                <p class="font-bold text-white text-sm">${course.room}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Meetings / Syllabus
  const meetingsContainer = document.getElementById('course-meetings-container');
  if (meetingsContainer) {
    meetingsContainer.innerHTML = course.meetings.map(m => {
      let badgeClass = "bg-slate-100 text-slate-600";
      if (m.status === "Hadir") badgeClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
      if (m.status === "Izin" || m.status === "Sakit") badgeClass = "bg-amber-100 text-amber-700 border border-amber-200";

      return `
        <div class="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm hover:border-indigo-300 transition">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center shrink-0">
                #${m.num}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-semibold text-slate-400">${m.date}</span>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${badgeClass}">
                    ${m.status}
                  </span>
                </div>
                <h4 class="font-bold text-slate-800 text-base mt-0.5">${m.title}</h4>
                <p class="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-400"></i>
                  Bahan: ${m.materials}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 self-end sm:self-center">
              ${m.status === 'Belum Dimulai' ? `
                <button onclick="openAttendanceModal('${course.id}', ${m.num})" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition">
                  <i data-lucide="check-square" class="w-3.5 h-3.5"></i>
                  Isi Presensi
                </button>
              ` : `
                <button disabled class="px-3 py-1.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed">
                  Telah Dicatat
                </button>
              `}
              <button onclick="openMaterialPreview('${m.title}', '${m.materials}')" class="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                Unduh Slide
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render course-specific assignments
  const assignmentsContainer = document.getElementById('course-assignments-container');
  if (assignmentsContainer) {
    const courseTasks = state.assignments.filter(a => a.courseId === course.id);
    if (courseTasks.length === 0) {
      assignmentsContainer.innerHTML = `
        <div class="p-8 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto text-slate-300 mb-2"></i>
          <p class="text-sm font-semibold text-slate-600">Belum ada tugas untuk mata kuliah ini.</p>
        </div>
      `;
    } else {
      assignmentsContainer.innerHTML = courseTasks.map(t => `
        <div class="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${
                t.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
                t.status === 'Menunggu Dinilai' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
              }">${t.status}</span>
              <span class="text-xs text-slate-500">Tenggat: ${formatDateTime(t.deadline)}</span>
            </div>
            <h4 class="font-bold text-slate-800 text-base mt-1">${t.title}</h4>
            <p class="text-xs text-slate-600 mt-1 max-w-xl">${t.description}</p>
            ${t.score !== null ? `
              <div class="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                Nilai: ${t.score} / ${t.maxScore}
              </div>
            ` : ''}
          </div>
          <button onclick="openUploadModal('${t.id}')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2 shrink-0">
            <i data-lucide="upload" class="w-4 h-4"></i>
            ${t.status === 'Selesai' ? 'Lihat Detail Nilai' : 'Kirim Berkas Tugas'}
          </button>
        </div>
      `).join('');
    }
  }
}

// --- ATTENDANCE (PRESENSI) SECTION ---
function renderAttendanceSection() {
  const container = document.getElementById('attendance-records-table');
  const courseFilter = document.getElementById('attendance-course-filter');

  // Populate course dropdown if needed
  if (courseFilter && courseFilter.options.length <= 1) {
    state.courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.code} - ${c.name}`;
      courseFilter.appendChild(opt);
    });
  }

  const selectedFilter = courseFilter ? courseFilter.value : 'ALL';
  const targetCourses = selectedFilter === 'ALL' 
    ? state.courses 
    : state.courses.filter(c => c.id === selectedFilter);

  // Compile all meetings
  let allMeetings = [];
  targetCourses.forEach(c => {
    c.meetings.forEach(m => {
      allMeetings.push({
        courseId: c.id,
        courseName: c.name,
        courseCode: c.code,
        ...m
      });
    });
  });

  // Calculate statistics
  const totalMeetingsRecorded = allMeetings.filter(m => m.status !== 'Belum Dimulai').length;
  const hadirCount = allMeetings.filter(m => m.status === 'Hadir').length;
  const izinCount = allMeetings.filter(m => m.status === 'Izin').length;
  const sakitCount = allMeetings.filter(m => m.status === 'Sakit').length;
  const percentage = totalMeetingsRecorded > 0 ? Math.round((hadirCount / totalMeetingsRecorded) * 100) : 100;

  document.getElementById('att-stat-total').textContent = totalMeetingsRecorded;
  document.getElementById('att-stat-hadir').textContent = hadirCount;
  document.getElementById('att-stat-izin').textContent = izinCount + sakitCount;
  document.getElementById('att-stat-percent').textContent = `${percentage}%`;

  if (container) {
    container.innerHTML = allMeetings.map(m => {
      let statusHtml = '';
      if (m.status === 'Hadir') {
        statusHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800"><i data-lucide="check" class="w-3.5 h-3.5"></i> Hadir</span>`;
      } else if (m.status === 'Izin') {
        statusHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800"><i data-lucide="info" class="w-3.5 h-3.5"></i> Izin</span>`;
      } else if (m.status === 'Sakit') {
        statusHtml = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800"><i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> Sakit</span>`;
      } else {
        statusHtml = `
          <button onclick="openAttendanceModal('${m.courseId}', ${m.num})" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition">
            Isi Presensi
          </button>
        `;
      }

      return `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
          <td class="py-4 px-4 font-mono text-xs font-bold text-slate-500">${m.courseCode}</td>
          <td class="py-4 px-4 font-bold text-slate-800 text-sm">
            ${m.courseName}
            <div class="text-xs font-normal text-slate-500 sm:hidden mt-0.5">Pertemuan ${m.num} • ${m.date}</div>
          </td>
          <td class="py-4 px-4 text-xs font-bold text-indigo-600 hidden sm:table-cell">Pertemuan ${m.num}</td>
          <td class="py-4 px-4 text-xs text-slate-600 hidden sm:table-cell">${m.date}</td>
          <td class="py-4 px-4 text-xs text-slate-600 font-medium">${m.title}</td>
          <td class="py-4 px-4 text-right">${statusHtml}</td>
        </tr>
      `;
    }).join('');
  }
}

// --- KRS (KARTU RENCANA STUDI) SECTION ---
function renderKrsSection() {
  const user = state.currentUser;
  if (!user) return;

  const currentSks = calculateSelectedSks();
  const maxSks = user.maxSks;

  document.getElementById('krs-student-name').textContent = user.name;
  document.getElementById('krs-student-nim').textContent = user.nim;
  document.getElementById('krs-student-prodi').textContent = user.prodi;
  document.getElementById('krs-student-dosen').textContent = user.dosenPa;
  document.getElementById('krs-student-sks-total').textContent = `${currentSks} / ${maxSks} SKS`;

  // Status Badge
  const statusBadge = document.getElementById('krs-status-badge');
  if (statusBadge) {
    statusBadge.textContent = state.krsStatus;
    if (state.krsStatus === 'Disetujui Dosen PA') {
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200";
    } else if (state.krsStatus === 'Diajukan') {
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200";
    } else if (state.krsStatus === 'Perlu Revisi') {
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-200";
    } else {
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-slate-200 text-slate-700";
    }
  }

  // KRS Period Status Notice
  const isKrsOpen = state.academicSettings ? state.academicSettings.isKrsOpen : true;
  const submitKrsBtn = document.getElementById('btn-submit-krs');
  if (submitKrsBtn) {
    if (!isKrsOpen) {
      submitKrsBtn.disabled = true;
      submitKrsBtn.classList.add('opacity-50', 'cursor-not-allowed');
      submitKrsBtn.title = "Periode pengisian KRS sedang ditutup oleh Bagian Akademik.";
    } else {
      submitKrsBtn.disabled = false;
      submitKrsBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      submitKrsBtn.title = "";
    }
  }

  // SKS Progress Bar
  const sksBar = document.getElementById('krs-sks-bar');
  const percent = Math.min(100, Math.round((currentSks / maxSks) * 100));
  if (sksBar) {
    sksBar.style.width = `${percent}%`;
    sksBar.className = `h-2.5 rounded-full transition-all duration-300 ${percent > 100 ? 'bg-rose-600' : 'bg-indigo-600'}`;
  }

  // Render Selected Courses in KRS
  const selectedTable = document.getElementById('krs-selected-table');
  const selectedList = KATALOG_KRS.filter(k => state.selectedKrsCodes.includes(k.code));

  if (selectedTable) {
    if (selectedList.length === 0) {
      selectedTable.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-slate-400">
            Belum ada mata kuliah yang Anda pilih. Silakan pilih mata kuliah dari katalog di bawah.
          </td>
        </tr>
      `;
    } else {
      selectedTable.innerHTML = selectedList.map((item, idx) => `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
          <td class="py-3.5 px-3 text-xs text-slate-500 font-mono">${idx + 1}</td>
          <td class="py-3.5 px-3 text-xs font-bold font-mono text-indigo-600">${item.code}</td>
          <td class="py-3.5 px-3 text-xs font-bold text-slate-800">${item.name}</td>
          <td class="py-3.5 px-3 text-xs font-bold text-center text-slate-700">${item.sks}</td>
          <td class="py-3.5 px-3 text-xs text-slate-600">${item.lecturer}</td>
          <td class="py-3.5 px-3 text-xs text-slate-500">${item.schedule} (${item.room})</td>
          <td class="py-3.5 px-3 text-right">
            <button onclick="toggleKrsCourse('${item.code}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg transition" title="Hapus dari rencana">
              Hapus
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render Available Catalog Courses
  const catalogContainer = document.getElementById('krs-catalog-table');
  if (catalogContainer) {
    catalogContainer.innerHTML = KATALOG_KRS.map(item => {
      const isSelected = state.selectedKrsCodes.includes(item.code);
      return `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100 ${isSelected ? 'bg-indigo-50/40' : ''}">
          <td class="py-3.5 px-3 text-xs font-bold font-mono text-indigo-600">${item.code}</td>
          <td class="py-3.5 px-3 text-xs font-bold text-slate-800">
            ${item.name}
            <div class="text-[11px] font-normal text-slate-500">Semester ${item.semester} • Kuota: ${item.capacity}</div>
          </td>
          <td class="py-3.5 px-3 text-xs font-bold text-center text-slate-700">${item.sks} SKS</td>
          <td class="py-3.5 px-3 text-xs text-slate-600">${item.lecturer}</td>
          <td class="py-3.5 px-3 text-xs text-slate-500">${item.schedule}</td>
          <td class="py-3.5 px-3 text-right">
            ${isSelected ? `
              <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <i data-lucide="check" class="w-3.5 h-3.5"></i> Terpilih
              </span>
            ` : `
              <button onclick="toggleKrsCourse('${item.code}')" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition">
                + Ambil Matkul
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');
  }
}

function toggleKrsCourse(code) {
  const course = KATALOG_KRS.find(k => k.code === code);
  if (!course) return;

  const index = state.selectedKrsCodes.indexOf(code);
  if (index > -1) {
    state.selectedKrsCodes.splice(index, 1);
    state.krsStatus = "Draft";
    showToast('info', 'Mata Kuliah Dihapus', `${course.name} telah dikeluarkan dari KRS.`);
  } else {
    const currentSks = calculateSelectedSks();
    if (currentSks + course.sks > (state.currentUser ? state.currentUser.maxSks : 24)) {
      showToast('error', 'Melebihi Batas SKS', `Maksimal pengambilan SKS semester ini adalah ${state.currentUser.maxSks} SKS!`);
      return;
    }
    state.selectedKrsCodes.push(code);
    state.krsStatus = "Draft";
    showToast('success', 'Mata Kuliah Ditambahkan', `${course.name} (${course.sks} SKS) berhasil ditambahkan ke KRS.`);
  }

  saveToStorage();
  renderKrsSection();
  if (window.lucide) lucide.createIcons();
}

function calculateSelectedSks() {
  return KATALOG_KRS
    .filter(k => state.selectedKrsCodes.includes(k.code))
    .reduce((sum, item) => sum + item.sks, 0);
}

function submitKrs() {
  if (state.selectedKrsCodes.length === 0) {
    showToast('error', 'KRS Kosong', 'Silakan pilih mata kuliah sebelum mengajukan KRS.');
    return;
  }
  state.krsStatus = "Disetujui Dosen PA"; // Mock fast approval
  saveToStorage();
  showToast('success', 'KRS Berhasil Disetujui', 'Kartu Rencana Studi Anda telah disetujui otomatis oleh Dosen Pembimbing Akademik!');
  renderKrsSection();
}

function printKrsDocument() {
  const user = state.currentUser;
  const selectedList = KATALOG_KRS.filter(k => state.selectedKrsCodes.includes(k.code));
  const totalSks = calculateSelectedSks();

  const printArea = document.getElementById('print-area');
  if (printArea) {
    printArea.innerHTML = `
      <div class="max-w-4xl mx-auto p-8 border border-slate-300 rounded-lg text-slate-800 bg-white">
        <!-- Letterhead -->
        <div class="flex items-center gap-4 pb-4 border-b-2 border-slate-900 mb-6">
          <div class="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center">
            UN
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-black uppercase tracking-wider text-slate-900">UNIVERSITAS NUSANTARA TEKNOLOGI</h2>
            <p class="text-xs text-slate-600 font-semibold uppercase tracking-wide">FAKULTAS ILMU KOMPUTER • BIRO ADMINISTRASI AKADEMIK</p>
            <p class="text-xs text-slate-500">Jl. Jenderal Sudirman Kav. 45-46, Jakarta Selatan • Telp: (021) 555-0199 • www.univ-nusantara.ac.id</p>
          </div>
        </div>

        <h3 class="text-center font-black text-lg uppercase tracking-wide underline underline-offset-4 mb-6">
          KARTU RENCANA STUDI (KRS) SEMESTER GANJIL 2026/2027
        </h3>

        <!-- Student Details -->
        <div class="grid grid-cols-2 gap-4 text-xs mb-6 bg-slate-50 p-4 rounded border border-slate-200">
          <div>
            <p><span class="w-28 inline-block font-bold">Nama Mahasiswa</span>: ${user.name}</p>
            <p><span class="w-28 inline-block font-bold">Nomor Induk (NIM)</span>: ${user.nim}</p>
            <p><span class="w-28 inline-block font-bold">Program Studi</span>: ${user.prodi}</p>
          </div>
          <div>
            <p><span class="w-28 inline-block font-bold">Semester</span>: ${user.semester}</p>
            <p><span class="w-28 inline-block font-bold">IPK Terakhir</span>: ${user.ipk.toFixed(2)}</p>
            <p><span class="w-28 inline-block font-bold">Dosen PA</span>: ${user.dosenPa}</p>
          </div>
        </div>

        <!-- Table -->
        <table class="w-full text-xs border border-slate-300 mb-6">
          <thead class="bg-slate-100 font-bold border-b border-slate-300">
            <tr>
              <th class="p-2 border-r border-slate-300 w-8 text-center">No</th>
              <th class="p-2 border-r border-slate-300 text-left w-20">Kode</th>
              <th class="p-2 border-r border-slate-300 text-left">Nama Mata Kuliah</th>
              <th class="p-2 border-r border-slate-300 text-center w-12">SKS</th>
              <th class="p-2 border-r border-slate-300 text-left">Dosen Pengampu</th>
              <th class="p-2 text-left">Jadwal & Ruang</th>
            </tr>
          </thead>
          <tbody>
            ${selectedList.map((c, i) => `
              <tr class="border-b border-slate-200">
                <td class="p-2 border-r border-slate-300 text-center">${i + 1}</td>
                <td class="p-2 border-r border-slate-300 font-mono font-bold">${c.code}</td>
                <td class="p-2 border-r border-slate-300 font-semibold">${c.name}</td>
                <td class="p-2 border-r border-slate-300 text-center font-bold">${c.sks}</td>
                <td class="p-2 border-r border-slate-300">${c.lecturer}</td>
                <td class="p-2">${c.schedule} (${c.room})</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot class="bg-slate-50 font-bold border-t-2 border-slate-300">
            <tr>
              <td colspan="3" class="p-2 text-right border-r border-slate-300">TOTAL SKS DIAMBIL:</td>
              <td class="p-2 text-center border-r border-slate-300 text-sm text-indigo-700">${totalSks}</td>
              <td colspan="2" class="p-2 text-xs text-slate-500 font-normal">Maksimal SKS yang diizinkan: ${user.maxSks} SKS</td>
            </tr>
          </tfoot>
        </table>

        <!-- Signatures -->
        <div class="grid grid-cols-2 gap-8 text-center text-xs mt-12 pt-6">
          <div>
            <p>Menyetujui,</p>
            <p class="font-bold">Dosen Pembimbing Akademik</p>
            <div class="h-16 flex items-center justify-center">
              <span class="text-[10px] text-emerald-600 font-mono border border-emerald-500 px-2 py-0.5 rounded bg-emerald-50">DIGITALLY SIGNED</span>
            </div>
            <p class="font-bold underline">${user.dosenPa}</p>
            <p class="text-slate-500">NIP. 19820514 200812 1 002</p>
          </div>
          <div>
            <p>Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p class="font-bold">Mahasiswa Pemohon,</p>
            <div class="h-16 flex items-center justify-center">
              <span class="text-[10px] text-indigo-600 font-mono border border-indigo-500 px-2 py-0.5 rounded bg-indigo-50">VERIFIED SYSTEM</span>
            </div>
            <p class="font-bold underline">${user.name}</p>
            <p class="text-slate-500">NIM. ${user.nim}</p>
          </div>
        </div>
      </div>
    `;

    window.print();
  }
}

// --- ASSIGNMENTS (TUGAS) SECTION ---
function renderAssignmentsSection(filter = 'ALL') {
  const container = document.getElementById('assignments-list-container');
  if (!container) return;

  let list = state.assignments;
  if (filter === 'PENDING') {
    list = list.filter(a => a.status === 'Belum Dikumpulkan');
  } else if (filter === 'SUBMITTED') {
    list = list.filter(a => a.status === 'Menunggu Dinilai');
  } else if (filter === 'COMPLETED') {
    list = list.filter(a => a.status === 'Selesai');
  }

  // Count summary
  const cntPending = state.assignments.filter(a => a.status === 'Belum Dikumpulkan').length;
  const cntSubmitted = state.assignments.filter(a => a.status === 'Menunggu Dinilai').length;
  const cntDone = state.assignments.filter(a => a.status === 'Selesai').length;

  document.getElementById('badge-task-all').textContent = state.assignments.length;
  document.getElementById('badge-task-pending').textContent = cntPending;
  document.getElementById('badge-task-submitted').textContent = cntSubmitted;
  document.getElementById('badge-task-completed').textContent = cntDone;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
        <i data-lucide="check-check" class="w-12 h-12 mx-auto text-emerald-400 mb-3"></i>
        <p class="text-base font-semibold text-slate-700">Tidak ada tugas pada kategori ini.</p>
        <p class="text-xs text-slate-400 mt-1">Anda sudah memeriksa semua daftar tugas kuliah.</p>
      </div>
    `;
  } else {
    container.innerHTML = list.map(t => {
      let badgeStyle = "bg-rose-100 text-rose-700 border-rose-200";
      let icon = "alert-circle";
      if (t.status === 'Menunggu Dinilai') {
        badgeStyle = "bg-amber-100 text-amber-700 border-amber-200";
        icon = "clock";
      } else if (t.status === 'Selesai') {
        badgeStyle = "bg-emerald-100 text-emerald-700 border-emerald-200";
        icon = "check-circle";
      }

      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-700 font-mono">${t.courseName}</span>
              <span class="px-3 py-1 text-xs font-bold rounded-full border ${badgeStyle} flex items-center gap-1.5">
                <i data-lucide="${icon}" class="w-3.5 h-3.5"></i>
                ${t.status}
              </span>
            </div>

            <h3 class="font-bold text-slate-800 text-lg mt-2">${t.title}</h3>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">${t.description}</p>

            <div class="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div class="flex items-center justify-between text-xs text-slate-500">
                <span class="flex items-center gap-1.5">
                  <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>
                  Batas Akhir:
                </span>
                <span class="font-bold text-slate-700">${formatDateTime(t.deadline)}</span>
              </div>

              ${t.submittedFile ? `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-2 truncate">
                    <i data-lucide="file" class="w-4 h-4 text-indigo-600 shrink-0"></i>
                    <span class="text-xs font-semibold text-slate-700 truncate">${t.submittedFile.name}</span>
                    <span class="text-[11px] text-slate-400">(${t.submittedFile.size})</span>
                  </div>
                  <span class="text-[11px] font-mono text-emerald-600 font-bold shrink-0">Terkirim</span>
                </div>
              ` : ''}

              ${t.score !== null ? `
                <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-emerald-800">Nilai Akhir Dosen:</span>
                    <span class="text-lg font-black text-emerald-700">${t.score} / ${t.maxScore}</span>
                  </div>
                  ${t.lecturerFeedback ? `
                    <p class="text-xs text-emerald-900 mt-1 italic">"${t.lecturerFeedback}"</p>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button onclick="openUploadModal('${t.id}')" class="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2">
              <i data-lucide="${t.submittedFile ? 'refresh-cw' : 'upload-cloud'}" class="w-4 h-4"></i>
              ${t.submittedFile ? 'Update File Jawaban' : 'Upload File Tugas'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) lucide.createIcons();
}

// --- MULTI-ROLE PROFILE SECTION ---
function renderProfileSection() {
  const user = state.currentUser;
  if (!user) return;

  const headerTitle = document.getElementById('prof-header-title');
  if (headerTitle) {
    if (user.role === 'dosen') headerTitle.textContent = "Profil Lengkap Dosen Pengampu";
    else if (user.role === 'admin') headerTitle.textContent = "Profil Administrator Akademik (BAAK)";
    else headerTitle.textContent = "Profil Lengkap Mahasiswa";
  }

  const cardRoleBadge = document.getElementById('prof-card-role-badge');
  if (cardRoleBadge) {
    if (user.role === 'dosen') {
      cardRoleBadge.textContent = "Dosen Pengajar Aktif";
      cardRoleBadge.className = "px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30";
    } else if (user.role === 'admin') {
      cardRoleBadge.textContent = "Administrator Kampus";
      cardRoleBadge.className = "px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30";
    } else {
      cardRoleBadge.textContent = "Mahasiswa Aktif";
      cardRoleBadge.className = "px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30";
    }
  }

  const cardSubBadge = document.getElementById('prof-card-sub-badge');
  if (cardSubBadge) {
    if (user.role === 'dosen') cardSubBadge.textContent = user.jabatan || "Dosen Lektor";
    else if (user.role === 'admin') cardSubBadge.textContent = user.jabatan || "Sub Bagian BAAK";
    else cardSubBadge.textContent = `Semester ${user.semester || 5}`;
  }

  const cardIdText = document.getElementById('prof-card-id-text');
  if (cardIdText) {
    if (user.role === 'dosen') cardIdText.innerHTML = `NIDN: <span class="bind-user-nim">${user.nidn || user.nim}</span>`;
    else if (user.role === 'admin') cardIdText.innerHTML = `NIP: <span class="bind-user-nim">${user.nip || '198504122010011002'}</span>`;
    else cardIdText.innerHTML = `NIM: <span class="bind-user-nim">${user.nim}</span>`;
  }

  const cardInst = document.getElementById('prof-card-institution');
  if (cardInst) {
    if (user.role === 'admin') cardInst.textContent = "Universitas Nusantara Teknologi • Biro Administrasi Akademik & Kemahasiswaan";
    else cardInst.textContent = `Universitas Nusantara Teknologi • ${user.fakultas || 'Fakultas Ilmu Komputer'}`;
  }

  const labelId = document.getElementById('prof-label-id');
  if (labelId) {
    if (user.role === 'dosen') labelId.textContent = "Nomor Induk Dosen Nasional (NIDN)";
    else if (user.role === 'admin') labelId.textContent = "Nomor Induk Pegawai (NIP)";
    else labelId.textContent = "Nomor Induk Mahasiswa (NIM)";
  }

  const elNim = document.getElementById('prof-nim'); if (elNim) elNim.textContent = user.nim || user.nidn || user.nip || '-';
  const elName = document.getElementById('prof-name'); if (elName) elName.textContent = user.name || '-';
  const elEmail = document.getElementById('prof-email'); if (elEmail) elEmail.textContent = user.email || '-';
  const elPhone = document.getElementById('prof-phone'); if (elPhone) elPhone.textContent = user.phone || '+62 812-3456-7890';
  const elProdi = document.getElementById('prof-prodi'); if (elProdi) elProdi.textContent = user.prodi || user.divisi || 'Teknik Informatika';
  const elFakultas = document.getElementById('prof-fakultas'); if (elFakultas) elFakultas.textContent = user.fakultas || 'Fakultas Ilmu Komputer';

  const labelDosenPa = document.getElementById('prof-label-dosenpa');
  if (labelDosenPa) {
    labelDosenPa.textContent = user.role === 'mahasiswa' ? "Dosen Pembimbing Akademik (PA)" : "Jabatan Akademik / Posisi";
  }
  const elDosenPa = document.getElementById('prof-dosen-pa');
  if (elDosenPa) {
    elDosenPa.textContent = user.role === 'mahasiswa' ? (user.dosenPa || '-') : (user.jabatan || 'Tenaga Pengajar Tetap');
  }

  const labelIpk = document.getElementById('prof-label-ipk');
  if (labelIpk) {
    labelIpk.textContent = user.role === 'mahasiswa' ? "Indeks Prestasi Kumulatif (IPK)" : "Status Kepegawaian";
  }
  const elIpk = document.getElementById('prof-ipk');
  if (elIpk) {
    elIpk.textContent = user.role === 'mahasiswa' ? (typeof user.ipk === 'number' ? user.ipk.toFixed(2) : user.ipk) : 'Pegawai Tetap Aktif';
  }

  const rowSem = document.getElementById('prof-row-semester');
  if (rowSem) rowSem.style.display = user.role === 'mahasiswa' ? 'block' : 'none';
  const elSem = document.getElementById('prof-semester');
  if (elSem) elSem.textContent = user.semester || '-';

  const rowSks = document.getElementById('prof-row-sks');
  if (rowSks) rowSks.style.display = user.role === 'mahasiswa' ? 'block' : 'none';
  const elSks = document.getElementById('prof-sks-lulus');
  if (elSks) elSks.textContent = `${user.sksLulus || 88} SKS`;
}

// ==========================================
// 5.1 FOTO PROFIL & AVATAR CONTROLLER
// ==========================================

let stagedAvatarUrl = '';

function openChangeAvatarModal() {
  const user = state.currentUser;
  if (!user) return;

  stagedAvatarUrl = user.avatar || '';
  updateAvatarPreview(stagedAvatarUrl, 'Foto profil saat ini');
  switchAvatarTab('upload');
  renderAvatarPresets();

  const modal = document.getElementById('modal-change-avatar');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  if (window.lucide) lucide.createIcons();
}

function closeChangeAvatarModal() {
  const modal = document.getElementById('modal-change-avatar');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function switchAvatarTab(tabName) {
  const tabUpload = document.getElementById('tab-avatar-upload');
  const tabPresets = document.getElementById('tab-avatar-presets');
  const tabUrl = document.getElementById('tab-avatar-url');
  const panelUpload = document.getElementById('avatar-panel-upload');
  const panelPresets = document.getElementById('avatar-panel-presets');
  const panelUrl = document.getElementById('avatar-panel-url');

  [tabUpload, tabPresets, tabUrl].forEach(b => {
    if (b) {
      b.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
      b.classList.add('hover:text-slate-900');
    }
  });
  [panelUpload, panelPresets, panelUrl].forEach(p => {
    if (p) p.classList.add('hidden');
  });

  if (tabName === 'upload') {
    if (tabUpload) { tabUpload.classList.add('bg-white', 'text-indigo-600', 'shadow-sm'); tabUpload.classList.remove('hover:text-slate-900'); }
    if (panelUpload) panelUpload.classList.remove('hidden');
  } else if (tabName === 'presets') {
    if (tabPresets) { tabPresets.classList.add('bg-white', 'text-indigo-600', 'shadow-sm'); tabPresets.classList.remove('hover:text-slate-900'); }
    if (panelPresets) panelPresets.classList.remove('hidden');
  } else if (tabName === 'url') {
    if (tabUrl) { tabUrl.classList.add('bg-white', 'text-indigo-600', 'shadow-sm'); tabUrl.classList.remove('hover:text-slate-900'); }
    if (panelUrl) panelUrl.classList.remove('hidden');
  }
  if (window.lucide) lucide.createIcons();
}

function renderAvatarPresets() {
  const grid = document.getElementById('avatar-preset-grid');
  if (!grid) return;

  grid.innerHTML = AVATAR_PRESETS.map((p, idx) => {
    const isSelected = stagedAvatarUrl === p.url;
    return `
      <div onclick="selectPresetAvatar('${p.url}')" class="relative group cursor-pointer rounded-xl overflow-hidden border-2 transition ${isSelected ? 'border-indigo-600 ring-2 ring-indigo-500/30' : 'border-slate-200 hover:border-indigo-300'}">
        <img src="${p.url}" class="w-full h-14 object-cover">
        <div class="absolute inset-0 bg-indigo-600/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white">
          <i data-lucide="check" class="w-4 h-4"></i>
        </div>
      </div>
    `;
  }).join('');
  if (window.lucide) lucide.createIcons();
}

function selectPresetAvatar(url) {
  stagedAvatarUrl = url;
  updateAvatarPreview(url, 'Koleksi avatar dipilih');
  renderAvatarPresets();
}

function updateAvatarPreview(url, sourceText) {
  const img = document.getElementById('avatar-preview-img');
  const srcEl = document.getElementById('avatar-preview-source');
  if (img) img.src = url;
  if (srcEl) srcEl.textContent = sourceText;
}

function handleAvatarFileSelect(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('error', 'Format Tidak Didukung', 'Silakan pilih berkas gambar (JPG, PNG, atau WEBP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Downscale to max 350x350 via Canvas for optimal localStorage usage
      const canvas = document.createElement('canvas');
      const maxDim = 350;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const optimizedUrl = canvas.toDataURL('image/jpeg', 0.85);
      stagedAvatarUrl = optimizedUrl;
      updateAvatarPreview(stagedAvatarUrl, `Berkas foto: ${file.name}`);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function previewAvatarFromUrl() {
  const urlInput = document.getElementById('avatar-url-input');
  if (!urlInput || !urlInput.value.trim()) {
    showToast('info', 'URL Kosong', 'Masukkan URL gambar terlebih dahulu.');
    return;
  }
  const url = urlInput.value.trim();
  const testImg = new Image();
  testImg.onload = function() {
    stagedAvatarUrl = url;
    updateAvatarPreview(url, 'URL gambar valid');
    showToast('success', 'URL Valid', 'Pratinjau foto berhasil dimuat.');
  };
  testImg.onerror = function() {
    showToast('error', 'URL Tidak Valid', 'Gambar tidak dapat dimuat dari tautan tersebut.');
  };
  testImg.src = url;
}

function resetAvatarToDefault() {
  if (!state.currentUser) return;
  const id = state.currentUser.nim || state.currentUser.nidn || state.currentUser.nip || 'admin';
  const defaultUrl = ORIGINAL_AVATARS[id] || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  stagedAvatarUrl = defaultUrl;
  updateAvatarPreview(stagedAvatarUrl, 'Foto awal default sistem');
  renderAvatarPresets();
  showToast('info', 'Foto Direset', 'Pratinjau dikembalikan ke foto bawaan awal.');
}

function saveNewAvatar() {
  if (!state.currentUser) return;
  if (!stagedAvatarUrl) {
    showToast('info', 'Tidak Ada Perubahan', 'Anda belum memilih foto baru.');
    return;
  }

  state.currentUser.avatar = stagedAvatarUrl;

  // Persist in custom avatars map
  try {
    const savedMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_AVATARS) || '{}');
    const id = state.currentUser.nim || state.currentUser.nidn || state.currentUser.nip || 'admin';
    savedMap[id] = stagedAvatarUrl;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_AVATARS, JSON.stringify(savedMap));
  } catch(e) {}

  // Update in DEFAULT_USERS
  const userInDefault = DEFAULT_USERS.find(u => (u.nim && u.nim === state.currentUser.nim) || (u.nidn && u.nidn === state.currentUser.nidn));
  if (userInDefault) userInDefault.avatar = stagedAvatarUrl;

  // Update in state.students or state.lecturers
  if (state.currentUser.role === 'mahasiswa' && state.students) {
    const st = state.students.find(s => s.nim === state.currentUser.nim);
    if (st) st.avatar = stagedAvatarUrl;
  } else if (state.currentUser.role === 'dosen' && state.lecturers) {
    const lec = state.lecturers.find(l => l.nidn === state.currentUser.nidn);
    if (lec) lec.avatar = stagedAvatarUrl;
  }

  saveToStorage();
  renderUserIdentity();
  if (state.activeTab === 'profile') renderProfileSection();

  closeChangeAvatarModal();
  showToast('success', 'Foto Profil Berhasil Diperbarui', 'Foto identitas profil berhasil diperbarui di seluruh sistem LMS.');
}

// ==========================================
// 5.2 DOSEN CONTROLLER & VIEW LOGIC
// ==========================================

function getLecturerCourses() {
  const user = state.currentUser;
  if (!user) return [];
  return state.courses.filter(c => {
    return (user.taughtCourses && user.taughtCourses.includes(c.id)) ||
           (c.lecturer && c.lecturer.toLowerCase().includes((user.name || '').toLowerCase())) ||
           (user.nidn === '0012057801' && ['IF501', 'IF502'].includes(c.id)) ||
           (user.nidn === '0028098302' && ['IF503', 'IF505'].includes(c.id));
  });
}

function renderDosenDashboard() {
  const user = state.currentUser;
  if (!user) return;

  const courses = getLecturerCourses();
  const classCount = courses.length || 2;
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolled || 28), 0);
  const activeTasks = state.assignments.filter(a => courses.some(c => c.id === a.courseId || c.name === a.courseName)).length;

  const elClasses = document.getElementById('dosen-stat-classes'); if (elClasses) elClasses.textContent = `${classCount} Kelas`;
  const elStudents = document.getElementById('dosen-stat-students'); if (elStudents) elStudents.textContent = `${totalStudents} Mahasiswa`;
  const elTasks = document.getElementById('dosen-stat-tasks'); if (elTasks) elTasks.textContent = `${activeTasks || 3} Tugas`;
  const elAtt = document.getElementById('dosen-stat-attendance'); if (elAtt) elAtt.textContent = `95.4%`;

  // Weekly Schedule
  const scheduleContainer = document.getElementById('dosen-dashboard-courses');
  if (scheduleContainer) {
    scheduleContainer.innerHTML = courses.map(c => `
      <div class="p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">${c.code}</span>
          <h4 class="font-bold text-sm text-slate-800 mt-1">${c.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-indigo-500"></i>
            <span>${c.schedule}</span>
            <span>•</span>
            <span>${c.room}</span>
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="navigate('dosen-attendance')" class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition flex items-center gap-1">
            <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i>
            Presensi
          </button>
          <button onclick="navigate('dosen-grades')" class="px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold transition flex items-center gap-1">
            <i data-lucide="award" class="w-3.5 h-3.5"></i>
            Nilai
          </button>
        </div>
      </div>
    `).join('');
  }

  // Recent Submissions
  const subContainer = document.getElementById('dosen-dashboard-submissions');
  if (subContainer) {
    const subs = state.assignments.filter(a => a.submittedFile);
    if (subs.length === 0) {
      subContainer.innerHTML = `<p class="text-xs text-slate-400 py-4 text-center">Belum ada pengumpulan tugas terbaru.</p>`;
    } else {
      subContainer.innerHTML = subs.slice(0, 3).map(a => `
        <div class="p-3.5 rounded-2xl border border-slate-100 hover:border-amber-200 bg-slate-50/50 flex items-center justify-between gap-3">
          <div class="truncate">
            <p class="font-bold text-xs text-slate-800 truncate">${a.title}</p>
            <p class="text-[11px] text-slate-500 truncate">${a.submittedFile ? a.submittedFile.name : 'Berkas Tugas'}</p>
            <span class="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full inline-block mt-1">
              ${a.score !== null ? `Dinilai: ${a.score}` : 'Menunggu Penilaian'}
            </span>
          </div>
          <button onclick="openGradeSubmissionModal('${a.id}', '2024101001')" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition shrink-0 shadow-sm">
            ${a.score !== null ? 'Ubah Nilai' : 'Beri Nilai'}
          </button>
        </div>
      `).join('');
    }
  }
}

let activeDosenSelectedCourseId = null;

function renderDosenClasses() {
  const courses = getLecturerCourses();
  if (courses.length > 0 && !activeDosenSelectedCourseId) {
    activeDosenSelectedCourseId = courses[0].id;
  }

  const grid = document.getElementById('dosen-classes-grid');
  if (grid) {
    grid.innerHTML = courses.map(c => {
      const isSelected = c.id === activeDosenSelectedCourseId;
      return `
        <div class="p-6 rounded-3xl bg-white border-2 transition ${isSelected ? 'border-indigo-600 shadow-lg ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-indigo-300 shadow-sm'} flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">${c.code}</span>
              <span class="text-xs font-bold text-slate-500">${c.sks} SKS</span>
            </div>
            <h3 class="font-black text-base text-slate-800">${c.name}</h3>
            <p class="text-xs text-slate-500 mt-1">${c.schedule}</p>
            <p class="text-xs text-slate-400 mt-0.5">${c.room}</p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-600">${c.enrolled || 28} Mahasiswa</span>
            <button onclick="viewDosenClassDetail('${c.id}')" class="px-3.5 py-1.5 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700'} text-xs font-bold transition">
              ${isSelected ? 'Sedang Dipilih' : 'Pilih Kelas'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  viewDosenClassDetail(activeDosenSelectedCourseId);
}

function viewDosenClassDetail(courseId) {
  activeDosenSelectedCourseId = courseId;
  const course = state.courses.find(c => c.id === courseId) || (state.courses.length > 0 ? state.courses[0] : null);
  if (!course) return;

  const codeEl = document.getElementById('dosen-selected-class-code'); if (codeEl) codeEl.textContent = course.code;
  const nameEl = document.getElementById('dosen-selected-class-name'); if (nameEl) nameEl.textContent = `${course.name} - Kelas A`;
  const schedEl = document.getElementById('dosen-selected-class-schedule'); if (schedEl) schedEl.textContent = `${course.schedule} • ${course.room} (Kuota: ${course.quota || 35})`;

  const tableBody = document.getElementById('dosen-class-students-table');
  if (tableBody) {
    const students = state.students || DEFAULT_STUDENTS;
    tableBody.innerHTML = students.map((s, idx) => {
      const gr = state.grades.find(g => g.nim === s.nim && g.courseId === course.id);
      const na = gr ? gr.nilaiAkhir : 88.5;
      const att = Math.min(100, 85 + (idx * 3));
      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition text-xs">
          <td class="py-3 px-4 text-center text-slate-400 font-mono">${idx + 1}</td>
          <td class="py-3 px-4 font-mono font-bold text-slate-800">${s.nim}</td>
          <td class="py-3 px-4 font-bold text-slate-800">${s.name}</td>
          <td class="py-3 px-4 text-slate-600">${s.prodi}</td>
          <td class="py-3 px-4 text-center font-semibold text-slate-700">Sem ${s.semester}</td>
          <td class="py-3 px-4 text-center font-bold text-emerald-600">${att}%</td>
          <td class="py-3 px-4 text-center font-black text-indigo-700">${na.toFixed(1)}</td>
          <td class="py-3 px-4 text-right">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Aktif</span>
          </td>
        </tr>
      `;
    }).join('');
  }
}

// --- DOSEN ATTENDANCE ---
let activeDosenAttendanceCourseId = null;
let activeDosenMeetingNum = null;

function handleDosenAttendanceCourseChange() {
  const select = document.getElementById('dosen-attendance-course-select');
  if (select) activeDosenAttendanceCourseId = select.value;
  renderDosenAttendance();
}

function renderDosenAttendance() {
  const courses = getLecturerCourses();
  if (courses.length === 0) return;

  const select = document.getElementById('dosen-attendance-course-select');
  if (select) {
    select.innerHTML = courses.map(c => `
      <option value="${c.id}" ${c.id === activeDosenAttendanceCourseId ? 'selected' : ''}>${c.code} - ${c.name}</option>
    `).join('');
    if (!activeDosenAttendanceCourseId) activeDosenAttendanceCourseId = select.value;
  }

  const course = state.courses.find(c => c.id === activeDosenAttendanceCourseId) || courses[0];
  if (!course) return;

  const tbody = document.getElementById('dosen-meetings-table-body');
  if (tbody) {
    tbody.innerHTML = course.meetings.map(m => {
      const isComplete = m.status === 'Hadir' || m.status === 'Selesai' || m.status === 'Terlaksana';
      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition text-xs">
          <td class="py-3 px-4 text-center font-mono font-bold text-slate-700">${m.num}</td>
          <td class="py-3 px-4 font-bold text-slate-800">${m.title}</td>
          <td class="py-3 px-4 text-slate-500">${m.date}</td>
          <td class="py-3 px-4 text-center">
            <span class="text-[11px] font-semibold text-slate-700">28 Hadir • 0 Alfa</span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
              ${isComplete ? 'Terlaksana' : m.status}
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <button onclick="selectDosenAttendanceMeeting('${course.id}', ${m.num})" class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition">
              Kelola Absensi
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  const rekapBody = document.getElementById('dosen-attendance-rekap-body');
  if (rekapBody) {
    const students = state.students || DEFAULT_STUDENTS;
    rekapBody.innerHTML = students.map((s, idx) => {
      const totalHadir = 14 + (idx % 3);
      const totalIzin = idx % 2;
      const totalSakit = 0;
      const totalAlfa = idx === 4 ? 1 : 0;
      const pct = Math.round((totalHadir / 16) * 100);
      const isEligible = pct >= 75;
      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition text-xs">
          <td class="py-3 px-4 text-center text-slate-400 font-mono">${idx + 1}</td>
          <td class="py-3 px-4 font-mono font-bold text-slate-800">${s.nim}</td>
          <td class="py-3 px-4 font-bold text-slate-800">${s.name}</td>
          <td class="py-3 px-4 text-center font-bold text-emerald-600">${totalHadir}</td>
          <td class="py-3 px-4 text-center text-blue-600">${totalIzin}</td>
          <td class="py-3 px-4 text-center text-amber-600">${totalSakit}</td>
          <td class="py-3 px-4 text-center text-rose-600">${totalAlfa}</td>
          <td class="py-3 px-4 text-center font-black ${isEligible ? 'text-emerald-700' : 'text-rose-600'}">${pct}%</td>
          <td class="py-3 px-4 text-right">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isEligible ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              ${isEligible ? 'Memenuhi Syarat' : 'Kehadiran < 75%'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }
}

function selectDosenAttendanceMeeting(courseId, meetingNum) {
  activeDosenAttendanceCourseId = courseId;
  activeDosenMeetingNum = meetingNum;

  const course = state.courses.find(c => c.id === courseId);
  const meeting = course ? course.meetings.find(m => m.num === meetingNum) : null;
  if (!meeting) return;

  const panel = document.getElementById('dosen-attendance-marking-panel');
  if (panel) panel.classList.remove('hidden');

  const lbl = document.getElementById('dosen-active-session-label'); if (lbl) lbl.textContent = `Pertemuan ke-${meeting.num} • ${course.name}`;
  const top = document.getElementById('dosen-active-session-topic'); if (top) top.textContent = meeting.title;
  const dat = document.getElementById('dosen-active-session-date'); if (dat) dat.textContent = `${meeting.date} • Kampus Utama`;

  const tbody = document.getElementById('dosen-attendance-students-table');
  if (tbody) {
    const students = state.students || DEFAULT_STUDENTS;
    tbody.innerHTML = students.map((s, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
        <td class="py-2.5 px-3 text-center text-slate-400 font-mono">${idx + 1}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-slate-800">${s.nim}</td>
        <td class="py-2.5 px-3 font-bold text-slate-800">${s.name}</td>
        <td class="py-2.5 px-3 text-center">
          <input type="radio" name="att-rad-${s.nim}" value="Hadir" checked class="text-emerald-600">
        </td>
        <td class="py-2.5 px-3 text-center">
          <input type="radio" name="att-rad-${s.nim}" value="Izin" class="text-blue-600">
        </td>
        <td class="py-2.5 px-3 text-center">
          <input type="radio" name="att-rad-${s.nim}" value="Sakit" class="text-amber-600">
        </td>
        <td class="py-2.5 px-3 text-center">
          <input type="radio" name="att-rad-${s.nim}" value="Alfa" class="text-rose-600">
        </td>
        <td class="py-2.5 px-3">
          <input type="text" id="att-note-${s.nim}" placeholder="Catatan opsional..." class="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200">
        </td>
      </tr>
    `).join('');
  }

  panel.scrollIntoView({ behavior: 'smooth' });
}

function setAllAttendanceStatus(status) {
  const students = state.students || DEFAULT_STUDENTS;
  students.forEach(s => {
    const radios = document.getElementsByName(`att-rad-${s.nim}`);
    radios.forEach(r => {
      if (r.value === status) r.checked = true;
    });
  });
}

function saveDosenAttendanceChanges() {
  const course = state.courses.find(c => c.id === activeDosenAttendanceCourseId);
  const meeting = course ? course.meetings.find(m => m.num === activeDosenMeetingNum) : null;
  if (meeting) {
    meeting.status = 'Hadir';
    saveToStorage();
    showToast('success', 'Presensi Disimpan', `Presensi kelas ${course.name} sesi pertemuan ke-${meeting.num} berhasil disimpan.`);
    renderDosenAttendance();
    const panel = document.getElementById('dosen-attendance-marking-panel');
    if (panel) panel.classList.add('hidden');
  }
}

function openDosenCreateMeetingModal() {
  const modal = document.getElementById('modal-dosen-create-attendance');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeDosenAttendanceModal() {
  const modal = document.getElementById('modal-dosen-create-attendance');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function submitDosenCreateMeeting(e) {
  e.preventDefault();
  const num = parseInt(document.getElementById('modal-create-att-num').value);
  const topic = document.getElementById('modal-create-att-topic').value.trim();
  const dateVal = document.getElementById('modal-create-att-date').value;

  const course = state.courses.find(c => c.id === activeDosenAttendanceCourseId);
  if (course) {
    course.meetings.push({
      num: num,
      title: topic,
      date: dateVal,
      status: "Terlaksana"
    });
    saveToStorage();
    closeDosenAttendanceModal();
    showToast('success', 'Sesi Presensi Dibuat', `Pertemuan ke-${num}: ${topic} berhasil dibuka untuk mahasiswa.`);
    renderDosenAttendance();
  }
}

// --- DOSEN ASSIGNMENTS ---
function renderDosenAssignments() {
  const courses = getLecturerCourses();
  const select = document.getElementById('dosen-task-course-filter');
  if (select && select.children.length === 0) {
    select.innerHTML = `<option value="ALL">Semua Mata Kuliah</option>` + courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  const filter = select ? select.value : 'ALL';
  const relevantAssignments = state.assignments.filter(a => {
    if (filter === 'ALL') return true;
    return a.courseId === filter;
  });

  const cardsContainer = document.getElementById('dosen-assignments-cards');
  if (cardsContainer) {
    cardsContainer.innerHTML = relevantAssignments.map(a => `
      <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
        <div>
          <span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700">${a.courseName}</span>
          <h4 class="font-bold text-base text-slate-800 mt-2">${a.title}</h4>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">${a.description}</p>
        </div>
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-rose-600 font-semibold">Batas: ${formatDateTime(a.deadline)}</span>
          <span class="font-bold px-2.5 py-0.5 rounded-full ${a.submittedFile ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} text-[10px]">
            ${a.submittedFile ? '1 Terkumpul' : 'Belum Ada'}
          </span>
        </div>
      </div>
    `).join('');
  }

  const subTableBody = document.getElementById('dosen-submissions-table-body');
  if (subTableBody) {
    const submittedTasks = state.assignments.filter(a => a.submittedFile);
    if (submittedTasks.length === 0) {
      subTableBody.innerHTML = `<tr><td colspan="8" class="py-6 text-center text-xs text-slate-400">Belum ada berkas tugas yang dikumpulkan mahasiswa.</td></tr>`;
    } else {
      subTableBody.innerHTML = submittedTasks.map((t, idx) => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
          <td class="py-3 px-4 text-center font-mono text-slate-400">${idx + 1}</td>
          <td class="py-3 px-4 font-mono font-bold text-slate-800">2024101001</td>
          <td class="py-3 px-4 font-bold text-slate-800">Budi Pratama Santoso</td>
          <td class="py-3 px-4 text-slate-500">${t.submittedAt || '12 Nov 2026, 20:15 WIB'}</td>
          <td class="py-3 px-4">
            <span class="font-bold text-indigo-700">${t.submittedFile ? t.submittedFile.name : 'berkas_tugas.pdf'}</span>
          </td>
          <td class="py-3 px-4 text-center font-black text-indigo-700">${t.score !== null ? t.score : '-'}</td>
          <td class="py-3 px-4 text-slate-600 italic truncate max-w-xs">${t.lecturerFeedback || t.notes || 'Pengerjaan sangat rapi'}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="openGradeSubmissionModal('${t.id}', '2024101001')" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition">
              ${t.score !== null ? 'Ubah Nilai' : 'Beri Nilai'}
            </button>
          </td>
        </tr>
      `).join('');
    }
  }
}

function openCreateAssignmentModal() {
  const courses = getLecturerCourses();
  const select = document.getElementById('modal-dosen-task-course');
  if (select) {
    select.innerHTML = courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
  }

  const modal = document.getElementById('modal-dosen-assignment');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeCreateAssignmentModal() {
  const modal = document.getElementById('modal-dosen-assignment');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function submitCreateAssignment(e) {
  e.preventDefault();
  const courseId = document.getElementById('modal-dosen-task-course').value;
  const title = document.getElementById('modal-dosen-task-title').value.trim();
  const deadline = document.getElementById('modal-dosen-task-deadline').value;
  const desc = document.getElementById('modal-dosen-task-desc').value.trim();

  const course = state.courses.find(c => c.id === courseId);
  const newAssign = {
    id: `assign-${Date.now()}`,
    courseId: courseId,
    courseName: course ? course.name : "Mata Kuliah",
    title: title,
    description: desc,
    deadline: deadline || "2026-11-30T23:59:00",
    status: "Belum Dikumpulkan",
    maxScore: 100,
    score: null,
    lecturerFeedback: null,
    submittedFile: null
  };

  state.assignments.unshift(newAssign);
  saveToStorage();
  closeCreateAssignmentModal();
  showToast('success', 'Tugas Diterbitkan', `Tugas "${title}" berhasil dibuat dan sekarang tampil di dashboard mahasiswa.`);
  if (state.activeTab === 'dosen-assignments') renderDosenAssignments();
  if (state.activeTab === 'dosen-dashboard') renderDosenDashboard();
}

let activeGradingAssignmentId = null;
let activeGradingStudentNim = null;

function openGradeSubmissionModal(assignmentId, studentNim) {
  activeGradingAssignmentId = assignmentId;
  activeGradingStudentNim = studentNim;

  const assignment = state.assignments.find(a => a.id === assignmentId);
  if (!assignment) return;

  const student = (state.students || DEFAULT_STUDENTS).find(s => s.nim === studentNim) || { name: "Budi Pratama Santoso", nim: "2024101001" };

  const nameEl = document.getElementById('grade-sub-student-name'); if (nameEl) nameEl.textContent = student.name;
  const nimEl = document.getElementById('grade-sub-student-nim'); if (nimEl) nimEl.textContent = student.nim;
  const taskEl = document.getElementById('grade-sub-task-title'); if (taskEl) taskEl.textContent = `${assignment.courseName} - ${assignment.title}`;
  const fileEl = document.getElementById('grade-sub-filename'); if (fileEl) fileEl.textContent = assignment.submittedFile ? assignment.submittedFile.name : 'tugas_mahasiswa.pdf';
  const scoreInput = document.getElementById('grade-sub-score'); if (scoreInput) scoreInput.value = assignment.score !== null ? assignment.score : 90;
  const fbInput = document.getElementById('grade-sub-feedback'); if (fbInput) fbInput.value = assignment.lecturerFeedback || '';

  const modal = document.getElementById('modal-dosen-grade-submission');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeGradeSubmissionModal() {
  const modal = document.getElementById('modal-dosen-grade-submission');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveGradeFeedback() {
  const scoreVal = parseFloat(document.getElementById('grade-sub-score').value);
  const fbVal = document.getElementById('grade-sub-feedback').value.trim();

  const assignment = state.assignments.find(a => a.id === activeGradingAssignmentId);
  if (assignment) {
    assignment.score = scoreVal;
    assignment.lecturerFeedback = fbVal;
    assignment.status = "Selesai";
    saveToStorage();
    closeGradeSubmissionModal();
    showToast('success', 'Nilai & Feedback Dikirim', `Nilai ${scoreVal} untuk ${assignment.title} telah disimpan dan tersinkron ke mahasiswa.`);
    if (state.activeTab === 'dosen-assignments') renderDosenAssignments();
    if (state.activeTab === 'dosen-dashboard') renderDosenDashboard();
  }
}

function downloadMockFile() {
  showToast('info', 'Mengunduh Berkas', 'File tugas mahasiswa berhasil diunduh ke perangkat Anda.');
}

// --- DOSEN GRADES INPUT & PUBLICATION ---
let activeDosenGradeCourseId = null;

function handleDosenGradeCourseChange() {
  const select = document.getElementById('dosen-grades-course-select');
  if (select) activeDosenGradeCourseId = select.value;
  renderDosenGrades();
}

function renderDosenGrades() {
  const courses = getLecturerCourses();
  if (courses.length === 0) return;

  const select = document.getElementById('dosen-grades-course-select');
  if (select) {
    select.innerHTML = courses.map(c => `
      <option value="${c.id}" ${c.id === activeDosenGradeCourseId ? 'selected' : ''}>${c.code} - ${c.name}</option>
    `).join('');
    if (!activeDosenGradeCourseId) activeDosenGradeCourseId = select.value;
  }

  const course = state.courses.find(c => c.id === activeDosenGradeCourseId) || courses[0];
  if (!course) return;

  const tbody = document.getElementById('dosen-grades-table-body');
  if (tbody) {
    const students = state.students || DEFAULT_STUDENTS;
    tbody.innerHTML = students.map((s, idx) => {
      let g = state.grades.find(gr => gr.nim === s.nim && gr.courseId === course.id);
      if (!g) {
        g = { nim: s.nim, studentName: s.name, courseId: course.id, tugas: 85, uts: 80, uas: 88, nilaiAkhir: 84.7, grade: "A-", isPublished: false };
        state.grades.push(g);
      }
      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
          <td class="py-3 px-4 text-center text-slate-400 font-mono">${idx + 1}</td>
          <td class="py-3 px-4 font-mono font-bold text-slate-800">${s.nim}</td>
          <td class="py-3 px-4 font-bold text-slate-800">${s.name}</td>
          <td class="py-3 px-4 text-center">
            <input type="number" min="0" max="100" value="${g.tugas}" onchange="handleGradeInputChange('${s.nim}', 'tugas', this.value)" class="w-16 px-2 py-1 text-center font-bold text-slate-800 border border-slate-200 rounded-lg">
          </td>
          <td class="py-3 px-4 text-center">
            <input type="number" min="0" max="100" value="${g.uts}" onchange="handleGradeInputChange('${s.nim}', 'uts', this.value)" class="w-16 px-2 py-1 text-center font-bold text-slate-800 border border-slate-200 rounded-lg">
          </td>
          <td class="py-3 px-4 text-center">
            <input type="number" min="0" max="100" value="${g.uas}" onchange="handleGradeInputChange('${s.nim}', 'uas', this.value)" class="w-16 px-2 py-1 text-center font-bold text-slate-800 border border-slate-200 rounded-lg">
          </td>
          <td class="py-3 px-4 text-center font-black text-indigo-700" id="grade-na-${s.nim}">${g.nilaiAkhir.toFixed(1)}</td>
          <td class="py-3 px-4 text-center font-black text-emerald-600" id="grade-letter-${s.nim}">${g.grade}</td>
          <td class="py-3 px-4 text-right">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${g.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${g.isPublished ? 'Dipublikasikan' : 'Draf'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }
}

function handleGradeInputChange(nim, type, value) {
  const val = parseFloat(value) || 0;
  const courseId = activeDosenGradeCourseId;
  const g = state.grades.find(gr => gr.nim === nim && gr.courseId === courseId);
  if (g) {
    g[type] = val;
    g.nilaiAkhir = (g.tugas * 0.3) + (g.uts * 0.3) + (g.uas * 0.4);
    if (g.nilaiAkhir >= 85) g.grade = "A";
    else if (g.nilaiAkhir >= 80) g.grade = "A-";
    else if (g.nilaiAkhir >= 75) g.grade = "B+";
    else if (g.nilaiAkhir >= 70) g.grade = "B";
    else if (g.nilaiAkhir >= 65) g.grade = "B-";
    else if (g.nilaiAkhir >= 60) g.grade = "C+";
    else if (g.nilaiAkhir >= 55) g.grade = "C";
    else if (g.nilaiAkhir >= 40) g.grade = "D";
    else g.grade = "E";

    const elNa = document.getElementById(`grade-na-${nim}`); if (elNa) elNa.textContent = g.nilaiAkhir.toFixed(1);
    const elLet = document.getElementById(`grade-letter-${nim}`); if (elLet) elLet.textContent = g.grade;
  }
}

function saveDosenGrades(isPublish) {
  const courseId = activeDosenGradeCourseId;
  const courseGrades = state.grades.filter(gr => gr.courseId === courseId);
  courseGrades.forEach(g => {
    if (isPublish) g.isPublished = true;
  });
  saveToStorage();

  const badge = document.getElementById('dosen-grade-status-badge');
  if (badge) {
    if (isPublish) {
      badge.textContent = "Status: Terkunci & Dipublikasikan ke Mahasiswa";
      badge.className = "px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200";
    } else {
      badge.textContent = "Status: Draf (Belum Terkunci)";
      badge.className = "px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200";
    }
  }

  showToast('success', isPublish ? 'Nilai Dipublikasikan' : 'Draf Nilai Disimpan', isPublish ? 'Nilai akhir telah dikunci dan sekarang dapat diakses oleh mahasiswa pada transkrip.' : 'Draf nilai berhasil disimpan di sistem.');
  renderDosenGrades();
}

// ==========================================
// 5.3 AKADEMIK / ADMIN CONTROLLER & LOGIC
// ==========================================

function renderAdminDashboard() {
  const stCount = (state.students || DEFAULT_STUDENTS).length;
  const lecCount = (state.lecturers || DEFAULT_LECTURERS).length;
  const crsCount = (state.courses || INITIAL_COURSES).length;
  const clsCount = (state.classes || DEFAULT_CLASSES).length;

  const elSt = document.getElementById('admin-stat-students'); if (elSt) elSt.textContent = `${stCount} Mahasiswa`;
  const elLec = document.getElementById('admin-stat-lecturers'); if (elLec) elLec.textContent = `${lecCount} Dosen`;
  const elCrs = document.getElementById('admin-stat-courses'); if (elCrs) elCrs.textContent = `${crsCount} Matkul`;
  const elCls = document.getElementById('admin-stat-classes'); if (elCls) elCls.textContent = `${clsCount} Kelas Aktif`;

  const btnToggle = document.getElementById('btn-toggle-krs-period');
  if (btnToggle) {
    const isOpen = state.academicSettings && state.academicSettings.isKrsOpen;
    btnToggle.innerHTML = `<i data-lucide="power" class="w-4 h-4"></i> Periode KRS: ${isOpen ? 'DIBUKA' : 'DITUTUP'}`;
    btnToggle.className = isOpen ? 
      "px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5" : 
      "px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5";
  }

  const krsSummary = document.getElementById('admin-krs-quick-summary');
  if (krsSummary) {
    const subs = state.krsSubmissions || DEFAULT_KRS_SUBMISSIONS;
    const approved = subs.filter(s => s.status === 'Disetujui Dosen PA').length;
    const pending = subs.filter(s => s.status !== 'Disetujui Dosen PA').length;
    krsSummary.innerHTML = `
      <div class="flex items-center justify-between text-xs font-bold text-slate-700">
        <span>KRS Telah Divalidasi:</span>
        <span class="text-emerald-600">${approved} Mahasiswa</span>
      </div>
      <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${Math.round((approved / subs.length) * 100)}%"></div>
      </div>
      <div class="flex items-center justify-between text-xs font-bold text-slate-700 pt-2">
        <span>Menunggu Validasi:</span>
        <span class="text-amber-600">${pending} Mahasiswa</span>
      </div>
    `;
  }
}

function toggleKrsPeriod() {
  if (!state.academicSettings) state.academicSettings = { ...DEFAULT_ACADEMIC_SETTINGS };
  state.academicSettings.isKrsOpen = !state.academicSettings.isKrsOpen;
  saveToStorage();

  const isOpen = state.academicSettings.isKrsOpen;
  showToast(isOpen ? 'success' : 'warning', 'Status Periode KRS Diubah', `Periode pengisian KRS mahasiswa sekarang resmi ${isOpen ? 'DIBUKA' : 'DITUTUP'}.`);
  if (state.activeTab === 'admin-dashboard') renderAdminDashboard();
  if (state.activeTab === 'admin-krs') renderAdminKrs();
}

// --- ADMIN STUDENTS CRUD ---
function renderAdminStudents() {
  const searchInput = document.getElementById('admin-student-search');
  const prodiFilter = document.getElementById('admin-student-prodi-filter');
  const query = (searchInput ? searchInput.value : '').toLowerCase();
  const prodi = prodiFilter ? prodiFilter.value : 'ALL';

  const students = (state.students || DEFAULT_STUDENTS).filter(s => {
    const matchQ = s.name.toLowerCase().includes(query) || s.nim.toLowerCase().includes(query);
    const matchP = prodi === 'ALL' || s.prodi === prodi;
    return matchQ && matchP;
  });

  const tbody = document.getElementById('admin-students-table-body');
  if (tbody) {
    tbody.innerHTML = students.map((s, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
        <td class="py-3 px-4 text-center font-mono text-slate-400">${idx + 1}</td>
        <td class="py-3 px-4 font-mono font-bold text-slate-800">${s.nim}</td>
        <td class="py-3 px-4 font-bold text-slate-800">${s.name}</td>
        <td class="py-3 px-4 text-slate-600">${s.prodi}</td>
        <td class="py-3 px-4 text-center font-semibold text-slate-700">Sem ${s.semester}</td>
        <td class="py-3 px-4 text-center font-black text-emerald-600">${typeof s.ipk === 'number' ? s.ipk.toFixed(2) : s.ipk}</td>
        <td class="py-3 px-4 text-center text-slate-700">${s.sksLulus || 88}</td>
        <td class="py-3 px-4 text-center">
          <button onclick="toggleStudentStatus('${s.nim}')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} transition">
            ${s.status || 'Aktif'}
          </button>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openStudentModal('${s.nim}')" class="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition" title="Edit Mahasiswa">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteStudent('${s.nim}')" class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Hapus Mahasiswa">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
  if (window.lucide) lucide.createIcons();
}

function openStudentModal(nim = null) {
  const isEdit = !!nim;
  const title = document.getElementById('modal-admin-student-title');
  const isEditInput = document.getElementById('admin-student-is-edit');
  if (title) title.textContent = isEdit ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru";
  if (isEditInput) isEditInput.value = isEdit ? nim : "false";

  if (isEdit) {
    const s = (state.students || DEFAULT_STUDENTS).find(x => x.nim === nim);
    if (s) {
      document.getElementById('admin-student-nim').value = s.nim;
      document.getElementById('admin-student-nim').disabled = true;
      document.getElementById('admin-student-name').value = s.name;
      document.getElementById('admin-student-email').value = s.email;
      document.getElementById('admin-student-prodi').value = s.prodi;
      document.getElementById('admin-student-semester').value = s.semester;
      document.getElementById('admin-student-ipk').value = s.ipk;
      document.getElementById('admin-student-status').value = s.status || "Aktif";
      document.getElementById('admin-student-pa').value = s.dosenPa || "Dr. Ir. Hendra Setiawan, M.T.";
    }
  } else {
    document.getElementById('admin-student-nim').value = `202410100${(state.students || DEFAULT_STUDENTS).length + 1}`;
    document.getElementById('admin-student-nim').disabled = false;
    document.getElementById('admin-student-name').value = "";
    document.getElementById('admin-student-email').value = "";
    document.getElementById('admin-student-semester').value = 1;
    document.getElementById('admin-student-ipk').value = 3.50;
  }

  const modal = document.getElementById('modal-admin-student');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeStudentModal() {
  const modal = document.getElementById('modal-admin-student');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveStudentModal(e) {
  e.preventDefault();
  const isEdit = document.getElementById('admin-student-is-edit').value !== 'false';
  const nim = document.getElementById('admin-student-nim').value.trim();
  const name = document.getElementById('admin-student-name').value.trim();
  const email = document.getElementById('admin-student-email').value.trim();
  const password = document.getElementById('admin-student-password').value.trim() || '123';
  const prodi = document.getElementById('admin-student-prodi').value;
  const semester = parseInt(document.getElementById('admin-student-semester').value);
  const ipk = parseFloat(document.getElementById('admin-student-ipk').value);
  const status = document.getElementById('admin-student-status').value;
  const dosenPa = document.getElementById('admin-student-pa').value.trim();

  if (isEdit) {
    const s = state.students.find(x => x.nim === nim);
    if (s) {
      s.name = name;
      s.email = email;
      s.prodi = prodi;
      s.semester = semester;
      s.ipk = ipk;
      s.status = status;
      s.dosenPa = dosenPa;
      if (password) s.password = password;
    }
  } else {
    state.students.push({
      nim: nim,
      password: password,
      name: name,
      email: email,
      prodi: prodi,
      semester: semester,
      ipk: ipk,
      sksLulus: 20,
      status: status,
      dosenPa: dosenPa,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    });
  }

  saveToStorage();
  closeStudentModal();
  showToast('success', isEdit ? 'Data Mahasiswa Diperbarui' : 'Mahasiswa Baru Ditambahkan', `Data mahasiswa ${name} (${nim}) berhasil disimpan.`);
  renderAdminStudents();
}

function toggleStudentStatus(nim) {
  const s = state.students.find(x => x.nim === nim);
  if (s) {
    s.status = s.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    saveToStorage();
    renderAdminStudents();
    showToast('info', 'Status Diubah', `Status akademik ${s.name} diubah menjadi ${s.status}.`);
  }
}

function deleteStudent(nim) {
  if (confirm(`Apakah Anda yakin ingin menghapus data mahasiswa dengan NIM ${nim}?`)) {
    state.students = state.students.filter(x => x.nim !== nim);
    saveToStorage();
    renderAdminStudents();
    showToast('success', 'Mahasiswa Dihapus', `Data mahasiswa NIM ${nim} telah dihapus dari sistem.`);
  }
}

// --- ADMIN LECTURERS CRUD ---
function renderAdminLecturers() {
  const searchInput = document.getElementById('admin-lecturer-search');
  const query = (searchInput ? searchInput.value : '').toLowerCase();

  const lecturers = (state.lecturers || DEFAULT_LECTURERS).filter(l => {
    return l.name.toLowerCase().includes(query) || l.nidn.toLowerCase().includes(query);
  });

  const tbody = document.getElementById('admin-lecturers-table-body');
  if (tbody) {
    tbody.innerHTML = lecturers.map((l, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
        <td class="py-3 px-4 text-center font-mono text-slate-400">${idx + 1}</td>
        <td class="py-3 px-4 font-mono font-bold text-slate-800">${l.nidn}</td>
        <td class="py-3 px-4 font-bold text-slate-800">${l.name}</td>
        <td class="py-3 px-4 text-slate-600">${l.prodi}</td>
        <td class="py-3 px-4 font-semibold text-purple-700">${l.jabatan}</td>
        <td class="py-3 px-4 text-slate-600 truncate max-w-xs">${l.courses || '-'}</td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openLecturerModal('${l.nidn}')" class="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition" title="Edit Dosen">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteLecturer('${l.nidn}')" class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Hapus Dosen">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
  if (window.lucide) lucide.createIcons();
}

function openLecturerModal(nidn = null) {
  const isEdit = !!nidn;
  const title = document.getElementById('modal-admin-lecturer-title');
  const isEditInput = document.getElementById('admin-lecturer-is-edit');
  if (title) title.textContent = isEdit ? "Edit Data Dosen" : "Tambah Dosen Baru";
  if (isEditInput) isEditInput.value = isEdit ? nidn : "false";

  if (isEdit) {
    const l = (state.lecturers || DEFAULT_LECTURERS).find(x => x.nidn === nidn);
    if (l) {
      document.getElementById('admin-lecturer-nidn').value = l.nidn;
      document.getElementById('admin-lecturer-nidn').disabled = true;
      document.getElementById('admin-lecturer-name').value = l.name;
      document.getElementById('admin-lecturer-email').value = l.email;
      document.getElementById('admin-lecturer-prodi').value = l.prodi;
      document.getElementById('admin-lecturer-jabatan').value = l.jabatan;
      document.getElementById('admin-lecturer-courses').value = l.courses || '';
    }
  } else {
    document.getElementById('admin-lecturer-nidn').value = `00${Date.now().toString().slice(-8)}`;
    document.getElementById('admin-lecturer-nidn').disabled = false;
    document.getElementById('admin-lecturer-name').value = "";
    document.getElementById('admin-lecturer-email').value = "";
    document.getElementById('admin-lecturer-courses').value = "";
  }

  const modal = document.getElementById('modal-admin-lecturer');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeLecturerModal() {
  const modal = document.getElementById('modal-admin-lecturer');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveLecturerModal(e) {
  e.preventDefault();
  const isEdit = document.getElementById('admin-lecturer-is-edit').value !== 'false';
  const nidn = document.getElementById('admin-lecturer-nidn').value.trim();
  const name = document.getElementById('admin-lecturer-name').value.trim();
  const email = document.getElementById('admin-lecturer-email').value.trim();
  const password = document.getElementById('admin-lecturer-password').value.trim() || '123';
  const prodi = document.getElementById('admin-lecturer-prodi').value;
  const jabatan = document.getElementById('admin-lecturer-jabatan').value;
  const courses = document.getElementById('admin-lecturer-courses').value.trim();

  if (isEdit) {
    const l = state.lecturers.find(x => x.nidn === nidn);
    if (l) {
      l.name = name;
      l.email = email;
      l.prodi = prodi;
      l.jabatan = jabatan;
      l.courses = courses;
      if (password) l.password = password;
    }
  } else {
    state.lecturers.push({
      nidn: nidn,
      password: password,
      name: name,
      email: email,
      prodi: prodi,
      jabatan: jabatan,
      courses: courses,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    });
  }

  saveToStorage();
  closeLecturerModal();
  showToast('success', isEdit ? 'Data Dosen Diperbarui' : 'Dosen Baru Ditambahkan', `Data dosen ${name} berhasil disimpan.`);
  renderAdminLecturers();
}

function deleteLecturer(nidn) {
  if (confirm(`Apakah Anda yakin ingin menghapus data dosen dengan NIDN ${nidn}?`)) {
    state.lecturers = state.lecturers.filter(x => x.nidn !== nidn);
    saveToStorage();
    renderAdminLecturers();
    showToast('success', 'Dosen Dihapus', `Data dosen telah dihapus dari sistem.`);
  }
}

// --- ADMIN COURSES CRUD ---
function renderAdminCourses() {
  const searchInput = document.getElementById('admin-course-search');
  const query = (searchInput ? searchInput.value : '').toLowerCase();

  const courses = (state.courses || INITIAL_COURSES).filter(c => {
    return c.name.toLowerCase().includes(query) || c.code.toLowerCase().includes(query);
  });

  const tbody = document.getElementById('admin-courses-table-body');
  if (tbody) {
    tbody.innerHTML = courses.map((c, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
        <td class="py-3 px-4 font-mono font-bold text-indigo-700">${c.code}</td>
        <td class="py-3 px-4 font-bold text-slate-800">${c.name}</td>
        <td class="py-3 px-4 text-center font-bold text-slate-700">${c.sks} SKS</td>
        <td class="py-3 px-4 text-center font-semibold text-slate-600">Semester 5</td>
        <td class="py-3 px-4 text-slate-600">S1 Teknik Informatika</td>
        <td class="py-3 px-4 font-medium text-slate-800">${c.lecturer || 'Dr. Ir. Hendra Setiawan, M.T.'}</td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openCourseModal('${c.code}')" class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition" title="Edit Mata Kuliah">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteCourse('${c.code}')" class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Hapus Mata Kuliah">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
  if (window.lucide) lucide.createIcons();
}

function openCourseModal(code = null) {
  const isEdit = !!code;
  const title = document.getElementById('modal-admin-course-title');
  const isEditInput = document.getElementById('admin-course-is-edit');
  if (title) title.textContent = isEdit ? "Edit Mata Kuliah" : "Tambah Mata Kuliah Baru";
  if (isEditInput) isEditInput.value = isEdit ? code : "false";

  if (isEdit) {
    const c = (state.courses || INITIAL_COURSES).find(x => x.code === code);
    if (c) {
      document.getElementById('admin-course-code').value = c.code;
      document.getElementById('admin-course-code').disabled = true;
      document.getElementById('admin-course-name').value = c.name;
      document.getElementById('admin-course-sks').value = c.sks;
      document.getElementById('admin-course-semester').value = 5;
      document.getElementById('admin-course-lecturer').value = c.lecturer;
    }
  } else {
    document.getElementById('admin-course-code').value = `IF5${(state.courses || INITIAL_COURSES).length + 1}`;
    document.getElementById('admin-course-code').disabled = false;
    document.getElementById('admin-course-name').value = "";
    document.getElementById('admin-course-sks').value = 3;
    document.getElementById('admin-course-lecturer').value = "Dr. Ir. Hendra Setiawan, M.T.";
  }

  const modal = document.getElementById('modal-admin-course');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeCourseModal() {
  const modal = document.getElementById('modal-admin-course');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveCourseModal(e) {
  e.preventDefault();
  const isEdit = document.getElementById('admin-course-is-edit').value !== 'false';
  const code = document.getElementById('admin-course-code').value.trim();
  const name = document.getElementById('admin-course-name').value.trim();
  const sks = parseInt(document.getElementById('admin-course-sks').value);
  const lecturer = document.getElementById('admin-course-lecturer').value.trim();

  if (isEdit) {
    const c = state.courses.find(x => x.code === code);
    if (c) {
      c.name = name;
      c.sks = sks;
      c.lecturer = lecturer;
    }
  } else {
    state.courses.push({
      id: code,
      code: code,
      name: name,
      sks: sks,
      lecturer: lecturer,
      schedule: "Senin, 10:00 - 12:30",
      room: "Ruang 302 (Gedung B)",
      enrolled: 25,
      quota: 35,
      attendanceRate: 100,
      meetings: [
        { num: 1, title: `Pengenalan ${name}`, date: "2026-09-08", status: "Hadir" }
      ]
    });
  }

  saveToStorage();
  closeCourseModal();
  showToast('success', isEdit ? 'Mata Kuliah Diperbarui' : 'Mata Kuliah Ditambahkan', `Mata kuliah ${name} (${code}) berhasil disimpan.`);
  renderAdminCourses();
}

function deleteCourse(code) {
  if (confirm(`Apakah Anda yakin ingin menghapus mata kuliah ${code}?`)) {
    state.courses = state.courses.filter(x => x.code !== code);
    saveToStorage();
    renderAdminCourses();
    showToast('success', 'Mata Kuliah Dihapus', `Mata kuliah ${code} telah dihapus dari sistem.`);
  }
}

// --- ADMIN CLASSES CRUD ---
function renderAdminClasses() {
  const classes = state.classes || DEFAULT_CLASSES;
  const tbody = document.getElementById('admin-classes-table-body');
  if (tbody) {
    tbody.innerHTML = classes.map((c, idx) => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
        <td class="py-3 px-4 font-mono font-bold text-amber-700">${c.code}</td>
        <td class="py-3 px-4 font-bold text-slate-800">${c.courseName}</td>
        <td class="py-3 px-4 text-slate-600">${c.schedule}</td>
        <td class="py-3 px-4 text-slate-600">${c.room}</td>
        <td class="py-3 px-4 font-medium text-slate-800">${c.lecturer}</td>
        <td class="py-3 px-4 text-center font-bold text-slate-700">${c.enrolled} / ${c.quota}</td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openClassModal('${c.code}')" class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition" title="Edit Kelas">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteClass('${c.code}')" class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Hapus Kelas">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
  if (window.lucide) lucide.createIcons();
}

function openClassModal(code = null) {
  const isEdit = !!code;
  const title = document.getElementById('modal-admin-class-title');
  const isEditInput = document.getElementById('admin-class-is-edit');
  if (title) title.textContent = isEdit ? "Edit Kelas Perkuliahan" : "Buka Kelas Perkuliahan Baru";
  if (isEditInput) isEditInput.value = isEdit ? code : "false";

  const select = document.getElementById('admin-class-course');
  if (select) {
    select.innerHTML = (state.courses || INITIAL_COURSES).map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  if (isEdit) {
    const c = (state.classes || DEFAULT_CLASSES).find(x => x.code === code);
    if (c) {
      document.getElementById('admin-class-code').value = c.code;
      document.getElementById('admin-class-code').disabled = true;
      document.getElementById('admin-class-course').value = c.courseId;
      document.getElementById('admin-class-schedule').value = c.schedule;
      document.getElementById('admin-class-room').value = c.room;
      document.getElementById('admin-class-lecturer').value = c.lecturer;
      document.getElementById('admin-class-quota').value = c.quota;
    }
  } else {
    document.getElementById('admin-class-code').value = `IF501-${String.fromCharCode(65 + (state.classes || DEFAULT_CLASSES).length)}`;
    document.getElementById('admin-class-code').disabled = false;
    document.getElementById('admin-class-schedule').value = "Senin, 08:00 - 10:30";
    document.getElementById('admin-class-room').value = "Lab Komputer 3";
    document.getElementById('admin-class-lecturer').value = "Dr. Ir. Hendra Setiawan, M.T.";
    document.getElementById('admin-class-quota').value = 35;
  }

  const modal = document.getElementById('modal-admin-class');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeClassModal() {
  const modal = document.getElementById('modal-admin-class');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveClassModal(e) {
  e.preventDefault();
  const isEdit = document.getElementById('admin-class-is-edit').value !== 'false';
  const code = document.getElementById('admin-class-code').value.trim();
  const courseId = document.getElementById('admin-class-course').value;
  const course = (state.courses || INITIAL_COURSES).find(c => c.id === courseId);
  const schedule = document.getElementById('admin-class-schedule').value.trim();
  const room = document.getElementById('admin-class-room').value.trim();
  const lecturer = document.getElementById('admin-class-lecturer').value.trim();
  const quota = parseInt(document.getElementById('admin-class-quota').value);

  if (isEdit) {
    const c = state.classes.find(x => x.code === code);
    if (c) {
      c.courseId = courseId;
      c.courseName = course ? course.name : c.courseName;
      c.schedule = schedule;
      c.room = room;
      c.lecturer = lecturer;
      c.quota = quota;
    }
  } else {
    state.classes.push({
      code: code,
      courseId: courseId,
      courseName: course ? course.name : "Mata Kuliah",
      schedule: schedule,
      room: room,
      lecturer: lecturer,
      quota: quota,
      enrolled: 0
    });
  }

  saveToStorage();
  closeClassModal();
  showToast('success', isEdit ? 'Kelas Diperbarui' : 'Kelas Dibuka', `Kelas perkuliahan ${code} berhasil disimpan.`);
  renderAdminClasses();
}

function deleteClass(code) {
  if (confirm(`Apakah Anda yakin ingin menutup kelas ${code}?`)) {
    state.classes = state.classes.filter(x => x.code !== code);
    saveToStorage();
    renderAdminClasses();
    showToast('success', 'Kelas Dihapus', `Kelas perkuliahan ${code} telah ditutup.`);
  }
}

// --- ADMIN KRS MANAGEMENT & VALIDATION ---
let activeReviewKrsNim = null;

function renderAdminKrs() {
  const isOpen = state.academicSettings && state.academicSettings.isKrsOpen;
  const btn = document.getElementById('admin-krs-period-btn');
  const btnTxt = document.getElementById('admin-krs-period-text');
  const banner = document.getElementById('admin-krs-period-banner');

  if (btn && btnTxt) {
    btnTxt.textContent = `Periode KRS: ${isOpen ? 'DIBUKA' : 'DITUTUP'}`;
    btn.className = isOpen ? 
      "px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto" :
      "px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto";
  }

  if (banner) {
    banner.className = isOpen ? 
      "p-5 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4" :
      "p-5 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-4";
    banner.innerHTML = `
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded-2xl ${isOpen ? 'bg-emerald-600' : 'bg-rose-600'} text-white flex items-center justify-center font-black shrink-0">
          <i data-lucide="${isOpen ? 'check-circle' : 'lock'}" class="w-5 h-5"></i>
        </div>
        <div>
          <h4 class="font-bold ${isOpen ? 'text-emerald-950' : 'text-rose-950'} text-sm">
            Periode Pengisian KRS Sedang ${isOpen ? 'DIBUKA' : 'DITUTUP'}
          </h4>
          <p class="text-xs ${isOpen ? 'text-emerald-800/80' : 'text-rose-800/80'} mt-0.5">
            ${isOpen ? 'Mahasiswa dapat memilih mata kuliah dan mengajukan validasi ke Dosen PA / Akademik.' : 'Pengisian KRS dinonaktifkan sementara. Mahasiswa hanya dapat melihat arsip KRS yang telah disetujui.'}
          </p>
        </div>
      </div>
      <span class="text-xs font-mono font-bold ${isOpen ? 'text-emerald-700' : 'text-rose-700'} bg-white px-3 py-1.5 rounded-xl border ${isOpen ? 'border-emerald-200' : 'border-rose-200'} shadow-sm shrink-0">
        Batas: ${state.academicSettings ? state.academicSettings.krsDeadline : '30 Nov 2026'}
      </span>
    `;
  }

  const statsContainer = document.getElementById('admin-krs-course-stats');
  if (statsContainer) {
    statsContainer.innerHTML = (state.courses || INITIAL_COURSES).map(c => `
      <div class="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1.5">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-800 truncate">${c.name}</span>
          <span class="font-mono text-slate-500 font-semibold">${c.sks} SKS</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div class="bg-indigo-600 h-1.5 rounded-full" style="width: 85%"></div>
        </div>
        <div class="flex justify-between text-[10px] text-slate-400">
          <span>Kapasitas: ${c.enrolled || 28} / 35</span>
          <span class="text-emerald-600 font-bold">Tersedia</span>
        </div>
      </div>
    `).join('');
  }

  const tbody = document.getElementById('admin-krs-submissions-table-body');
  if (tbody) {
    const subs = state.krsSubmissions || DEFAULT_KRS_SUBMISSIONS;
    tbody.innerHTML = subs.map((s, idx) => {
      let badgeClass = "bg-amber-100 text-amber-800";
      if (s.status === 'Disetujui Dosen PA') badgeClass = "bg-emerald-100 text-emerald-800";
      if (s.status === 'Perlu Revisi') badgeClass = "bg-rose-100 text-rose-800";

      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
          <td class="py-3 px-4 text-center font-mono text-slate-400">${idx + 1}</td>
          <td class="py-3 px-4 font-mono font-bold text-slate-800">${s.nim}</td>
          <td class="py-3 px-4 font-bold text-slate-800">${s.name}</td>
          <td class="py-3 px-4 text-slate-600">${s.prodi}</td>
          <td class="py-3 px-4 text-center font-semibold text-slate-700">Sem ${s.semester}</td>
          <td class="py-3 px-4 text-center font-black text-indigo-700">${s.totalSks} SKS</td>
          <td class="py-3 px-4 text-center">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badgeClass}">
              ${s.status}
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <button onclick="openReviewKrsModal('${s.nim}')" class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition">
              Review & Validasi
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }
  if (window.lucide) lucide.createIcons();
}

function openReviewKrsModal(nim) {
  activeReviewKrsNim = nim;
  const s = (state.krsSubmissions || DEFAULT_KRS_SUBMISSIONS).find(x => x.nim === nim);
  if (!s) return;

  const nameEl = document.getElementById('admin-review-krs-name'); if (nameEl) nameEl.textContent = s.name;
  const nimEl = document.getElementById('admin-review-krs-nim'); if (nimEl) nimEl.textContent = `NIM: ${s.nim} • Semester ${s.semester}`;
  const prodiEl = document.getElementById('admin-review-krs-prodi'); if (prodiEl) prodiEl.textContent = s.prodi;
  const sksEl = document.getElementById('admin-review-krs-total-sks'); if (sksEl) sksEl.textContent = `${s.totalSks} SKS`;

  const tbody = document.getElementById('admin-review-krs-courses-body');
  if (tbody) {
    const chosenCourses = KATALOG_KRS.filter(k => s.selectedCodes.includes(k.code));
    tbody.innerHTML = chosenCourses.map(c => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
        <td class="py-2 px-3 font-mono font-bold text-indigo-700">${c.code}</td>
        <td class="py-2 px-3 font-bold text-slate-800">${c.name}</td>
        <td class="py-2 px-3 text-center font-semibold text-slate-700">${c.sks}</td>
        <td class="py-2 px-3 text-slate-500">${c.lecturer}</td>
      </tr>
    `).join('');
  }

  const notesEl = document.getElementById('admin-review-krs-notes');
  if (notesEl) notesEl.value = s.notes || "Rencana studi sesuai dengan kurikulum dan beban SKS.";

  const modal = document.getElementById('modal-admin-review-krs');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeReviewKrsModal() {
  const modal = document.getElementById('modal-admin-review-krs');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function approveCurrentStudentKrs() {
  const s = (state.krsSubmissions || DEFAULT_KRS_SUBMISSIONS).find(x => x.nim === activeReviewKrsNim);
  if (s) {
    s.status = "Disetujui Dosen PA";
    s.notes = document.getElementById('admin-review-krs-notes').value.trim() || "KRS telah disetujui resmi oleh Dosen PA.";
    
    if (s.nim === "2024101001") {
      state.krsStatus = "Disetujui Dosen PA";
    }
    saveToStorage();
    closeReviewKrsModal();
    showToast('success', 'KRS Berhasil Disetujui', `Kartu Rencana Studi mahasiswa ${s.name} (${s.nim}) resmi divalidasi.`);
    renderAdminKrs();
  }
}

function rejectCurrentStudentKrs() {
  const s = (state.krsSubmissions || DEFAULT_KRS_SUBMISSIONS).find(x => x.nim === activeReviewKrsNim);
  if (s) {
    s.status = "Perlu Revisi";
    s.notes = document.getElementById('admin-review-krs-notes').value.trim() || "Harap sesuaikan beban SKS dan mata kuliah prasyarat.";
    
    if (s.nim === "2024101001") {
      state.krsStatus = "Perlu Revisi";
    }
    saveToStorage();
    closeReviewKrsModal();
    showToast('warning', 'Revisi Diminta', `Permintaan revisi KRS telah dikirimkan ke mahasiswa ${s.name}.`);
    renderAdminKrs();
  }
}

// ==========================================
// 6. MODAL & INTERACTION HANDLERS
// ==========================================

// --- ATTENDANCE MODAL ---
let activeAttendanceCourseId = null;
let activeAttendanceMeetingNum = null;

function openAttendanceModal(courseId, meetingNum) {
  activeAttendanceCourseId = courseId;
  activeAttendanceMeetingNum = meetingNum;

  const course = state.courses.find(c => c.id === courseId);
  const meeting = course ? course.meetings.find(m => m.num === meetingNum) : null;

  document.getElementById('modal-att-course').textContent = course ? course.name : '-';
  document.getElementById('modal-att-meeting').textContent = `Pertemuan ke-${meetingNum}: ${meeting ? meeting.title : ''}`;
  document.getElementById('modal-att-date').textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  
  // Geolocation simulation text
  document.getElementById('modal-att-location').textContent = "Kampus Utama (Gedung B, Radius 50m) • Lokasi Terverifikasi";

  const modal = document.getElementById('modal-attendance');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  if (window.lucide) lucide.createIcons();
}

function closeAttendanceModal() {
  const modal = document.getElementById('modal-attendance');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function submitAttendance() {
  const statusEl = document.querySelector('input[name="att-status"]:checked');
  const status = statusEl ? statusEl.value : 'Hadir';
  const notes = document.getElementById('att-notes') ? document.getElementById('att-notes').value : '';

  const course = state.courses.find(c => c.id === activeAttendanceCourseId);
  if (course) {
    const meeting = course.meetings.find(m => m.num === activeAttendanceMeetingNum);
    if (meeting) {
      meeting.status = status;
      course.meetingsDone = Math.max(course.meetingsDone, activeAttendanceMeetingNum);
      
      // recalculate course attendance rate
      const totalRecorded = course.meetings.filter(m => m.status !== 'Belum Dimulai').length;
      const hadirs = course.meetings.filter(m => m.status === 'Hadir').length;
      course.attendanceRate = totalRecorded > 0 ? Math.round((hadirs / totalRecorded) * 100) : 100;
      
      saveToStorage();
      closeAttendanceModal();
      showToast('success', 'Presensi Berhasil Dicatat', `Status presensi Anda untuk ${course.name} telah disimpan sebagai "${status}".`);

      // Refresh current view
      if (state.activeTab === 'dashboard') renderDashboard();
      if (state.activeTab === 'courses' || state.activeTab === 'course-detail') renderCourseDetail(course.id);
      if (state.activeTab === 'attendance') renderAttendanceSection();
    }
  }
}

// --- UPLOAD ASSIGNMENT MODAL ---
let activeAssignmentId = null;
let currentUploadFile = null;

function openUploadModal(assignmentId) {
  activeAssignmentId = assignmentId;
  currentUploadFile = null;

  const assignment = state.assignments.find(a => a.id === assignmentId);
  if (!assignment) return;

  document.getElementById('modal-upload-title').textContent = assignment.title;
  document.getElementById('modal-upload-course').textContent = assignment.courseName;
  document.getElementById('modal-upload-deadline').textContent = `Batas Pengumpulan: ${formatDateTime(assignment.deadline)}`;
  
  const notesField = document.getElementById('modal-upload-notes');
  if (notesField) notesField.value = assignment.notes || '';

  // Reset file preview
  const dropZone = document.getElementById('drop-zone');
  const filePreview = document.getElementById('file-preview-card');
  const progressWrapper = document.getElementById('upload-progress-wrapper');

  if (dropZone) dropZone.classList.remove('hidden');
  if (filePreview) filePreview.classList.add('hidden');
  if (progressWrapper) progressWrapper.classList.add('hidden');

  // If already submitted, show current file
  if (assignment.submittedFile) {
    showFilePreview(assignment.submittedFile.name, assignment.submittedFile.size);
  }

  const modal = document.getElementById('modal-upload-assignment');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  if (window.lucide) lucide.createIcons();
}

function closeUploadModal() {
  const modal = document.getElementById('modal-upload-assignment');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function showFilePreview(fileName, fileSize) {
  const dropZone = document.getElementById('drop-zone');
  const filePreview = document.getElementById('file-preview-card');
  const nameEl = document.getElementById('preview-file-name');
  const sizeEl = document.getElementById('preview-file-size');

  if (dropZone) dropZone.classList.add('hidden');
  if (filePreview) filePreview.classList.remove('hidden');
  if (nameEl) nameEl.textContent = fileName;
  if (sizeEl) sizeEl.textContent = fileSize;
  if (window.lucide) lucide.createIcons();
}

function removeSelectedFile() {
  currentUploadFile = null;
  const dropZone = document.getElementById('drop-zone');
  const filePreview = document.getElementById('file-preview-card');
  const fileInput = document.getElementById('assignment-file-input');

  if (dropZone) dropZone.classList.remove('hidden');
  if (filePreview) filePreview.classList.add('hidden');
  if (fileInput) fileInput.value = '';
}

function handleFileInputChange(event) {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 15 * 1024 * 1024) {
      showToast('error', 'Ukuran File Terlalu Besar', 'Maksimal ukuran file yang diunggah adalah 15MB.');
      return;
    }
    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    currentUploadFile = {
      name: file.name,
      size: sizeFormatted,
      type: file.type
    };
    showFilePreview(file.name, sizeFormatted);
  }
}

function submitAssignmentUpload() {
  const assignment = state.assignments.find(a => a.id === activeAssignmentId);
  if (!assignment) return;

  if (!currentUploadFile && !assignment.submittedFile) {
    showToast('error', 'Belum Ada File', 'Silakan pilih atau seret file tugas terlebih dahulu.');
    return;
  }

  const notesField = document.getElementById('modal-upload-notes');
  const notes = notesField ? notesField.value : '';

  // Simulate upload progress
  const progressWrapper = document.getElementById('upload-progress-wrapper');
  const progressBar = document.getElementById('upload-progress-bar');
  const submitBtn = document.getElementById('btn-submit-upload');

  if (progressWrapper) progressWrapper.classList.remove('hidden');
  if (submitBtn) submitBtn.disabled = true;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 25;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (currentUploadFile) {
          assignment.submittedFile = currentUploadFile;
        }
        assignment.status = "Menunggu Dinilai";
        assignment.submittedAt = new Date().toLocaleString('id-ID');
        assignment.notes = notes;

        saveToStorage();
        if (submitBtn) submitBtn.disabled = false;
        closeUploadModal();
        showToast('success', 'Tugas Berhasil Diupload!', 'Berkas jawaban Anda telah terkirim dan menunggu evaluasi dosen.');

        // Refresh views
        if (state.activeTab === 'assignments') renderAssignmentsSection();
        if (state.activeTab === 'dashboard') renderDashboard();
        if (state.activeTab === 'course-detail') renderCourseDetail(state.selectedCourseId);
      }, 400);
    }
  }, 150);
}

// --- PREVIEW MATERIAL MODAL ---
function openMaterialPreview(title, material) {
  showToast('info', 'Mengunduh Materi', `Mempersiapkan berkas: "${material}" untuk ${title}.`);
}

// ==========================================
// 7. TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(type, title, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastId = 'toast-' + Date.now();
  let bgClass = "border-indigo-500 bg-white text-slate-800";
  let iconName = "info";
  let iconColor = "text-indigo-600";

  if (type === 'success') {
    bgClass = "border-emerald-500 bg-white text-slate-800";
    iconName = "check-circle";
    iconColor = "text-emerald-600";
  } else if (type === 'error') {
    bgClass = "border-rose-500 bg-white text-slate-800";
    iconName = "alert-circle";
    iconColor = "text-rose-600";
  }

  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = `p-4 rounded-2xl shadow-xl border-l-4 ${bgClass} flex items-start space-x-3 w-80 sm:w-96 transform transition-all duration-300 ease-out translate-y-2 opacity-0`;
  toast.innerHTML = `
    <div class="shrink-0 mt-0.5"><i data-lucide="${iconName}" class="w-5 h-5 ${iconColor}"></i></div>
    <div class="flex-1 pr-2">
      <h5 class="text-sm font-bold text-slate-800">${title}</h5>
      <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">${message}</p>
    </div>
    <button onclick="document.getElementById('${toastId}').remove()" class="text-slate-400 hover:text-slate-600">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-4');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 8. EVENT LISTENERS & UTILITIES
// ==========================================

function setupEventListeners() {
  // Login form submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nim = document.getElementById('login-nim').value.trim();
      const pass = document.getElementById('login-password').value.trim();
      handleLogin(nim, pass);
    });
  }

  // File drag & drop
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('assignment-file-input');

  if (dropZone && fileInput) {
    ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-active');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-active');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        handleFileInputChange({ target: { files } });
      }
    });

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileInputChange);
  }

  // Course search input
  const courseSearch = document.getElementById('courses-search-input');
  if (courseSearch) {
    courseSearch.addEventListener('input', () => renderCourses());
  }

  // Avatar file input & drop zone
  const avatarInput = document.getElementById('avatar-file-input');
  const avatarDropZone = document.getElementById('avatar-drop-zone');
  if (avatarInput) {
    avatarInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleAvatarFileSelect(e.target.files[0]);
      }
    });
  }
  if (avatarDropZone) {
    avatarDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      avatarDropZone.classList.add('border-indigo-500', 'bg-indigo-50/50');
    });
    avatarDropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      avatarDropZone.classList.remove('border-indigo-500', 'bg-indigo-50/50');
    });
    avatarDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      avatarDropZone.classList.remove('border-indigo-500', 'bg-indigo-50/50');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleAvatarFileSelect(e.dataTransfer.files[0]);
      }
    });
  }

  // Avatar URL input Enter key
  const avatarUrlInput = document.getElementById('avatar-url-input');
  if (avatarUrlInput) {
    avatarUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        previewAvatarFromUrl();
      }
    });
  }
}

function setupLiveTime() {
  const timeEl = document.getElementById('live-clock');
  const dateEl = document.getElementById('live-date');

  function update() {
    const now = new Date();
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    }
  }
  update();
  setInterval(update, 1000);
}

function toggleNotifications() {
  const dropdown = document.getElementById('notifications-dropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
}

function toggleMobileMenu() {
  const sidebar = document.getElementById('mobile-sidebar');
  if (sidebar) sidebar.classList.toggle('hidden');
}

function closeMobileMenu() {
  const sidebar = document.getElementById('mobile-sidebar');
  if (sidebar) sidebar.classList.add('hidden');
}

function formatDateTime(isoString) {
  if (!isoString) return '-';
  const d = new Date(isoString);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + ' WIB';
}

function resetDemoData() {
  if (confirm('Apakah Anda yakin ingin mereset seluruh data simulasi ke awal?')) {
    localStorage.clear();
    location.reload();
  }
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
