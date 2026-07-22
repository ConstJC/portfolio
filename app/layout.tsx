import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import BFCacheGuard from "@/components/layout/BFCacheGuard"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jay Clark Anore — Full-Stack Developer & Designer",
  description:
    "Full Stack Developer crafting scalable web & mobile apps — from pixel-perfect frontends to robust APIs and real-time systems. Based in Cebu, PH.",
  keywords: ["Full Stack Developer", "Next.js", "NestJS", "Flutter", "Cebu", "Philippines", "Freelance"],
  authors: [{ name: "Jay Clark Anore" }],
  openGraph: {
    title: "Jay Clark Anore — Full-Stack Developer & Designer",
    description:
      "Full Stack Developer crafting scalable web & mobile apps. Based in Cebu, PH.",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Clark Anore — Full-Stack Developer & Designer",
    description: "Full Stack Developer crafting scalable web & mobile apps. Based in Cebu, PH.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" className={plusJakarta.variable}>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        {/* Runs before React hydration: reload on back/forward so Framer Motion starts fresh */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=performance.navigation&&performance.navigation.type;if(t===2){window.location.reload();return;}var e=performance.getEntriesByType&&performance.getEntriesByType('navigation');if(e&&e.length&&e[0].type==='back_forward'){window.location.reload();}}catch(ex){}})();` }} />
        <BFCacheGuard />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
