import type { Metadata } from 'next';
import './globals.css';
import './lattice.css';

// TODO: set to the real deployed origin so link previews (Twitter/WhatsApp) resolve /og.png.
const SITE_URL = 'https://lattice.fyi';

const TITLE = 'Lattice — An agentic workspace for your filesystem';
const DESC =
  'Search every file by name, contents, or meaning, then hand any of them to watson — an assistant that reads and reasons over what’s on your disk.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Lattice',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Lattice — an agentic workspace for your filesystem' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og.png'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..700;1,300..700&family=Google+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
