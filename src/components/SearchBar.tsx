export interface SearchBarProps {
  mobile?: boolean
}

function SearchIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="10.7" cy="10.7" r="5.7" />
      <path d="m15.2 15.2 4.3 4.3" />
    </svg>
  )
}

export function SearchBar({ mobile = false }: SearchBarProps) {
  const sizing = mobile ? 'h-12 w-full' : 'h-11 w-[185px] lg:w-[215px]'

  return (
    <label
      className={`flex ${sizing} items-center gap-2 rounded-full bg-cream px-4 text-ink/55 transition focus-within:ring-2 focus-within:ring-sage/30`}
    >
      <SearchIcon size={mobile ? 19 : 18} />
      <input
        className={`${mobile ? '' : 'min-w-0'} w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/45`}
        placeholder="Search products"
        aria-label="Search products"
      />
    </label>
  )
}
