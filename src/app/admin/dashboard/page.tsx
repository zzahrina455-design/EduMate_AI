'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Bot, 
  Brain, 
  Activity, 
  LogOut,
  TrendingUp, 
  ShieldCheck,
  Clock,
  ChevronRight,
  Server
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  const stats = [
    { title: 'Total Pengguna', value: '1,284', change: '+12% bulan ini', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { title: 'Sesi Tanya AI', value: '18,420', change: '+24% minggu ini', icon: Bot, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Simulasi Pitching', value: '3,150', change: '+8% minggu ini', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Status Model AI', value: 'Aktif 99.9%', change: 'EduMate Turbo v4', icon: Server, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
  ];

  const recentLogs = [
    { id: '1', user: 'Zam Zam (H1D021005)', action: 'Mengunggah proposal &amp; memulai simulasi AI Juri', time: '5 menit lalu', type: 'Practice AI' },
    { id: '2', user: 'Siti Rahma (H1D021012)', action: 'Mengirim dokumen PDF ke Tanya AI', time: '12 menit lalu', type: 'Tanya AI' },
    { id: '3', user: 'Budi Santoso (H1D021045)', action: 'Mendaftar kompetisi Gemastik UI/UX', time: '25 menit lalu', type: 'Sistem' },
    { id: '4', user: 'Ahmad Rizky (H1D021088)', action: 'Memperbarui informasi profil mahasiswa', time: '1 jam lalu', type: 'Profil' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner &amp; Logout */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span>Dashboard Administrator</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Ringkasan statistik pengguna, performa AI, dan aktivitas platform EduMate AI.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="hidden sm:flex items-center space-x-3 bg-[#070b19] border border-slate-800/80 px-4 py-2 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
              AD
            </div>
            <span className="text-sm font-semibold text-white">Admin Utama</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Grid Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const IconComp = s.icon;
          return (
            <div key={s.title} className="bg-[#0c142b] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-400">{s.title}</span>
                <div className={`p-2.5 rounded-xl border ${s.bg}`}>
                  <IconComp className={`w-5 h-5 ${s.color}`} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white block">{s.value}</span>
                <span className="text-[11px] text-slate-400 mt-1 block flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400 inline mr-1" />
                  {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Analytics &amp; Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafik Visualisasi AI Usage Mockup */}
        <div className="lg:col-span-2 bg-[#0c142b] border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Volume Penggunaan AI Harian</span>
            </h2>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-xl font-semibold">
              7 Hari Terakhir
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Sen', val: 65 },
              { day: 'Sel', val: 80 },
              { day: 'Rab', val: 45 },
              { day: 'Kam', val: 95 },
              { day: 'Jum', val: 75 },
              { day: 'Sab', val: 110 },
              { day: 'Ming', val: 88 }
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xl transition-all duration-300 group-hover:brightness-125"
                  style={{ height: `${d.val}px` }}
                />
                <span className="text-xs text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed Log */}
        <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Aktivitas Pengguna Terbaru</span>
            </h2>

            <div className="mt-4 space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="bg-[#070b19] border border-slate-800 p-3 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{log.user}</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{log.type}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{log.action}</p>
                  <span className="text-[10px] text-slate-500 block text-right">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push('/admin/history')}
            className="w-full bg-[#070b19] hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>Lihat Seluruh Riwayat</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}