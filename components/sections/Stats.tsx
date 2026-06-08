"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import statsData from "@/store/stats.json"

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-16 relative z-[1]" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-12 bg-card border border-border rounded-[20px] py-10 px-12 shadow-[var(--shadow-sm)] max-lg:flex-col max-lg:items-start max-sm:py-7 max-sm:px-5"
        >
          {/* Label col */}
          <div className="shrink-0 basis-[200px] pr-12 border-r border-border max-lg:border-r-0 max-lg:border-b max-lg:pr-0 max-lg:pb-6 max-lg:mb-6 max-lg:w-full">
            <div className="overline mb-2">REF: PORTFOLIO-2025</div>
            <h3 className="text-[1.6rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-text">
              By the<br />
              <span className="text-primary">Numbers</span>
            </h3>
          </div>

          {/* Stats grid */}
          <div className="flex-1 grid grid-cols-4 max-lg:grid-cols-2 max-lg:w-full">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className={[
                  "px-6 max-lg:border-r-0 max-lg:py-4 max-lg:border-b max-lg:border-border",
                  i < statsData.length - 1 ? "border-r border-border" : "",
                ].join(" ")}
              >
                <div className="overline mb-1.5">{stat.label}</div>
                <div className="text-[2rem] font-extrabold tracking-[-0.03em] text-text leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[0.78rem] text-text3">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
