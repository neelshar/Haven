import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Haven | Find Your Perfect Software Match',
  description: 'AI-powered software discovery. Tell us what you need, and we\'ll find the perfect tools for your business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakarta.variable} ${spaceMono.variable} font-sans`}>
        <div className="relative min-h-screen mesh-gradient noise grid-pattern">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
