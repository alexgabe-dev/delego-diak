import Image from 'next/image'
import Link from 'next/link'

interface SiteLogoProps {
  className?: string
  priority?: boolean
  /** Mindig a fehér logót mutatja (sötét háttérhez) */
  inverted?: boolean
}

export function SiteLogo({ className = 'h-9', priority = false, inverted = false }: SiteLogoProps) {
  return (
    <Link href="/" className={`flex shrink-0 items-center ${className}`} aria-label="Delego főoldal">
      {!inverted && (
        <Image
          src="/logos/delego-logo-piros.webp"
          alt="Delego"
          width={2000}
          height={754}
          priority={priority}
          className="h-full w-auto dark:hidden"
        />
      )}
      <Image
        src="/logos/delego-logo-feher.webp"
        alt="Delego"
        width={2000}
        height={735}
        priority={priority}
        className={`h-full w-auto ${inverted ? '' : 'hidden dark:block'}`}
      />
    </Link>
  )
}
