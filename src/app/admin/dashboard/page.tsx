'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  History, 
  User, 
  LogOut, 
  ChevronDown, 
  Plus, 
  UserCheck, 
  Upload, 
  UserMinus, 
  Laptop, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export default function TendikDashboardPage() {
  const router = useRouter();
  const [activeMenu] = useState('dashboard');

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex relative overflow-hidden">
      
      {/* ================= 1. SIDEBAR KIRI ================= */}
      <aside className="w-64 bg-slate-950/80 border-r border-blue-500/15 flex flex-col p-4 md:p-6 shrink-0 z-30 backdrop-blur-xl">
        <div className="space-y-6">
          
          {/* Logo EduMate AI */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <GraduationCap size={22} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              EduMate AI
            </span>
          </div>

          {/* Navigasi Sidebar */}
          <nav className="space-y-1.5 pt-2">
            
            {/* 1. Dashboard */}
            <Link
              href="/admin/dashboard"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeMenu === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </Link>

            {/* 2. Kelola User */}
            <Link
              href="/admin/kelola-user"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'user'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users size={17} />
              <span>Kelola User</span>
            </Link>

            {/* 3. Riwayat */}
            <Link
              href="/admin/history"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'riwayat'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <History size={17} />
              <span>Riwayat</span>
            </Link>

            {/* 4. Profil */}
            <Link
              href="/admin/profile"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'profil'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User size={17} />
              <span>Profil</span>
            </Link>

            {/* 6. Keluar */}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left"
            >
              <LogOut size={17} />
              <span>Keluar</span>
            </button>

          </nav>
        </div>
      </aside>

      {/* ================= 2. AREA KONTEN UTAMA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-end sticky top-0 z-20">

          {/* User Profile Tendik di Pojok Kanan */}
          <button
            type="button"
            className="flex items-center gap-2.5 bg-slate-900/60 border border-blue-500/20 px-3 py-1.5 rounded-xl hover:border-cyan-400/40 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
              AD
            </div>
            <span className="text-xs font-bold text-white">Admin</span>
          </button>
        </header>

        {/* KONTEN UTAMA DASHBOARD */}
        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* 1. BANNER HEADER UTAMA */}
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900/90 to-blue-900/60 border border-blue-500/20 p-6 md:p-8 overflow-hidden shadow-2xl flex items-center justify-between">
            <div className="space-y-2 max-w-xl z-10">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                Halo <span className="animate-bounce">👋</span>
              </h1>
              <p className="text-xs text-blue-200/70 font-medium">
                Selamat datang di halaman tendik.
              </p>
              <p className="text-xs text-blue-200/50 leading-relaxed">
                Kelola data dan sumber belajar EduMate AI dengan mudah dan efisien.
              </p>
            </div>

            {/* Gambar Ilustrasi Kanan */}
            <div className="relative hidden md:flex items-center justify-center w-52 h-32 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] shrink-0">
              <div className="relative p-4 rounded-xl bg-slate-900/80 border border-cyan-400/40 text-cyan-300 shadow-lg">
                <Laptop size={40} />
                <CheckCircle2 size={18} className="absolute -top-2 -right-2 text-emerald-400 bg-slate-950 rounded-full" />
              </div>
            </div>
          </div>

          {/* 2. GRID 2 KOLOM (RINGKASAN DATA + AKTIVITAS TERBARU) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* KOLOM KIRI: RINGKASAN DATA + GRAFIK (7 Kolom) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Box Ringkasan Data (4 Stats) */}
              <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-blue-500/15 pb-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Ringkasan Data</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Stat 1 */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-blue-500/15">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center mb-2">
                      <Users size={14} />
                    </div>
                    <h4 className="text-lg font-extrabold text-white">124</h4>
                    <p className="text-[10px] text-blue-200/50">Total User</p>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-blue-500/15">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center mb-2">
                      <BookOpen size={14} />
                    </div>
                    <h4 className="text-lg font-extrabold text-white">32</h4>
                    <p className="text-[10px] text-blue-200/50">Mata Kuliah</p>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-blue-500/15">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-300 flex items-center justify-center mb-2">
                      <FileText size={14} />
                    </div>
                    <h4 className="text-lg font-extrabold text-white">568</h4>
                    <p className="text-[10px] text-blue-200/50">Total Dokumen</p>
                  </div>

                  {/* Stat 4 */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-blue-500/15">
                    <div className="w-7 h-7 rounded-lg bg-amber-600/20 text-amber-300 flex items-center justify-center mb-2">
                      <History size={14} />
                    </div>
                    <h4 className="text-lg font-extrabold text-white">1.240</h4>
                    <p className="text-[10px] text-blue-200/50">Aktivitas Hari Ini</p>
                  </div>
                </div>
              </div>

              {/* Box Grafik Aktivitas Terbaru */}
              <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
                  <h2 className="text-sm font-bold text-white">Aktivitas Terbaru</h2>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-blue-500/20 text-[10px] font-medium text-blue-200/70"
                  >
                    <span>7 Hari Terakhir</span>
                    <ChevronDown size={12} />
                  </button>
                </div>

                {/* SVG Area Line Chart Glowing */}
                <div className="pt-4 pb-2">
                  <div className="h-44 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,90 Q 70,110 140,50 T 280,80 T 420,90 L 500,30 L 500,150 L 0,150 Z"
                        fill="url(#chartGradient)"
                      />
                      <path
                        d="M 0,90 Q 70,110 140,50 T 280,80 T 420,90 L 500,30"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                      />
                      <circle cx="0" cy="90" r="4" fill="#06b6d4" />
                      <circle cx="83" cy="105" r="4" fill="#06b6d4" />
                      <circle cx="166" cy="50" r="4" fill="#06b6d4" />
                      <circle cx="250" cy="85" r="4" fill="#06b6d4" />
                      <circle cx="333" cy="70" r="4" fill="#06b6d4" />
                      <circle cx="416" cy="90" r="4" fill="#06b6d4" />
                      <circle cx="500" cy="30" r="5" fill="#38bdf8" className="animate-ping" />
                      <circle cx="500" cy="30" r="4" fill="#ffffff" />
                    </svg>

                    <div className="flex justify-between text-[10px] text-blue-300/50 pt-3">
                      <span>26 Sep</span>
                      <span>27 Sep</span>
                      <span>28 Sep</span>
                      <span>29 Sep</span>
                      <span>30 Sep</span>
                      <span>1 Okt</span>
                      <span>2 Okt</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* KOLOM KANAN: TABEL AKTIVITAS TERBARU (5 Kolom) */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
                  <h2 className="text-sm font-bold text-white">Aktivitas Terbaru</h2>
                </div>

                {/* Header Tabel */}
                <div className="grid grid-cols-12 text-[10px] font-semibold text-blue-300/50 pt-3 pb-2 border-b border-blue-500/10">
                  <span className="col-span-3">Waktu</span>
                  <span className="col-span-6">Aktivitas</span>
                  <span className="col-span-3 text-right">Pengguna</span>
                </div>

                {/* Rows Aktivitas */}
                <div className="space-y-3 pt-2 text-xs">
                  
                  {/* Row 1 */}
                  <div className="grid grid-cols-12 items-center text-[11px] py-1 border-b border-blue-500/10">
                    <div className="col-span-3 text-[10px] text-blue-300/60">
                      <div>02 Okt 2026</div>
                      <div>10:45</div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-12 items-center text-[11px] py-1 border-b border-blue-500/10">
                    <div className="col-span-3 text-[10px] text-blue-300/60">
                      <div>02 Okt 2026</div>
                      <div>09:32</div>
                    </div>
                    <div className="col-span-6 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                        <Plus size={13} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-[11px]">Menambahkan mata kuliah</p>
                        <p className="text-[9px] text-blue-300/50">Sistem Informasi</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-200">
                        <UserCheck size={11} className="text-cyan-400" /> Dosen
                      </span>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-12 items-center text-[11px] py-1 border-b border-blue-500/10">
                    <div className="col-span-3 text-[10px] text-blue-300/60">
                      <div>02 Okt 2026</div>
                      <div>08:17</div>
                    </div>
                    <div className="col-span-6 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-400 shrink-0">
                        <Users size={13} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-[11px]">Mengubah data user</p>
                        <p className="text-[9px] text-blue-300/50">Dosen - Rifa</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-200">
                        <UserCheck size={11} className="text-cyan-400" /> Tendik
                      </span>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-12 items-center text-[11px] py-1 border-b border-blue-500/10">
                    <div className="col-span-3 text-[10px] text-blue-300/60">
                      <div>01 Okt 2026</div>
                      <div>16:20</div>
                    </div>
                    <div className="col-span-6 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
                        <Upload size={13} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-[11px]">Mengupload dokumen</p>
                        <p className="text-[9px] text-blue-300/50">RPS - Basis Data</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-200">
                        <UserCheck size={11} className="text-cyan-400" /> Dosen
                      </span>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-12 items-center text-[11px] py-1">
                    <div className="col-span-3 text-[10px] text-blue-300/60">
                      <div>01 Okt 2026</div>
                      <div>14:05</div>
                    </div>
                    <div className="col-span-6 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
                        <UserMinus size={13} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-[11px]">Menghapus user</p>
                        <p className="text-[9px] text-blue-300/50">Mahasiswa - Andi Pratama</p>
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-200">
                        <UserCheck size={11} className="text-cyan-400" /> Tendik
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}