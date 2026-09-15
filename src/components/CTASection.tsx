import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagicCard from './MagicCard'
import { contactLinks } from '../data/content'
import './CTASection.css'

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={sectionRef} className="cta-section">
      <motion.div
        className="cta-bg"
        style={{ backgroundImage: "url('/night-sky.png')", y: bgY }}
      />
      <div className="cta-fade" />

      <div className="cta-card-wrap">
        <img src="/llama.png" alt="" aria-hidden="true" className="cta-mascot" />
        <MagicCard className="cta-card">
          <p className="cta-eyebrow">Get in touch</p>
          <h2>Let's build something together</h2>
          <p className="cta-copy">
            I'm always up for a chat about full-stack projects, freelance work,
            or a role where I can keep shipping things end to end.
          </p>
          <ul className="cta-links">
            {contactLinks.map((link, i) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                {i < contactLinks.length - 1 && <span className="cta-dot">&bull;</span>}
              </li>
            ))}
          </ul>
        </MagicCard>
      </div>
    </section>
  )
}
