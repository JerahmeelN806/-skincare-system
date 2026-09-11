import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export interface NavProps {
  items: string[]
}

const navRoutes: Record<string, string> = {
  Home: '/',
  Shop: '/products',
  Categories: '/categories',
  About: '/about',
  Blog: '/blog',
  Contact: '/contact',
}

export function Nav({ items }: NavProps) {
  return (
    <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
      {items.map((item) => (
        <NavLink
          key={item}
          to={navRoutes[item] ?? '/'}
          end={item === 'Home'}
          className={({ isActive }) => `group relative py-2 text-sm font-medium transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-ink/75'}`}
        >
          {({ isActive }) => <><span>{item}</span><motion.span initial={false} animate={{ scaleX: isActive ? 1 : 0 }} whileHover={{ scaleX: 1 }} className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-sage" /></>}
        </NavLink>
      ))}
    </nav>
  )
}
