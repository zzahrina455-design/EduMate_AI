'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, LayoutDashboard, Users, BookOpen, FileText, History, 
  Settings, LogOut, Search, Code, Database, Cpu, Network, 
  HardDrive, Shield, Menu, X 
} from 'lucide-react';

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const courses = [
    { name: 'Algoritma dan Pemrograman', icon: Code, code: 'IF110' },
    { name: 'Basis Data', icon: Database, code: 'IF210' },
    { name: 'Pemrograman Web', icon: BookOpen, code: 'IF310' },
    { name: 'Pemrograman Objek', icon: Cpu, code: 'IF220' },
    { name: 'Jaringan Komputer', icon: Network, code: 'IF320' },
    { name: 'Sistem Operasi', icon: HardDrive, code: 'IF230' },
    { name: 'Analisis dan Perancangan Sistem', icon: FileText, code: 'IF330' },
    { name: 'Kewarganegaraan', icon: Shield, code: 'UNS101' },
  ];

  return (
    <div className="min-h-screen flex text-slate-100 relative bg-[#0A1128]">
      <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Sidebar Desktop Admin */}
      <aside className="w-64 glass-card border-r border-white/10 flex-col justify-between hidden lg:flex sticky top-0 h-screen z-30">
        <div className="p-6 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              EduMate AI
            </span>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/crud" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
              <Users className="w-4 h-4" />
              <span>Kelola User</span>
            </Link>
            <Link href="/admin/courses" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
              <BookOpen className="w-4 h-4" />
              <span>Kelola Mata Kuliah</span>
            </Link>
            <Link href="/admin/documents" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
              <FileText className="w-4 h-4" />
              <span>Kelola Dokumen</span>
            </Link>
            <Link href="/admin/history" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
              <History className="w-4 h-4" />
              <span>Riwayat</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
              <Settings className="w-4 h-4" />
              <span>Pengaturan</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <Link href="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition font-medium text-xs">
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Sidebar Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-72 glass-card h-full border-r border-white/15 flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                    EduMate AI
                  </span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2 text-xs font-medium">
                <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/admin/crud" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
                  <Users className="w-4 h-4" />
                  <span>Kelola User</span>
                </Link>
                <Link href="/admin/courses" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
                  <BookOpen className="w-4 h-4" />
                  <span>Kelola Mata Kuliah</span>
                </Link>
                <Link href="/admin/documents" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
                  <FileText className="w-4 h-4" />
                  <span>Kelola Dokumen</span>
                </Link>
                <Link href="/admin/history" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
                  <History className="w-4 h-4" />
                  <span>Riwayat</span>
                </Link>
                <Link href="/admin/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition">
                  <Settings className="w-4 h-4" />
                  <span>Pengaturan</span>
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link href="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition font-medium text-xs">
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </Link>
            </div>
          </div>
         <button 
            type="button"
            onClick={() => setMobileMenuOpen(false)} 
            className="flex-1 bg-transparent border-none cursor-default"
            aria-label="Tutup menu"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 glass-card border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            {/* Tombol Hamburger Mobile */}
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-cyan-400 border border-white/10 shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari di sistem..." 
                className="w-full glass-input rounded-xl py-2 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-400 transition"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0 pl-2">
            <div className="flex items-center space-x-3 glass-card px-3 sm:px-4 py-2 rounded-2xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
                AD
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Admin</span>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Halo, Admin 👋</h1>
            <p className="text-xs text-slate-300">Kelola sistem EduMate AI dengan mudah.</p>
          </div>

          {/* Stats Cards - Responsif 2 kolom di mobile, 4 kolom di desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Total User</p>
                <h3 className="text-lg sm:text-xl font-bold text-white">124</h3>
              </div>
            </div>
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Total Dosen</p>
                <h3 className="text-lg sm:text-xl font-bold text-white">18</h3>
              </div>
            </div>
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Total Matkul</p>
                <h3 className="text-lg sm:text-xl font-bold text-white">8</h3>
              </div>
            </div>
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Total Dokumen</p>
                <h3 className="text-lg sm:text-xl font-bold text-white">56</h3>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">Daftar Mata Kuliah</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {courses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <div 
                    key={course.code} 
                    className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold">{course.code}</span>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition leading-snug">{course.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}