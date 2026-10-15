'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  User, 
  History, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Kelola User', href: '/admin/kelola-user', icon: Users },
    { name: 'Profile Admin', href: '/admin/profile', icon: User },
    { name: 'Riwayat AI', href: '/admin/history', icon: History },
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0c142b] border-r border-slate-800/80 p-5 justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-8">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-950/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base tracking-tight leading-tight">EduMate Admin</h2>
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">Panel Kontrol</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const IconComp = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-[#070b19]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Header Bar Mobile */}
      <div className="md:hidden bg-[#0c142b] border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <span className="font-bold text-white text-sm">EduMate Admin</span>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-[#070b19] text-slate-300 border border-slate-700/60"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0c142b] border-b border-slate-800 p-4 space-y-2 animate-fadeIn z-30">
          {navigation.map((item) => {
            const IconComp = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-[#070b19]'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full mt-2 bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}