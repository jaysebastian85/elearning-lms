/**
 * EduLMS Kampus Pintar - Full Application Logic
 * Modern E-Learning & Academic Information System
 */

// ==========================================
// 1. DATA INITIALIZATION & LOCALSTORAGE
// ==========================================

const STORAGE_KEYS = {
  USER: 'edulms_user',
  COURSES: 'edulms_courses',
  ATTENDANCE: 'edulms_attendance',
  KRS: 'edulms_krs',
  ASSIGNMENTS: 'edulms_assignments',
  NOTIFICATIONS: 'edulms_notifications'
};

const DEFAULT_USERS = [
  {
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
  }
];

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
  selectedKrsCodes: ["IF501", "IF502", "IF503", "IF504", "IF505", "IF506"], // Default 17 SKS
  krsStatus: "Disetujui Dosen PA", // 'Draft' | 'Diajukan' | 'Disetujui Dosen PA'
  notifications: [
    { id: 1, title: "Tugas Baru", desc: "Tugas 1 Pemrograman Web Lanjut telah dibuka.", time: "2 jam lalu", read: false },
    { id: 2, title: "Nilai Diterbitkan", desc: "Dosen RPL telah memberikan nilai 96 untuk Tugas 3.", time: "1 hari lalu", read: false },
    { id: 3, title: "Pengumuman KRS", desc: "Periode validasi KRS semester ganjil berakhir pada 30 November.", time: "2 hari lalu", read: true }
  ]
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
  const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
  if (savedUser) {
    state.currentUser = JSON.parse(savedUser);
  }

  const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
  state.courses = savedCourses ? JSON.parse(savedCourses) : INITIAL_COURSES;

  const savedAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  state.assignments = savedAssignments ? JSON.parse(savedAssignments) : INITIAL_ASSIGNMENTS;

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
  localStorage.setItem(STORAGE_KEYS.KRS, JSON.stringify({
    selectedKrsCodes: state.selectedKrsCodes,
    krsStatus: state.krsStatus
  }));
}

// ==========================================
// 3. AUTHENTICATION CONTROLLER
// ==========================================

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
    navigate(state.activeTab || 'dashboard');
  }
}

function handleLogin(nim, password) {
  const user = DEFAULT_USERS.find(u => (u.nim === nim || u.email === nim) && u.password === password);
  
  if (user) {
    state.currentUser = { ...user };
    saveToStorage();
    showToast('success', 'Login Berhasil', `Selamat datang kembali, ${user.name}!`);
    checkAuth();
  } else {
    showToast('error', 'Login Gagal', 'NIM atau Password yang Anda masukkan tidak sesuai.');
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

function quickLogin(index) {
  const target = DEFAULT_USERS[index];
  if (target) {
    const nimInput = document.getElementById('login-nim');
    const passInput = document.getElementById('login-password');
    if (nimInput && passInput) {
      nimInput.value = target.nim;
      passInput.value = target.password;
      handleLogin(target.nim, target.password);
    }
  }
}

function renderUserIdentity() {
  const user = state.currentUser;
  if (!user) return;

  // Header and sidebar bindings
  document.querySelectorAll('.bind-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.bind-user-nim').forEach(el => el.textContent = user.nim);
  document.querySelectorAll('.bind-user-prodi').forEach(el => el.textContent = user.prodi);
  document.querySelectorAll('.bind-user-semester').forEach(el => el.textContent = `Semester ${user.semester}`);
  document.querySelectorAll('.bind-user-avatar').forEach(el => {
    if (el.tagName === 'IMG') el.src = user.avatar;
  });
  document.querySelectorAll('.bind-user-ipk').forEach(el => el.textContent = user.ipk.toFixed(2));
  document.querySelectorAll('.bind-user-dosen-pa').forEach(el => el.textContent = user.dosenPa);
}

// ==========================================
// 4. NAVIGATION & ROUTING
// ==========================================

function navigate(tabId, param = null) {
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
    } else {
      statusBadge.className = "px-3 py-1 text-xs font-bold rounded-full bg-slate-200 text-slate-700";
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

// --- PROFILE SECTION ---
function renderProfileSection() {
  const user = state.currentUser;
  if (!user) return;

  document.getElementById('prof-nim').textContent = user.nim;
  document.getElementById('prof-name').textContent = user.name;
  document.getElementById('prof-email').textContent = user.email;
  document.getElementById('prof-phone').textContent = user.phone;
  document.getElementById('prof-prodi').textContent = user.prodi;
  document.getElementById('prof-fakultas').textContent = user.fakultas;
  document.getElementById('prof-semester').textContent = user.semester;
  document.getElementById('prof-ipk').textContent = user.ipk.toFixed(2);
  document.getElementById('prof-sks-lulus').textContent = `${user.sksLulus} SKS`;
  document.getElementById('prof-dosen-pa').textContent = user.dosenPa;
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
