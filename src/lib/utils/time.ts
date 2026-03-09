export function normalizeProgramTimeLabel(value: unknown): string {
  if (value === null || value === undefined) {
    return ''
  }

  const rawValue = String(value).trim()

  if (!rawValue) {
    return ''
  }

  const compactDigits = rawValue.replace(/\s+/g, '')
  const digitsOnlyMatch = compactDigits.match(/^(\d{1,4})$/)
  if (digitsOnlyMatch) {
    const digits = digitsOnlyMatch[1] ?? ''

    if (digits.length <= 2) {
      const hours = Number(digits)
      if (Number.isInteger(hours) && hours >= 0 && hours <= 23) {
        return `${String(hours).padStart(2, '0')}:00`
      }
    }

    if (digits.length === 3 || digits.length === 4) {
      const hoursDigits = digits.length === 3 ? digits.slice(0, 1) : digits.slice(0, 2)
      const minutesDigits = digits.slice(-2)
      const hours = Number(hoursDigits)
      const minutes = Number(minutesDigits)

      if (
        Number.isInteger(hours) &&
        Number.isInteger(minutes) &&
        hours >= 0 &&
        hours <= 23 &&
        minutes >= 0 &&
        minutes <= 59
      ) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
      }
    }
  }

  const timeMatch = rawValue.match(/^(\d{1,2})(?:[:.\-hH])(\d{1,2})(?::(\d{1,2}))?(?:\s*uhr)?$/i)
  if (timeMatch) {
    const hours = Number(timeMatch[1] ?? '')
    const minutes = Number(timeMatch[2] ?? '')

    if (
      Number.isInteger(hours) &&
      Number.isInteger(minutes) &&
      hours >= 0 &&
      hours <= 23 &&
      minutes >= 0 &&
      minutes <= 59
    ) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    }
  }

  const withUhrMatch = rawValue.match(/^(\d{1,2})(?:\s*uhr)$/i)
  if (withUhrMatch) {
    const hours = Number(withUhrMatch[1] ?? '')
    if (Number.isInteger(hours) && hours >= 0 && hours <= 23) {
      return `${String(hours).padStart(2, '0')}:00`
    }
  }

  return rawValue
}

export function getProgramTimeSortKey(value: unknown): number {
  const normalizedValue = normalizeProgramTimeLabel(value)
  const timeMatch = normalizedValue.match(/^(\d{2}):(\d{2})$/)

  if (!timeMatch) {
    return Number.POSITIVE_INFINITY
  }

  const hours = Number(timeMatch[1] ?? '')
  const minutes = Number(timeMatch[2] ?? '')

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return Number.POSITIVE_INFINITY
  }

  return hours * 60 + minutes
}

export function sortProgramItemsChronologically<T extends { timeLabel: string; sortOrder?: number }>(
  items: T[],
): T[] {
  return items
    .map((item, index) => ({
      item,
      index,
      sortKey: getProgramTimeSortKey(item.timeLabel),
    }))
    .sort((left, right) => {
      const timeDelta = left.sortKey - right.sortKey
      if (timeDelta !== 0) {
        return timeDelta
      }

      const leftSortOrder = left.item.sortOrder ?? left.index
      const rightSortOrder = right.item.sortOrder ?? right.index
      if (leftSortOrder !== rightSortOrder) {
        return leftSortOrder - rightSortOrder
      }

      return left.index - right.index
    })
    .map((entry) => entry.item)
}
