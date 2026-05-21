'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteLogo } from '@/components/site-logo'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navLinks = [
    { href: '/', label: 'Állásaink' },
    { href: '#categories', label: 'Kategóriák' },
    { href: '#about', label: 'Rólunk' },
    { href: '#faq', label: 'FAQ' },
    { href: '#ugyfel', label: 'Ügyfélkapu' },
  ]

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-border bg-card/95 shadow-sm backdrop-blur-md'
          : 'border-b border-border/60 bg-card/85 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <SiteLogo className="h-14 w-32" priority />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons & Theme Toggle */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-foreground"
            aria-label={isDark ? 'Világos mód' : 'Sötét mód'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <Link href="/bejelentkezes">
            <Button variant="ghost" className="font-medium">
              Bejelentkezés
            </Button>
          </Link>
          <Link href="/regisztracio">
            <Button className="bg-primary font-semibold text-primary-foreground hover:bg-cta">
              Regisztráció
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
            aria-label={isDark ? 'Világos mód' : 'Sötét mód'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-card px-4 py-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link href="/bejelentkezes" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start font-medium">
                Bejelentkezés
              </Button>
            </Link>
            <Link href="/regisztracio" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary font-semibold text-primary-foreground hover:bg-cta">
                Regisztráció
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
