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
    { label: 'Állások böngészése', href: '/munkak' },
    { label: 'Önéletrajz feltöltése', href: '/oneletrajz' },
    { label: 'Szállás és utazás', href: '/szallas' },
    { label: 'GYIK', href: '/gyik' },
  ],
  partners: [
    { label: 'Munkaerő-kölcsönzés', href: '/munkaero-kolcsonzes' },
    { label: 'Munkaerő-közvetítés', href: '/munkaero-kozvetites' },
    { label: 'Toborzás', href: '/toborzas' },
    { label: 'Ajánlatkérés', href: '/ajanlatkeres' },
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
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <SiteLogo className="mb-5 h-10" />
            <p className="mb-6 max-w-xs text-muted-foreground">
              Munkaerő-kölcsönzés, -közvetítés és toborzás. Stabil állások munkavállalóknak, megbízható munkaerő cégeknek.
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
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Cég</h3>
            <ul className="space-y-2.5 text-sm sm:space-y-3 sm:text-base">
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
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Munkavállalóknak</h3>
            <ul className="space-y-2.5 text-sm sm:space-y-3 sm:text-base">
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
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Cégeknek</h3>
            <ul className="space-y-2.5 text-sm sm:space-y-3 sm:text-base">
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
            <h3 className="mb-3 font-semibold text-foreground sm:mb-4">Jogi</h3>
            <ul className="space-y-2.5 text-sm sm:space-y-3 sm:text-base">
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
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-center sm:mt-12 sm:flex-row sm:gap-4 sm:pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Delego. Minden jog fenntartva.
          </p>
          <p className="text-sm text-muted-foreground">
            Készítette: Gábor Sándor
          </p>
        </div>
      </div>
    </footer>
  )
}
