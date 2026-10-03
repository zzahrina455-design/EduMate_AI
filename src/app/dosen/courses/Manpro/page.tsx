'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen,
  History,
  ArrowLeft, 
  Database,
  Upload, 
  FileText, 
  CloudUpload,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface UploadHistoryItem {
  id: string;
  title: string;
  docType: 'Modul' | 'RPS';
  uploader: string;
  dateTime: string;
}

export default function CourseDetailPage() {

  // State Form Upload
  const [docType, setDocType] = useState<'Modul' | 'RPS'>('Modul');
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State Riwayat Upload Real-time
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([
    {
      id: '1',
      title: 'Modul 1 - Konsep Dasar Manajemen Proyek',
      docType: 'Modul',
      uploader: 'Darmawan Lahru Riatma',
      dateTime: '20 Sep 2026, 10:24'
    },
    {
      id: '2',
      title: 'RPS Manajemen Proyek Semester 3',
      docType: 'RPS',
      uploader: 'Darmawan Lahru Riatma',
      dateTime: '18 Sep 2026, 14:17'
    },
    {
      id: '3',
      title: 'Modul 2 - Project Charter dan Scope Management',
      docType: 'Modul',
      uploader: 'Darmawan Lahru Riatma',
      dateTime: '15 Sep 2026, 09:32'
    },
    {
      id: '4',
      title: 'Modul 3 - Work Breakdown Structure (WBS)',
      docType: 'Modul',
      uploader: 'Darmawan Lahru Riatma',
      dateTime: '10 Sep 2026, 16:45'
    },
    {
      id: '5',
      title: 'RPS Manajemen Proyek (Revisi)',
      docType: 'RPS',
      uploader: 'Darmawan Lahru Riatma',
      dateTime: '5 Sep 2026, 11:20'
    },
    {
      id: '6',
      title: 'Modul 4 - Estimasi Biaya, Jadwal, dan Risiko Proyek',
      docType: 'Modul',
      uploader: 'Darmawan Lahru Riatma',
      dateTime: '1 Sep 2026, 13:10'
    }
  ]);

  // Toast Notification
  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  }

  const handleUploadSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newUpload: UploadHistoryItem = {
      id: Date.now().toString(),
      title: uploadTitle,
      docType: docType,
      uploader: 'Darmawan Lahru Riatma',
      dateTime: 'Hari ini, Baru saja'
    };

    setUploadHistory((prev) => [newUpload, ...prev]);
    setUploadTitle('');
    setSelectedFileName('');
    showToast(`${docType} "${uploadTitle}" berhasil diunggah!`);
  };

  // Handler Hapus Berkas dari Riwayat
  const handleDeleteHistory = (id: string) => {
    setUploadHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Dokumen berhasil dihapus.');
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

        {/* Akses Cepat Kanan (Notifikasi & Profil Dosen) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-slate-900/60 border border-blue-500/20 px-3 py-1.5 rounded-xl cursor-pointer hover:border-cyan-400/40 transition-all">
            <div className="text-left hidden md:block">
              <span className="block text-xs font-bold text-white leading-none">Darmawan Lahru Riatma</span>
              <span className="block text-[9px] text-blue-300/60 leading-tight mt-0.5">Dosen</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. LAYOUT UTAMA (SIDEBAR + CONTENT) ================= */}
      <div className="flex-1 flex w-full mx-auto p-4 md:p-6 gap-6 overflow-hidden">
        
        {/* SIDEBAR KIRI */}
        <aside className="w-56 hidden lg:flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-1">
            <Link href="/dosen/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <LayoutDashboard size={17} className="text-blue-300/60" />
              <span>Beranda</span>
            </Link>

            <Link href="/dosen/courses" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30">
              <BookOpen size={17} className="text-white" />
              <span>Mata Kuliah</span>
            </Link>

            <Link href="/dosen/history" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <History size={17} className="text-blue-300/60" />
              <span>Riwayat</span>
            </Link>
          </div>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 flex flex-col min-w-0 space-y-5 overflow-y-auto pr-1">
          
          {/* Breadcrumb & Header Card Mata Kuliah */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-blue-300/60 font-medium">
              <Link href="/dosen/courses" className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                <ArrowLeft size={13} />
                <span>Mata Kuliah</span>
              </Link>
              <span>&gt;</span>
              <span className="text-white font-semibold">Manajemen Proyek</span>
            </div>

            {/* Banner Kartu Mata Kuliah */}
            <div className="bg-slate-900/70 border border-blue-500/20 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0 border border-cyan-300/40">
                  <Database size={28} />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-white">Manajemen Proyek</h1>
                </div>
              </div>
            </div>
          </div>

          {/* GRID 2 KOLOM (UPLOAD & RIWAYAT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* KOLOM KIRI: Upload Modul & RPS (5 Kolom) */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
              
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload size={16} className="text-cyan-400" />
                  <span>Upload Modul & RPS</span>
                </h2>
                <p className="text-[11px] text-blue-200/60 leading-relaxed">
                  Unggah modul, RPS, atau dokumen pendukung untuk mata kuliah ini.
                </p>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">

                {/* Jenis Dokumen Toggle */}
                <div>
                  <span className="block font-semibold text-blue-200 mb-1.5">
                    Jenis Dokumen
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDocType('Modul')}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all font-semibold ${
                        docType === 'Modul'
                          ? 'bg-blue-600 text-white border-cyan-400 shadow-lg shadow-blue-600/30'
                          : 'bg-slate-950 border-blue-500/20 text-blue-300/70 hover:bg-slate-800'
                      }`}
                    >
                      <FileText size={14} />
                      <span>Modul</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDocType('RPS')}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all font-semibold ${
                        docType === 'RPS'
                          ? 'bg-blue-600 text-white border-cyan-400 shadow-lg shadow-blue-600/30'
                          : 'bg-slate-950 border-blue-500/20 text-blue-300/70 hover:bg-slate-800'
                      }`}
                    >
                      <FileText size={14} />
                      <span>RPS</span>
                    </button>
                  </div>
                </div>

                {/* Judul Dokumen / Modul */}
                <div>
                  <label htmlFor="docTitleInput" className="block font-semibold text-blue-200 mb-1">
                    Judul Dokumen / Modul
                  </label>
                  <input
                    id="docTitleInput"
                    type="text"
                    required
                    placeholder="Contoh: Modul 1 - Konsep Dasar Basis Data"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                {/* Drag and Drop File Picker */}
                <div>
                  <label htmlFor="fileUploadInput" className="block font-semibold text-blue-200 mb-1">
                    Pilih Berkas
                  </label>
                  <div className="relative border-2 border-dashed border-blue-500/30 rounded-2xl p-6 text-center bg-slate-950/50 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2">
                    <input
                      id="fileUploadInput"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFileName(file.name);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <CloudUpload size={32} className="text-cyan-400" />
                    <p className="text-xs text-white font-medium">
                      {selectedFileName || 'Klik untuk memilih berkas atau drag and drop di sini'}
                    </p>
                    <p className="text-[10px] text-blue-300/50">
                      PDF, DOC, DOCX, maksimal 10MB
                    </p>
                  </div>
                </div>

                {/* Tombol Submit Upload */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
                >
                  <Upload size={15} />
                  <span>Upload</span>
                </button>

              </form>

            </div>

            {/* KOLOM KANAN: Riwayat Upload (7 Kolom) */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <History size={16} className="text-cyan-400" />
                    <span>Riwayat Upload</span>
                  </h2>
                  <p className="text-[10px] text-blue-200/60">
                    Dokumen yang telah diunggah akan langsung terlihat di sini secara real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                    Real-time
                  </span>
                  <button
                    type="button"
                    aria-label="Refresh Riwayat"
                    className="p-1.5 rounded-lg bg-slate-950 border border-blue-500/20 text-blue-300 hover:text-white transition-all"
                  >
                  </button>
                </div>
              </div>

              {/* Daftar Dokumen Diunggah */}
              <div className="space-y-2.5">
                {uploadHistory.length === 0 ? (
                  <div className="text-center py-10 text-xs text-blue-300/50 border border-dashed border-blue-500/20 rounded-2xl">
                    Belum ada dokumen diunggah untuk mata kuliah ini.
                  </div>
                ) : (
                  uploadHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-blue-500/15 hover:border-cyan-400/30 transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Ikon Tipe Dokumen */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          item.docType === 'RPS'
                            ? 'bg-purple-600/20 text-purple-300 border-purple-500/30'
                            : 'bg-blue-600/20 text-cyan-400 border-cyan-400/30'
                        }`}>
                          <FileText size={18} />
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white truncate text-xs">{item.title}</h3>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold shrink-0 ${
                              item.docType === 'RPS'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-blue-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}>
                              {item.docType}
                            </span>
                          </div>
                          <p className="text-[10px] text-blue-300/50 truncate">
                            Diunggah oleh: {item.uploader} &nbsp;•&nbsp; {item.dateTime}
                          </p>
                        </div>
                      </div>

                      {/* Tombol Aksi (Lihat & Hapus) */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          aria-label="Hapus dokumen"
                          onClick={() => handleDeleteHistory(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-all"
                          title="Hapus Dokumen"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}