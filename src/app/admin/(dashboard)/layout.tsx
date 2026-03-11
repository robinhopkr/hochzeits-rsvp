import { AdminDashboardShell } from '@/components/admin/AdminDashboardShell'
import { getProtectedAdminContext } from '@/lib/admin/dashboard'

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export default async function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { config, galleryHref, guestInviteHref, guestInviteUrl, photographerHref, user } =
    await getProtectedAdminContext()

  return (
    <AdminDashboardShell
      config={config}
      galleryHref={galleryHref}
      guestInviteHref={guestInviteHref}
      guestInviteUrl={guestInviteUrl}
      photographerHref={photographerHref}
      sessionRole={user.role}
    >
      {children}
    </AdminDashboardShell>
  )
}
