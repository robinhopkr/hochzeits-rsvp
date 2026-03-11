'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'
import { toast } from 'sonner'

import type { ApiResponse } from '@/types/api'

import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface PlannerAccessCardProps {
  currentCustomerNumber: string
  linkedPlannerName: string | null
}

interface PlannerAccessResponse {
  customerNumber: string | null
  linkedPlannerName: string | null
}

export function PlannerAccessCard({
  currentCustomerNumber,
  linkedPlannerName,
}: PlannerAccessCardProps) {
  const router = useRouter()
  const [customerNumber, setCustomerNumber] = useState(currentCustomerNumber)
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)
    setPending(true)

    try {
      const response = await fetch('/api/admin/planner-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerNumber,
        }),
      })

      const result = (await response.json()) as ApiResponse<PlannerAccessResponse>

      if (!response.ok || !result.success) {
        setErrorMessage(result.success ? 'Die Verknüpfung konnte nicht gespeichert werden.' : result.error)
        return
      }

      toast.success(result.message ?? 'Der Wedding Planner wurde aktualisiert.')
      startTransition(() => {
        router.refresh()
      })
    } catch {
      setErrorMessage('Die Wedding-Planer-Verknüpfung ist gerade nicht erreichbar.')
    } finally {
      setPending(false)
    }
  }

  return (
    <article className="surface-card px-6 py-6">
      <p className="text-sm uppercase tracking-[0.18em] text-sage-700">Wedding Planner</p>
      <h2 className="mt-3 font-display text-card text-charcoal-900">Wedding Planner verknüpfen</h2>
      <p className="mt-3 text-charcoal-600">
        Gebt hier die Kundennummer eures Wedding Planners ein. Danach sieht der Planner diese Hochzeit
        in seiner Auswahl und erhält Zugriff auf alle Bereiche außer auf private Fotos.
      </p>
      {linkedPlannerName ? (
        <div className="mt-4 rounded-[1.35rem] bg-cream-50 px-4 py-4 text-sm text-charcoal-700">
          Aktuell verknüpft mit <span className="font-semibold text-charcoal-900">{linkedPlannerName}</span>
          {currentCustomerNumber ? ` (${currentCustomerNumber})` : ''}.
        </div>
      ) : null}
      <form className="mt-5 space-y-4" noValidate onSubmit={handleSubmit}>
        <Input
          label="Kundennummer des Wedding Planners"
          helperText="Leer lassen, wenn kein Planner verknüpft werden soll."
          value={customerNumber}
          onChange={(event) => setCustomerNumber(event.target.value.toUpperCase())}
        />
        {errorMessage ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}
        <Button loading={pending} type="submit">
          Wedding Planner speichern
        </Button>
      </form>
    </article>
  )
}
