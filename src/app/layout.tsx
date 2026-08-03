import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CmsProvider } from '@/context/CmsContext';
import { AchievementProvider } from '@/context/AchievementContext';
import { I18nProvider } from '@/context/I18nContext';
import { AuroraBackground } from '@/components/shared/AuroraBackground';
import { LenisScroll } from '@/components/shared/LenisScroll';
import { ShellLayout } from '@/components/layout/ShellLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Sundar Raj Kempe | AI/ML Engineer & Java Full-Stack Developer',
  description: 'Production-grade AI-powered portfolio website for Sundar Raj Kempe (B.E. CS VTU GEC Bidar, KodNest Trainee, Azure AI & Cisco Certified). Built with Next.js 15 & client-side AI tools.',
  keywords: [
    'Sundar Raj Kempe',
    'AI ML Engineer',
    'Java Full Stack Developer',
    'GEC Bidar VTU',
    'KodNest Bengaluru',
    'FastAPI Python',
    'CyberGuard AI',
    'DormX SaaS',
  ],
  authors: [{ name: 'Sundar Raj Kempe' }],
  openGraph: {
    title: 'Sundar Raj Kempe | AI & Full-Stack Engineer Portfolio',
    description: 'Production-grade AI portfolio featuring CyberGuard AI, DormX SaaS, ATS Resume Builder, and Client AI Copilot.',
    type: 'website',
    url: 'https://sundar-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sundar Raj Kempe | AI & Full-Stack Developer',
    description: 'Explore AI Malicious URL Detection, Student Housing SaaS, and ATS Resume Builder.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sundar Raj Kempe',
    jobTitle: 'AI / ML Engineer & Java Full-Stack Developer',
    alumniOf: 'Government Engineering College, Bidar (VTU)',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'FastAPI',
      'Java Enterprise',
      'React',
      'Next.js',
      'Cybersecurity',
    ],
    email: 'sundarkempe86@gmail.com',
    sameAs: [
      'https://github.com/sundarkempe86-jpg',
      'https://linkedin.com/in/sundar-kempe-8ab618378',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-cyber-dark text-slate-100 antialiased selection:bg-cyber-cyan selection:text-black">
        <CmsProvider>
          <AchievementProvider>
            <I18nProvider>
              <LenisScroll>
                <AuroraBackground>
                  <ShellLayout>{children}</ShellLayout>
                </AuroraBackground>
              </LenisScroll>
            </I18nProvider>
          </AchievementProvider>
        </CmsProvider>
      </body>
    </html>
  );
}
