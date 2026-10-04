'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen,
  MessageSquareText, 
  History, 
  User, 
  LogOut,
  Send, 
  FileText, 
  Bot, 
  Sparkles, 
  X,
  Plus,
  Image as ImageIcon,
  Menu
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

interface AttachedFile {
  file: File;
  type: 'document' | 'image';
}

export default function ChatAIPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ref untuk pemicu input file tersembunyi
  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Menangani Pemilihan File Dokumen
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setAttachedFile({ file: selectedFile, type: 'document' });
    }
    setShowAttachMenu(false);
  };

  // Menangani Pemilihan File Gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setAttachedFile({ file: selectedFile, type: 'image' });
    }
    setShowAttachMenu(false);
  };

  // Menangani Pengiriman Pesan
  const handleSendMessage = () => {
    if (!input.trim() && !attachedFile) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setShowAttachMenu(false);

    const detailText = currentInput 
      ? 'mengenai "' + currentInput + '":' 
      : 'berikut ringkasan berkas yang dikirim:';

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Berdasarkan dokumen pembelajaran yang diunggah, ' + detailText + ' RAG menggabungkan pencarian dokumen menggunakan ChromaDB dengan Hermes LLM.',
        sources: ['Modul_RAG_Pertemuan_4.pdf (Halaman 12)', 'Jurnal_Scopus_AI_Education.pdf'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
      setAttachedFile(null);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#070C1E] text-white overflow-hidden font-sans relative">
      
      {/* ================= 1. SIDEBAR NAVIGASI KIRI (DESKTOP) ================= */}
      <aside className="w-56 bg-slate-900/60 backdrop-blur-2xl border-r border-blue-500/15 hidden lg:flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Logo EduMate AI */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <GraduationCap size={22} />
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              EduMate AI
            </span>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-1.5">
            <Link
              href="/student/courses"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <LayoutDashboard size={17} className="text-blue-300/60" />
              <span>Beranda</span>
            </Link>

            <Link
              href="/student/courses/Manpro"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <BookOpen size={17} className="text-blue-300/60" />
              <span>Mata Kuliah</span>
            </Link>

            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 text-white shadow-lg shadow-blue-600/35 border border-cyan-400/30">
              <MessageSquareText size={17} className="text-white" />
              <span>Tanya AI</span>
            </div>

            <Link
              href="/student/history/Manpro"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <History size={17} className="text-blue-300/60" />
              <span>Riwayat</span>
            </Link>

            <Link
              href="/student/profile"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              <User size={17} className="text-blue-300/60" />
              <span>Profil</span>
            </Link>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left cursor-pointer"
            >
              <LogOut size={17} />
              <span>Keluar</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-md pt-20 px-4">
          <div className="w-full h-fit bg-slate-900 border border-blue-500/30 p-5 rounded-2xl flex flex-col space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
              <span className="text-xs font-bold text-cyan-300">Menu Navigasi</span>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <Link 
                href="/student/courses" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <LayoutDashboard size={16} className="text-blue-300/60" />
                <span>Beranda</span>
              </Link>
              <Link 
                href="/student/courses/Manpro" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <BookOpen size={16} className="text-blue-300/60" />
                <span>Mata Kuliah</span>
              </Link>
              <Link 
                href="/student/chat/Manpro" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/30 font-semibold"
              >
                <MessageSquareText size={16} className="text-white" />
                <span>Tanya AI</span>
              </Link>
              <Link 
                href="/student/history/Manpro" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <History size={16} className="text-blue-300/60" />
                <span>Riwayat</span>
              </Link>
              <Link 
                href="/student/profil" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-blue-500/10 text-blue-200 hover:text-white transition-all"
              >
                <User size={16} className="text-blue-300/60" />
                <span>Profil</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/login');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all text-xs font-medium text-left cursor-pointer"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* ================= 2. AREA UTAMA (HEADER + CHAT) ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header Atas */}
        <header className="h-16 px-4 sm:px-6 border-b border-blue-500/15 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between shrink-0 z-40">
          <div className="flex items-center gap-3">
            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-blue-500/20 text-blue-200 hover:text-white transition-all"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0">
                <GraduationCap size={18} />
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                EduMate AI
              </span>
            </div>
          </div>

          {/* Profil User Kanan */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 px-2.5 py-1 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold border border-cyan-400/40 shrink-0">
                ZZ
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-bold text-white leading-none">Zam Zam</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-4 md:p-6 flex flex-col min-h-0">
          <div className="flex flex-col h-full w-full max-w-5xl mx-auto">
            
            {/* Title */}
            <div className="mb-3 shrink-0">
              <h1 className="text-lg md:text-xl font-bold text-white">
                Tanya EduMate AI
              </h1>
              <p className="text-xs text-blue-200/70 mt-0.5">
                Ajukan pertanyaan seputar jurnal, RPS, atau modul. Kamu juga bisa mengirim file atau gambar.
              </p>
            </div>

            {/* Box Chat Utama */}
            <div className="flex-1 flex flex-col min-h-0 bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden shadow-2xl relative">
              
              {/* Area Percakapan */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.length === 0 ? (
                  /* Empty State (Tampilan Awal) */
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 my-auto">
                    <div className="relative w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-gradient-to-b from-cyan-500/20 to-blue-600/40 border border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                      <Bot size={32} className="text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                      <Sparkles size={14} className="absolute top-1.5 right-1.5 text-cyan-300 animate-pulse" />
                      <GraduationCap size={14} className="absolute bottom-1.5 left-1.5 text-blue-400" />
                    </div>

                    <h2 className="text-base md:text-lg font-bold text-white mb-1">
                      Halo, ada yang bisa aku bantu?
                    </h2>
                    <p className="text-xs text-blue-200/70 max-w-sm leading-relaxed mb-4">
                      Tanyakan apa saja terkait materi perkuliahan, RPS, modul, atau jurnal. Tekan tombol <strong className="text-cyan-300">+</strong> di bawah untuk menyisipkan file atau gambar.
                    </p>
                  </div>
                ) : (
                  /* Bubble Chat */
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 max-w-2xl ${
                        msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
                        }`}
                      >
                        {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>

                      <div
                        className={`rounded-2xl p-3 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-blue-600/90 text-white rounded-tr-none'
                            : 'bg-slate-800/90 border border-blue-500/20 text-slate-100 rounded-tl-none shadow-lg'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-blue-500/20">
                            <p className="text-[10px] font-semibold text-cyan-300 flex items-center gap-1 mb-1">
                              <Sparkles size={11} /> Sumber Referensi Dokumen:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {msg.sources.map((src, idx) => (
                                <span
                                  key={msg.id + '-src-' + idx}
                                  className="inline-flex items-center gap-1 bg-blue-950/70 border border-blue-500/30 text-blue-200 text-[9px] px-2 py-0.5 rounded-md"
                                >
                                  <FileText size={10} className="text-blue-400" />
                                  {src}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <span className="text-[8px] text-blue-200/50 block text-right mt-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="flex gap-2.5 max-w-md mr-auto">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 flex items-center justify-center animate-pulse shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="bg-slate-800/90 border border-blue-500/20 rounded-2xl p-3 text-xs text-blue-300/80 rounded-tl-none flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                      <span className="text-[11px]">EduMate AI sedang membaca dokumen & menyusun jawaban...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview File Terlampir (Sebelum dikirim) */}
              {attachedFile && (
                <div className="px-4 py-2 bg-blue-950/80 border-t border-blue-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-cyan-300 min-w-0 pr-2">
                    {attachedFile.type === 'document' ? (
                      <FileText size={15} className="text-cyan-400 shrink-0" />
                    ) : (
                      <ImageIcon size={15} className="text-cyan-400 shrink-0" />
                    )}
                    <span className="truncate max-w-xs font-medium">{attachedFile.file.name}</span>
                    <span className="text-[10px] text-blue-300/50 shrink-0">
                      ({(attachedFile.file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setAttachedFile(null)} 
                    className="text-blue-300/60 hover:text-red-400 transition-colors p-1 shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Input Form Bawah bergaya ChatGPT */}
              <div className="p-2.5 bg-slate-950/90 border-t border-blue-500/20 shrink-0 relative">
                
                {/* Pop-up Menu Melayang saat + ditekan */}
                {showAttachMenu && (
                  <div className="absolute bottom-16 left-3 bg-slate-900/95 border border-blue-500/30 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150 min-w-[180px]">
                    
                    {/* Opsi 1: Upload Dokumen */}
                    <button
                      type="button"
                      onClick={() => documentInputRef.current?.click()}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:text-white hover:bg-blue-600/30 rounded-lg transition-all text-left"
                    >
                      <FileText size={15} className="text-cyan-400 shrink-0" />
                      <div>
                        <span className="block font-medium">Unggah Dokumen</span>
                        <span className="block text-[9px] text-blue-300/50">PDF, DOC, PPT, TXT</span>
                      </div>
                    </button>

                    {/* Opsi 2: Upload Gambar */}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:text-white hover:bg-blue-600/30 rounded-lg transition-all text-left"
                    >
                      <ImageIcon size={15} className="text-cyan-400 shrink-0" />
                      <div>
                        <span className="block font-medium">Unggah Gambar</span>
                        <span className="block text-[9px] text-blue-300/50">PNG, JPG, JPEG, WEBP</span>
                      </div>
                    </button>

                  </div>
                )}

                {/* Hidden Input Files */}
                <input 
                  ref={documentInputRef}
                  type="file" 
                  className="hidden" 
                  onChange={handleDocumentChange} 
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" 
                />
                <input 
                  ref={imageInputRef}
                  type="file" 
                  className="hidden" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                />

                {/* Form Baris Pengetikan ChatGPT-style */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-slate-900/90 border border-blue-500/30 rounded-2xl px-2.5 py-1.5 focus-within:border-cyan-400/70 transition-all"
                >
                  {/* Tombol + (Plus) */}
                  <button
                    type="button"
                    onClick={() => setShowAttachMenu((prev) => !prev)}
                    className={`p-2 rounded-xl transition-all shrink-0 ${
                      showAttachMenu 
                        ? 'bg-cyan-500/20 text-cyan-300 rotate-45' 
                        : 'text-blue-300/70 hover:text-white hover:bg-slate-800'
                    }`}
                    title="Lampirkan File atau Gambar"
                  >
                    <Plus size={18} />
                  </button>

                  {/* Input Teks */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tanya EduMate AI..."
                    className="flex-1 bg-transparent px-2 py-1 text-xs md:text-sm text-white placeholder-blue-300/40 focus:outline-none min-w-0"
                  />

                  {/* Tombol Send */}
                  <button
                    type="submit"
                    disabled={isLoading || (!input.trim() && !attachedFile)}
                    className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </form>

              </div>

            </div>
          </div>
        </main>
      </div>

    </div>
  );
}