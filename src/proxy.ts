import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decodedPayload = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8')
    );
    return decodedPayload.role || null;
  } catch {
    return null;
  }
}

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. PENGECUALIAN / BYPASS: 
  // Jangan proses proxy untuk halaman login, register, file statis, atau API auth
  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // untuk file favicon.ico, gambar, dll
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('access_token')?.value;

  console.log('==============================');
  console.log('PROXY BERJALAN:', pathname);
  console.log('ADA TOKEN:', !!token);

  // Jika belum login (tidak ada token sama sekali)
  if (!token) {
    console.log('STATUS: BELUM LOGIN -> REDIRECT KE LOGIN');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = getRoleFromToken(token);
  console.log('ROLE:', role);

  // Jika token ada, tapi role tidak ditemukan atau rusak di dalam token
  if (!role) {
    console.log('STATUS: TOKEN/ROLE TIDAK VALID -> HAPUS COOKIE & KE LOGIN');
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');
    return response;
  }

  // --- PROTEKSI ADMIN ---
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      console.log('AKSES DITOLAK: BUKAN ADMIN');
      return redirectToDashboard(role, request);
    }
  }

  // --- PROTEKSI DOSEN ---
  if (pathname.startsWith('/dosen')) {
    if (role !== 'dosen' && role !== 'admin') {
      console.log('AKSES DITOLAK: BUKAN DOSEN');
      return redirectToDashboard(role, request);
    }
  }

  // --- PROTEKSI MAHASISWA ---
  if (pathname.startsWith('/student')) {
    if (role !== 'mahasiswa' && role !== 'admin') {
      console.log('AKSES DITOLAK: BUKAN MAHASISWA');
      return redirectToDashboard(role, request);
    }
  }

  console.log('AKSES DIIZINKAN');
  return NextResponse.next();
}

function redirectToDashboard(role: string, request: NextRequest) {
  if (role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  if (role === 'dosen') {
    return NextResponse.redirect(new URL('/dosen/dashboard', request.url));
  }
  if (role === 'mahasiswa') {
    return NextResponse.redirect(new URL('/student/courses', request.url));
  }
  
  // PERBAIKAN UTAMA: Jika role sama sekali tidak dikenal, hapus cookie dan paksa ke login!
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.delete('access_token');
  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dosen/:path*',
    '/student/:path*',
  ],
};