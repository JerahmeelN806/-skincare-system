export const productCategories = ['Skin Care', 'Body Care', 'Treatments'] as const
export type ProductCategory = (typeof productCategories)[number]
export const formatNaira = (priceInKobo: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(priceInKobo / 100)
