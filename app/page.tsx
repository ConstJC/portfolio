import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import Ways from "@/components/sections/Ways"
import Projects from "@/components/sections/Projects"
import Testimonials from "@/components/sections/Testimonials"
import Cta from "@/components/sections/Cta"
import { jsonLdScript, personJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(personJsonLd)} />
      <Hero />
      <div className="sep" />
      <Ways />
      <div className="sep" />
      <Projects
        limit={3}
        eyebrow="Selected Work"
        title="Featured Projects"
        showViewAll
      />
      <div className="sep" />
      <Testimonials />
      <div className="sep" />
      <Cta />
    </>
  )
}
