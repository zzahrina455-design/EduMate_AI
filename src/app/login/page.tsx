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

  const handleLogin = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Login gagal.'
        );
      }

      // Simpan JWT token
      localStorage.setItem(
        'access_token',
        data.access_token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      // Simpan token ke cookie agar bisa dibaca middleware
      document.cookie = `access_token=${data.access_token}; path=/; max-age=3600; SameSite=Lax`;

      // Redirect berdasarkan role
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (data.user.role === 'dosen') {
        router.push('/dosen/dashboard');
      } else if (data.user.role === 'mahasiswa') {
        router.push('/student/courses');
      } else {
        throw new Error(
          'Role pengguna tidak dikenali.'
        );
      }

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat login.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-x-hidden bg-[#070C1E] text-white">

      {/* Background Glow */}
      <div className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md glass-card p-5 sm:p-8 rounded-3xl border border-white/15 relative z-10 shadow-2xl mx-auto backdrop-blur-xl bg-slate-900/60">

        {/* Header Logo */}
        <div className="text-center space-y-3 mb-6 sm:mb-8">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
            <Bot className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            EduMate AI
          </h1>

          <p className="text-xs text-slate-300">
            Masuk untuk melanjutkan perjalananmu
          </p>

        </div>

        {/* Form Login */}
        <form
          className="space-y-4 sm:space-y-5"
          onSubmit={handleLogin}
        >

          {/* Email */}
          <div className="space-y-1.5">

            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-300"
            >
              Email
            </label>

            <div className="relative">

              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="nama@student.uns.ac.id"
                className="w-full glass-input bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />

            </div>

          </div>

          {/* Password */}
          <div className="space-y-1.5">

            <label
              htmlFor="password"
              className="text-xs font-medium text-slate-300"
            >
              Password
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full glass-input bg-slate-950/80 border border-blue-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />

            </div>

          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-xs text-slate-300">

            <label className="flex items-center space-x-2 cursor-pointer">

              <input
                type="checkbox"
                className="rounded bg-slate-900 border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
              />

              <span>
                Ingat saya
              </span>

            </label>

            <button
              type="button"
              onClick={() =>
                alert(
                  'Link pemulihan password telah dikirim ke email Anda.'
                )
              }
              className="text-cyan-400 hover:underline bg-transparent border-none p-0 cursor-pointer text-xs"
            >
              Lupa password?
            </button>

          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition flex items-center justify-center space-x-2 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >

            <span>
              {loading
                ? 'Memproses...'
                : 'Login'}
            </span>

            {!loading && (
              <ArrowRight className="w-4 h-4" />
            )}

          </button>

        </form>

        {/* Footer Register Link */}
        <div className="mt-6 text-center text-xs text-slate-400">

          Belum punya akun?{' '}

          <Link
            href="/register"
            className="text-cyan-400 font-medium hover:underline"
          >
            Daftar sekarang
          </Link>

        </div>

      </div>
    </div>
  );
}