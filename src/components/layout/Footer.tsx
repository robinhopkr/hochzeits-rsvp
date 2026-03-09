export function Footer({
  coupleLabel,
  weddingDate,
}: {
  coupleLabel: string
  weddingDate?: string | null
}) {
  const parsedWeddingDate = weddingDate ? new Date(weddingDate) : null
  const year =
    parsedWeddingDate && !Number.isNaN(parsedWeddingDate.getTime())
      ? parsedWeddingDate.getFullYear()
      : new Date().getFullYear()

  return (
    <footer className="wedding-footer">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-charcoal-600 sm:px-10 md:flex-row md:items-center md:justify-between">
        <p>{coupleLabel} · {year}</p>
        <p>Datenschutzfreundlich umgesetzt: keine Tracking-Cookies, nur funktionale Speicherung und Vercel Analytics.</p>
      </div>
    </footer>
  )
}
