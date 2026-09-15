import Hero from './components/Hero'
import Marquee from './components/Marquee'
import FeaturedProjects from './components/FeaturedProjects'
import CTASection from './components/CTASection'
import { skillsRow1, skillsRow2 } from './data/content'

export default function App() {
  return (
    <main>
      <Hero />
      <Marquee direction="left" items={skillsRow1} />
      <FeaturedProjects />
      <Marquee direction="right" items={skillsRow2} />
      <CTASection />
    </main>
  )
}
