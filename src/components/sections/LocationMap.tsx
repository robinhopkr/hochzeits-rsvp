'use client'

import { MapPinned } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'

export function LocationMap({ address, embedUrl }: { address: string; embedUrl: string | null }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const fallbackEmbedUrl = `https://www.openstreetmap.org/export/embed.html?layer=mapnik&query=${encodeURIComponent(address)}`
  const normalizedAddress = address.trim().toLowerCase()
  const hasUsableAddress =
    normalizedAddress.length >= 10 && !normalizedAddress.includes('adresse folgt in kürze')

  return (
    <div className="surface-card h-full overflow-hidden">
      {!hasUsableAddress ? (
        <div className="flex min-h-[280px] flex-col justify-between bg-[linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(250,243,232,0.92)_100%)] px-6 py-8">
          <div className="space-y-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gold-600 shadow-elegant">
              <MapPinned className="h-5 w-5" />
            </span>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.18em] text-sage-600">Kartenansicht</p>
              <h3 className="font-display text-card text-charcoal-900">Die genaue Karte folgt noch</h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-charcoal-600">
              Sobald die vollständige Adresse hinterlegt ist, könnt ihr die Karte hier direkt öffnen.
              Bis dahin nutzt gern die Kartenlinks auf der linken Seite.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cream-200 bg-white/80 px-4 py-4 text-sm text-charcoal-500">
            Diese Fläche wechselt automatisch zur interaktiven Karte, sobald eine echte Adresse
            gespeichert ist.
          </div>
        </div>
      ) : !isMapLoaded ? (
        <div className="flex min-h-[280px] flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(212,154,29,0.12),transparent_32%),linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(250,243,232,0.92)_100%)] px-6 py-8">
          <div className="space-y-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gold-600 shadow-elegant">
              <MapPinned className="h-5 w-5" />
            </span>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.18em] text-sage-600">Kartenansicht</p>
              <h3 className="font-display text-card text-charcoal-900">Interaktive Karte laden</h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-charcoal-600">
              Für die Karte wird OpenStreetMap geladen. Personenbezogene Daten werden erst nach
              eurem Klick übertragen.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setIsMapLoaded(true)}>
              Karte laden
            </Button>
          </div>
        </div>
      ) : (
        <iframe
          className="h-[320px] w-full lg:h-full"
          loading="lazy"
          src={embedUrl ?? fallbackEmbedUrl}
          title="Karte des Veranstaltungsorts"
        />
      )}
    </div>
  )
}
