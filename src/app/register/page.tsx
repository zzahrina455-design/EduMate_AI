'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');

    // Validasi otomatis berdasarkan domain email
    if (email.endsWith('@student.uns.ac.id')) {
      router.push('/login');
    } else if (email.endsWith('@dosen.uns.ac.id')) {
      router.push('/login');
    } else if (email.endsWith('@tendik.uns.ac.id')) {
      router.push('/login');
    } else {
      setError('Format email tidak valid');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-x-hidden bg-[#070C1E] text-white">
      {/* Background Glow - Responsif ukurannya di mobile dan desktop */}
      <div className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md glass-card p-5 sm:p-8 rounded-3xl border border-white/15 relative z-10 shadow-2xl mx-auto backdrop-blur-xl bg-slate-900/60">
        
        {/* Header Logo */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">EduMate AI</h1>
          <p className="text-xs text-slate-300">Buat akun untuk mulai menggunakan EduMate AI</p>
        </div>

        {/* Form Register */}
        <form className="space-y-4" onSubmit={handleRegister}>
          
          <div className="space-y-1.5">
            <label htmlFor="fullname" className="text-xs font-medium text-slate-300">Nama Lengkap</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                id="fullname"
                type="text" 
                required
                placeholder="Masukkan nama lengkap" 
                className="w-full glass-input bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-email" className="text-xs font-medium text-slate-300">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                id="reg-email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email kalian" 
                className="w-full glass-input bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-password" className="text-xs font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                id="reg-password"
                type="password" 
                required
                placeholder="Buat password" 
                className="w-full glass-input bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Tombol Daftar */}
          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition flex items-center justify-center space-x-2 mt-2 cursor-pointer"
          >
            <span>Daftar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Login Link */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-cyan-400 font-medium hover:underline">
            Login sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}