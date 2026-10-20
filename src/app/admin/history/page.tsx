"use client";

import React, { useEffect, useState } from "react";
import { Clock, Bot, Brain, Search, RefreshCw, FileText } from "lucide-react";

interface HistoryItem {
  id: string;
  user_name: string;
  user_email: string;
  feature: string;
  prompt_or_mode: string;
  response_summary: string;
  file_path: string | null;
  created_at: string;
}

export default function AdminAiHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [filterFeature, setFilterFeature] = useState<string>("all");

  const API_BASE_URL = "http://127.0.0.1:8000";

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/admin/ai-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Fetch AI History error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.user_name.toLowerCase().includes(search.toLowerCase()) ||
      item.user_email.toLowerCase().includes(search.toLowerCase()) ||
      item.prompt_or_mode.toLowerCase().includes(search.toLowerCase());

    const matchesFeature =
      filterFeature === "all" || item.feature === filterFeature;

    return matchesSearch && matchesFeature;
  });

  return (
    <div className="space-y-6 animate-fadeIn p-6 lg:p-8 bg-[#070b19] min-h-screen text-slate-200">
      {/* Header Banner */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Clock className="w-7 h-7 text-cyan-400" />
            <span>Riwayat Penggunaan AI Real-Time</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Pantau seluruh aktivitas Tanya AI dan Simulasi Pitching seluruh pengguna secara komprehensif.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHistory}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pengguna, prompt, atau topik..."
              className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Filter Fitur:</span>
            <select
              value={filterFeature}
              onChange={(e) => setFilterFeature(e.target.value)}
              className="bg-[#070b19] border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Semua Fitur</option>
              <option value="Tanya AI">Tanya AI</option>
              <option value="Simulasi Pitching">Simulasi Pitching</option>
            </select>
          </div>
        </div>

        {/* Tabel History */}
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Memuat riwayat penggunaan AI...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b19] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Pengguna</th>
                  <th className="p-3.5">Fitur AI</th>
                  <th className="p-3.5">Prompt / Mode</th>
                  <th className="p-3.5">Ringkasan Output AI</th>
                  <th className="p-3.5">File Lampiran</th>
                  <th className="p-3.5 text-right rounded-r-xl">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">
                      Belum ada riwayat aktivitas AI tercatat.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-all">
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{item.user_name}</div>
                        <div className="text-[11px] text-slate-400">{item.user_email}</div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center space-x-1 ${
                            item.feature === "Tanya AI"
                              ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                              : "bg-purple-500/10 text-purple-300 border-purple-500/30"
                          }`}
                        >
                          {item.feature === "Tanya AI" ? (
                            <Bot className="w-3 h-3 mr-1" />
                          ) : (
                            <Brain className="w-3 h-3 mr-1" />
                          )}
                          <span>{item.feature}</span>
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs truncate font-medium text-slate-200">
                        {item.prompt_or_mode}
                      </td>
                      <td className="p-3.5 max-w-sm text-slate-400 leading-relaxed">
                        {item.response_summary}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {item.file_path ? (
                          <span className="inline-flex items-center space-x-1 text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            <FileText className="w-3 h-3" />
                            <span className="text-[10px]">Dokumen</span>
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right text-slate-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString("id-ID", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}