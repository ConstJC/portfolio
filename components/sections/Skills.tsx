"use client"

import type { ComponentType } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Component,
  Database,
  FileCode,
  FileText,
  GitMerge,
  Layers,
  LayoutTemplate,
  ListChecks,
  Network,
  Palette,
  PenTool,
  Puzzle,
  Radio,
  RefreshCw,
  Server,
  Smartphone,
  Workflow,
} from "lucide-react"
import {
  SiCpanel,
  SiDocker,
  SiDotnet,
  SiExpo,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGooglecloud,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiShopify,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si"
import { DiMsqlServer } from "react-icons/di"
import { TbBrandAws, TbBrandAzure } from "react-icons/tb"
import skillsData from "@/store/skills.json"

const VP = { once: true, margin: "-80px" }

type ToolIcon = ComponentType<{ size?: number }>

const toolIcons: Record<string, { icon: ToolIcon; color: string }> = {
  "Next.js": { icon: SiNextdotjs, color: "var(--text)" },
  React: { icon: SiReact, color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { icon: SiFramer, color: "var(--text)" },

  NestJS: { icon: SiNestjs, color: "#E0234E" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "C# .NET": { icon: SiDotnet, color: "#512BD4" },
  "REST APIs": { icon: Network, color: "var(--text2)" },
  SignalR: { icon: Radio, color: "var(--text2)" },

  Prisma: { icon: SiPrisma, color: "#2D3748" },
  "SQL Server": { icon: DiMsqlServer, color: "#CC2927" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  "Database Design": { icon: Database, color: "var(--text2)" },
  "Entity Framework": { icon: Layers, color: "var(--text2)" },

  "React Native": { icon: SiReact, color: "#61DAFB" },
  Flutter: { icon: SiFlutter, color: "#02569B" },
  Expo: { icon: SiExpo, color: "var(--text)" },
  "Mobile UI": { icon: Smartphone, color: "var(--text2)" },
  "App Integrations": { icon: Puzzle, color: "var(--text2)" },

  "UI Design": { icon: PenTool, color: "var(--text2)" },
  "UX Flows": { icon: Workflow, color: "var(--text2)" },
  Prototyping: { icon: Component, color: "var(--text2)" },
  "Design Systems": { icon: LayoutTemplate, color: "var(--text2)" },
  Forms: { icon: ListChecks, color: "var(--text2)" },

  Git: { icon: SiGit, color: "#F05032" },
  Vercel: { icon: SiVercel, color: "var(--text)" },
  "CI/CD": { icon: GitMerge, color: "var(--text2)" },
  Agile: { icon: RefreshCw, color: "var(--text2)" },
  "Technical Docs": { icon: FileText, color: "var(--text2)" },

  AWS: { icon: TbBrandAws, color: "#FF9900" },
  "Google Cloud": { icon: SiGooglecloud, color: "#4285F4" },
  Azure: { icon: TbBrandAzure, color: "#0078D4" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  Nginx: { icon: SiNginx, color: "#009639" },

  Shopify: { icon: SiShopify, color: "#95BF47" },
  WordPress: { icon: SiWordpress, color: "#21759B" },
  "ASP Classic": { icon: FileCode, color: "var(--text2)" },
  VBScript: { icon: Code2, color: "var(--text2)" },
  "VB.NET": { icon: SiDotnet, color: "#512BD4" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  IIS: { icon: Server, color: "var(--text2)" },
  Cpanel: { icon: SiCpanel, color: "#FF6C2C" },
  "Themes & Plugins": { icon: Palette, color: "var(--text2)" },
}

export default function Skills() {
  return (
    <section className="py-14 sm:py-24 relative z-[1]" id="skills">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-eyebrow">Expertise</div>
          <h2 className="section-title">Skills &amp; <span className="accent">Technologies</span></h2>
          <p className="section-desc">
            A practical full-stack toolkit for shipping maintainable web, mobile, and business systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-9">
          {skillsData.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            >
              <h3 className="mb-4 border-b border-border pb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-text3">
                {skill.category}
              </h3>
              <div className="grid grid-cols-2 gap-x-8 max-sm:grid-cols-1">
                {skill.tools.map((tool) => {
                  const entry = toolIcons[tool]
                  const Icon = entry?.icon ?? Code2
                  const color = entry?.color ?? "var(--text2)"

                  return (
                    <div
                      key={tool}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-card2"
                    >
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
                        style={{ color }}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="text-[0.85rem] font-medium text-text">{tool}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
