'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  History, 
  User, 
  Mail, 
  Edit3, 
  LogOut, 
  CheckCircle2, 
  Briefcase, 
  BookCheck,
  ShieldCheck, 
  Save, 
  X,
  Menu,
  Database
} from 'lucide-react';

interface CourseAssigned {
  id: string;
  title: string;
  code: string;
  materialsCount: number;
}

export default function LecturerProfilePage() {
  const router = useRouter();

  // State Edit Mode, Toast, & Mobile Menu
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State Form Profil Dosen
  const [profileData, setProfileData] = useState({
    fullName: 'Darmawan Lahru Riatma, S.Kom., M.MT.',
    email: 'darmawan@Dosen.uns.ac.id'
  });

  // State Data Mata Kuliah yang Diampu
  const [assignedCourses] = useState<CourseAssigned[]>([
    { id: '1', title: 'Manajemen Proyek', code: 'TIF301', materialsCount: 10 },
    { id: '2', title: 'Frontend', code: 'TIF302', materialsCount: 12 }
  ]);

  // Toast Notification
  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  }

  // Handler Simpan Perubahan Profil
  const handleSaveProfile = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profil berhasil diperbarui!');
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

      {/* ================= 1. TOP NAVIGATION BAR ================= */}
      <header className="h-16 px-4 sm:px-6 border-b border-blue-500/15 bg-slate-950/70 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-blue-500/20 text-blue-200 hover:text-white transition-all cursor-pointer"
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

        {/* Akses Cepat Kanan (Profil User Header) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-slate-900/60 border border-blue-500/20 px-3 py-1.5 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40 shrink-0">
              DL
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-white leading-none">Darmawan Lahru Riatma</span>
              <span className="block text-[9px] text-blue-300/60 leading-tight mt-0.5">Dosen</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-md pt-20 px-4">
          <div className="w-full h-fit bg-slate-900 border border-blue-500/30 p-5 rounded-2xl flex flex-col space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
              <span className="text-xs font-bold text-cyan-300">Menu Navigasi Dosen</span>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <Link 
                href="/dosen/dashboard" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <LayoutDashboard size={16} className="text-blue-300/60" />
                <span>Beranda</span>
              </Link>
              <Link 
                href="/dosen/courses" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <BookOpen size={16} className="text-blue-300/60" />
                <span>Mata Kuliah</span>
              </Link>
              <Link 
                href="/dosen/courses/Manpro" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <Database size={16} className="text-cyan-400" />
                <span>Upload Dokumen</span>
              </Link>
              <Link 
                href="/dosen/history" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <History size={16} className="text-blue-300/60" />
                <span>Riwayat</span>
              </Link>
              <Link 
                href="/dosen/profile" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30 font-semibold"
              >
                <User size={16} className="text-white" />
                <span>Profil</span>
              </Link>
            </nav>
            <div className="pt-2 border-t border-blue-500/20">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/login');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all text-xs font-medium cursor-pointer text-left"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. LAYOUT UTAMA (SIDEBAR + CONTENT) ================= */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-4 sm:p-6 gap-6 overflow-hidden">
        
        {/* SIDEBAR KIRI (DESKTOP) */}
        <aside className="w-56 hidden lg:flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-1">
            <Link href="/dosen/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <LayoutDashboard size={17} className="text-blue-300/60" />
              <span>Beranda</span>
            </Link>

            <Link href="/dosen/courses" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <BookOpen size={17} className="text-blue-300/60" />
              <span>Mata Kuliah</span>
            </Link>

            <Link href="/dosen/courses/Manpro" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <Database size={17} className="text-cyan-400" />
              <span>Upload Dokumen</span>
            </Link>

            <Link href="/dosen/history" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <History size={17} className="text-blue-300/60" />
              <span>Riwayat</span>
            </Link>

            <Link href="/dosen/profile" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30">
              <User size={17} className="text-white" />
              <span>Profil</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-blue-500/15">
            {/* Tombol Keluar di Sidebar */}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left cursor-pointer"
            >
              <LogOut size={17} />
              <span>Keluar</span>
            </button>
          </div>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 flex flex-col min-w-0 space-y-6 overflow-y-auto pr-0 lg:pr-1">
          
          {/* BANNER HEADER PROFIL */}
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900/90 to-blue-900/60 border border-blue-500/20 p-5 sm:p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10 min-w-0">
              {/* Avatar Dosen Large */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-cyan-500/30 border-2 border-cyan-300/50">
                  DLR
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-blue-600 border border-cyan-300 text-white shadow-md" title="Dosen Terverifikasi">
                  <ShieldCheck size={16} />
                </div>
              </div>

              {/* Data Utama Nama Dosen */}
              <div className="space-y-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white truncate max-w-full">
                  {profileData.fullName}
                </h1>
                <p className="text-xs text-blue-300/70">Dosen Pengampu / Akademisi</p>
              </div>
            </div>

            {/* Tombol Aksi Header */}
            <div className="flex items-center gap-2 z-10 shrink-0 w-full sm:w-auto justify-center">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Edit3 size={15} />
                  <span>Edit Profil</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-200 text-xs font-medium flex items-center justify-center gap-2 border border-blue-500/20 transition-all cursor-pointer"
                >
                  <X size={15} />
                  <span>Batal</span>
                </button>
              )}
            </div>
          </div>

          {/* KARTU STATISTIK RINGKAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl shadow-xl flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400 border border-cyan-400/30 shrink-0">
                <BookOpen size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-blue-200/60 font-medium truncate">Mata Kuliah Diampu</p>
                <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">{assignedCourses.length} Kelas</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl shadow-xl flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-300 border border-purple-500/30 shrink-0">
                <BookCheck size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-blue-200/60 font-medium truncate">Total Modul & RPS</p>
                <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">30 Dokumen</p>
              </div>
            </div>
          </div>

          {/* KARTU INFORMASI PRIBADI & KONTAK */}
          <div className="w-full bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 truncate">
                <Briefcase size={16} className="text-cyan-400 shrink-0" />
                <span className="truncate">Informasi Pribadi & Kontak</span>
              </h2>
              {isEditing && (
                <span className="text-[10px] text-cyan-300 font-semibold px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/30 shrink-0">
                  Mode Edit
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="fullNameInput" className="block font-semibold text-blue-200 mb-1">
                  Nama Lengkap beserta Gelar
                </label>
                <input
                  id="fullNameInput"
                  type="text"
                  disabled={!isEditing}
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-white transition-all text-xs ${
                    isEditing 
                      ? 'border-cyan-400/60 focus:outline-none' 
                      : 'border-blue-500/20 opacity-80 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="emailInput" className="block font-semibold text-blue-200 mb-1">
                  Email 
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/50 shrink-0" size={15} />
                  <input
                    id="emailInput"
                    type="email"
                    disabled={!isEditing}
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3.5 py-2.5 text-white transition-all text-xs ${
                      isEditing 
                        ? 'border-cyan-400/60 focus:outline-none' 
                        : 'border-blue-500/20 opacity-80 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {/* Tombol Simpan saat Mode Edit */}
              {isEditing && (
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <Save size={15} />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              )}

            </form>

          </div>

        </main>

      </div>

    </div>
  );
}