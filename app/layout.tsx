import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import '../src/index.css';
import { SITE_DEFAULTS } from '../src/lib/metadata';
import { getOrganizationSchema } from '../src/lib/schema';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import WhatsAppFloatingButton from '../src/components/WhatsAppFloatingButton';
import StickyMobileCTA from '../src/components/StickyMobileCTA';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: SITE_DEFAULTS.title,
    template: '%s | Brightmenti'
  },
  description: SITE_DEFAULTS.description,
  metadataBase: new URL(SITE_DEFAULTS.canonical),
  openGraph: {
    title: SITE_DEFAULTS.title,
    description: SITE_DEFAULTS.description,
    url: SITE_DEFAULTS.canonical,
    siteName: 'Brightmenti',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_DEFAULTS.title,
    description: SITE_DEFAULTS.description
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = getOrganizationSchema();

  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#F5F5F4] antialiased selection:bg-[#5B7FFF] selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
