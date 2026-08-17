import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import BFCacheGuard from "@/components/layout/BFCacheGuard"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingActions from "@/components/layout/FloatingActions"
import { SITE_URL } from "@/lib/seo"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jay Clark Anore — Software Engineer Building Business Systems",
    template: "%s — Jay Clark Anore",
  },
  description:
    "Software engineer building backend systems and business software for operationally complex companies — bookings, marketplaces, multi-role platforms. Based in Cebu, PH.",
  keywords: [
    "Jay Clark Anore",
    "Jayclark Anore",
    "Software Engineer",
    "Backend Architecture",
    "Business Systems",
    "Next.js",
    "NestJS",
    ".NET CORE",
    "React Native",
    "Flutter",
    "Cebu",
    "Philippines",
  ],
  authors: [{ name: "Jay Clark Anore", url: SITE_URL }],
  creator: "Jay Clark Anore",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Jay Clark Anore — Software Engineer Building Business Systems",
    description:
      "Software engineer building backend systems and business software for operationally complex companies. Based in Cebu, PH.",
    url: SITE_URL,
    siteName: "Jay Clark Anore",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Clark Anore — Software Engineer Building Business Systems",
    description:
      "Software engineer building backend systems and business software for operationally complex companies. Based in Cebu, PH.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A1020",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        {/* Runs before React hydration: reload on back/forward so Framer Motion starts fresh */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=performance.navigation&&performance.navigation.type;if(t===2){window.location.reload();return;}var e=performance.getEntriesByType&&performance.getEntriesByType('navigation');if(e&&e.length&&e[0].type==='back_forward'){window.location.reload();}}catch(ex){}})();` }} />
        <BFCacheGuard />

        {/* Shared chrome — lives in the layout so it survives client-side route
            transitions (theme state included) instead of remounting per page. */}
        <div className="page">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </div>
      </body>
    </html>
  )
}
