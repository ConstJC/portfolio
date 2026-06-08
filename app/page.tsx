import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingActions from "@/components/layout/FloatingActions"
import Hero from "@/components/sections/Hero"
import Ways from "@/components/sections/Ways"
import Steps from "@/components/sections/Steps"
import Projects from "@/components/sections/Projects"
import ExperienceEducation from "@/components/sections/ExperienceEducation"
import Services from "@/components/sections/Services"
import Testimonials from "@/components/sections/Testimonials"
import Faq from "@/components/sections/Faq"
import Cta from "@/components/sections/Cta"

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <div className="sep" />
        <Ways />
        <div className="sep" />
        {/* <Stats />
        <div className="sep" /> */}
        <Steps />
        <div className="sep" />
        <Projects />
        <div className="sep" />
        <ExperienceEducation />
        <div className="sep" />
        <Services />
        <div className="sep" />
        <Testimonials />
        <div className="sep" />
        <Faq />
        <div className="sep" />
        <Cta />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
