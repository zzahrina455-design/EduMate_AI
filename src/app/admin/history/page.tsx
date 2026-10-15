'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { History, Search, Bot, Brain, FileText, LogOut } from 'lucide-react';

interface AIActivityLog {
  id: string;
  user: string;
  module: 'Tanya AI' | 'Practice AI' | 'Unggah Berkas';
  query: string;
  responseSummary: string;
  timestamp: string;
  status: 'Berhasil' | 'Gagal';
}

export default function AdminHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Tanya AI' | 'Practice AI'>('Semua');

  const logs: AIActivityLog[] = [
    {
      id: 'l1',
      user: 'Zam Zam (H1D021005)',
      module: 'Practice AI',
      query: 'Pitching Proyek EduMate AI - Asisten Akademik',
      responseSummary: 'Evaluasi Skor: 88/100. AI Juri menanggapi arsitektur sistem.',
      timestamp: '15 Okt 2026, 11:20',
      status: 'Berhasil'
    },
    {
      id: 'l2',
      user: 'Siti Rahma (H1D021012)',
      module: 'Tanya AI',
      query: 'Analisis Proposal_Penelitian_Gemastik.pdf',
      responseSummary: 'Pemeriksaan struktur abstrak dan referensi ilmiah selesai.',
      timestamp: '15 Okt 2026, 10:45',
      status: 'Berhasil'
    },
    {
      id: 'l3',
      user: 'Budi Santoso (H1D021045)',
      module: 'Tanya AI',
      query: 'Bagaimana cara konfigurasi privilege MySQL?',
      responseSummary: 'Memberikan penjelasan sintaks GRANT ALL PRIVILEGES.',
      timestamp: '14 Okt 2026, 16:15',
      status: 'Berhasil'
    },
    {
      id: 'l4',
      user: 'Ahmad Rizky (H1D021088)',
      module: 'Practice AI',
      query: 'Simulasi Wawancara Beasiswa LPDP',
      responseSummary: 'Sesi latihan ditutup sebelum selesai evaluasi.',
      timestamp: '14 Okt 2026, 09:30',
      status: 'Gagal'
    }
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  const filteredLogs = logs.filter((item) => {
    const matchesSearch =
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.query.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'Semua' || item.module === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const renderModuleIcon = (module: AIActivityLog['module']) => {
    if (module === 'Practice AI') return <Brain className="w-4 h-4 text-purple-400" />;
    if (module === 'Tanya AI') return <Bot className="w-4 h-4 text-cyan-400" />;
    return <FileText className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <History className="w-7 h-7 text-cyan-400" />
            <span>Riwayat Aktivitas EduMate AI</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Log pemrosesan kueri, analisis berkas, dan simulasi wawancara pengguna secara real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
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

      {/* Filter Tabs &amp; Search Bar */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {(['Semua', 'Tanya AI', 'Practice AI'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-[#070b19] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari user atau pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Table Log History */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#070b19] text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Modul AI</th>
                <th className="px-6 py-4">Kueri / Topik</th>
                <th className="px-6 py-4">Hasil Tanggapan</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#070b19]/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center space-x-1.5 text-xs bg-[#070b19] border border-slate-800 px-2.5 py-1 rounded-lg w-fit">
                      {renderModuleIcon(log.module)}
                      <span>{log.module}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-200 text-xs font-medium max-w-xs truncate">
                    {log.query}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs max-w-sm truncate">
                    {log.responseSummary}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {log.status === 'Berhasil' ? (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        Berhasil
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                        Gagal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}