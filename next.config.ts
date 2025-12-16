import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removendo output standalone para compatibilidade com Railway
  // Railway gerencia o servidor automaticamente
  reactStrictMode: true,
};

export default nextConfig;

