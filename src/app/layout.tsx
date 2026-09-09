import type { Metadata } from "next";
import { Oswald, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "EsportFilter — News & Rankings for Every Esport",
  description: "News, rankings, and analytical coverage across every major esport — updated all day, every day.",
};

const GA_MEASUREMENT_ID = "G-C1THGLMGBF";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${oswald.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)] font-sans">
        {/* Google Analytics GA4 Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ThemeProvider>
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50 dark:opacity-100" />
          <Header />
          <main className="relative z-10 w-full flex-1">
            <div className="w-full max-w-[1920px] mx-auto flex justify-center items-start md:px-4 px-2 md:pt-4 pt-2 pb-8 gap-5 xl:gap-6">
              <div id="global-ad-left" className="hidden xl:block w-[160px] min-[1840px]:w-[300px] shrink-0 sticky top-4">
              </div>
              <div className="w-full max-w-[1160px] shrink min-w-0 bg-[var(--bg)] shadow-[0_0_40px_rgba(0,0,0,0.03)] border-x border-[var(--line)]">
                {children}
              </div>
              <div id="global-ad-right" className="hidden xl:block w-[160px] min-[1840px]:w-[300px] shrink-0 sticky top-4">
              </div>
            </div>
          </main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
