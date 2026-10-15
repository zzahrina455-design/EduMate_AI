'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  History as HistoryIcon,
  FileText,
  Clock,
  LogOut,
  Trash2,
  X,
  Bot,
  User,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface HistoryItem {
  id: string;
  activity: string;
  timestamp: string;
  status: 'Completed' | 'Pending';
  score?: string;
  conversation: ChatMessage[];
}

export default function HistoryPage() {
  const router = useRouter();

  const [historyList, setHistoryList] = useState<HistoryItem[]>([
    {
      id: 'h1',
      activity: 'Mengikuti Kuis Interaktif Pemrograman Web',
      timestamp: '12 Okt 2026, 14:30',
      status: 'Completed',
      score: '95/100',
      conversation: [
        { id: 'c1', sender: 'user', text: 'Mulai sesi kuis pemrograman web.', time: '14:30' },
        { id: 'c2', sender: 'ai', text: 'Pertanyaan 1: Apa fungsi utama dari tag <section> dalam HTML5?', time: '14:31' },
        { id: 'c3', sender: 'user', text: 'Tag <section> digunakan untuk mengelompokkan konten yang memiliki tema serupa.', time: '14:32' },
        { id: 'c4', sender: 'ai', text: 'Jawaban Anda tepat! Skor sementara: 100.', time: '14:32' }
      ]
    },
    {
      id: 'h2',
      activity: 'Mengumpulkan Tugas Besar Manajemen Proyek',
      timestamp: '10 Okt 2026, 21:00',
      status: 'Completed',
      score: 'A',
      conversation: [
        { id: 'c1', sender: 'user', text: 'Saya ingin mengunggah draft proposal proyek EduMate AI.', time: '21:00' },
        { id: 'c2', sender: 'ai', text: 'Proposal berhasil diterima. Apakah Anda ingin langsung mengecek analisis kelayakan proyek?', time: '21:01' },
        { id: 'c3', sender: 'user', text: 'Ya, berikan ringkasan analisisnya.', time: '21:02' },
        { id: 'c4', sender: 'ai', text: 'Berdasarkan dokumen, aspek teknis dan time-frame sudah sangat realistis.', time: '21:02' }
      ]
    },
    {
      id: 'h3',
      activity: 'Pendaftaran Kompetisi UI/UX Gemastik',
      timestamp: '08 Okt 2026, 10:15',
      status: 'Pending',
      conversation: [
        { id: 'c1', sender: 'user', text: 'Tanyakan persyaratan berkas pendaftaran Gemastik UI/UX.', time: '10:15' },
        { id: 'c2', sender: 'ai', text: 'Persyaratan mencakup KTM aktif, surat rekomendasi prodi, dan poster karya awal.', time: '10:16' }
      ]
    },
    {
      id: 'h4',
      activity: 'Sesi Konsultasi Dosen Wali Semester',
      timestamp: '01 Okt 2026, 13:00',
      status: 'Completed',
      conversation: [
        { id: 'c1', sender: 'user', text: 'Bagaimana saran KRS untuk fokus Software Engineering?', time: '13:00' },
        { id: 'c2', sender: 'ai', text: 'Direkomendasikan mengambil mata kuliah Pemrograman Berorientasi Objek dan Manajemen Basis Data.', time: '13:01' }
      ]
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner & Tombol Keluar */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <HistoryIcon className="w-6 h-6 text-cyan-400" />
            <span>Riwayat Aktivitas Akademik</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Daftar rekam jejak aktivitas, tugas, dan partisipasi lomba Anda selama perkuliahan.
          </p>
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

      {/* Daftar Riwayat Aktivitas */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 shadow-xl">
        {historyList.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Belum ada riwayat aktivitas yang tersimpan.
          </div>
        ) : (
          <div className="space-y-4">
            {historyList.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#070b19] border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 transition-all gap-3 group"
              >
                {/* Bagian Kiri (Menggunakan tag button asli tanpa nested button error) */}
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex items-start space-x-3 text-left flex-1 bg-transparent border-none cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-500/20 transition-colors">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                      {item.activity}
                    </h4>
                    <span className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.timestamp}</span>
                    </span>
                  </div>
                </button>

                {/* Bagian Kanan (Status & Tombol Hapus) */}
                <div className="flex items-center space-x-3 self-end sm:self-center">
                  {item.score && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                      Nilai: {item.score}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Completed'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.status}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors ml-2"
                    title="Hapus Riwayat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Percakapan */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c142b] border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header Modal */}
            <div className="p-6 bg-[#0e162f] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{selectedItem.activity}</h3>
                  <p className="text-xs text-slate-400">{selectedItem.timestamp}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isi Percakapan */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#070b19]">
              {selectedItem.conversation && selectedItem.conversation.length > 0 ? (
                selectedItem.conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white'
                          : 'bg-[#0c142b] border border-cyan-500/40 text-cyan-400'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-[#0c142b] border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="block text-[10px] opacity-60 mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-500 py-6">
                  Tidak ada percakapan tercatat untuk aktivitas ini.
                </p>
              )}
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-[#0e162f] border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}