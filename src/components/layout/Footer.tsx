export function Footer({ coupleLabel }: { coupleLabel: string }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cream-200 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-charcoal-600 sm:px-10 md:flex-row md:items-center md:justify-between">
        <p>{coupleLabel} · {year}</p>
        <p>Datenschutzfreundlich umgesetzt: keine Tracking-Cookies, nur funktionale Speicherung und Vercel Analytics.</p>
      </div>
    </footer>
  )
}
