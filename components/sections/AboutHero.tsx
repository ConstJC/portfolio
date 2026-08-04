"use client"

import Image from "next/image"
import type { ComponentType } from "react"
import { motion } from "framer-motion"
import { Briefcase, Download, Globe, MapPin } from "lucide-react"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import aboutData from "@/store/about.json"
import siteData from "@/store/site.json"

const pillIcons: Record<string, ComponentType<{ size?: number }>> = {
  MapPin,
  Globe,
  Briefcase,
}

const { hero } = aboutData

export default function AboutHero() {
  return (
    <section className="pt-24 pb-10 sm:pt-32 sm:pb-14 relative z-[1]" id="about">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-6 sm:gap-8 max-sm:flex-col max-sm:items-center max-sm:text-center"
        >
          {/* Avatar with availability dot */}
          <div className="relative shrink-0">
            <div className="w-[104px] h-[104px] sm:w-[120px] sm:h-[120px] rounded-[18px] overflow-hidden border border-border2 bg-card2">
              <Image
                src={hero.photo}
                alt={siteData.name}
                width={120}
                height={120}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-full bg-success border-[3px] border-bg"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
              aria-hidden
            />
          </div>

          {/* Identity */}
          <div className="min-w-0">
            <h1 className="text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-text">
              {siteData.name}
            </h1>
            <p className="mt-2.5 text-[clamp(0.9rem,1.6vw,1.05rem)] text-text2 leading-[1.5]">
              {hero.role.split(" | ").map((part, i, all) => (
                <span key={part}>
                  {part}
                  {i < all.length - 1 && <span className="text-text3 mx-1.5">|</span>}
                </span>
              ))}
            </p>
            <p className="mt-3.5 text-[0.92rem] text-text2 leading-[1.75] max-w-[680px]">
              {hero.intro}
            </p>
          </div>
        </motion.div>

        {/* Meta pills */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-wrap gap-2.5 mt-7 list-none max-sm:justify-center"
        >
          {hero.pills.map((pill) => {
            const Icon = pillIcons[pill.icon]
            return (
              <li
                key={pill.label}
                className="inline-flex items-center gap-2 py-[7px] px-[14px] bg-card border border-border2 rounded-full text-[0.8rem] font-semibold text-text2"
              >
                {Icon ? (
                  <Icon size={13} />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-success" aria-hidden />
                )}
                {pill.label}
              </li>
            )
          })}
        </motion.ul>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2.5 mt-7 max-sm:justify-center"
        >
          <a href={siteData.resumeUrl} className="btn-primary-sm">
            <Download size={15} /> Download Resume
          </a>
          <a
            href={siteData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-sm"
          >
            <FaGithub size={15} /> View GitHub
          </a>
          <a
            href={siteData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-sm"
          >
            <FaLinkedinIn size={15} /> LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
