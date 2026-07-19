import siteData from "@/store/site.json"
import navData from "@/store/navigation.json"
import { FaFacebook, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa"
import type { ReactNode } from "react"

const socialLabels: Record<string, ReactNode> = {
  facebook:  <FaFacebook size={14} />,
  instagram: <FaInstagram size={14} />,
  github:    <FaGithub size={14} />,
  linkedin:  <FaLinkedinIn size={14} />,
}

const colHeading = "text-[0.82rem] font-bold text-text mb-4 uppercase tracking-[0.06em]"

export default function Footer() {
  return (
    <footer className="relative z-[1] bg-bg border-t border-border pt-10 sm:pt-[60px]">
      <div className="wrap">
        {/* Top grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1.4fr] gap-8 sm:gap-12 pb-10 sm:pb-12 max-lg:grid-cols-2 max-sm:grid-cols-1">

          {/* Brand */}
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 font-extrabold text-base text-text no-underline mb-3.5"
            >
              <span className="w-[30px] h-[30px] rounded-lg bg-primary text-white inline-flex items-center justify-center text-[0.75rem] font-extrabold">
                {siteData.initials}
              </span>
              {siteData.handle}
            </a>
            <p className="text-[0.82rem] text-text2 leading-[1.7] max-w-[280px] mb-5 mt-1">
              {siteData.footerDescription}
            </p>

            {/* Socials */}
            <div className="flex gap-2 flex-wrap">
              {Object.entries(siteData.socials).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  target="blank"
                  className="w-[34px] h-[34px] rounded-lg bg-card border border-border flex items-center justify-center text-text2 no-underline transition-[border-color,background,color] duration-[180ms] hover:border-primary-border hover:bg-primary-light hover:text-primary"
                >
                  {socialLabels[key] ?? <span className="text-[0.78rem] font-bold">{key[0].toUpperCase()}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Footer columns from navigation.json */}
          {navData.footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className={colHeading}>{col.heading}</h4>
              <ul className="list-none flex flex-col gap-[9px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.83rem] text-text2 no-underline transition-colors duration-[180ms] hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get in Touch */}
          <div>
            <h4 className={colHeading}>Get in Touch</h4>
            <p className="text-[0.8rem] text-text2 leading-[1.6]">
              Available for freelance projects, full-time roles, and collaborations. Let&apos;s build something great together.
            </p>
            <a
              href={`mailto:${siteData.email}`}
              className="inline-flex items-center gap-1.5 text-[0.82rem] text-primary no-underline font-semibold"
            >
              📧 {siteData.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-5 flex justify-center items-center">
          <p className="text-[0.77rem] text-text3">{siteData.copyright}</p>
        </div>
        
        {/* <div className="border-t border-border py-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-[0.77rem] text-text3">{siteData.copyright}</p>
          <div className="flex gap-5">
            {["Privacy Policy"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[0.77rem] text-text3 no-underline transition-colors duration-[180ms] hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
        </div> */}
      </div>
    </footer>
  )
}
