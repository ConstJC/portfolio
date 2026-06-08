"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code2 } from "lucide-react"
import projectsData from "@/store/projects.json"

const thumbGradients: Record<string, string> = {
  "pt-1": "var(--grad-azure)",
  "pt-2": "var(--grad-teal)",
  "pt-3": "var(--grad-amber)",
  "pt-5": "var(--grad-violet)",
}

const VP = { once: true, margin: "-80px" }

export default function Projects() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="projects">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end mb-12 flex-wrap gap-4"
        >
          <div>
            <div className="section-eyebrow">Selected Work</div>
            <h2 className="section-title">Recent Projects</h2>
          </div>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {projectsData.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] transition-[border-color,transform] duration-[220ms]"
              whileHover={{ y: -3, borderColor: "var(--primary-border)" }}
            >
              {/* Thumb — background is data-driven, must stay inline */}
              <div
                style={{ background: thumbGradients[proj.thumbVariant] ?? thumbGradients["pt-1"] }}
                className="h-40 flex items-center justify-center text-[3rem] relative"
              >
                {proj.emoji}
                <span className="absolute top-3 right-3 bg-black/40 backdrop-blur border border-white/15 rounded-full py-[3px] px-[10px] text-[0.68rem] font-bold text-white">
                  {proj.badge}
                </span>
              </div>

              {/* Body */}
              <div className="pt-[18px] px-[18px] pb-4">
                <div className="font-bold text-[0.97rem] mb-1.5 leading-[1.35] text-text">
                  {proj.title}
                </div>
                <div className="text-[0.8rem] text-text2 leading-[1.6] mb-3.5">
                  {proj.description}
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-[5px] flex-wrap">
                    {proj.techs.map((t) => (
                      <span
                        key={t}
                        className="py-[3px] px-2 bg-card2 border border-border rounded-[4px] text-[0.67rem] font-bold text-text2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {proj.liveUrl && proj.liveUrl !== "#" ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-[7px] px-3 rounded-lg bg-card2 border border-border text-[0.73rem] font-bold text-text2 no-underline transition-colors duration-150 hover:text-text hover:border-primary-border"
                      >
                        <ExternalLink size={12} /> View Live
                      </a>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-[7px] px-3 rounded-lg bg-card2 border border-border text-[0.73rem] font-bold text-text3 opacity-45 cursor-not-allowed select-none">
                        <ExternalLink size={12} /> View Live
                      </span>
                    )}
                    {proj.sourceUrl && proj.sourceUrl !== "#" ? (
                      <a
                        href={proj.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-[7px] px-3 rounded-lg bg-primary text-[0.73rem] font-bold text-white no-underline transition-opacity duration-150 hover:opacity-85"
                      >
                        <Code2 size={12} /> Source Code
                      </a>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-[7px] px-3 rounded-lg bg-primary/30 text-[0.73rem] font-bold text-white/40 opacity-45 cursor-not-allowed select-none">
                        <Code2 size={12} /> Source Code
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
