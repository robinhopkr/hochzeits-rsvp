'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import type { ApiResponse } from '@/types/api'

import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface PhotographerLoginFormProps {
  guestCode: string
}

export function PhotographerLoginForm({ guestCode }: PhotographerLoginFormProps) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/photographer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestCode,
          password,
        }),
      })

      const result = (await response.json()) as ApiResponse<{ authenticated: true }>

      if (!response.ok || !result.success) {
        setErrorMessage(result.success ? 'Der Login ist fehlgeschlagen.' : result.error)
        return
      }

      startTransition(() => {
        router.refresh()
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="surface-card mx-auto w-full max-w-lg space-y-5 px-6 py-8 sm:px-10" onSubmit={handleSubmit}>
      <Input
        label="Fotografen-Passwort"
        placeholder="Passwort eingeben"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}
      <Button className="w-full" loading={isSubmitting} size="lg" type="submit">
        Fotografenbereich öffnen
      </Button>
    </form>
  )
}
