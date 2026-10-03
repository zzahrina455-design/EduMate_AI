'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  BookOpen, 
  MessageSquareText, 
  History, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  Key, 
  CheckCircle2, 
  Building2, 
  Award, 
  Sparkles, 
  Lock, 
  Bell, 
  X, 
  LayoutDashboard,
  Calendar,
  BadgeCheck
} from 'lucide-react';

interface UserProfile {
  fullName: string;
  nim: string;
  email: string;
  phone: string;
  major: string;
  faculty: string;
  semester: string;
  academicAdvisor: string;
  bio: string;
}

export default function ProfilePage() {
  const router = useRouter();

  // State Profil Pengguna
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Zam Zam',
    nim: '220411100123',
    email: 'zamzam@student.kampus.ac.id',
    phone: '+62 812-3456-7890',
    major: 'Teknik Informatika',
    faculty: 'Fakultas Teknik',
    semester: 'Semester 6',
    academicAdvisor: 'Darmawan Lahru Riatma, S.Kom., M.MT.',
    bio: 'Mahasiswa Teknik Informatika yang tertarik pada bidang Kecerdasan Buatan, Pengembangan Web, dan Sistem Basis Data.'
  });

  // State Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Temporary untuk Edit Profil
  const [editForm, setEditForm] = useState<UserProfile>({ ...profile });

  // State Temporary untuk Ubah Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State Toggle Notifikasi
  const [emailNotify, setEmailNotify] = useState(true);
  const [taskReminder, setTaskReminder] = useState(true);

  // Trigger Toast Notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simpan Perubahan Profil
  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditModalOpen(false);
    showToast('Profil berhasil diperbarui!');
  };

  // Simpan Perubahan Password
  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
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

  // Keluar / Logout
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 text-xs font-semibold">
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

        {/* Menu Navigasi Utama */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-2xl border border-blue-500/15">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <LayoutDashboard size={14} />
            <span>Beranda</span>
          </Link>

          <Link
            href="/student/courses"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <BookOpen size={14} />
            <span>Mata Kuliah</span>
          </Link>

          <Link
            href="/student/chat/Manpro"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <MessageSquareText size={14} />
            <span>Tanya Jawab</span>
          </Link>

          <Link
            href="/student/history/Manpro"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white transition-all"
          >
            <History size={14} />
            <span>Riwayat</span>
          </Link>

          {/* Menu Aktif: Profil */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30">
            <User size={14} />
            <span>Profil</span>
          </div>
        </nav>

        {/* Profil Singkat & Keluar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 px-2.5 py-1 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40">
              ZZ
            </div>
            <span className="text-xs font-bold text-white hidden lg:block">{profile.fullName}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all"
            title="Keluar dari Akun"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* ================= 2. KONTEN UTAMA ================= */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-6">
        
        {/* Banner Header Profil */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900/90 to-blue-900/60 border border-blue-500/20 p-6 md:p-8 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Foto & Identitas */}
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-2xl md:text-3xl font-extrabold shadow-xl shadow-cyan-500/30 border-2 border-cyan-300/40">
                  ZZ
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-lg border-2 border-slate-950 text-white" title="Status Aktif">
                  <BadgeCheck size={14} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-semibold">
                  <Sparkles size={12} />
                  <span>{profile.semester} • Aktif Akademik</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {profile.fullName}
                </h1>
                <p className="text-xs text-blue-200/80 flex items-center justify-center md:justify-start gap-2">
                  <span>NIM: <strong className="text-cyan-300 font-medium">{profile.nim}</strong></span>
                  <span>•</span>
                  <span>{profile.major}</span>
                </p>
              </div>
            </div>

            {/* Tombol Aksi Cepat Header */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  setEditForm({ ...profile });
                  setIsEditModalOpen(true);
                }}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
              >
                <Edit3 size={15} />
                <span>Edit Profil</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-blue-200 text-xs font-medium flex items-center justify-center gap-2 border border-blue-500/20 hover:border-cyan-400/40 transition-all"
              >
                <Key size={15} className="text-cyan-400" />
                <span>Ubah Password</span>
              </button>
            </div>

          </div>
        </div>

        {/* Grid Ringkasan Statistik Pembelajaran EduMate AI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
            <span className="text-2xl md:text-3xl font-extrabold text-cyan-400">28</span>
            <p className="text-[11px] text-blue-200/70 font-medium">Pertanyaan Diajukan</p>
          </div>
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
            <span className="text-2xl md:text-3xl font-extrabold text-blue-400">8</span>
            <p className="text-[11px] text-blue-200/70 font-medium">Mata Kuliah Diikuti</p>
          </div>
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
            <span className="text-2xl md:text-3xl font-extrabold text-cyan-400">12</span>
            <p className="text-[11px] text-blue-200/70 font-medium">Catatan Tersimpan</p>
          </div>
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 text-center space-y-1 backdrop-blur-md">
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-400">99%</span>
            <p className="text-[11px] text-blue-200/70 font-medium">Tingkat Kehadiran RAG</p>
          </div>
        </div>

        {/* Content Section: 2 Kolom Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* KOLOM KIRI: Informasi Detail Akademik & Bio (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kartu Informasi Akademik */}
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-6 space-y-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-blue-500/15 pb-3">
                <Building2 size={18} className="text-cyan-400" />
                <span>Informasi Akademik & Kontak</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <span className="text-[10px] text-blue-300/50 block">Email Kampus</span>
                  <div className="flex items-center gap-2 text-white font-medium truncate">
                    <Mail size={13} className="text-cyan-400 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <span className="text-[10px] text-blue-300/50 block">Nomor Telepon</span>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Phone size={13} className="text-cyan-400 shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <span className="text-[10px] text-blue-300/50 block">Fakultas</span>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Award size={13} className="text-cyan-400 shrink-0" />
                    <span>{profile.faculty}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <span className="text-[10px] text-blue-300/50 block">Dosen Wali / Pembimbing</span>
                  <div className="flex items-center gap-2 text-white font-medium truncate">
                    <User size={13} className="text-cyan-400 shrink-0" />
                    <span className="truncate">{profile.academicAdvisor}</span>
                  </div>
                </div>
              </div>

              {/* Bio Singkat */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1.5 text-xs">
                <span className="text-[10px] text-blue-300/50 block font-semibold">Bio / Catatan Diri</span>
                <p className="text-blue-200/80 leading-relaxed italic">
                  &ldquo;{profile.bio}&rdquo;
                </p>
              </div>
            </div>

            {/* Kartu Status Keamanan Data RAG */}
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-6 space-y-3 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-blue-500/15 pb-3">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span>Keamanan & Privasi Data RAG</span>
              </div>
              <p className="text-xs text-blue-200/70 leading-relaxed">
                Seluruh pertanyaan, catatan, dan riwayat dokumen yang Anda unggah dilindungi oleh enkripsi tingkat tinggi sesuai standar privasi kampus.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                <Lock size={13} />
                <span>Kerahasiaan Dokumen Terjamin 100%</span>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: Pengaturan Notifikasi & Aktivitas Terakhir (5 Kolom) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pengaturan Notifikasi & Preferensi */}
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-6 space-y-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-blue-500/15 pb-3">
                <Bell size={18} className="text-cyan-400" />
                <span>Preferensi Notifikasi</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10">
                  <div>
                    <span className="font-semibold text-white block">Email Notifikasi Materi</span>
                    <span className="text-[10px] text-blue-300/50">Dapatkan email saat ada modul baru</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailNotify(!emailNotify)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      emailNotify ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      emailNotify ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10">
                  <div>
                    <span className="font-semibold text-white block">Pengingat Tugas / Catatan</span>
                    <span className="text-[10px] text-blue-300/50">Notifikasi batas waktu pengerjaan</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTaskReminder(!taskReminder)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      taskReminder ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      taskReminder ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Riwayat Aktivitas Singkat */}
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-6 space-y-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Calendar size={18} className="text-cyan-400" />
                  <span>Aktivitas Terakhir</span>
                </div>
                <Link href="/student/history/Manpro" className="text-[11px] text-cyan-300 hover:underline font-medium">
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <p className="font-medium text-white truncate">Bertanya tentang RAG pada Modul AI</p>
                  <span className="text-[10px] text-blue-300/50 block">Hari ini • 14:10</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <p className="font-medium text-white truncate">Menambahkan catatan tugas Manajemen Proyek</p>
                  <span className="text-[10px] text-blue-300/50 block">Kemarin • 10:24</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/40 border border-blue-500/10 space-y-1">
                  <p className="font-medium text-white truncate">Membaca modul 1NF, 2NF, 3NF Basis Data</p>
                  <span className="text-[10px] text-blue-300/50 block">2 Okt 2026 • 16:45</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ================= MODAL EDIT PROFIL ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Edit3 size={18} className="text-cyan-400" />
                <span>Edit Informasi Profil</span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
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
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="editEmail" className="block font-semibold text-blue-200 mb-1">
                    Email Akademik <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="editEmail"
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="editPhone" className="block font-semibold text-blue-200 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    id="editPhone"
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="editMajor" className="block font-semibold text-blue-200 mb-1">
                    Program Studi
                  </label>
                  <input
                    id="editMajor"
                    type="text"
                    value={editForm.major}
                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="editSemester" className="block font-semibold text-blue-200 mb-1">
                    Semester
                  </label>
                  <input
                    id="editSemester"
                    type="text"
                    value={editForm.semester}
                    onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="editBio" className="block font-semibold text-blue-200 mb-1">
                  Bio / Catatan Diri
                </label>
                <textarea
                  id="editBio"
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-medium text-blue-200/70 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md shadow-blue-600/30"
                >
                  Simpan Profil
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL UBAH PASSWORD ================= */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Key size={18} className="text-cyan-400" />
                <span>Ubah Kata Sandi</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label htmlFor="oldPassword" className="block font-semibold text-blue-200 mb-1">
                  Kata Sandi Lama <span className="text-red-400">*</span>
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  required
                  placeholder="Masukkan kata sandi saat ini"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
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
                  placeholder="Minimal 8 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-semibold text-blue-200 mb-1">
                  Konfirmasi Kata Sandi Baru <span className="text-red-400">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="Ulangi kata sandi baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-medium text-blue-200/70 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-md shadow-blue-600/30"
                >
                  Ubah Kata Sandi
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}