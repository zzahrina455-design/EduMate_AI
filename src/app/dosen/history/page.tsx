'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  History, 
  User, 
  LogOut, 
  CheckCircle2, 
  FileText, 
  Trash2, 
  X, 
  Menu, 
  Database,
  BookCheck,
  AlertTriangle
} from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  courseTitle: string;
  docType: 'Modul' | 'RPS';
  fileName: string;
  fileSize: string;
  date: string;
}

interface CourseItem {
  id: string;
  title: string;
  code: string;
  materialsCount: number;
  createdAt: string;
}

export default function LecturerHistoryPage() {
  const router = useRouter();

  // State Toast & Mobile Menu
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'documents' | 'courses'>('documents');

  // State Modal Konfirmasi Hapus
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'document' | 'course' | null;
    id: string | null;
    name: string;
  }>({
    isOpen: false,
    type: null,
    id: null,
    name: ''
  });

  // State Riwayat Dokumen
  const [documentsList, setDocumentsList] = useState<DocumentItem[]>([
    {
      id: 'doc-1',
      title: 'Modul 1: Agile Project Management',
      courseTitle: 'Manajemen Proyek',
      docType: 'Modul',
      fileName: 'Modul_Agile_Manpro_2026.pdf',
      fileSize: '2.4 MB',
      date: '03 Okt 2026'
    },
    {
      id: 'doc-2',
      title: 'RPS Lengkap Semester Ganjil 2026/2027',
      courseTitle: 'Manajemen Proyek',
      docType: 'RPS',
      fileName: 'RPS_Manajemen_Proyek_V2.pdf',
      fileSize: '1.1 MB',
      date: '28 Sep 2026'
    },
    {
      id: 'doc-3',
      title: 'Materi Flexbox & Grid CSS',
      courseTitle: 'Frontend',
      docType: 'Modul',
      fileName: 'CSS_Layouting_Guide.pdf',
      fileSize: '3.8 MB',
      date: '20 Sep 2026'
    }
  ]);

  // State Riwayat Kelas / Mata Kuliah
  const [coursesList, setCoursesList] = useState<CourseItem[]>([
    {
      id: 'course-1',
      title: 'Manajemen Proyek',
      code: 'TIF301',
      materialsCount: 10,
      createdAt: '15 Agt 2026'
    },
    {
      id: 'course-2',
      title: 'Frontend',
      code: 'TIF302',
      materialsCount: 12,
      createdAt: '18 Agt 2026'
    }
  ]);

  // Toast Notification
  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  }

  // Eksekusi Hapus Dokumen
  const confirmDeleteDocument = (id: string) => {
    setDocumentsList((prev) => prev.filter((item) => item.id !== id));
    setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
    showToast('Dokumen berhasil dihapus karena sudah tidak valid.');
  };

  // Eksekusi Hapus Kelas
  const confirmDeleteCourse = (id: string) => {
    setCoursesList((prev) => prev.filter((item) => item.id !== id));
    setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
    showToast('Kelas kuliah berhasil dihapus karena sudah tidak relevan.');
  };

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-4 py-2.5 rounded-xl backdrop-blur-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 text-xs font-semibold">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* ================= 1. TOP NAVIGATION BAR ================= */}
      <header className="h-16 px-4 sm:px-6 border-b border-blue-500/15 bg-slate-950/70 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-blue-500/20 text-blue-200 hover:text-white transition-all cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0">
            <GraduationCap size={20} />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent truncate">
            EduMate AI
          </span>
        </div>

        {/* Akses Cepat Kanan (Profil Dosen) */}
        <div className="flex items-center gap-3">
          <Link href="/dosen/profile" className="flex items-center gap-2.5 bg-slate-900/60 border border-blue-500/20 px-3 py-1.5 rounded-xl hover:border-cyan-400/40 transition-all">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40 shrink-0">
              DL
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-white leading-none">Darmawan Lahru Riatma</span>
              <span className="block text-[9px] text-blue-300/60 leading-tight mt-0.5">Dosen</span>
            </div>
          </Link>
        </div>
      </header>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-md pt-20 px-4">
          <div className="w-full h-fit bg-slate-900 border border-blue-500/30 p-5 rounded-2xl flex flex-col space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
              <span className="text-xs font-bold text-cyan-300">Menu Navigasi Dosen</span>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <Link 
                href="/dosen/dashboard" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <LayoutDashboard size={16} className="text-blue-300/60" />
                <span>Beranda</span>
              </Link>
              <Link 
                href="/dosen/history" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30 font-semibold"
              >
                <History size={16} className="text-white" />
                <span>Riwayat</span>
              </Link>
              <Link 
                href="/dosen/profile" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <User size={16} className="text-blue-300/60" />
                <span>Profil</span>
              </Link>
            </nav>
            <div className="pt-2 border-t border-blue-500/20">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/login');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all text-xs font-medium cursor-pointer text-left"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. LAYOUT UTAMA (SIDEBAR + CONTENT) ================= */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-4 sm:p-6 gap-6 overflow-hidden">
        
        {/* SIDEBAR KIRI (DESKTOP) */}
        <aside className="w-56 hidden lg:flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-1">
            <Link href="/dosen/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <LayoutDashboard size={17} className="text-blue-300/60" />
              <span>Beranda</span>
            </Link>

            <Link href="/dosen/courses/Manpro" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <BookOpen size={17} className="text-blue-300/60" />
              <span>Mata Kuliah</span>
            </Link>

            <Link href="/dosen/history" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30">
              <History size={17} className="text-white" />
              <span>Riwayat</span>
            </Link>

            <Link href="/dosen/profile" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all">
              <User size={17} className="text-blue-300/60" />
              <span>Profil</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-blue-500/15">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left cursor-pointer"
            >
              <LogOut size={17} />
              <span>Keluar</span>
            </button>
          </div>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 flex flex-col min-w-0 space-y-6 overflow-y-auto pr-0 lg:pr-1">
          
          {/* BANNER HEADER HALAMAN */}
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900/90 to-blue-900/60 border border-blue-500/20 p-5 sm:p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 z-10 text-center sm:text-left min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-medium">
                <History size={14} />
                <span>EduMate Activity Logs</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Riwayat Aktivitas Dosen
              </h1>
              <p className="text-xs md:text-sm text-blue-200/70 leading-relaxed">
                Kelola dokumen pembelajaran yang sudah tidak valid atau hapus kelas kuliah yang sudah tidak relevan.
              </p>
            </div>
            
            <div className="flex gap-2 shrink-0">
              <Link
                href="/dosen/courses/Manpro"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <Database size={15} />
                <span>Upload Dokumen Baru</span>
              </Link>
            </div>
          </div>

          {/* TAB SWITCHER (DOKUMEN vs KELAS) */}
          <div className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 p-1.5 rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-300/70 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText size={14} />
              <span>Riwayat Dokumen ({documentsList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-300/70 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookCheck size={14} />
              <span>Riwayat Kelas ({coursesList.length})</span>
            </button>
          </div>

          {/* SECTION TAB 1: RIWAYAT DOKUMEN */}
          {activeTab === 'documents' && (
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText size={16} className="text-cyan-400" />
                  <span>Daftar Dokumen (Modul & RPS) Terunggah</span>
                </h2>
                <span className="text-[10px] text-blue-300/60">Hapus jika sudah tidak valid</span>
              </div>

              {documentsList.length === 0 ? (
                <div className="text-center py-12 text-xs text-blue-300/50 border border-dashed border-blue-500/20 rounded-2xl">
                  Belum ada dokumen yang diunggah.
                </div>
              ) : (
                <div className="space-y-3">
                  {documentsList.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/15 hover:border-cyan-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                          doc.docType === 'RPS'
                            ? 'bg-purple-600/20 text-purple-300 border-purple-500/30'
                            : 'bg-blue-600/20 text-cyan-400 border-cyan-400/30'
                        }`}>
                          <FileText size={18} />
                        </div>

                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold shrink-0 ${
                              doc.docType === 'RPS'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}>
                              {doc.docType}
                            </span>
                            <span className="text-[10px] text-cyan-300/80 font-medium">{doc.courseTitle}</span>
                          </div>
                          <h3 className="font-bold text-white truncate text-xs">{doc.title}</h3>
                          <p className="text-[10px] text-blue-300/50 truncate">
                            {doc.fileName} • {doc.fileSize} • Diunggah pada {doc.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-blue-500/10">
                        <button
                          type="button"
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'document',
                            id: doc.id,
                            name: doc.title
                          })}
                          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium"
                          title="Hapus Dokumen Tidak Valid"
                        >
                          <Trash2 size={14} />
                          <span>Hapus Dokumen</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION TAB 2: RIWAYAT KELAS */}
          {activeTab === 'courses' && (
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookCheck size={16} className="text-cyan-400" />
                  <span>Daftar Kelas Mata Kuliah Dibuat</span>
                </h2>
                <span className="text-[10px] text-blue-300/60">Hapus jika sudah tidak relevan</span>
              </div>

              {coursesList.length === 0 ? (
                <div className="text-center py-12 text-xs text-blue-300/50 border border-dashed border-blue-500/20 rounded-2xl">
                  Belum ada kelas mata kuliah yang dibuat.
                </div>
              ) : (
                <div className="space-y-3">
                  {coursesList.map((course) => (
                    <div
                      key={course.id}
                      className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/15 hover:border-cyan-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2.5 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-400/30 shrink-0 mt-0.5">
                          <Database size={18} />
                        </div>

                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
                              {course.code}
                            </span>
                            <span className="text-[10px] text-blue-300/50">Dibuat: {course.createdAt}</span>
                          </div>
                          <h3 className="font-bold text-white truncate text-xs">{course.title}</h3>
                          <p className="text-[10px] text-blue-300/60">
                            Total materi terunggah: {course.materialsCount} berkas
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-blue-500/10">
                        <button
                          type="button"
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'course',
                            id: course.id,
                            name: course.title
                          })}
                          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium"
                          title="Hapus Kelas Tidak Relevan"
                        >
                          <Trash2 size={14} />
                          <span>Hapus Kelas</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>

      </div>

      {/* ================= MODAL KONFIRMASI HAPUS ================= */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/30">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Konfirmasi Penghapusan</h3>
                <p className="text-xs text-slate-300">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-blue-500/20">
              Apakah Anda yakin ingin menghapus {deleteModal.type === 'document' ? 'dokumen' : 'kelas'} <strong className="text-cyan-300">&quot;{deleteModal.name}&quot;</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-500/20">
              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, type: null, id: null, name: '' })}
                className="px-4 py-2 rounded-xl font-medium text-blue-200/70 hover:text-white transition-all cursor-pointer text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteModal.type === 'document' && deleteModal.id) {
                    confirmDeleteDocument(deleteModal.id);
                  } else if (deleteModal.type === 'course' && deleteModal.id) {
                    confirmDeleteCourse(deleteModal.id);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all shadow-md shadow-red-600/30 cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                <span>Ya, Hapus Permanen</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}