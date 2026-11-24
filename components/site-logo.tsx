import Link from 'next/link'

interface SiteLogoProps {
  className?: string
  priority?: boolean
  /** Sötét háttéren fehér szöveggel jelenik meg */
  inverted?: boolean
}

export function SiteLogo({ className = 'h-11', inverted = false }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={`flex shrink-0 items-center gap-2.5 ${className}`}
      aria-label="Delego főoldal"
    >
      <span className="flex aspect-square h-full items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/25">
        <svg viewBox="0 0 32 32" className="h-[58%] w-[58%]" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 5h9.5C23 5 28 9.6 28 16s-5 11-12.5 11H6V5Zm6 5.2v11.6h3.2c3.9 0 6.6-2.3 6.6-5.8s-2.7-5.8-6.6-5.8H12Z"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-2xl font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-foreground'}`}
        >
          delego
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${
            inverted ? 'text-white/60' : 'text-muted-foreground'
          }`}
        >
          Munkaerő-megoldások
        </span>
      </span>
    </Link>
  )
}
