import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mom Hustle Tees - Start Your T-Shirt Business From Home",
  description:
    "The complete guide for stay-at-home moms who want to start a profitable T-shirt business. Step-by-step tutorials, viral design ideas, and TikTok strategies. Get instant access for $37.",
  keywords: [
    "stay at home mom business",
    "t-shirt business from home",
    "mom side hustle",
    "Cricut business ideas",
    "work from home mom",
  ],
  openGraph: {
    title: "Mom Hustle Tees - Start Your T-Shirt Business From Home",
    description:
      "Turn your creativity into cash from home. Complete guide for stay-at-home moms.",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mom Hustle Tees - Start Your T-Shirt Business From Home",
    description:
      "Turn your creativity into cash from home. Complete guide for stay-at-home moms.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
