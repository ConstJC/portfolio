"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Code2, ExternalLink, Maximize2, X } from "lucide-react"
import projectsData from "@/store/projects.json"

const thumbGradients: Record<string, string> = {
  "pt-1": "var(--grad-azure)",
  "pt-2": "var(--grad-teal)",
  "pt-3": "var(--grad-amber)",
  "pt-5": "var(--grad-violet)",
}

const VP = { once: true, margin: "-80px" }

type Project = (typeof projectsData)[number] & {
  images?: string[]
}

export default function Projects() {
  const orderedProjects = useMemo(
    () =>
      [...(projectsData as Project[])].sort((a, b) => {
        const aHasImages = Number(Boolean(a.images?.length))
        const bHasImages = Number(Boolean(b.images?.length))

        return bHasImages - aHasImages
      }),
    []
  )

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
          {orderedProjects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const images = project.images ?? []
  const hasImages = images.length > 0
  const [activeImage, setActiveImage] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const showPrevious = () => {
    setActiveImage((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const showNext = () => {
    setActiveImage((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  useEffect(() => {
    if (images.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current === images.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => window.clearInterval(timer)
  }, [images.length])

  useEffect(() => {
    if (!isPreviewOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false)
      }

      if (images.length > 1 && event.key === "ArrowLeft") {
        setActiveImage((current) => (current === 0 ? images.length - 1 : current - 1))
      }

      if (images.length > 1 && event.key === "ArrowRight") {
        setActiveImage((current) => (current === images.length - 1 ? 0 : current + 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [images.length, isPreviewOpen])

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] transition-[border-color,transform] duration-[220ms]"
      whileHover={{ y: -3, borderColor: "var(--primary-border)" }}
    >
      {/* Thumb — background is data-driven, must stay inline */}
      <div
        style={{ background: thumbGradients[project.thumbVariant] ?? thumbGradients["pt-1"] }}
        className="h-40 flex items-center justify-center text-[3rem] relative overflow-hidden"
      >
        {hasImages ? (
          <>
            <Image
              key={images[activeImage]}
              src={images[activeImage]}
              alt={`${project.title} screenshot ${activeImage + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-2"
              priority={index < 2}
            />
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-black/45 text-white border border-white/15 backdrop-blur transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`Open ${project.title} full preview`}
            >
              <Maximize2 size={15} aria-hidden="true" />
            </button>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-black/45 text-white border border-white/15 backdrop-blur transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Previous ${project.title} screenshot`}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-black/45 text-white border border-white/15 backdrop-blur transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Next ${project.title} screenshot`}
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((image, imageIndex) => (
                    <button
                      type="button"
                      key={image}
                      onClick={() => setActiveImage(imageIndex)}
                      className={`size-1.5 rounded-full transition-all ${
                        activeImage === imageIndex ? "w-4 bg-white" : "bg-white/45 hover:bg-white/75"
                      }`}
                      aria-label={`Show ${project.title} screenshot ${imageIndex + 1}`}
                      aria-current={activeImage === imageIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </>
        ) : (
          project.emoji
        )}
        <span className="absolute top-3 right-3 bg-black/40 backdrop-blur border border-white/15 rounded-full py-[3px] px-[10px] text-[0.68rem] font-bold text-white">
          {project.badge}
        </span>
      </div>

      {/* Body */}
      <div className="pt-[18px] px-[18px] pb-4">
        <div className="font-bold text-[0.97rem] mb-1.5 leading-[1.35] text-text">
          {project.title}
        </div>
        <div className="text-[0.8rem] text-text2 leading-[1.6] mb-3.5">
          {project.description}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-[5px] flex-wrap">
            {project.techs.map((t) => (
              <span
                key={t}
                className="py-[3px] px-2 bg-card2 border border-border rounded-[4px] text-[0.67rem] font-bold text-text2"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            {project.liveUrl && project.liveUrl !== "#" ? (
              <a
                href={project.liveUrl}
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
            {project.sourceUrl && project.sourceUrl !== "#" ? (
              <a
                href={project.sourceUrl}
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

      {hasImages && isPreviewOpen ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex h-dvh w-dvw flex-col bg-black/90 p-4 text-white backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} full image preview`}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-[0.74rem] font-bold uppercase tracking-[0.1em] text-white/55">
                {project.badge}
              </div>
              <div className="text-base font-bold leading-tight sm:text-lg">{project.title}</div>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white border border-white/15 backdrop-blur transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`Close ${project.title} full preview`}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-white/10 bg-black/35"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={`preview-${images[activeImage]}`}
              src={images[activeImage]}
              alt={`${project.title} full preview screenshot ${activeImage + 1}`}
              fill
              sizes="100vw"
              className="object-contain p-2 sm:p-4"
              priority
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white border border-white/15 backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 sm:size-11"
                  aria-label={`Previous ${project.title} full preview screenshot`}
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white border border-white/15 backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:size-11"
                  aria-label={`Next ${project.title} full preview screenshot`}
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="mt-4 flex justify-center gap-2">
              {images.map((image, imageIndex) => (
                <button
                  type="button"
                  key={`preview-dot-${image}`}
                  onClick={() => setActiveImage(imageIndex)}
                  className={`h-2 rounded-full transition-all ${
                    activeImage === imageIndex ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Show ${project.title} full preview screenshot ${imageIndex + 1}`}
                  aria-current={activeImage === imageIndex ? "true" : undefined}
                />
              ))}
            </div>
          ) : null}
        </div>,
        document.body
      ) : null}
    </>
  )
}
