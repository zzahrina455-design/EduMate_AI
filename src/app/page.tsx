'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  Menu, 
  X,
  FileText,
  Users,
  BrainCircuit,
  StickyNote,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 relative overflow-x-hidden bg-[#0A1128] scroll-smooth">
      {/* Efek Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[60%] right-0 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between glass-card border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            EduMate AI
          </span>
        </div>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="text-cyan-400 hover:text-white transition">Beranda</Link>
          <a href="#fitur" className="hover:text-cyan-400 transition">Fitur</a>
          <a href="#tentang" className="hover:text-cyan-400 transition">Tentang</a>
          <a href="#kontak" className="hover:text-cyan-400 transition">Kontak</a>
        </nav>

        {/* Tombol Auth Desktop */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-cyan-400 transition">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition">
            Daftar
          </Link>
        </div>

        {/* Tombol Hamburger Mobile */}
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-cyan-400 border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden bg-black/60 backdrop-blur-sm pt-20">
          <div className="w-full glass-card border-b border-white/15 p-6 flex flex-col space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4 text-sm font-medium text-slate-300">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-cyan-400 font-semibold">Beranda</Link>
              <a href="#fitur" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Fitur</a>
              <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Tentang</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Kontak</a>
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-sm font-medium rounded-xl glass-card border border-white/10 text-slate-200">
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-sm font-medium rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                Daftar
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-card border border-cyan-500/30 text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI Learning Companion berbasis RAG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Belajar Lebih Mudah dengan <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Informasi yang Tepat</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            AI Learning Companion berbasis RAG untuk membantu mahasiswa, dosen, dan admin dalam mencari informasi akademik dari jurnal, RPS, dan modul terpercaya.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/register" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/30 hover:scale-105 transition flex items-center space-x-2">
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#tentang" className="px-6 py-3 rounded-xl glass-card hover:bg-slate-800/60 font-medium text-sm transition border border-white/10 text-center">
              Pelajari Lebih Lanjut
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-8 border-t border-white/10">
            <div className="glass-card p-3 rounded-xl text-center">
              <BookOpen className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Jurnal Scopus</span>
            </div>
            <div className="glass-card p-3 rounded-xl text-center">
              <Layers className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">RPS & Modul</span>
            </div>
            <div className="glass-card p-3 rounded-xl text-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Sumber Akurat</span>
            </div>
          </div>
        </div>

        {/* Hero Graphic / Illustration Card */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-xl" />
          <div className="glass-card p-6 sm:p-8 rounded-3xl relative border border-white/15 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/40 animate-bounce">
              <Bot className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">EduMate Assistant</h3>
              <p className="text-xs sm:text-sm text-slate-300">Siap menjawab pertanyaan akademikmu secara instan berdasarkan dokumen perkuliahan.</p>
            </div>
            <div className="w-full glass-card p-4 rounded-xl text-left space-y-2 border border-white/10">
              <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contoh Pertanyaan RAG:</span>
              </div>
              <p className="text-xs text-slate-300 italic">&ldquo;Apa perbedaan inheritance dan polymorphism pada Java berdasarkan modul PBO?&rdquo;</p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= SEKSI FITUR UNGGULAN ================= */}
      <section id="fitur" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 space-y-12 relative z-10 border-t border-white/10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-cyan-500/30 text-xs text-cyan-300">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>FITUR UNGGULAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Fitur Cerdas untuk <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Efisiensi Belajar</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            EduMate AI menggabungkan teknologi AI mutakhir dengan basis pengetahuan perkuliahan resmi agar pembelajaran Anda lebih terstruktur dan presisi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">RAG Multi-Source Search</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jawaban AI dihasilkan murni berdasarkan ekstraksi isi dokumen RPS, modul dosen, dan referensi jurnal terverifikasi tanpa halusinasi.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Ruangan Per Mata Kuliah</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Setiap mata kuliah memiliki ruang khusus yang terorganisir lengkap dengan materi, modul PDF/Video, serta forum diskusi terpadu.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <StickyNote className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Pencatatan & Agenda Tugas</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Catat tugas penting dan atur batas waktu pengerjaan langsung dari ruangan mata kuliah dengan integrasi kalender interaktif.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Hak Akses Multi-Role</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Disesuaikan khusus untuk kebutuhan Mahasiswa, Dosen Pengampu (kelola modul), dan Administrator Kampus secara aman.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Riwayat & Sitasi Otomatis</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Setiap sesi tanya jawab tersimpan rapi dan dilengkapi dengan kutipan sumber asli untuk mempermudah pengerjaan karya ilmiah.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Keamanan Data Akademik</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Seluruh dokumen dan riwayat perkuliahan dilindungi dengan enkripsi tingkat tinggi untuk menjamin kerahasiaan kampus.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEKSI TENTANG EDUMATE AI ================= */}
      <section id="tentang" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-cyan-500/30 text-xs text-cyan-300">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>TENTANG EDUMATE AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Membawa Masa Depan Pembelajaran ke <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Lingkungan Akademik Anda</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              EduMate AI lahir dari kebutuhan civitas akademika akan akses informasi perkuliahan yang cepat, tepat, dan terpercaya. Dengan memanfaatkan Retrieval-Augmented Generation (RAG), kami menghilangkan hambatan pencarian dokumen manual di ribuan halaman PDF modul.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Meningkatkan efisiensi pemahaman materi perkuliahan hingga 70%.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mengurangi risiko kesalahan informasi ilmiah berkat pemetaan sitasi dokumen resmi.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mendukung produktivitas dosen dalam mendistribusikan RPS dan bahan ajar digital.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">99.8%</h3>
              <p className="text-xs text-slate-300 font-medium">Akurasi Jawaban Dokumen</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">24/7</h3>
              <p className="text-xs text-slate-300 font-medium">Asisten AI Siap Sedia</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">100+</h3>
              <p className="text-xs text-slate-300 font-medium">Modul Matkul Terintegrasi</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">&lt; 2 dtk</h3>
              <p className="text-xs text-slate-300 font-medium">Kecepatan Respons RAG</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SEKSI KONTAK & PERTANYAAN ================= */}
      <section id="kontak" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10 border-t border-white/10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-card border border-cyan-500/30 text-xs text-cyan-300">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>HUBUNGI KAMI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Ada Pertanyaan atau Ingin <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bekerja Sama?</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Tim EduMate AI siap membantu pendaftaran institusi kampus, bantuan teknis, maupun konsultasi integrasi sistem RAG.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">Informasi Kontak</h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Email Resmi</span>
                  <span>support@edumate.ai</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Layanan Telepon / WhatsApp</span>
                  <span>+62 812-3456-7890</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Kantor Pusat</span>
                  <span>Gedung Cyber Akademik Lt. 4, Jakarta Selatan, Indonesia</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Jam Operasional Tim</span>
                  <span>Senin - Jumat: 08:00 - 17:00 WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kirim Pesan dengan Label & Input Terhubung */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            {contactSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Pesan Terkirim!</h4>
                <p className="text-xs text-slate-300">Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-slate-300 mb-1">
                      Nama Lengkap
                    </label>
                    <input 
                      id="fullName"
                      type="text" 
                      required 
                      placeholder="Masukkan nama Anda..."
                      className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1">
                      Email Akademik / Pribadi
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      required 
                      placeholder="nama@kampus.ac.id"
                      className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-xs font-medium text-slate-300 mb-1">
                    Peran / Perihal
                  </label>
                  <select 
                    id="role"
                    className="w-full bg-slate-900/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value="mahasiswa">Mahasiswa - Pertanyaan Pertanyaan Platform</option>
                    <option value="dosen">Dosen - Konsultasi Upload Modul & RPS</option>
                    <option value="kampus">Perwakilan Kampus - Kerjasama Sistem RAG</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1">
                    Pesan Anda
                  </label>
                  <textarea 
                    id="message"
                    rows={4} 
                    required 
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer Profesional */}
      <footer className="w-full glass-card border-t border-white/10 pt-12 pb-6 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10 text-xs text-slate-300">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-white">EduMate AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Platform AI Learning Companion berbasis RAG untuk kemudahan akses pengetahuan perkuliahan yang akurat dan terpercaya.
            </p>
          </div>

          <div className="space-y-2">
            <span className="block font-bold text-white uppercase text-[11px] tracking-wider mb-2">Navigasi Utama</span>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition">Beranda</Link></li>
              <li><a href="#fitur" className="hover:text-cyan-400 transition">Fitur Unggulan</a></li>
              <li><a href="#tentang" className="hover:text-cyan-400 transition">Tentang Kami</a></li>
              <li><a href="#kontak" className="hover:text-cyan-400 transition">Hubungi Kami</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="block font-bold text-white uppercase text-[11px] tracking-wider mb-2">Akses Pengguna</span>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link href="/login" className="hover:text-cyan-400 transition">Portal Mahasiswa</Link></li>
              <li><Link href="/login" className="hover:text-cyan-400 transition">Portal Dosen Pengampu</Link></li>
              <li><Link href="/login" className="hover:text-cyan-400 transition">Administrator Kampus</Link></li>
              <li><Link href="/register" className="hover:text-cyan-400 transition">Pendaftaran Akun Baru</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="block font-bold text-white uppercase text-[11px] tracking-wider mb-2">Privasi & Syarat</span>
            <ul className="space-y-1.5 text-slate-400">
              <li><button type="button" className="hover:text-cyan-400 text-left">Kebijakan Privasi</button></li>
              <li><button type="button" className="hover:text-cyan-400 text-left">Syarat & Ketentuan</button></li>
              <li><button type="button" className="hover:text-cyan-400 text-left">Keamanan RAG Data</button></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2026 EduMate AI. All rights reserved.</p>
          <p>Satu platform untuk semua kebutuhan akademik terpercaya.</p>
        </div>
      </footer>
    </div>
  );
}