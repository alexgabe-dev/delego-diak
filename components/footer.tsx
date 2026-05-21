import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

const footerLinks = {
  company: [
    { label: 'Rólunk', href: '/rolunk' },
    { label: 'Karrier', href: '/karrier' },
    { label: 'Kapcsolat', href: '/kapcsolat' },
    { label: 'Blog', href: '/blog' },
  ],
  students: [
    { label: 'Munkák böngészése', href: '/munkak' },
    { label: 'Regisztráció', href: '/regisztracio' },
    { label: 'Bejelentkezés', href: '/bejelentkezes' },
    { label: 'FAQ', href: '/faq' },
  ],
  partners: [
    { label: 'Partnerprogram', href: '/partnereknek' },
    { label: 'Hirdetés feladása', href: '/hirdetes' },
    { label: 'Árak', href: '/arak' },
  ],
  legal: [
    { label: 'Adatvédelem', href: '/adatvedelem' },
    { label: 'Impresszum', href: '/impresszum' },
    { label: 'ÁSZF', href: '/aszf' },
    { label: 'Cookie szabályzat', href: '/cookie' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <SiteLogo className="mb-4 h-14 w-32" />
            <p className="mb-6 max-w-xs text-muted-foreground">
              A jövőd itt kezdődik! Találd meg a hozzád illő diákmunkát egyszerűen és gyorsan.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Cég</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Diákoknak</h3>
            <ul className="space-y-3">
              {footerLinks.students.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Partnereknek</h3>
            <ul className="space-y-3">
              {footerLinks.partners.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Jogi</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Delego Diák Iskolaszövetkezet. Minden jog fenntartva.
          </p>
          <p className="text-sm text-muted-foreground">
            Készítette: Gábor Sándor
          </p>
        </div>
      </div>
    </footer>
  )
}
