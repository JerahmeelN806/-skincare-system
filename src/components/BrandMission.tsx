import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function BrandMission() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true } })
    }, sectionRef)
    return () => context.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-2xl bg-white md:grid-cols-2">
        <div className="order-2 flex min-h-[420px] flex-col justify-center px-7 py-14 sm:px-12 md:order-1 md:px-16">
          <p className="text-sm font-medium text-sage">Skincare System</p>
          <h2 className="mt-4 max-w-[470px] font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] text-ink sm:text-5xl">Let your skin&apos;s health speak for itself!</h2>
          <p className="mt-6 max-w-[480px] leading-7 text-ink/60">Taking care of you is a lifestyle. Our all-green products are safe for you and the environment. You are sure to enjoy your skincare journey with our products.</p>
          <Link to="/products" className="mt-8 w-fit rounded-md bg-sage px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sage/90">Shop</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1300&q=90" alt="Natural skincare products" className="order-1 h-[360px] w-full object-cover md:order-2 md:h-full md:min-h-[560px]" />
      </div>
    </section>
  )
}
