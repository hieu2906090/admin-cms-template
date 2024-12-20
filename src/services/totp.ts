import { authenticator } from 'otplib'
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { HashAlgorithms } from '@otplib/core'

// Configure authenticator globally with same settings as QR code
authenticator.options = {
  algorithm: HashAlgorithms.SHA1,
  digits: 6,
  period: 30
}

export const verifyTOTP = async (token: string, secret: string): Promise<boolean> => {
  try {
    const isValid = authenticator.check(token, secret)
    
    if (isValid) {
      const auth = getAuth()
      const user = auth.currentUser
      
      if (user) {
        const db = getFirestore()
        const userRef = doc(db, 'users', user.uid)
        
        const userDoc = await getDoc(userRef)
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            totpSecret: secret,
            totpEnabled: true,
            totpEnabledAt: new Date().toISOString()
          })
        } else {
          await updateDoc(userRef, {
            totpSecret: secret,
            totpEnabled: true,
            totpEnabledAt: new Date().toISOString()
          })
        }
      }
    }
    
    return isValid
  } catch (error) {
    console.error('TOTP verification error:', error)
    return false
  }
}

export const isTOTPEnabled = async (): Promise<boolean> => {
  try {
    const auth = getAuth()
    const user = auth.currentUser
    
    if (!user) return false
    
    const db = getFirestore()
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)
    
    return userDoc.data()?.totpEnabled || false
  } catch (error) {
    console.error('TOTP status check error:', error)
    return false
  }
} 