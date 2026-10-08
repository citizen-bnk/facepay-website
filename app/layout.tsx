import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'FACEPAY | One Identity. Many Ways to Pay.', template: '%s | FACEPAY' },
  description:
    'FACEPAY is an integration platform connecting people, merchants, software and hardware across payment ecosystems. Face Your Money.',
  applicationName: 'FACEPAY',
  keywords: ['FACEPAY', 'face payments', 'biometric payments', 'South Africa', 'POS', 'payment integration'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'FACEPAY',
    locale: 'en_ZA',
    title: 'FACEPAY | One Identity. Many Ways to Pay.',
    description: 'An integration platform connecting people, merchants, software and hardware across payment ecosystems.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'FACEPAY - Face Your Money' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: { icon: [{ url: '/favicon.png', sizes: '48x48' }, { url: '/icon-192.png', sizes: '192x192' }], apple: '/icon-180.png' },
};
export const viewport: Viewport = { themeColor: '#081020', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
