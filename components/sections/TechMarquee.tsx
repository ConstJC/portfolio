"use client"

import type { ComponentType } from "react"
import {
  SiNextdotjs,
  SiNestjs,
  SiReact,
  SiTypescript,
  SiDotnet,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiPrisma,
  SiRedis,
  SiFlutter,
  SiFirebase,
  SiGit,
} from "react-icons/si"
import marqueeData from "@/store/marquee.json"

const marqueeIcons: Record<string, ComponentType<{ size?: number }>> = {
  SiNextdotjs,
  SiNestjs,
  SiReact,
  SiTypescript,
  SiDotnet,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiPrisma,
  SiRedis,
  SiFlutter,
  SiFirebase,
  SiGit,
}

export default function TechMarquee() {
  const items = [...marqueeData, ...marqueeData]

  return (
    <div className="relative z-[1] py-4 border-t border-border2 bg-[linear-gradient(to_top,var(--bg)_60%,transparent_100%)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex items-center gap-9 w-max"
        style={{ animation: "marquee-scroll 32s linear infinite" }}
      >
        {items.map((item, i) => {
          const Icon = marqueeIcons[item.icon]
          return (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-2 shrink-0 text-text3"
            >
              {Icon && <Icon size={17} />}
              <span className="text-[0.78rem] font-semibold whitespace-nowrap">{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
