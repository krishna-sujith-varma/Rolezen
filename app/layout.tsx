import type { Metadata } from 'next';
import './globals.css';
import { SITE_METADATA } from '@/constants/metadata';
import { ThemeProvider } from '@/theme/theme-provider';

export const metadata: Metadata = {
  title: `${SITE_METADATA.title} – Forbes' Top Pick Alternative. Trusted by Thousands`,
  description: 'Build ATS-proof resumes that get callbacks. Real-time ATS keyword matching, recruiter-approved templates, and AI copilot in minutes.',
  keywords: ['Resume Builder', 'ATS Resume Analyzer', 'AI Resume Optimizer', 'Rolezen', 'CV Creator', 'Rezi Alternative'],
  authors: [{ name: 'Rolezen Technologies Inc.' }],
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.siteUrl,
    siteName: 'Rolezen',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    creator: SITE_METADATA.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Rolezen',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: SITE_METADATA.description,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[#DCFCE7] selection:text-[#16A34A] bg-white dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
