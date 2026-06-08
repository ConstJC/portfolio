export interface SiteConfig {
  name: string
  handle: string
  initials: string
  tagline: string
  location: string
  locationFlag: string
  email: string
  availableForFreelance: boolean
  currentEmployer: string
  resumeUrl: string
  bookingUrl: string
  socials: Record<string, string>
}

export interface NavLink {
  label: string
  href: string
  dropdown?: NavDropdownItem[]
}

export interface NavDropdownItem {
  label: string
  description: string
  href: string
}

export interface WayCard {
  icon: string
  tag: string
  title: string
  description: string
}

export interface Stat {
  label: string
  value: string
  description: string
}

export interface Step {
  number: number
  eyebrow: string
  title: string
  description: string
}

export interface Project {
  id: string
  emoji: string
  badge: string
  title: string
  description: string
  techs: string[]
  caseStudyUrl: string
  thumbVariant: string
}

export interface Experience {
  id: string
  emoji: string
  role: string
  org: string
  location: string
  period: string
  description: string
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
}

export interface Testimonial {
  id: string
  quote: string
  initials: string
  name: string
  role: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  defaultOpen?: boolean
}
