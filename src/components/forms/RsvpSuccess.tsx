'use client'

import { motion } from 'framer-motion'

import { formatGermanDate } from '@/lib/utils/date'
import type { WeddingConfig } from '@/types/wedding'

export function RsvpSuccess({
  config,
  guestName,
  isAttending,
}: {
  config: WeddingConfig
  guestName: string
  isAttending: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-card px-6 py-8 text-center sm:px-10"
    >
      <p className="text-sm uppercase tracking-[0.24em] text-gold-600">Antwort eingegangen</p>
      <h3 className="mt-3 font-display text-section text-charcoal-900">
        {config.successTitle
          ? config.successTitle.replace('{name}', guestName)
          : isAttending
            ? `Vielen Dank, ${guestName}. Wir freuen uns sehr auf euch.`
            : `Vielen Dank, ${guestName}, für deine Rückmeldung.`}
      </h3>
      <p className="mt-4 text-charcoal-600">
        {config.successDescription
          ? config.successDescription.replace('{name}', guestName)
          : isAttending
            ? `Wir sehen uns am ${formatGermanDate(config.weddingDate)} in ${config.venueName}.`
            : 'Falls sich doch noch etwas ändern sollte, meldet euch bitte direkt bei uns.'}
      </p>
    </motion.div>
  )
}
