import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { products } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const featuredProducts = products.slice(0, 8)

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { autoAlpha: 0, y: 42 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
      })
    }, sectionRef)
    return () => context.revert()
  }, [])

  return (
    <section id="shop" ref={sectionRef} className="bg-cream px-5 py-20 sm:px-8 md:py-28" aria-labelledby="featured-products-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <h2 id="featured-products-heading" className="font-display text-3xl font-extrabold tracking-[-0.05em] text-ink sm:text-4xl">Featured Products</h2>
          <p className="mt-3 text-[15px] text-ink/55">Our best sellers for this week!</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="inline-flex rounded-full border border-sage px-6 py-3 text-sm font-semibold text-sage transition hover:bg-sage hover:text-white">View all products</Link>
        </div>
      </div>
    </section>
  )
}
