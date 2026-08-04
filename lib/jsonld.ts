import { SITE_URL } from "@/lib/seo"
import siteData from "@/store/site.json"
import faqData from "@/store/faq.json"
import projectsData from "@/store/projects.json"
import experienceData from "@/store/experience.json"
import educationData from "@/store/education.json"

/**
 * Structured data builders. The store/*.json content is already shaped like
 * schema.org entities, so each route can emit rich results almost for free.
 */

export const personJsonLd = {
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

/** /about — Person enriched with the real career and education history. */
export const aboutPersonJsonLd = {
  ...personJsonLd,
  mainEntityOfPage: `${SITE_URL}/about`,
  alumniOf: educationData.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.org,
  })),
  hasOccupation: experienceData.map((exp) => ({
    "@type": "Occupation",
    name: exp.role,
    occupationLocation: { "@type": "Place", name: exp.location },
  })),
}

/** /services — every Q&A in store/faq.json, eligible for FAQ rich results. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

/** /portfolio — the works list as an ItemList of CreativeWork entries. */
export const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Projects by ${siteData.name}`,
  url: `${SITE_URL}/portfolio`,
  numberOfItems: projectsData.length,
  itemListElement: projectsData.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      keywords: project.techs.join(", "),
      author: { "@type": "Person", name: siteData.name },
      ...(project.liveUrl && project.liveUrl !== "#" ? { url: project.liveUrl } : {}),
    },
  })),
}

export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  }
}

/** Renders one or more schema objects into a single script tag payload. */
export function jsonLdScript(...schemas: object[]) {
  return {
    __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
  }
}
