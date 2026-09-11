import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const promos = [
  { badge: 'NEW ARRIVAL', title: <>Hand Cream<br />Collection</>, image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1200&q=90', badgeClass: 'text-sage' },
  { badge: 'LIMITED OFFER', title: <>25% off Hair<br />& Makeup!</>, description: "We're celebrating our 4th year in business! All hair and makeup products are on sale at 25% off.", image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=90', badgeClass: 'text-[#bd553f]' },
]

export function PromoBanners() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true } })
    }, sectionRef)
    return () => context.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream px-5 py-8 sm:px-8 md:py-12">
      <div className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-2">
        {promos.map((promo) => (
          <article key={promo.badge} className="relative min-h-[390px] overflow-hidden rounded-2xl bg-[#d9d2c5] sm:min-h-[440px]">
            <img src={promo.image} alt="Skincare collection" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-white/90 via-white/65 to-transparent" />
            <div className="relative flex h-full min-h-[390px] max-w-[310px] flex-col items-start justify-between p-7 sm:min-h-[440px] sm:p-9">
              <div><span className={`inline-flex bg-white/85 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] ${promo.badgeClass}`}>{promo.badge}</span><h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.05em] text-ink sm:text-4xl">{promo.title}</h2>{promo.description && <p className="mt-4 text-sm leading-6 text-ink/65">{promo.description}</p>}</div>
              <Link to="/products" className="bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-cream">Shop Now</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
