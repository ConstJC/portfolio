"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import educationData from "@/store/education.json"

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-12 sm:py-18 bg-bg2 relative z-[1]" id="education" ref={ref}>
      <div className="wrap">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="section-eyebrow">Background</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.1] text-text">
            Education
          </h2>
        </motion.div>

        {/* Rows */}
        <div>
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={[
                "flex items-center gap-5 py-7",
                i < educationData.length - 1 ? "border-b border-divider" : "",
              ].join(" ")}
            >
              {/* Logo */}
              <div className="shrink-0 w-12 h-12 rounded-full bg-card border border-border2 flex items-center justify-center overflow-hidden">
                {edu.logoUrl ? (
                  <Image src={edu.logoUrl} alt={edu.institution} width={48} height={48} className="object-cover" />
                ) : (
                  <span className="text-[0.6rem] font-extrabold text-text2 tracking-tight text-center leading-tight px-1">
                    {edu.initials}
                  </span>
                )}
              </div>

              {/* Name + degree + period */}
              <div className="block sm:flex min-w-0 justify-between w-full items-center">
                <div className="flex flex-col">
                  <div className="font-bold text-[1rem] text-text leading-[1.3]">
                    {edu.institution}
                  </div>
                  <div className="text-[0.83rem] text-text2 mt-[3px]">
                    {edu.degree}
                  </div>
                </div>
                <div className="text-[0.75rem] text-text3 mt-[6px]">
                  {edu.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
