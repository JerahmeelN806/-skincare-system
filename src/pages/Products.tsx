import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/ProductCard'
import { productCategories, products, type ProductCategory } from '../data/products'

type CategoryFilter = 'All' | ProductCategory

export function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }), [searchTerm, selectedCategory])
  const categories: CategoryFilter[] = ['All', ...productCategories]

  return <main className="bg-cream px-5 py-16 sm:px-8 md:py-24">
    <div className="mx-auto max-w-[1280px]">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">All Products</h1>
        <p className="mt-3 text-sm text-ink/55">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p>
      </motion.div>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-12 w-full max-w-md items-center gap-3 rounded-full bg-white px-5 text-ink/55 shadow-sm focus-within:ring-2 focus-within:ring-sage/30"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.7" /><path d="m15.2 15.2 4.3 4.3" /></svg><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/45" placeholder="Search products" aria-label="Search products" /></label>
        <div className="flex flex-wrap gap-2" aria-label="Product categories">{categories.map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedCategory === category ? 'bg-sage text-white shadow-sm' : 'bg-white text-ink/70 hover:bg-sage/10 hover:text-sage'}`}>{category}</button>)}</div>
      </div>
      {filteredProducts.length ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product, index) => <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.04 }}><ProductCard product={product} /></motion.div>)}</div> : <p className="mt-12 rounded-xl border border-black/[0.08] bg-white px-6 py-10 text-center text-ink/60">No products found</p>}
    </div>
  </main>
}
