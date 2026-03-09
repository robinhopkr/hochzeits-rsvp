import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NiiRo Hochzeits-RSVP',
    short_name: 'Hochzeits App',
    description:
      'Elegante RSVP-App für Hochzeiten mit Gästeseite, Antwortformular und Admin-Übersicht.',
    start_url: '/demo',
    display: 'standalone',
    background_color: '#fffcf7',
    theme_color: '#fffcf7',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
