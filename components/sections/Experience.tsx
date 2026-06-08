"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import experienceData from "@/store/experience.json"

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  current:  { label: "CURRENT",  color: "var(--success)",  bg: "var(--success-light)",  border: "var(--success-border)"  },
  previous: { label: "PREVIOUS", color: "var(--text2)", bg: "rgba(148,163,186,0.10)", border: "rgba(148,163,186,0.20)" },
  earlier:  { label: "EARLIER",  color: "var(--text3)", bg: "rgba(86,106,134,0.10)",  border: "rgba(86,106,134,0.20)"  },
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-12 sm:py-18 bg-bg2 relative z-[1]" id="experience" ref={ref}>
      <div className="wrap">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="section-eyebrow">Career</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.1] text-text">
            Work{" "}
            <span className="text-primary">History</span>
          </h2>
        </motion.div>

        {/* Timeline rows */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-[199px] top-0 bottom-0 w-px bg-divider pointer-events-none max-md:hidden" />

          {experienceData.map((exp, i) => {
            const status = statusConfig[exp.status] ?? statusConfig.earlier

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className={[
                  "grid grid-cols-[200px_1fr] gap-x-12 gap-y-0 py-9",
                  "max-md:grid-cols-1 max-md:gap-y-4",
                  i < experienceData.length - 1 ? "border-b border-divider" : "",
                ].join(" ")}
              >
                {/* LEFT — meta */}
                <div className="pt-1 pr-7">
                  <div className="text-[0.85rem] font-bold text-primary mb-[5px] tracking-[-0.01em]">
                    {exp.period}
                  </div>
                  <div className="text-[0.75rem] text-text3 mb-3">
                    {exp.type} · {exp.employment}
                  </div>
                  {/* Status badge — colors are data-driven, stay inline */}
                  <span
                    style={{ color: status.color, background: status.bg, border: `1px solid ${status.border}` }}
                    className="inline-block text-[0.65rem] font-bold tracking-[0.1em] uppercase rounded-[4px] py-[3px] px-[9px]"
                  >
                    {status.label}
                  </span>
                </div>

                {/* RIGHT — content */}
                <div>
                  <h3 className="text-[1.15rem] font-bold text-text mb-1 leading-[1.3]">
                    {exp.role}
                  </h3>

                  <div className="text-[0.83rem] text-text3 mb-3.5 flex items-center gap-1.5">
                    <span className="text-primary font-bold">•</span>
                    {exp.org}
                  </div>

                  <p className="text-[0.85rem] text-text2 leading-[1.72] mb-[18px] max-w-[640px]">
                    {exp.description}
                  </p>

                  <div className="flex gap-1.5 flex-wrap">
                    {exp.techs.map((tech) => (
                      <span
                        key={tech}
                        className="py-1 px-[10px] bg-card border border-border2 rounded-[6px] text-[0.72rem] font-semibold text-text2 tracking-[0.01em]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
