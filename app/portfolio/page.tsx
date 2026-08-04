import type { Metadata } from "next"
import PageHeader from "@/components/sections/PageHeader"
import Projects from "@/components/sections/Projects"
import Cta from "@/components/sections/Cta"
import { breadcrumbJsonLd, jsonLdScript, portfolioJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Jay Clark Anore — queueing systems, EMR and clinic platforms, and cross-platform rental management built with Next.js, NestJS, C# .NET, and React Native.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Jay Clark Anore",
    description:
      "Production web and mobile projects built with Next.js, NestJS, C# .NET, and React Native.",
    url: "/portfolio",
    type: "website",
  },
}

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          portfolioJsonLd,
          breadcrumbJsonLd("Portfolio", "/portfolio")
        )}
      />
      <PageHeader
        eyebrow="Portfolio"
        title="My"
        titleAccent="Works"
        description="Production systems I have designed, built, and shipped — from real-time queueing to healthcare records and rental management."
      />
      {/* PageHeader already supplies the top spacing */}
      <div className="[&>section]:pt-0">
        <Projects showHeader={false} />
      </div>
      <div className="sep" />
      <Cta />
    </>
  )
}
