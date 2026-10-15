'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Sparkles,
  Trophy,
  LogOut
} from 'lucide-react';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const competitions = [
    {
      id: '1',
      title: 'National Hackathon & AI Innovation 2026',
      category: 'Software Development',
      deadline: '28 Oktober 2026',
      location: 'Jakarta (Hybrid)',
      status: 'Open',
      description: 'Kompetisi pembuatan aplikasi berbasis AI untuk solusi smart city dan pendidikan.',
    },
    {
      id: '2',
      title: 'UI/UX Design Competition Gemastik',
      category: 'Design & Research',
      deadline: '15 November 2026',
      location: 'Bandung (Online)',
      status: 'Open',
      description: 'Rancang pengalaman pengguna inklusif untuk aplikasi disabilitas digital.',
    },
    {
      id: '3',
      title: 'Cybersecurity Capture The Flag (CTF)',
      category: 'Information Security',
      deadline: '05 Desember 2026',
      location: 'Surabaya',
      status: 'Upcoming',
      description: 'Uji kemampuan penetrasi dan pertahanan siber tingkat nasional.',
    },
    {
      id: '4',
      title: 'International Business Plan Competition',
      category: 'Entrepreneurship',
      deadline: '20 Desember 2026',
      location: 'Singapore / Online',
      status: 'Open',
      description: 'Presentasikan ide startup teknologi hijau berstandar global.',
    }
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  const filteredCompetitions = competitions.filter(comp => 
    comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Running Ticker Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-[#0e162f] to-cyan-950/60 border border-cyan-500/30 rounded-2xl p-3.5 shadow-lg shadow-cyan-950/40 flex items-center space-x-4 overflow-hidden">
        <div className="flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 rounded-xl shrink-0 text-cyan-300 font-semibold text-xs tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Info Lomba Terbaru</span>
        </div>
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-[marquee_25s_linear_infinite] text-sm text-slate-300 font-medium">
            {competitions.map((comp) => (
              <Link key={comp.id} href="/student/courses" className="mx-6 hover:text-cyan-400 transition-colors">
                🔥 <strong className="text-white">{comp.title}</strong> — Tenggat: {comp.deadline} ({comp.location}) &nbsp;&nbsp;|&nbsp;&nbsp;
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="relative bg-gradient-to-r from-[#0d1631] via-[#0b132b] to-[#081023] border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl"></div>
        
        <div className="z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium text-cyan-300">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>EduMate Academic Space</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-white">
            Dashboard Mahasiswa
          </h1>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
            Selamat datang kembali! Temukan informasi lomba terbaru, ajukan pertanyaan ke <strong className="text-cyan-400">Tanya AI</strong>, dan pantau riwayat aktivitas akademik Anda di sini.
          </p>
        </div>

        <div className="mt-6 md:mt-0 z-10 flex items-center space-x-4">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#081023] border border-slate-700/60 rounded-3xl flex items-center justify-center shadow-xl shadow-cyan-950/50 group hover:border-cyan-500/50 transition-all">
            <BookOpen className="w-12 h-12 lg:w-16 lg:h-16 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Search Bar & Button Keluar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#0e162f]/60 border border-slate-800/80 p-4 rounded-2xl">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari info lomba atau aktivitas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
          />
        </div>
        
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-400">Status Database: <span className="text-emerald-400 font-medium">● Terhubung</span></span>
          
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

      {/* Grid Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-cyan-400" />
            <span>Daftar Info Lomba Terbaru</span>
          </h2>
          <Link href="/student/courses" className="text-xs font-medium text-cyan-400 hover:underline flex items-center space-x-1">
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCompetitions.map((comp) => (
            <div 
              key={comp.id}
              className="bg-[#0c142b] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/40 group relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                    {comp.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${comp.status === 'Open' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                    {comp.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-base text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  {comp.title}
                </h3>
                
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center text-xs text-slate-400 space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Tenggat: {comp.deadline}</span>
                </div>
                <div className="flex items-center text-xs text-slate-400 space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{comp.location}</span>
                </div>

                <button 
                  type="button"
                  onClick={() => alert(`Mendaftarkan diri ke lomba: ${comp.title}`)}
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-xs py-2 rounded-xl transition-all shadow-md shadow-cyan-950/50 flex items-center justify-center space-x-1"
                >
                  <span>Detail</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}