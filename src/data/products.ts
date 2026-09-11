export const productCategories = ['Skin Care', 'Body Care', 'Treatments'] as const
export type ProductCategory = (typeof productCategories)[number]

export type Product = {
  id: string
  name: string
  price: number
  rating: number
  imageUrl: string
  description: string
  category: ProductCategory
}

export const products: Product[] = [
  { id: 'hydra-serum', name: 'Hydra Dew Serum', price: 2000, rating: 5, imageUrl: '/products/product-1.jpg', description: 'A lightweight daily serum that floods skin with lasting hydration and a soft, natural glow.', category: 'Treatments' },
  { id: 'shea-butter', name: 'Whipped Shea Butter', price: 2800, rating: 4, imageUrl: '/products/product-2.jpg', description: 'Rich Nigerian shea butter blended into a smooth, comforting moisturiser for dry skin.', category: 'Body Care' },
  { id: 'aloe-gel', name: 'Calm Aloe Gel', price: 1800, rating: 4, imageUrl: '/products/product-3.jpg', description: 'A cooling aloe-based gel that leaves sensitive or sun-exposed skin feeling soothed.', category: 'Skin Care' },
  { id: 'vitamin-c', name: 'Vitamin C Brightener', price: 3500, rating: 5, imageUrl: '/products/product-4.jpg', description: 'A brightening treatment formulated to help skin look more even, fresh, and luminous.', category: 'Treatments' },
  { id: 'cloud-cream', name: 'Cloud Face Cream', price: 3200, rating: 4, imageUrl: '/products/product-5.jpg', description: 'A pillowy cream that seals in moisture without leaving a heavy finish.', category: 'Skin Care' },
  { id: 'golden-oil', name: 'Golden Body Oil', price: 2600, rating: 5, imageUrl: '/products/product-6.jpg', description: 'A nourishing botanical body oil for skin that feels supple and beautifully conditioned.', category: 'Body Care' },
  { id: 'daily-cleanser', name: 'Daily Milk Cleanser', price: 2200, rating: 4, imageUrl: '/products/product-7.jpg', description: 'A gentle cream cleanser that lifts away the day while keeping your skin comfortable.', category: 'Skin Care' },
  { id: 'moon-cream', name: 'Moonlight Night Cream', price: 4000, rating: 5, imageUrl: '/products/product-8.jpg', description: 'A restorative night cream made for an indulgent final step in your evening routine.', category: 'Skin Care' },
  { id: 'rose-toner', name: 'Rosewater Toner', price: 1900, rating: 4, imageUrl: '/products/product-9.jpg', description: 'A refreshing floral toner that helps skin feel balanced after cleansing.', category: 'Skin Care' },
  { id: 'cocoa-balm', name: 'Cocoa Comfort Balm', price: 2400, rating: 5, imageUrl: '/products/product-10.jpg', description: 'A deeply moisturising balm with cocoa butter for dry areas that need extra care.', category: 'Body Care' },
  { id: 'clear-foam', name: 'Clear Start Foam', price: 2100, rating: 4, imageUrl: '/products/product-11.jpg', description: 'A soft, low-foam cleanser made to refresh skin without stripping its moisture.', category: 'Skin Care' },
  { id: 'lip-oil', name: 'Nourishing Lip Oil', price: 1500, rating: 5, imageUrl: '/products/product-12.jpg', description: 'A glossy, conditioning lip oil that keeps lips soft throughout the day.', category: 'Treatments' },
  { id: 'sun-veil', name: 'Sun Veil SPF 30', price: 3800, rating: 4, imageUrl: '/products/product-7.jpg', description: 'A comfortable everyday sunscreen with a sheer finish for your morning routine.', category: 'Skin Care' },
  { id: 'coffee-scrub', name: 'Coffee Body Scrub', price: 2700, rating: 5, imageUrl: '/products/product-13.jpg', description: 'A creamy exfoliating scrub that leaves skin feeling polished, smooth, and soft.', category: 'Body Care' },
  { id: 'green-mask', name: 'Green Clay Mask', price: 3000, rating: 4, imageUrl: '/products/product-14.jpg', description: 'A purifying clay mask for a weekly reset when skin feels congested or tired.', category: 'Treatments' },
  { id: 'silk-milk', name: 'Silk Body Milk', price: 2300, rating: 4, imageUrl: '/products/product-15.jpg', description: 'A fast-absorbing body lotion that gives skin a smooth, soft finish.', category: 'Body Care' },
  { id: 'eye-cream', name: 'Bright Eye Cream', price: 3600, rating: 5, imageUrl: '/products/product-16.jpg', description: 'A lightweight eye cream for a hydrated, rested-looking under-eye area.', category: 'Treatments' },
  { id: 'moringa-oil', name: 'Moringa Face Oil', price: 3300, rating: 4, imageUrl: '/products/product-17.jpg', description: 'A nutrient-rich facial oil that brings comfort and radiance to dry skin.', category: 'Treatments' },
  { id: 'honey-cleanser', name: 'Honey Gel Cleanser', price: 2500, rating: 5, imageUrl: '/products/product-18.jpg', description: 'A gentle golden gel cleanser that rinses clean while skin stays comfortable.', category: 'Skin Care' },
  { id: 'lavender-mist', name: 'Lavender Face Mist', price: 1700, rating: 4, imageUrl: '/products/product-7.jpg', description: 'A calming face mist for a quick moment of hydration whenever you need it.', category: 'Skin Care' },
]

export const formatNaira = (price: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price)
