import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const SALT_LENGTH = 64
const TAG_LENGTH = 16
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || randomBytes(32).toString('hex')

export const encryptData = (text: string): string => {
  try {
    const iv = randomBytes(IV_LENGTH)
    const salt = randomBytes(SALT_LENGTH)
    const cipher = createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    const tag = cipher.getAuthTag()

    return Buffer.concat([salt, iv, tag, Buffer.from(encrypted, 'hex')]).toString('base64')
  } catch (error) {
    console.error('Encryption error:', error)
    return text // Fallback to original text if encryption fails
  }
}

export const decryptData = (encryptedData: string): string => {
  try {
    const buffer = Buffer.from(encryptedData, 'base64')
    
    const salt = buffer.subarray(0, SALT_LENGTH)
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
    const tag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH)
    const content = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH)

    const decipher = createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv)
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(content.toString('hex'), 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    return encryptedData // Fallback to encrypted text if decryption fails
  }
} 