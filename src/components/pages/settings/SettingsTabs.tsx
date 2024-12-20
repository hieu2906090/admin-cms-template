import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import ThemeSettings from './ThemeSettings'
import LayoutSettings from './LayoutSettings'
import TOTPSettings from './TOTPSettings'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const tabs = [
  {
    name: 'Appearance',
    icon: CogIcon,
    content: (
      <div className="space-y-6">
        <LayoutSettings />
        <ThemeSettings />
      </div>
    )
  },
  {
    name: 'Security',
    icon: ShieldCheckIcon,
    content: <TOTPSettings />
  }
]

export default function SettingsTabs() {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm outline-none',
                  selected
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              <tab.icon
                className={classNames(
                  'mr-2 h-5 w-5',
                  'text-gray-400 group-hover:text-gray-500',
                  'ui-selected:text-indigo-600'
                )}
                aria-hidden="true"
              />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {tabs.map((tab) => (
            <Tab.Panel
              key={tab.name}
              className={classNames(
                'focus:outline-none'
              )}
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
} 