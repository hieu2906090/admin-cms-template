import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/Toast/ToastContext'
import { loginWithEmail } from '@/services/auth'
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const router = useRouter()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [showTOTP, setShowTOTP] = useState(false)
  const [totpCode, setTotpCode] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { user, error, requiresTOTP } = await loginWithEmail(
        formData.email, 
        formData.password,
        showTOTP ? totpCode : undefined,
        formData.remember
      )
      
      if (requiresTOTP) {
        setShowTOTP(true)
        showToast('Info', 'Please enter your 2FA code', 'info')
      } else if (user) {
        showToast('Success', 'Welcome back!', 'success')
        router.push('/')
      } else {
        showToast('Error', error || 'Invalid credentials', 'error')
      }
    } catch (error: any) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex">
      {/* Background Image Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-600/30 backdrop-blur-sm" />
      </div>

      {/* Login Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {showTOTP && (
                <div>
                  <input
                    type="text"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                    placeholder="Enter 2FA code"
                    maxLength={6}
                    required
                    className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 