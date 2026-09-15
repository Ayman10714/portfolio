import { useEffect, useRef, useState } from 'react'
import HeroParticles from './HeroParticles'
import { heroHighlights } from '../data/content'
import './Hero.css'

const HEADLINE = "Hello there, I'm a full-stack developer and problem solver."

export default function Hero() {
  const flameRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [loaded, setLoaded] = useState(false)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const raf = useRef<number>()

  useEffect(() => {
    let cancelled = false
    const base = new Image()
    const flame = new Image()
    base.src = '/transparent-base.png'
    flame.src = '/transparent-flame.png'
    Promise.all([
      new Promise((res) => { base.onload = res; base.onerror = res }),
      new Promise((res) => { flame.onload = res; flame.onerror = res }),
    ]).then(() => { if (!cancelled) setLoaded(true) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const el = flameRef.current
    if (!el) return

    const setFromClient = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect()
      mouse.current = {
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      }
    }

    const onMouseMove = (e: MouseEvent) => setFromClient(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) setFromClient(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      el.style.setProperty('--x', `${smooth.current.x}%`)
      el.style.setProperty('--y', `${smooth.current.y}%`)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return
    const words = HEADLINE.split(' ')
    heading.textContent = ''
    words.forEach((word, i) => {
      const span = document.createElement('span')
      span.textContent = word
      span.className = 'word-reveal'
      span.style.animationDelay = `${i * 0.05}s`
      heading.appendChild(span)
      heading.appendChild(document.createTextNode(' '))
    })
  }, [])

  return (
    <section className={`hero ${loaded ? 'is-loaded' : 'is-loading'}`}>
      <HeroParticles />

      <div className="hero-media">
        <div
          className="hero-reveal-img hero-reveal-img--base"
          style={{ backgroundImage: "url('/transparent-base.png')" }}
        />
        <div
          ref={flameRef}
          className="hero-reveal-img hero-reveal-img--flame"
          style={{ backgroundImage: "url('/transparent-flame.png')" }}
        />
        {!loaded && <div className="hero-skeleton" />}
      </div>

      <div className="hero-bigname" aria-hidden="true">Ansari</div>

      <div className="hero-badges hero-badges--left">
        {heroHighlights.left.map((label, i) => (
          <span key={label} className="hero-badge" style={{ animationDelay: `${0.6 + i * 0.15}s` }}>
            {label}
          </span>
        ))}
      </div>
      <div className="hero-badges hero-badges--right">
        {heroHighlights.right.map((label, i) => (
          <span key={label} className="hero-badge" style={{ animationDelay: `${0.6 + i * 0.15}s` }}>
            {label}
          </span>
        ))}
      </div>

       <div className="hero-logo">
       <img src="/logo.png" alt="Mohd Ayman Ansari" />
       </div>
       
      <a href="/Mohd_Ayman_Ansari_Resume.pdf" className="cta-button cta-button--corner" download>
        <span className="cta-button__fill" />
        <span className="cta-button__text">View Resume</span>
        <span className="cta-button__icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>

      <span className="hero-signature">Mohd Ayman Ansari</span>

      <div className="container hero-content">
        <h1 ref={headingRef} className="hero-heading">{HEADLINE}</h1>
      </div>
    </section>
  )
}