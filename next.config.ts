import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las imágenes de /public no pasan por el optimizador: se cachean a mano.
  // (Antes vivía en vercel.json; ahora el framework lo declara.)
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
