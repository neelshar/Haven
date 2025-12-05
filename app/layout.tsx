import type { Metadata } from 'next'
import { Lora, Instrument_Sans } from 'next/font/google'
import './globals.css'

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
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
    <html lang="en">
      <body className={`${lora.variable} ${instrumentSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
