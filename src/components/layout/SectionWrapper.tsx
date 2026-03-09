'use client'

import { motion } from 'framer-motion'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils/cn'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  const animation = useScrollAnimation()

  return (
    <motion.section id={id} className={cn(className)} {...animation}>
      {children}
    </motion.section>
  )
}
