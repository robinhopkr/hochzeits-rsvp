import type { CSSProperties, ElementType, ReactNode } from 'react'

import { getWeddingTemplate, buildWeddingThemeStyle } from '@/lib/wedding-design'
import { cn } from '@/lib/utils/cn'

interface WeddingThemeFrameProps {
  children: ReactNode
  className?: string
  templateId?: string | null
  fontPresetId?: string | null
  style?: CSSProperties
  as?: ElementType
}

export function WeddingThemeFrame({
  children,
  className,
  templateId,
  fontPresetId,
  style,
  as: Tag = 'div',
}: WeddingThemeFrameProps) {
  const template = getWeddingTemplate(templateId)

  return (
    <Tag
      className={cn('wedding-theme', className)}
      data-template-id={template.id}
      style={{
        ...buildWeddingThemeStyle({ templateId, fontPresetId }),
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
