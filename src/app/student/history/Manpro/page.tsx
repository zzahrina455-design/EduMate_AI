'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ChevronRight, 
  MessageSquare, 
  Calendar, 
  BookOpen,
  GraduationCap,
  MessageSquareText,
  History,
} from 'lucide-react';

export interface HistoryItem {
  id: string;
  question: string;
  courseName: string;
  date: string;
}

export default function ChatHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Data Awal jika localStorage masih kosong
  const initialData: HistoryItem[] = [
    {
      id: '1',
      question: 'Apa itu Retrieval-Augmented Generation (RAG)?',
      courseName: 'Kecerdasan Buatan',
      date: '12 Apr 2026'
    },
    {
      id: '2',
      question: 'Jelaskan perbedaan normalisasi 1NF, 2NF, dan 3NF',
      courseName: 'Basis Data',
      date: '10 Apr 2026'
    },
    {
      id: '3',
      question: 'Apa fungsi dari tag <div> dalam HTML?',
      courseName: 'Pemrograman Web',
      date: '8 Apr 2026'
    },
    {
      id: '4',
      question: 'Bagaimana cara kerja algoritma Bubble Sort?',
      courseName: 'Algoritma dan Pemrograman',
      date: '5 Apr 2026'
    }
  ];

  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  // Load Data dari localStorage agar Sinkron Real-Time dengan Beranda
  useEffect(() => {
    const savedHistory = localStorage.getItem('edumate_chat_history');
    if (savedHistory) {
      try {
        setHistoryData(JSON.parse(savedHistory));
      } catch (e) {
        setHistoryData(initialData);
      }
    } else {
      setHistoryData(initialData);
      localStorage.setItem('edumate_chat_history', JSON.stringify(initialData));
    }
  }, []);

  // Logic Filtering berdasarkan Search Input (mencari pada pertanyaan maupun nama mata kuliah)
  const filteredHistory = historyData.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Klik Riwayat -> Buka kembali ke Halaman Tanya Jawab
  const handleSelectHistory = (item: HistoryItem) => {
    router.push(`/dashboard/student/chat/Manpro?query=${encodeURIComponent(item.question)}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col">
      
      {/* ================= 1. TOP NAVIGATION BAR ================= */}
      <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/70 backdrop-blur-xl flex items-center justify-between sticky top-0 z-50">
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

          {/* Menu Aktif: Riwayat */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30">
            <History size={14} />
            <span>Riwayat</span>
          </div>
        </nav>

        {/* Profil Singkat */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 px-2.5 py-1 rounded-xl">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40">
            ZZ
          </div>
          <span className="text-xs font-bold text-white hidden lg:block">Zam Zam</span>
        </div>
      </header>

      {/* ================= 2. KONTEN UTAMA ================= */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-6">
        
        {/* Header Halaman */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Riwayat Tanya Jawab
            </h1>
            <p className="text-xs md:text-sm text-blue-200/70 mt-1">
              Cari semua pertanyaan dan jawaban yang pernah kamu tanyakan sebelumnya.
            </p>
          </div>
          <span className="text-xs text-blue-300/50 hidden sm:block">
            Total Riwayat: <strong className="text-cyan-300">{historyData.length}</strong>
          </span>
        </div>

        {/* Bar Pencarian Full-Width */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/50" />
          <input
            type="text"
            placeholder="Cari pertanyaan atau mata kuliah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-blue-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400/60 backdrop-blur-md transition-all shadow-inner"
          />
        </div>

        {/* Daftar Kartu Riwayat Pertanyaan */}
        <div className="space-y-3 pt-2">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectHistory(item)}
                className="w-full text-left group bg-slate-900/50 hover:bg-slate-800/80 border border-blue-500/20 hover:border-cyan-400/50 rounded-xl p-4 transition-all duration-200 cursor-pointer backdrop-blur-md flex items-center justify-between shadow-lg"
              >
                <div className="flex items-start gap-3.5 min-w-0 pr-4">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-400/20 text-cyan-400 shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MessageSquare size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm md:text-base font-medium text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                      {item.question}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-blue-200/60">
                      <span className="inline-flex items-center gap-1 bg-blue-950/80 border border-blue-500/30 text-blue-300 px-2.5 py-0.5 rounded-full text-[11px]">
                        <BookOpen size={11} />
                        {item.courseName}
                      </span>
                      <span className="inline-flex items-center gap-1 text-blue-300/50">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Panah Navigasi */}
                <div className="text-blue-400/50 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0">
                  <ChevronRight size={20} />
                </div>
              </button>
            ))
          ) : (
            /* State jika tidak ada data riwayat yang cocok */
            <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-blue-500/10 backdrop-blur-md space-y-3">
              <MessageSquare size={36} className="mx-auto text-blue-400/30" />
              <p className="text-sm font-medium text-blue-200/70">Tidak ada riwayat ditemukan</p>
              <p className="text-xs text-blue-300/40">Coba kata kunci pencarian lain.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}