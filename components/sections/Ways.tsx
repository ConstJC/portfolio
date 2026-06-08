"use client"

import { motion } from "framer-motion"
import waysData from "@/store/ways.json"

const VP = { once: true, margin: "-80px" }

export default function Ways() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="ways">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow">What I Build</div>
          <h2 className="section-title">{waysData.length} Ways I Can Help You</h2>
          <p className="section-desc mt-3 mx-auto">
            Whether you&apos;re launching a startup or scaling a product, I have you covered end-to-end.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {waysData.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl py-7 px-[22px] shadow-[var(--shadow-sm)] transition-[border-color,transform,box-shadow] duration-[220ms]"
              whileHover={{ y: -3 }}
            >
              <div className="text-[1.8rem] mb-3.5 w-13 h-13 rounded-xl bg-primary-light border border-primary-border flex items-center justify-center">
                {card.icon}
              </div>

              <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-primary mb-2">
                {card.tag}
              </div>

              <div className="text-[0.97rem] font-bold text-text mb-2.5 leading-[1.35]">
                {card.title}
              </div>

              <div className="text-[0.82rem] text-text2 leading-[1.65]">
                {card.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
