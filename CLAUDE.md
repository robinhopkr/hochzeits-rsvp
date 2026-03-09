# CLAUDE.md - NiiRo Hochzeits-RSVP Re-Design

## Projektstatus
- Re-Design, kein Rebuild
- Bestehende Funktionen aus der Legacy-App bleiben erhalten
- Die aktuelle Referenzimplementierung liegt weiterhin in der Root-Datei `index.html`
- Neue Entwicklung erfolgt parallel als Next.js-15-Projekt unter `src/`

## Verbindliche Grundregeln
- Keine bestehende RSVP-, Admin-, Supabase-, RLS- oder Formularlogik leichtfertig entfernen
- Bestehende semantische Hooks, IDs und relevante `data-*`-Attribute bei Migrationen erhalten
- Formularlogik wird in Hooks isoliert, nicht in Layout-Komponenten verteilt
- Server Components sind Standard, Client Components nur bei Browser-Interaktion
- Alle externen Inputs werden mit Zod validiert
- Code bleibt in Englisch, Kommentare und UI-Texte in Deutsch
- Importe ausschliesslich ueber `@/`, keine tiefen relativen Pfade

## Tech-Stack
- `next@15`
- `typescript@5`
- `tailwindcss@3.4`
- `@tailwindcss/forms`
- `framer-motion@11`
- `lucide-react`
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `@supabase/supabase-js`
- `@supabase/ssr`
- `sonner`
- `@vercel/analytics`

## Design-Tokens
### Farben
- `cream`
- `gold`
- `sage`
- `charcoal`
- `dusty-rose`

### Typografie
- `font-display`: Playfair Display fuer Headlines
- `font-body`: Inter fuer UI und Fliesstext
- `text-hero`, `text-section`, `text-card` als fluide Groessen

### Bewegungen und Oberflaechen
- Animationen: `animate-fade-up`, `animate-fade-in`, `animate-shimmer`
- Schatten: `shadow-elegant`, `shadow-gold`
- Radius: `rounded-elegant`

## Architektur-Leitplanken
- `src/app`: App Router, Root Layout, spaetere Routen fuer `admin`, `login` und `api`
- `src/components`: UI-Primitives, Sections, Forms, Admin-Komponenten
- `src/hooks`: Formular-, Countdown- und Scroll-Logik
- `src/lib`: Supabase-Clients, Validierung, Utilities, Konstanten
- `src/types`: Domain-, API- und DB-Typen

## Environment
- `.env.example` ist die Vorlage
- `.env.local` bleibt lokal und enthaelt nur Entwicklungswerte
- `NEXT_PUBLIC_APP_URL` ist die bevorzugte kanonische URL
- `NEXT_PUBLIC_SITE_URL` bleibt nur als Kompatibilitaetsalias bestehen

## Aktuelle Arbeitsregel
- Erst die Next.js-Basis sauber aufbauen und verifizierbar machen
- Danach die Legacy-HTML schrittweise in Komponenten und Hooks ueberfuehren
