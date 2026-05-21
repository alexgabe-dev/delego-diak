import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Delego Diák | A jövőd itt kezdődik!',
  description: 'Találd meg a hozzád illő diákmunkát egyszerűen és gyorsan. Gyors jelentkezés, rugalmas munkák, heti fizetés.',
  keywords: ['diákmunka', 'iskolaszövetkezet', 'állás', 'diák', 'munka', 'részfoglalkozás'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu" className={`${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
