import type { Metadata } from "next"
import PageHeader from "@/components/sections/PageHeader"
import Ways from "@/components/sections/Ways"
import Services from "@/components/sections/Services"
import Faq from "@/components/sections/Faq"
import Cta from "@/components/sections/Cta"
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design and development, backend systems, mobile apps, AI automation, and security reviews — end-to-end product development from first sketch to production deploy.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Jay Clark Anore",
    description:
      "End-to-end product development: web, mobile, backend, AI automation, and security.",
    url: "/services",
    type: "website",
  },
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          faqJsonLd,
          breadcrumbJsonLd("Services", "/services")
        )}
      />
      <PageHeader
        eyebrow="What I Do"
        title="Services &"
        titleAccent="Solutions"
        description="End-to-end product development — web, mobile, backend, AI automation, and security. From first sketch to production deploy."
      />
      {/* PageHeader already supplies the top spacing */}
      <div className="[&>section]:pt-0">
        <Ways />
      </div>
      <div className="sep" />
      <Services />
      <div className="sep" />
      <Faq />
      <div className="sep" />
      <Cta />
    </>
  )
}
