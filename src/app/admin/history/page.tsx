'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  History, 
  LogOut, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  X, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  Calendar,
  Clock,
  User,
} from 'lucide-react';

type UserRole = 'Mahasiswa' | 'Dosen' | 'Admin';
type ActivityStatus = 'Berhasil' | 'Gagal' | 'Pending';

interface ActivityLog {
  id: number;
  user: string;
  role: UserRole;
  activity: string;
  timestamp: string;
  status: ActivityStatus;
}

export default function RiwayatActivityPage() {
  const router = useRouter();

  const [activeMenu] = useState('riwayat');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Semua Status' | ActivityStatus>('Semua Status');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<ActivityLog | null>(null);

  const [formData, setFormData] = useState({
    user: '',
    role: 'Mahasiswa' as UserRole,
    activity: '',
    status: 'Berhasil' as ActivityStatus
  });

  const [logsList, setLogsList] = useState<ActivityLog[]>([
    { id: 1, user: 'Andi Pratama', role: 'Mahasiswa', activity: 'Mengakses ringkasan modul Pemrograman Berorientasi Objek', timestamp: '03 Okt 2026, 19:45', status: 'Berhasil' },
    { id: 2, user: 'Siti Nurhaliza', role: 'Dosen', activity: 'Menambahkan soal kuis baru untuk kelas Algoritma', timestamp: '03 Okt 2026, 18:30', status: 'Berhasil' },
    { id: 3, user: 'Budi Santoso', role: 'Admin', activity: 'Menambahkan user baru ke dalam sistem', timestamp: '03 Okt 2026, 16:15', status: 'Berhasil' },
    { id: 4, user: 'Dewi Lestari', role: 'Mahasiswa', activity: 'Gagal melakukan login (Salah kata sandi)', timestamp: '03 Okt 2026, 14:10', status: 'Gagal' },
    { id: 5, user: 'Agus Setiawan', role: 'Dosen', activity: 'Memulai sesi diskusi AI interaktif', timestamp: '03 Okt 2026, 11:20', status: 'Berhasil' },
  ]);

  const handleOpenAddModal = () => {
    setEditingLog(null);
    setFormData({ user: '', role: 'Mahasiswa', activity: '', status: 'Berhasil' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (log: ActivityLog) => {
    setEditingLog(log);
    setFormData({ 
      user: log.user, 
      role: log.role, 
      activity: log.activity, 
      status: log.status 
    });
    setIsModalOpen(true);
  };

  const handleDeleteLog = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan riwayat ini?')) {
      setLogsList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.user || !formData.activity) return;

    const currentFormattedDate = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    if (editingLog) {
      setLogsList((prev) =>
        prev.map((item) => (item.id === editingLog.id ? { ...item, ...formData } : item))
      );
    } else {
      const newLogItem: ActivityLog = {
        id: Date.now(),
        ...formData,
        timestamp: currentFormattedDate,
      };
      setLogsList((prev) => [newLogItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const filteredLogs = logsList.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.activity.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'Semua Status' || log.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalLogs = logsList.length;
  const countSuccess = logsList.filter((l) => l.status === 'Berhasil').length;
  const countFailed = logsList.filter((l) => l.status === 'Gagal').length;

  return (
    <div className="min-h-screen w-full bg-[#070C1E] text-white font-sans flex relative overflow-hidden">
      
      {/* ================= 1. SIDEBAR KIRI ================= */}
      <aside className="w-64 bg-slate-950/80 border-r border-blue-500/15 flex flex-col justify-between p-4 md:p-5 shrink-0 z-30 backdrop-blur-xl">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <GraduationCap size={22} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              EduMate AI
            </span>
          </div>

          <nav className="space-y-1.5">
            <Link
              href="/admin/dashboard"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/kelola-user"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'kelola-user'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users size={17} />
              <span>Kelola User</span>
            </Link>

            <Link
              href="/admin/history"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeMenu === 'riwayat'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <History size={17} />
              <span>Riwayat</span>
            </Link>

            <Link
              href="/admin/profile"
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'profile'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User size={17} />
              <span>Profil</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* ================= 2. AREA KONTEN UTAMA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
          
          <div className="relative w-72"></div>

          <div className="flex items-center gap-3">
            <Link href="/admin/profile" className="flex items-center gap-2.5 bg-slate-900/80 border border-blue-500/20 px-3 py-1.5 rounded-xl hover:border-cyan-400/40 transition-all">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                AD
              </div>
              <span className="text-xs font-bold text-white">Admin</span>
            </Link>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/20 text-xs font-medium transition-all"
              title="Keluar"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>

        </header>

        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Riwayat Aktivitas Sistem
              </h1>
              <p className="text-xs text-blue-200/60 mt-0.5">
                Pantau dan kelola seluruh log aktivitas yang terjadi di dalam platform EduMate AI.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 border border-cyan-400/30 shrink-0"
            >
              <Plus size={16} />
              <span>Tambah Log Manual</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-400/30">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Total Aktivitas</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{totalLogs}</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-400/30">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Aktivitas Berhasil</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{countSuccess}</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-400/30">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Aktivitas Gagal</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{countFailed}</h3>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/40" size={14} />
                <input
                  type="text"
                  placeholder="Cari user atau aktivitas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="relative w-40">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as 'Semua Status' | ActivityStatus)}
                    className="w-full appearance-none bg-slate-950 border border-blue-500/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark]"
                  >
                    <option value="Semua Status">Semua Status</option>
                    <option value="Berhasil">Berhasil</option>
                    <option value="Gagal">Gagal</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-blue-500/15 text-blue-300/60 font-semibold text-[11px]">
                    <th className="py-3 px-3 w-12 text-center">No</th>
                    <th className="py-3 px-3">Pengguna</th>
                    <th className="py-3 px-3">Aktivitas</th>
                    <th className="py-3 px-3">Waktu</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/10">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-blue-300/50">
                        Tidak ada riwayat aktivitas yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log, index) => {
                      let roleBadge = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
                      if (log.role === 'Dosen') roleBadge = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
                      if (log.role === 'Admin') roleBadge = 'bg-amber-500/15 text-amber-300 border-amber-500/30';

                      let statusBadge = 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
                      if (log.status === 'Gagal') {
                        statusBadge = 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
                      } else if (log.status === 'Pending') {
                        statusBadge = 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
                      }

                      return (
                        <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3 text-center text-blue-300/60 font-mono">
                            {index + 1}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{log.user}</div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border inline-block mt-0.5 ${roleBadge}`}>
                              {log.role}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-blue-100/90 max-w-sm truncate">
                            {log.activity}
                          </td>
                          <td className="py-3 px-3 text-blue-300/70 font-mono text-[11px]">
                            {log.timestamp}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${statusBadge}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(log)}
                                className="p-1.5 rounded-lg text-blue-300 hover:text-cyan-400 hover:bg-blue-500/10 transition-all"
                                title="Edit Log"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteLog(log.id)}
                                className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                title="Hapus Log"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-blue-500/15 text-xs text-blue-300/60">
              <span>Menampilkan data riwayat aktivitas sistem</span>
              <div className="flex items-center gap-1">
                <button type="button" className="p-1.5 rounded-lg bg-slate-950 border border-blue-500/20 text-blue-300/60">
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</button>
                <button type="button" className="p-1.5 rounded-lg bg-slate-950 border border-blue-500/20 text-blue-300/60">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </main>

      </div>

      {/* ================= MODAL TAMBAH / EDIT LOG ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity size={16} className="text-cyan-400" />
                <span>{editingLog ? 'Edit Riwayat Aktivitas' : 'Tambah Catatan Aktivitas Baru'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-blue-300/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              
              <div>
                <label htmlFor="inputUser" className="block font-semibold text-blue-200 mb-1">Nama Pengguna</label>
                <input
                  id="inputUser"
                  type="text"
                  required
                  placeholder="Misal: Budi Santoso"
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="selectRole" className="block font-semibold text-blue-200 mb-1">Role Pengguna</label>
                <select
                  id="selectRole"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 [color-scheme:dark]"
                >
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Dosen">Dosen</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="inputActivity" className="block font-semibold text-blue-200 mb-1">Keterangan Aktivitas</label>
                <input
                  id="inputActivity"
                  type="text"
                  required
                  placeholder="Misal: Memperbarui profil akun"
                  value={formData.activity}
                  onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="selectStatus" className="block font-semibold text-blue-200 mb-1">Status</label>
                <select
                  id="selectStatus"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ActivityStatus })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 [color-scheme:dark]"
                >
                  <option value="Berhasil">Berhasil</option>
                  <option value="Gagal">Gagal</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-blue-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-blue-200/70 hover:text-white transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-600/30"
                >
                  {editingLog ? 'Simpan Perubahan' : 'Tambah Log'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}