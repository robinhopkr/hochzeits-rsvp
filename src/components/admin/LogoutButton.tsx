'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

import { Button } from '../ui/Button'

interface LogoutButtonProps {
  className?: string
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function LogoutButton({
  className,
  label = 'Abmelden',
  variant = 'ghost',
}: LogoutButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    setIsLoading(true)
    await fetch('/api/admin/logout', {
      method: 'POST',
    })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <Button
      className={cn(className)}
      loading={isLoading}
      type="button"
      variant={variant}
      onClick={handleLogout}
    >
      {label}
    </Button>
  )
}
