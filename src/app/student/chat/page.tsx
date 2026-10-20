'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Paperclip, Bot, User, FileText, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  file_path?: string | null;
}

export default function TanyaAIPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [promptInput, setPromptInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; token=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return localStorage.getItem('token');
  };

  const fetchHistory = async () => {
    const token = getAuthToken();
    if (!token) {
      alert('Sesi login telah habis. Silakan login ulang.');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/student/chat/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert('Sesi login telah habis. Silakan login ulang.');
        router.push('/login');
        return;
      }

      if (res.ok) {
        const result = await res.json();
        const historyItems = Array.isArray(result.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : [];

        const formattedMessages: ChatMessage[] = [];

        if (historyItems.length === 0) {
          formattedMessages.push({
            id: 'welcome-1',
            sender: 'ai',
            text: 'Halo! Saya EduMate AI. Ada proposal, ide proyek, atau pertanyaan seputar lomba TIK yang bisa saya bantu hari ini?',
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          });
        } else {
          historyItems.forEach((chat: any) => {
            const chatTime = chat.created_at
              ? new Date(chat.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
              : '';

            formattedMessages.push({
              id: `user-${chat.id}`,
              sender: 'user',
              text: chat.prompt,
              time: chatTime,
              file_path: chat.file_path,
            });

            formattedMessages.push({
              id: `ai-${chat.id}`,
              sender: 'ai',
              text: chat.response,
              time: chatTime,
            });
          });
        }

        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Gagal mengambil riwayat chat:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() && !selectedFile) return;

    const token = getAuthToken();
    if (!token) {
      alert('Sesi login telah habis. Silakan login ulang.');
      router.push('/login');
      return;
    }

    const userTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `temp-user-${Date.now()}`;
    const userText = promptInput;

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text: userText,
        time: userTime,
        file_path: selectedFile ? selectedFile.name : null,
      },
    ]);

    setPromptInput('');
    setLoading(true);

    const formData = new FormData();
    formData.append('prompt', userText);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const res = await fetch('http://localhost:8000/student/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        alert('Sesi login telah habis. Silakan login ulang.');
        router.push('/login');
        return;
      }

      if (res.ok) {
        const result = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${result.id}`,
            sender: 'ai',
            text: result.response,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setSelectedFile(null);
      } else {
        alert('Gagal mendapatkan respon dari EduMate AI.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-[#070b19] border border-slate-800 rounded-3xl mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
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
              className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#0c142b] border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              {msg.file_path && (
                <div className="mt-2 text-xs text-cyan-300 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{msg.file_path.split('/').pop()}</span>
                </div>
              )}
              <span className="block text-[10px] opacity-60 mt-1 text-right">{msg.time}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-cyan-400 text-xs p-3 bg-[#0c142b] border border-slate-800 rounded-2xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>EduMate AI sedang menganalisis dokumen & merumuskan jawaban...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {selectedFile && (
          <div className="text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 p-2 rounded-xl flex items-center justify-between w-fit">
            <span>📄 Berkas dipilih: {selectedFile.name}</span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="ml-2 text-rose-400 hover:underline"
            >
              Batal
            </button>
          </div>
        )}

        <div className="flex items-center space-x-2 bg-[#0c142b] border border-slate-800 p-2 rounded-2xl">
          <label className="cursor-pointer p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-cyan-400">
            <Paperclip className="w-5 h-5" />
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setSelectedFile(e.target.files[0])}
            />
          </label>

          <input
            type="text"
            placeholder="Tanyakan topik perkuliahan atau analisis dokumen, foto, & folder..."
            className="flex-1 bg-transparent text-white text-sm focus:outline-none px-2"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}