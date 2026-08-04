"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Trophy } from "lucide-react"
import certificatesData from "@/store/certificates.json"

const VP = { once: true, margin: "-80px" }

export default function Certificates() {
  return (
    <section className="py-14 sm:py-24 bg-bg2 relative z-[1]" id="certificates">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="section-eyebrow">Credentials</div>
          <h2 className="section-title">
            Certificates &amp; <span className="accent">Recognition</span>
          </h2>
          <p className="section-desc">
            Formal qualifications and work that has been recognised along the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {certificatesData.map((item, i) => {
            const isRecognition = item.type === "recognition"
            const Icon = isRecognition ? Trophy : Award

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="flex flex-col bg-card border border-border rounded-[14px] py-[24px] px-[22px] shadow-[var(--shadow-sm)] transition-[border-color] duration-[220ms]"
                whileHover={{ y: -2, borderColor: "var(--primary-border)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={[
                      "w-[42px] h-[42px] rounded-[10px] border flex items-center justify-center shrink-0",
                      isRecognition
                        ? "text-warning bg-warning-light border-warning/25"
                        : "text-primary bg-primary-light border-primary-border",
                    ].join(" ")}
                  >
                    <Icon size={19} />
                  </div>
                  <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-text3 pt-1">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-[0.95rem] font-bold text-text leading-[1.4] mb-1.5">
                  {item.title}
                </h3>
                <div className="text-[0.8rem] font-semibold text-primary mb-3">{item.issuer}</div>
                <p className="text-[0.83rem] text-text2 leading-[1.7] flex-1">{item.description}</p>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-[0.8rem] font-semibold text-text2 no-underline transition-colors duration-[180ms] hover:text-primary"
                  >
                    View credential <ExternalLink size={13} />
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
