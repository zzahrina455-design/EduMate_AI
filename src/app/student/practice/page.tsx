'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Upload, 
  Volume2, 
  FileText,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function PracticeAIPage() {
  const router = useRouter();

  const [isRecording, setIsRecording] = useState(false);
  const [judgeSpeech, setJudgeSpeech] = useState(
    'Kami mengapresiasi metode yang Anda tawarkan. Bagaimana rancangan infrastruktur dan arsitektur sistem ini menangani konkurensi data pengguna dalam skala besar?'
  );
  const [voiceTone, setVoiceTone] = useState('Teks & Suara (Standar)');
  const [proposalText, setProposalText] = useState('');

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleNextQuestion = () => {
    setJudgeSpeech(
      'Pertanyaan berikutnya: Apa keunggulan kompetitif utama (Unique Selling Point) dari produk ini dibanding kompetitor yang ada di pasar saat ini?'
    );
  };

  const handleExitSession = () => {
    router.push('/login');
  };

  const handleSaveProposal = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!proposalText.trim()) {
      alert('Silakan masukkan ringkasan proposal atau naskah project Anda.');
      return;
    }
    alert('Proposal project berhasil diunggah! AI Juri akan menyesuaikan pertanyaan berdasarkan naskah ini.');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Judul Halaman Utama & Tombol Keluar */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Brain className="w-7 h-7 text-cyan-400" />
            <span>Ruang Latihan Wawancara Interaktif</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Simulasi sesi tanya jawab dan pitching langsung bersama AI Juri Lomba.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExitSession}
          className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi</span>
        </button>
      </div>

      {/* 2. Grid Bagian Atas (2 Kolom: Kiri Avatar/Voice, Kanan Transkrip & Kontrol) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Kiri: AI Avatar, Waveform, Button & Timer Status */}
        <div className="lg:col-span-5 bg-[#0c142b] border border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-between text-center space-y-6 shadow-xl">
          <div className="w-full flex flex-col items-center">
            {/* Visual Avatar AI Juri */}
            <div className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-slate-800 border-2 border-cyan-400/40 p-1 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#070b19] rounded-[22px] flex items-center justify-center">
                <Brain className={`w-20 h-20 text-cyan-400 transition-transform duration-300 ${isRecording ? 'scale-110 animate-pulse' : ''}`} />
              </div>
            </div>

            {/* Audio Waveform Animation Visualizer */}
            <div className="flex items-center justify-center space-x-1.5 my-6 h-8">
              <span className={`w-1.5 bg-cyan-400 rounded-full transition-all duration-300 ${isRecording ? 'h-8 animate-bounce' : 'h-3'}`} />
              <span className={`w-1.5 bg-blue-500 rounded-full transition-all duration-300 ${isRecording ? 'h-6 animate-bounce delay-75' : 'h-5'}`} />
              <span className={`w-1.5 bg-cyan-300 rounded-full transition-all duration-300 ${isRecording ? 'h-10 animate-bounce delay-150' : 'h-2'}`} />
              <span className={`w-1.5 bg-blue-400 rounded-full transition-all duration-300 ${isRecording ? 'h-5 animate-bounce delay-100' : 'h-4'}`} />
              <span className={`w-1.5 bg-cyan-400 rounded-full transition-all duration-300 ${isRecording ? 'h-7 animate-bounce' : 'h-3'}`} />
            </div>

            {/* Tombol Mulai Bicara */}
            <button
              onClick={handleToggleRecord}
              className={`w-full max-w-xs py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-950/50'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span>{isRecording ? 'Berhenti Bicara' : 'Mulai Bicara'}</span>
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Transkrip Jawaban/Pertanyaan & Kontrol */}
        <div className="lg:col-span-7 bg-[#0c142b] border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col justify-between space-y-6 shadow-xl">
          
          {/* Section Transkrip Jawaban/Pertanyaan Juri */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Transkrip Jawaban / Pertanyaan Juri</h2>
            </div>
            
            <div className="bg-[#070b19] border border-slate-800 rounded-2xl p-5 min-h-[160px] text-slate-200 text-sm leading-relaxed relative">
              <p className="italic text-slate-300">&quot;{judgeSpeech}&quot;</p>
            </div>
          </div>

          {/* Controls: Mode Transkrip Dropdown & Tombol Pertanyaan Selanjutnya */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div>
              <label htmlFor="voiceModeSelect" className="text-xs font-medium text-slate-400 block mb-2">
                Transkrip Jawaban / Mode Output
              </label>
              <select
                id="voiceModeSelect"
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Hanya Teks">Hanya Teks</option>
                <option value="Juri Teknis Kritis">Juri Teknis Kritis</option>
              </select>
            </div>

            <button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm py-3.5 rounded-2xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2"
            >
              <span>Pertanyaan Selanjutnya</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Card Bagian Bawah: Halaman Upload Proposal / Project */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Halaman Upload Proposal / Project</h2>
        </div>
        <p className="text-xs text-slate-400">
          Masukkan naskah ringkasan atau proposal proyek Anda agar AI Juri dapat menyesuaikan materi wawancara.
        </p>

        <form onSubmit={handleSaveProposal} className="space-y-4">
          <textarea
            rows={4}
            placeholder="Ketik atau tempelkan ringkasan proposal project Anda di sini..."
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            className="w-full bg-[#070b19] border border-slate-700/60 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-950/50 flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Unggah Proposal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}