"use client"

import type { ComponentType } from "react"
import { motion } from "framer-motion"
import { Briefcase, Code2, Radio, Workflow } from "lucide-react"
import writingData from "@/store/writing.json"

const VP = { once: true, margin: "-80px" }

const icons: Record<string, ComponentType<{ size?: number }>> = {
  Code2,
  Workflow,
  Briefcase,
}

export default function Writing() {
  const { intro, pillars } = writingData

  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="writing">
      <div className="wrap">
        {/* Status callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-3 bg-card border border-border2 rounded-[14px] py-4 px-5 mb-10 sm:mb-14"
        >
          <Radio size={17} className="text-primary shrink-0 mt-0.5" />
          <p className="text-[0.83rem] text-text2 leading-[1.7]">{intro.statusLine}</p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
          {pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon] ?? Code2

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="bg-card border border-border rounded-2xl py-6 px-6 shadow-[var(--shadow-sm)] transition-[border-color] duration-[220ms]"
                whileHover={{ y: -2, borderColor: "var(--primary-border)" }}
              >
                <div className="w-[42px] h-[42px] rounded-[10px] bg-accent-light border border-accent-border text-accent flex items-center justify-center shrink-0 mb-4">
                  <Icon size={19} />
                </div>

                <h3 className="text-[0.98rem] font-bold text-text mb-1.5">{pillar.name}</h3>
                <p className="text-[0.83rem] text-text2 leading-[1.7] mb-4">{pillar.description}</p>

                <ul className="flex flex-col gap-2">
                  {pillar.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-[0.77rem] text-text3 leading-[1.6]"
                    >
                      <span className="mt-[7px] size-1 rounded-full bg-text3 shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
