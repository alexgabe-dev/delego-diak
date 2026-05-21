import Image from 'next/image'
import Link from 'next/link'

interface SiteLogoProps {
  className?: string
  priority?: boolean
}

export function SiteLogo({ className = 'h-14 w-32', priority = false }: SiteLogoProps) {
  return (
    <Link href="/" className={`relative block shrink-0 ${className}`} aria-label="Delego Diák főoldal">
      <Image
        src="/logos/delediak-logo_b.png"
        alt="Delego Diák"
        width={2000}
        height={938}
        priority={priority}
        className="h-full w-full object-contain dark:hidden"
      />
      <Image
        src="/logos/delego-diak.png"
        alt="Delego Diák"
        width={2000}
        height={2000}
        priority={priority}
        className="hidden h-full w-full object-cover dark:block"
        style={{ objectPosition: 'center 53%' }}
      />
    </Link>
  )
}
