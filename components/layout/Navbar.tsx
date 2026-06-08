"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import navData from "@/store/navigation.json"
import siteData from "@/store/site.json"

export default function Navbar() {
  const { theme, syncTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    syncTheme()
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleThemeChange = () => syncTheme()
    if (theme === "system") mediaQuery.addEventListener("change", handleThemeChange)
    return () => mediaQuery.removeEventListener("change", handleThemeChange)
  }, [syncTheme, theme])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = () => { setMenuOpen(false); setAboutOpen(false) }

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-[100] h-16 max-md:h-14 flex items-center justify-between px-4 sm:px-6",
          "bg-nav-bg backdrop-blur-[12px] border-b transition-[border-bottom-color] duration-200 ease-in-out",
          scrolled ? "border-border" : "border-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <a href="#" className="inline-flex items-center gap-2.5 font-extrabold text-[1.3rem] text-text no-underline">
          <span className="w-[30px] h-[30px] rounded-lg bg-primary text-white flex items-center justify-center text-[0.75rem] font-extrabold">
            {siteData.initials}
          </span>
          {siteData.handle}
        </a>

        {/* Desktop nav links */}
        <ul className="flex items-center gap-0.5 list-none max-md:hidden">
          {navData.links.map((link) => (
            <li key={link.label} className="relative group">
              <a
                href={link.href}
                className="inline-flex items-center gap-1 py-[6px] px-3 text-[0.85rem] font-semibold text-text2 no-underline rounded-lg transition-[color,background] duration-[180ms] hover:text-text hover:bg-card2 cursor-pointer"
              >
                {link.label}
                {link.dropdown && (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                )}
              </a>
              {link.dropdown && (
                <div className="absolute top-[calc(100%+1px)] left-1/2 -translate-x-1/2 bg-card border border-border2 rounded-xl p-2 min-w-[220px] shadow-[var(--shadow-md)] opacity-0 pointer-events-none transition-opacity duration-[150ms] z-[200] group-hover:opacity-100 group-hover:pointer-events-auto">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block py-[10px] px-[14px] rounded-lg no-underline transition-[background] duration-[150ms] hover:bg-card2"
                    >
                      <div className="font-bold text-[0.83rem] text-text mb-0.5">{item.label}</div>
                      <div className="text-[0.75rem] text-text3">{item.description}</div>
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a href={siteData.resumeUrl} className="btn-ghost-sm max-md:!hidden">My Resume</a>
          <a href="#contact" className="btn-primary-sm max-md:!hidden">Hire Me ↗</a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-card2 transition-colors duration-150"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[2px] bg-text rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              className="block w-5 h-[2px] bg-text rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[2px] bg-text rounded-full origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[min(320px,90vw)] bg-card border-l border-border flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-divider shrink-0">
                <a href="#" onClick={closeMenu} className="inline-flex items-center gap-2.5 font-extrabold text-[1.3rem] text-text no-underline">
                  <span className="w-[30px] h-[30px] rounded-lg bg-primary text-white flex items-center justify-center text-[0.75rem] font-extrabold">
                    {siteData.initials}
                  </span>
                  {siteData.handle}
                </a>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card2 transition-colors duration-150 text-text2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M2 2l12 12M14 2L2 14" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navData.links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.25 }}
                  >
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => setAboutOpen((v) => !v)}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[0.93rem] font-semibold text-text2 hover:text-text hover:bg-card2 transition-[color,background] duration-150"
                        >
                          {link.label}
                          <motion.svg
                            animate={{ rotate: aboutOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"
                          >
                            <path d="M4 6l4 4 4-4" />
                          </motion.svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {aboutOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 pl-3 border-l border-divider py-1 mb-1">
                                {link.dropdown.map((item) => (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="block px-3 py-2.5 rounded-lg no-underline hover:bg-card2 transition-colors duration-150"
                                  >
                                    <div className="text-[0.85rem] font-bold text-text">{item.label}</div>
                                    <div className="text-[0.74rem] text-text3 mt-[2px]">{item.description}</div>
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center px-3 py-3 rounded-xl text-[0.93rem] font-semibold text-text2 no-underline hover:text-text hover:bg-card2 transition-[color,background] duration-150"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="px-4 pb-8 pt-4 border-t border-divider shrink-0 flex flex-col gap-2.5"
              >
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="btn-primary-sm w-full text-center justify-center"
                >
                  Hire Me ↗
                </a>
                <a
                  href={siteData.resumeUrl}
                  onClick={closeMenu}
                  className="btn-ghost-sm w-full text-center justify-center"
                >
                  My Resume
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
