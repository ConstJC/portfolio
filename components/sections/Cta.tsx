"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Mail, MapPin, Clock } from "lucide-react"
import emailjs from "@emailjs/browser"
import siteData from "@/store/site.json"

const EMAILJS_ENABLED = process.env.NEXT_PUBLIC_EMAILJS_ENABLED === "true"
const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

const INTENTS = [
  "Collaboration",
  "Help Request",
  "Question",
  "Freelance Work",
  "Feedback",
  "Other",
] as const

type Intent = (typeof INTENTS)[number]

interface FormValues {
  name: string
  email: string
  intent: Intent
  message: string
}

const labelClass = "block text-[0.8rem] font-bold text-text mb-[7px] tracking-[0.01em]"
const inputClass = "w-full py-[10px] px-[14px] bg-card2 border rounded-lg text-[0.85rem] text-text font-sans transition-[border-color,box-shadow] duration-[180ms] c-input"
const errorClass = "mt-[5px] text-[0.73rem] text-red-500"

const VP = { once: true, margin: "-80px" }

export default function Cta() {
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { intent: "Collaboration" } })

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedIntent = watch("intent")

  const onSubmit = async (data: FormValues) => {
    setSendError(null)
    if (!EMAILJS_ENABLED) {
      setSendError("Contact form is currently disabled. Please email me directly.")
      return
    }
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name:    data.name,
          email:   data.email,
          title:   data.intent,
          message: data.message,
          time:    new Date().toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" }),
        },
        PUBLIC_KEY
      )
      setSubmitted(true)
      reset()
    } catch {
      setSendError("Something went wrong. Please try again or email me directly.")
    }
  }

  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 relative z-[1] overflow-hidden" id="contact">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_65%)] pointer-events-none z-0" />

      <div className="wrap relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 gap-8 lg:gap-14 items-start contact-grid"
        >
          {/* ── LEFT INFO PANEL ── */}
          <div className="pt-2">
            <div className="section-eyebrow">Let&apos;s Connect</div>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-[1.15] text-text mb-4">
              Have an idea in mind?<br />
              <span className="text-primary">Let&apos;s build it together.</span>
            </h2>
            <p className="text-[0.88rem] text-text2 leading-[1.75] mb-8 max-w-[360px]">
              Need a website, dashboard, booking system or custom software?
              Send me a message.
            </p>

            {/* Info tiles */}
            <div className="flex flex-col gap-3 mb-9">
              {[
                { icon: <Mail size={15} />, label: "Email", value: siteData.email },
                { icon: <MapPin size={15} />, label: "Location", value: siteData.location },
                { icon: <Clock size={15} />, label: "Availability", value: "Available Immediately" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-3 px-4 bg-card border border-border2 rounded-[10px]">
                  <span className="w-8 h-8 rounded-lg shrink-0 bg-primary-light border border-primary-border flex items-center justify-center text-primary">
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-[0.68rem] font-bold text-text3 uppercase tracking-[0.08em] mb-px">{item.label}</div>
                    <div className="text-[0.82rem] font-semibold text-text">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2.5">
              <div className="flex-1 h-px bg-divider" />
              <span className="text-[0.63rem] font-bold tracking-[0.12em] uppercase text-text3 whitespace-nowrap">
                OR USE THE FORM
              </span>
              <div className="flex-1 h-px bg-divider" />
            </div>
          </div>

          {/* ── RIGHT FORM PANEL ── */}
          <div className="bg-card border border-border2 rounded-[18px] py-6 px-4 sm:py-8 sm:px-7 shadow-[var(--shadow-md)]">
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center gap-3.5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-[1.5rem]" style={{ background: "var(--success-light)", border: "1px solid var(--success-border)", color: "var(--success)" }}>
                  ✓
                </div>
                <p className="font-bold text-[1.05rem] text-text">Message sent!</p>
                <p className="text-[0.83rem] text-text2 max-w-[300px]">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-1 text-[0.8rem] text-primary bg-transparent border-0 cursor-pointer font-sans font-bold"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <p className="text-[0.78rem] text-text3 mb-[22px] leading-[1.6]">
                  Fill out the form and I&apos;ll get back to you as soon as possible.
                </p>

                {/* Name */}
                <div className="mb-[18px]">
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    {...register("name", { required: "Name is required" })}
                    className={`${inputClass} ${errors.name ? "border-[#ef4444]" : "border-border2"}`}
                  />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-[18px]">
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                    })}
                    className={`${inputClass} ${errors.email ? "border-[#ef4444]" : "border-border2"}`}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                {/* Intent */}
                <div className="mb-[18px]">
                  <label className={labelClass}>What can I help with?</label>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3 mt-2.5">
                    {INTENTS.map((opt) => {
                      const active = selectedIntent === opt
                      return (
                        <label
                          key={opt}
                          className={[
                            "flex items-center gap-[9px] cursor-pointer text-[0.83rem] select-none",
                            "py-[7px] px-[10px] rounded-lg border transition-[background,border-color] duration-[150ms]",
                            active ? "text-text bg-primary-light border-primary-border" : "text-text2 bg-transparent border-transparent",
                          ].join(" ")}
                        >
                          <span
                            onClick={() => setValue("intent", opt)}
                            className={[
                              "shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-[150ms] cursor-pointer",
                              active ? "border-primary bg-primary" : "border-border2 bg-transparent",
                            ].join(" ")}
                          >
                            {active && <span className="w-[5px] h-[5px] rounded-full bg-white" />}
                          </span>
                          <input type="radio" value={opt} {...register("intent", { required: true })} className="hidden" />
                          {opt}
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-[22px]">
                  <label className={labelClass}>Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Message is too short" },
                    })}
                    className={`${inputClass} resize-y min-h-[120px] ${errors.message ? "border-[#ef4444]" : "border-border2"}`}
                  />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>

                {/* Send error */}
                {sendError && (
                  <p className="mb-4 text-[0.78rem] text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                    {sendError}
                  </p>
                )}

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-sm"
                    style={{
                      padding: "10px 24px",
                      fontSize: "0.88rem",
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? "Sending…" : "Send Message →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
