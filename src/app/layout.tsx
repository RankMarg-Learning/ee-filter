import type { Metadata } from "next";
import { Oswald, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

import fallbackNav from "@/data/ef_header.json";

// Fallback data in case the fetch fails
const FALLBACK_NAV = fallbackNav;

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData: any = FALLBACK_NAV;
  try {
    const res = await fetch("https://api.jsonbin.io/v3/b/6ab2b8e3ffd5d1605323be40/latest", {
      cache: "force-cache",
      next: { tags: ["header-config"] }, // Revalidate on-demand via API
    });
    if (res.ok) {
      const data = await res.json();
      headerData = data.record || data;
    }
  } catch (error) {
    console.error("Failed to fetch header config:", error);
  }

  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${oswald.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('ef_theme') === 'dark' || (!('ef_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
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
          <Header
            mainNavItems={headerData.mainNavItems}
            categoryNavItems={headerData.categoryNavItems}
          />
          <main className="relative z-10 w-full flex-1">
            <div className="w-full max-w-[1920px] mx-auto flex justify-center items-start md:px-4 px-2 md:pt-4 pt-2 pb-8 gap-5 xl:gap-6">
              <div id="global-ad-left" className="hidden xl:block w-[160px] min-[1840px]:w-[300px] shrink-0 sticky top-4">
              </div>
              <div className="w-full max-w-[1160px] shrink min-w-0 bg-[var(--bg)] ">
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
