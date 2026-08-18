import about from "@/store/about.json"
import services from "@/store/services.json"
import projects from "@/store/projects.json"
import experience from "@/store/experience.json"
import skills from "@/store/skills.json"
import faq from "@/store/faq.json"
import testimonials from "@/store/testimonials.json"

function formatFaq(): string {
  const lines = faq.map((item) => `Q: ${item.question}\nA: ${item.answer}`)
  return ["## FAQ", ...lines].join("\n\n")
}

function formatAbout(): string {
  const { hero, summary } = about
  const cards = summary.cards.map((card) => `- ${card.title}: ${card.description}`)
  return ["## About", hero.role, hero.intro, summary.lede, ...cards].join("\n")
}

function formatServices(): string {
  const lines = services.map((service) => `- ${service.title}: ${service.description}`)
  return ["## Services", ...lines].join("\n")
}

function formatProjects(): string {
  const lines = projects.map((project) => {
    const techs = project.techs.join(", ")
    return `- ${project.title} (${project.badge}): ${project.description} [Tech: ${techs}]`
  })
  return ["## Projects", ...lines].join("\n")
}

function formatExperience(): string {
  const lines = experience.map((entry) => `- ${entry.role} at ${entry.org} (${entry.period}): ${entry.description}`)
  return ["## Experience", ...lines].join("\n")
}

function formatSkills(): string {
  const lines = skills.map((group) => `- ${group.category}: ${group.tools.join(", ")}`)
  return ["## Skills", ...lines].join("\n")
}

function formatTestimonials(): string {
  const lines = testimonials.map((t) => `- "${t.quote}" — ${t.name}, ${t.role}`)
  return ["## Testimonials", ...lines].join("\n")
}

// Server-only — call from app/api/chat/route.ts, never from a client component.
export function buildSiteContext(): string {
  return [
    formatFaq(),
    formatAbout(),
    formatServices(),
    formatProjects(),
    formatExperience(),
    formatSkills(),
    formatTestimonials(),
  ].join("\n\n")
}
