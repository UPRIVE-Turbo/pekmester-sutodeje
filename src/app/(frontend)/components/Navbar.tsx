'use client'

import { Grains, List, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

type NavLink = {
  label: string
  href: string
}

export default function Navbar({ siteName, navLinks }: { siteName: string; navLinks: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`absolute inset-0 bg-cream/80 backdrop-blur-md border-b border-wood/10 -z-10 transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-100'
        }`}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="font-serif font-bold text-xl md:text-2xl text-wood flex items-center gap-2 group">
          <Grains weight="fill" className="text-wheat transition-transform duration-500 group-hover:rotate-12" size={24} />
          {siteName}
        </a>

        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-wood transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-wood hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-wood p-2"
          aria-label="Menü"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-cream border-b border-wood/10 flex flex-col items-center py-6 gap-6 origin-top transition-transform duration-300 ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-lg font-medium"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
