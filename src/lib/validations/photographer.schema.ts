import { z } from 'zod'

export const photographerLoginSchema = z.object({
  guestCode: z.string().trim().min(2, 'Bitte gib einen gültigen Code ein.').max(120),
  password: z.string().min(1, 'Bitte gib das Passwort ein.').max(200),
})

export const photographerDeleteSchema = z.object({
  guestCode: z.string().trim().min(2).max(120),
  path: z.string().trim().min(2).max(500),
})
