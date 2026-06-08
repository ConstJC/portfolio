"use client"

import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import heroData from "@/store/hero.json"
import siteData from "@/store/site.json"

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socialLinks = [
  { href: siteData.socials.github,   icon: <GithubIcon />,   label: "GitHub"   },
  { href: siteData.socials.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
]

const socialIconClass = [
  "w-8 h-8 rounded-lg bg-card border border-border2 flex items-center justify-center",
  "text-text2 no-underline transition-[border-color,color,background] duration-[180ms]",
  "hover:border-primary-border hover:bg-primary-light hover:text-primary",
].join(" ")

export default function Hero() {
  return (
    <div className="relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_65%)] pointer-events-none z-0" />

      {/* Hero grid */}
      <div className="grid grid-cols-2 gap-10 lg:gap-16 min-h-svh max-w-[1160px] mx-auto pt-[calc(64px+72px)] px-4 sm:px-6 pb-[72px] items-center relative z-[1] max-lg:grid-cols-1 max-lg:min-h-0 max-sm:pt-[calc(64px+36px)] max-sm:pb-12">

        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 py-[5px] pr-[14px] pl-2 bg-card border border-border2 rounded-full text-[0.78rem] font-semibold text-text2 mb-[22px]"
          >
            <span className="flex items-center gap-1.5 rounded-full py-[2px] px-2 text-[0.7rem] font-bold" style={{ background: "var(--success-light)", border: "1px solid var(--success-border)", color: "var(--success)" }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--success)", animation: "pulse-dot 1.6s infinite" }}
              />
              Available
            </span>
            <span>{heroData.pill.icon}</span>
            {heroData.pill.highlight}
          </motion.div>

          {/* Role tag */}
          <div className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-primary mb-3.5">
            {heroData.role}
          </div>

          {/* H1 */}
          <h1 className="text-[clamp(2rem,7vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-text mb-[22px]">
            {heroData.headline}
            <br />
            <span className="text-primary">{heroData.headlineAccent}</span>
          </h1>

          {/* Description */}
          <p
            className="text-[0.95rem] text-text2 leading-[1.75] max-w-[460px] mb-4"
            dangerouslySetInnerHTML={{ __html: heroData.description }}
          />

          {/* Tech stack chips */}
          <div className="flex gap-[7px] flex-wrap mb-8">
            {heroData.techStack.map((tech) => (
              <span
                key={tech}
                className="py-1 px-[11px] bg-card border border-border2 rounded-[6px] text-[0.72rem] font-bold text-text2 tracking-[0.01em]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 flex-wrap mb-7">
            <a href={heroData.cta.primary.href} className="btn-primary-lg">
              {heroData.cta.primary.label}
              <ArrowRight size={16} />
            </a>
            <a href={heroData.cta.secondary.href} className="btn-ghost-lg">
              {heroData.cta.secondary.label}
            </a>
          </div>

          {/* Bottom row: stats + socials */}
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
            {/* Quick stats */}
            <div className="flex">
              {heroData.quickStats.map((s, i) => (
                <div
                  key={s.label}
                  className={[
                    i < heroData.quickStats.length - 1
                      ? "pr-[18px] mr-[18px] border-r border-border2"
                      : "",
                  ].join(" ")}
                >
                  <div className="text-[1.1rem] font-extrabold text-text leading-[1.1]">{s.value}</div>
                  <div className="text-[0.68rem] text-text3 font-semibold uppercase tracking-[0.06em]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-7 bg-border2 max-lg:hidden" />

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} title={s.label} className={socialIconClass}>
                  {s.icon}
                </a>
              ))}
              <a href={siteData.resumeUrl} title="Resume" className={socialIconClass}>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT PHOTO ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
          className="flex justify-end relative max-lg:hidden"
        >
          <div className="relative w-[360px] h-[440px]">

            {/* Glow blob behind photo */}
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse,var(--primary-light)_0%,transparent_68%)] blur-[28px] z-0 rounded-full" />

            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-[32px] border border-primary-border z-0 opacity-50" />

            {/* Photo */}
            <div className="relative z-[1] w-full h-full rounded-[24px] overflow-hidden bg-card border border-border2 shadow-[var(--shadow-xl)]">
              <Image
                src={heroData.photo}
                alt="Jay Clark Anore"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient footer overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-[linear-gradient(to_top,rgba(14,22,42,0.7)_0%,transparent_100%)] z-[2]" />
            </div>

            {/* Float tag — top left */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-7 z-[3] bg-card border border-border2 rounded-[10px] py-2 px-[14px] text-[0.75rem] font-semibold text-text shadow-[var(--shadow-sm)] flex items-center gap-[7px] whitespace-nowrap"
            >
              <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: "var(--success)" }} />
              {heroData.floatingTags[0].text}
            </motion.div>

            {/* Available badge — bottom center */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-[3]">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-primary rounded-full py-[6px] px-[18px] text-[0.73rem] font-bold text-white flex items-center gap-[7px] whitespace-nowrap shadow-[0_4px_16px_rgba(59,158,245,0.4)]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
                  style={{ animation: "pulse-dot 1.6s infinite" }}
                />
                {heroData.badge}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
