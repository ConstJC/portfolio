"use client"

import { motion } from "framer-motion"
import stepsData from "@/store/steps.json"

const VP = { once: true, margin: "-80px" }

export default function Steps() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow">Process</div>
          <h2 className="section-title">How We Work Together</h2>
          <p className="section-desc mt-3 mx-auto">
            No confusing contracts. No tech jargon. Just a clear, stress-free process from idea to launch.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
          {stepsData.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col items-center bg-card border border-border rounded-2xl py-6 px-5 sm:py-8 sm:px-7 relative shadow-[var(--shadow-sm)]"
            >
              {/* Connector line */}
              {i < stepsData.length - 1 && (
                <div className="absolute top-11 right-[-7px] w-3.5 h-0.5 bg-border2 z-[2] max-lg:hidden" />
              )}

              {/* Number */}
              <div className="w-11 h-11 rounded-xl bg-primary-light border border-primary-border flex items-center justify-center font-extrabold text-[1.1rem] text-primary mb-[18px]">
                {step.number}
              </div>

              <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-text3 mb-2">
                {step.eyebrow}
              </div>

              <h3 className="text-base font-bold text-text mb-2.5 leading-[1.3]">
                {step.title}
              </h3>

              <p className="text-[0.82rem] text-text2 leading-[1.68] text-center">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
