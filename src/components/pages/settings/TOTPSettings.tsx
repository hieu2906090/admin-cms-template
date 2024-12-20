import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/Toast/ToastContext'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import QRCode from 'qrcode'
import { verifyTOTP, isTOTPEnabled } from '@/services/totp'
import { getAuth } from 'firebase/auth'

type TOTPStatus = 'disabled' | 'generating' | 'enabled'

export default function TOTPSettings() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [totpStatus, setTotpStatus] = useState<TOTPStatus>('disabled')
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [secret, setSecret] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const auth = getAuth()
  const user = auth.currentUser

  const generateTOTPSecret = async () => {
    try {
      setIsLoading(true)
      
      // Generate base32 secret
      const randomBuffer = new Uint8Array(20)
      crypto.getRandomValues(randomBuffer)
      const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
      const newSecret = Array.from(randomBuffer)
        .map(b => base32Chars[b % 32])
        .join('')
      
      const otpauthUrl = `otpauth://totp/${encodeURIComponent('AdminCMS')}:${encodeURIComponent(user?.email || '')}?secret=${newSecret}&issuer=${encodeURIComponent('AdminCMS')}&algorithm=SHA1&digits=6&period=30`
      
      const qrCode = await QRCode.toDataURL(otpauthUrl)
      
      setSecret(newSecret)
      setQrCodeUrl(qrCode)
      setTotpStatus('generating')
      
      showToast('Success', 'TOTP secret generated successfully', 'success')
    } catch (error) {
      console.error('Error generating TOTP:', error)
      showToast('Error', 'Failed to generate TOTP secret', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAndEnableTOTP = async () => {
    try {
      setIsLoading(true)
      const isValid = await verifyTOTP(verificationCode, secret)
      
      if (isValid) {
        setTotpStatus('enabled')
        showToast('Success', '2FA enabled successfully', 'success')
      } else {
        showToast('Error', 'Invalid verification code', 'error')
      }
    } catch (error) {
      console.error('Error verifying TOTP:', error)
      showToast('Error', 'Failed to verify code', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const checkTOTPStatus = async () => {
      const enabled = await isTOTPEnabled()
      setTotpStatus(enabled ? 'enabled' : 'disabled')
    }
    
    checkTOTPStatus()
  }, [])

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Two-Factor Authentication
        </h2>
        
        <div className="space-y-4">
          {totpStatus === 'disabled' && (
            <div>
              <p className="text-gray-600 mb-4">
                Enhance your account security by enabling two-factor authentication.
              </p>
              <button
                onClick={generateTOTPSecret}
                disabled={isLoading}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {isLoading ? 'Generating...' : 'Enable 2FA'}
              </button>
            </div>
          )}

          {totpStatus === 'generating' && (
            <div className="space-y-4">
              <div className="max-w-xs mx-auto">
                <img src={qrCodeUrl} alt="2FA QR Code" className="w-full" />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-900 mb-1">Secret Key:</p>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {secret}
                </code>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Scan the QR code or enter the secret key in your authenticator app,
                  then enter the verification code below.
                </p>
                <Input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full max-w-xs h-12 px-4 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={verifyAndEnableTOTP}
                  disabled={isLoading || verificationCode.length !== 6}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  Verify and Enable
                </button>
              </div>
            </div>
          )}

          {totpStatus === 'enabled' && (
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-800">
                ✓ Two-factor authentication is enabled
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 