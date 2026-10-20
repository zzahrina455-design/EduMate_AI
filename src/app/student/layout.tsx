'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Home, 
  Bot, 
  Brain, 
  Trophy, 
  Clock, 
  User 
} from 'lucide-react';

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error('Gagal membaca data user:', error);
      }
    }
  }, []);

  const displayName = user?.name || 'Mahasiswa';

  const getInitials = (name: string) => {
    if (!name) return 'M';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const navItems = [
    { label: 'Beranda', href: '/student', icon: Home },
    { label: 'Tanya AI', href: '/student/chat', icon: Bot },
    { label: 'Latihan AI', href: '/student/pitching', icon: Brain },
    { label: 'Info Lomba', href: '/student/competitions', icon: Trophy },
    { label: 'Riwayat', href: '/student/history', icon: Clock },
    { label: 'Profil', href: '/student/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-200">
      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#070b19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-base font-bold text-white tracking-wide">
            EduMate AI
          </span>
        </div>

        <nav className="hidden md:flex items-center bg-[#0e162f] border border-slate-800 rounded-full p-1.5 shadow-inner">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2 bg-[#0e162f] border border-slate-800 px-3 py-1.5 rounded-full shadow-sm">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
            {getInitials(displayName)}
          </div>
          <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate">
            {displayName}
          </span>
        </div>
      </header>

      {/* Konten Utama Halaman (/student/page.tsx) */}
      <main className="w-full">{children}</main>
    </div>
  );
}