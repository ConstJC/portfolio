"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import aboutData from "@/store/about.json"

const VP = { once: true, margin: "-80px" }

const { summary } = aboutData

export default function AboutSummary() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="summary">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="section-eyebrow inline-flex items-center gap-2">
            <User size={13} /> {summary.eyebrow}
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.1] text-text">
            {summary.title}
          </h2>
          <p className="section-desc">{summary.lede}</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {summary.cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="bg-card border border-border rounded-[14px] py-[26px] px-[22px] shadow-[var(--shadow-sm)] transition-[border-color] duration-[220ms]"
              whileHover={{ y: -2, borderColor: "var(--primary-border)" }}
            >
              <h3 className="text-[0.97rem] font-bold text-text mb-2.5">{card.title}</h3>
              <p className="text-[0.85rem] text-text2 leading-[1.75]">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
