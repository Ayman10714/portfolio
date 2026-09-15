import './Marquee.css'

interface MarqueeProps {
  direction: 'left' | 'right'
  items: string[]
}

function Row({ direction, items }: MarqueeProps) {
  const text = items.join(' \u2022 ') + ' \u2022 '
  return (
    <div className={`marquee-row ${direction === 'right' ? 'reverse' : ''}`}>
      <div className="marquee--textwrapper-hold">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}

export default function Marquee({ direction, items }: MarqueeProps) {
  const reversed = direction === 'right'
  return (
    <section className={`marquee-section ${reversed ? 'is--reversed-marquee' : ''}`}>
      <div className="marquee-frame marquee-frame--left" aria-hidden="true" />
      <div className="marquee-frame marquee-frame--right" aria-hidden="true" />
      <div className="marquee-rows">
        <Row direction={direction} items={items} />
        <Row direction={reversed ? 'left' : 'right'} items={items} />
      </div>
    </section>
  )
}