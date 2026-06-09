"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import experienceData from "@/store/experience.json"
import educationData from "@/store/education.json"

// Unified card shape — description/techs/location/employment are optional
// so cards without them simply skip those sections
type CardItem = {
  id: string
  role: string
  org: string
  logoUrl?: string | null
  initials?: string
  period: string
  location?: string
  employment?: string
  status?: string
  description?: string
  techs?: string[]
}

function ExpCard({ item, isStudent = false }: { item: CardItem; isStudent?: boolean }) {
  const isCurrent = item.status === "current"

  return (
    <div className="bg-card border border-border rounded-[16px] p-[22px] shadow-[var(--shadow-sm)]">
      {/* Header row */}
      <div className="flex gap-3.5 mb-3">
        {/* Logo tile */}
        <div className="w-[46px] h-[46px] rounded-[11px] bg-card2 border border-border2 flex items-center justify-center shrink-0 overflow-hidden">
          {item.logoUrl ? (
            <Image
              src={item.logoUrl}
              alt={item.org}
              width={46}
              height={46}
              className="w-full h-full object-cover"
            />
          ) : item.initials ? (
            <span className="text-[0.6rem] font-extrabold text-text2 tracking-tight text-center leading-tight px-1">
              {item.initials}
            </span>
          ) : (
            <span className="text-[1.3rem]">{isStudent ? "🎓" : "💻"}</span>
          )}
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[0.92rem] text-text leading-tight">
              {item.role}
            </span>
            {isCurrent && (
              <span
                className="text-[0.6rem] font-bold rounded-full py-[1px] px-2 shrink-0"
                style={{
                  color: "var(--success)",
                  background: "var(--success-light)",
                  border: "1px solid var(--success-border)",
                }}
              >
                Current
              </span>
            )}
          </div>
          <div className="text-[0.8rem] font-semibold text-primary mt-[2px]">
            {item.org}
          </div>
          {(item.period || item.location || item.employment) && (
            <div className="text-[0.72rem] text-text3 mt-[3px]">
              {[item.period, item.location, item.employment].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
      </div>

      {/* Description — only shown when present */}
      {item.description && (
        <p className="text-[0.8rem] text-text2 leading-[1.65] mb-3">
          {item.description}
        </p>
      )}

      {/* Tech chips — only shown when present */}
      {item.techs && item.techs.length > 0 && (
        <div className="flex gap-[5px] flex-wrap">
          {item.techs.map((t) => (
            <span
              key={t}
              className="py-[3px] px-2 bg-card2 border border-border rounded-[4px] text-[0.66rem] font-bold text-text2"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const workEntries: CardItem[] = experienceData as CardItem[]
const eduEntries: CardItem[] = educationData as CardItem[]

const VP = { once: true, margin: "-80px" }

export default function ExperienceEducation() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="experience">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">

          {/* Work Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="section-eyebrow">Career</div>
              <h2 className="section-title">Work Experience</h2>
            </motion.div>

            <div className="flex flex-col gap-3.5">
              {workEntries.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <ExpCard item={exp} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-6"
            >
              <div className="section-eyebrow">Background</div>
              <h2 className="section-title">Education</h2>
            </motion.div>

            <div className="flex flex-col gap-3.5">
              {eduEntries.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                >
                  <ExpCard item={edu} isStudent />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
