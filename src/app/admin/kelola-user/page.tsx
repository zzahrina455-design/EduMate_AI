'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  LogOut,
  X,
  UserCheck
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  nimNip: string;
  role: 'Mahasiswa' | 'Dosen' | 'Admin';
  major: string;
  email: string;
  status: 'Aktif' | 'Nonaktif';
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'Zam Zam', nimNip: 'H1D021005', role: 'Mahasiswa', major: 'Informatika', email: 'zamzam@student.ac.id', status: 'Aktif' },
    { id: '2', name: 'Dr. Ir. Hendra Wijaya', nimNip: '198503122010121001', role: 'Dosen', major: 'Informatika', email: 'hendra@unsoed.ac.id', status: 'Aktif' },
    { id: '3', name: 'Siti Rahmawati', nimNip: 'H1D021012', role: 'Mahasiswa', major: 'Sistem Informasi', email: 'siti@student.ac.id', status: 'Aktif' },
    { id: '4', name: 'Admin Sistem Utama', nimNip: 'ADM-001', role: 'Admin', major: 'Puskom Akademik', email: 'admin@edumate.ac.id', status: 'Aktif' },
    { id: '5', name: 'Budi Santoso', nimNip: 'H1D021045', role: 'Mahasiswa', major: 'Teknik Elektro', email: 'budi@student.ac.id', status: 'Nonaktif' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    nimNip: '',
    role: 'Mahasiswa' as UserData['role'],
    major: '',
    email: ''
  });

  const handleLogout = () => {
    router.push('/login');
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : u))
    );
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus akun pengguna ini?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleAddUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    const created: UserData = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      name: newUser.name,
      nimNip: newUser.nimNip || 'H1D021999',
      role: newUser.role,
      major: newUser.major || 'Teknik',
      email: newUser.email,
      status: 'Aktif'
    };

    setUsers((prev) => [created, ...prev]);
    setShowModal(false);
    setNewUser({ name: '', nimNip: '', role: 'Mahasiswa', major: '', email: '' });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nimNip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStatusBadge = (status: UserData['status']) => {
    if (status === 'Aktif') {
      return (
        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          Aktif
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
        Nonaktif
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Users className="w-7 h-7 text-cyan-400" />
            <span>Manajemen Pengguna</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Kelola hak akses akun mahasiswa, dosen, dan administrator portal EduMate AI.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-lg shadow-cyan-950/50 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah User</span>
          </button>

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

      {/* Control Bar Search */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, NIM/NIP, atau peran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Total Pengguna Terdaftar: <strong className="text-cyan-400">{users.length}</strong>
        </span>
      </div>

      {/* Tabel Data Users */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#070b19] text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">NIM / NIP</th>
                <th className="px-6 py-4">Peran</th>
                <th className="px-6 py-4">Prodi / Unit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#070b19]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {u.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-xs text-slate-400">{u.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono text-xs">{u.nimNip}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-500/10 text-cyan-300 border border-blue-500/20 px-2.5 py-1 rounded-md text-xs font-medium">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-xs">{u.major}</td>
                  <td className="px-6 py-4">{renderStatusBadge(u.status)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u.id)}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Ubah Status"
                    >
                      <UserCheck className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Hapus User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah User */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c142b] border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Tambah Pengguna Baru</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="name"className="text-xs font-medium text-slate-400 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-medium text-slate-400 block mb-1">Email Kampus</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nimNip"className="text-xs font-medium text-slate-400 block mb-1">NIM / NIP</label>
                  <input
                    type="text"
                    value={newUser.nimNip}
                    onChange={(e) => setNewUser({ ...newUser, nimNip: e.target.value })}
                    className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="role"className="text-xs font-medium text-slate-400 block mb-1">Peran (Role)</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserData['role'] })}
                    className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="major"className="text-xs font-medium text-slate-400 block mb-1">Program Studi / Unit</label>
                <input
                  type="text"
                  value={newUser.major}
                  onChange={(e) => setNewUser({ ...newUser, major: e.target.value })}
                  className="w-full bg-[#070b19] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/50"
                >
                  Simpan Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}