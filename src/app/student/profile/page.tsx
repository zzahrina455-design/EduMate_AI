'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Save } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();

  const [userProfile, setUserProfile] = useState({
    name: 'Zam Zam',
    nim: 'H1D021005',
    major: 'Informatika',
    faculty: 'Teknik',
    email: 'zamzam@student.ac.id',
    phone: '+62 812-3456-7890',
    avatar: 'ZZ'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.ChangeEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <User className="w-6 h-6 text-cyan-400" />
            <span>Profil Mahasiswa</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Informasi data diri akademik dan pengaturan akun.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Profil Kiri & Tombol Keluar */}
        <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 text-center flex flex-col items-center justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl mb-4 border-2 border-cyan-400/30">
              {userProfile.avatar}
            </div>
            <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
            <p className="text-cyan-400 text-sm font-medium mt-0.5">{userProfile.nim}</p>
            <div className="mt-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              Mahasiswa Aktif
            </div>
          </div>

          {/* Tombol Keluar */}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar dari Akun</span>
          </button>
        </div>

        {/* Form Edit Profil Kanan */}
        <div className="lg:col-span-2 bg-[#0c142b] border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Informasi Akademik &amp; Kontak
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-slate-400 block mb-1">Nama Lengkap</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={userProfile.name}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="nim" className="text-xs font-medium text-slate-400 block mb-1">Nomor Induk Mahasiswa (NIM)</label>
                <input
                  id="nim"
                  type="text"
                  name="nim"
                  value={userProfile.nim}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="major" className="text-xs font-medium text-slate-400 block mb-1">Program Studi</label>
                <input
                  id="major"
                  type="text"
                  name="major"
                  value={userProfile.major}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="faculty" className="text-xs font-medium text-slate-400 block mb-1">Fakultas</label>
                <input
                  id="faculty"
                  type="text"
                  name="faculty"
                  value={userProfile.faculty}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium text-slate-400 block mb-1">Email Kampus</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={userProfile.email}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-xs font-medium text-slate-400 block mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs text-emerald-400 font-medium animate-fadeIn">
                  ✓ Profil berhasil diperbarui!
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}