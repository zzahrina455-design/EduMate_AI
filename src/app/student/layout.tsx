'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  User,
  Home, 
  History as HistoryIcon, 
  Trophy,
  Bot,
  Brain
} from 'lucide-react';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({
  children,
}: Readonly<StudentLayoutProps>) {
  const pathname = usePathname();

  const userProfile = {
    name: "Zam Zam",
    avatar: "ZZ"
  };

  const navItems = [
    { name: 'Beranda', href: '/student', icon: Home, isAi: false },
    { name: 'Tanya AI', href: '/student/chat', icon: Bot, isAi: true },
    { name: 'Latihan AI', href: '/student/practice', icon: Brain, isAi: true },
    { name: 'Info Lomba', href: '/student/courses', icon: Trophy, isAi: false },
    { name: 'Riwayat', href: '/student/history', icon: HistoryIcon, isAi: false },
    { name: 'Profil', href: '/student/profile', icon: User, isAi: false },
  ];

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-12">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070b19]/80 border-b border-slate-800/80 px-4 lg:px-10 py-3.5 flex items-center justify-between">
        <Link href="/student" className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            EduMate AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-[#0e162f]/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.isAi ? 'text-cyan-400' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/student/profile"
            className="flex items-center space-x-3 bg-[#0e162f] hover:bg-[#141f3d] border border-slate-800 px-3 py-1.5 rounded-2xl transition-all shadow-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              {userProfile.avatar}
            </div>
            <span className="text-sm font-medium text-slate-200 hidden sm:inline">{userProfile.name}</span>
          </Link>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="flex md:hidden bg-[#0a0f24] border-b border-slate-800/80 px-2 py-2 justify-around sticky top-[65px] z-40 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-xs whitespace-nowrap ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-10 pt-6">
        {children}
      </main>
    </div>
  );
}