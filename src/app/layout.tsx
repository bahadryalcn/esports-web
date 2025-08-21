import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Providers from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIM Agency - E-spor Ajansı',
  description: 'E-spor dünyasında öncü ajans. Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi.',
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.ico',
    apple: '/assets/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-gaming-dark text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}