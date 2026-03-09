'use client'

import { useEffect, useState } from 'react'

import { ENV } from '@/lib/constants'
import { normaliseDateInput } from '@/lib/utils/date'

interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calculateCountdown(targetDate: string): CountdownState {
  const target = new Date(normaliseDateInput(targetDate) ?? targetDate).getTime()
  const now = Date.now()
  const difference = target - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPast: false,
  }
}

export function useCountdown(targetDate?: string): CountdownState {
  const effectiveTarget = targetDate ?? ENV.weddingDate
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  })

  useEffect(() => {
    setState(calculateCountdown(effectiveTarget))

    const timer = window.setInterval(() => {
      setState(calculateCountdown(effectiveTarget))
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [effectiveTarget])

  return state
}
