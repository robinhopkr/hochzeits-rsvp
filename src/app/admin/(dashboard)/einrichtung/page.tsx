import { AdminPageHero } from '@/components/admin/AdminPageHero'
import { SetupQuestionnaire } from '@/components/admin/SetupQuestionnaire'
import { getProtectedAdminContext } from '@/lib/admin/dashboard'
import { getWeddingEditorValues } from '@/lib/supabase/repository'

export default async function AdminSetupPage() {
  const { config, supabase, user } = await getProtectedAdminContext()
  const editorValues = await getWeddingEditorValues(supabase, config)

  return (
    <div className="space-y-6">
      <AdminPageHero
        title="Einrichtung"
        description="Dieser Fragebogen führt euch Schritt für Schritt durch die wichtigsten Inhalte und Einstellungen für euren Gästebereich."
      />

      {editorValues ? (
        <SetupQuestionnaire initialValues={editorValues} sessionRole={user.role} />
      ) : (
        <div className="surface-card px-6 py-8 text-charcoal-600">
          Für diese Hochzeit konnten noch keine editierbaren Daten geladen werden.
        </div>
      )}
    </div>
  )
}
