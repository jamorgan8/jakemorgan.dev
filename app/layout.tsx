import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jakemorgan.dev'),
  title: 'Jake Morgan | Data Engineer',
  description: 'Jake Morgan is a Nashville-based data engineer and technical leader specializing in enterprise data platforms, automation, data quality, and agentic development.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: 'https://jakemorgan.dev/', title: 'Jake Morgan | Data Engineer', description: 'Nashville-based data engineer and technical leader building dependable enterprise data systems and automation.', siteName: 'Jake Morgan' },
  twitter: { card: 'summary', title: 'Jake Morgan | Data Engineer', description: 'Nashville-based data engineer and technical leader building dependable enterprise data systems and automation.' },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#08111f' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
