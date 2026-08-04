/**
 * Above-the-fold page title for routes that don't have a Hero.
 *
 * Deliberately a server component with no entrance animation: it carries the
 * page's only <h1> and its LCP text, so it must paint immediately rather than
 * start at opacity:0 waiting on hydration.
 */
interface PageHeaderProps {
  eyebrow: string
  title: string
  /** Rendered in the accent colour after the title. */
  titleAccent?: string
  description?: string
}

export default function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
}: PageHeaderProps) {
  return (
    <section className="pt-24 pb-2 sm:pt-32 sm:pb-6 relative z-[1]">
      <div className="wrap">
        <div className="section-eyebrow">{eyebrow}</div>
        <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-[1.08] text-text">
          {title}
          {titleAccent && <> <span className="text-primary">{titleAccent}</span></>}
        </h1>
        {description && (
          <p className="text-[0.92rem] text-text2 leading-[1.75] max-w-[620px] mt-4">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
