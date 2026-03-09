'use client'

import { useState } from 'react'

import type { WeddingConfig } from '@/types/wedding'

export function useWeddingConfig(initialConfig: WeddingConfig) {
  const [config, setConfig] = useState(initialConfig)

  return {
    config,
    setConfig,
  }
}
