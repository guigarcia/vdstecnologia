import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "VDS Tecnologia - AI Development & Tech Solutions | Desenvolvimento com IA",
  description: "Transform ideas into AI-powered technology solutions. Experts in agile development, cloud platforms, and artificial intelligence. | Transforme ideias em soluções tecnológicas com IA.",
  keywords: ["AI development", "artificial intelligence", "cloud computing", "AWS", "Azure", "GCP", "Snowflake", "machine learning", "desenvolvimento IA", "inteligência artificial", "soluções cloud"],
  authors: [{ name: "VDS Tecnologia" }],
  creator: "VDS Tecnologia",
  publisher: "VDS Tecnologia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: "https://vdstecnologia.com",
    siteName: "VDS Tecnologia",
    title: "VDS Tecnologia - Value-Driven Solutions",
    description: "Transformamos ideias em soluções tecnológicas com IA. Desenvolvimento acelerado com até 70% de redução no tempo de entrega.",
    images: [
      {
        url: "https://vdstecnologia.com/logos/vds_thumb_400_hacker_tagline.png",
        width: 400,
        height: 400,
        alt: "VDS Tecnologia - Value-Driven Solutions",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "VDS Tecnologia - Value-Driven Solutions",
    description: "Transformamos ideias em soluções tecnológicas com IA",
    images: ["https://vdstecnologia.com/logos/vds_thumb_400_hacker_tagline.png"],
  },
  metadataBase: new URL('https://vdstecnologia.com'),
  alternates: {
    canonical: "https://vdstecnologia.com",
    languages: {
      'pt-BR': 'https://vdstecnologia.com',
      'en-US': 'https://vdstecnologia.com/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Console message for curious developers
  if (typeof window !== 'undefined') {
    console.log('%c🚀 VDS Tecnologia', 'color: #ff6b00; font-size: 24px; font-weight: bold;');
    console.log('%cValue-Driven Solutions', 'color: #00d4ff; font-size: 16px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b00;');
    console.log('%c👋 Hello, curious developer!', 'color: #00ff88; font-size: 14px;');
    console.log('%c', '');
    console.log('%c🛠️ Tech Stack:', 'color: #00d4ff; font-weight: bold;');
    console.log('%c  • Next.js 15 + TypeScript', 'color: #ffffff;');
    console.log('%c  • React 19', 'color: #ffffff;');
    console.log('%c  • Pure CSS (no frameworks)', 'color: #ffffff;');
    console.log('%c  • Built with AI assistance', 'color: #ffffff;');
    console.log('%c', '');
    console.log('%c💡 Interactive Features:', 'color: #ffdd00; font-weight: bold;');
    console.log('%c  • Contact Terminal with commands (type "help")', 'color: #ffffff;');
    console.log('%c  • Keyboard shortcuts (Ctrl+Shift+K)', 'color: #ffffff;');
    console.log('%c  • Check /humans.txt for more info', 'color: #ffffff;');
    console.log('%c', '');
    console.log('%c📬 Let\'s work together:', 'color: #ff6b00; font-weight: bold;');
    console.log('%c  contato@vdstecnologia.com.br', 'color: #00ff88;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b00;');
  }
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

