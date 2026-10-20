"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Bot,
  Brain,
  Activity,
  LogOut,
  TrendingUp,
  ShieldCheck,
  Clock,
  ChevronRight,
  Server,
} from "lucide-react";

interface DashboardStats {
  total_users: number;
  total_chat_sessions: number;
  total_pitching_simulations: number;
  ai_status: boolean;
  weekly_usage_volume: { date: string; day: string; total_usage: number }[];
}

interface UserActivity {
  id: number;
  user_name: string;
  user_email: string;
  activity_type: string;
  description: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = "http://127.0.0.1:8000";

  // Fetch data dashboard dari Backend API menggunakan access_token
  const fetchDashboardData = async () => {
    try {
      // PERBAIKAN: Mengambil key 'access_token' sesuai dengan yang disimpan LoginPage
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("Token tidak ditemukan di localStorage");
        setLoading(false);
        router.push("/login");
        return;
      }

      const [resStats, resActivities] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache"
          },
        }),
        fetch(`${API_BASE_URL}/admin/activities`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache"
          },
        }),
      ]);

      if (resStats.ok && resActivities.ok) {
        const statsData = await resStats.json();
        const activitiesData = await resActivities.json();
        setStats(statsData);
        setActivities(activitiesData);
      } else {
        console.error("Respon backend gagal:", resStats.status, resActivities.status);
      }
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    // Hapus token & user dari LocalStorage serta cookie
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="p-8 text-slate-400 font-medium flex items-center justify-center min-h-screen bg-[#070b19]">
        Memuat data dashboard...
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Pengguna",
      value: stats?.total_users?.toLocaleString() || "0",
      change: "Sesuai pengguna terdaftar",
      icon: Users,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Sesi Tanya AI",
      value: stats?.total_chat_sessions?.toLocaleString() || "0",
      change: "Riwayat aktivitas tanya jawab",
      icon: Bot,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Simulasi Pitching",
      value: stats?.total_pitching_simulations?.toLocaleString() || "0",
      change: "Riwayat latihan AI",
      icon: Brain,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Status Model AI",
      value: stats?.ai_status ? "Aktif" : "Nonaktif",
      change: stats?.ai_status ? "Model siap melayani" : "Model dimatikan",
      icon: Server,
      color: stats?.ai_status ? "text-emerald-400" : "text-rose-400",
      bg: stats?.ai_status
        ? "bg-emerald-500/10 border-emerald-500/20"
        : "bg-rose-500/10 border-rose-500/20",
    },
  ];

  const maxUsage = Math.max(
    10,
    ...(stats?.weekly_usage_volume?.map((d) => d.total_usage) || [1])
  );

  return (
    <div className="space-y-6 animate-fadeIn p-6 lg:p-8 bg-[#070b19] min-h-screen text-slate-200">
      {/* Header Banner & Logout */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span>Dashboard Administrator</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Ringkasan statistik pengguna, performa AI, dan aktivitas platform EduMate AI.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
          <div className="hidden sm:flex items-center space-x-3 bg-[#070b19] border border-slate-800/80 px-4 py-2 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
              AD
            </div>
            <span className="text-sm font-semibold text-white">Admin Utama</span>
          </div>

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

      {/* Grid Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((s) => {
          const IconComp = s.icon;
          return (
            <div
              key={s.title}
              className="bg-[#0c142b] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-400">
                  {s.title}
                </span>
                <div className={`p-2.5 rounded-xl border ${s.bg}`}>
                  <IconComp className={`w-5 h-5 ${s.color}`} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white block">
                  {s.value}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400 inline mr-1" />
                  {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Analytics & Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0c142b] border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Volume Penggunaan AI Harian</span>
            </h2>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-xl font-semibold">
              7 Hari Terakhir
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {stats?.weekly_usage_volume?.map((d, idx) => {
              const heightPx = Math.max(12, Math.round((d.total_usage / maxUsage) * 140));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    title={`${d.total_usage} aktivitas`}
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xl transition-all duration-300 group-hover:brightness-125"
                    style={{ height: `${heightPx}px` }}
                  />
                  <span className="text-xs text-slate-400 font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Aktivitas Pengguna Terbaru</span>
            </h2>

            <div className="mt-4 space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {activities.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  Belum ada aktivitas tercatat.
                </p>
              ) : (
                activities.map((act) => (
                  <div
                    key={act.id}
                    className="bg-[#070b19] border border-slate-800 p-3 rounded-2xl text-xs space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">
                        {act.user_name}
                      </span>
                      <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                        {act.activity_type}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {act.description || act.activity_type}
                    </p>
                    <span className="text-[10px] text-slate-500 block text-right">
                      {new Date(act.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/history")}
            className="w-full bg-[#070b19] hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>Lihat Seluruh Riwayat</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}