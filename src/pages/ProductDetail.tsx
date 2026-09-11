import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProductCard } from '../components/ProductCard'
import { formatNaira, products } from '../data/products'
import { useCartStore } from '../store/cartStore'

gsap.registerPlugin(ScrollTrigger)

export function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const descriptionRef = useRef<HTMLElement>(null)
  const relatedRef = useRef<HTMLElement>(null)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useLayoutEffect(() => {
    if (!product) return
    const context = gsap.context(() => {
      ;[descriptionRef.current, relatedRef.current].forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 85%', once: true } })
      })
    })
    return () => context.revert()
  }, [product])

  if (!product) return <main className="grid min-h-[55vh] place-items-center bg-cream px-5 text-center"><div><h1 className="font-display text-3xl font-bold text-ink">Product not found</h1><Link to="/products" className="mt-5 inline-flex rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white">Back to Products</Link></div></main>

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 4)
  const onAddToCart = () => {
    addItem({ id: product.id, name: product.name, image: product.imageUrl, price: product.price }, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return <main className="bg-cream px-5 py-12 sm:px-8 md:py-20">
    <div className="mx-auto max-w-[1120px]">
      <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <img src={product.imageUrl} alt={product.name} className="aspect-square w-full rounded-2xl object-cover shadow-sm" />
        <div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-sage">Skincare System</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">{product.name}</h1><p className="mt-5 text-2xl font-semibold text-sage">{formatNaira(product.price)}</p><p className="mt-5 leading-7 text-ink/65">{product.description}</p><div className="mt-8 flex items-center gap-3"><span className="text-sm font-semibold text-ink/70">Quantity</span><div className="inline-flex items-center rounded-full border border-black/10 bg-white"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 text-lg text-ink/70" aria-label="Decrease quantity">−</button><span className="w-6 text-center text-sm font-semibold">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="h-10 w-10 text-lg text-ink/70" aria-label="Increase quantity">+</button></div></div><button onClick={onAddToCart} className="mt-4 w-full rounded-full bg-sage px-6 py-4 text-sm font-semibold text-white transition hover:bg-sage/90 sm:w-auto">{added ? 'Added!' : 'Add to Cart'}</button><Link to="/products" className="mt-3 block w-full rounded-full bg-black/[0.06] px-6 py-4 text-center text-sm font-semibold text-ink transition hover:bg-black/[0.1] sm:w-auto">Back to Products</Link></div>
      </section>
      <section ref={descriptionRef} className="mt-28 max-w-3xl border-t border-black/[0.08] pt-14"><h2 className="font-display text-3xl font-extrabold tracking-[-0.04em] text-ink">Description</h2><div className="mt-5 space-y-4 leading-7 text-ink/65"><p>{product.description} Made with thoughtful, skin-loving ingredients, it fits easily into your everyday ritual.</p><p>Massage a small amount into clean skin and give it a moment to absorb. Use regularly for skin that feels nourished, balanced, and cared for.</p></div></section>
      <section ref={relatedRef} className="mt-28"><div className="flex items-end justify-between gap-4"><div><h2 className="font-display text-3xl font-extrabold tracking-[-0.04em] text-ink">You Might Also Like</h2><p className="mt-2 text-sm text-ink/55">More natural care for your routine.</p></div><Link to="/products" className="text-sm font-semibold text-sage hover:underline">View all</Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} compact />)}</div></section>
    </div>
  </main>
}
