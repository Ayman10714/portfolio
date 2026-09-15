import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import MagicCard from './MagicCard'
import { projects } from '../data/content'
import './FeaturedProjects.css'

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const cloudUpY = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const cloudDownY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const visible = expanded ? projects : projects.slice(0, 3)
  const hidden = projects.slice(3)

  const toggle = () => {
    if (expanded) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setExpanded((v) => !v)
  }

  return (
    <section ref={sectionRef} className="projects-section">
      <motion.img
        className="projects-cloud projects-cloud--top"
        src="/cloud.png"
        alt=""
        aria-hidden="true"
        style={{ y: cloudUpY }}
      />
      <motion.img
        className="projects-cloud projects-cloud--bottom"
        src="/cloud.png"
        alt=""
        aria-hidden="true"
        style={{ y: cloudDownY }}
      />

      <div className="container">
        <div className="projects-heading">
          <img src="/enchantedbook.png" alt="" aria-hidden="true" className="projects-heading-icon" />
          <h2>Featured Projects</h2>
          <p>A handful of things I've built end to end — from REST APIs and cloud databases to the React front ends that talk to them.</p>
        </div>

        <div className="projects-grid">
          {visible.map((p, i) => (
            <div key={p.title} className="project-card-wrap breathing" style={{ animationDelay: `${i * 0.4}s` }}>
              <MagicCard className="project-card">
                <h3>{p.title}</h3>
                <p className="project-stack">{p.stack}</p>
                <p className="project-desc">{p.description}</p>
                <div className="project-links">
                  {p.demoLink && (
                    <a href={p.demoLink} target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Live demo
                    </a>
                  )}
                  {p.repoLink && (
                    <a href={p.repoLink} target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.1 3.1 0 00-.9-2.4c3-.3 6-1.5 6-6.6a5.1 5.1 0 00-1.4-3.5 4.8 4.8 0 00-.1-3.5s-1.1-.3-3.5 1.3a12.1 12.1 0 00-6.4 0C6.9 1.9 5.8 2.2 5.8 2.2a4.8 4.8 0 00-.1 3.5A5.1 5.1 0 004.3 9.2c0 5.1 3 6.3 6 6.6a3.1 3.1 0 00-.9 2.4V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Repo
                    </a>
                  )}
                </div>
              </MagicCard>
            </div>
          ))}
        </div>

        {hidden.length > 0 && (
          <>
            <AnimatePresence>
              {expanded && (
                <motion.div className="projects-grid projects-grid--extra">
                  {hidden.map((p, i) => (
                    <motion.div
                      key={p.title}
                      className="project-card-wrap"
                      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <MagicCard className="project-card">
                        <h3>{p.title}</h3>
                        <p className="project-stack">{p.stack}</p>
                        <p className="project-desc">{p.description}</p>
                        <div className="project-links">
                          {p.demoLink && <a href={p.demoLink} target="_blank" rel="noopener noreferrer">Live demo</a>}
                          {p.repoLink && <a href={p.repoLink} target="_blank" rel="noopener noreferrer">Repo</a>}
                        </div>
                      </MagicCard>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="projects-toggle-row">
              <button className="projects-toggle" onClick={toggle}>
                {expanded ? 'View less' : 'View more'}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
