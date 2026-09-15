import { ReactNode, useRef } from 'react'
import './MagicCard.css'

interface MagicCardProps {
  children: ReactNode
  className?: string
}

export default function MagicCard({ children, className = '' }: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} className={`magic-card ${className}`} onMouseMove={handleMouseMove}>
      <div className="magic-card__glow" />
      <div className="magic-card__content">{children}</div>
    </div>
  )
}
