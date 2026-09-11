export interface PromoBannerProps {
  message?: string
}

export function PromoBanner({ 
  message = 'Free deliveries on all orders within Nigeria' 
}: PromoBannerProps) {
  return (
    <div className="bg-sage px-4 py-2.5 text-center text-xs font-medium tracking-[0.015em] text-white sm:text-sm">
      {message}
    </div>
  )
}
