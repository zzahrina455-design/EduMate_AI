'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap,
  User, 
  Mail, 
  LogOut, 
  Edit3, 
  Key, 
  CheckCircle2, 
  Bell, 
  X, 
  LayoutDashboard,
  Calendar
} from 'lucide-react';

interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
}

export default function ProfilePage() {
  const router = useRouter();

  // State Data Profil
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Zam Zam',
    email: 'zam@student.uns.ac.id',
    bio: 'i love tulip'
  });

  // State Modal & Toast
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Temp Edit Profil
  const [editForm, setEditForm] = useState<UserProfile>({ ...profile });

  // Form Temp Ubah Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State Preferensi Notifikasi
  const [taskReminder, setTaskReminder] = useState(true);

  // Trigger Toast Notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handler Simpan Profil
  const handleSaveProfile = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditModalOpen(false);
    showToast('Profil berhasil diperbarui!');
  };

  // Handler Ubah Password
  const handleChangePassword = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi kata sandi baru tidak cocok!');
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordModalOpen(false);
    showToast('Kata sandi berhasil diubah!');
  };

  // Logout
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-4 py-2.5 rounded-xl backdrop-blur-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 text-xs font-semibold">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= 1. TOP NAVIGATION BAR ================= */}
      <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/70 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <GraduationCap size={22} />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            EduMate AI
          </span>
        </div>

        {/* Navigasi Utama */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-2xl border border-blue-500/15">
          <Link
            href="/student/courses"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <LayoutDashboard size={14} />
            <span>Beranda</span>
          </Link>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30">
            <User size={14} />
            <span>Profil</span>
          </div>
        </nav>

        {/* Logout Quick Action */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Keluar dari akun"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium transition-all"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </header>

      {/* ================= 2. KONTEN UTAMA FULL WIDTH ================= */}
      <main className="flex-1 w-full p-4 md:p-6 space-y-6">
        
        {/* Kartu Utama Profil (Full Width) */}
        <div className="w-full bg-slate-900/60 border border-blue-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 border border-cyan-300/40 shrink-0">
              ZZ
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
              <p className="text-xs text-blue-300/60 italic pt-1">&ldquo;{profile.bio}&rdquo;</p>
            </div>
          </div>

          {/* Tombol Aksi Profil */}
          <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditModalOpen(true);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all"
            >
              <Edit3 size={14} />
              <span>Edit Profil</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-blue-200 text-xs font-medium flex items-center justify-center gap-2 border border-blue-500/20 transition-all"
            >
              <Key size={14} className="text-cyan-400" />
              <span>Ubah Password</span>
            </button>
          </div>
        </div>

        {/* Grid 2 Kolom Full Width: Informasi Kontak & Preferensi Notifikasi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          
          {/* Informasi Kontak */}
          <div className="w-full bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 space-y-4 backdrop-blur-xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-blue-500/15 pb-3">
              <User size={16} className="text-cyan-400" />
              <span>Informasi Kontak</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-blue-500/10">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-blue-300/50 block">Email</span>
                  <p className="font-medium text-white truncate">{profile.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferensi Notifikasi */}
          <div className="w-full bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 space-y-4 backdrop-blur-xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-blue-500/15 pb-3">
              <Bell size={16} className="text-cyan-400" />
              <span>Preferensi Notifikasi</span>
            </h2>

            <div className="space-y-3 text-xs">
              {/* Toggle Pengingat Tugas */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-blue-500/10">
                <div>
                  <span className="font-medium text-white block">Pengingat Catatan & Tugas</span>
                  <span className="text-[10px] text-blue-300/50">Notifikasi batas waktu</span>
                </div>
                <button
                  type="button"
                  aria-label="Toggle Pengingat Catatan dan Tugas"
                  onClick={() => setTaskReminder(!taskReminder)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                    taskReminder ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    taskReminder ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Aktivitas Terakhir (Full Width) */}
        <div className="w-full bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar size={16} className="text-cyan-400" />
              <span>Aktivitas Terakhir</span>
            </h2>
            <Link href="/student/history/Manpro" className="text-[11px] text-cyan-300 hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-blue-500/10 flex items-center justify-between">
              <span className="font-medium text-white truncate pr-2">Bertanya tentang WBS pada Manajemen Proyek</span>
              <span className="text-[10px] text-blue-300/50 shrink-0">Hari ini • 14:10</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-blue-500/10 flex items-center justify-between">
              <span className="font-medium text-white truncate pr-2">Menambahkan tugas baru: Integrasi REST API</span>
              <span className="text-[10px] text-blue-300/50 shrink-0">Kemarin • 10:24</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-blue-500/10 flex items-center justify-between">
              <span className="font-medium text-white truncate pr-2">Membaca materi Normalisasi Basis Data</span>
              <span className="text-[10px] text-blue-300/50 shrink-0">2 Okt 2026</span>
            </div>
          </div>
        </div>

      </main>

      {/* ================= MODAL EDIT PROFIL ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Edit3 size={16} className="text-cyan-400" />
                <span>Edit Profil</span>
              </div>
              <button
                type="button"
                aria-label="Tutup modal"
                onClick={() => setIsEditModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label htmlFor="editFullName" className="block font-semibold text-blue-200 mb-1">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <input
                  id="editFullName"
                  type="text"
                  required
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="editEmail" className="block font-semibold text-blue-200 mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="editEmail"
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="editBio" className="block font-semibold text-blue-200 mb-1">
                  Bio Singkat
                </label>
                <textarea
                  id="editBio"
                  rows={2}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl font-medium text-blue-200/70 hover:text-white transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md shadow-blue-600/30"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL UBAH PASSWORD ================= */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Key size={16} className="text-cyan-400" />
                <span>Ubah Password</span>
              </div>
              <button
                type="button"
                aria-label="Tutup modal"
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label htmlFor="oldPassword" className="block font-semibold text-blue-200 mb-1">
                  Kata Sandi Saat Ini <span className="text-red-400">*</span>
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block font-semibold text-blue-200 mb-1">
                  Kata Sandi Baru <span className="text-red-400">*</span>
                </label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-semibold text-blue-200 mb-1">
                  Ulangi Kata Sandi Baru <span className="text-red-400">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl font-medium text-blue-200/70 hover:text-white transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md shadow-blue-600/30"
                >
                  Ubah Password
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}