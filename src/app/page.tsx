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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[60%] right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar Responsif */}
      <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-[#0A1128]/80 border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-base sm:text-xl font-bold tracking-wide bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
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
        <div className="hidden sm:flex items-center space-x-3">
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
          className="md:hidden w-10 h-10 rounded-xl bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 border border-white/10 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden bg-black/70 backdrop-blur-md pt-20 px-4">
          <div className="w-full h-fit bg-[#0A1128]/95 border border-white/15 p-6 rounded-2xl flex flex-col space-y-6 shadow-2xl">
            <nav className="flex flex-col space-y-4 text-sm font-medium text-slate-300">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-cyan-400 font-semibold py-1">Beranda</Link>
              <a href="#fitur" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400 py-1 transition">Fitur</a>
              <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400 py-1 transition">Tentang</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400 py-1 transition">Kontak</a>
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-sm font-medium rounded-xl bg-slate-900/80 border border-white/10 text-slate-200">
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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>EduMate AI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Temukan Lomba yang Tepat<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Untuk Inovasimu </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            EduMate AI berbasis RAG untuk membantu mahasiswa menemukan lomba paling relevan berdasarkan ide, SKPL, dan arsitektur proyek yang diunggah, sehingga potensi inovasi dapat berkembang melalui kompetisi yang sesuai.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
            <Link href="/register" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition flex items-center justify-center space-x-2">
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#tentang" className="px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 font-medium text-sm transition border border-white/10 text-center">
              Pelajari Lebih Lanjut
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
            <div className="bg-slate-900/40 p-3 rounded-xl text-center border border-white/5">
              <BookOpen className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Jurnal Scopus</span>
            </div>
            <div className="bg-slate-900/40 p-3 rounded-xl text-center border border-white/5">
              <Layers className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">SKPL</span>
            </div>
            <div className="bg-slate-900/40 p-3 rounded-xl text-center border border-white/5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Sumber Akurat</span>
            </div>
          </div>
        </div>

        {/* Hero Graphic / Illustration Card */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-none">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-xl" />
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl relative border border-white/15 flex flex-col items-center text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/40 animate-bounce">
              <Bot className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">EduMate AI</h3>
              <p className="text-xs sm:text-sm text-slate-300">Siap membantu menemukan rekomendasi lomba yang relevan berdasarkan ide, SKPL, dan arsitektur proyek yang kamu unggah.</p>
            </div>
            <div className="w-full bg-slate-950/60 p-4 rounded-xl text-left space-y-2 border border-white/10">
              <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contoh Permintaan Rekomendasi:</span>
              </div>
              <p className="text-xs text-slate-300 italic">&ldquo;Rekomendasikan lomba yang sesuai dengan proyek sistem monitoring berbasis IoT ini berdasarkan SKPL dan arsitektur proyek yang telah saya unggah.&rdquo;</p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= SEKSI FITUR UNGGULAN ================= */}
      <section id="fitur" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 space-y-12 relative z-10 border-t border-white/10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs text-cyan-300">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>FITUR UNGGULAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Temukan Peluang Kompetisi <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dengan AI</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            EduMate AI memanfaatkan kecerdasan buatan untuk menganalisis proyek dan merekomendasikan kompetisi yang relevan berdasarkan ide, kebutuhan sistem, serta arsitektur proyek yang kamu kembangkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Analisis Dokumen Proyek</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unggah dokumen SKPL, arsitektur proyek, atau deskripsi ide untuk membantu AI memahami tujuan, fitur, teknologi, dan ruang lingkup proyek yang kamu kembangkan.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Rekomendasi Lomba yang Relevan</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Temukan rekomendasi lomba berdasarkan kesesuaian tema, kategori, bidang teknologi, dan tujuan proyek agar kamu dapat memilih kompetisi yang tepat.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <StickyNote className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Pencocokan Kriteria Kompetisi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI membantu mencocokkan karakteristik proyek dengan persyaratan dan kriteria lomba untuk mengidentifikasi peluang kompetisi yang potensial.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Dukungan Berbagai Jenis Proyek</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dirancang untuk mendukung beragam ide dan pengembangan proyek, mulai dari aplikasi web, kecerdasan buatan, Internet of Things (IoT), hingga inovasi teknologi lainnya.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Referensi dan Informasi Lomba</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dapatkan informasi pendukung mengenai kompetisi yang direkomendasikan agar kamu lebih mudah memahami relevansi lomba dengan proyek yang dikembangkan.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">Pengembangan Strategi Kompetisi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gunakan hasil rekomendasi sebagai bahan pertimbangan untuk menentukan kompetisi yang sesuai, mengevaluasi kesiapan proyek, dan merencanakan pengembangan inovasi selanjutnya.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEKSI TENTANG EDUMATE AI ================= */}
      <section id="tentang" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs text-cyan-300">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>TENTANG EDUMATE AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Menghubungkan Inovasi <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dengan Peluang Kompetisi</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              EduMate AI hadir untuk membantu mahasiswa menemukan peluang kompetisi yang relevan dengan proyek yang mereka kembangkan. Dengan memanfaatkan kecerdasan buatan, sistem menganalisis dokumen seperti SKPL, arsitektur proyek, dan deskripsi ide untuk memberikan rekomendasi lomba yang sesuai dengan karakteristik dan tujuan proyek.
            </p>

            <div className="space-y-3 pt-2 text-left">
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Membantu mahasiswa menemukan kompetisi yang relevan dengan ide dan bidang proyek mereka.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mempermudah proses pencarian lomba melalui analisis dokumen proyek secara lebih terarah.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mendukung mahasiswa dalam mengidentifikasi peluang kompetisi untuk mengembangkan inovasi dan potensi proyek.</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">Berbasis AI</h3>
              <p className="text-xs text-slate-300 font-medium">Analisis Dokumen Proyek</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">Lebih Terarah</h3>
              <p className="text-xs text-slate-300 font-medium">Rekomendasi Lomba Relevan</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">Multi-Format</h3>
              <p className="text-xs text-slate-300 font-medium">SKPL, Arsitektur, dan Ide</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-cyan-400">Beragam Bidang</h3>
              <p className="text-xs text-slate-300 font-medium">Peluang Kompetisi</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SEKSI KONTAK & PERTANYAAN ================= */}
      <section id="kontak" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10 border-t border-white/10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs text-cyan-300">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>HUBUNGI KAMI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Ada Pertanyaan atau Ingin <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bekerja Sama?</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Tim EduMate AI siap membantu dan menemani kalian dalam belajar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">Informasi Kontak</h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Email Resmi</span>
                  <span>edumate.ai@gmail.com</span>
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
                  <span>Universitas Sebelas Maret</span>
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
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10">
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
                      className="w-full bg-slate-950/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
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
                      className="w-full bg-slate-950/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-xs font-medium text-slate-300 mb-1">
                    Peran / Perihal
                  </label>
                  <select 
                    id="role"
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value="mahasiswa">Mahasiswa - Pertanyaan Platform</option>
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
                    className="w-full bg-slate-950/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
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
      <footer className="w-full bg-slate-950/80 border-t border-white/10 pt-12 pb-6 px-4 sm:px-6 relative z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-white/10 text-xs text-slate-300">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-white">EduMate AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Platform rekomendasi lomba berbasis AI yang membantu menemukan kompetisi relevan melalui analisis ide, SKPL, dan arsitektur proyek secara cerdas dan terarah.
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

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 text-center sm:text-left">
          <p>© 2026 EduMate AI. All rights reserved.</p>
          <p>Satu platform untuk semua kebutuhan akademik terpercaya.</p>
        </div>
      </footer>
    </div>
  );
}