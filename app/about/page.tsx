import type { Metadata } from "next"
import AboutHero from "@/components/sections/AboutHero"
import AboutSummary from "@/components/sections/AboutSummary"
import Skills from "@/components/sections/Skills"
import ExperienceEducation from "@/components/sections/ExperienceEducation"
import Certificates from "@/components/sections/Certificates"
import Learning from "@/components/sections/Learning"
import { aboutPersonJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Full-Stack Developer, Mobile Engineer, and Application Security Specialist based in Cebu, PH. Skills, career history, education, certificates, and what I'm currently learning.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Jay Clark Anore",
    description:
      "Skills, career history, education, certificates, and current learning of a Cebu-based full-stack developer.",
    url: "/about",
    type: "profile",
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          aboutPersonJsonLd,
          breadcrumbJsonLd("About Me", "/about")
        )}
      />
      <AboutHero />
      <div className="sep" />
      <AboutSummary />
      <div className="sep" />
      <Skills />
      <div className="sep" />
      <ExperienceEducation />
      <div className="sep" />
      <Certificates />
      <div className="sep" />
      <Learning />
    </>
  )
}
