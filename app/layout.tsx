
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FavoritesProvider } from '@/lib/FavoritesContext';
import { AdPopup } from '@/components/AdPopup';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['anime', 'streaming', 'catalogue', 'manga', 'animé'],
  other: {
    monetag: '93ae72e3a45856c0692ffec27b3c796f',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <FavoritesProvider>
            <Header />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
            <AdPopup />
          </FavoritesProvider>
        </ThemeProvider>

        {/* Publicité Monetag */}
        <Script
          id="monetag-vignette"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='12257819';
                s.src='https://n6wxm.com/vignette.min.js';
              })(document.body.appendChild(document.createElement('script')));
            `,
          }}
        />

        {/* Deuxième publicité */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="309856"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}
