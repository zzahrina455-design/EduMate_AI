'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Save, ShieldCheck } from 'lucide-react';

export default function AdminProfilePage() {
  const router = useRouter();

  const [adminProfile, setAdminProfile] = useState({
    name: 'Administrator Utama',
    nip: '199208152019031002',
    department: 'Pusat Komputer & Akademik',
    email: 'admin.edumate@unsoed.ac.id',
    phone: '+62 811-9876-5432',
    avatar: 'AD'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner dengan Lencana Profil Admin di Ujung Kanan */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span>Profil Administrator</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Pengaturan identitas dan sistem kredensial pengelola platform.</p>
        </div>

        <div className="flex items-center space-x-3 bg-[#070b19] border border-slate-800/80 px-4 py-2 rounded-2xl shrink-0 shadow-inner">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
            {adminProfile.avatar}
          </div>
          <span className="text-sm font-semibold text-white">{adminProfile.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Profil Kiri &amp; Tombol Keluar */}
        <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 text-center flex flex-col items-center justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl mb-4 border-2 border-cyan-400/30">
              {adminProfile.avatar}
            </div>
            <h2 className="text-xl font-bold text-white">{adminProfile.name}</h2>
            <p className="text-cyan-400 text-sm font-medium mt-0.5">{adminProfile.nip}</p>
            <div className="mt-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              Super Admin Access
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar dari Akun</span>
          </button>
        </div>

        {/* Form Edit Profil Admin Kanan */}
        <div className="lg:col-span-2 bg-[#0c142b] border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Informasi Admin &amp; Kredensial
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="adminName" className="text-xs font-medium text-slate-400 block mb-1">Nama Administrator</label>
                <input
                  id="adminName"
                  type="text"
                  name="name"
                  value={adminProfile.name}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="nip" className="text-xs font-medium text-slate-400 block mb-1">NIP / ID Admin</label>
                <input
                  id="nip"
                  type="text"
                  name="nip"
                  value={adminProfile.nip}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="department" className="text-xs font-medium text-slate-400 block mb-1">Unit / Departemen</label>
                <input
                  id="department"
                  type="text"
                  name="department"
                  value={adminProfile.department}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="adminEmail" className="text-xs font-medium text-slate-400 block mb-1">Email Resmi System</label>
                <input
                  id="adminEmail"
                  type="text"
                  name="email"
                  value={adminProfile.email}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="adminPhone" className="text-xs font-medium text-slate-400 block mb-1">Nomor Kontak Darurat</label>
                <input
                  id="adminPhone"
                  type="text"
                  name="phone"
                  value={adminProfile.phone}
                  onChange={handleChange}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs text-emerald-400 font-medium animate-fadeIn">
                  ✓ Profil Admin berhasil diperbarui!
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