import { useState } from 'react'
import Layout from '@/components/common/Layout'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { useToast } from '@/components/ui/Toast/ToastContext'

export default function Settings() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    language: { id: 'en', label: 'English', value: 'en' },
    notifications: { id: 'all', label: 'All notifications', value: 'all' },
    theme: { id: 'light', label: 'Light', value: 'light' }
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast('Success', 'Settings saved successfully', 'success')
    } catch (error) {
      showToast('Error', 'Failed to save settings', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
              <div className="space-y-4 max-w-xl">
                <Input
                  label="Full Name"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4 max-w-xl">
                <Select
                  label="Language"
                  value={settings.language}
                  onChange={(value) => setSettings({ ...settings, language: value as { id: string; label: string; value: string } })}
                  options={[
                    { id: 'en', label: 'English', value: 'en' },
                    { id: 'es', label: 'Spanish', value: 'es' },
                    { id: 'fr', label: 'French', value: 'fr' }
                  ]}
                />
                <Select
                  label="Notification Settings"
                  value={settings.notifications}
                  onChange={(value) => setSettings({ ...settings, notifications: value as { id: string; label: string; value: string } })}
                  options={[
                    { id: 'all', label: 'All notifications', value: 'all' },
                    { id: 'important', label: 'Important only', value: 'important' },
                    { id: 'none', label: 'None', value: 'none' }
                  ]}
                />
                <Select
                  label="Theme"
                  value={settings.theme}
                  onChange={(value) => setSettings({ ...settings, theme: value as { id: string; label: string; value: string } })}
                  options={[
                    { id: 'light', label: 'Light', value: 'light' },
                    { id: 'dark', label: 'Dark', value: 'dark' },
                    { id: 'system', label: 'System', value: 'system' }
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setSettings({
              name: 'John Doe',
              email: 'john@example.com',
              language: { id: 'en', label: 'English', value: 'en' },
              notifications: { id: 'all', label: 'All notifications', value: 'all' },
              theme: { id: 'light', label: 'Light', value: 'light' }
            })}>
              Reset
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
} 