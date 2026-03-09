import { AdminPageHero } from '@/components/admin/AdminPageHero'
import { GuestPlanningSection } from '@/components/admin/GuestPlanningSection'
import { getProtectedAdminContext } from '@/lib/admin/dashboard'
import { getSeatingPlanData, listRsvps } from '@/lib/supabase/repository'

export default async function AdminPlanningPage() {
  const { config, supabase } = await getProtectedAdminContext()
  const [rsvps, seatingPlanData] = await Promise.all([
    listRsvps(supabase, config),
    getSeatingPlanData(supabase, config),
  ])
  const coupleNames = [config.partner1Name, config.partner2Name]
    .filter((name): name is string => Boolean(name?.trim()))

  if (!coupleNames.length && config.coupleLabel.trim()) {
    coupleNames.push(config.coupleLabel.trim())
  }

  return (
    <div className="space-y-6">
      <AdminPageHero
        title="Tischplan"
        description="Hier baut ihr euren Sitzplan auf Basis der RSVP-Zusagen. Das Brautpaar wird automatisch ergänzt, Kategorien und Gruppen helfen bei der Verteilung."
      />

      <div className="surface-card px-6 py-6 sm:px-8">
        <GuestPlanningSection
          coupleNames={coupleNames}
          initialData={seatingPlanData}
          rsvps={rsvps}
        />
      </div>
    </div>
  )
}
