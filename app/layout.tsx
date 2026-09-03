import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jakemorgan.dev'),
  title: 'Jake Morgan | Data Engineer',
  description: 'Jake Morgan is a data engineer specializing in SQL, Python, enterprise data platforms, automation, and data quality.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: 'https://jakemorgan.dev/', title: 'Jake Morgan | Data Engineer', description: 'Data engineer building dependable enterprise data systems and operational automation.', siteName: 'Jake Morgan' },
  twitter: { card: 'summary', title: 'Jake Morgan | Data Engineer', description: 'Data engineer building dependable enterprise data systems and operational automation.' },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#08111f' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
