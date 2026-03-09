const requestsByIp = new Map<string, number[]>()

interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterMs: number
}

export function checkRateLimit(ip: string, maxRequests: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const windowStart = now - windowMs
  const existing = requestsByIp.get(ip) ?? []
  const activeWindow = existing.filter((timestamp) => timestamp > windowStart)

  if (activeWindow.length >= maxRequests) {
    const oldestActiveRequest = activeWindow[0] ?? now
    const retryAfterMs = Math.max(windowMs - (now - oldestActiveRequest), 0)
    requestsByIp.set(ip, activeWindow)

    return {
      allowed: false,
      remaining: 0,
      retryAfterMs,
    }
  }

  activeWindow.push(now)
  requestsByIp.set(ip, activeWindow)

  return {
    allowed: true,
    remaining: Math.max(maxRequests - activeWindow.length, 0),
    retryAfterMs: 0,
  }
}
