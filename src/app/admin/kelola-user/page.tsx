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
  UserCheck,
  User,
  Mail,
} from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'Mahasiswa' | 'Dosen' | 'Admin';
  status: 'Aktif' | 'Nonaktif';
}

export default function KelolaUserPage() {
  const router = useRouter();

  const [activeMenu] = useState('kelola-user');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Semua Role' | 'Mahasiswa' | 'Dosen' | 'Admin'>('Semua Role');
  const [selectedStatus, setSelectedStatus] = useState<'Semua Status' | 'Aktif' | 'Nonaktif'>('Semua Status');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Mahasiswa' as 'Mahasiswa' | 'Dosen' | 'Admin',
    status: 'Aktif' as 'Aktif' | 'Nonaktif'
  });

  const [usersList, setUsersList] = useState<UserData[]>([
    { id: 1, name: 'Andi Pratama', email: 'andi@Student.uns.ac.id', role: 'Mahasiswa', status: 'Aktif' },
    { id: 2, name: 'Siti Nurhaliza', email: 'Rifa@Dosen.uns.ac.id', role: 'Dosen', status: 'Aktif' },
    { id: 3, name: 'Budi Santoso', email: 'budi@Admin.uns.ac.id', role: 'Admin', status: 'Aktif' },
    { id: 4, name: 'Rina Marlina', email: 'rina@Student.uns.ac.id', role: 'Mahasiswa', status: 'Aktif' },
    { id: 5, name: 'Agus Setiawan', email: 'Darmawan@Dosen.uns.ac.id', role: 'Dosen', status: 'Aktif' },
    { id: 6, name: 'Dewi Lestari', email: 'dewi@Student.uns.ac.id', role: 'Mahasiswa', status: 'Nonaktif' },
  ]);

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Mahasiswa', status: 'Aktif' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: UserData) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      setUsersList((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingUser) {
      setUsersList((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
    } else {
      const newUser: UserData = {
        id: Date.now(),
        ...formData
      };
      setUsersList((prev) => [newUser, ...prev]);
    }

    setIsModalOpen(false);
  };

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'Semua Role' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'Semua Status' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUser = usersList.length;
  const countMahasiswa = usersList.filter((u) => u.role === 'Mahasiswa').length;
  const countDosen = usersList.filter((u) => u.role === 'Dosen').length;
  const countAdmin = usersList.filter((u) => u.role === 'Admin').length;

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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                activeMenu === 'riwayat'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30'
                  : 'text-blue-200/60 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <History size={17} />
              <span>Riwayat</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* ================= 2. AREA KONTEN UTAMA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        <header className="h-16 px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
          
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/40" size={15} />
            <input
              type="text"
              placeholder="Cari sesuatu..."
              className="w-full bg-slate-900/80 border border-blue-500/20 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-slate-900/80 border border-blue-500/20 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                T
              </div>
              <span className="text-xs font-bold text-white">Admin</span>
            </div>

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
                Kelola User
              </h1>
              <p className="text-xs text-blue-200/60 mt-0.5">
                Kelola akun pengguna sistem EduMate AI.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 border border-cyan-400/30 shrink-0"
            >
              <Plus size={16} />
              <span>Tambah User</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-400/30">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Total User</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{totalUser}</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-400/30">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Mahasiswa</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{countMahasiswa}</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-400/30">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Dosen</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{countDosen}</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5 shadow-xl">
              <div className="p-3 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-400/30">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-[11px] text-blue-200/60 font-medium">Admin</p>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{countAdmin}</h3>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/40" size={14} />
                <input
                  type="text"
                  placeholder="Cari nama, email, atau role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              {/* Dropdown Filters dengan Posisi Simbol Panah Agak Ditengahkan */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                
                {/* Filter Role */}
                <div className="relative w-40">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as 'Semua Role' | 'Mahasiswa' | 'Dosen' | 'Admin')}
                    className="w-full appearance-none bg-slate-950 border border-blue-500/30 rounded-xl pl-4 pr-8 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark]"
                  >
                    <option value="Semua Role">Semua Role</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 pointer-events-none" />
                </div>

                {/* Filter Status */}
                <div className="relative w-40">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as 'Semua Status' | 'Aktif' | 'Nonaktif')}
                    className="w-full appearance-none bg-slate-950 border border-blue-500/30 rounded-xl pl-4 pr-8 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark]"
                  >
                    <option value="Semua Status">Semua Status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
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
                    <th className="py-3 px-3">Nama</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/10">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-blue-300/50">
                        Tidak ada data pengguna yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => {
                      let roleBadgeStyle = 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
                      if (user.role === 'Mahasiswa') {
                        roleBadgeStyle = 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30';
                      } else if (user.role === 'Dosen') {
                        roleBadgeStyle = 'bg-purple-500/15 text-purple-300 border border-purple-500/30';
                      }

                      return (
                        <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3 text-center text-blue-300/60 font-mono">
                            {index + 1}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center text-cyan-300 font-bold text-[11px] shrink-0">
                                {user.name.charAt(0)}
                              </div>
                              <span className="font-semibold text-white">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-blue-200/70 font-mono">
                            {user.email}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${roleBadgeStyle}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                              user.status === 'Aktif'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(user)}
                                className="p-1.5 rounded-lg text-blue-300 hover:text-cyan-400 hover:bg-blue-500/10 transition-all"
                                title="Edit User"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                title="Hapus User"
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
              <span>Menampilkan 1-6 dari 124 data</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 rounded-lg bg-slate-950 border border-blue-500/20 hover:border-cyan-400/40 text-blue-300/60 hover:text-white transition-all disabled:opacity-50"
                >
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </button>
                <button type="button" className="w-7 h-7 rounded-lg bg-slate-950 border border-blue-500/20 hover:border-cyan-400/40 text-blue-300/80 hover:text-white font-medium text-xs flex items-center justify-center transition-all">
                  2
                </button>
                <button type="button" className="w-7 h-7 rounded-lg bg-slate-950 border border-blue-500/20 hover:border-cyan-400/40 text-blue-300/80 hover:text-white font-medium text-xs flex items-center justify-center transition-all">
                  3
                </button>
                <span className="px-1 text-blue-300/40">...</span>
                <button type="button" className="w-7 h-7 rounded-lg bg-slate-950 border border-blue-500/20 hover:border-cyan-400/40 text-blue-300/80 hover:text-white font-medium text-xs flex items-center justify-center transition-all">
                  21
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg bg-slate-950 border border-blue-500/20 hover:border-cyan-400/40 text-blue-300/60 hover:text-white transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </main>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <User size={16} className="text-cyan-400" />
                <span>{editingUser ? 'Edit User' : 'Tambah User Baru'}</span>
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
                <label htmlFor="inputName" className="block font-semibold text-blue-200 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/40" size={14} />
                  <input
                    id="inputName"
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl pl-9 pr-3 py-2 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inputEmail" className="block font-semibold text-blue-200 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/40" size={14} />
                  <input
                    id="inputEmail"
                    type="email"
                    required
                    placeholder="nama@univ.ac.id"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-blue-500/30 rounded-xl pl-9 pr-3 py-2 text-white placeholder-blue-300/40 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="selectRole" className="block font-semibold text-blue-200 mb-1">Role</label>
                <select
                  id="selectRole"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Mahasiswa' | 'Dosen' | 'Admin' })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark]"
                >
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Dosen">Dosen</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="selectStatus" className="block font-semibold text-blue-200 mb-1">Status</label>
                <select
                  id="selectStatus"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Aktif' | 'Nonaktif' })}
                  className="w-full bg-slate-950 border border-blue-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition-all [color-scheme:dark]"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
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
                  {editingUser ? 'Simpan Perubahan' : 'Tambah User'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}