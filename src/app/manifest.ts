import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sundar Raj Kempe - AI Portfolio',
    short_name: 'Sundar AI Portfolio',
    description: 'Production-grade AI-powered portfolio website for Sundar Raj Kempe (AI/ML Engineer & Java Developer)',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F19',
    theme_color: '#00F0FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
