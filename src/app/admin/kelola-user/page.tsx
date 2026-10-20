"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Shield, 
  Search,
  AlertCircle
} from "lucide-react";

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function KelolaUserPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // State Form Modal Tambah User
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("mahasiswa");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const API_BASE_URL = "http://127.0.0.1:8000";

  // Fetch seluruh user dari database PostgreSQL
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setError("Gagal memuat daftar pengguna.");
      }
    } catch (err) {
      console.error("Fetch users error:", err);
      setError("Gagal terhubung ke server backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tambah User ke Database
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`User ${name} berhasil ditambahkan!`);
        setName("");
        setEmail("");
        setPassword("");
        setRole("mahasiswa");
        setIsModalOpen(false);
        fetchUsers(); // Refresh tabel
      } else {
        setError(data.detail || "Gagal menambahkan user.");
      }
    } catch (err) {
      console.error("Create user error:", err);
      setError("Terjadi kesalahan saat menambahkan user.");
    } finally {
      setSubmitting(false);
    }
  };

  // Hapus User dari Database
  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus user "${userName}"?`)) return;

    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "User berhasil dihapus.");
        fetchUsers(); // Refresh tabel
      } else {
        setError(data.detail || "Gagal menghapus user.");
      }
    } catch (err) {
      console.error("Delete user error:", err);
      setError("Terjadi kesalahan saat menghapus user.");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn p-6 lg:p-8 bg-[#070b19] min-h-screen text-slate-200">
      {/* Header Banner */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Users className="w-7 h-7 text-cyan-400" />
            <span>Kelora Pengguna</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tambah, lihat, dan hapus akun pengguna terhubung langsung ke database PostgreSQL.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-2xl transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah User Baru</span>
        </button>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-2xl text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl text-xs flex items-center space-x-2">
          <Shield className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, atau role..."
              className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <span className="text-xs text-slate-400">
            Total: <strong className="text-cyan-400">{filteredUsers.length}</strong> pengguna
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs">Memuat daftar pengguna...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b19] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">ID</th>
                  <th className="p-3.5">Nama</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Tanggal Daftar</th>
                  <th className="p-3.5 text-right rounded-r-xl">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">
                      Tidak ada pengguna ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-all">
                      <td className="p-3.5 font-medium text-slate-400">#{u.id}</td>
                      <td className="p-3.5 font-semibold text-white">{u.name}</td>
                      <td className="p-3.5 text-slate-300">{u.email}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize ${
                            u.role === "admin"
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                              : u.role === "dosen"
                              ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                              : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {new Date(u.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl transition-all"
                          title="Hapus User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Popup Tambah User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0c142b] border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>Tambah Pengguna Baru</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@domain.com"
                    className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Role / Peran</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#070b19] border border-slate-800 rounded-xl py-2.5 px-3 text-slate-100 focus:outline-none focus:border-cyan-400"
                >
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="dosen">Dosen</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-md shadow-cyan-500/20 disabled:opacity-50"
                >
                  {submitting ? "Simpan..." : "Simpan User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}