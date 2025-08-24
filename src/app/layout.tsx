import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NavScope",
    default: "NavScope - Monitoramento Marítimo Inteligente",
  },
  description:
    "Plataforma profissional de monitoramento marítimo em tempo real com telemetria avançada e análise de embarcações",
  keywords: [
    "navscope",
    "maritimo",
    "monitoramento",
    "embarcações",
    "navegação",
    "telemetria",
    "oceano",
    "naval",
    "tempo real",
  ],
  authors: [{ name: "NavScope Technologies" }],
  creator: "NavScope Team",
  publisher: "NavScope Technologies",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#2563eb",
  colorScheme: "light",
  openGraph: {
    title: "Maritime Dashboard - Monitoramento Naval",
    description: "Sistema profissional de monitoramento marítimo em tempo real",
    type: "website",
    locale: "pt_BR",
    siteName: "Maritime Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maritime Dashboard - Monitoramento Naval",
    description: "Sistema profissional de monitoramento marítimo em tempo real",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
