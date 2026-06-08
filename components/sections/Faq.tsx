"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { AccordionItem } from "@/components/ui/accordion"
import faqData from "@/store/faq.json"

const INITIAL_COUNT = 5
const VP = { once: true, margin: "-80px" }

export default function Faq() {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? faqData : faqData.slice(0, INITIAL_COUNT)

  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="faq">
      <div className="wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-text3 mb-3.5">
            GENERAL INFO
          </div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.025em] leading-[1.15] text-text mb-3.5">
            Questions You Might Ask
          </h2>
          <p className="text-[0.88rem] text-text2 leading-[1.7] max-w-[520px] mx-auto">
            For your convenience, I have pre-answered some typical questions and included
            relevant information you may find useful.
          </p>
        </motion.div>

        {/* Accordion list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[760px] mx-auto border-t border-divider"
        >
          <AnimatePresence initial={false}>
            {visible.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <AccordionItem
                  question={item.question}
                  answer={item.answer}
                  variant="flat"
                  isLast={i === visible.length - 1 && !expanded
                    ? true
                    : i === faqData.length - 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* View More / Hide Less */}
          <div className="flex justify-center pt-7">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-[7px] py-[9px] px-[22px] bg-card border border-divider rounded-full text-[0.82rem] font-bold text-text2 cursor-pointer font-sans transition-[border-color,color,background] duration-[180ms] hover:border-primary-border hover:text-primary hover:bg-primary-light"
            >
              {expanded ? "Hide Less" : `View More (${faqData.length - INITIAL_COUNT} more)`}
              <ChevronDown
                size={14}
                className={`transition-transform duration-[250ms] ${expanded ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
