'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  MessageSquareText, 
  History, 
  User,
  FileText, 
  Video, 
  Plus, 
  Code2, 
  LayoutDashboard, 
  StickyNote, 
  X, 
  CheckCircle2, 
  Trash2
} from 'lucide-react';

interface NoteItem {
  id: string;
  title: string;
  date: string;
  time: string;
  completed: boolean;
}

export default function CourseDetailPage() {
  // State untuk Modal & Input Catatan Baru
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  // State Daftar Catatan / Tugas (Real-time)
  const [notes, setNotes] = useState<NoteItem[]>([
    { id: '1', title: 'Catatan Pertemuan 3 - React Hooks', date: '18 Sep 2026', time: '10:24', completed: true },
    { id: '2', title: 'Ringkasan Materi Flexbox & Grid CSS', date: '22 Sep 2026', time: '15:37', completed: false },
    { id: '3', title: 'Tugas 2: Integrasi REST API FastAPI', date: '25 Sep 2026', time: '23:59', completed: false }
  ]);

  // Helper untuk Memformat Input Date (YYYY-MM-DD) menjadi Format Indonesia (15 Okt 2026)
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'Hari ini';
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthIndex = Number(month) - 1;
    return `${Number(day)} ${months[monthIndex] || month} ${year}`;
  };

  // Function Tambah Catatan Baru
  const handleAddNote = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = formatDisplayDate(newDate);

    const item: NoteItem = {
      id: Date.now().toString(),
      title: newTitle,
      date: formattedDate,
      time: currentTime,
      completed: false
    };

    setNotes((prev) => [item, ...prev]);
    setNewTitle('');
    setNewDate('');
    setIsModalOpen(false);
  };

  // Toggle Selesai/Belum
  const toggleComplete = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  // Hapus Catatan
  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col relative">
      
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

        {/* Akses Cepat Kanan */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 px-2.5 py-1 rounded-xl cursor-pointer hover:border-cyan-400/40 transition-all text-left"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40">
              ZZ
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-bold text-white leading-none">Zam Zam</span>
              <span className="block text-[9px] text-blue-300/60 leading-tight mt-0.5">Mahasiswa</span>
            </div>
          </button>
        </div>
      </header>

      {/* ================= 2. LAYOUT UTAMA (3 KOLOM) ================= */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto p-4 md:p-6 gap-5 overflow-hidden">
        
        {/* KOLOM 1: SIDEBAR KIRI */}
        <aside className="w-52 hidden lg:flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-1">
            <Link href="/student/courses" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <LayoutDashboard size={17} className="text-blue-300/60" />
              <span>Beranda</span>
            </Link>

            <Link href="/student/courses" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30">
              <BookOpen size={17} className="text-white" />
              <span>Penulisan Ilmiah</span>
            </Link>

            <Link href="/student/chat/Pi" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <MessageSquareText size={17} className="text-blue-300/60" />
              <span>Tanya AI</span>
            </Link>

            <Link href="/student/history/Pi" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <History size={17} className="text-blue-300/60" />
              <span>Riwayat</span>
            </Link>

            <Link href="/student/profile" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <User size={17} className="text-blue-300/60" />
              <span>Profil</span>
            </Link>
          </div>
        </aside>

        {/* KOLOM 2: KONTEN UTAMA MATA KULIAH (TENGAH) */}
        <main className="flex-1 flex flex-col min-w-0 space-y-5 overflow-y-auto pr-1">
          
          {/* Header Banner Penulisan Ilmiah */}
          <div className="relative rounded-3xl bg-slate-900/80 border border-blue-500/20 p-6 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-600/30 border border-cyan-400/40 text-cyan-300">
                    <Code2 size={26} />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">Penulisan Ilmiah</h1>
                    <p className="text-xs text-blue-200/70 flex items-center gap-1.5 mt-0.5">
                      <User size={12} className="text-cyan-400" />
                      Masbahah
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi Mata Kuliah (Lebar Penuh) */}
          <div className="w-full bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
              <FileText size={15} className="text-cyan-400" />
              <span>Deskripsi Mata Kuliah</span>
            </div>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              Mata kuliah Penulisan Ilmiah membahas konsep, prinsip, dan teknik penyusunan karya ilmiah secara sistematis, logis, objektif, dan sesuai dengan kaidah akademik. Mahasiswa mempelajari cara menentukan topik dan rumusan masalah, mencari serta mengelola sumber referensi, menyusun kerangka tulisan, melakukan sitasi dan daftar pustaka, serta menyajikan hasil penelitian atau kajian dalam bentuk karya ilmiah. Mata kuliah ini juga melatih kemampuan mahasiswa dalam menggunakan bahasa Indonesia yang baik dan benar, berpikir kritis, menghindari plagiarisme, serta menghasilkan tulisan ilmiah yang dapat dipertanggungjawabkan secara akademik.
            </p>
          </div>

          {/* Daftar Materi Pembelajaran */}
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <BookOpen size={16} className="text-cyan-400" />
                <span>Materi Pembelajaran</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 1, title: '1. Pengenalan Penulisan Ilmiah', desc: 'Modul • PDF (2.4 MB)', date: '12 Sep 2026', completed: true, type: 'pdf' },
                { id: 2, title: '2. Menentukan Topik & Rumusan Masalah', desc: 'Modul • PDF (3.1 MB)', date: '15 Sep 2026', completed: true, type: 'pdf' },
                { id: 3, title: '3. Studi Literatur & Pencarian Referensi', desc: 'Video • MP4 (45 MB)', date: '18 Sep 2026', completed: false, type: 'video' },
                { id: 4, title: '4. Sistematika & Struktur Karya Ilmiah', desc: 'Materi • PPT (1.8 MB)', date: '22 Sep 2026', completed: false, type: 'ppt' },
                { id: 5, title: '5. Sitasi, Daftar Pustaka & Plagiarisme', desc: 'Modul • PDF (2.7 MB)', date: '25 Sep 2026', completed: false, type: 'pdf' },
              ].map((materi) => (
                <div
                  key={materi.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-blue-500/10 hover:border-cyan-400/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-cyan-400/30">
                      {materi.type === 'video' ? <Video size={16} /> : <FileText size={16} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {materi.title}
                      </h4>
                      <p className="text-[10px] text-blue-300/50 mt-0.5">{materi.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-blue-300/50 hidden sm:inline">{materi.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* KOLOM 3: PANEL KANAN (RIWAYAT & PENCATATAN TUGAS/CATATAN) */}
        <aside className="w-80 hidden xl:flex flex-col space-y-4 shrink-0 overflow-y-auto pr-1">

          {/* Riwayat Tanya Jawab Widget */}
          <div className="bg-slate-900/70 border border-blue-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span>Riwayat Tanya Jawab</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Bagaimana cara menyusun Work Breakdown Structure (WBS)?', time: '23 Sep 2026 • 14:32' },
                { title: 'Apa perbedaan metode Agile dan Waterfall?', time: '22 Sep 2026 • 16:21' },
                { title: 'Penjelasan Critical Path Method dalam jadwal proyek', time: '20 Sep 2026 • 10:15' },
              ].map((item) => (
                <div key={item.title} className="p-2.5 rounded-xl bg-slate-950/40 border border-blue-500/10 hover:border-cyan-400/30 cursor-pointer flex items-center justify-between transition-all">
                  <div className="min-w-0 pr-2">
                    <p className="text-[11px] font-medium text-white truncate">{item.title}</p>
                    <span className="text-[9px] text-blue-300/50 block mt-0.5">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fitur Pencatatan Tugas & Catatan Interaktif */}
          <div className="bg-slate-900/70 border border-blue-500/20 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <StickyNote size={14} className="text-cyan-400" />
                <span>Pencatatan Tugas & Catatan</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {notes.length} Item
              </span>
            </div>

            {/* Tombol Pemicu Modal */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
            >
              <Plus size={15} />
              <span>Tambah Catatan / Tugas</span>
            </button>

            {/* Daftar Catatan & Tugas Interaktif */}
            <div className="space-y-2 pt-1">
              {notes.length === 0 ? (
                <div className="text-center py-6 text-xs text-blue-300/50 border border-dashed border-blue-500/20 rounded-xl">
                  Belum ada catatan/tugas tersimpan.
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                      note.completed 
                        ? 'bg-slate-950/30 border-blue-500/10 opacity-60' 
                        : 'bg-slate-950/60 border-blue-500/20 hover:border-cyan-400/40'
                    }`}
                  >
                    {/* Checkbox Selesai */}
                    <button
                      type="button"
                      onClick={() => toggleComplete(note.id)}
                      className={`mt-0.5 shrink-0 rounded-md p-0.5 transition-all ${
                        note.completed ? 'text-cyan-400' : 'text-blue-300/40 hover:text-cyan-300'
                      }`}
                      title={note.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                    >
                      <CheckCircle2 size={16} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className={`text-[11px] font-medium text-white leading-snug ${note.completed ? 'line-through text-slate-400' : ''}`}>
                        {note.title}
                      </p>
                      <span className="text-[9px] text-blue-300/50 block mt-1">
                        {note.date} • {note.time}
                      </span>
                    </div>

                    {/* Tombol Hapus */}
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Hapus"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </aside>

      </div>

      {/* ================= MODAL FORM TAMBAH CATATAN / TUGAS ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <StickyNote size={18} className="text-cyan-400" />
                <span>Tambah Catatan atau Tugas Baru</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Input */}
            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label htmlFor="noteTitle" className="block text-xs font-semibold text-blue-200 mb-1">
                  Judul Catatan / Tugas <span className="text-red-400">*</span>
                </label>
                <input
                  id="noteTitle"
                  type="text"
                  required
                  placeholder="Contoh: Kerjakan Modul 2 & Ringkasan Sprint..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="noteDate" className="block text-xs font-semibold text-blue-200 mb-1">
                  Batas Waktu / Tanggal (Pilih dari Kalender)
                </label>
                <input
                  id="noteDate"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all cursor-pointer [color-scheme:dark]"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-blue-200/70 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/30"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}