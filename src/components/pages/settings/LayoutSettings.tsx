import Card from '@/components/ui/Card'
import { Switch } from '@headlessui/react'
import { useSettings } from '@/contexts/SettingsContext'

export default function LayoutSettings() {
  const { isDenseLayout, toggleDenseLayout } = useSettings()

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Layout Preferences
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Remove Dense</h3>
              <p className="text-sm text-gray-500">
                Remove the dense layout and use the default layout
              </p>
            </div>
            <Switch
              checked={isDenseLayout}
              onChange={toggleDenseLayout}
              className={`${
                isDenseLayout ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable dense layout</span>
              <span
                className={`${
                  isDenseLayout ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Card>
  )
} 