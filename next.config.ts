import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8080", pathname: "/uploads/**" },
      // Cuando tengas prod, agregá tu dominio y puerto si corresponde
      // { protocol: "https", hostname: "tu-dominio.com", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
