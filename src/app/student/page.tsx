"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  ExternalLink,
  Sparkles,
  Search,
  Calendar,
  LogOut,
  Bot,
  RefreshCw,
  Code
} from "lucide-react";

interface CompetitionItem {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  social_media_link: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [userName, setUserName] = useState<string>("Mahasiswa");

  const API_BASE_URL = "http://127.0.0.1:8000";

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        setUserName(userObj.name || "Mahasiswa");
      }

      const res = await fetch(`${API_BASE_URL}/student/competitions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCompetitions(data);
      }
    } catch (error) {
      console.error("Gagal memuat lomba TI:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  const filteredCompetitions = competitions.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn p-6 lg:p-8 bg-[#070b19] min-h-screen text-slate-200">
      {/* Header Banner */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-7 h-7 text-cyan-400" />
            <span>Selamat Datang, {userName}!</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Rekomendasi info lomba Teknik Informatika (GEMASTIK, Hackathon, AI, Web/Mobile) langsung dari Puspresnas & Devpost.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
          <button
            type="button"
            onClick={() => router.push("/student/chat")}
            className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Tanya AI</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Info Lomba Section */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              Info Lomba Teknik Informatika (Real-Time RAG)
            </h2>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari GEMASTIK, Hackathon, AI..."
                className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <button
              onClick={fetchCompetitions}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition shrink-0"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            Sinkronisasi data lomba TI dari Puspresnas & Devpost...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.length === 0 ? (
              <div className="col-span-full text-center py-8 text-slate-500 text-xs">
                Belum ada informasi lomba Teknik Informatika ditemukan.
              </div>
            ) : (
              filteredCompetitions.map((comp) => {
                const isDevpost = comp.social_media_link.includes("devpost");
                const isKemdikbud = comp.social_media_link.includes("kemdikbud");

                return (
                  <div
                    key={comp.id}
                    className="bg-[#070b19] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center space-x-1 ${
                            isKemdikbud
                              ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                              : isDevpost
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                              : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          }`}
                        >
                          <Code className="w-3 h-3 mr-1" />
                          <span>
                            {isKemdikbud
                              ? "Puspresnas Kemdikbud"
                              : isDevpost
                              ? "Devpost Hackathon"
                              : "Lomba IT Verified"}
                          </span>
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-sm line-clamp-2">
                        {comp.title}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center text-[11px] text-amber-300">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        <span>Deadline: {comp.deadline}</span>
                      </div>

                      <a
                        href={comp.social_media_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>Lihat Sumber Resmi</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}