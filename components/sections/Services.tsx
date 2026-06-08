"use client"

import { motion } from "framer-motion"
import servicesData from "@/store/services.json"

const VP = { once: true, margin: "-80px" }

export default function Services() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="services">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-eyebrow">Services</div>
          <h2 className="section-title">What I <span className="accent">Offer</span></h2>
          <p className="section-desc">
            End-to-end product development — from first sketch to production deploy.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {servicesData.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="bg-card border border-border rounded-[14px] py-[26px] px-[22px] shadow-[var(--shadow-sm)] transition-[border-color,transform] duration-[220ms]"
              whileHover={{ y: -2, borderColor: "var(--primary-border)" }}
            >
              <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-light border border-primary-border flex items-center justify-center text-[1.35rem] mb-[18px]">
                {svc.icon}
              </div>
              <div className="text-[0.97rem] font-bold text-text mb-2">
                {svc.title}
              </div>
              <div className="text-[0.8rem] text-text2 leading-[1.68]">
                {svc.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
