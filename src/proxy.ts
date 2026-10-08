import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split('.');

    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];

    const decodedPayload = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8')
    );

    return decodedPayload.role || null;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get('access_token')?.value;

  console.log('==============================');
  console.log('PROXY BERJALAN:', pathname);
  console.log('ADA TOKEN:', !!token);

  // Belum login
  if (!token) {
    console.log('STATUS: BELUM LOGIN');

    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  const role = getRoleFromToken(token);

  console.log('ROLE:', role);

  // Token tidak valid / role tidak ditemukan
  if (!role) {
    console.log('STATUS: TOKEN TIDAK VALID');

    const response = NextResponse.redirect(
      new URL('/login', request.url)
    );

    response.cookies.delete('access_token');

    return response;
  }

  /*
   * ==========================
   * PROTEKSI ADMIN
   * ==========================
   */

  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      console.log('AKSES DITOLAK: BUKAN ADMIN');

      return redirectToDashboard(
        role,
        request
      );
    }
  }

  /*
   * ==========================
   * PROTEKSI DOSEN
   * ==========================
   */

  if (pathname.startsWith('/dosen')) {
    if (role !== 'dosen') {
      console.log('AKSES DITOLAK: BUKAN DOSEN');

      return redirectToDashboard(
        role,
        request
      );
    }
  }

  /*
   * ==========================
   * PROTEKSI MAHASISWA
   * ==========================
   */

  if (pathname.startsWith('/student')) {
    if (role !== 'mahasiswa') {
      console.log('AKSES DITOLAK: BUKAN MAHASISWA');

      return redirectToDashboard(
        role,
        request
      );
    }
  }

  console.log('AKSES DIIZINKAN');

  return NextResponse.next();
}


function redirectToDashboard(
  role: string,
  request: NextRequest
) {
  if (role === 'admin') {
    return NextResponse.redirect(
      new URL('/admin/dashboard', request.url)
    );
  }

  if (role === 'dosen') {
    return NextResponse.redirect(
      new URL('/dosen/dashboard', request.url)
    );
  }

  if (role === 'mahasiswa') {
    return NextResponse.redirect(
      new URL('/student/courses', request.url)
    );
  }

  return NextResponse.redirect(
    new URL('/login', request.url)
  );
}


export const config = {
  matcher: [
    '/admin/:path*',
    '/dosen/:path*',
    '/student/:path*',
  ],
};