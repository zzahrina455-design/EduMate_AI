'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  History, 
  LogOut, 
  Edit3, 
  ShieldCheck, 
  Mail, 
  User, 
  Lock, 
  Save, 
  X,
  Activity
} from 'lucide-react';

export default function AdminProfilePage() {
  const router = useRouter();
  const [activeMenu] = useState('profil');

  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: 'Admin',
    email: 'admin@uns.ac.id',
    totalManagedUsers: 142,
    systemActivityLogs: 1250,
  });

  const [formData, setFormData] = useState(adminData);

  const handleSave = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdminData(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex relative overflow-hidden">
      
      {/* ================= 1. SIDEBAR KIRI ================= */}
      <aside className="w-64 bg-slate-950/80 border-r border-blue-500/15 flex flex-col justify-between p-4 md:p-5 shrink-0 z-30 backdrop-blur-xl">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <GraduationCap size={22} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              EduMate AI
            </span>
          </div>

          <nav className="space-y-1.5">
            <Link
              href="/admin/dashboard"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/kelola-user"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'kelola-user'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users size={17} />
              <span>Kelola User</span>
            </Link>

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

            <Link
              href="/admin/profil"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeMenu === 'profil'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User size={17} />
              <span>Profil</span>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-blue-500/15 text-center text-[10px] text-blue-300/40">
          EduMate AI Admin
        </div>
      </aside>

      {/* ================= 2. AREA KONTEN UTAMA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* HEADER ATAS (Diposisikan ke pojok kanan menggunakan ml-auto) */}
        <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-end sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-slate-900/80 border border-blue-500/20 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                AD
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">{adminData.name}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/20 text-xs font-medium transition-all"
              title="Keluar"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* KONTEN UTAMA PROFIL */}
        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* BANNER UTAMA PROFIL */}
          <div className="relative bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-slate-950 border border-blue-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
            
            <div className="absolute -right-10 -top-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-5 z-10">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-2xl md:text-3xl font-extrabold shadow-xl shadow-cyan-500/20 border border-cyan-400/40 shrink-0">
                ADM
                <div className="absolute -bottom-1.5 -right-1.5 bg-blue-900 text-cyan-300 p-1.5 rounded-lg border border-cyan-400/50 shadow-md">
                  <ShieldCheck size={16} />
                </div>
              </div>

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                  {adminData.name}
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFormData(adminData);
                setIsEditing(!isEditing);
              }}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 border border-cyan-400/30 z-10"
            >
              <Edit3 size={15} />
              <span>{isEditing ? 'Tutup Form Edit' : 'Edit Profil'}</span>
            </button>
          </div>

          {/* KARTU STATISTIK ADMIN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-xl flex items-center gap-4 shadow-xl">
              <div className="p-3.5 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-400/30">
                <Users size={22} />
              </div>
              <div>
                <span className="text-[11px] text-blue-200/60 font-medium block">Total User Terkelola</span>
                <span className="text-xl font-extrabold text-white mt-0.5 block">{adminData.totalManagedUsers} Akun</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-xl flex items-center gap-4 shadow-xl">
              <div className="p-3.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-400/30">
                <Activity size={22} />
              </div>
              <div>
                <span className="text-[11px] text-blue-200/60 font-medium block">Log Aktivitas Sistem</span>
                <span className="text-xl font-extrabold text-white mt-0.5 block">{adminData.systemActivityLogs} Catatan</span>
              </div>
            </div>
          </div>

          {/* BAGIAN INFORMASI PRIBADI & KONTAK ATAU FORM EDIT */}
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-blue-500/15">
              <div className="text-cyan-400">
                <User size={18} />
              </div>
              <h2 className="text-sm font-bold text-white">
                Informasi Pribadi & Kontak Administrator
              </h2>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label htmlFor="inputAdminName" className="block text-xs font-semibold text-blue-200 mb-1.5">
                    Nama Administrator
                  </label>
                  <input
                    id="inputAdminName"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="inputAdminTitle" className="block text-xs font-semibold text-blue-200 mb-1.5">
                    Jabatan / Gelar Sistem
                  </label>
                  <input
                    id="inputAdminTitle"
                    type="text"
                    required
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="inputAdminEmail" className="block text-xs font-semibold text-blue-200 mb-1.5">
                    Alamat Email Utama
                  </label>
                  <input
                    id="inputAdminEmail"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-blue-200/70 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <X size={14} />
                    <span>Batal</span>
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
                  >
                    <Save size={14} />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="block text-[11px] font-medium text-blue-300/50 mb-1">
                    Nama Lengkap / Identitas Admin
                  </span>
                  <div className="w-full bg-slate-950/80 border border-blue-500/15 rounded-xl px-4 py-3 text-xs text-white font-medium flex items-center justify-between">
                    <span>{adminData.name}</span>
                    <span className="text-[10px] text-cyan-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Verified</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-blue-300/50 mb-1">
                    Email Kontak
                  </span>
                  <div className="w-full bg-slate-950/80 border border-blue-500/15 rounded-xl px-4 py-3 text-xs text-white font-medium flex items-center gap-3">
                    <Mail size={15} className="text-cyan-400" />
                    <span>{adminData.email}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-blue-300/50 mb-1">
                    Keamanan & Hak Akses
                  </span>
                  <div className="w-full bg-slate-950/80 border border-blue-500/15 rounded-xl px-4 py-3 text-xs text-white font-medium flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock size={15} className="text-amber-400" />
                      <span>Autentikasi Dua Faktor (2FA) Aktif</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 font-bold">Aman</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}