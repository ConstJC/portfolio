import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import BFCacheGuard from "@/components/layout/BFCacheGuard"
import siteData from "@/store/site.json"
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
  title: "Jay Clark Anore — Full-Stack Developer & Designer",
  description:
    "Full Stack Developer crafting scalable web & mobile apps — from pixel-perfect frontends to robust APIs and real-time systems. Based in Cebu, PH.",
  keywords: [
    "Jay Clark Anore",
    "Jayclark Anore",
    "Full Stack Developer",
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Jay Clark Anore — Full-Stack Developer & Designer",
    description:
      "Full Stack Developer crafting scalable web & mobile apps. Based in Cebu, PH.",
    url: SITE_URL,
    siteName: "Jay Clark Anore",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Clark Anore — Full-Stack Developer & Designer",
    description: "Full Stack Developer crafting scalable web & mobile apps. Based in Cebu, PH.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A1020",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteData.name,
  alternateName: siteData.handle,
  jobTitle: siteData.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/images/pf-transparent.png`,
  email: `mailto:${siteData.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cebu City",
    addressCountry: "PH",
  },
  worksFor: {
    "@type": "Organization",
    name: siteData.currentEmployer,
  },
  sameAs: [
    siteData.socials.github,
    siteData.socials.linkedin,
    siteData.socials.facebook,
    siteData.socials.instagram,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Runs before React hydration: reload on back/forward so Framer Motion starts fresh */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=performance.navigation&&performance.navigation.type;if(t===2){window.location.reload();return;}var e=performance.getEntriesByType&&performance.getEntriesByType('navigation');if(e&&e.length&&e[0].type==='back_forward'){window.location.reload();}}catch(ex){}})();` }} />
        <BFCacheGuard />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
