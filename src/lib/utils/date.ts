const BERLIN_TIMEZONE = 'Europe/Berlin'

export function normaliseDateInput(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  if (value.includes('T')) {
    return value
  }

  const germanMatch = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (germanMatch) {
    const [, day = '01', month = '01', year = '2026'] = germanMatch
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T14:00:00+01:00`
  }

  const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (isoDateMatch) {
    return `${value}T14:00:00+01:00`
  }

  return value
}

export function formatGermanDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(normaliseDateInput(value) ?? value) : value

  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeZone: BERLIN_TIMEZONE,
  }).format(date)
}

export function formatGermanDateTime(value: string | Date | null): string {
  if (!value) {
    return '–'
  }

  const date = typeof value === 'string' ? new Date(normaliseDateInput(value) ?? value) : value

  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: BERLIN_TIMEZONE,
  }).format(date)
}

export function getBerlinTimezoneLabel(): string {
  return BERLIN_TIMEZONE
}
