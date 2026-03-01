import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://roulette.4kdrivewalk.com"),
  title: "Global Random Roulette - Wheel of Names",
  description: "A fun, interactive wheel of names to make global, random decisions easily. Perfect for events, parties, and classrooms.",
  keywords: ["random roulette", "wheel of names", "ruleta aleatoria", "랜덤 룰렛", "이름 뽑기"],
  verification: {
    google: "47z3uMVzsCyw66vTGaSLLtCKy3vebHH5QOU4H3yCDR8",
    other: {
      "naver-site-verification": "5ff20dbd9471cf70b9281a5a10fa7c47b0ac99c0",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'lang' attribute is updated dynamically by LanguageProvider on the client
    <html lang="en">
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3844FCWG6G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3844FCWG6G');
          `}
        </Script>
        {/* Google AdSense 자동 광고 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3488637908196788"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
