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
  Menu,
  X
} from 'lucide-react';

interface Courses {
  id: string;
  title: string;
  lecturer: string;
  materialsCount: number;
  progress: number;
  type: 'database' | 'web' | 'ai' | 'oop' | 'network' | 'os' | 'system' | 'civics';
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data 8 Mata Kuliah sesuai Gambar Mockup
  const coursesData: Courses[] = [
    {
      id: 'Py',
      title: 'Python',
      lecturer: 'Masbahah',
      materialsCount: 12,
      progress: 75,
      type: 'database'
    },
    {
      id: 'Manpro',
      title: 'Manajemen Proyek',
      lecturer: 'Darmawan Lahru Riatma, S.Kom., M.MT.',
      materialsCount: 10,
      progress: 60,
      type: 'web'
    },
    {
      id: 'Fr',
      title: 'Frontend',
      lecturer: 'Darmawan Lahru Riatma, S.Kom., M.MT.',
      materialsCount: 12,
      progress: 80,
      type: 'ai'
    },
    {
      id: 'Pmi',
      title: 'Pemrograman Multimedia Interaktif',
      lecturer: 'Rifa Khoirunnisa',
      materialsCount: 10,
      progress: 70,
      type: 'oop'
    },
    {
      id: 'Cs',
      title: 'Cyber Security',
      lecturer: 'Ahmad Faisal Sani',
      materialsCount: 8,
      progress: 65,
      type: 'network'
    },
    {
      id: 'Iot',
      title: 'Inthernet Of Things',
      lecturer: 'Yusuf Fadhillah Rachman',
      materialsCount: 10,
      progress: 60,
      type: 'os'
    },
    {
      id: 'Ka',
      title: 'Komputasi Awan',
      lecturer: 'Ahmad Faisal Sani',
      materialsCount: 8,
      progress: 55,
      type: 'system'
    },
    {
      id: 'Pi',
      title: 'Penulisan Ilmiah',
      lecturer: 'Masbahah',
      materialsCount: 6,
      progress: 40,
      type: 'civics'
    }
  ];

  // Logic Pencarian
  const filteredCourses = coursesData.filter((courses) =>
    courses.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    courses.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col overflow-x-hidden">
      
      {/* ================= 1. TOP NAVIGATION BAR HORIZONTAL ================= */}
      <header className="h-16 px-4 sm:px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-50">
        
        {/* Brand Logo & Hamburger */}
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
          {/* Menu Aktif: Mata Kuliah */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30">
            <BookOpen size={14} />
            <span>Beranda</span>
          </div>

          <Link
            href="/student/profile"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <User size={14} />
            <span>Profil</span>
          </Link>

          {/* Tombol Keluar Navigasi */}
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
          <div className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 px-2.5 py-1 rounded-xl cursor-pointer hover:border-cyan-400/40 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40 shrink-0">
              ZZ
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-bold text-white leading-none">Zam Zam</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/70 backdrop-blur-md pt-20 px-4">
          <div className="w-full h-fit bg-slate-900 border border-blue-500/30 p-5 rounded-2xl flex flex-col space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <Link
                href="/student/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30 font-semibold"
              >
                <BookOpen size={16} />
                <span>Mata Kuliah</span>
              </Link>
              <Link
                href="/student/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <User size={16} />
                <span>Profil</span>
              </Link>
            </nav>
            <div className="pt-2 border-t border-blue-500/20">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium transition-all"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. KONTEN UTAMA HALAMAN ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Banner Header Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-900/50 border border-blue-500/20 p-5 sm:p-8 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-medium mx-auto md:mx-0">
              <GraduationCap size={14} />
              <span>EduMate Academic Space</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Mata Kuliah
            </h1>
            <p className="text-xs md:text-sm text-blue-200/70 leading-relaxed">
              Temukan dan lanjutkan pembelajaran mata kuliah kamu.
            </p>
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
              placeholder="Cari mata kuliah..."
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
                    aria-label="Opsi lainnya"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-900 text-blue-300 hover:text-white backdrop-blur-md transition-all"
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
                  <span className="truncate">{courses.lecturer}</span>
                </p>
              </div>

              {/* Progres & Jumlah Materi */}
              <div className="space-y-2 mt-2 pt-3 border-t border-blue-500/15">
                <div className="flex items-center justify-between text-[11px] text-blue-200/70 font-medium">
                  <span className="flex items-center gap-1 truncate">
                    <FileText size={12} className="text-cyan-400 shrink-0" />
                    <span>{courses.materialsCount} Materi</span>
                  </span>
                  <span className="text-cyan-300 font-bold shrink-0">{courses.progress}%</span>
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
                  href={`/student/courses/${courses.id}`}
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
    </div>
  );
}