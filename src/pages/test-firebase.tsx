import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/services/firebase'

export default function TestFirebase() {
  const [status, setStatus] = useState<string>('')
  const auth = getAuth(app)

  const testConnection = async () => {
    try {
      setStatus('Testing connection...')
      
      // Test authentication
      try {
        await signInWithEmailAndPassword(auth, 'admin@greenvitalhub.com', '@Hieu2906')
      } catch (error: any) {
        // Even if login fails with invalid credentials, if we get a Firebase error
        // it means our connection is working
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setStatus('✅ Firebase connection successful! (Auth is working)')
          return
        }
        throw error
      }
    } catch (error: any) {
      console.error('Firebase test error:', error)
      setStatus('❌ Firebase connection failed: ' + error.message)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Firebase Connection Test</h1>
      <button
        onClick={testConnection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Firebase Connection
      </button>
      <div className="mt-4">
        Status: <span className="font-mono">{status}</span>
      </div>
    </div>
  )
} 