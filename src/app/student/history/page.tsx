'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  History as HistoryIcon,
  FileText,
  Clock,
  LogOut,
  Trash2,
  X,
  Bot,
  User,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface HistoryItem {
  id: string;
  activity: string;
  timestamp: string;
  status: 'Completed' | 'Pending';
  score?: string;
  conversation: ChatMessage[];
  file_path?: string | null;
}

// Helper function native untuk mengambil cookie tanpa js-cookie
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Helper function native untuk menghapus cookie
const eraseCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  }
};

export default function HistoryPage() {
  const router = useRouter();
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHistory = async () => {
    setLoading(true);
    // Mengambil token menggunakan helper native
    const token = getCookie('token') || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

    try {
      const res = await fetch('http://localhost:8000/student/chat/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const result = await res.json();
        
        const formattedData: HistoryItem[] = (result.data || []).map((item: any) => {
          const createdAt = new Date(item.created_at);
          const timeStr = createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          const dateStr = createdAt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

          return {
            id: String(item.id),
            activity: item.prompt,
            timestamp: `${dateStr}, ${timeStr}`,
            status: 'Completed',
            file_path: item.file_path,
            conversation: [
              {
                id: `u-${item.id}`,
                sender: 'user',
                text: item.prompt,
                time: timeStr
              },
              {
                id: `ai-${item.id}`,
                sender: 'ai',
                text: item.response,
                time: timeStr
              }
            ]
          };
        });

        setHistoryList(formattedData);
      }
    } catch (err) {
      console.error('Gagal mengambil data riwayat:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleLogout = () => {
    eraseCookie('token');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/login');
  };

  const handleDeleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
      const token = getCookie('token') || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
      try {
        const res = await fetch(`http://localhost:8000/student/chat/history/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setHistoryList((prev) => prev.filter((item) => item.id !== id));
          if (selectedItem?.id === id) {
            setSelectedItem(null);
          }
        }
      } catch (err) {
        console.error('Gagal menghapus riwayat:', err);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner & Tombol Keluar */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <HistoryIcon className="w-6 h-6 text-cyan-400" />
            <span>Riwayat Aktivitas Akademik</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Daftar rekam jejak konsultasi Tanya AI dan analisis lomba Anda.
          </p>
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

      {/* Daftar Riwayat Aktivitas */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 shadow-xl">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Memuat riwayat percakapan...
          </div>
        ) : historyList.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Belum ada riwayat aktivitas yang tersimpan.
          </div>
        ) : (
          <div className="space-y-4">
            {historyList.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#070b19] border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 transition-all gap-3 group"
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex items-start space-x-3 text-left flex-1 bg-transparent border-none cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-500/20 transition-colors">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {item.activity}
                    </h4>
                    <span className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.timestamp}</span>
                      {item.file_path && (
                        <span className="ml-2 text-cyan-400">
                          (📄 Berkas Terlampir)
                        </span>
                      )}
                    </span>
                  </div>
                </button>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.status}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors ml-2"
                    title="Hapus Riwayat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Percakapan */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c142b] border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-6 bg-[#0e162f] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{selectedItem.activity}</h3>
                  <p className="text-xs text-slate-400">{selectedItem.timestamp}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#070b19]">
              {selectedItem.conversation && selectedItem.conversation.length > 0 ? (
                selectedItem.conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white'
                          : 'bg-[#0c142b] border border-cyan-500/40 text-cyan-400'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-[#0c142b] border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="block text-[10px] opacity-60 mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-500 py-6">
                  Tidak ada percakapan tercatat untuk aktivitas ini.
                </p>
              )}
            </div>

            <div className="p-4 bg-[#0e162f] border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}