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
    title: "VDS Tecnologia - AI Development & Tech Solutions",
    description: "Transform ideas into AI-powered technology solutions. Experts in agile development, cloud platforms, and artificial intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VDS Tecnologia - AI Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VDS Tecnologia - AI Development & Tech Solutions",
    description: "Transform ideas into AI-powered technology solutions",
    images: ["/og-image.png"],
  },
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

