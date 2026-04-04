import { Hero } from './hero'
import { Features } from './features'
import { Cta } from './cta'
import { Testimonials } from './testimonials'
import { Faq } from './faq'
import { LogoCloud } from './logo-cloud'

const sectionComponents: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  features: Features,
  cta: Cta,
  testimonials: Testimonials,
  faq: Faq,
  logoCloud: LogoCloud,
}

export function SectionRenderer({ sections }: { sections: any[] }) {
  if (!sections) return null
  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type]
        if (!Component) return null
        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
