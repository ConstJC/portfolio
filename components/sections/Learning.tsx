"use client"

import type { ComponentType } from "react"
import { motion } from "framer-motion"
import { Bot, Cloud, ShieldCheck, Sparkles, TrendingUp, Workflow } from "lucide-react"
import learningData from "@/store/learning.json"

const VP = { once: true, margin: "-80px" }

const icons: Record<string, ComponentType<{ size?: number }>> = {
  Bot,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Workflow,
}

export default function Learning() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="learning">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="section-eyebrow inline-flex items-center gap-2">
            <Sparkles size={13} /> Growth
          </div>
          <h2 className="section-title">
            Currently <span className="accent">Learning</span>
          </h2>
          <p className="section-desc">
            What I am actively deepening right now — the stack keeps moving, so I do too.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {learningData.map((item, i) => {
            const Icon = icons[item.icon] ?? Sparkles

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="flex gap-4 bg-card border border-border rounded-[14px] py-[22px] px-[22px] shadow-[var(--shadow-sm)] transition-[border-color] duration-[220ms]"
                whileHover={{ y: -2, borderColor: "var(--primary-border)" }}
              >
                <div className="w-[42px] h-[42px] rounded-[10px] bg-accent-light border border-accent-border text-accent flex items-center justify-center shrink-0">
                  <Icon size={19} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h3 className="text-[0.95rem] font-bold text-text">{item.title}</h3>
                    <span className="text-[0.66rem] font-bold tracking-[0.08em] uppercase text-success bg-success-light border border-success-border rounded-full py-[3px] px-2">
                      {item.progress}
                    </span>
                  </div>
                  <p className="text-[0.83rem] text-text2 leading-[1.7]">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
