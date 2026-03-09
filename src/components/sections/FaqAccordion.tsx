'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils/cn'
import type { FaqItem } from '@/types/wedding'

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="space-y-4" role="list">
      {items.map((item) => {
        const isOpen = openId === item.id
        const contentId = `${item.id}-content`

        return (
          <div key={item.id} className="surface-card overflow-hidden" role="listitem">
            <button
              aria-controls={contentId}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              type="button"
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
            >
              <span className="font-display text-card text-charcoal-900">{item.question}</span>
              <ChevronDown className={cn('h-5 w-5 shrink-0 transition', isOpen ? 'rotate-180' : '')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={contentId}
                  aria-hidden={!isOpen}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-charcoal-600">{item.answer}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
