import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export interface HeroImageSources { bottle: string; oil: string; plant: string }
export interface HeroProps { images?: HeroImageSources }

const defaultImages: HeroImageSources = {
  bottle: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=90',
  oil: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=90',
  plant: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=90',
}
const interaction = { whileHover: { scale: 1.035 }, whileTap: { scale: 0.97 }, transition: { type: 'spring' as const, stiffness: 430, damping: 18 } }
function Icon({ name, size }: { name: 'arrow' | 'sparkle'; size: number }) { const path = name === 'arrow' ? <path d="M6 18 18 6M9 6h9v9" /> : <path d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3Z" />; return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg> }

export function Hero({ images = defaultImages }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-copy-line span', { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12 })
        .fromTo('.hero-support', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 }, '-=0.35')
        .fromTo('.hero-visual', { y: 36, opacity: 0, scale: 0.975 }, { y: 0, opacity: 1, scale: 1, duration: 0.9 }, '-=0.45')
    }, heroRef)
    return () => context.revert()
  }, [])
  return <section id="home" ref={heroRef} className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-12 sm:px-8 md:min-h-[calc(100vh-128px)] md:grid-cols-[0.92fr_1.08fr] md:gap-12 md:py-16"><div className="order-2 z-10 max-w-[590px] md:order-1 md:pb-6"><div className="hero-support mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45"><span className="text-sage"><Icon name="sparkle" size={14} /></span> Skincare System</div><h1 className="font-display text-[clamp(2.9rem,5.1vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.065em] text-ink"><div className="hero-copy-line"><span>Healthy products</span></div><div className="hero-copy-line"><span>that age you</span></div><div className="hero-copy-line"><span>backwards.</span></div></h1><p className="hero-support mt-7 max-w-[450px] text-[15px] leading-7 text-ink/65 sm:text-base">Thoughtfully formulated skincare made from nature’s finest ingredients, designed to nourish your skin and bring out its natural glow.</p><motion.a {...interaction} href="#shop" className="hero-support mt-8 inline-flex items-center gap-3 rounded-full bg-sage px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(74,93,69,0.18)]">Shop collection <Icon name="arrow" size={17} /></motion.a></div><div className="hero-visual order-1 relative mx-auto w-full max-w-[650px] md:order-2"><div className="relative aspect-[1.07/1] overflow-hidden rounded-[2rem] bg-[#d9c9ae] sm:rounded-[2.5rem]"><div className="absolute inset-x-0 bottom-0 h-[37%] bg-[#c5a979]" /><div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.38),transparent_42%)]" /><img src={images.oil} alt="Organic coconut body oil bottle" className="absolute bottom-[7%] left-[33%] z-20 h-[76%] w-[33%] object-cover object-center mix-blend-multiply drop-shadow-[10px_18px_14px_rgba(56,43,22,.25)]" /><img src={images.bottle} alt="Natural skincare bottle" className="absolute bottom-[8%] left-[10%] z-10 h-[58%] w-[24%] object-cover object-center mix-blend-multiply drop-shadow-[8px_15px_10px_rgba(56,43,22,.22)]" /><img src={images.plant} alt="Small potted succulent" className="absolute bottom-[5%] right-[5%] z-10 h-[39%] w-[31%] object-cover object-center mix-blend-multiply drop-shadow-[8px_15px_10px_rgba(56,43,22,.2)]" /><div className="absolute right-5 top-5 z-30 rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sage backdrop-blur-sm">Natural care</div></div><div className="absolute -bottom-4 -left-2 hidden h-20 w-20 rounded-full border border-sage/20 md:block" /></div></section>
}
