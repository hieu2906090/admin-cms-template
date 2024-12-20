import { 
  getAuth, 
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence, 
  browserSessionPersistence,
  sendPasswordResetEmail,
  signOut 
} from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { authenticator } from 'otplib'
import { app } from '@/services/firebase'
import { encryptData } from '@/utils/encryption'

const auth = getAuth(app)

interface LoginResponse {
  user: any | null
  error: string | null
  requiresTOTP?: boolean
}

export const loginWithEmail = async (
  email: string, 
  password: string,
  totpCode?: string,
  remember: boolean = false
): Promise<LoginResponse> => {
  try {
    // Set persistence based on remember me
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
    
    // First verify email/password
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    
    // Check if user has TOTP enabled
    const db = getFirestore()
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data()
    
    if (userData?.totpEnabled) {
      // If TOTP is enabled but no code provided, request it
      if (!totpCode) {
        await auth.signOut() // Sign out until TOTP is verified
        return { user: null, error: null, requiresTOTP: true }
      }
      
      // Verify TOTP code
      const isValid = authenticator.check(totpCode, userData.totpSecret)
      
      if (!isValid) {
        await auth.signOut()
        return { user: null, error: 'Invalid 2FA code' }
      }
    }
    
    // Save auth token after successful authentication
    const token = await user.getIdToken()
    localStorage.setItem('auth_token', token)
    
    return { user, error: null }
  } catch (error: any) {
    console.error('Login error:', error)
    return { user: null, error: error.message }
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const logout = () => signOut(auth) 

export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
} 