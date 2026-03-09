import { Calendar, Clock, MapPin } from 'lucide-react'

import { formatGermanDate, getBerlinTimezoneLabel } from '@/lib/utils/date'
import type { WeddingConfig } from '@/types/wedding'

export function WeddingInfoBadges({ config }: { config: WeddingConfig }) {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-charcoal-700 shadow-elegant">
        <Calendar className="h-4 w-4 text-gold-500" />
        {formatGermanDate(config.weddingDate)}
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-charcoal-700 shadow-elegant">
        <Clock className="h-4 w-4 text-sage-500" />
        Berliner Zeit ({getBerlinTimezoneLabel()})
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-charcoal-700 shadow-elegant">
        <MapPin className="h-4 w-4 text-dusty-rose-500" />
        {config.venueName}
      </span>
    </div>
  )
}
