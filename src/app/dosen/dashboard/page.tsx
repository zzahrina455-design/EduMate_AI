'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  User, 
  Search, 
  MoreHorizontal, 
  ArrowRight, 
  Database, 
  Code2, 
  Cpu, 
  Boxes, 
  Network, 
  Server, 
  Workflow, 
  Landmark, 
  FileText,
  LogOut,
  Upload,
  History,
  X,
  CheckCircle2,
  Trash2,
  FileCheck,
  Plus,
  Menu
} from 'lucide-react';

interface Courses {
  id: string;
  title: string;
  dosen: string;
  materialsCount: number;
  progress: number;
  type: 'database' | 'web' | 'ai' | 'oop' | 'network' | 'os' | 'system' | 'civics';
}

interface UploadHistoryItem {
  id: string;
  title: string;
  courseTitle: string;
  docType: 'Modul' | 'RPS';
  fileName: string;
  fileSize: string;
  date: string;
  status: 'Tersimpan & Terindeks' | 'Proses Indexing';
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // State Modal, Toast & Mobile Menu
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Form Upload Baru
  const [selectedCourse, setSelectedCourse] = useState('Manajemen Proyek');
  const [docType, setDocType] = useState<'Modul' | 'RPS'>('Modul');
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  // State Form Buat Kelas Baru
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDosen, setNewCourseDosen] = useState('Darmawan Lahru Riatma, S.Kom., M.MT.');
  const [newCourseType, setNewCourseType] = useState<Courses['type']>('web');

  // State Daftar Riwayat Upload Dokumen
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([
    {
      id: '1',
      title: 'Modul 1: Agile Project Management',
      courseTitle: 'Manajemen Proyek',
      docType: 'Modul',
      fileName: 'Modul_Agile_Manpro_2026.pdf',
      fileSize: '2.4 MB',
      date: '03 Okt 2026',
      status: 'Tersimpan & Terindeks'
    },
    {
      id: '2',
      title: 'RPS Lengkap Semester Ganjil 2026/2027',
      courseTitle: 'Manajemen Proyek',
      docType: 'RPS',
      fileName: 'RPS_Manajemen_Proyek_V2.pdf',
      fileSize: '1.1 MB',
      date: '28 Sep 2026',
      status: 'Tersimpan & Terindeks'
    },
    {
      id: '3',
      title: 'Materi Flexbox & Grid CSS',
      courseTitle: 'Frontend',
      docType: 'Modul',
      fileName: 'CSS_Layouting_Guide.pdf',
      fileSize: '3.8 MB',
      date: '20 Sep 2026',
      status: 'Tersimpan & Terindeks'
    }
  ]);

  // State Daftar Mata Kuliah (Dinamis)
  const [coursesList, setCoursesList] = useState<Courses[]>([
    {
      id: 'Manpro',
      title: 'Manajemen Proyek',
      dosen: 'Darmawan Lahru Riatma, S.Kom., M.MT.',
      materialsCount: 10,
      progress: 60,
      type: 'web'
    },
    {
      id: 'Fr',
      title: 'Frontend',
      dosen: 'Darmawan Lahru Riatma, S.Kom., M.MT.',
      materialsCount: 12,
      progress: 80,
      type: 'ai'
    },
  ]);

  // Trigger Toast Notification
  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  }

  // Logic Pencarian
  const filteredCourses = coursesList.filter((courses) =>
    courses.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    courses.dosen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler Unggah Berkas
  const handleUploadSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newUpload: UploadHistoryItem = {
      id: Date.now().toString(),
      title: uploadTitle,
      courseTitle: selectedCourse,
      docType: docType,
      fileName: selectedFileName || `${uploadTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '2.5 MB',
      date: 'Hari ini',
      status: 'Tersimpan & Terindeks'
    };

    setUploadHistory((prev) => [newUpload, ...prev]);
    setUploadTitle('');
    setSelectedFileName('');
    setIsUploadModalOpen(false);
    showToast(`${docType} berhasil diunggah dan terindeks oleh EduMate AI!`);
  };

  // Handler Buat Kelas Baru
  const handleCreateClassSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newCourse: Courses = {
      id: Date.now().toString(),
      title: newCourseTitle,
      dosen: newCourseDosen.trim() || 'Darmawan Lahru Riatma, S.Kom., M.MT.',
      materialsCount: 0,
      progress: 0,
      type: newCourseType,
    };

    setCoursesList((prev) => [...prev, newCourse]);
    setNewCourseTitle('');
    setIsCreateModalOpen(false);
    showToast(`Kelas "${newCourse.title}" berhasil dibuat dan dipublikasikan!`);
  };

  // Handler Hapus Berkas dari Riwayat
  const handleDeleteHistory = (id: string) => {
    setUploadHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Dokumen dihapus dari riwayat.');
  };

  // Function untuk merender Grafik Header Kartu Sesuai Jenis Mata Kuliah
  const renderCourseIllustration = (type: Courses['type']) => {
    switch (type) {
      case 'database':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Database size={48} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </div>
        );
      case 'web':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Code2 size={48} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>
        );
      case 'ai':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-cyan-950/70 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-cyan-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.3)_0%,transparent_70%)]" />
            <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40">
              <Cpu size={40} className="text-cyan-300 drop-shadow-[0_0_18px_rgba(6,182,212,0.9)]" />
            </div>
          </div>
        );
      case 'oop':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Boxes size={46} className="text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]" />
          </div>
        );
      case 'network':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Network size={46} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>
        );
      case 'os':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Server size={46} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </div>
        );
      case 'system':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Workflow size={46} className="text-blue-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]" />
          </div>
        );
      case 'civics':
        return (
          <div className="relative w-full h-28 bg-gradient-to-br from-blue-900/60 to-slate-950/80 rounded-xl flex items-center justify-center overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]" />
            <Landmark size={46} className="text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.7)]" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-4 py-2.5 rounded-xl backdrop-blur-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 text-xs font-semibold">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* ================= 1. TOP NAVIGATION BAR HORIZONTAL ================= */}
      <header className="h-16 px-4 sm:px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-blue-500/20 text-blue-200 hover:text-white transition-all"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0">
            <GraduationCap size={20} />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent truncate">
            EduMate AI
          </span>
        </div>

        {/* Menu Navigasi Tengah (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-2xl border border-blue-500/15">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30">
            <BookOpen size={14} />
            <span>Mata Kuliah</span>
          </div>
          <Link
            href="/dosen/profile"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <User size={14} />
            <span>Profil</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={14} />
            <span>Keluar</span>
          </Link>
        </nav>

        {/* Akses Cepat Kanan (Profil User) */}
        <div className="flex items-center gap-3">
          <Link href="/dosen/profile" className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 px-2.5 py-1 rounded-xl cursor-pointer hover:border-cyan-400/40 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40 shrink-0">
              DR
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-bold text-white leading-none">Darmawan Lahru Riatma</span>
              <span className="block text-[9px] text-blue-300/60 leading-tight mt-0.5">Dosen</span>
            </div>
          </Link>
        </div>
      </header>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/70 backdrop-blur-md pt-20 px-4">
          <div className="w-full h-fit bg-slate-900 border border-blue-500/30 p-5 rounded-2xl flex flex-col space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
              <span className="text-xs font-bold text-cyan-300">Menu Navigasi Dosen</span>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <Link 
                href="/dosen/courses" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30 font-semibold"
              >
                <BookOpen size={16} className="text-white" />
                <span>Mata Kuliah</span>
              </Link>
              <Link 
                href="/dosen/profile" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <User size={16} className="text-blue-300/60" />
                <span>Profil</span>
              </Link>
            </nav>
            <div className="pt-2 border-t border-blue-500/20">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all text-xs font-medium"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. KONTEN UTAMA HALAMAN ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Banner Header Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-900/50 border border-blue-500/20 p-5 sm:p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 text-left max-w-xl w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-medium">
              <GraduationCap size={14} />
              <span>EduMate Academic Space</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Mata Kuliah
            </h1>
            <p className="text-xs md:text-sm text-blue-200/70 leading-relaxed">
              Buat kelas dan upload dokumen untuk pembelajaran.
            </p>

            {/* Tombol Buat Kelas Utama */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <Plus size={16} />
                <span>Buat Kelas Baru</span>
              </button>
            </div>
          </div>

          {/* Graphic Banner Kanan */}
          <div className="relative w-48 h-28 hidden md:flex items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.25)] shrink-0">
            <BookOpen size={48} className="text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
            <GraduationCap size={24} className="absolute top-3 right-4 text-blue-300" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/50" />
            <input
              type="text"
              placeholder="Cari mata kuliah atau nama dosen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-blue-500/20 rounded-2xl pl-11 pr-4 py-3 text-xs md:text-sm text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400/60 backdrop-blur-md transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Grid Kartu Mata Kuliah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {filteredCourses.map((courses) => (
            <div
              key={courses.id}
              className="group bg-slate-900/60 hover:bg-slate-800/80 border border-blue-500/20 hover:border-cyan-400/50 rounded-2xl p-4 transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Header Kartu + Opsi 3 Titik */}
                <div className="relative mb-3">
                  {renderCourseIllustration(courses.type)}
                  <button
                    type="button"
                    aria-label="Opsi tambahan"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-900 text-blue-300 hover:text-white backdrop-blur-md transition-all cursor-pointer"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                {/* Judul & Dosen */}
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
                  {courses.title}
                </h3>
                <p className="text-[11px] text-blue-200/60 line-clamp-1 flex items-center gap-1 mb-4">
                  <User size={11} className="text-blue-400 shrink-0" />
                  {courses.dosen}
                </p>
              </div>

              {/* Progres & Jumlah Materi */}
              <div className="space-y-2 mt-2 pt-3 border-t border-blue-500/15">
                <div className="flex items-center justify-between text-[11px] text-blue-200/70 font-medium">
                  <span className="flex items-center gap-1">
                    <FileText size={12} className="text-cyan-400" />
                    {courses.materialsCount} Materi
                  </span>
                  <span className="text-cyan-300 font-bold">{courses.progress}%</span>
                </div>

                {/* Bar Progres Glowing */}
                <div className="w-full bg-slate-950/80 rounded-full h-1.5 overflow-hidden border border-blue-500/20">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                    style={{ width: `${courses.progress}%` }}
                  />
                </div>

                {/* Tombol Lanjutkan */}
                <Link
                  href={`/dosen/courses/${courses.id}`}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 group/btn"
                >
                  <span>Lanjutkan</span>
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* ================= MODAL BUAT KELAS BARU ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Plus size={18} className="text-cyan-400 shrink-0" />
                <span className="truncate">Buat Kelas Mata Kuliah Baru</span>
              </div>
              <button
                type="button"
                aria-label="Tutup modal buat kelas"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateClassSubmit} className="space-y-4 text-xs">
              
              {/* Nama Mata Kuliah */}
              <div>
                <label htmlFor="createCourseTitle" className="block font-semibold text-blue-200 mb-1">
                  Nama Mata Kuliah <span className="text-red-400">*</span>
                </label>
                <input
                  id="createCourseTitle"
                  type="text"
                  required
                  placeholder="Contoh: Arsitektur Perangkat Lunak..."
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all text-xs"
                />
              </div>

              {/* Dosen Pengampu */}
              <div>
                <label htmlFor="createCourseDosen" className="block font-semibold text-blue-200 mb-1">
                  Dosen Pengampu <span className="text-red-400">*</span>
                </label>
                <input
                  id="createCourseDosen"
                  type="text"
                  required
                  placeholder="Nama Dosen Pengampu..."
                  value={newCourseDosen}
                  onChange={(e) => setNewCourseDosen(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all text-xs"
                />
              </div>

              {/* Kategori Ilustrasi */}
              <div>
                <label htmlFor="createCourseType" className="block font-semibold text-blue-200 mb-1">
                  Ikon & Kategori Kelas <span className="text-red-400">*</span>
                </label>
                <select
                  id="createCourseType"
                  value={newCourseType}
                  onChange={(e) => setNewCourseType(e.target.value as Courses['type'])}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark] text-xs"
                >
                  <option value="web">Web & Software Engineering</option>
                  <option value="database">Database & Data Science</option>
                  <option value="ai">Artificial Intelligence & Computation</option>
                  <option value="oop">Object-Oriented Programming (OOP)</option>
                  <option value="network">Cyber Security & Networking</option>
                  <option value="os">Internet of Things (IoT) & OS</option>
                  <option value="system">System & Cloud Computing</option>
                  <option value="civics">General & Scientific Writing</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-medium text-blue-200/70 hover:text-white transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Publikasikan Kelas</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL UPLOAD MODUL & RPS ================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Upload size={18} className="text-cyan-400 shrink-0" />
                <span className="truncate">Upload Modul atau RPS Pembelajaran</span>
              </div>
              <button
                type="button"
                aria-label="Tutup modal upload"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              
              {/* Pilih Mata Kuliah */}
              <div>
                <label htmlFor="selectCourse" className="block font-semibold text-blue-200 mb-1">
                  Mata Kuliah Target <span className="text-red-400">*</span>
                </label>
                <select
                  id="selectCourse"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark] text-xs"
                >
                  {coursesList.map((c) => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Tipe Dokumen */}
              <div>
                <span className="block font-semibold text-blue-200 mb-1.5">
                  Jenis Dokumen <span className="text-red-400">*</span>
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDocType('Modul')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      docType === 'Modul'
                        ? 'bg-blue-600/30 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-blue-500/20 text-blue-300/70 hover:bg-slate-800'
                    }`}
                  >
                    Modul Pembelajaran
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocType('RPS')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      docType === 'RPS'
                        ? 'bg-blue-600/30 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-blue-500/20 text-blue-300/70 hover:bg-slate-800'
                    }`}
                  >
                    RPS (Rencana Pembelajaran)
                  </button>
                </div>
              </div>

              {/* Judul Dokumen */}
              <div>
                <label htmlFor="uploadTitle" className="block font-semibold text-blue-200 mb-1">
                  Judul Dokumen / Modul <span className="text-red-400">*</span>
                </label>
                <input
                  id="uploadTitle"
                  type="text"
                  required
                  placeholder="Contoh: Modul Pertemuan 4..."
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all text-xs"
                />
              </div>

              {/* Input Berkas / File Picker */}
              <div>
                <label htmlFor="fileInput" className="block font-semibold text-blue-200 mb-1">
                  Pilih Berkas (PDF, DOCX, PPTX) <span className="text-red-400">*</span>
                </label>
                <div className="relative border-2 border-dashed border-blue-500/30 rounded-2xl p-4 text-center bg-slate-950/60 hover:border-cyan-400/50 transition-all cursor-pointer">
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf,.docx,.pptx"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFileName(file.name);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={24} className="mx-auto text-cyan-400 mb-1 shrink-0" />
                  <p className="text-xs text-white font-medium truncate max-w-full px-2">
                    {selectedFileName || 'Klik atau seret file PDF / Modul ke sini'}
                  </p>
                  <p className="text-[10px] text-blue-300/50 mt-1">Maksimal ukuran berkas: 20MB</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-medium text-blue-200/70 hover:text-white transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  Unggah Berkas
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL RIWAYAT UPLOAD ================= */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-slate-900 border border-blue-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <History size={18} className="text-cyan-400 shrink-0" />
                <span className="truncate">Riwayat Berkas Diunggah</span>
              </div>
              <button
                type="button"
                aria-label="Tutup modal riwayat"
                onClick={() => setIsHistoryModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {uploadHistory.length === 0 ? (
              <div className="text-center py-10 text-xs text-blue-300/50 border border-dashed border-blue-500/20 rounded-2xl">
                Belum ada berkas modul atau RPS yang diunggah.
              </div>
            ) : (
              <div className="space-y-3">
                {uploadHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/20 hover:border-cyan-400/30 transition-all flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-400/30 shrink-0 mt-0.5">
                        <FileCheck size={18} />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold shrink-0 ${
                            item.docType === 'RPS' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {item.docType}
                          </span>
                          <span className="text-[10px] text-blue-300/60 truncate">{item.courseTitle}</span>
                        </div>
                        <h4 className="font-bold text-white truncate text-xs">{item.title}</h4>
                        <p className="text-[10px] text-blue-300/50 truncate">
                          {item.fileName} • {item.fileSize} • {item.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium hidden sm:inline">
                        {item.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteHistory(item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end pt-2 border-t border-blue-500/20">
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-medium hover:bg-slate-700 transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}