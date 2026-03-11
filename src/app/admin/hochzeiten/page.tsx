import { redirect } from 'next/navigation'

import { PlannerWeddingSelector } from '@/components/admin/PlannerWeddingSelector'
import { LogoutButton } from '@/components/admin/LogoutButton'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getServerSession } from '@/lib/auth/get-session'
import { listPlannerWeddingOptions } from '@/lib/auth/admin-accounts'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPlannerAccountById } from '@/lib/supabase/repository'

export default async function PlannerWeddingSelectionPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  if (session.role !== 'planner') {
    redirect('/admin/uebersicht')
  }

  const supabase = createAdminClient()

  if (!supabase) {
    throw new Error('Der Wedding-Planer-Bereich benötigt einen konfigurierten Service-Role-Key.')
  }

  const plannerAccount = await getPlannerAccountById(supabase, session.accountId)

  if (!plannerAccount) {
    redirect('/admin/login')
  }

  const weddings = await listPlannerWeddingOptions(session.accountId)

  return (
    <Section className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading as="h1">Brautpaar auswählen</SectionHeading>
        <p className="mt-4 text-charcoal-600">
          Wählt hier eines eurer freigegebenen Brautpaare aus. Innerhalb der Hochzeit habt ihr Zugriff auf alle Bereiche außer auf private Fotos.
        </p>
        <div className="mt-5 flex justify-center">
          <LogoutButton label="Logout" variant="secondary" />
        </div>
      </div>

      <PlannerWeddingSelector customerNumber={plannerAccount.customerNumber} weddings={weddings} />
    </Section>
  )
}
