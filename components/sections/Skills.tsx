"use client"

import { motion } from "framer-motion"
import { Cloud, Code2, Database, LayoutTemplate, ServerCog, Smartphone, Workflow, Wrench } from "lucide-react"
import skillsData from "@/store/skills.json"

const VP = { once: true, margin: "-80px" }

const icons = {
  Cloud,
  Code2,
  Database,
  LayoutTemplate,
  ServerCog,
  Smartphone,
  Workflow,
  Wrench,
}

const accents = [
  "text-primary bg-primary-light border-primary-border",
  "text-accent bg-accent-light border-accent-border",
  "text-success bg-success-light border-success-border",
  "text-warning bg-warning-light border-warning/25",
  "text-danger bg-danger-light border-danger/25",
  "text-primary bg-primary-light border-primary-border",
  "text-accent bg-accent-light border-accent-border",
  "text-success bg-success-light border-success-border",
]

export default function Skills() {
  const coreStack = ["Next.js", "NestJS", "TypeScript", "Prisma", "React Native", "C# .NET", "SQL Server", "SignalR"]

  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="skills">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between gap-6 max-lg:flex-col max-lg:items-start"
        >
          <div>
            <div className="section-eyebrow">Expertise</div>
            <h2 className="section-title">Skills &amp; <span className="accent">Technologies</span></h2>
            <p className="section-desc">
              A practical full-stack toolkit for shipping maintainable web, mobile, and business systems.
            </p>
          </div>
          <div className="flex max-w-[440px] flex-wrap justify-end gap-2 max-lg:justify-start">
            {coreStack.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-border bg-card2 px-2.5 py-1 text-[0.72rem] font-bold text-text2"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {skillsData.map((skill, i) => {
            const Icon = icons[skill.icon as keyof typeof icons] ?? Code2

            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="bg-card border border-border rounded-2xl p-5 shadow-[var(--shadow-sm)] transition-[border-color,transform] duration-[220ms]"
                whileHover={{ y: -3, borderColor: "var(--primary-border)" }}
              >
                <div
                  className={[
                    "mb-5 flex size-11 items-center justify-center rounded-xl border",
                    accents[i % accents.length],
                  ].join(" ")}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-[0.98rem] font-bold leading-[1.35] text-text">
                  {skill.category}
                </h3>
                <p className="mb-4 text-[0.8rem] leading-[1.65] text-text2">
                  {skill.summary}
                </p>
                <div className="flex flex-wrap gap-[6px]">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-[4px] border border-border bg-card2 px-2 py-[3px] text-[0.67rem] font-bold text-text2"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
