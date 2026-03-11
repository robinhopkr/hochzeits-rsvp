import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SCRYPT_KEYLEN = 64

function normalizePassword(password: string): string {
  return password.normalize('NFKC')
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(normalizePassword(password), salt, SCRYPT_KEYLEN).toString('hex')

  return `${salt}:${derivedKey}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedHash] = storedHash.split(':')

  if (!salt || !expectedHash) {
    return false
  }

  const actualHash = scryptSync(normalizePassword(password), salt, SCRYPT_KEYLEN)
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  if (actualHash.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(actualHash, expectedBuffer)
}
