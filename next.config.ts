import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',                    // Jika frontend memanggil /api/...
        destination: 'http://localhost:8000/:path*', // Akan dilempar ke FastAPI backend lokal
      },
    ];
  },
};

export default nextConfig;