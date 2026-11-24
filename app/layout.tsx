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
  title: 'Delego | Munkaerő-kölcsönzés és -közvetítés',
  description: 'Stabil állások munkavállalóknak, megbízható munkaerő cégeknek. Munkaerő-kölcsönzés, -közvetítés és toborzás országszerte.',
  keywords: ['munkaerő-kölcsönzés', 'munkaerő-közvetítés', 'állás', 'munka', 'toborzás', 'fizikai munka', 'szakmunka'],
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
