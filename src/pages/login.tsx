import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast/ToastContext'

export default function Login() {
  const router = useRouter()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (formData.username === 'admin' && formData.password === 'password') {
        showToast('Success', 'Welcome back!', 'success')
        router.push('/')
      } else {
        showToast('Error', 'Invalid credentials', 'error')
      }
    } catch (error) {
      showToast('Error', 'An error occurred', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login | GreenVitalHub</title>
      </Head>
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
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter your username"
                  required
                  autoFocus
                  className="h-12 p-2"
                />

                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  className="h-12 p-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 