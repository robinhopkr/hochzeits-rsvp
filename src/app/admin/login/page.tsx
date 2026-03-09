import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/forms/LoginForm'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getServerSession } from '@/lib/auth/get-session'

export default async function AdminLoginPage() {
  const session = await getServerSession()

  if (session) {
    redirect('/admin')
  }

  return (
    <Section className="space-y-8">
      <div className="mx-auto max-w-lg text-center">
        <SectionHeading as="h1">Login für Brautpaare</SectionHeading>
        <p className="mt-4 text-charcoal-600">
          Dieser geschützte Bereich ist ausschließlich für das Brautpaar gedacht.
        </p>
      </div>
      <LoginForm />
    </Section>
  )
}
