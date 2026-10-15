'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  RefreshCw, 
  Plus, 
  FileText, 
  Folder, 
  Image as ImageIcon,
  X,
  LogOut
} from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image';
  size?: string;
  fileCount?: number;
  previewUrl?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  attachments?: Attachment[];
}

export default function TanyaAIPage() {
  const router = useRouter();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Halo Zam Zam! Saya EduMate AI Assistant. Ada yang bisa saya bantu terkait tugas perkuliahan, rekomendasi lomba, atau referensi jurnal hari ini? Anda bisa mengunggah dokumen, foto/gambar, atau folder untuk dianalisis.',
      time: 'Baru saja'
    }
  ]);

  useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute('webkitdirectory', '');
      folderInputRef.current.setAttribute('directory', '');
    }
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const renderAttachmentIcon = (type: Attachment['type'], sizeClass: string) => {
    if (type === 'folder') return <Folder className={`${sizeClass} text-cyan-400 shrink-0`} />;
    if (type === 'image') return <ImageIcon className={`${sizeClass} text-cyan-400 shrink-0`} />;
    return <FileText className={`${sizeClass} text-cyan-400 shrink-0`} />;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const newAttachments: Attachment[] = files.map((file) => ({
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${file.name}`,
      name: file.name,
      type: 'file',
      size: (file.size / 1024).toFixed(1) + ' KB'
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    setShowMenu(false);
    e.target.value = '';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const newAttachments: Attachment[] = files.map((file) => ({
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${file.name}`,
      name: file.name,
      type: 'image',
      size: (file.size / 1024).toFixed(1) + ' KB',
      previewUrl: URL.createObjectURL(file)
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    setShowMenu(false);
    e.target.value = '';
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const firstFile = files[0] as File & { webkitRelativePath?: string };
    const firstFilePath = firstFile.webkitRelativePath || firstFile.name;
    const folderName = firstFilePath.split('/')[0] || 'Folder Baru';

    const newFolderAttachment: Attachment = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${folderName}`,
      name: folderName,
      type: 'folder' as const,
      fileCount: files.length
    };

    setAttachments((prev) => [...prev, newFolderAttachment]);
    setShowMenu(false);
    e.target.value = '';
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSend = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    const currentInput = input;
    const currentAttachments = [...attachments];

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: currentInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: currentAttachments.length > 0 ? currentAttachments : undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachments([]);
    setShowMenu(false);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = `Terima kasih atas pertanyaannya! Mengenai "${currentInput || 'berkas/foto yang diunggah'}", Anda dapat memeriksa panduan resmi di portal akademik atau berkonsultasi dengan Dosen Pembimbing untuk arahan lebih rinci.`;

      if (currentAttachments.length > 0) {
        const names = currentAttachments.map((a) => a.name).join(', ');
        const userQueryNote = currentInput ? `\n\nMengenai pertanyaan Anda: "${currentInput}"` : '';
        aiResponseText = `Saya telah menerima lampiran (${names}). Berkas tersebut telah siap dianalisis untuk membantu tugas dan riset Anda.${userQueryNote}`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner & Tombol Keluar */}
      <div className="bg-[#0e162f] border border-slate-800 rounded-3xl p-6 lg:p-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Bot className="w-7 h-7 text-cyan-400" />
            <span>Tanya AI Assistant</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Konsultasi akademik, analisis dokumen, foto, &amp; folder riset berbasis kecerdasan buatan.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="hidden sm:flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-2xl text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Model: EduMate Turbo v4</span>
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

      {/* Chat Container */}
      <div className="bg-[#0c142b] border border-slate-800 rounded-3xl h-[580px] flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Messages List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white' 
                  : 'bg-[#070b19] border border-cyan-500/40 text-cyan-400'
              }`}>
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div className={`max-w-lg rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#070b19] border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {/* Tampilan Lampiran jika ada */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-3 space-y-1.5">
                    {msg.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center space-x-2 bg-[#070b19]/60 border border-cyan-400/30 p-2 rounded-xl text-xs text-cyan-200"
                      >
                        {renderAttachmentIcon(att.type, 'w-4 h-4')}
                        <span className="font-medium truncate">{att.name}</span>
                        {att.fileCount && (
                          <span className="text-[10px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-300">
                            {att.fileCount} berkas
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {msg.text && <p className="whitespace-pre-line">{msg.text}</p>}
                <span className="block text-[10px] opacity-60 mt-1.5 text-right">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs bg-[#070b19] w-fit px-4 py-2 rounded-xl border border-slate-800">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>EduMate AI sedang menganalisis &amp; mengetik...</span>
            </div>
          )}
        </div>

        {/* Input Form Section */}
        <div className="bg-[#070b19]/90 border-t border-slate-800/80">
          {/* File/Folder/Foto Preview Bar sebelum dikirim */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 px-4 border-b border-slate-800/60 bg-[#0c142b]/60">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center space-x-2 bg-[#070b19] border border-cyan-500/40 text-slate-200 px-3 py-1.5 rounded-xl text-xs"
                >
                  {renderAttachmentIcon(att.type, 'w-3.5 h-3.5')}
                  <span className="font-medium max-w-[150px] truncate">{att.name}</span>
                  {att.fileCount && (
                    <span className="text-[10px] text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded">
                      {att.fileCount} file
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(att.id)}
                    className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Form Input Utama */}
          <form onSubmit={handleSend} className="p-4 flex items-center space-x-3 relative">
            {/* Hidden Input Elements */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
            />
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              multiple
              className="hidden"
              accept="image/*"
            />
            <input
              type="file"
              ref={folderInputRef}
              onChange={handleFolderChange}
              multiple
              className="hidden"
            />

            {/* Tombol Plus (+) & Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="p-3 rounded-2xl bg-[#0c142b] border border-slate-700/60 text-slate-300 hover:text-white hover:border-cyan-500 transition-all shrink-0 flex items-center justify-center"
                title="Tambah Lampiran"
              >
                <Plus className={`w-5 h-5 transition-transform duration-200 ${showMenu ? 'rotate-45 text-cyan-400' : ''}`} />
              </button>

              {/* Popover Menu Options */}
              {showMenu && (
                <div className="absolute bottom-14 left-0 bg-[#0c142b] border border-slate-700/80 rounded-2xl p-2 shadow-2xl space-y-1 z-30 w-52 animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-all text-left"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Upload Dokumen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-all text-left"
                  >
                    <ImageIcon className="w-4 h-4 text-cyan-400" />
                    <span>Upload Foto / Gambar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => folderInputRef.current?.click()}
                    className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-all text-left"
                  >
                    <Folder className="w-4 h-4 text-cyan-400" />
                    <span>Upload Folder</span>
                  </button>
                </div>
              )}
            </div>

            {/* Text Input */}
            <input
              type="text"
              placeholder="Tanyakan topik perkuliahan atau analisis dokumen, foto, &amp; folder..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#0c142b] border border-slate-700/60 rounded-2xl px-5 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
            />

            {/* Tombol Kirim */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white p-3 rounded-2xl transition-all shadow-lg shadow-cyan-950/50 shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}