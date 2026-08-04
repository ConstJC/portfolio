"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { AccordionItem } from "@/components/ui/accordion"
import faqData from "@/store/faq.json"

const INITIAL_COUNT = 5
const VP = { once: true, margin: "-80px" }

const alwaysVisible = faqData.slice(0, INITIAL_COUNT)
const overflow = faqData.slice(INITIAL_COUNT)

export default function Faq() {
  const [expanded, setExpanded] = useState(false)

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
          {alwaysVisible.map((item, i) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              variant="flat"
              isLast={!expanded && i === alwaysVisible.length - 1}
            />
          ))}

          {/* Overflow Q&As stay mounted so crawlers index every answer — the
              collapse is height-only, and `inert` keeps them out of the tab
              order and a11y tree while hidden. */}
          {overflow.length > 0 && (
            <motion.div
              animate={{ height: expanded ? "auto" : 0 }}
              initial={false}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
              inert={!expanded}
            >
              {overflow.map((item, i) => (
                <AccordionItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  variant="flat"
                  isLast={i === overflow.length - 1}
                />
              ))}
            </motion.div>
          )}

          {/* View More / Hide Less */}
          {overflow.length > 0 && (
            <div className="flex justify-center pt-7">
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-[7px] py-[9px] px-[22px] bg-card border border-divider rounded-full text-[0.82rem] font-bold text-text2 cursor-pointer font-sans transition-[border-color,color,background] duration-[180ms] hover:border-primary-border hover:text-primary hover:bg-primary-light"
              >
                {expanded ? "Hide Less" : `View More (${overflow.length} more)`}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-[250ms] ${expanded ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  )
}
