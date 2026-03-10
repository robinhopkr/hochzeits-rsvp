'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface PhotographerPasswordCardProps {
  currentPassword: string
  photographerHref: string | null
}

export function PhotographerPasswordCard({
  currentPassword,
  photographerHref,
}: PhotographerPasswordCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [password, setPassword] = useState(currentPassword)
  const [saving, setSaving] = useState(false)

  const hasPassword = currentPassword.length > 0
  const hasChanged = password.trim() !== currentPassword

  async function handleSave() {
    const trimmed = password.trim()

    if (!trimmed) {
      toast.error('Bitte gib ein Passwort ein.')
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/admin/photographer-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: trimmed }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        toast.error(result.error ?? 'Das Passwort konnte nicht gespeichert werden.')
        return
      }

      toast.success('Fotografen-Passwort gespeichert.')
      setIsEditing(false)
      router.refresh()
    } catch {
      toast.error('Verbindungsfehler – bitte versuche es erneut.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="surface-card px-6 py-6">
      <p className="text-sm uppercase tracking-[0.18em] text-dusty-rose-700">Für Fotograf*innen</p>
      <h2 className="mt-3 font-display text-card text-charcoal-900">Fotografen-Zugang</h2>
      <p className="mt-3 text-charcoal-600">
        Ein separater Bereich für Upload und Pflege der Fotos, getrennt vom Paarbereich.
      </p>

      {isEditing ? (
        <div className="mt-4 space-y-4">
          <Input
            label="Fotografen-Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Neues Passwort eingeben"
            helperText="Dieses Passwort wird für den separaten Fotografen-Login verwendet."
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave} loading={saving} disabled={!hasChanged} size="sm">
              Speichern
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPassword(currentPassword)
                setIsEditing(false)
              }}
            >
              Abbrechen
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm text-charcoal-500">
            Passwort:{' '}
            <span className="font-semibold text-charcoal-900">
              {hasPassword ? 'hinterlegt' : 'noch nicht gesetzt'}
            </span>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
              {hasPassword ? 'Passwort ändern' : 'Passwort setzen'}
            </Button>
            {photographerHref ? (
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-300 bg-white px-4 py-2 text-sm font-semibold text-charcoal-800 transition duration-200 hover:border-gold-500 hover:text-charcoal-900"
                href={photographerHref}
              >
                Fotografen-Login
              </a>
            ) : null}
          </div>
        </>
      )}
    </article>
  )
}
