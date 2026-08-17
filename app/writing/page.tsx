import type { Metadata } from "next"
import PageHeader from "@/components/sections/PageHeader"
import Writing from "@/components/sections/Writing"
import Cta from "@/components/sections/Cta"
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld"
import writingData from "@/store/writing.json"

const { intro } = writingData

export const metadata: Metadata = {
  title: "Writing",
  description: intro.description,
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing — Jay Clark Anore",
    description: intro.description,
    url: "/writing",
    type: "website",
  },
}

export default function WritingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd("Writing", "/writing"))}
      />
      <PageHeader
        eyebrow={intro.eyebrow}
        title={intro.title}
        titleAccent={intro.titleAccent}
        description={intro.description}
      />
      {/* PageHeader already supplies the top spacing */}
      <div className="[&>section]:pt-0">
        <Writing />
      </div>
      <div className="sep" />
      <Cta />
    </>
  )
}
