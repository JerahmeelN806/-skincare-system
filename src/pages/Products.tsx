import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { apiClient, ApiError, type Product } from '../lib/api'
import { productCategories } from '../data/products'

type CategoryFilter = 'All' | (typeof productCategories)[number]

export function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true)
      apiClient.products(searchTerm, selectedCategory)
        .then(({ products }) => { setProducts(products); setError('') })
        .catch((cause) => setError(cause instanceof ApiError ? cause.message : 'Unable to load products.'))
        .finally(() => setLoading(false))
    }, 250)
    return () => window.clearTimeout(timer)
  }, [searchTerm, selectedCategory])

  const categories: CategoryFilter[] = ['All', ...productCategories]
  const gridClasses = 'mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5'

  return (
    <main className="bg-cream px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">All Products</h1>
        <p className="mt-3 text-sm text-ink/55">{loading ? 'Loading products…' : `${products.length} ${products.length === 1 ? 'product' : 'products'}`}</p>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex h-12 w-full max-w-md rounded-full bg-white px-5">
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="w-full bg-transparent text-sm text-ink outline-none" placeholder="Search products" aria-label="Search products" />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedCategory === category ? 'bg-sage text-white' : 'bg-white text-ink/70'}`}>{category}</button>)}
          </div>
        </div>
        {error ? <p className="mt-10 rounded-xl bg-red-50 p-5 text-red-700">{error}</p> : loading ? <div className={gridClasses}>{Array.from({ length: 8 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse rounded-xl bg-white" />)}</div> : products.length ? <div className={gridClasses}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="mt-12 rounded-xl bg-white px-6 py-10 text-center text-ink/60">No products found</p>}
      </div>
    </main>
  )
}
