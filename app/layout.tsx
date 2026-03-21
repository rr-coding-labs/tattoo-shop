import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yourlogoheretatoo.com';

export const viewport: Viewport = {
  themeColor: '#C07A2E',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Your Logo Here — Premium Tattoo Studio Scotland',
    template: '%s | Your Logo Here Tattoo',
  },
  description: 'Scotland\'s most exclusive tattoo studio. Fine line, realism, geometric and neo-traditional work by world-class artists. By appointment only.',
  keywords: ['tattoo studio', 'tattoo artist', 'fine line tattoo', 'realism tattoo', 'geometric tattoo', 'Scotland tattoo', 'Scotland tattoo', 'luxury tattoo'],
  authors: [{ name: 'Your Logo Here Tattoo' }],
  creator: 'Your Logo Here Tattoo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Your Logo Here Tattoo',
    title: 'Your Logo Here — Premium Tattoo Studio Scotland',
    description: 'Scotland\'s most exclusive tattoo studio. Fine line, realism, geometric and neo-traditional work by world-class artists.',
    images: [{ url: '/tattoo_gun.jpg', width: 1200, height: 630, alt: 'Your Logo Here Tattoo Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Logo Here — Premium Tattoo Studio Scotland',
    description: 'Scotland\'s most exclusive tattoo studio. Fine line, realism, geometric and neo-traditional work by world-class artists.',
    images: ['/tattoo_gun.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: BASE_URL },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'YLH Tattoo',
    startupImage: '/tattoo_gun.jpg',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/icon.svg',     type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Scroll-to-top on reload — runs synchronously before browser restores scroll position.
            Skipped on /sale so the user can reload mid-page there. */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            if (window.location.pathname !== '/sale') {
              if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
              window.scrollTo(0, 0);
            }
          })();
        `}} />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TattooParlor',
            name: 'Your Logo Here Tattoo',
            url: BASE_URL,
            image: `${BASE_URL}/tattoo_gun.jpg`,
            description: 'Premium tattoo studio in Scotland specialising in fine line, realism, and geometric tattooing.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Art District',
              addressLocality: 'Scotland',
              addressRegion: 'Scotland',
              addressCountry: 'GB',
            },
            openingHoursSpecification: [{
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '11:00',
              closes: '20:00',
            }],
            priceRange: '$$$',
          })}}
        />
      </body>
    </html>
  );
}
