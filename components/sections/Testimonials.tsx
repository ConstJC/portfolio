"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import Image from "next/image"
import testimonialsData from "@/store/testimonials.json"

/* ── helpers ── */
function extractGithubUsername(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const match = trimmed.match(/github\.com\/([A-Za-z0-9_-]+)/i)
  if (match) return match[1]
  if (/^[A-Za-z0-9_-]+$/.test(trimmed)) return trimmed
  return null
}

/* ── Carousel slide variants ── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 340 : -340, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -340 : 340, opacity: 0 }),
}

/* ── Modal form ── */
function TestimonialModal({ onClose }: { onClose: () => void }) {
  const [githubUrl, setGithubUrl] = useState("")
  const [fileAvatar, setFileAvatar] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [quote, setQuote] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [website, setWebsite] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const avatarPreview = useMemo(() => {
    if (fileAvatar) return fileAvatar
    const username = extractGithubUsername(githubUrl)
    return username ? `https://avatars.githubusercontent.com/${username}?size=96` : null
  }, [fileAvatar, githubUrl])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setFileAvatar(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-[var(--shadow-md)] max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-text3 hover:text-text hover:bg-card2 transition-colors duration-150 z-10"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="px-4 pt-6 pb-6 sm:px-7 sm:pt-8 sm:pb-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center py-8 gap-4"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-[1.6rem]" style={{ background: "var(--success-light)", border: "1px solid var(--success-border)", color: "var(--success)" }}>
                ✓
              </div>
              <div>
                <div className="font-extrabold text-[1.15rem] text-text mb-1">Thank you, {name || "friend"}!</div>
                <div className="text-[0.85rem] text-text2 leading-[1.6]">
                  Your testimonial has been received. I really appreciate you taking the time.
                </div>
              </div>
              <button onClick={onClose} className="mt-2 btn-primary-sm px-8">Close</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mb-1">
                <h3 className="font-extrabold text-[1.2rem] text-text">Share Your Experience</h3>
                <p className="text-[0.8rem] text-text3 mt-1">Your review helps others know what it&apos;s like to work with me.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-bold text-text2 uppercase tracking-[0.07em]">GitHub Profile</label>
                <input
                  type="text"
                  placeholder="https://github.com/username (optional)"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-card2 border border-border text-[0.85rem] text-text placeholder:text-text3 outline-none focus:border-primary transition-colors duration-150"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative w-20 h-20 rounded-full bg-card2 border-2 border-dashed border-border hover:border-primary transition-colors duration-150 overflow-hidden group"
                >
                  {avatarPreview ? (
                    <>
                      <Image src={avatarPreview} alt="Avatar" fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-1 cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text3">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span className="text-[0.65rem] text-text3 font-semibold">Upload</span>
                    </div>
                  )}
                </button>
                <p className="text-[0.72rem] text-text3 text-center">Hover &amp; click to override the GitHub photo.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-bold text-text2 uppercase tracking-[0.07em]">Full Name <span className="text-primary">*</span></label>
                <input type="text" placeholder="Ex. Juan Dela Cruz" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-xl bg-card2 border border-border text-[0.85rem] text-text placeholder:text-text3 outline-none focus:border-primary transition-colors duration-150" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-bold text-text2 uppercase tracking-[0.07em]">Position / Title <span className="text-primary">*</span></label>
                <input type="text" placeholder="Ex. Software Developer" value={role} onChange={(e) => setRole(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-xl bg-card2 border border-border text-[0.85rem] text-text placeholder:text-text3 outline-none focus:border-primary transition-colors duration-150" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-bold text-text2 uppercase tracking-[0.07em]">Your Testimonial <span className="text-primary">*</span></label>
                <textarea placeholder="What was it like working with me? Share your honest experience..." value={quote} onChange={(e) => setQuote(e.target.value)} required rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-card2 border border-border text-[0.85rem] text-text placeholder:text-text3 outline-none focus:border-primary transition-colors duration-150 resize-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-bold text-text2 uppercase tracking-[0.07em]">LinkedIn</label>
                  <input type="url" placeholder="linkedin.com/in/… (optional)" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-card2 border border-border text-[0.85rem] text-text placeholder:text-text3 outline-none focus:border-primary transition-colors duration-150" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-bold text-text2 uppercase tracking-[0.07em]">Website</label>
                  <input type="url" placeholder="yoursite.com (optional)" value={website} onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-card2 border border-border text-[0.85rem] text-text placeholder:text-text3 outline-none focus:border-primary transition-colors duration-150" />
                </div>
              </div>

              <button type="submit" className="mt-1 w-full py-3 rounded-xl bg-primary text-white text-[0.88rem] font-bold hover:opacity-90 transition-opacity duration-150">
                Submit Testimonial
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const VP = { once: true, margin: "-80px" }

/* ── Main section ── */
export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const perPage = 3
  const total = testimonialsData.length
  const totalPages = Math.ceil(total / perPage)
  const pageItems = testimonialsData.slice(page * perPage, (page + 1) * perPage)

  const paginate = (dir: number) => {
    setDirection(dir)
    setPage((p) => (p + dir + totalPages) % totalPages)
  }

  const goTo = (idx: number) => {
    setDirection(idx > page ? 1 : -1)
    setPage(idx)
  }

  return (
    <>
      <section className="py-14 sm:py-24 bg-bg2 relative z-[1]" id="testimonials">
        <div className="wrap">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5 }}
            suppressHydrationWarning
            className="flex justify-between items-end mb-12 flex-wrap gap-4"
          >
            <div>
              <div className="section-eyebrow">Social Proof</div>
              <h2 className="section-title">What Clients Say</h2>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-ghost-sm inline-flex items-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Share Your Experience
            </button>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.15 }}
            suppressHydrationWarning
          >
            {/* Track */}
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 32 }}
                  drag={totalPages > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_, { offset }) => {
                    if (offset.x < -60) paginate(1)
                    else if (offset.x > 60) paginate(-1)
                  }}
                  className={[
                    "grid gap-3.5",
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                    totalPages > 1 ? "cursor-grab active:cursor-grabbing select-none" : "",
                  ].join(" ")}
                >
                  {pageItems.map((t) => (
                    <div
                      key={t.id}
                      className="bg-card border border-border rounded-[14px] p-[26px] shadow-(--shadow-sm) flex flex-col"
                    >
                      <div className="text-primary text-[2rem] font-black font-serif leading-none mb-4 tracking-tight">&ldquo;</div>
                      <p className="text-[0.88rem] text-text leading-[1.78] mb-6 flex-1">
                        {t.quote}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center text-[0.75rem] font-extrabold text-primary shrink-0">
                          {t.initials}
                        </div>
                        <div>
                          <div className="text-[0.85rem] font-bold text-text">{t.name}</div>
                          <div className="text-[0.73rem] text-text3">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls — only shown when there are multiple pages */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-7">
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Previous"
                  className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-text2 hover:text-text hover:border-primary-border transition-colors duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to page ${i + 1}`}
                    >
                      <span
                        className={[
                          "block rounded-full transition-all duration-250",
                          i === page
                            ? "w-6 h-2.5 bg-text"
                            : "w-2.5 h-2.5 bg-border2 hover:bg-text3",
                        ].join(" ")}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  aria-label="Next"
                  className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-text2 hover:text-text hover:border-primary-border transition-colors duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <TestimonialModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
