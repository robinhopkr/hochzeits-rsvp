import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'

import { ENV } from '@/lib/constants'
import { fontBody, fontDisplay } from '@/lib/fonts'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(ENV.appUrl),
  applicationName: 'NiiRo Hochzeits-RSVP',
  title: 'NiiRo Hochzeits-RSVP',
  description: 'Elegante RSVP-App für Hochzeiten mit Gästeseite, Antwortformular und Admin-Übersicht.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'NiiRo Hochzeits-RSVP',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'NiiRo Hochzeits-RSVP',
    description: 'Elegante RSVP-App für Hochzeiten mit Gästeseite, Antwortformular und Admin-Übersicht.',
    url: ENV.appUrl,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NiiRo Hochzeits-RSVP',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fffcf7',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="font-body bg-cream-50 text-charcoal-800 antialiased">
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
