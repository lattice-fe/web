import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export so it can be served by GitHub Pages (no Node runtime).
  output: 'export',
  images: { unoptimized: true },
  // For project pages (user.github.io/<repo>) set NEXT_PUBLIC_BASE_PATH=/<repo>.
  // Leave empty for a custom domain or a user/org root site.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  devIndicators: false,
  // Next 16 blocks /_next/* dev assets from non-localhost origins, which breaks
  // hydration when tunneling (ngrok) or hitting the LAN IP from a phone/iPad.
  allowedDevOrigins: [
    '*.ngrok-free.app', '*.ngrok-free.dev', '*.ngrok.io', '*.ngrok.app',
    '*.trycloudflare.com', '*.loca.lt',
    // LAN IPs (change per network/DHCP — add yours if hitting the site directly by IP)
    '10.161.46.196', '172.29.16.1',
  ],
};

export default nextConfig;
