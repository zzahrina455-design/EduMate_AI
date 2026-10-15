'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Calendar, MapPin, LogOut } from 'lucide-react';

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const competitions = [
    {
      id: '1',
      title: 'National Hackathon & AI Innovation 2026',
      category: 'Software Development',
      deadline: '28 Oktober 2026',
      location: 'Jakarta (Hybrid)',
      organizer: 'Kemenristekdikti',
      description: 'Kompetisi pembuatan aplikasi berbasis AI untuk solusi smart city dan pendidikan.',
    },
    {
      id: '2',
      title: 'UI/UX Design Competition Gemastik',
      category: 'Design & Research',
      deadline: '15 November 2026',
      location: 'Bandung (Online)',
      organizer: 'Telkom University',
      description: 'Rancang pengalaman pengguna inklusif untuk aplikasi disabilitas digital.',
    },
    {
      id: '3',
      title: 'Cybersecurity Capture The Flag (CTF)',
      category: 'Information Security',
      deadline: '05 Desember 2026',
      location: 'Surabaya',
      organizer: 'ITS Surabaya',
      description: 'Uji kemampuan penetrasi dan pertahanan siber tingkat nasional.',
    },
    {
      id: '4',
      title: 'International Business Plan Competition',
      category: 'Entrepreneurship',
      deadline: '20 Desember 2026',
      location: 'Singapore / Online',
      organizer: 'ASEAN Youth Forum',
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
      {/* Header Banner & Tombol Keluar */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-cyan-400" />
            <span>Informasi Lomba Mahasiswa</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Data kompetisi nasional dan internasional yang tersinkronisasi langsung dari database.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <input 
            type="text" 
            placeholder="Cari kompetisi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#070b19] border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />

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

      {/* Grid Informasi Lomba */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompetitions.map((comp) => (
          <div key={comp.id} className="bg-[#0c142b] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">{comp.category}</span>
                <span className="text-xs text-slate-400">Penyelenggara: <strong className="text-slate-200">{comp.organizer}</strong></span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{comp.title}</h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">{comp.description}</p>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1.5"><Calendar className="w-4 h-4 text-cyan-400" /><span>Batas Pendaftaran: {comp.deadline}</span></span>
                <span className="flex items-center space-x-1.5"><MapPin className="w-4 h-4 text-blue-400" /><span>{comp.location}</span></span>
              </div>
              <button 
                type="button"
                onClick={() => alert(`Berhasil mendaftar ke ${comp.title}`)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-sm py-2.5 rounded-xl shadow-lg shadow-cyan-950/50 hover:brightness-110 transition-all"
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}