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

  // Data 8 Mata Kuliah sesuai Gambar Mockup
  const coursesData: Courses[] = [
    {
      id: '1',
      title: 'Basis Data',
      lecturer: 'Dr. Budi Santoso, S.Kom., M.Kom.',
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
      id: '3',
      title: 'Kecerdasan Buatan',
      lecturer: 'Prof. Dr. Andi Wijaya, S.T., M.T.',
      materialsCount: 12,
      progress: 80,
      type: 'ai'
    },
    {
      id: '4',
      title: 'Pemrograman Berorientasi Objek',
      lecturer: 'Siti Rahma, S.Kom., M.T.',
      materialsCount: 10,
      progress: 70,
      type: 'oop'
    },
    {
      id: '5',
      title: 'Jaringan Komputer',
      lecturer: 'Ahmad Fauzi, S.T., M.Eng.',
      materialsCount: 8,
      progress: 65,
      type: 'network'
    },
    {
      id: '6',
      title: 'Sistem Operasi',
      lecturer: 'Dewi Lestari, S.Kom., M.T.',
      materialsCount: 10,
      progress: 60,
      type: 'os'
    },
    {
      id: '7',
      title: 'Analisis dan Perancangan Sistem',
      lecturer: 'Fajar Nugroho, S.T., M.T.',
      materialsCount: 8,
      progress: 55,
      type: 'system'
    },
    {
      id: '8',
      title: 'Kewarganegaraan',
      lecturer: 'Sri Mulyani, S.Pd., M.Pd.',
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
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col">
      
      {/* ================= 1. TOP NAVIGATION BAR HORIZONTAL ================= */}
      <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-50">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <GraduationCap size={22} />
          </div>
          <span className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            EduMate AI
          </span>
        </div>

        {/* Menu Navigasi Tengah */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-2xl border border-blue-500/15">
          {/* Menu Aktif: Mata Kuliah */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30">
            <BookOpen size={14} />
            <span>Mata Kuliah</span>
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
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40">
              ZZ
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-bold text-white leading-none">Zam Zam</span>
              <span className="block text-[9px] text-blue-300/60 leading-tight mt-0.5">Mahasiswa</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. KONTEN UTAMA HALAMAN ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Banner Header Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-900/50 border border-blue-500/20 p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-medium">
              <GraduationCap size={14} />
              <span>EduMate Academic Space</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Mata Kuliah
            </h1>
            <p className="text-xs md:text-sm text-blue-200/70 leading-relaxed">
              Temukan dan lanjutkan pembelajaran mata kuliah kamu.
            </p>
          </div>

          {/* Graphic Banner Kanan */}
          <div className="relative w-48 h-28 hidden md:flex items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
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
              className="w-full bg-slate-900/60 border border-blue-500/20 rounded-2xl pl-11 pr-12 py-3 text-xs md:text-sm text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400/60 backdrop-blur-md transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Grid 8 Kartu Mata Kuliah */}
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
                  {courses.lecturer}
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