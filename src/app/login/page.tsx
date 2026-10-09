'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulasi jeda loading seolah-olah menghubungi server (1 detik)
    setTimeout(() => {
      setLoading(false);

      // Simulasi deteksi role berdasarkan email untuk keperluan demo frontend
      let simulatedRole = 'mahasiswa';
      if (email.includes('admin')) simulatedRole = 'admin';
      else if (email.includes('dosen')) simulatedRole = 'dosen';

      const mockUser = { name: 'Demo User', email, role: simulatedRole };
      const mockToken = 'mock-jwt-token-frontend-only';

      // Simpan ke localStorage agar halaman dashboard bisa membacanya
      localStorage.setItem('access_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Redirect berdasarkan role simulasi
      if (simulatedRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (simulatedRole === 'dosen') {
        router.push('/dosen/dashboard');
      } else {
        router.push('/student/courses');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-x-hidden bg-[#070C1E] text-white">
      <div className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md p-5 sm:p-8 rounded-3xl border border-white/15 relative z-10 shadow-2xl mx-auto backdrop-blur-xl bg-slate-900/60">
        <div className="text-center space-y-3 mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            EduMate AI (Frontend Mode)
          </h1>
          <p className="text-xs text-slate-300">
            Masuk tanpa backend untuk uji tampilan
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-slate-300">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mahasiswa@student.uns.ac.id"
                className="w-full bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Tips: Ketik &quot;admin&quot; atau &quot;dosen&quot; di email untuk simulasi masuk sebagai admin/dosen.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition flex items-center justify-center space-x-2 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Memproses Simulasi...' : 'Login (Demo)'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Belum punya akun?{' '}
          <Link href="/register" className="text-cyan-400 font-medium hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}